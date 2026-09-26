# Base compartida · Yeppo B2B CRM

El CRM publicado en GitHub Pages no puede guardar pedidos para otros equipos por sí solo: IndexedDB y LocalStorage pertenecen a cada navegador. La base Supabase agrega persistencia central para pedidos, ventas diarias, clientes, SKU, cambios comerciales y actividad. La carga de Shopify sigue siendo manual a través del chat durante la prueba.

## Activar la base

1. Crea un proyecto de Supabase bajo la cuenta de Yeppo. Conserva el acceso administrativo del proyecto en la empresa.
2. Ejecuta `supabase-pilot-schema.sql` completo en **SQL Editor**. También funciona como migración de un piloto ya existente.
3. En **Authentication > URL Configuration**, fija como Site URL y Redirect URL: `https://larreca.github.io/margenreal/yeppo-b2b-v10/`.
4. Abre **Configuración > Usuarios y KAM** en el CRM, e ingresa **Project URL** y la clave pública `publishable` o `anon`. Nunca ingreses `service_role` ni una clave secreta en el navegador.
5. Registra la cuenta inicial, confirma el correo si Supabase lo solicita y, desde **SQL Editor**, habilita únicamente ese correo:

   ```sql
   update public.crm_profiles
   set role = 'admin', active = true, updated_at = now()
   where email = 'CORREO_EXACTO_DEL_ADMINISTRADOR';
   ```

6. Inicia sesión nuevamente en el CRM como administrador. En **Configuración > Usuarios y KAM**, crea los demás usuarios y asigna roles. Cada uno debe ingresar desde su PC con correo y contraseña propios. Las cuentas nuevas se crean inactivas y solo un administrador puede activarlas.

## Compartir los datos que ya cargamos

En el navegador donde están los 40 pedidos, entra al CRM con la cuenta de administrador o supervisor y pulsa **Compartir datos de este equipo** en Configuración. El resultado debe indicar **Compartido ✓ · 40 pedidos**. Si estás cargando un archivo nuevo, el importador B2B lo publicará automáticamente cuando la conexión y la sesión estén activas; exige el mensaje **Base compartida: publicada**.

Después, abre el CRM desde otro navegador, configura la misma Project URL y clave pública, e inicia sesión con otro usuario activo. El CRM descarga el historial compartido y muestra las mismas ventas, categorías, SKU y clientes. Nuevas cargas hacen *upsert*: actualizan los registros con el mismo ID sin borrar pedidos históricos.

## Control de acceso

- Administrador y supervisor publican datos Shopify; todos los usuarios activos pueden consultar esa base.
- Las políticas RLS del esquema impiden que una sesión anónima lea la información central.
- El sistema registra usuario y fecha de cada importación en las tablas compartidas.
- Desactivar un perfil corta sus permisos sobre la base central.
- El código de acceso V10 protege la interfaz cifrada actual, pero no sustituye las cuentas individuales de Supabase. Cambia ese código antes de distribuirlo al equipo, pues ya fue compartido fuera de la aplicación.
- No publiques archivos de pedidos con nombres y datos de clientes en el repositorio público. Usa el importador autenticado.

## Alcance de la prueba

La carga no consulta Shopify en segundo plano: Matías pide la actualización por chat, se prepara el JSON y un administrador o supervisor lo importa. El almacenamiento local sigue sirviendo como copia de trabajo por equipo; la confirmación de publicación en Supabase es la señal de que el equipo entero puede ver la actualización.
