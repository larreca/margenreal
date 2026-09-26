# Yeppo B2B Academy

Aplicación de formación K-Beauty para clientes B2B de Yeppo.

## Arquitectura
- Next.js / React
- Vercel
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
