const lesson015 = {
 id:'m5',label:'1.5',title:'Rutinas y categorías',
 assessment:{version:1,passPercent:80,questions:[
 {id:'base',prompt:'Una clienta recién comienza y quiere una rutina de diez pasos. ¿Cuál es el mejor punto de partida?',options:['Incorporar diez productos porque es la rutina estándar coreana.','Identificar lo que ya usa y construir una base de limpieza adecuada, hidratación y fotoprotección diurna.','Elegir varios sérums distintos para acelerar resultados.'],correct:1,explanation:'Una base sencilla facilita evaluar tolerancia y sostener el hábito; no existe un número obligatorio de pasos.'},
 {id:'format',prompt:'Dos fórmulas se venden como essence y serum, pero tienen funciones semejantes. ¿Qué conclusión es correcta?',options:['Los nombres no garantizan funciones distintas: hay que revisar fórmula, uso y aporte.','Por llamarse essence siempre debe utilizarse antes de todo sérum.','Hay que recomendar ambas para cumplir una rutina completa.'],correct:0,explanation:'La categoría comercial no demuestra que ambos productos sean necesarios.'},
 {id:'spfu',prompt:'¿Qué recomendación es más apropiada respecto de la fotoprotección?',options:['Usar protector sólo en verano.','Sustituir el protector solar por un sérum antioxidante.','Incluir fotoprotección diurna adecuada y seguir instrucciones de uso y reaplicación.'],correct:2,explanation:'La fotoprotección diurna es un pilar del cuidado básico.'},
 {id:'changes',prompt:'La persona quiere incorporar un activo nuevo. ¿Qué aconsejas?',options:['Cambiar limpiador, crema y tratamiento el mismo día.','Introducir de forma gradual un producto pertinente para observar tolerancia.','Recomendar siempre la mayor concentración disponible.'],correct:1,explanation:'Introducir pocos cambios simultáneos facilita identificar reacciones y evaluar el uso real.'},
 {id:'role',prompt:'¿Qué justifica mejor añadir una ampolla a una rutina?',options:['Una función concreta que falta, compatibilidad con la rutina y facilidad para sostenerla.','Todas las ampollas son más potentes que los sérums.','Cuantos más productos, mejores resultados.'],correct:0,explanation:'La recomendación requiere función, encaje y expectativas realistas.'}
 ]},
 html:`
 <section class="course-module lesson-foundation" data-course-module-panel="m5">
  <div class="module-heading"><span>1.5</span><div><small>RUTINAS Y CATEGORÍAS</small><h3>Diseñar una rutina que la persona pueda usar de verdad</h3></div></div>
  <div class="lesson-box"><h4>Qué aprenderás</h4><p>Distinguir la función de cada categoría, diseñar rutinas diurnas y nocturnas y justificar por qué recomendarías —o no— un producto. Una rutina útil responde a las necesidades, la tolerancia y la capacidad de mantener el hábito.</p></div>
  <div class="reading-copy">
   <h4>1. La rutina no es una lista obligatoria de diez pasos</h4>
   <p>La popular rutina de diez pasos ayudó a difundir K-Beauty, pero no es un estándar clínico universal. Es más útil pensar en cuatro funciones: <strong>limpiar cuando corresponde, mantener la hidratación, atender una prioridad concreta y proteger del sol durante el día</strong>. Más pasos pueden aumentar costo, tiempo y dificultad para identificar cuál producto genera una molestia.</p>
   <p>Empieza con una entrevista sencilla: ¿qué utiliza hoy?, ¿qué le funciona?, ¿qué desea mejorar?, ¿qué molestias tuvo?, ¿cuál es su presupuesto y cuánto tiempo puede dedicar? No diagnostiques una afección a partir de una conversación de ventas. Ante síntomas intensos, lesiones persistentes o dudas médicas, corresponde derivar a un profesional.</p>
   <p>La <a href="https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget" target="_blank" rel="noopener noreferrer">Academia Estadounidense de Dermatología (AAD)</a> describe una base de limpieza adecuada, hidratación y protección solar. En exposición solar recomienda un protector de amplio espectro SPF 30 o superior, además de seguir sus instrucciones de reaplicación y combinar con sombra y ropa protectora.</p>
  </div>
  <figure class="course-image academy-infographic chapter-one-infographic"><img src="/assets/chapter01/cap01-routine.svg?v=visual2" alt="Infografía de rutina por cuatro funciones: limpiar, hidratar, tratar y proteger"><figcaption>Ordenar por función, no por cantidad de envases. <a href="/assets/chapter01/cap01-routine.svg?v=visual2" target="_blank" rel="noopener noreferrer">Ver infografía completa ↗</a></figcaption></figure>
  <div class="reading-copy">
   <h4>2. Qué hace cada familia de productos</h4>
   <p><strong>Limpiadores:</strong> geles, espumas, cremas, bálsamos o aceites. Escoge según lo que deben retirar y la experiencia posterior al lavado. La doble limpieza puede servir para maquillaje o protector resistente, pero no es obligatoria para todas las personas.</p>
   <p><strong>Tóner (toner):</strong> nombre comercial muy amplio; puede incluir fórmulas hidratantes, calmantes o con activos. No es obligatorio ni tiene una función idéntica en todas las marcas.</p>
   <p><strong>Esencia (essence):</strong> con frecuencia es un producto fluido, pero su denominación no garantiza una concentración, eficacia o función distinta de la de un sérum.</p>
   <p><strong>Sérum y ampolla:</strong> pueden enfocarse en una preocupación específica. Una ampolla no es necesariamente más potente; se revisa la formulación y el respaldo del producto concreto, no el nombre.</p>
   <p><strong>Crema o emulsión:</strong> contribuye al confort y a reducir la pérdida de agua. Humectantes, emolientes y oclusivos cumplen roles distintos y pueden combinarse. Textura espesa no equivale por sí sola a calidad superior.</p>
   <p><strong>Protector solar:</strong> ofrece fotoprotección diurna y no se sustituye con antioxidantes u otros cosméticos. Verifica presentación, etiqueta, indicaciones y autorización sanitaria correspondiente para Chile.</p>
  </div>
  <div class="learn-evidence-table"><table><caption>Preguntas que realmente ayudan a recomendar</caption><thead><tr><th scope="col">Categoría</th><th scope="col">Pregunta</th><th scope="col">Error frecuente</th></tr></thead><tbody>
   <tr><th scope="row">Aceite o bálsamo</th><td>¿Necesita retirar maquillaje o productos resistentes?</td><td>Indicar doble limpieza sin evaluar su necesidad.</td></tr>
   <tr><th scope="row">Tóner o esencia</th><td>¿Aporta algo que todavía no cubre su crema?</td><td>Duplicar pasos por el nombre.</td></tr>
   <tr><th scope="row">Sérum o ampolla</th><td>¿Qué función tiene y qué respaldo la sostiene?</td><td>Confundir concentración con superioridad.</td></tr>
   <tr><th scope="row">Crema</th><td>¿La textura resulta cómoda y sostenible?</td><td>Creer que una crema pesada siempre es mejor.</td></tr>
   <tr><th scope="row">Protector solar</th><td>¿Sabe cuánto y cuándo debe aplicarlo y reaplicarlo?</td><td>Usarlo solamente durante vacaciones.</td></tr>
  </tbody></table></div>
  <div class="reading-copy">
   <h4>3. Rutina de mañana, rutina de noche y orden flexible</h4>
   <p><strong>Mañana:</strong> limpieza según necesidad, tratamiento indicado si corresponde, hidratante cuando aporta confort y protector solar siguiendo la etiqueta. El maquillaje se usa después. <strong>Noche:</strong> retirar maquillaje/fotoprotector cuando corresponde, limpiar, aplicar los tratamientos compatibles y completar con hidratación apropiada.</p>
   <p>La regla de aplicar texturas de más ligeras a más densas es una orientación general, no una ley universal. Las instrucciones de uso y la tolerancia tienen prioridad. Evita introducir varias fórmulas nuevas simultáneamente, especialmente con activos potencialmente irritantes.</p>
  </div>
  <div class="routine-builder" data-routine-builder><h4>Herramienta: tres niveles de rutina</h4><p>Explora alternativas, no recetas universales. Una rutina extensa no es automáticamente mejor.</p><div class="routine-options"><button type="button" data-routine="simple">Esencial</button><button type="button" data-routine="media">Intermedia</button><button type="button" data-routine="completa">Extendida</button></div><div class="routine-result" data-routine-result><b>Selecciona un nivel</b><p>La mejor complejidad es la mínima que responde a una necesidad real.</p></div></div>
  <div class="reading-copy">
   <h4>4. Tres perfiles: decisiones distintas</h4>
   <p><strong>A · Primera rutina.</strong> La clienta ya usa crema y pide todos los pasos coreanos. Antes de vender más, comprobamos si necesita un limpiador apropiado y fotoprotección. No es obligatorio sumar esencia, ampolla y tónico.</p>
   <p><strong>B · Busca más confort.</strong> Revisamos limpieza, frecuencia, fórmula actual y preferencias de textura. Ajustar limpiador o crema podría ser suficiente. Una sensación de tirantez no permite emitir un diagnóstico médico.</p>
   <p><strong>C · Quiere un activo viral.</strong> Preguntamos cuál vio, qué espera, qué usa, tolerancia y presupuesto. Evaluamos su utilidad y respaldo antes de incorporarlo, sin prometer resultados.</p>
  </div>
  <div class="case-card wide course-case"><div><small>CASO DIDÁCTICO · SIMULACIÓN</small><h5>La clienta pide cinco productos y ya tiene tres</h5><p>Usa limpiador, crema y protector. Pide tóner, esencia, ampolla, sérum y mascarilla porque vio una rutina en redes. Tiene presupuesto limitado y sólo busca comodidad.</p></div><div class="case-actions"><b>Tu tarea</b><ol><li>Identifica funciones cubiertas.</li><li>Separa deseos de necesidades no resueltas.</li><li>Propón un solo cambio justificado, o ninguno.</li><li>Explica qué observar antes de sumar otro paso.</li></ol></div></div>
  <details class="case-solution"><summary>Ver resolución sugerida</summary><p>No indicaría los cinco productos. Primero preguntaría qué resultado falta, verificaría la rutina actual y priorizaría una opción razonable en costo, tolerancia y utilidad. También es válido no comprar un producto adicional si la base ya responde bien.</p></details>
  <aside class="learn-yeppo-advice"><small>CONSEJO PRÁCTICO</small><h4>Vender una función, no una cantidad de pasos</h4><p>La asesoría gana credibilidad cuando explica qué aporta cada producto y cuándo conviene no sumar otro. Un producto que no responde a una necesidad puede aumentar el gasto sin mejorar la experiencia. Esta es una orientación didáctica, no una cifra de resultados atribuida a Yeppo.</p></aside>
  <div class="lesson-box"><h4>Checklist antes de recomendar</h4><ol><li>¿Qué utiliza hoy y con qué resultado?</li><li>¿Qué busca mejorar?</li><li>¿Qué función aportará el nuevo producto?</li><li>¿Conoce las instrucciones y posibles molestias?</li><li>¿Puede mantener el hábito y el presupuesto?</li><li>¿Cuándo corresponde consultar a un profesional?</li></ol></div>
  <div class="source-course source-list"><b>Fuentes para profundizar</b><a href="https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget" target="_blank" rel="noopener noreferrer">AAD · Skin care on a budget</a><a href="https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-in-your-20s" target="_blank" rel="noopener noreferrer">AAD · Rutina y fotoprotección</a></div>
  <div class="module-takeaway"><b>Resultado esperado</b><p>Justifica cada paso según su función y el contexto de uso; una rutina completa es aquella que cubre necesidades, no aquella con más envases.</p></div>
 </section>`
};
export default lesson015;

