import { neon } from "@neondatabase/serverless";

let client = null;
export function hasDatabase(){ return Boolean(process.env.DATABASE_URL); }
export function getDb(){
  if(!process.env.DATABASE_URL) return null;
  if(!client) client = neon(process.env.DATABASE_URL);
  return client;
}

export async function ensureSchema(){
  const sql=getDb();
  if(!sql) throw new Error("DATABASE_NOT_CONFIGURED");
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  await sql`CREATE TABLE IF NOT EXISTS academy_organizations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES academy_organizations(id) ON DELETE SET NULL,
    email text UNIQUE NOT NULL,
    name text NOT NULL,
    password_hash text NOT NULL,
    role text NOT NULL DEFAULT 'student' CHECK (role IN ('super_admin','editor','reviewer','support','company_admin','student')),
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    last_login_at timestamptz
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_invitations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES academy_organizations(id) ON DELETE CASCADE,
    email text NOT NULL,
    role text NOT NULL DEFAULT 'student' CHECK (role IN ('company_admin','student')),
    token_hash text UNIQUE NOT NULL,
    invited_by uuid REFERENCES academy_users(id) ON DELETE SET NULL,
    expires_at timestamptz NOT NULL,
    accepted_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_chapters (
    chapter_id text PRIMARY KEY,
    title text NOT NULL,
    summary text,
    draft_content jsonb,
    published_content jsonb,
    status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','published')),
    version int NOT NULL DEFAULT 0,
    updated_by uuid REFERENCES academy_users(id) ON DELETE SET NULL,
    published_by uuid REFERENCES academy_users(id) ON DELETE SET NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    published_at timestamptz
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_chapter_versions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id text NOT NULL,
    version int NOT NULL,
    content jsonb NOT NULL,
    published_by uuid REFERENCES academy_users(id) ON DELETE SET NULL,
    published_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_media (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id text NOT NULL,
    content_type text NOT NULL,
    data_base64 text NOT NULL,
    size_bytes int NOT NULL,
    uploaded_by uuid REFERENCES academy_users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_progress (
    user_id uuid NOT NULL REFERENCES academy_users(id) ON DELETE CASCADE,
    chapter_id text NOT NULL,
    current_module_id text,
    progress_percent numeric(5,2) NOT NULL DEFAULT 0,
    completed_at timestamptz,
    last_activity_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id,chapter_id)
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_assignments (
    organization_id uuid NOT NULL REFERENCES academy_organizations(id) ON DELETE CASCADE,
    chapter_id text NOT NULL,
    required boolean NOT NULL DEFAULT false,
    available boolean NOT NULL DEFAULT true,
    PRIMARY KEY (organization_id,chapter_id)
  )`;
  await sql`CREATE TABLE IF NOT EXISTS academy_quiz_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES academy_users(id) ON DELETE CASCADE,
    chapter_id text NOT NULL,
    score numeric(5,2),
    answers jsonb,
    passed boolean,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
}
