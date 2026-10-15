// Intervenciones visuales acotadas a los capítulos 2 (negocio) y 4 (piel).
// No modifican texto, evaluación ni datos editables guardados por el alumno.
const visuals={
 c02:[
  ["cap2-2.1-mercado-chile.svg","Tres indicadores del crecimiento de importaciones de cosméticos coreanos en Chile"],
  ["cap2-2.2-consumidora-viaje.svg","Recorrido de clientas K-Beauty desde descubrimiento hasta recompra"],
  ["cap2-2.3-venta-ingredientes.svg","Cuatro pasos para asesorar según necesidad"],
  ["cap2-2.4-b2b-vender-mas.svg","Cuatro acciones para apoyar el crecimiento de un cliente mayorista"],
  ["cap2-2.5-canales.svg","Funciones diferenciadas de tienda, ecommerce, marketplaces y B2B"],
  ["cap2-2.6-confianza.svg","Cuatro capas de confianza en la comercialización de cosméticos"],
  ["cap2-2.7-unit-economics.svg","Cálculo conceptual de la contribución comercial y variables de inventario"],
  ["cap2-2.8-plan90.svg","Plan de crecimiento de 90 días en tres fases"]
 ],
 c04:[
  ["cap4-4.1-capas-piel.svg","Esquema simplificado de epidermis, dermis e hipodermis"],
  ["cap4-4.2-epidermis.svg","Esquema de renovación natural de células de la epidermis"],
  ["cap4-4.3-barrera-cutanea.svg","Modelo de corneocitos, lípidos y factor natural de hidratación"],
  ["cap4-4.4-dermis.svg","Ilustración conceptual de soporte dérmico"],
  ["cap4-4.5-foliculos.svg","Esquema del folículo piloso y sebo"],
  ["cap4-4.6-melanina.svg","Exposición UV y pigmentación en la epidermis"],
  ["cap4-4.7-microbioma.svg","Ilustración conceptual del microbioma cutáneo"],
  ["cap4-4.8-limites-vendedor.svg","Orientación cosmética y límites de derivación sanitaria"]
 ]
};
export function enhanceChapterVisuals(chapterId,module){
 const set=visuals[chapterId]; if(!set)return module?.html||"";
 const section=Number(String(module?.label||"").split(".")[1]);
 const visual=set[section-1]; if(!visual)return module?.html||"";
 const dir=chapterId==="c02"?"chapter2":"chapter4";
 const src="/assets/"+dir+"/"+visual[0]+"?v=20261015b";
 const figure='<figure class="course-image academy-infographic academy-focused-visual"><img src="'+src+'" alt="'+visual[1]+'" loading="lazy"/><figcaption>'+visual[1]+' · <a href="'+src+'" target="_blank" rel="noopener noreferrer">Ampliar imagen ↗</a></figcaption></figure>';
 let html=module?.html||"";
 // Sustituir diagramas anteriores del módulo, conservando fotos documentales y ejemplos.
 html=html.replace(/<figure class="course-image academy-infographic">[\s\S]*?<\/figure>/g,"");
 // El antiguo capítulo 2 contenía la foto de una tienda competidora; usar una imagen real de Yeppo.
 if(chapterId==="c02")html=html.replace(/<figure class="course-image wide-image ch2-photo">[\s\S]*?<\/figure>/g,
 '<figure class="course-image wide-image ch2-photo"><img src="/assets/editorial/yeppo-store.jpg" alt="Interior real de una tienda Yeppo con exhibición de cosméticos"/><figcaption>Tienda Yeppo: experiencia física, selección de productos y asesoría como factores de diferenciación.</figcaption></figure>');
 const reading=/<div class="reading-copy">[\s\S]*?<\/div>/;
 if(reading.test(html))return html.replace(reading,s=>s+figure);
 return figure+html;
}
