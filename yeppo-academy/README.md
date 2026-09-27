# Yeppo B2B Academy

Aplicación de formación K-Beauty para clientes B2B de Yeppo.

## Arquitectura
- Next.js / React
- Netlify Free para la publicación posterior a la revisión
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

## Revisión editorial antes del lanzamiento

Los capítulos 1–11 tienen ocho módulos y evaluación; 8–11 son borradores para
revisar. Los capítulos 12–50 continúan como esquemas editables. La ruta del
alumno muestra inicialmente los capítulos 1–7; un capítulo nuevo se suma al
mapa y al buscador solo después de publicarlo desde el panel editorial.

En `/admin/content/{id}` se puede modificar título, resumen y texto de cada
módulo, agregar módulos, y vincular un video opcional de YouTube o Vimeo por
módulo. `Guardar borrador` conserva cambios sin exponerlos a los alumnos;
`Vista previa como alumno` los muestra después de guardar. Revisar allí antes
de `Enviar a revisión` y `Publicar versión`. Las fichas de productos en el
capítulo 11 enlazan al catálogo vigente y evitan fijar un INCI permanente.

La copia autónoma `yeppo_academy_revision.html` permite revisar y editar en el
navegador sin servidor. Guarda los cambios en ese navegador y descarga un JSON
de respaldo. Ese archivo no actualiza automáticamente la base de producción;
en el editor de cada capítulo se puede usar `Cargar cambios desde la vista de
revisión`, revisar el resultado y guardar el borrador antes de lanzar.

## Despliegue en Netlify Free

El archivo `netlify.toml` en la raíz del repositorio configura la carpeta
`yeppo-academy` como proyecto Next.js. Conectar el repositorio desde Netlify,
seleccionar la rama del MVP y mantener el comando `npm run build` y la carpeta
publicada `.next`. Netlify instala automáticamente su adaptador de Next.js.

Configurar `DATABASE_URL`, `AUTH_SECRET` y `SETUP_TOKEN` como variables de
entorno privadas de Netlify antes del despliegue. Usar la cadena de conexión
del proyecto Neon existente y generar claves largas y aleatorias para los otros
dos valores. No incluirlas en Git ni en el enlace de despliegue.

Después de publicar, comprobar `/api/health`, crear el primer Super Admin en
`/setup` y validar login, progreso, evaluaciones y constancia antes de invitar
clientes. El plan Free detiene el sitio al llegar a su límite mensual de uso;
no produce cargos automáticos.
