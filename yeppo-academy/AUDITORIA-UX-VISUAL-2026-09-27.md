# Yeppo Academy · auditoría visual y de UX (27-09-2026)

Alcance: portada pública, lector de los 12 capítulos desarrollados, rutas, imágenes locales y contenido visual. Esta revisión no sustituye la comprobación manual en navegador tras el despliegue.

| Área | Hallazgo | Corrección aplicada | Estado |
|---|---|---|---|
| Infografías 2.1–2.4 | Cuatro WebP truncados (RIFF declara más bytes que el archivo); 2.1 había perdido la referencia y al restaurarla quedó dentro del título. | Reemplazados por cuatro SVG válidos, con 2.1 en el flujo de lectura y fuente junto al dato. | Compilación y XML verificados; 2.1 inspeccionado visualmente en local. |
| Capítulos 1, 3, 11, 12 | Sin infografía propia dentro de la lección. | Mapas didácticos de Yeppo en el primer módulo. Capítulo 9 distingue señal roja y emergencia. | Compilación verificada. |
| Fotos ajenas en 1–3 | Fuentes visuales de Arumi, Rakuen, COSRX, Anua y prensa; algunas fotos tenían pie incompatible con la nueva imagen. | Sustituidas por tienda Yeppo y productos del catálogo Yeppo; corregidos textos y enlaces del estudio de tres productos. | 16 imágenes dentro de 1–3: 16 locales, 0 de competidores. |
| Capítulos 4–10 | Diagramas propios existentes y fotografías clínicas/contextuales externas; imágenes de producto alojadas en CDN Shopify. | Conservadas las fuentes clínicas por su propósito educativo. | XML local válido; carga remota completa pendiente de prueba visual. |
| Portada y aprendizaje | 12 tarjetas planas; CTA de login sin cuentas; edición visible; progreso ficticio en revisión. | Cuatro rutas, estado disponible, duración estimada, editor fuera de vista pública, acceso editorial protegido por rol y lectura estructural por módulo. | Compilación verificada. |
| Navegación | Tira horizontal de ocho módulos poco útil para estudio largo. | Índice sticky vertical en escritorio, acordeón de índice y barra inferior de pasos en móvil. | Falta inspección de móvil en navegador. |
| Práctica | Cuestionarios finales, pocos ejercicios breves con feedback. | Casos de decisión con explicación en 1, 2, 3, 9, 11 y 12. | Compilación verificada. |

## Validación

- `npm run build`: correcto.
- 40 archivos en `public/assets` verificados por decodificación raster o análisis XML; 0 corruptos.
- 65 referencias locales examinadas en contenidos y componentes; 0 rutas ausentes.
- Primera infografía del capítulo 2 inspeccionada en navegador local: carga en tamaño legible.
- Dato Chile 2025: US$25,6 millones CIF, +753% desde 2019, más de la mitad skincare; [La Tercera](https://www.latercera.com/pulso/noticia/el-boom-de-la-cosmetica-coreana-quienes-estan-detras-de-su-explosion-de-ventas/). No representa ventas de Yeppo.

## Imágenes entregadas por el usuario

Las 17 composiciones sirven como dirección de arte. Algunas incluyen envases ficticios con el logotipo Yeppo o métricas sin fuente (por ejemplo +28% anual). No se integraron como gráficos fácticos. Para publicarlas harían falta las fotografías base, productos reales y cifras verificadas; las fotos reales de portada y productos de catálogo actuales cubren esa función por ahora.

## Pendiente para salida completa del brief

- Conectar base de datos y autenticación para habilitar edición persistente con roles, borrador/publicado y versiones; el editor público local fue retirado.
- Medir progreso real, reanudación y analítica una vez activadas las cuentas.
- Verificar navegación interactiva y responsive en producción con navegador disponible. La herramienta de navegador quedó bloqueada por límite de uso durante esta revisión; no se afirma una prueba móvil completa.
