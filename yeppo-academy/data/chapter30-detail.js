// Correcciones editoriales de precio y margen. Las tarifas y precios de ejercicios son simulados.
const figure=(name,alt,caption)=>`<figure class="course-image academy-infographic"><picture><source media="(max-width: 640px)" srcset="/assets/chapter30/${name}-mobile.svg"><img loading="lazy" src="/assets/chapter30/${name}.svg" alt="${alt}"></picture><figcaption>${caption}</figcaption></figure>`;

const ivaFigure=figure('cap30-iva-calculo','Cálculo simulado: de $23.800 IVA incluido se obtienen $20.000 netos y $3.800 de IVA; con costo neto de $12.000, el margen bruto es 40%','Ejemplo educativo de venta gravada a tasa general: el denominador del margen es la venta neta, no el precio pagado por el consumidor.');
const channelFigure=figure('cap30-comision-base','Mismo pedido: comisión simulada del 10% sobre $11.900 brutos da $1.190 y contribución $2.310; sobre $10.000 netos da $1.000 y contribución $2.500','La base contractual de la comisión cambia la contribución aunque la tasa anunciada sea la misma.');

const replacements={
 '30.1':html=>html
  .replace(/<figure class="course-image academy-infographic"><img src="\/assets\/chapter30\/cap30-30\.1-waterfall\.svg"[\s\S]*?<\/figure>/,'')
  .replace(/<figure class="course-image academy-infographic"><img src="\/assets\/chapter30\/cap30-waterfall\.svg"[\s\S]*?<\/figure>/,'')
  .replace(/<div class="channel-matrix">/,'<div class="lesson-box"><h4>Antes de comparar márgenes</h4><p>Confirma si cada comisión se cobra sobre el precio con IVA o sobre la venta neta; registra también su costo fijo por operación y eventuales promociones. Una contribución positiva aún debe financiar gastos fijos, impuestos sobre utilidades y riesgo de devoluciones.</p></div><div class="channel-matrix">'),
 '30.2':html=>html
  .replace(/<figure class="course-image academy-infographic"><img src="\/assets\/chapter30\/cap30-markup-margin\.svg"[\s\S]*?<\/figure>/,''),
 '30.3':html=>html
  .replace('Material del SII publicado en 2026 sigue mostrando una tasa general de IVA de <strong>19%</strong>.','La ficha del SII, actualizada el 10 de junio de 2025, indica una tasa general de IVA de <strong>19%</strong>.')
  .replace(/<div class="lesson-box"><h4>Actualización 2026<\/h4>/,'<div class="lesson-box"><h4>Fuente y alcance</h4>')
  .replace(/<div class="module-takeaway">/,ivaFigure+'<div class="module-takeaway">'),
 '30.4':html=>html
  .replace(/<figure class="course-image academy-infographic"><img src="\/assets\/chapter30\/cap30-channel-economics\.svg"[\s\S]*?<\/figure>/,'')
  .replace(/<div class="channel-matrix">[\s\S]*?<\/div>\s*<div class="lesson-box"><h4>Regla operativa<\/h4>[\s\S]*?<\/div>/,
    '<div class="lesson-box"><h4>La tarifa no es universal</h4><p>Antes de modelar web, tienda, marketplace o B2B, consulta contrato, categoría, tramo logístico, publicidad, medio de pago y quién financia el descuento. Calcula cada cargo sobre su base contractual y fecha vigente. Una tabla de porcentajes genéricos no sirve para aprobar precios reales.</p></div>')
  .replace(/<div class="module-takeaway">/,channelFigure+'<div class="module-takeaway">'),
 '30.5':html=>html
  .replace(/<figure class="course-image academy-infographic"><img src="\/assets\/chapter30\/cap30-discount-impact\.svg"[\s\S]*?<\/figure>/,'')
  .replace(/<div class="channel-matrix">/,'<div class="lesson-box"><h4>Umbral de volumen</h4><p>Con $10.000 de beneficio bruto antes y $6.000 después, una venta extra por cada 1,5 ventas originales no basta: se necesitan al menos 1,67 veces las unidades para igualar el beneficio total. En una campaña real, vuelve a calcular comisión sobre el precio promocional y suma costos de adquisición y entrega.</p></div><div class="channel-matrix">'),
 '30.6':html=>html
  .replace(/<div class="lesson-box"><h4>Ejemplo real Yeppo · SKIN1004 Tea-Trica Relief Ampoule<\/h4>[\s\S]*?<\/div>/,
    '<div class="lesson-box"><h4>Producto real, precios del ejercicio simulados</h4><p><a href="https://yeppo.cl/products/madagascar-centella-tea-trica-relief-ampoule-2-tamanos" target="_blank" rel="noopener noreferrer">SKIN1004 Tea-Trica Relief Ampoule en Yeppo</a> se ofrece en 30 ml y 100 ml. Supón, sólo para practicar, $12.990 y $29.990: aproximadamente $433/ml y $300/ml. El formato grande tiene menor precio por ml, pero exige $17.000 adicionales; verifica precios de venta actuales antes de informar a clientes.</p></div>')
  .replace(/<figure class="course-image academy-infographic"><img src="\/assets\/chapter30\/cap30-ppum\.svg"[\s\S]*?<\/figure>/,
    '<figure class="course-image academy-infographic"><img loading="lazy" src="/assets/chapter30/cap30-ppum.svg" alt="Ejemplo simulado de presentación comparable: treinta mililitros a $12.990, unos $433/ml; cien mililitros a $29.990, unos $300/ml"><figcaption>Producto real con valores hipotéticos para comparar presentaciones; no son precios vigentes. Comprueba el alcance normativo de PPUM por categoría.</figcaption></figure>'),
 '30.7':html=>html
  .replace(/<div class="module-takeaway">/,'<div class="lesson-box"><h4>Aplicación a una decisión de precio</h4><p>Antes de elevar el precio de un SKU lento para mejorar su porcentaje de margen, proyecta las unidades que podría perder y el inventario promedio que mantendría inmovilizado. Compara GMROI en el mismo período y con el mismo criterio de costo; revísalo junto con contribución por canal y faltantes de stock.</p></div><div class="module-takeaway">'),
 '30.8':html=>html
  .replace(/<div class="margin-calculator" data-pricing-calculator>/,
    '<div class="lesson-box"><h4>Qué calcula la herramienta</h4><p>Comisión y pasarela se aplican al <strong>precio bruto después del descuento</strong>; costo y logística se ingresan como importes por unidad. El precio objetivo es referencial y <strong>no incorpora comisión ni pasarela</strong>. Si tu contrato usa la venta neta como base, calcula el cargo fuera de la herramienta antes de decidir.</p></div><div class="margin-calculator" data-pricing-calculator>')
  .replace(/<div class="lesson-box"><h4>Reglas internas Yeppo para práctica<\/h4>[\s\S]*?<\/div>/,
    '<div class="lesson-box"><h4>Política de aprobación para el ejercicio</h4><p>Define el piso de contribución por canal, exige bases de comisión documentadas, simula promociones y conserva una fecha de revisión. La herramienta orienta la discusión: publicar un precio requiere costos, contratos, impuestos y aprobación comercial vigentes.</p></div>')
  .replace('30 ml = $433/ml y 100 ml = $300/ml','En una simulación, 30 ml = $433/ml y 100 ml = $300/ml')
};

export function detailPricingChapter(chapter){
 return {...chapter,modules:chapter.modules.map(m=>({...m,html:replacements[m.label]?.(m.html)??m.html}))};
}

const mobileFigures=new Set(['cap30-net-contribution-waterfall','cap30-30.2-margin-markup','cap30-30.5-discount','cap30-ppum','cap30-margin-rotation','cap30-pricing-policy']);
export function responsivePricingFigures(html){
 return html.replace(/<img([^>]*src="\/assets\/chapter30\/([^"]+)\.svg"[^>]*)>/g,(tag,attrs,name)=>
  mobileFigures.has(name)?`<picture><source media="(max-width: 640px)" srcset="/assets/chapter30/${name}-mobile.svg">${tag}</picture>`:tag);
}
