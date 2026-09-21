# Activar usuarios compartidos en Yeppo B2B CRM

El CRM puede probarse sin costo en dos modalidades:

- **Piloto local:** usuarios, roles, PIN y bitácora en un mismo navegador.
- **Supabase Free:** usuarios reales y datos compartidos entre distintos computadores.

## 1. Crear el proyecto gratuito

1. Ingresar a [Supabase](https://supabase.com/) y crear un proyecto Free.
2. Esperar a que termine la preparación de la base.
3. En **SQL Editor**, abrir un nuevo query.
4. Copiar y ejecutar el contenido completo de `supabase-pilot-schema.sql`.

## 2. Configurar autenticación

En **Authentication > URL Configuration**:

- Site URL: `https://larreca.github.io/margenreal/yeppo-b2b-v10/`
- Agregar la misma dirección en Redirect URLs.

Para una prueba rápida se puede mantener la confirmación por correo. El usuario deberá confirmar su correo antes de ingresar.

## 3. Conectar el CRM

1. Abrir el CRM como Matías.
2. Entrar en **Configuración > Usuarios y KAM**.
3. En **Conexión Supabase Free**, ingresar:
   - Project URL.
   - `anon` key o `publishable` key pública.
4. Presionar **Guardar y conectar**.
5. En la pantalla de acceso, seleccionar **Crear primer administrador**.

El primer usuario registrado queda como Administrador. Los siguientes se crean desde la sección Usuarios y KAM.

## Seguridad

- Usar únicamente la clave pública `anon`/`publishable` en el CRM.
- **Nunca** copiar la clave `service_role` al navegador o al repositorio.
- Las políticas RLS del archivo SQL limitan las modificaciones según el rol activo.
- Administrador y Supervisor pueden revisar la bitácora completa.
- KAM modifica su cartera y consulta su propia actividad.
- Solo lectura puede consultar, pero no modificar.

## Información compartida

Al activar Supabase se sincronizan:

- perfiles y roles;
- asignación de clientes a KAM;
- cambios de pipeline;
- tareas y próximas acciones;
- modificaciones manuales de fichas;
- bitácora con usuario, acción, fecha y hora.

Los datos originales de Shopify continúan usando la carga actual del CRM. Supabase almacena las modificaciones comerciales y la trazabilidad del equipo.
