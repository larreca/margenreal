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
 c03:[
  ["cap3-3.1-posicionamiento.svg","Mapa visual de posicionamiento comercial, curaduría, asesoría, experiencia y confianza"],
  ["cap3-3.2-mapa-competencia.svg","Mapa visual de formatos competitivos de K-Beauty, sin clasificar marcas reales"],
  ["cap3-3.3-surtido.svg","Estantería ilustrada: básicos, novedades y complementos con métricas de stock"],
  ["cap3-3.4-tienda.svg","Plano visual de descubrimiento, pruebas y asesoría en una tienda K-Beauty"],
  ["cap3-3.5-omnicanal.svg","Diagrama de experiencia integrada de tienda, ecommerce, marketplace y posventa"],
  ["cap3-3.6-contenido.svg","Fichas, educación y comunidad como recursos de confianza"],
  ["cap3-3.7-precios.svg","Infografía de contribución comercial, descuentos y fidelización"],
  ["cap3-3.8-plan90.svg","Plan de noventa días para diagnóstico, experimentos y crecimiento"]
 ],
 c04:[
  ["cap4-4.1-capas-piel.png","Esquema simplificado de epidermis, dermis e hipodermis"],
  ["cap4-4.2-epidermis.png","Esquema de renovación natural de células de la epidermis"],
  ["cap4-4.3-barrera-cutanea.png","Modelo de corneocitos, lípidos y factor natural de hidratación"],
  ["cap4-4.4-dermis.png","Ilustración conceptual de soporte dérmico"],
  ["cap4-4.5-foliculos.png","Esquema del folículo piloso y sebo"],
  ["cap4-4.6-melanina.png","Exposición UV y pigmentación en la epidermis"],
  ["cap4-4.7-microbioma.png","Ilustración conceptual del microbioma cutáneo"],
  ["cap4-4.8-limites-vendedor.png","Orientación cosmética y límites de derivación sanitaria"]
 ],
 c05:[
  ["cap5-5.1-tipos-piel.png","Cuatro perfiles cosméticos orientativos: piel normal, seca, grasa y mixta"],
  ["cap5-5.2-tipo-estado-objetivo.png","Tipo, estado y objetivo cosmético: tres preguntas distintas"],
  ["cap5-5.3-piel-seca.png","Piel seca: tendencia a menos lípidos y cuidados de barrera"],
  ["cap5-5.4-piel-grasa.png","Piel grasa: sebo normal, limpieza respetuosa e hidratación"],
  ["cap5-5.5-piel-mixta.png","Piel mixta: necesidades diferenciadas de zona T y mejillas"],
  ["cap5-5.6-piel-normal.png","Piel normal: equilibrio cutáneo, limpieza y fotoprotección"],
  ["cap5-5.7-reactividad.png","Reactividad: entrevista, simplificación y derivación cuando corresponda"],
  ["cap5-5.8-asesoria.png","Venta consultiva: escuchar, priorizar y acompañar sin diagnosticar"]
 ]
};
export function enhanceChapterVisuals(chapterId,module){
 const set=visuals[chapterId]; if(!set)return module?.html||"";
 const section=Number(String(module?.label||"").split(".")[1]);
 const visual=set[section-1]; if(!visual)return module?.html||"";
 const dir=chapterId==="c02"?"chapter2":chapterId==="c03"?"chapter3":chapterId==="c04"?"chapter4":"chapter5";
 const src="/assets/"+dir+"/"+visual[0]+(chapterId==="c05"?"?v=ch5-png-20261016":"?v=ch4-png-20261016");
 const figure='<figure class="course-image academy-infographic academy-focused-visual"><img src="'+src+'" alt="'+visual[1]+'" loading="lazy"/><figcaption>'+visual[1]+' · <a href="'+src+'" target="_blank" rel="noopener noreferrer">Ampliar imagen ↗</a></figcaption></figure>';
 let html=module?.html||"";
 // Sustituir diagramas anteriores del módulo, conservando fotos documentales y ejemplos.
 html=html.replace(/<figure class="course-image academy-infographic">[\s\S]*?<\/figure>/g,"");
 // El antiguo capítulo 2 contenía la foto de una tienda competidora; usar una imagen real de Yeppo.
 if(chapterId==="c02")html=html.replace(/<figure class="course-image wide-image ch2-photo">[\s\S]*?<\/figure>/g,
 '<figure class="course-image wide-image ch2-photo"><img src="/assets/editorial/yeppo-store.jpg" alt="Interior real de una tienda Yeppo con exhibición de cosméticos"/><figcaption>Tienda Yeppo: experiencia física, selección de productos y asesoría como factores de diferenciación.</figcaption></figure>');
 // El capítulo 3 ilustra tiendas únicamente con imágenes reales y oficiales de Yeppo.
 if(chapterId==="c03"){
  const storePhotos=[
   {url:"https://yeppo.cl/cdn/shop/files/yeppo-patronato-tienda1.jpg?v=1749442209&width=1200",label:"Yeppo Patronato"},
   {url:"https://yeppo.cl/cdn/shop/files/Frame_1000004954.jpg?v=1792005955&width=1200",label:"Yeppo Viña del Mar"},
   {url:"https://yeppo.cl/cdn/shop/files/1000011692_1_8fba4af1-edae-4b91-8486-8cd2e235ddf5.jpg?v=1791770816&width=1200",label:"Yeppo Providencia"},
   {url:"https://yeppo.cl/cdn/shop/files/1000007721.jpg?v=1791771155&width=1200",label:"Yeppo Estación Seúl"},
   {url:"https://yeppo.cl/cdn/shop/files/tienda_4.jpg?v=1777987547&width=1200",label:"Yeppo Alcántara"}
  ];
  const place=storePhotos[(section-1)%storePhotos.length];
  const store='<figure class="course-image wide-image ch2-photo"><img src="'+place.url+'" loading="lazy" alt="Fotografía real de la tienda '+place.label+'" /><figcaption>Fotografía real de '+place.label+' · Yeppo. Ejemplo de una experiencia presencial de K-Beauty.</figcaption></figure>';
  html=html.replace(/<figure class="course-image wide-image ch2-photo">[\s\S]*?<\/figure>/g,store);
 }
 const reading=/<div class="reading-copy">[\s\S]*?<\/div>/;
 if(reading.test(html))return html.replace(reading,s=>s+figure);
 return figure+html;
}
