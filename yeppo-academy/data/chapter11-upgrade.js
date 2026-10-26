// Complementos específicos del capítulo 11, revisión previa al MVP.
// Hechos: DermNet (emolientes) y AAD (elección de hidratantes), consulta 2026-10-25.
// Los casos de mostrador no son testimonios ni resultados reales de Yeppo.
const source='<p class="source-course"><strong>Fuentes consultadas (25-10-2026):</strong> <a href="https://dermnetnz.org/topics/emollients-and-moisturisers" target="_blank" rel="noopener noreferrer">DermNet · Emollients and moisturisers</a> · <a href="https://www.aad.org/public/everyday-care/skin-care-basics/dry/pick-moisturizer" target="_blank" rel="noopener noreferrer">AAD · How to pick a moisturizer</a>. Los efectos dependen del producto terminado, la forma de uso y la persona.</p>';
const practice=(goal,scenario,task,solution,warning,visual='')=>'<section class="academy-applied-practice" aria-label="Aplicación guiada del módulo"><small>PRÁCTICA GUIADA · CASO SIMULADO</small><h4>Objetivo: '+goal+'</h4><p><strong>Situación:</strong> '+scenario+'</p><p><strong>Tu decisión:</strong> '+task+'</p>'+visual+'<label class="academy-case-input">Escribe tu decisión antes de ver el ejemplo<textarea rows="3" maxlength="2000" placeholder="¿Qué recomendarías y por qué? Tu respuesta no se guarda automáticamente."></textarea></label><p class="academy-case-hint" role="status" aria-live="polite">Escribe al menos una frase para habilitar la resolución.</p><details class="academy-case-answer"><summary>Consultar resolución razonada</summary><p>'+solution+'</p><p><strong>Límite del consejo:</strong> '+warning+'</p></details></section>';
const fig=(file,alt,caption)=>'<figure class="course-image academy-infographic"><img src="/assets/chapter11/'+file+'" alt="'+alt+'" loading="lazy"><figcaption>'+caption+'</figcaption></figure>';
const additions={
 "11.1":practice(
 'distinguir retención de agua, superficie y preferencia antes de ofrecer un producto',
 'Una persona refiere brillo en frente y nariz, pero tirantez después de lavarse. No refiere dolor ni otros síntomas de alerta.',
 'Formula tres preguntas de entrevista y justifica si comenzarías con una crema muy rica o una hidratante de textura ligera.',
 'Pregunta por limpiador, frecuencia de limpieza, productos nuevos y sensación con su crema actual. La presencia de brillo no elimina la necesidad de confort; compara una fórmula ligera y tolerable, sin asignar un diagnóstico ni prometer resultados.',
 'Si hay dolor, inflamación importante, lesiones o agravamiento persistente, orienta a evaluación profesional.',
 fig('cap11-hydration-decision.svg','Diagrama H-E-O-B de humectación, emoliencia, oclusión y lípidos de barrera con preguntas de recomendación','Esquema funcional: cuatro aportes de una fórmula y su traducción a una conversación de venta.')
 )+source,
 "11.2":practice(
 'distinguir la función del humectante del desempeño de toda la fórmula',
 'Dos cremas muestran ácido hialurónico y glicerina en sus listas INCI, pero sus texturas y modos de uso son diferentes.',
 'Decide si es válido declarar que la de ácido hialurónico hidrata más y qué documento consultarías.',
 'No es válido inferir mayor eficacia por un nombre destacado. Revisa INCI completo, etiqueta, características de formulación, evidencia disponible y tolerancia de la persona; registra lo desconocido.',
 'Algunos ingredientes multifuncionales, incluida la urea según el contexto, pueden causar molestias en piel lesionada. No reemplazar una evaluación clínica.'
 )+source,
 "11.3":practice(
 'transformar una preferencia sensorial en recomendación sostenible',
 'Una persona abandona la crema que compró porque deja un acabado pegajoso antes del maquillaje.',
 'Escribe una comparación de dos texturas sin afirmar que una es clínicamente superior.',
 'La opción más ligera puede resultar más cómoda, pero la textura depende de la fórmula y no garantiza eficacia. Pregunta horario, maquillaje, clima y acabados rechazados; ofrece prueba de textura de muestra apropiada, sin prometer tolerancia total.',
 'Una muestra o prueba de textura no descarta alergias y no es una prueba diagnóstica.'
 )+source,
 "11.4":practice(
 'explicar el papel de un oclusivo sin confundirlo con un diagnóstico',
 'Una clienta cree que cualquier producto con dimeticona impide que la piel respire.',
 'Explica qué significa reducir la evaporación de agua y qué variable de uso revisarías.',
 'Un agente oclusivo puede reducir la pérdida evaporativa de agua; eso no equivale a bloquear la respiración. Compara forma cosmética, confort, frecuencia y zona de uso en vez de demonizar un ingrediente por sí solo.',
 'No prometer tratamiento de dermatitis o curación por usar un componente oclusivo.'
 )+source,
 "11.5":practice(
 'separar la presencia de lípidos de la eficacia demostrada de un producto',
 'Una etiqueta destaca cinco tipos de ceramidas y otra destaca ceramidas junto a colesterol y ácidos grasos.',
 '¿Puedes afirmar que la primera repara la barrera cinco veces más? Define un dato que faltaría verificar.',
 'No. El número de nombres de ceramidas no es un multiplicador de eficacia. Revisa composición y evidencia del producto terminado, categoría, instrucciones y claims permitidos. La propuesta de venta debe centrarse en un objetivo cosmético verificable.',
 'Lesiones, dolor o hinchazón requieren otra evaluación y no se resuelven mediante un argumento de marketing.',
 fig('cap11-barrier-structure.svg','Esquema de corneocitos y matriz lipídica de la barrera; distingue ingredientes declarados y eficacia no demostrada','Dibujo didáctico simplificado, no microfotografía clínica ni representación de concentraciones.')
 )+source,
 "11.6":practice(
 'comparar fichas vigentes y evitar atribuir propiedades no publicadas',
 'En el catálogo público de Yeppo figura Round Lab Birch Juice Moisturizing Cream. La ficha revisada menciona savia de abedul, glicerina y pantenol, y describe una textura fresca.',
 'Identifica una afirmación documentada y una que no puedas respaldar sin ensayos de la fórmula.',
 'Documentada en la ficha consultada: ingredientes declarados y descripción comercial de textura. No está documentada por la sola ficha: que eliminará una enfermedad o funcionará igual en todas las personas. Registra la fecha y vuelve a contrastar la presentación real antes de vender.',
 'Ficha comercial no equivale a evaluación clínica; la formulación y disponibilidad pueden cambiar.'
 )+'<p class="source-course"><strong>Ejemplo real:</strong> <a href="https://yeppo.cl/products/round-lab-birch-juice-moisturizing-cream" target="_blank" rel="noopener noreferrer">Yeppo · Round Lab Birch Juice Moisturizing Cream</a> (consulta 25-10-2026). No se fijan precios ni stock.</p>',
 "11.7":practice(
 'armar un surtido B2B por necesidades sin duplicar referencias',
 'Una tienda de práctica dispone de espacio para tres hidratantes: uso diario ligero, mayor riqueza sensorial y una propuesta centrada en barrera. Los datos de ventas no están disponibles.',
 'Propón un criterio para seleccionar las tres referencias y un KPI que observarías tras el lanzamiento.',
 'Selecciona fórmulas documentadas y diferentes por textura, función y compatibilidad con clientes, validando disponibilidad y vigencia. Observa rotación por SKU, consultas y devoluciones; no inventes ventas ni prometas que una presentación tendrá recompra superior.',
 'La decisión de surtido no puede cerrarse con margen o rotación real hasta obtener datos verificables de compras y ventas.'
 )+source,
 "11.8":practice(
 'defender una recomendación completa con la matriz H-E-O-B',
 'Un equipo comercial debe explicar por qué recomienda una fórmula a una clienta con tirantez leve que rechaza texturas densas.',
 'Redacta una ficha de cuatro partes: necesidad, función H-E-O-B sustentable, textura y motivo para descartar otras opciones.',
 'Ejemplo de solución: necesidad de confort tras limpieza; buscar humectantes e ingredientes complementarios confirmados por ficha; textura ligera por preferencia declarada; evitar crema rica si la clienta no la usaría. Dejar pendientes efectos no documentados y evaluar tolerancia individual.',
 'La clasificación H-E-O-B es una guía comercial, no una escala médica. Si aparecen signos de alarma se detiene la recomendación.'
 )+source
};
const bank={
 "11.1":[
 ["Una clienta tiene brillo y tirantez tras lavarse. ¿Qué preguntas primero?",["Solo el presupuesto","Qué limpiador usa, qué cambió y qué textura tolera","Cuántos productos quiere sumar"],1,"La coexistencia de brillo y tirantez exige comprender la rutina y la preferencia, no suponer un diagnóstico.",false],
 ["¿Qué función se asocia principalmente a un oclusivo?",["Ayudar a reducir la pérdida evaporativa de agua","Diagnosticar una enfermedad","Asegurar ausencia de alergias"],0,"Un componente oclusivo contribuye a reducir evaporación; su resultado depende del conjunto de la fórmula.",false],
 ["¿Qué decisión sobre una hidratante es más defendible?",["La fórmula más cara","La de más nombres de activos","La que cubre la necesidad y resulta sostenible para la persona"],2,"La elección razonada combina ingredientes, textura, tolerancia y posibilidad de uso continuo.",false]],
 "11.2":[
 ["¿Cuál es un ejemplo de humectante usado en cosmética?",["Glicerina","Colorante de envase","Etiqueta de precio"],0,"DermNet describe la glicerina entre los humectantes; su función no determina sola el rendimiento final.",false],
 ["Dos fórmulas llevan ácido hialurónico. ¿Qué concluyes?",["Que funcionan idéntico","Que deben compararse vehículo, concentración disponible y evidencia","Que ambas tratan una enfermedad"],1,"Un mismo INCI destacado no confirma formulaciones, desempeño ni tolerancia equivalentes.",false],
 ["Si se propone un sérum humectante, ¿qué verificas?",["Solo su popularidad","Que pueda sustituir siempre la crema","Si la rutina necesita también funciones emolientes u oclusivas"],2,"La hidratación cotidiana suele depender de funciones complementarias dentro de una rutina tolerable.",false]],
 "11.3":[
 ["Una clienta abandonó una crema por sensación pegajosa. ¿Qué haces?",["Comparar texturas y horario de uso","Recomendar que se aplique el doble","Ignorar el motivo de abandono"],0,"La textura percibida determina la posibilidad de mantener el uso habitual de una fórmula.",false],
 ["¿Qué indica emoliencia principalmente?",["Que cura una alergia","Que contribuye a suavizar la superficie","Que elimina necesidad de protección solar"],1,"Emoliencia es una función de sensación y suavidad cutánea, no un reclamo clínico universal.",false],
 ["Una muestra aplicada en una zona pequeña…",["Garantiza cero alergias","Permite diagnosticar rosácea","Puede mostrar textura, pero no garantiza tolerancia ni seguridad"],2,"La prueba sensorial es orientativa y no reemplaza evaluaciones médicas cuando corresponden.",true]],
 "11.4":[
 ["Un producto dice «sellar hidratación». ¿Cómo se explica?",["Disminuir la evaporación de agua en la superficie","Cerrar físicamente todos los poros","Impedir que el oxígeno llegue a la piel"],0,"La metáfora hace referencia a reducción de pérdida evaporativa, no a bloqueo completo de funciones cutáneas.",false],
 ["¿Qué ingrediente cita DermNet como oclusivo?",["Cafeína","Dimeticona","Colorante rojo"],1,"DermNet menciona dimeticona entre los ingredientes que pueden contribuir a la oclusión.",false],
 ["¿Cómo seleccionar una crema rica para uso nocturno?",["Solo por tamaño de envase","Prometiendo que cura eccema","Según sequedad descrita, comodidad y etiqueta vigente"],2,"El papel de la textura depende de la persona y del producto; un cosmético no sustituye tratamiento médico.",false]],
 "11.5":[
 ["¿Qué tres grupos se relacionan con lípidos de barrera?",["Ceramidas, colesterol y ácidos grasos","Ácidos de baterías, polvo y silicona industrial","Solo vitaminas"],0,"La matriz lipídica del estrato córneo incluye estas familias; un esquema no expresa proporciones clínicas.",false],
 ["Una crema incluye varias ceramidas. ¿Puedes afirmar mayor eficacia por número?",["Sí, una por cada capa","No: hace falta examinar fórmula y evidencia del producto","Sí, cinco ceramidas son cinco veces mejores"],1,"La cantidad de nombres listados no demuestra magnitud del beneficio de una fórmula cosmética.",false],
 ["Una persona presenta hinchazón y dificultad para respirar. ¿Qué corresponde?",["Vender una crema de barrera","Sugerir que espere hasta mañana","Interrumpir asesoría comercial y orientar atención médica urgente"],2,"La dificultad respiratoria es una señal de alarma que requiere atención urgente, no otra venta.",true]],
 "11.6":[
 ["¿Qué dato de Round Lab puede recuperarse de una ficha Yeppo consultada?",["Ingredientes destacados y descripción comercial de textura","Una cura garantizada de dermatitis","El resultado clínico individual de cada clienta"],0,"La ficha revisada documenta ingredientes y descripción cosmética; no demuestra eficacia clínica universal.",false],
 ["Antes de congelar un INCI en un curso, debes…",["Confiar en una captura viral","Consultar la ficha y presentación vigentes","Asumir que todas las versiones internacionales son idénticas"],1,"Las etiquetas y formulaciones cambian, por lo que el catálogo vigente es la referencia verificable.",false],
 ["¿Qué es H-E-O-B dentro del capítulo?",["Una certificación médica","Una clasificación del ISP","Una matriz pedagógica de funciones cosméticas"],2,"El marco facilita comparar humectar, emoliencia, oclusión y barrera sin asignar resultados médicos.",false]],
 "11.7":[
 ["Para un surtido de hidratantes de tres referencias, ¿qué priorizar?",["Funciones y texturas claramente diferenciadas","Tres envases idénticos","La presencia de la palabra viral"],0,"La selección debe cubrir necesidades diversas con fórmulas documentadas, sin duplicar propuestas.",false],
 ["¿Qué KPI ayuda a revisar un surtido una vez disponible la venta?",["Color de las cajas","Rotación por SKU y consultas frecuentes","Número de publicaciones genéricas"],1,"La rotación y fricción comercial permiten revisar el surtido con datos, no intuiciones.",false],
 ["Si no tienes rotación real, ¿qué reporte presentas?",["Una cifra estimada como venta realizada","Margen inventado por referencia","Hipótesis identificada y dato pendiente de obtener"],2,"La ausencia de ventas verificadas no autoriza a fabricar métricas ni conclusiones de negocio.",false]],
 "11.8":[
 ["Una ficha H-E-O-B debe basarse en…",["Ingrediente, fórmula y evidencia disponibles","Puro color de envase","Promesas clínicas de la competencia"],0,"El rol de la matriz es ordenar argumentos verificables y no crear nuevos claims.",false],
 ["Si la clienta rechaza la crema más densa, ¿qué haces?",["Insistir por ticket","Comparar textura y necesidad antes de proponer una alternativa","Vender dos capas sin revisar rutina"],1,"La preferencia sensorial afecta la continuidad del uso y hace parte de la recomendación responsable.",false],
 ["¿Qué concluyes tras una simulación de recomendación?",["Que ya se demostró beneficio real en pacientes","Que cualquier vendedor puede diagnosticar","Que se practicó un criterio comercial y falta verificar el producto real"],2,"Una práctica didáctica no demuestra seguridad o eficacia clínica del producto terminado.",false]]
};
export const hydrationPractices=additions;
export function upgradeHydrationChapter(chapter){
 if(chapter.id!=='c11')throw new Error('CHAPTER_MISMATCH');
 return {...chapter,contentVersion:Math.max(3,Number(chapter.contentVersion||0)),modules:chapter.modules.map(m=>{
  const extra=additions[m.label],rows=bank[m.label];
  if(!extra||!rows)throw new Error('Falta actualización específica del módulo '+m.label);
  return {...m,html:m.html+extra,assessment:{version:1,passPercent:80,questions:rows.map(([prompt,options,correct,explanation,critical],i)=>({id:'q'+(i+1),prompt,options,correct,explanation,critical:Boolean(critical)}))}};
 })};
}
