# Yeppo Academy · K-Beauty B2B

Aplicación independiente del CRM de Yeppo. Comparte únicamente lineamientos visuales (rosa, lila, navy, tarjetas y navegación).

## Archivos
- index.html — interfaz
- styles.css — sistema visual
- app.js — navegación, progreso, editor, importación/exportación y trivias
- content.js — mapa maestro inicial de 10 escuelas y 50 capítulos

## Edición
La edición desde navegador se guarda en localStorage y no modifica el contenido publicado.
Usa **Exportar** para generar `yeppo-academy-v1-content.json`.
Ese archivo puede revisarse y luego consolidarse en Git.

## Multimedia
Cada capítulo admite:
- URL de video
- URL de imagen
- URL de diapositivas/recurso
- trivia con pregunta, opciones y respuesta correcta

## Evolución prevista
V2: contenidos profundos por capítulo + recursos visuales.
V3: login de clientes, progreso sincronizado, evaluaciones y certificados.
V4: panel administrador, analítica y recomendaciones/surtido conectado al catálogo Yeppo.

## Seguridad
El modo editor de V1 es local: un visitante puede alterar solo su propia copia del navegador, nunca el contenido publicado.
