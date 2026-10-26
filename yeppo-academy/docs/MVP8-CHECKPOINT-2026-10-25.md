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


## Continuación: capítulos 11 y 13 · 25/10/2026

**Nueva autorización editorial:** se permite sustituir contenidos, infografías, fotografías y prácticas si mejora la comprensión, exactitud y UX, preservando las reglas originales de la rúbrica y la evidencia. No mantener un recurso débil por inercia. Preservar PNG aprobados si siguen cumpliendo la calidad exigida.

**Capítulo 11:** ocho casos didácticos con resolución y límites, 24 preguntas independientes, diagramas H-E-O-B y barrera cutánea; foto real de Round Lab Birch Juice Moisturizing Cream del catálogo Yeppo en 11.6. Fuentes contrastadas con DermNet, AAD y yeppo.cl.

**Capítulo 13:** ocho casos didácticos, 24 preguntas independientes con vetos de seguridad y dos diagramas nuevos (brillo/poros/brotes y precauciones BHA/LHA). Fuentes AAD. No extrapolar usos médicos a claims cosméticos.

**UX:** las soluciones de casos guiados solo se muestran cuando el alumno escribe previamente una decisión de al menos 20 caracteres. La respuesta se mantiene localmente en pantalla; no es examen ni se persiste. El examen formal de tres preguntas exige 3/3 correctas, al ser un umbral de al menos 80 %.

**Calidad:** la regla técnica de 8/10 y las pruebas de regresión están en lib/quality-gate.js y tests/quality-gate.test.mjs. Se mantienen vacías las notas no verificadas. Exige fuentes, revisión sustantiva, práctica, recursos visuales, anchos 360/390/768/1280, zoom 200 % y reauditoría.

**Matriz de seguimiento:** archivo generado en la conversación YEPPO_Academy_Matriz_MVP8_Revision_Capitulos_11_13_2026-10-25.xlsx, con 400 filas, 16 en corrección, evidencia y fuentes. No sustituye pruebas visuales ni certifica módulos.

**Inventario objetivo:** 50 capítulos, 400 módulos, 40 evaluaciones independientes en el código desplegable (8 previas + 32 nuevas) y 96 preguntas añadidas. Confirmar siempre el último CI. Aún 0 módulos acreditados con nota nueva >= 8 por falta de inspección visual completa y reauditoría.

**Reanudación:** verificar el último CI y preview; inspeccionar 11.1–11.8 y 13.1–13.8 a todos los anchos, zoom 200 % y teclado; registrar hallazgos; continuar con seguridad 8–9 y 45–47, precio 28–30 y simuladores 48–49. No publicar producción sin aprobación final.

## Prioridad actualizada: ruta 6 hasta ruta 10 (prevalece sobre orden anterior)
El usuario solicita explícitamente anteponer los capítulos 28–50 a los anteriores. Leer la planificación y estado en `docs/PRIORIDAD-RUTAS-6-10-2026-10-25.md` antes de retomar; ahora se empieza por 28–35, luego 36–40, 41–44, 45–47, 48–50. Tratar fallos críticos de seguridad sin demora. El inicio antes mostraba solo cuatro rutas porque `schools.slice(0,4)` truncaba las tarjetas; se corrigió a todas las escuelas y se verificaron diez tarjetas en una preview real. Capítulo 28: ocho casos prácticos simulados, cinco preguntas por lección (40 preguntas), dos recursos nuevos para módulos 28.4/28.5. El último CI validado para ese lote pasó 53 pruebas sin fallos y registró 50 capítulos, 400 módulos, 48 evaluaciones independientes y ninguna referencia de imagen local faltante. **Las notas editoriales permanecen sin verificar**: pruebas unitarias y 200 HTTP no prueban resolución responsive, accesibilidad ni contenido ≥8. Cambios solo en rama de revisión; no producción.
