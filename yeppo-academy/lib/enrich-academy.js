// Shared pedagogical enhancement. A case is a hypothesis for practice, never live Yeppo data.
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function enrichChapterCases(chapter,bank,{version=6,sources=[],visuals={}}={}){
 if(!chapter?.modules?.length)throw Error('Missing chapter modules');
 return {...chapter,contentVersion:Math.max(Number(chapter.contentVersion||0),version),modules:chapter.modules.map(m=>{
  const c=bank[m.label];if(!c)throw Error('Missing applied case '+m.label);
  for(const k of ['goal','scenario','task','solution','decision','wrong1','wrong2','evidence','risk','control','next']){
   if(!c[k]||String(c[k]).length<18)throw Error('Incomplete '+m.label+': '+k);
  }
  const questions=[
   {id:'q1',prompt:'¿Qué decisión es más defendible en este caso?',options:[c.wrong1,c.decision,c.wrong2],correct:1,explanation:c.solution,critical:!!c.critical},
   {id:'q2',prompt:'¿Qué evidencia necesitas antes de confirmar esa decisión?',options:['Elegir según popularidad sin datos',c.evidence,'Asumir que el stock de otra tienda es propio'],correct:1,explanation:'La verificación requerida en este caso es: '+c.evidence},
   {id:'q3',prompt:'¿Cuál de estas actuaciones sería un error en este escenario?',options:[c.risk,'Verificar los hechos documentados en la ficha','Registrar una decisión reversible con responsable'],correct:0,explanation:'Debe evitarse: '+c.risk+'. '+c.control,critical:!!c.critical},
   {id:'q4',prompt:'¿Qué control demuestra que la decisión fue realizada correctamente?',options:['La estética de la presentación',c.control,'Solo la opinión inicial del vendedor'],correct:1,explanation:'El control verificable es: '+c.control},
   {id:'q5',prompt:'¿Qué paso operativo corresponde después del análisis?',options:['Cerrar sin responsable ni fecha','Enviar un descuento idéntico a todos',c.next],correct:2,explanation:'La siguiente acción defendible es: '+c.next}
  ];
  const img=visuals[m.label]||'';
  const resource=sources.map(s=>'<a href="'+escapeHTML(s.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(s.label)+'</a>').join(' · ');
  const html='<section class="academy-applied-practice" aria-label="Caso aplicado y evaluación de decisión"><small>CASO APLICADO · SIMULACIÓN / NO SON DATOS YEPPO</small><h4>'+escapeHTML(c.goal)+'</h4><p><strong>Contexto:</strong> '+escapeHTML(c.scenario)+'</p><p><strong>Ejercicio:</strong> '+escapeHTML(c.task)+'</p><p><strong>Prueba de criterio:</strong> '+escapeHTML(c.evidence)+'</p><p><strong>Riesgo a evitar:</strong> '+escapeHTML(c.risk)+'</p><label class="academy-case-input">Redacta una respuesta antes de consultar la pauta<textarea rows="4" maxlength="2500" placeholder="Propón una decisión, evidencia, control y responsable. No se guarda automáticamente."></textarea></label><p class="academy-case-hint" role="status" aria-live="polite">Escribe al menos 20 caracteres antes de consultar la resolución.</p><details class="academy-case-answer"><summary>Consultar resolución razonada</summary><p>'+escapeHTML(c.solution)+'</p><p><strong>Control:</strong> '+escapeHTML(c.control)+'</p><p><strong>Siguiente acción:</strong> '+escapeHTML(c.next)+'</p><p><strong>Alcance:</strong> '+escapeHTML(c.limit||'Ejercicio hipotético: la operación, precio y normativa se validan con datos actuales antes de actuar.')+'</p></details></section>'+img+(resource?'<p class="source-course"><strong>Fuentes para ampliar y verificar:</strong> '+resource+'. Los ejemplos no son procedimientos autorizados de una tienda en particular.</p>':'');
  return {...m,html:m.html+html,assessment:{version:2,passPercent:80,questions}};
 })};
