# YEPPO Academy · Auditoría y preparación de publicación integral MVP ≥8

**Fecha:** 2026-10-26. **Rama de cambios:** `codex/academy-autonomia-mvp8-20261025`. **Sitio de producción existente:** https://yeppo-academy-mvp.vercel.app/revision.

## Alcance del lote ejecutado
- Capítulos **8–10 y 41–50**: 13 capítulos × 8 lecciones = **104 módulos** enriquecidos con caso concreto, pregunta de aplicación, pauta de resolución, evidencia, riesgo y siguiente control, referenciados por fuentes aplicables.
- **520 preguntas** en 104 evaluaciones independientes de 5 ítems, con umbral de 80 % y control de error crítico cuando corresponde. El capítulo 50 ahora exige aprobar también las evaluaciones por módulo; pasar solo el examen final antiguo ya no basta.
- **10 SVG didácticos nuevos** legibles y con `title`, `desc`, `alt`, sobre OTB, matriz de recomendación, ROP, sell-through, verificación ISP, trazabilidad, alertas de reacción, margen SKU y veto de seguridad. Se preservaron imágenes originales.
- En **8 y 9** se incorporaron 16 ejercicios críticos de límites de asesoría, urgencias, documentación y derivación con 80 preguntas. En **10** se incorporaron 8 casos de INCI y rotulado con 40 preguntas adicionales; todo el contenido existente se conservó.
- Casos con cifras simuladas y fuentes comprobables; no se utilizaron datos de clientes, pedidos o stock de Yeppo, ni se actualizaron productos en Shopify, Klaviyo o Smile.
- Fuentes sanitarias contrastadas: https://www.ispch.cl/anamed/cosmeticos/base-de-datos-cosmeticos-registrados-y-notificados/ ; https://www.ispch.cl/anamed/cosmetovigilancia/notificacion-de-reaccion-adversas-a-cosmeticos-rac/ ; https://nuevo.leychile.cl/navegar?idNorma=211455. Una sospecha no es un diagnóstico ni prueba automática de falsificación.

## Evidencia técnica (NO equivalente a nota editorial)
- CI validado: https://github.com/larreca/margenreal/actions/runs/40400834973 .
- Resultado: **121/121 pruebas, 0 fallos; build correcto; 50 capítulos; 400 módulos; 240 con evaluación independiente; 0 errores de recursos locales**.
- Último commit de código CI validado `4f98d931bd41d061fe4b68f5160be85ed12e6322`.

## Bloqueo de publicación identificado
El intento de despliegue explícito a **production** usando el commit inicial validado `67616f37c19e0a46885b0d326ff6d7db87e8f350` y el proyecto `prj_5B2rGl0zQ0i9njn1FbHWaN2JfZlW`, equipo `team_eQzfFd2pbl1QA6c26LqwiI2x`, devolvió **HTTP 402 `api-deployments-free-per-day`**: más de 100 despliegues diarios. Se informó `retryAfter=86400`. En el entorno no hay sesión utilizable de CLI Vercel; no debe declararse la versión publicada ni inventar un despliegue READY. No modificar facturación ni cambiar proyecto para evitar el límite. Reintentar cuando el servicio permita desplegar, verificar dominio público, lecciones, SVG y persistencia antes de cerrar.

## Rúbrica real y brechas para la meta 8 por módulo
La rúbrica vigente exige simultáneamente:
- 30 % profundidad; 10 % claridad; 20 % visual; 15 % aplicación; 15 % evaluación; 10 % fuentes.
- Ponderado ≥8,00 sin redondear; profundidad y visuales ≥8; otras ≥7; sin errores críticos y con evidencia real.
- 360/390/768/1280 px, zoom 200 %, teclado, imágenes ampliadas, precisión científica/jurídica, fuentes trazables y una **segunda revisión independiente**.

**Estado verificable hoy:** 240/400 módulos con evaluación independiente; **160/400 todavía sin esa condición mínima**. Ninguno de los 400 recibe nueva nota editorial verificada ≥8 por esta ejecución; la matriz de CI conserva notas en blanco hasta revisar evidencias. Las 121 pruebas automáticas y 10 nuevas infografías no constituyen certificación académica.

**Otros pendientes:** revisar las imágenes remotas y su procedencia/licencias (el control CI solo verifica rutas locales), prácticas escritas no guardadas automáticamente, pruebas de usuario, calidad de feedback y fuentes por afirmación; configurar acceso, pagos y certificados sólo en la etapa de lanzamiento autorizada.

## Prioridad después de resolver la publicación
1. **P0 seguridad y fuentes**: 8–9, 45–47, 48.6 y examen 50.8, con revisión sustantiva de preguntas, vetos y guías ISP/derivación.
2. **P1 evaluación de 160 módulos** sin quiz independiente, sobre todo capítulos 1–27 fuera de 8–10; elaborar evaluaciones pertinentes, no cuestionarios generados por palabras clave.
3. **P1 calidad visual**: corregir capturas, fotos de producto/tienda reales verificadas, metadatos de imagen y lectura a cuatro viewports; no dar 8 por HTTP 200.
4. **P1 reauditar los 400** con actas por módulo, nota ponderada y pruebas anexas, sin subir artificialmente calificaciones.
5. Validación final con alumnas/os y aprobación explícita del responsable para preventa/lanzamiento.

Fuente de protocolo y base histórica: `YEPPO_Academy_Protocolo_Mejora_Autonoma_MVP_8_V1.md` y `YEPPO_Academy_Auditoria_Preventa_2026-10-25.md` proporcionados por el responsable del proyecto. La auditoría histórica NO es una calificación del código actualizado.
