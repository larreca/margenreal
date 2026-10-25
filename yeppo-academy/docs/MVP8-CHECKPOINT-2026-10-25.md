# Yeppo Academy · checkpoint de mejora autónoma MVP 8/10
Fecha: 2026-10-25. Rama recuperable: `codex/academy-autonomia-mvp8-20261025`. Base: `codex/preventa-evaluaciones-visuales`. PR borrador: https://github.com/larreca/margenreal/pull/3

## Regla de honestidad
**Ni un solo módulo tiene en esta ejecución una nota nueva verificada ≥8,0.** El inventario automático revisa estructura y rutas, no la calidad pedagógica. No fusionar a producción ni anunciar lanzamiento por los avances de ingeniería.

## Línea base y versiones
- Documento rector externo: `YEPPO_Academy_Protocolo_Mejora_Autonoma_MVP_8_V1.md`.
- Auditoría histórica externa: `YEPPO_Academy_Auditoria_Preventa_2026-10-25.md`, con matriz de 50 capítulos y 400 módulos. Nota media estructural inicial **orientativa**, no comparable directamente con auditoría de evidencias.
- `node scripts/audit-inventory.mjs`: genera `reports/matriz-evidencias-400.csv` y `reports/auditoria-estatica.json` con notas actuales vacías. Revisar resultado en artefactos CI.
- El usuario también dispone de un Excel de seguimiento de 400 filas, **sin notas actuales inventadas**, enlazado en la conversación de esta ejecución.

## Cambios realizados en borrador
1. Veto de respuesta crítica para evaluaciones independientes; feedback para alumna/o; pruebas automáticas del fallo de seguridad.
2. 16 evaluaciones independientes nuevas en capítulos 12 y 30, 3 preguntas por lección (48 preguntas en total). Casos y cifras comerciales explícitamente simulados.
3. Corrección editorial del esquema general del capítulo 12: ahora describe entrevista, verificación, elección y seguimiento sin asignar a los módulos títulos equivocados.
4. Redirección de cuatro rutas históricas de imagen WebP ausentes en capítulo 2 a infografías SVG existentes con mismo nombre temático; pendiente inspección visual en navegador.
5. CI de PR: tests unitarios, inventario de activos locales, artefacto de matriz y build.

## Pendientes críticos que no puede sustituir CI
- Auditar realmente los 400 módulos con las 6 dimensiones; notas ponderadas ≥8, profundidad y visuales ≥8, otras dimensiones ≥7 y cero bloqueos críticos.
- Verificación de fuentes científicas, reglamentos chilenos y fichas de fabricante, más procedencia/licencias.
- Inspección manual o navegador a 360/390/768/≥1280 px, zoom 200 %, teclado, imágenes activas, ampliación y alt; reparación de cada hallazgo.
- Pruebas completas de 14.8, 50.8, 12.1 en interfaz, persistencia y regresiones; prueba independiente ya escrita para lógica de calificación.
- Profundidad de 11–13, seguridad 8–9 y 45–47, negocio 28–30 y 40–44, simuladores 48–49; reauditoría final.
- Hito B de acceso, pagos, cuentas, sincronización y certificados permanece pospuesto por mandato. Aprobación final de publicación corresponde al responsable del proyecto.

## Reanudación exacta
1. Revisar el resultado más reciente del workflow de PR #3. Si falla, reparar antes de añadir contenido.
2. Importar el CSV de CI / Excel de seguimiento y actualizar la fila correspondiente después de inspeccionar evidencias reales.
3. Auditar 12.1 a 12.8, incluyendo visual del capítulo 12 y preguntas; luego 30.1 a 30.8 y calculadoras.
4. Continuar los lotes del protocolo en orden sin cambiar rúbrica. Guardar commits y registrar bloqueos parciales.
