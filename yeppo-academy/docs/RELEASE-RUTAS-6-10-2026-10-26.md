# YEPPO Academy — Producción y continuidad de ruta 6

Fecha de ejecución: 2026-10-26.
Proyecto Vercel: `yeppo-academy-mvp`; dominio público: https://yeppo-academy-mvp.vercel.app/revision

## Estado desplegado

- Versión actual en producción: **39b7bf79658ebf0dacf15bdf532d8eda3d9e96be**.
- Despliegue: `dpl_Ep7jkC1dPEXCVEViUfKL83rdmryg`, target **production**, estado **READY**.
- Prueba CI: https://github.com/larreca/margenreal/actions/runs/40342204691 — 68/68 pruebas, inventario 50 capítulos / 400 módulos, 64 módulos con evaluaciones independientes, sin imágenes locales faltantes, compilación exitosa.
- Verificación en dominio de producción: inicio con las 10 rutas; módulos 31.1 y 31.8 visibles; herramientas y formularios 29.8 y 30.8 visibles, HTTP 200.
- Antes de esta versión: release `ca05e960fd1530b74d6f063363aef285c7c3f13f` (primera tanda 28,29,30), deployment `dpl_8dGKLnBTAo6A9ktmk2a2JLeh2UnZ`, también READY.

## Entregado durante esta continuación

1. **Capítulo 29**: ocho prácticas sobre inventario, cobertura, ROP, safety stock, ABC/XYZ, transferencias y reportes; 40 preguntas independientes; infografía On hand vs disponible; Shopify cambió a On hand en informes desde el 01-10-2026 según documentación oficial.
2. **Capítulo 30**: ocho problemas desarrollados con IVA general SII 19 %, comisión base bruta/neta, markup, descuentos, GMROI y pricing B2B; 16 preguntas adicionales y paso de exámenes a 5 preguntas por módulo (versión 2).
3. **Capítulo 31**: ocho casos simulados sobre estrategia promocional, incentivos, bundles, umbrales, inventario, segmentación, incrementalidad y playbook; 40 preguntas independientes. El ejemplo de Cyber octubre 2026 se contextualizó como histórico, no evento vigente.
4. **Calculadoras**: `lib/commercial-calculators.js` y pruebas de valores vacíos, cero, negativos, IVA, descuento, margen, cobertura y denominadores. `ChapterReader.js` utiliza los resultados validados; sell-through no comparable muestra N/D.
5. **10 rutas visibles en el inicio** (previamente 4 por `schools.slice(0,4)`); acceso validado a rutas finales.

## Pendientes esenciales

- **No adjudicar nota 8/10 todavía** a 28–31 ni a otros: requieren reauditoría de contenido y fuentes en cada módulo, inspección visual real a 360/390/768/1280, zoom 200 %, accesibilidad, resolución guiada de ejercicios y matriz de evidencias.
- La certificación de alumnos, cuentas/pagos, integración y pruebas con usuarios reales siguen pendientes del hito de lanzamiento acordado.
- El GitHub `main` NO se fusionó: publicación efectuada mediante despliegues Vercel de commits concretos, sin cambios en la rama predeterminada. La rama de revisión sigue disponible.
- Riesgo operacional: pushes futuros a una rama de producción distinta podrían reemplazar la versión; comprobar commit en Vercel antes de cerrar el siguiente lote.

## Siguiente capítulo: 32 — Merchandising físico

Revisar módulos 32.1–32.8, profundidad, diagramas y planogramas, fotos auténticas de Yeppo si corresponden, casos aplicados de layout, testers, comunicación y reposición. Construir evaluaciones independientes, guardar evidencias, probar CI y mantener prioridad ruta 6 hasta completar 35; después rutas 7–10 (capítulos 36–50). No inventar fotos ni ventas de tiendas Yeppo.

Este checkpoint es registro de despliegue técnico y contenido, **no** acreditación de calidad editorial general ≥8/10.
