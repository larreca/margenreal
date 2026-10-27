// Profundización editorial de promociones. Todos los números visuales son simulaciones didácticas.
const visuals={
 '31.1':['31-objetivo-aporte','Cien unidades a siete mil aportan setecientos mil; una promoción vende ciento veinte a cinco mil quinientos y aporta seiscientos sesenta mil','Más unidades no garantizan más contribución: el aporte total cae $40.000 en este escenario.'],
 '31.2':['31-incentivo-costo','Cien pedidos con descuento de cinco mil cuestan quinientos mil de ingreso; cien miniaturas a costo mil doscientos cuestan ciento veinte mil antes de operación','Se compara costo económico bajo los mismos supuestos, no el valor publicitario del regalo.'],
 '31.3':['31-bundle-margen','Tres productos suman treinta mil netos; un pack a veintisiete mil tiene descuento diez por ciento, costo doce mil y margen bruto cincuenta y cinco coma cincuenta y seis por ciento','Un pack complementario puede ahorrar una decisión y conservar margen; verificar todos los SKU y fees.'],
 '31.4':['31-umbral-economia','Pedido cuarenta y siete mil, umbral cincuenta mil, adicional seis mil; aporte tres mil menos envío subsidiado dos mil deja mil de incremento simplificado','El umbral debe cruzar distancia, relevancia del complemento y costo del envío.'],
 '31.5':['31-stock-prometible','Stock cuarenta unidades, diez de seguridad, treinta prometibles frente a proyección promocional de ochenta','La demanda proyectada excede en cincuenta unidades el stock prometible; revisar elegibilidad o alcance.'],
 '31.6':['31-segmento-control','Cien clientes que ya comprarían reciben descuento veinte por ciento sobre ticket veinticinco mil, cesión total quinientos mil','El costo del incentivo es visible; la causalidad requiere un grupo comparable o control.'],
 '31.7':['31-break-even','Cien unidades a diez mil aportan un millón; con aporte seis mil por unidad hacen falta ciento sesenta y siete unidades para igualar','Se necesitan 67 unidades adicionales, antes de medir adelanto de compras y efecto posterior.'],
 '31.8':['31-playbook-cierre','Cinco etapas promocionales: aprobar condiciones y stock, verificar publicación, controlar campaña, revertir precios, conciliar resultados','El cierre por canal y el aprendizaje posterior son parte del plan, no tareas opcionales.']
};
const figure=([name,alt,caption])=>{
 const note=name==='31-stock-prometible'?'Unidades simuladas.':name==='31-playbook-cierre'?'Secuencia ilustrativa.':'Cifras simuladas en CLP.';
 return `<figure class="course-image academy-infographic"><picture><source media="(max-width: 640px)" srcset="/assets/chapter31/${name}-mobile.svg"><img loading="lazy" src="/assets/chapter31/${name}.svg" alt="${alt}"></picture><figcaption>${caption} ${note}</figcaption></figure>`;
};
const source=(url,label)=>`<p class="source-course">Fuente: <a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>.</p>`;
const edits={
 '31.1':html=>html
  .replace('https://www.sernac.cl/portal/617/w3-article-58272.html','https://www.sernac.cl/portal/609/w3-article-52715.html')
  .replace('https://www.sernac.cl/portal/617/w3-article-57431.html','https://www.sernac.cl/portal/609/w3-article-52758.html'),
 '31.2':html=>html
  .replace('puede percibirse como un beneficio mayor si el valor de referencia es más alto y si impulsa una futura compra','puede ser útil para descubrir un producto, siempre que no se invente su valor de referencia ni se prometa una compra futura')
  .replace(/<div class="course-case">/,'<div class="lesson-box"><h4>Antes de escoger regalo</h4><p>Comprueba existencias prometibles, costo de picking, compatibilidad con códigos y si el envío cambia de tramo. La miniatura no es “gratis” para la empresa: su costo real se agrega al pedido. Comunica unidades, vigencia y exclusiones de forma legible.</p></div><div class="course-case">'),
 '31.3':html=>html
  .replace('El catálogo actual incluye el combo VT Reedle Shot 300 + Dr. Althea 345 Relief Cream.','El <a href="https://yeppo.cl/products/combo-vt-reedle-shot-300-dr-althea-345-relief-cream" target="_blank" rel="noopener noreferrer">catálogo Yeppo incluye el combo VT Reedle Shot 300 + Dr. Althea 345 Relief Cream</a> (consultado el 27-10-2026).')
  .replace('tratamiento intensivo + soporte de confort/hidratación, no como “dos productos con descuento”.','tratamiento intensivo + soporte de confort/hidratación para quien ya tolera el tratamiento. La ficha del producto indica uso nocturno cada tres días para Reedle Shot 300; no es una rutina universal ni se deben prometer resultados o ausencia de reacciones.')
  .replace(/<div class="course-case">/,'<div class="lesson-box"><h4>Margen del pack</h4><p>En la simulación, $30.000 vendidos por separado pasan a $27.000 netos en pack. El ahorro de $3.000 es 10 %; con $12.000 de costo conjunto, el margen bruto es $15.000 ÷ $27.000 = <strong>55,56 %</strong>. Antes de publicar, agrega comisión, preparación del kit, stock por componente y posibles devoluciones.</p></div><div class="course-case">'),
 '31.4':html=>html
  .replace('Baymard observó que los usuarios necesitan ver tanto el costo estimado de envío como el umbral de envío gratis para evaluar si vale la pena alcanzarlo. También recomienda no mostrar ofertas ilógicas: pedir gastar $60 adicionales para ahorrar $3 de envío puede generar frustración.','La investigación pública de Baymard muestra que la información de envío gratis se pierde cuando sólo aparece en un banner. Conviene mostrar el umbral y sus condiciones cerca de la decisión de compra y actualizar la distancia real en el carrito. Empujar un producto irrelevante para alcanzar el beneficio puede empeorar la experiencia.')
  .replace('https://baymard.com/guidelines/836-where-to-display-free-shipping-information','https://baymard.com/research-articles/avoid-banners-only-free-shipping')
  .replace('Baymard · free shipping, actualización 2026','Baymard · visibilidad de envío gratis')
  .replace(/<div class="course-case">/,'<div class="lesson-box"><h4>El umbral de Yeppo es un dato vivo</h4><p>La tienda Yeppo muestra envío gratis sobre $50.000 al consultar su sitio en octubre de 2026; confirma las condiciones y cobertura actuales antes de comunicarlo. El ejercicio numérico de esta lección usa bases netas ficticias para enseñar contribución y no reproduce la configuración real del checkout.</p></div><div class="course-case">'),
 '31.5':html=>html
  .replace(/Para Yeppo, la lógica promocional actual distingue precisamente estos casos:[\s\S]*?riesgo dominante\./,'En un escenario comercial, stock alto y baja rotación pueden justificar un markdown selectivo; un best seller con baja cobertura necesita protección. La proximidad de vencimiento obliga a evaluar vida útil, seguridad y capacidad de venta, sin usar el descuento para colocar productos no aptos. Estas son reglas didácticas, no políticas vigentes de Yeppo.')
  .replace('Un best seller con 20 días de cobertura no debe recibir el mismo incentivo que un P1 de baja rotación con 120 días de cobertura.','Un best seller con 20 días de cobertura no debe recibir el mismo incentivo que un SKU lento con 120 días de cobertura.')
  .replace('P1 lento','SKU lento')
  .replace(/<div class="course-case">/,'<div class="lesson-box"><h4>Stock prometible</h4><p>En el caso simulado hay 40 unidades, pero 10 se reservan como seguridad: sólo 30 son prometibles. Un forecast promocional de 80 deja una brecha de <strong>50 unidades</strong>. Además de acotar la campaña, verifica stock por canal y la fecha de reposición confirmada.</p></div><div class="course-case">')
  +source('https://www.shopify.com/blog/retail-markdowns','Shopify · markdowns, actualización 2026'),
 '31.6':html=>html
  .replace(/<div class="course-case">/,'<div class="lesson-box"><h4>Cómo medir una reactivación</h4><p>Separa clientes inactivos elegibles en grupos comparables y reserva una parte sin mensaje o beneficio. Compara conversión y contribución por cliente, no sólo aperturas. Klaviyo documenta grupos holdout para estimar lift; excluir a alguien de una campaña requiere cuidar volumen de muestra, ventana y reglas de privacidad.</p></div><div class="course-case">')
  +source('https://help.klaviyo.com/hc/en-us/articles/18138290642971','Klaviyo · global holdout groups'),
 '31.7':html=>html
  .replace(/<div class="course-case">/,'<div class="lesson-box"><h4>Lectura del resultado</h4><p>El punto de equilibrio de 167 unidades significa empatar el aporte total de $1.000.000: 167 × $6.000 = $1.002.000. Si se venden 160, el aporte baja a $960.000 pese al crecimiento de 60 % en unidades. Observa después la demanda adelantada y compara un período o grupo equivalente.</p></div><div class="course-case">')
  +source('https://www.shopify.com/blog/retail-math','Shopify · matemáticas de promociones y margen, 2026'),
 '31.8':html=>html
  .replace('Promo mayor a portal.','Descuento distinto al aprobado.')
  .replace('https://www.sernac.cl/portal/617/w3-article-57431.html','https://www.sernac.cl/portal/609/w3-article-52758.html')
  .replace('https://www.sernac.cl/portal/609/w3-article-52753.html','https://www.sernac.cl/portal/607/w3-propertyvalue-20898.html')
  .replace('Para analizar retrospectivamente el Cyber de Yeppo de octubre de 2026, este framework puede aterrizarse con reglas ya definidas: participación condicionada por stock, descuentos distintos por prioridad/rotación, best sellers y novedades con límites conservadores, vencimiento como excepción y control de margen post-canal antes de publicar.','Para llevar el playbook a un caso inspirado en Cyber Yeppo, plantea elegibilidad por stock, descuentos diferenciados por rol y velocidad, best sellers con cobertura protegida y margen posterior a cargos de cada canal. El ejemplo no certifica las reglas ni los resultados de una campaña real.')
  .replace(/<div class="lesson-box"><h4>Caso interno · Cyber octubre 2026<\/h4>[\s\S]*?<\/div>/,'<div class="lesson-box"><h4>Escenario didáctico · campaña multicanal Yeppo</h4><p>Define una ventana de cinco días, SKU y unidades elegibles, excepciones justificadas y responsables de precio por canal. Antes de activar, compara contribución después del descuento, comisión y logística. Al terminar, verifica reversión de ofertas y stock. Fechas, tasas y resultados concretos requieren la documentación de la campaña correspondiente.</p></div>')
  .replace('También exige que el precio sea visible y total, y su marco de comercio electrónico enfatiza informar precio anterior y condiciones relevantes para que el consumidor pueda evaluar la conveniencia.','Las condiciones publicitadas deben ser claras y cumplirse. La comparación con un precio anterior sólo debe realizarse si esa referencia es verificable; revisa además el precio final y la disponibilidad por canal.')
  .replace(/<div class="decision-game">/,'<div class="lesson-box"><h4>Control de cierre</h4><p>En la simulación, $20.000 netos con 15 % de descuento dan $17.000 netos. Al vencer la campaña, verifica el precio efectivo en web y cada marketplace, las órdenes pendientes, el stock reservado y la conciliación de costos. Guarda evidencia de las condiciones publicadas y fecha de desactivación.</p></div><div class="decision-game">')
};
export function detailPromotionsChapter(chapter){
 return {...chapter,modules:chapter.modules.map(m=>{
  let html=edits[m.label]?.(m.html)??m.html;
  const visual=visuals[m.label];
  html=html.replace(/<figure class="course-image academy-infographic">[\s\S]*?<\/figure>/,figure(visual));
  return {...m,html};
 })};
}
