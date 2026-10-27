# YEPPO Academy · Cierre técnico de ruta 6 (capítulos 28–35)

Fecha de release: 2026-10-26. En producción: https://yeppo-academy-mvp.vercel.app/revision

## Versión publicada y pruebas reproducibles
- Commit Git exacto: `2de363c31ac5dca95f4b1013706d82cca1e5ad7c`
- Deployment Vercel: `dpl_Ce9ZyPpu8ePx3JJVo66NhqwrzRQV`, target **production**, estado **READY** y alias público `yeppo-academy-mvp.vercel.app`.
- Ejecución Github Actions: https://github.com/larreca/margenreal/actions/runs/40363540025 — **85/85 pruebas superadas, 0 fallos, compilación Next correcta**.
- Inventario CI: 50 capítulos, 400 módulos y 96 con evaluación independiente. Sin referencias locales a imágenes faltantes.
- Comprobación en dominio público: inicio con 10 rutas, módulos 34.4 / 34.8 / 35.4 / 35.7 y SVG de transparencia/claims devuelven HTTP 200 y contenido esperado. No hay comprobación de UX real con teclado y anchos.

## Capítulos 34–35 incorporados
### 34 · Instagram y TikTok
- Casos 34.1–34.8: objetivos y KPI, hooks verificables, demostración, UGC/afiliados, clic a variante PDP correcta, DM y privacidad, derechos de música e imagen, medición de embudo.
- 8 prácticas que requieren respuesta escrita antes de abrir solución; 5 preguntas por módulo, 40 en total, umbral 80 %.
- Vetos de seguridad en publicidad de colaboración no identificada, alegaciones terapéuticas falsas, uso indebido de datos de clientes y recursos no autorizados.
- Dos nuevos SVG didácticos (comercial/no comercial, embudo de Reel); se conservan los ocho gráficos anteriores.
- Fuentes verificadas: SERNAC circular publicidad nativa/influencers (https://www.sernac.cl/portal/618/w3-article-65742.html), Meta branded content label (https://www.facebook.com/help/instagram/616901995832907), TikTok comercial disclosures (https://support.tiktok.com/es/business-and-creator/creator-and-business-accounts/promoting-a-brand-product-or-service), TikTok música comercial (https://support.tiktok.com/es/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok). Verificar políticas en el momento de publicar contenido real.
### 35 · Video de venta
- Casos 35.1–35.8: pregunta concreta, hook realista, textura/dimensiones, claims y antes/después, elección de formato, storyboard, video 9:16 y zonas seguras, test A/B, CTR y conversiones.
- 8 prácticas y 40 preguntas independientes con vetos por before/after engañoso, claims de enfermedad sin respaldo y música sin licencia comercial.
- Dos nuevos SVG didácticos (control de before/after y video con zonas seguras) más las ocho infografías base.
- Fuentes verificadas: SERNAC (https://www.sernac.cl/604/w3-article-78768.html) y Meta Reels (https://www.facebook.com/business/ads/facebook-instagram-reels-ads).

## Estado ruta 6
- **8 capítulos 28–35** con nuevas prácticas y exámenes independientes: 64 módulos de esta ruta. Otros 32 módulos de capítulos anteriores también tienen evaluación independiente.
- Las pruebas de regresión y el deploy prueban integridad técnica, no validan una nota editorial de >=8 ni certifican contenido clínico/regulatorio. Notas pendientes hasta inspección de cada módulo (profundidad, claridad, visuales, aplicación, evaluación, fuentes), revisión de claims y fuentes, captura real 360/390/768/1280 px, zoom 200 %, teclado y reauditoría independiente.
- Hay datos y operaciones **simuladas** en ejercicios, nunca tratarlos como reportes de Yeppo. No se modifica inventario ni precios reales Shopify.

## Siguiente prioridad de mejora: ruta 7
- Capítulos **36–40**, iniciando **36: Viaje del cliente** (8 módulos). Temas identificados en el código: 36.1 mapa no lineal, 36.2 descubrimiento, 36.3 consideración, 36.4 compra multicanal, 36.5 entrega/primer uso, 36.6 soporte, 36.7 recompra, 36.8 advocacy/playbook.
- Después 37 Seguimiento, 38 CRM para tiendas de belleza, 39 [inspeccionar título y contenido antes de actualizar], 40 Métricas del negocio.
- Reutilizar fuentes pertinentes: Shopify Digital Customer Journey (https://www.shopify.com/blog/digital-customer-journey) y Post-Purchase Experience (https://www.shopify.com/blog/post-purchase-experience-ecommerce), SERNAC comercio electrónico y retracto (https://www.sernac.cl/portal/604/w3-article-11727.html).
- Los casos deben distinguir cliente final y B2B, contacto consentido, señales de uso y riesgo; no asumir secuencias lineales ni frecuencia de consumo universal.
- Al terminar ruta 7, seguir ruta 8 (41–44), ruta 9 (45–47) y ruta 10 (48–50) con bloqueos críticos de seguridad. No inventar resultados operacionales.

**Procedimiento:** trabajar en rama `codex/academy-autonomia-mvp8-20261025`, mantener fuente previa, evaluar individualmente 8 módulos/capítulo, compilar y probar, desplegar a Vercel solo commit aprobado; mantener nota de calidad en estado «pendiente de verificación» hasta auditoría editorial/visual.
