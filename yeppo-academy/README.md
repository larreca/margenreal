# Yeppo B2B Academy

Aplicación de formación K-Beauty para clientes B2B de Yeppo.

## Arquitectura
- Next.js / React
- Cloudflare Workers (vinext) o Vercel
- Neon Postgres
- Autenticación propia con sesión HTTP-only
- Contenido editable por bloques
- Borradores, publicación e historial de versiones
- Progreso individual por usuario
- Empresas con múltiples usuarios
- Roles: super_admin, editor, reviewer, support, company_admin, student

## Diseño
El Capítulo 1 es la plantilla visual maestra. Todos los capítulos se renderizan mediante los mismos componentes y reglas de lectura; el contenido cambia, la interfaz no.

## Variables de entorno
```
DATABASE_URL=
AUTH_SECRET=
SETUP_TOKEN=
```

## Primera configuración
1. Crear una base Neon y aplicar `db/schema.sql`.
2. Configurar las variables de entorno.
3. Abrir `/setup` y crear el primer Super Admin con SETUP_TOKEN.
4. Ingresar en `/login`.
5. Usar `/admin` para contenido, empresas, usuarios e invitaciones.

El contenido histórico de la academia se conserva en `data/academy.seed.json` como semilla/fallback y puede publicarse gradualmente desde el editor.

## Despliegue en Cloudflare Workers

El proyecto conserva el build de Next.js y agrega un build de vinext para Workers.
La base Neon debe tener aplicado `db/schema.sql` antes del primer acceso. No poner
la cadena de conexión ni las claves en el repositorio o en `wrangler.jsonc`.

```bash
npm ci
npm run build:vinext
npm run deploy:vinext
```

En el panel del Worker, configurar como **secretos cifrados** `DATABASE_URL`,
`AUTH_SECRET` y `SETUP_TOKEN`. El Worker usa `process.env` gracias a
`nodejs_compat` y la fecha de compatibilidad de `wrangler.jsonc`. Crear las
claves con valores largos y aleatorios; no reutilizar las claves locales.
El archivo `.dev.vars` sirve únicamente para desarrollo y está ignorado por Git.

Después del despliegue, verificar `/api/health` (`ok: true`) y completar
`/setup` una sola vez para crear el Super Admin y cargar los capítulos. Validar
login, progreso, evaluación y publicación antes de invitar clientes. La URL del
Worker es pública, pero las páginas privadas requieren sesión.

El plan gratuito de Workers tiene límites diarios; vigilar el uso y las
respuestas de error antes de ofrecer una disponibilidad garantizada a clientes.
