// Capa editorial del capítulo 32. Diagramas y cifras propias; casos comerciales simulados.
const figures={
 '32.1':['mision','De consulta de fotoprotección a zona señalizada, comparación de formatos y medida de preguntas repetidas','Mapa de decisión para reducir fricción. No describe una tienda Yeppo medida.'],
 '32.2':['planograma','Veinte posiciones auditadas, dieciséis correctas, cuatro a revisar y cumplimiento del ochenta por ciento','Comparación entre planograma y ejecución. Datos simulados.'],
 '32.3':['recorrido','Recorrido conceptual con entrada despejada, pared de novedades, categoría por misión y caja sin obstrucciones','Esquema sin escala; exige revisar las medidas y normas aplicables en cada local.'],
 '32.4':['precios','Fleje de cosmético de cincuenta mililitros a quince mil novecientos noventa pesos, precio unitario treinta y un mil novecientos ochenta por cien mililitros y caja con precio discordante','Cálculo simulado. El precio por unidad de medida (PPUM) se muestra con el precio final cuando corresponde.'],
 '32.5':['tester','Secuencia para revisar, dispensar con aplicador nuevo, observar precauciones y retirar un tester alterado','Protocolo educativo: adapta a la ficha del producto y al procedimiento sanitario aprobado.'],
 '32.6':['adyacencia','Misión de rutina simple con limpieza, hidratación y fotoprotección según tolerancia; evitar agrupar tres exfoliantes','La adyacencia enseña un uso complementario, sujeto a entrevista y fichas vigentes.'],
 '32.7':['reposicion','Doce posiciones de estante con tres huecos, tasa de huecos de veinticinco por ciento y revisión de reservas antes de reponer','El inventario físico en trastienda no equivale por sí solo a stock vendible. Datos simulados.'],
 '32.8':['medicion','Cumplimiento pasa de ochenta a noventa y cinco por ciento, quince puntos porcentuales; ticket sube cinco por ciento con promoción simultánea','El aumento del ticket no demuestra causalidad de la nueva exhibición. Datos simulados.']
};
const figure=([name,alt,caption])=>{
 const desktop={'recorrido':'cap32-store-route-decision.svg','tester':'cap32-tester-safe-decision.svg'}[name]||`32-${name}.svg`;
 return `<figure class="course-image academy-infographic"><picture><source media="(max-width: 640px)" srcset="/assets/chapter32/32-${name}-mobile.svg"><img loading="lazy" src="/assets/chapter32/${desktop}" alt="${alt}"></picture><figcaption>${caption}</figcaption></figure>`;
};
const box=(title,body)=>`<div class="lesson-box"><h4>${title}</h4><p>${body}</p></div>`;
const source=(url,label)=>`<p class="source-course">Fuente: <a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>.</p>`;
const edits={
 '32.1':html=>html.replace(/<div class="course-case">/,box('Prueba de orientación','Pide a cinco personas ajenas al diseño que encuentren un SPF sin ayuda. Registra tiempo, dudas y si identifican el precio; repite después del cambio. Cinco observaciones detectan fricciones, pero no prueban una mejora estadística.')+'<div class="course-case">'),
 '32.2':html=>html.replace(/<div class="course-case">/,box('Cálculo y cierre de auditoría','En 20 posiciones, 16 cumplen el SKU, la ubicación y el facing previstos: <strong>16 ÷ 20 × 100 = 80 %</strong>. La foto del estante real (realograma) y una lista de las cuatro desviaciones deben llevar causa, responsable y fecha de nueva revisión. El 80 % es resultado del ejercicio, no una meta oficial.')+'<div class="course-case">'),
 '32.3':html=>html.replace(/<div class="course-case">/,box('Antes de mover mobiliario','Dibuja el recorrido real y comprueba acceso, circulación, evacuación y visibilidad de categorías con el responsable del local. Una torre que bloquea la entrada no se aprueba por mayor exposición. El esquema visual sólo enseña la secuencia; no certifica un plano de obra.')+'<div class="course-case">'),
 '32.4':html=>html
  .replace('Además, el PPUM está vigente en los casos cubiertos por su reglamento y debe mostrarse junto al precio de venta.','El PPUM (precio por unidad de medida) debe acompañar al precio de venta en los productos cubiertos por el Decreto 38. Para cosméticos, la unidad preestablecida es 100 g o 100 ml; revisa las excepciones y el alcance de la norma en cada caso.')
  .replace(/<div class="lesson-box"><h4>Fleje mínimo recomendado<\/h4>/,box('Ejemplo numérico de fleje y caja','Protector cosmético ficticio de 50 ml con precio final de $15.990: <strong>PPUM = $15.990 ÷ 50 × 100 = $31.980 por 100 ml</strong>. Si caja marca $17.990, detén y resuelve la discrepancia: el artículo 18 prohíbe cobrar un precio superior al exhibido. Revisa SKU, variante, vigencia, precio efectivo y etiqueta; documenta la corrección. Los números no son precios Yeppo.')+'<div class="lesson-box"><h4>Fleje mínimo recomendado</h4>')
  .replace('</div></section>',`</div>${source('https://www.bcn.cl/leychile/navegar?idNorma=1209198','BCN · Decreto 38, artículos 4, 8, 9 y 11')}${source('https://www.sernac.cl/portal/609/w3-article-52738.html','SERNAC · artículo 18, precio cobrado y exhibido')}</section>`),
 '32.5':html=>html
  .replace('Un estudio preliminar publicado en 2025 encontró bacterias —incluidas cepas resistentes— en testers de maquillaje de retail. Más recientemente, un estudio piloto de 2026 en 42 testers cosméticos de farmacias portuguesas detectó crecimiento microbiano en <strong>25 de 42 (59,5%)</strong>; entre categorías con más de una muestra, encontró crecimiento en 7/8 productos anti-ageing y 10/16 protectores solares. Es una muestra pequeña y localizada, no una tasa universal, pero refuerza la necesidad de control.','Un estudio piloto de 2026 en farmacias del norte de Portugal detectó crecimiento microbiano en <strong>25 de 42 testers (59,5 %)</strong>. La muestra es pequeña y localizada: mide hallazgos bajo un método de cultivo, no una tasa universal de contaminación ni infecciones de clientes.')
  .replace('La FDA también advierte que los testers compartidos pueden contaminarse y recomienda aplicadores de un solo uso para probar cosméticos.','La FDA advierte especialmente sobre testers compartidos de cosméticos de ojos y aconseja aplicadores nuevos de un solo uso. Para otras fórmulas, verifica envase, ficha y procedimiento local antes de ofrecer pruebas.')
  .replace(/<div class="metric-course">/,box('Prueba con asesoría, sin diagnóstico','Pregunta por tipo de piel, alergias conocidas y objetivo; ofrece textura y acabado con un método higiénico sólo si corresponde. Evita aplicar sobre piel lesionada o con reacción activa. Ante reacción, suspende la prueba y orienta consulta profesional. Un resultado de prueba inmediata no garantiza ausencia de alergia posterior.')+'<div class="metric-course">'),
 '32.6':html=>html
  .replace('Ejemplo actual de catálogo','Ejemplos de catálogo consultados en octubre de 2026')
  .replace('Son ejemplos de misión, no reglas fijas de facing.','Son ejemplos de misión, no reglas fijas de facing ni confirmación de stock actual. <a href="https://yeppo.cl/products/iunik-centella-calming-daily-sunscreen-spf-50-pa" target="_blank" rel="noopener noreferrer">Verifica la ficha de iUNIK</a> y disponibilidad antes de exhibir.')
  .replace(/<div class="course-case">/,box('Medición de adyacencia','Si 25 de 100 pedidos de hidratación también incluyen SPF, el attach rate del complemento es <strong>25 %</strong> (pedidos con ambos ÷ pedidos con hidratación). Compara periodos equivalentes y contribución: una promo simultánea puede mover la tasa sin que la nueva ubicación sea la causa.')+'<div class="course-case">')+source('https://www.shopify.com/blog/retail-environment','Shopify · agrupación de complementos en el espacio'),
 '32.7':html=>html
  .replace('Si el sistema tiene unidades pero el facing está vacío, para el cliente el producto está quebrado.','Si el sistema registra unidades pero el facing está vacío, para el cliente hay un quiebre visual; el stock podría estar reservado, dañado, en otra ubicación o pendiente de conciliación.')
  .replace(/<div class="course-case">/,box('No reponer contra stock comprometido','En un estante didáctico, 3 de 12 posiciones están vacías: <strong>3 ÷ 12 = 25 %</strong> de huecos. Que aparezcan 25 unidades en trastienda no significa que las 25 estén disponibles para sala: revisa reservas, lotes, condición y ubicación antes de moverlas. Confirma después SKU, facing y precio.')+'<div class="course-case">')+source('https://www.shopify.com/blog/facing','Shopify · facings y control de estantes'),
 '32.8':html=>html
  .replace('Para clientes B2B, el capítulo puede convertirse en una auditoría mensual de 20 minutos:','Como material de apoyo para clientes B2B, el capítulo puede convertirse en una auditoría mensual breve:')
  .replace(/<div class="decision-game" data-decision-game>/,box('Antes y después: dos indicadores distintos','Cumplimiento de planograma: 16/20 = 80 % antes y 19/20 = 95 % después, mejora de <strong>15 puntos porcentuales</strong>. El ticket pasa de $20.000 a $21.000, es decir <strong>+5 %</strong>. Como hubo promoción simultánea, ese +5 % no puede atribuirse a la exhibición sin comparación controlada. Define un área o período comparable y registra descuentos, stock y tráfico.')+'<div class="decision-game" data-decision-game>')
  .replace(/<div class="knowledge-challenge" data-challenge>/,box('Glosario del capítulo','<strong>Planograma:</strong> ubicación prevista por SKU y facing. <strong>Realograma:</strong> disposición observada en estante. <strong>Facing:</strong> frente visible asignado a un producto. <strong>PPUM:</strong> precio por unidad de medida para comparar tamaños. <strong>Quiebre visual:</strong> hueco en sala que requiere investigar disponibilidad real. Estos términos se introducen en el capítulo 32.')+'<div class="knowledge-challenge" data-challenge>')
};
export function detailMerchandisingChapter(chapter){
 return {...chapter,contentVersion:Math.max(4,Number(chapter.contentVersion||0)),modules:chapter.modules.map(m=>{
  const visual=figures[m.label];
  let html=edits[m.label]?.(m.html)??m.html;
  let seen=0;
  html=html.replace(/<figure class="course-image academy-infographic">[\s\S]*?<\/figure>/g,()=>++seen===1?figure(visual):'');
  const critical={'32.3':2,'32.4':1,'32.7':2,'32.8':3}[m.label];
  const assessment={...m.assessment,version:2,questions:m.assessment.questions.map((q,i)=>({...q,critical:q.critical||i===critical}))};
  if(m.label==='32.4'){
   assessment.questions[1]={...assessment.questions[1],prompt:'Si el fleje indica $15.990 y caja $17.990, corresponde…',options:['Cobrar $17.990 sin revisar','Ocultar el fleje y continuar','No cobrar más que lo exhibido y corregir la discrepancia'],explanation:'El artículo 18 prohíbe cobrar un precio superior al exhibido; documenta el incidente y alinea fleje y caja.'};
  }
  return {...m,html,assessment};
 })};
}
