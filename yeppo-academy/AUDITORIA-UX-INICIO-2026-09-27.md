# Auditoría UX/UI del inicio · Yeppo Academy

Fecha: 27 de septiembre de 2026 (Chile). Vista capturada: 1363 × 936 px en la versión pública `/revision`. Se recorrió la primera pantalla, el método Yeppo, la historia de centella y la primera fila de capítulos. Las capturas originales están en `ux-home-01-desktop.png`, `ux-home-02-method.png` y `ux-home-03-courses.png` del espacio de revisión.

## Recorrido y hallazgos

| Paso | Estado inicial | Evidencia y decisión |
| --- | --- | --- |
| 1. Entender la propuesta y elegir ruta | Corregido en escritorio | La cabecera permanece arriba y el mensaje principal se entiende. La columna de rutas medía 481 px, pero contenía cuatro tarjetas de 107 px de ancho. Los títulos estaban en 15 px, las descripciones en 10 px y el botón de flecha en 29 × 29 px. En producción, la cuadrícula de dos columnas presenta tarjetas de 230 × 218 px, títulos de 18 px, descripciones de 12 px, flecha visual de 36 px y enlace que cubre toda la tarjeta. La primera pantalla mide 568 px de alto a 1363 px de ancho, sin desbordamiento horizontal. También se elevó el texto de navegación de 11 a 13 px y el texto secundario del hero de 13 a 15 px. |
| 2. Entender el método y la historia | Aceptable | La secuencia de tres pasos se distingue y el enlace conduce a una lección. La historia de centella dispone de foto real, texto y fuente. Hay una separación amplia antes de la historia y su fotografía tiene una estética más documental que de belleza; conviene sustituirla por una toma botánica aprobada por Yeppo, sin perder su carácter de fotografía real. |
| 3. Explorar capítulos | Aceptable con mejora menor | Tres tarjetas del mismo ancho, imágenes de 260 px de alto y cuerpo estable de 260 px. Los títulos largos saltan de línea sin tapar el enlace. La línea de metadatos tiene letras pequeñas y mucho espaciado; conviene comprobar su lectura en teléfono antes del lanzamiento final. |

## Coherencia y acceso

- La ruta de productos mostraba “Capítulos 10–20” cuando solo 10–12 estaban disponibles. Ahora indica “Capítulos 10–12”; la ruta de negocio indica “Próximamente”.
- Antes, solo la flecha de 29 × 29 px abría una ruta. Ahora toda la tarjeta activa es enlace, lo que amplía el área táctil y de teclado. El estado de foco tiene contorno visible.
- La primera versión de la cuadrícula nueva recortó dos rostros en las miniaturas. Se ajustó el punto de recorte de esas fotos hacia la parte superior antes de cerrar la revisión.
- La portada usa un acento rosa, fondos claros, retratos y una misma familia tipográfica en las secciones observadas. En la zona del método el espacio vertical es más generoso, pero no interrumpe el recorrido hacia los capítulos.
- No se pudo cambiar el ancho del navegador conectado durante esta auditoría. Las reglas CSS para 901–1120 px, 651–900 px, 421–650 px y hasta 420 px se ajustaron; falta captura visual y prueba táctil en un teléfono real. Las capturas no demuestran accesibilidad completa ni comportamiento con lectores de pantalla.

## Verificación

- `npm run build`: correcto tras los cambios.
- Producción: se comprobaron el ancho de 230 px, alto de 218 px y los tres enlaces de tarjeta. Las imágenes de la primera pantalla cargaron y no hubo desbordamiento horizontal en 1363 px.
