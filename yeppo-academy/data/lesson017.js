const lesson017 = {
 id:'m7',label:'1.7',title:'Consumidor y canales',
 assessment:{version:1,passPercent:80,questions:[
 {id:'journey',prompt:'Una clienta descubre un producto en TikTok y termina comprándolo en tienda física. ¿Qué enseñanza deja?',options:['Cada canal debe gestionarse como si la clienta fuese distinta.','La experiencia puede atravesar varios canales y debe mantener mensajes y disponibilidad consistentes.','La venta corresponde necesariamente a TikTok y no al comercio.'],correct:1,explanation:'El proceso de decisión puede iniciar, avanzar y cerrarse en canales diferentes; la atribución necesita metodología.'},
 {id:'stock',prompt:'La página muestra disponible un producto sin stock real para despachar. ¿Qué problema aparece?',options:['Expectativa incumplida, riesgo de cancelación y pérdida de confianza.','Más conversión garantizada.','Un indicador de viralidad positiva.'],correct:0,explanation:'La coherencia entre inventario publicado y capacidad de cumplimiento es parte de la experiencia.'},
 {id:'cohort',prompt:'40 personas compran por primera vez en marzo y 10 hacen otro pedido dentro de 60 días. ¿Qué porcentaje de esa cohorte repitió?',options:['10 %.','40 %.','25 %.'],correct:2,explanation:'10 ÷ 40 = 25 %. El seguimiento requiere un grupo inicial y una ventana temporal.'},
 {id:'cvr',prompt:'Una ficha recibe 500 visitas y genera 40 pedidos. ¿Qué conversión ilustrativa resulta?',options:['8 %.','40 %.','0,8 %.'],correct:0,explanation:'40 ÷ 500 × 100 = 8 %. Debe quedar claro qué visitas y pedidos se están contando.'},
 {id:'support',prompt:'Tras una compra, varias clientas preguntan cómo aplicar el producto y dicen que no ven resultados en dos días. ¿Qué mejora priorizarías?',options:['Prometer un resultado clínico inmediato.','Mejorar instrucciones, expectativas, formación de asesoría y seguimiento posventa.','Eliminar toda información de uso para simplificar la ficha.'],correct:1,explanation:'Educar expectativas y facilitar el uso reduce fricciones sin hacer promesas no respaldadas.'}
 ]},
 html:`
 <section class="course-module lesson-foundation" data-course-module-panel="m7">
  <div class="module-heading"><span>1.7</span><div><small>CLIENTE Y OMNICANALIDAD</small><h3>De un video viral a una recompra sostenible</h3></div></div>
  <div class="lesson-box"><h4>Qué aprenderás</h4><p>Reconocer las etapas del recorrido del consumidor, diferenciar el papel de tiendas, ecommerce, redes y marketplaces, medir fricciones y diseñar una experiencia coherente que no termine al cobrar la primera orden.</p></div>
  <div class="reading-copy">
   <h4>1. La compra rara vez ocurre en un solo canal</h4>
   <p>Una persona puede descubrir una rutina en TikTok, buscar información en Google, revisar comentarios en un marketplace, consultar en Instagram, probar una textura en tienda y terminar comprando en la web. El <strong>customer journey</strong> es ese recorrido completo: descubrimiento, evaluación, decisión, uso y recompra.</p>
   <p>El canal que registra el pago no siempre explica todo lo que ayudó a la decisión. <strong>Omnicanalidad</strong> significa intentar que información, disponibilidad, precios explicados y servicio sean coherentes a lo largo de ese recorrido. No significa que todos los canales deban tener exactamente los mismos precios, sino que cualquier diferencia tenga una justificación comprensible y se comunique con claridad.</p>
   <p>Por eso, una publicación viral sólo es el comienzo. Si la ficha no explica qué es el producto, si el stock no coincide o si nadie responde una duda, el interés puede no convertirse en compra. Y si la promesa fue exagerada, la compra puede no terminar en satisfacción ni repetición.</p>
  </div>
  <figure class="course-image academy-infographic chapter-one-infographic"><img src="/assets/chapter01/cap01-journey.svg?v=visual2" alt="Infografía del recorrido del cliente: descubre, compara, compra, utiliza y recompra"><figcaption>Un mismo cliente atraviesa diferentes puntos de contacto. <a href="/assets/chapter01/cap01-journey.svg?v=visual2" target="_blank" rel="noopener noreferrer">Ver recorrido completo ↗</a></figcaption></figure>
  <div class="reading-copy">
   <h4>2. Cinco momentos que deben tener una respuesta</h4>
   <p><strong>Descubre.</strong> Un video, recomendación o búsqueda provoca interés. Debe resultar fácil identificar marca, nombre, función y condiciones reales del producto.</p>
   <p><strong>Compara.</strong> La persona contrasta reseñas, precio, tamaño, composición, formatos y opciones alternativas. Una ficha completa, imágenes fieles a la presentación y la explicación de ingredientes ayudan a tomar una decisión informada.</p>
   <p><strong>Compra.</strong> En este punto importan la disponibilidad real, el precio final, el despacho, el retiro y una promesa de entrega alcanzable. No publiques stock que la operación no puede cumplir.</p>
   <p><strong>Usa.</strong> La experiencia continúa con instrucciones, expectativas razonables, ayuda ante dudas y resolución de incidencias. El buen servicio incluye reconocer cuando un producto no era adecuado y gestionar devoluciones o reclamos conforme a la normativa aplicable.</p>
   <p><strong>Recompra.</strong> Se evalúa si vale la pena reponer el mismo artículo, complementar con otra categoría o no realizar una nueva recomendación. El CRM —gestión de la relación con clientes— ayuda a organizar seguimiento legítimo, siempre respetando la privacidad y preferencias de comunicación.</p>
  </div>
  <div class="learn-evidence-table"><table><caption>Acciones por etapa y sus indicadores</caption><thead><tr><th scope="col">Etapa</th><th scope="col">Fricción frecuente</th><th scope="col">Acción concreta</th><th scope="col">Indicador</th></tr></thead><tbody>
   <tr><th scope="row">Descubrimiento</th><td>No se entiende para qué sirve.</td><td>Contenido explicativo y términos de búsqueda pertinentes.</td><td>Vistas y búsquedas relevantes.</td></tr>
   <tr><th scope="row">Comparación</th><td>Imagen o título confusos.</td><td>Ficha clara, ingredientes y fotos de presentación real.</td><td>Visitas a ficha y consultas.</td></tr>
   <tr><th scope="row">Compra</th><td>Stock o plazo incorrecto.</td><td>Sincronizar inventario y promesas de despacho.</td><td>Conversión, cancelaciones, cumplimiento.</td></tr>
   <tr><th scope="row">Uso</th><td>Duda sobre aplicación.</td><td>Instrucciones y atención posventa.</td><td>Consultas, motivos de devolución.</td></tr>
   <tr><th scope="row">Recompra</th><td>La marca desaparece tras vender.</td><td>Seguimiento pertinente y reposición disponible.</td><td>Recompra por cohorte.</td></tr>
  </tbody></table></div>
  <div class="reading-copy">
   <h4>3. Qué aporta cada canal sin competir contra la experiencia</h4>
   <p><strong>Tienda física:</strong> contacto humano, oportunidad de explicar texturas y resolver dudas. No confundas que a una asesora le guste un acabado con evidencia de eficacia universal.</p>
   <p><strong>Ecommerce:</strong> profundidad de información, filtros, combinaciones de productos, historial de pedidos y educación poscompra. La calidad de la ficha es parte de la venta consultiva.</p>
   <p><strong>Marketplace:</strong> visibilidad y comparación inmediata; requiere publicaciones precisas, inventario confiable, costos claros y control de reputación y logística.</p>
   <p><strong>Redes, mensajería y CRM:</strong> generan conversación y continuidad. No todas las personas quieren mensajes promocionales; pide las autorizaciones pertinentes y facilita gestionar preferencias.</p>
   <p>Un cliente no debería tener que aprender de nuevo qué compró al pasar de la tienda física al canal online. Establece nombres de producto, variantes, instrucciones y criterios de asesoría consistentes, incluso cuando cada canal tenga reglas comerciales diferentes.</p>
  </div>
  <div class="reading-copy"><h4>4. Aprender de un embudo comercial sin engañarse con cifras</h4><p>Un <strong>funnel</strong> o embudo presenta cuántas personas avanzan de una etapa a otra. Sirve para detectar fricciones, pero no prueba por sí solo qué causó una compra. Tampoco es correcto sumar visitas de varios canales como si fueran individuos únicos.</p></div>
  <figure class="learn-demand-chart" aria-labelledby="funnel-017-title"><small>SIMULACIÓN · CIFRAS FICTICIAS</small><h4 id="funnel-017-title">Una campaña pequeña y su recorrido</h4><div class="learn-evidence-table"><table><thead><tr><th scope="col">Etapa</th><th scope="col">Cantidad</th><th scope="col">Tasa y base</th></tr></thead><tbody>
   <tr><th scope="row">Personas alcanzadas</th><td>2.000</td><td>Universo de referencia</td></tr>
   <tr><th scope="row">Visitas a la ficha</th><td>500</td><td>25 % de las 2.000 alcanzadas, bajo supuestos del caso</td></tr>
   <tr><th scope="row">Agregados al carrito</th><td>80</td><td>16 % de las 500 visitas</td></tr>
   <tr><th scope="row">Pedidos</th><td>40</td><td>8 % de las 500 visitas; 50 % de los 80 carritos</td></tr>
   <tr><th scope="row">Compradores que repiten en 60 días</th><td>10</td><td>25 % de una cohorte de 40 compradores distintos</td></tr>
  </tbody></table></div><figcaption>Datos inventados sólo para practicar cálculos. Se supone una visita atribuida por persona y un pedido por comprador inicial; en operaciones reales deben comprobarse identidad, atribución, devoluciones y ventanas temporales. La recompra se calcula sobre compradores, no sobre visitas.</figcaption></figure>
  <div class="reading-copy">
   <h4>5. Métricas que debes saber interpretar</h4>
   <p><strong>Conversión de ficha:</strong> pedidos atribuibles a esa ficha ÷ visitas a la ficha, dentro del mismo período y método. <strong>Ticket promedio (AOV):</strong> venta del período ÷ cantidad de pedidos comparables. <strong>Pedidos cancelados:</strong> cancelaciones ÷ pedidos recibidos. <strong>Recompra por cohorte:</strong> personas que vuelven a comprar durante una ventana definida ÷ compradores iniciales elegibles.</p>
   <p><strong>LTV</strong> representa el valor que aporta un cliente a lo largo de su relación con la empresa; su cálculo varía y conviene diferenciar ingresos de contribución. <strong>CSAT</strong> mide satisfacción declarada tras una interacción, si existe una encuesta con escala definida. Ninguno de estos indicadores debe interpretarse aisladamente.</p>
   <p>Los reportes de <a href="https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/customers-reports" target="_blank" rel="noopener noreferrer">cohortes de Shopify</a> permiten agrupar clientes según su primera compra y observar la retención posterior. El ejemplo es una referencia metodológica, no una cifra real de Yeppo.</p>
  </div>
  <div class="case-card wide course-case"><div><small>CASO DIDÁCTICO · OMNICANAL</small><h5>Se viraliza un sérum, pero empiezan las cancelaciones</h5><p>Un video dispara consultas. La tienda y la web muestran disponibilidad, pero el inventario destinado a despachos está comprometido. Algunas órdenes deben cancelarse, otras llegan tarde y aumentan las consultas.</p></div><div class="case-actions"><b>Orden de actuación propuesto</b><ol><li>Detener la promesa de stock incorrecto.</li><li>Identificar pedidos afectados y comunicar alternativas.</li><li>Ajustar publicación, inventario y capacidad logística.</li><li>Documentar causa, fricción y aprendizaje comercial.</li></ol></div></div>
  <details class="case-solution"><summary>Ver resolución orientativa</summary><p>Primero se protege la experiencia prometida: no continuar vendiendo cantidades que no se pueden despachar. Se prioriza atención de pedidos comprometidos y corrección de disponibilidad. Después se revisa el proceso que permitió desalinear catálogo, stock y capacidad de preparación. La venta viral sólo es éxito sostenible si puede cumplirse.</p></details>
  <aside class="learn-yeppo-advice"><small>CONSEJO OPERATIVO</small><h4>El canal de venta cambia; la confianza del cliente no</h4><p>Antes de escalar una campaña, confirma disponibilidad y capacidad de despacho del canal. Haz que atención, tienda y ecommerce compartan información de producto e incidencias. Es una recomendación de gestión que puede aplicarse a cualquier operación K-Beauty.</p></aside>
  <div class="lesson-box"><h4>Ejercicio de aplicación</h4><p>Elige un SKU hipotético y describe cinco puntos de contacto: dónde se descubre, qué duda surge al comparar, qué debe funcionar en el pago, cómo se instruye el uso y qué condición haría razonable recomendar una recompra. Asigna un indicador verificable a cada punto.</p></div>
  <div class="source-course source-list"><b>Fuentes y metodología</b><a href="https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/customers-reports" target="_blank" rel="noopener noreferrer">Shopify Help · Análisis de cohortes</a><a href="https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/analytics-fields" target="_blank" rel="noopener noreferrer">Shopify Help · Definiciones de indicadores de retención</a></div>
  <div class="module-takeaway"><b>Resultado esperado</b><p>Reconoce el viaje completo del cliente, entiende qué debe aportar cada canal y mide conversión, cumplimiento y recompra con bases comparables.</p></div>
 </section>`
};
export default lesson017;

