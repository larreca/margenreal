// Complemento editorial por lección. Los datos de tiendas son casos simulados salvo
// el corte histórico Yeppo indicado expresamente en 28.5.
const detail={
 '28.1':{
  title:'Cómo decidir si ampliar o profundizar',
  body:'Dibuja una fila por necesidad y anota las opciones que ya resuelven el mismo trabajo. Si falta fotoprotección de uso diario, existe un hueco de amplitud; si seis tónicos ofrecen precio, textura y función equivalentes, puede haber exceso de profundidad. Antes de quitar uno, compara ventas por variante, contribución, cobertura y diferencias observables. La unidad de análisis es la misión del cliente en cada canal o tienda, no el número total de marcas.',
  trap:'Contar SKU sin comparar necesidad, atributos y demanda puede producir quiebres en una categoría y exceso en otra.',
  source:['Oracle Retail · Assortment Planning 26.2','https://docs.oracle.com/en/industries/retail/retail-assortment-planning-cloud-service/26.2.301.0/']},
 '28.2':{
  title:'Rol, señal y regla de salida',
  body:'Un protector de reposición recurrente puede ser core: revisa disponibilidad y quiebres. Una mascarilla que atrae búsquedas puede ser tráfico: mide si genera pedidos rentables, no solo visitas. Un lanzamiento sin historial es tendencia: define compra de prueba, fecha de revisión y máximo de capital expuesto. Registra un rol principal y, si corresponde, uno secundario; cada uno debe tener un indicador y una señal de cambio. Un rol no autoriza mantener cualquier nivel de stock.',
  trap:'Llamar “héroe” a un producto por popularidad sin medir contribución, reposición y dependencia de marca.',
  source:['Oracle Retail · planeación de surtido por atributos y ubicación','https://docs.oracle.com/en/industries/retail/retail-assortment-planning-cloud-service/26.2.301.0/']},
 '28.3':{
  title:'Mismo período, misma base de costo',
  body:'En el trimestre simulado, A deja $900.000 de margen bruto sobre $600.000 de inventario promedio a costo: GMROI 1,5. B deja $700.000 sobre $250.000: GMROI 2,8. B usa mejor el capital, pero A aporta $200.000 más de margen bruto absoluto. Calcula inventario promedio con fechas comparables y costo puesto en bodega consistente. Antes de elegir incorpora disponibilidad, devoluciones, caducidad y costos de canal: GMROI no es margen neto ni pronóstico de demanda.',
  trap:'Comparar un margen bruto trimestral con inventario de un solo día o mezclar inventario a precio de venta con costo.',
  figure:['/assets/chapter28/cap28-gmroi-worked.svg','/assets/chapter28/cap28-gmroi-worked-mobile.svg','Comparación de dos SKU simulados: GMROI A 1,5 y B 2,8, con distinto margen bruto absoluto'],
  source:['Shopify · definición y cálculo de GMROI','https://www.shopify.com/blog/gmroi']},
 '28.4':{
  title:'Ficha de misión antes de seleccionar producto',
  body:'Para “protector solar cómodo cada día”, registra público, textura deseada, presupuesto, forma de aplicación, documentación del producto y oferta ya existente. Recién después compara candidatos. Una novedad solo merece lugar si cubre mejor un atributo concreto o llega a un segmento que hoy no está resuelto. Para piel reactiva evita prometer tolerancia universal; revisa ficha y modo de uso, y deja espacio a la prueba individual y la derivación profesional cuando corresponda.',
  trap:'Suponer que cinco marcas de la misma textura cubren cinco necesidades distintas.',
  source:['Oracle Retail · decisiones de surtido según cliente y ubicación','https://docs.oracle.com/en/industries/retail/retail-assortment-planning-cloud-service/26.2.301.0/']},
 '28.5':{
  title:'Qué se puede y qué no se puede inferir de una captura',
  body:'El corte Yeppo del 01/10/2026 conserva valor didáctico como dato histórico; no informa el inventario de hoy. Tampoco una cifra total confirma stock vendible, porque Shopify distingue disponible, comprometido y no disponible. Para calcular cobertura real necesitas stock disponible por ubicación, ventas netas diarias del mismo SKU y período, pedidos en tránsito, vencimiento y compromisos. Las velocidades de 120 y 40 unidades/día del ejercicio son totalmente inventadas: producen 63 y 189 días, respectivamente, y demuestran por qué una cifra de stock aislada no basta.',
  trap:'Publicar una alerta de “sobrestock Yeppo” a partir de 7.560 unidades históricas o tratar ambos escenarios simulados como ventas reales.',
  source:['Shopify Help Center · estados de inventario','https://help.shopify.com/en/manual/inventory-and-locations/fundamentals/inventory-states']},
 '28.6':{
  title:'Una compra de prueba tiene reglas antes de vender',
  body:'El caso de 40 unidades recibidas y 24 vendidas en 14 días da 60 % vendido de esa cohorte. Define de antemano el período de observación, el stock máximo que aceptarías retener, la señal de reposición y la señal de salida. Si reponer tarda 45 días, el mismo 60 % exige planificar antes que si el proveedor puede reponer mañana. Revisa devoluciones, margen, contenido y demanda por canal; un lanzamiento promocionado no demuestra por sí solo recompra estable.',
  trap:'Interpretar 60 % como umbral universal para ordenar 200 unidades adicionales.',
  source:['Shopify · métricas de inventario y sell-through','https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/analytics-fields']},
 '28.7':{
  title:'Un tablero se lee por excepciones',
  body:'En el caso simulado X vende 60 de 100 unidades recibidas: 60 % para esa cohorte y período. Y vende bien, pero su quiebre exige revisar disponibilidad, demanda y tiempo real de reposición. Z tiene cobertura elevada y margen bajo: frena nuevas compras hasta aclarar rol, vencimiento y costo de mantenerlo. Cada alerta debe terminar con una acción, responsable y fecha. El índice orientativo de la herramienta solo ordena revisión; sus pesos no son una política oficial de compra ni sustituyen margen y disponibilidad reales.',
  trap:'Usar el índice compuesto como permiso automático para comprar; un promedio puede ocultar un quiebre o margen negativo.',
  source:['Shopify Help Center · métricas analíticas de inventario','https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/analytics-fields']},
 '28.8':{
  title:'Cerrar el ciclo de una decisión B2B',
  body:'La revisión trimestral necesita una fila por SKU con rol, venta neta, margen bruto, stock disponible, cobertura, riesgo de vencimiento y decisión. En el caso simulado A requiere plan de proveedor por reposición incierta; B, compra de prueba con límite; C, revisión de profundidad antes de reducir. Para cada uno registra quién ejecuta, qué indicador cambiará y cuándo se evaluará otra vez. Sin ese seguimiento una matriz bonita no altera compras ni capital inmovilizado.',
  trap:'Mezclar unidades de distintas ubicaciones o concluir “salir” únicamente por bajo volumen sin revisar cobertura de misión.',
  source:['Oracle Retail · revisar surtido por período y ubicación','https://docs.oracle.com/en/industries/retail/retail-assortment-planning-cloud-service/26.2.301.0/']}
};
const frame=d=>'<section class="lesson-box academy-decision-detail"><h4>'+d.title+'</h4><p>'+d.body+'</p><p><strong>Error a evitar:</strong> '+d.trap+'</p>'+(d.figure?'<figure class="course-image academy-infographic"><picture><source media="(max-width: 640px)" srcset="'+d.figure[1]+'"><img loading="lazy" src="'+d.figure[0]+'" alt="'+d.figure[2]+'"></picture><figcaption>Ejemplo pedagógico simulado: compara eficiencia y aporte absoluto antes de comprar.</figcaption></figure>':'')+'<p class="source-course">Para verificar: <a href="'+d.source[1]+'" target="_blank" rel="noopener noreferrer">'+d.source[0]+'</a>.</p></section>';
export function enhanceAssortmentLesson(html,label){
 const d=detail[label];if(!d)throw new Error('Sin detalle '+label);
 let result=html;
 if(label==='28.5')result=result
  .replace('consulta en vivo del 1 de octubre de 2026','captura histórica del 1 de octubre de 2026; no representa inventario vigente')
  .replace('El top de inventario actual','El corte histórico de inventario')
  .replace('dos listings activos de Waterism Glow Mini Tint','dos fichas de Waterism Glow Mini Tint registradas en esa fecha');
 if(label==='28.1')result=result.replace('Planning \\u0026 Optimization','Planning y Optimization');
 return result+frame(d);
}
