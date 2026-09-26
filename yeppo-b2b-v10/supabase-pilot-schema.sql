-- Yeppo B2B CRM · piloto multiusuario en Supabase Free
-- Ejecutar una sola vez desde Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.crm_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Usuario',
  email text not null default '',
  role text not null default 'kam' check (role in ('admin','supervisor','kam','readonly')),
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_client_assignments (
  client_id text primary key,
  assigned_user_id uuid not null references public.crm_profiles(id),
  assigned_by uuid references public.crm_profiles(id),
  assigned_at timestamptz not null default now()
);

create or replace function public.crm_handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.crm_profiles(id, full_name, email, role, active)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name',''), split_part(coalesce(new.email,''),'@',1), 'Usuario'),
    coalesce(new.email,''),
    'kam', false
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists crm_on_auth_user_created on auth.users;
create trigger crm_on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.crm_handle_new_user();

create or replace function public.crm_current_role()
returns text
language sql
stable
security definer set search_path = public
as $$
  select role from public.crm_profiles where id = auth.uid() and active = true limit 1;
$$;

create or replace function public.crm_can_write()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select coalesce(public.crm_current_role() in ('admin','supervisor','kam'), false);
$$;

create or replace function public.crm_can_supervise()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select coalesce(public.crm_current_role() in ('admin','supervisor'), false);
$$;

create or replace function public.crm_can_read_client(p_client_id text)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select case
    when public.crm_current_role() in ('admin','supervisor','readonly') then true
    when public.crm_current_role() = 'kam' then
      not exists(select 1 from public.crm_client_assignments a where a.client_id = p_client_id)
      or exists(select 1 from public.crm_client_assignments a where a.client_id = p_client_id and a.assigned_user_id = auth.uid())
    else false
  end;
$$;

create or replace function public.crm_can_write_client(p_client_id text)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select case
    when public.crm_can_supervise() then true
    when public.crm_current_role() = 'kam' then
      p_client_id is null
      or not exists(select 1 from public.crm_client_assignments a where a.client_id = p_client_id)
      or exists(select 1 from public.crm_client_assignments a where a.client_id = p_client_id and a.assigned_user_id = auth.uid())
    else false
  end;
$$;

create table if not exists public.crm_pipeline (
  client_id text primary key,
  stage text not null default 'Detectado',
  amount numeric not null default 0,
  updated_by uuid references public.crm_profiles(id),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_tasks (
  id text primary key,
  client_id text,
  title text not null,
  task_type text not null default 'Tarea',
  due_date date,
  note text not null default '',
  done boolean not null default false,
  source text not null default 'base' check (source in ('base','next_action')),
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.crm_profiles(id),
  updated_by uuid references public.crm_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_client_overrides (
  client_id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_by uuid references public.crm_profiles(id),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_activity_log (
  id text primary key,
  actor_id uuid references public.crm_profiles(id),
  actor_name text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null default '',
  client_id text not null default '',
  summary text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists crm_activity_log_created_at_idx on public.crm_activity_log(created_at desc);
create index if not exists crm_activity_log_actor_idx on public.crm_activity_log(actor_id, created_at desc);
create index if not exists crm_activity_log_client_idx on public.crm_activity_log(client_id, created_at desc);
create index if not exists crm_tasks_due_idx on public.crm_tasks(done, due_date);
create index if not exists crm_assignments_user_idx on public.crm_client_assignments(assigned_user_id);

alter table public.crm_profiles enable row level security;
alter table public.crm_client_assignments enable row level security;
alter table public.crm_pipeline enable row level security;
alter table public.crm_tasks enable row level security;
alter table public.crm_client_overrides enable row level security;
alter table public.crm_activity_log enable row level security;

drop policy if exists crm_profiles_read on public.crm_profiles;
create policy crm_profiles_read on public.crm_profiles for select to authenticated
  using (id = auth.uid() or public.crm_can_supervise());
drop policy if exists crm_profiles_admin_update on public.crm_profiles;
create policy crm_profiles_admin_update on public.crm_profiles for update to authenticated
  using (public.crm_current_role() = 'admin') with check (public.crm_current_role() = 'admin');

drop policy if exists crm_assignments_read on public.crm_client_assignments;
create policy crm_assignments_read on public.crm_client_assignments for select to authenticated using (true);
drop policy if exists crm_assignments_insert on public.crm_client_assignments;
create policy crm_assignments_insert on public.crm_client_assignments for insert to authenticated
  with check (public.crm_can_supervise() or (public.crm_current_role() = 'kam' and assigned_user_id = auth.uid()));
drop policy if exists crm_assignments_update on public.crm_client_assignments;
create policy crm_assignments_update on public.crm_client_assignments for update to authenticated
  using (public.crm_can_supervise() or assigned_user_id = auth.uid())
  with check (public.crm_can_supervise() or assigned_user_id = auth.uid());
drop policy if exists crm_assignments_delete on public.crm_client_assignments;
create policy crm_assignments_delete on public.crm_client_assignments for delete to authenticated
  using (public.crm_can_supervise() or assigned_user_id = auth.uid());

drop policy if exists crm_pipeline_read on public.crm_pipeline;
create policy crm_pipeline_read on public.crm_pipeline for select to authenticated using (public.crm_can_read_client(client_id));
drop policy if exists crm_pipeline_insert on public.crm_pipeline;
create policy crm_pipeline_insert on public.crm_pipeline for insert to authenticated with check (public.crm_can_write_client(client_id));
drop policy if exists crm_pipeline_update on public.crm_pipeline;
create policy crm_pipeline_update on public.crm_pipeline for update to authenticated using (public.crm_can_write_client(client_id)) with check (public.crm_can_write_client(client_id));
drop policy if exists crm_pipeline_delete on public.crm_pipeline;
create policy crm_pipeline_delete on public.crm_pipeline for delete to authenticated using (public.crm_can_write_client(client_id));

drop policy if exists crm_tasks_read on public.crm_tasks;
create policy crm_tasks_read on public.crm_tasks for select to authenticated using (client_id is null or public.crm_can_read_client(client_id));
drop policy if exists crm_tasks_insert on public.crm_tasks;
create policy crm_tasks_insert on public.crm_tasks for insert to authenticated with check (public.crm_can_write_client(client_id));
drop policy if exists crm_tasks_update on public.crm_tasks;
create policy crm_tasks_update on public.crm_tasks for update to authenticated using (public.crm_can_write_client(client_id)) with check (public.crm_can_write_client(client_id));
drop policy if exists crm_tasks_delete on public.crm_tasks;
create policy crm_tasks_delete on public.crm_tasks for delete to authenticated using (public.crm_can_write_client(client_id));

drop policy if exists crm_overrides_read on public.crm_client_overrides;
create policy crm_overrides_read on public.crm_client_overrides for select to authenticated using (public.crm_can_read_client(client_id));
drop policy if exists crm_overrides_insert on public.crm_client_overrides;
create policy crm_overrides_insert on public.crm_client_overrides for insert to authenticated with check (public.crm_can_write_client(client_id));
drop policy if exists crm_overrides_update on public.crm_client_overrides;
create policy crm_overrides_update on public.crm_client_overrides for update to authenticated using (public.crm_can_write_client(client_id)) with check (public.crm_can_write_client(client_id));
drop policy if exists crm_overrides_delete on public.crm_client_overrides;
create policy crm_overrides_delete on public.crm_client_overrides for delete to authenticated using (public.crm_can_supervise());

drop policy if exists crm_activity_read on public.crm_activity_log;
create policy crm_activity_read on public.crm_activity_log for select to authenticated
  using (public.crm_current_role() in ('admin','supervisor','readonly') or actor_id = auth.uid());
drop policy if exists crm_activity_insert on public.crm_activity_log;
create policy crm_activity_insert on public.crm_activity_log for insert to authenticated
  with check (actor_id = auth.uid() and public.crm_current_role() is not null);

revoke all on public.crm_profiles, public.crm_client_assignments, public.crm_pipeline, public.crm_tasks, public.crm_client_overrides, public.crm_activity_log from anon;
grant select, update on public.crm_profiles to authenticated;
grant select, insert, update, delete on public.crm_client_assignments, public.crm_pipeline, public.crm_tasks, public.crm_client_overrides to authenticated;
grant select, insert on public.crm_activity_log to authenticated;

-- Si ya existían usuarios de Auth antes de ejecutar este archivo, crea sus perfiles:
with ranked_users as (
  select id, email, raw_user_meta_data, row_number() over(order by created_at, id) as position
  from auth.users
)
insert into public.crm_profiles(id, full_name, email, role)
select id, coalesce(nullif(raw_user_meta_data->>'full_name',''), split_part(coalesce(email,''),'@',1), 'Usuario'), coalesce(email,''),
       case when position = 1 and not exists(select 1 from public.crm_profiles) then 'admin' else 'kam' end
from ranked_users
on conflict (id) do nothing;

-- Una cuenta nueva queda inactiva hasta que un administrador la habilite.
-- Tras crear y confirmar la cuenta inicial, habilita solo su correo desde SQL Editor:
-- update public.crm_profiles set role = 'admin', active = true
-- where email = 'CORREO_DEL_ADMINISTRADOR';
alter table public.crm_profiles alter column active set default false;

create table if not exists public.crm_shopify_orders (
  order_id text primary key,
  payload jsonb not null,
  generated_at timestamptz not null,
  imported_at timestamptz not null default now(),
  imported_by uuid references public.crm_profiles(id)
);
create table if not exists public.crm_shopify_sales_daily (
  date date primary key,
  orders integer not null default 0,
  sales numeric not null default 0,
  aov numeric not null default 0,
  generated_at timestamptz not null,
  imported_at timestamptz not null default now(),
  imported_by uuid references public.crm_profiles(id)
);
create table if not exists public.crm_shopify_customers (
  customer_id text primary key,
  payload jsonb not null,
  generated_at timestamptz not null,
  imported_at timestamptz not null default now(),
  imported_by uuid references public.crm_profiles(id)
);
create table if not exists public.crm_shopify_products (
  sku text primary key,
  payload jsonb not null,
  generated_at timestamptz not null,
  imported_at timestamptz not null default now(),
  imported_by uuid references public.crm_profiles(id)
);
create table if not exists public.crm_shopify_sync (
  id text primary key check (id = 'main'),
  generated_at timestamptz not null,
  source text not null default '',
  order_count integer not null default 0,
  sales_day_count integer not null default 0,
  customer_count integer not null default 0,
  product_count integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.crm_profiles(id)
);

create or replace function public.crm_stamp_shopify_import()
returns trigger language plpgsql security invoker as $$
begin
  if tg_table_name = 'crm_shopify_sync' then
    new.updated_at := now();
    new.updated_by := auth.uid();
  else
    new.imported_at := now();
    new.imported_by := auth.uid();
  end if;
  return new;
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array['crm_shopify_orders','crm_shopify_sales_daily','crm_shopify_customers','crm_shopify_products','crm_shopify_sync'] loop
    execute format('drop trigger if exists crm_stamp_import on public.%I', table_name);
    execute format('create trigger crm_stamp_import before insert or update on public.%I for each row execute function public.crm_stamp_shopify_import()', table_name);
  end loop;
end $$;

alter table public.crm_shopify_orders enable row level security;
alter table public.crm_shopify_sales_daily enable row level security;
alter table public.crm_shopify_customers enable row level security;
alter table public.crm_shopify_products enable row level security;
alter table public.crm_shopify_sync enable row level security;

do $$
declare table_name text;
begin
  foreach table_name in array array['crm_shopify_orders','crm_shopify_sales_daily','crm_shopify_customers','crm_shopify_products','crm_shopify_sync'] loop
    execute format('drop policy if exists crm_shopify_read on public.%I', table_name);
    execute format('create policy crm_shopify_read on public.%I for select to authenticated using (public.crm_current_role() is not null)', table_name);
    execute format('drop policy if exists crm_shopify_insert on public.%I', table_name);
    execute format('create policy crm_shopify_insert on public.%I for insert to authenticated with check (public.crm_can_supervise())', table_name);
    execute format('drop policy if exists crm_shopify_update on public.%I', table_name);
    execute format('create policy crm_shopify_update on public.%I for update to authenticated using (public.crm_can_supervise()) with check (public.crm_can_supervise())', table_name);
    execute format('revoke all on public.%I from anon', table_name);
    execute format('grant select, insert, update on public.%I to authenticated', table_name);
  end loop;
end $$;
