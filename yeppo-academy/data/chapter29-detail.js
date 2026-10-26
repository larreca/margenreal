// Profundización de los ocho módulos. Los ejemplos numéricos de este archivo
// son de una tienda ficticia y no describen stock, ventas ni políticas Yeppo.
const detail={
 '29.1':{
  title:'De existencias físicas a promesa de venta',
  body:'En el ejemplo, On hand = 100: 75 Available + 20 Committed + 5 Unavailable. Solo las 75 disponibles de la ubicación habilitada pueden alimentar una promesa inmediata. Incoming describe unidades futuras y no forma parte de las cien actuales. Verifica también reservas, sincronización entre canales y fecha del dato antes de publicar stock. Desde el 01/10/2026 el informe estándar de inventario de Shopify muestra On hand; una columna mayor que antes no significa que hayan llegado unidades nuevas.',
  trap:'Sumar reservas o tránsito a disponible y ofrecer al cliente unidades que no se pueden despachar.',
  source:['Shopify Help Center · estados del inventario','https://help.shopify.com/en/manual/inventory-and-locations/fundamentals/inventory-states']},
 '29.2':{
  title:'Cuatro denominadores, cuatro decisiones',
  body:'En la cohorte ficticia se reciben 100, se venden 70 y quedan 30: 70/100 = 70 % vendido de esa compra; con demanda reciente de 3/día, 30/3 = 10 días de cobertura. En un reporte de Shopify, Sell-through rate se define como unidades vendidas divididas por vendidas más inventario final; los dos cálculos coinciden solo en este ejemplo cerrado sin nuevas recepciones, ajustes ni devoluciones. Rotación usa costo de ventas sobre inventario promedio a costo. La tasa de quiebre precisa días sin disponibilidad sobre días observados; no mide demanda perdida por sí sola.',
  trap:'Presentar 70/100 como fórmula universal del reporte de Shopify o comparar períodos y ubicaciones distintos.',
  figure:['/assets/chapter29/cap29-metrics-worked.svg','/assets/chapter29/cap29-metrics-worked-mobile.svg','Cuatro métricas con bases distintas: 70 % vendido de cohorte, 10 días de cobertura, rotación a costo y días de quiebre'],
  source:['Shopify Help Center · definición de Sell-through rate','https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/analytics-fields']},
 '29.3':{
  title:'Umbral de pedido no es tamaño del pedido',
  body:'El ejemplo separa tiempo y cantidad: 4 unidades diarias × 15 días completos de reposición + 20 de seguridad = punto de reposición de 80. Con 72 disponibles, se cruza el umbral y corresponde revisar pedido. No se deduce que haya que comprar 80 ni 8 unidades; para cantidad se necesitan cobertura objetivo, mínimos del proveedor, tránsito, lotes y fecha de vencimiento. En importación incluye aprobación, preparación, transporte, aduana cuando aplica, recepción y puesta a la venta dentro del lead time observado.',
  trap:'Ordenar solo cuando el stock llega a cero o usar el ROP como cantidad de compra.',
  source:['Shopify · fórmula y uso del punto de reposición','https://www.shopify.com/blog/reorder-point']},
 '29.4':{
  title:'Diagnóstico antes de aumentar el colchón',
  body:'Separa tres causas. Promoción conocida y omitida: corrige el pronóstico. Atraso recurrente: mide el lead time real y acuerda servicio con proveedor. Variación aleatoria que queda después de esas correcciones: justifica stock de seguridad según nivel de servicio, costo y caducidad. Revisa incidentes por SKU y ubicación antes de modificar buffers. Un producto próximo a vencer exige aún más cuidado: un buffer mayor puede transformar el quiebre en merma.',
  trap:'Duplicar seguridad en todo el catálogo para tapar un error repetible de planificación.',
  figure:['/assets/chapter29/cap29-buffer-diagnosis.svg','/assets/chapter29/cap29-buffer-diagnosis-mobile.svg','Árbol de causas de quiebre: promoción omitida, atraso recurrente o variación residual, con acción distinta para cada una'],
  source:['Shopify · diferencia entre safety stock y reorder point','https://www.shopify.com/blog/safety-stock-vs-reorder-point']},
 '29.5':{
  title:'ABC y XYZ ayudan a decidir frecuencia, no destino automático',
  body:'Calcula ABC con una base explícita, como contribución al margen bruto anual, para comparar importancia económica. XYZ requiere demanda por períodos comparables para distinguir regularidad; una novedad sin historial no merece una Z automática. AX puede justificar revisión frecuente y un objetivo de servicio alto. CZ pide revisar función, mínimos de compra y continuidad; no significa liquidación obligatoria. Segmenta por canal o ubicación cuando los patrones difieran, y documenta qué hacer con lanzamientos y estacionalidad.',
  trap:'Aplicar cortes 80/15/5 de otra empresa como si fueran una norma para Yeppo.',
  source:['Shopify Help Center · análisis ABC actual','https://help.shopify.com/en/manual/inventory-and-locations/fundamentals/abc-analysis']},
 '29.6':{
  title:'Transferir puede salvar servicio y margen',
  body:'La tienda A del caso tiene 60 unidades y vende 0,5 por día: 120 días de cobertura. B tiene cinco y vende tres por día: aproximadamente 1,7 días. Antes de aplicar un descuento, verifica que ambas cifras sean Available, que el lote esté vigente, cuánto tarda el traslado y cuánto cuesta. Si una transferencia llega antes del quiebre y preserva trazabilidad, evita una compra adicional y conserva precio. Si no llega a tiempo, considera una reposición u otra acción; no se recomienda siempre transferir.',
  trap:'Rebajar A por exceso mientras B pierde ventas, o transferir unidades comprometidas o con vencimiento próximo.',
  source:['Shopify Help Center · procesar transferencias entre ubicaciones','https://help.shopify.com/en/manual/inventory-and-locations/inventory-transfers/creating-and-processing-transfers']},
 '29.7':{
  title:'Una transferencia cambia la disponibilidad en dos lugares',
  body:'Caso ficticio: A dispone de cinco y vende tres al día; B dispone de 60 y vende 0,5. Si veinte unidades transferibles salen de B y llegan a A antes del quiebre, B quedaría con cuarenta (80 días a su ritmo) y A con veinticinco (8,3 días a su ritmo). Es una comparación ilustrativa, no una recomendación de enviar veinte: hay que medir tiempo de traslado, costo, lotes, demanda durante el trayecto y reservas. Diez unidades Incoming hacia A no están disponibles allí hasta ser recibidas y habilitadas.',
  trap:'Prometer en A mercancía en tránsito o transferir tanto que se cause un quiebre en B.',
  figure:['/assets/chapter29/cap29-transfer-worked.svg','/assets/chapter29/cap29-transfer-worked-mobile.svg','Ejemplo hipotético de transferencia: A pasa de 5 a 25 y B de 60 a 40, sujeto a tiempo, lote y demanda'],
  source:['Shopify Help Center · transferencias y estados de recepción','https://help.shopify.com/en/manual/inventory-and-locations/inventory-transfers/creating-and-processing-transfers']},
 '29.8':{
  title:'Del resultado de la calculadora a la acción semanal',
  body:'Con 4 unidades/día, 15 días de espera, buffer 20 y 72 disponibles, el ROP es 80 y la cobertura 18 días. Estar por debajo de 80 activa revisión; la cantidad a pedir todavía depende de órdenes abiertas, tránsito, lote mínimo y cobertura objetivo. Las 70 vendidas de 100 recibidas son un 70 % de cohorte solo si esas ventas corresponden a esas mismas cien unidades. Guarda fecha y responsable por excepción: quiebre, bajo ROP, cobertura alta, vencimiento y desbalance entre tiendas.',
  trap:'Confundir el “faltante hasta ROP” que muestra la herramienta con una orden de compra automática.',
  source:['Shopify Help Center · métricas de inventario actuales','https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/analytics-fields']}
};
function figure(d){return d.figure?'<figure class="course-image academy-infographic"><picture><source media="(max-width: 640px)" srcset="'+d.figure[1]+'"><img loading="lazy" src="'+d.figure[0]+'" alt="'+d.figure[2]+'"></picture><figcaption>Diagrama didáctico con datos ficticios; confirma estados, período y unidades antes de aplicar la decisión.</figcaption></figure>':'';}
export function enhanceInventoryLesson(html,label){
 const d=detail[label];if(!d)throw new Error('Sin detalle '+label);
 let result=html;
 if(label==='29.7')result=result.replace('lectura en vivo del 1 de octubre de 2026','captura histórica del 1 de octubre de 2026; no representa inventario vigente');
 if(label==='29.2')result=result.replace('Sell-through compara lo vendido contra lo recibido.','En el ejercicio de una cohorte cerrada, la proporción vendida compara lo vendido contra lo recibido; el informe Sell-through de Shopify usa vendido / (vendido + inventario final).');
 if(label==='29.8')result=result.replace('2. Sell-through es:', '2. En una cohorte cerrada, el porcentaje vendido es:');
 return result+'<section class="lesson-box academy-decision-detail"><h4>'+d.title+'</h4><p>'+d.body+'</p><p><strong>Error a evitar:</strong> '+d.trap+'</p>'+figure(d)+'<p class="source-course">Para verificar: <a href="'+d.source[1]+'" target="_blank" rel="noopener noreferrer">'+d.source[0]+'</a>.</p></section>';
}
