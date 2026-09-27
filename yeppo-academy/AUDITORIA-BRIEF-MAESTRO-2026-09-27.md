# Yeppo Academy · auditoría del brief maestro

Fecha: 27 de septiembre de 2026. Alcance: `Brief_Maestro_UX_UI_Yeppo_Academy_para_Work(1).docx`, portada pública `/revision`, lector público de los capítulos 1–12, contenido semilla y la infraestructura de edición. Esta auditoría distingue lo comprobado en la web de lo comprobado en código; no presenta la preparación técnica como una función ya activada.

## Resultado por prioridad

| Prioridad | Criterio del brief | Estado verificado | Brecha o decisión siguiente |
|---|---|---|---|
| P0 | No mostrar edición al alumno | Cumple: `/revision/editar/[id]` exige rol y redirige al editor de administración; la navegación pública no muestra edición. | Mantener la separación al activar cuentas. |
| P0 | Login y progreso honestos | Cumple en la portada y el lector público: no hay CTA de ingreso, se muestra `Módulo n de 8` y se eliminó el falso completado en `localStorage`. `/login` informa que el acceso está en preparación cuando no existe base configurada. | Falta activar cuentas reales en la infraestructura publicada para guardar avance y reanudar. |
| P0 | CMS persistente, roles, borrador, versión y preview | Código preparado: `lib/academy.js` implementa borrador, revisión, publicación, versiones y restauración; administración exige rol. | **Pendiente de infraestructura:** base Postgres y secretos de sesión/configuración. Sin eso, la edición persistente no está operativa en esta URL. No se presenta como terminada. |
| P1 | Cuatro rutas antes del temario | Cumple: cuatro rutas en primera pantalla; ruta futura marcada Próximamente; 38 capítulos planificados en acordeón secundario. | La cuarta ruta no tiene lecciones disponibles todavía. |
| P1 | Tarjetas con estado, tiempo, nivel y objetivo | Cumple en los 12 capítulos: Disponible, ocho módulos, duración aproximada, nivel y objetivo en una frase. | La duración `~56 min` es estimación uniforme de siete minutos por módulo, no medición de lectura. |
| P1 | Índice sticky, contexto y paso siguiente | Cumple en desktop observado: índice izquierdo con módulo activo, lectura central y tres bloques de contexto a la derecha. El botón Siguiente lleva al módulo siguiente. | Verificar en teléfonos reales antes del lanzamiento definitivo. |
| P1 | Navegación móvil simplificada | Implementado en CSS y componente: índice colapsable y barra inferior Anterior / n de 8 / Siguiente. | No se logró variar el ancho del navegador conectado en esta auditoría; queda una verificación visual móvil pendiente. |
| P1 | Modelos diferentes en cada portada | Cumple en el código: 12 fotografías distintas con relación temática y texto alternativo específico; 11 imágenes comprobadas en producción y la nueva del capítulo 8 comprobada directamente en el alojamiento de origen. | Diez retratos dependen del CDN de Pexels; para un lanzamiento duradero conviene hospedarlos como activos locales. La localización de la toma en Chile no acredita nacionalidad. |
| P1 | Yeppo por encima de competidores | Mejora: el panel del lector muestra tienda o producto Yeppo, y 10/12 usan fotografía de persona en portada externa; fotografías de productos 1–3 y 10/12 son del catálogo Yeppo. | Los productos tienen marcas fabricantes visibles. Aún falta fotografía propia de asesoría/modelos contratadas por Yeppo para alcanzar de manera verificable el mix 60–70% de activos propios del brief. |
| P1 | Infografías útiles | Los 12 primeros módulos tienen un mapa didáctico Yeppo; 2, 4–10 además incorporan SVG temáticos. Se observó una infografía del módulo 5.2 cargada después de finalizar el desplazamiento. | Revisar legibilidad de todos los SVG en teléfonos; no asumir que una gráfica pequeña se entiende solo porque carga. |
| P1 | Casos con feedback | Los 12 primeros módulos tienen una decisión de tres opciones con explicación inmediata. Se probó el caso 5.1 y el avance a 5.2 en producción. | Los cuestionarios finales existentes muestran puntuación, pero no explican cada respuesta individual; mejorar antes de usar el resultado para certificación. |
| P1 | Evidencia, datos y red flags | El mercado del módulo 2.1 da año y fuente junto a cifras; el lector añade fecha de revisión. Los capítulos 10 y 12 distinguen historia, laboratorio, estudios en personas y producto terminado. La infografía 9 separa derivación de atención urgente. | La etiqueta de evidencia es una guía de lectura, no una clasificación validada para cada ingrediente/producto; falta etiquetado fuente por fuente si se decide mostrarlo en todas las lecciones. |
| P2 | Naming y navegación | Portada, títulos por capítulo y menú Ingredientes son coherentes. El retorno público dice Rutas de aprendizaje. | Revisar a futuro etiquetas de áreas internas `/academy` y certificados al activar las cuentas. |
| P2 | Analítica | Esquema de progreso y evaluación para cuentas preparado. | No hay métricas públicas reales; instrumentar inicio, abandono, reanudación y cohortes cuando el sistema de cuentas esté activo, con privacidad definida. |

## Revisión capítulo por capítulo

| Cap. | Imagen de portada | Visual didáctico en primera lección | Decisión práctica | Punto a vigilar |
|---|---|---|---|---|
| 01 | Retrato contemporáneo en Santiago | Filosofía → fórmula → conversación | Rutina de diez pasos | Evitar convertir K-Beauty en un número obligatorio de pasos. |
| 02 | Modelo en Santiago urbano | Interés → elección → seguimiento; gráfica de importación | Producto viral | Cifras 2025 son importaciones CIF de la categoría, no ventas Yeppo. |
| 03 | Retrato de maquillaje | Descubrimiento → asesoría → recompra | Comparación entre tiendas | Marcas rivales son contexto competitivo, no héroes visuales. |
| 04 | Piel con pecas en primer plano | Barrera → agua → alcance cosmético; capas de piel | Alcance de un sérum | No equiparar una capa cutánea con una promesa clínica. |
| 05 | Retrato editorial en Santiago | Tipo → estado → meta; mapa de tipos | Brillo y tirantez | La autopercepción no es un diagnóstico ni medición de sebo. |
| 06 | Aplicación de crema | Observar → reducir → derivar | Ardor tras varios activos | Derivar si la reacción persiste o empeora. |
| 07 | Retrato de piel con pecas | Escuchar → priorizar → revisar | Múltiples preocupaciones | No recomendar una rutina saturada. |
| 08 | Mujer observándose en un espejo | Observar → no diagnosticar → derivar | Pregunta sobre rosácea | Fotos clínicas del cuerpo de la lección requieren contexto y fuente. |
| 09 | Retrato en Santiago | Señal roja → urgente → acompañar | Dificultad respiratoria | La portada no representa una persona enferma; los signos urgentes están en el contenido. |
| 10 | Lectura de etiqueta | Etiqueta → INCI → fórmula → consejo | Reclamo de centella | Los productos exhibidos son de marcas vendidas por Yeppo; verificar fichas actuales. |
| 11 | Aplicación de hidratante | Humectantes → emolientes → oclusivos | Textura pesada | No inferir el efecto final desde un solo ingrediente. |
| 12 | Aplicación facial con brocha | Escuchar → leer → acompañar; guía de evidencia | Promesa sobre centella | Distinguir tradición, ensayos e información del producto final. |

## Evidencia y límites de la prueba

- `npm run build` completó correctamente tras estos cambios.
- En navegador de producción se comprobó la navegación Portada → Tarjeta de capítulo 2 → Lector, y Capítulo 5 → Respuesta del caso → Módulo 5.2. El índice lateral cambió de estado y el caso explicó la elección.
- La inspección DOM de las doce portadas publicadas antes del último ajuste mostró `complete=true` y `naturalWidth>0` en las doce imágenes. La nueva foto de 8 y su URL de origen se abrieron directamente; volver a comprobar la lista completa al acabar el siguiente despliegue.
- Las capturas desktop muestran que el menú superior y la columna izquierda permanecen visibles al desplazarse. Una captura tomada durante el desplazamiento suave mostró la infografía a medio entrar en pantalla; una segunda captura estable confirmó el SVG completo. No se cuenta esa primera captura como fallo.
- No se pudo hacer una inspección visual a ancho móvil con el navegador conectado. La presencia de reglas `@media` y de botones móviles en el código prueba implementación, no usabilidad en dispositivo real.
- No se verificó la nacionalidad de las modelos. Las fotografías Pexels son editoriales; no debe afirmarse que las personas son clientas, empleadas ni avalistas de Yeppo. [Licencia de Pexels](https://www.pexels.com/license/).

## Próxima salida de producción

1. Conectar Postgres y secretos de autenticación al despliegue; probar cuenta editor y cuenta alumno separadas, guardado, borrador, preview, publicación y restauración.
2. Revisar responsive en un dispositivo móvil y corregir cualquier recorte de infografías, navegación o controles.
3. Sustituir retratos alojados externamente por archivos aprobados y alojados por Yeppo, con autorización de uso de las modelos; verificar que no se sugiere aval comercial.
4. Incorporar explicación por pregunta en evaluaciones finales y definir si sus resultados realmente condicionarán certificación.
5. Instrumentar analítica educativa solo tras activar cuentas y definir consentimiento/privacidad.
