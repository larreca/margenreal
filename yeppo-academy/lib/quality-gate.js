// Rúbrica aprobada el 25/10/2026. No infiere calidad desde cantidad de texto o imágenes.
export const WEIGHTS=Object.freeze({depth:.30,clarity:.10,visuals:.20,application:.15,assessment:.15,sources:.10});
export const REVIEW_THRESHOLDS=Object.freeze({weighted:8,depth:8,visuals:8,other:7});
const hasEvidence=(x)=>typeof x==='string'&&x.trim().length>=15;
const evidenceURL=(x)=>typeof x==='string'&&(/^(https:\/\/|file:|artifact:|github:)/.test(x));
export function evaluateQuality(review={}){
 const scores=review.scores||{},issues=[];
 const values={};let complete=true;
 for(const k of Object.keys(WEIGHTS)){
  const n=scores[k];
  if(typeof n!=='number'||!Number.isFinite(n)||n<0||n>10){
   issues.push('Nota faltante o inválida en '+k);complete=false;
  }else values[k]=n;
 }
 const score=complete?Object.entries(WEIGHTS).reduce((n,[k,w])=>n+values[k]*w,0):null;
 if(score!==null&&score<8)issues.push('Nota ponderada inferior a 8,0 sin redondear');
 for(const k of ['depth','visuals'])if(k in values&&values[k]<8)issues.push(k+': dimensión crítica inferior a 8');
 for(const k of ['clarity','application','assessment','sources'])if(k in values&&values[k]<7)issues.push(k+': dimensión inferior a 7');
 const ev=review.evidence||{},run=ev.exercise||{},assessment=ev.assessment||{},image=ev.images||{};
 if(!hasEvidence(ev.contentReview))issues.push('Falta revisión sustantiva del contenido');
 if(!hasEvidence(ev.contextAndLimitations))issues.push('Faltan límites y contexto de la recomendación');
 if(!run.passed||!hasEvidence(run.solution))issues.push('Falta solución de la práctica comprobada');
 if(!assessment.passed||!assessment.wrongAnswerRejected||!evidenceURL(assessment.proof))issues.push('Falta prueba funcional de evaluación y rechazo de errores');
 if(review.hasCriticalQuestions&&assessment.criticalErrorRejected!==true)issues.push('Falta prueba de veto crítico');
 for(const width of [360,390,768,1280]){
  const check=(ev.views||[]).find(v=>v.width===width);
  if(!check?.checked||!evidenceURL(check.proof))issues.push('Falta comprobación visual a '+width+'px');
 }
 if(!ev.zoom200?.checked||!evidenceURL(ev.zoom200.proof))issues.push('Falta inspección al 200%');
 if(!image.verified||!image.creditsChecked||!evidenceURL(image.proof))issues.push('Falta verificación de visuales activos y procedencia');
 if(!Array.isArray(ev.sources)||ev.sources.length<1||ev.sources.some(s=>!evidenceURL(s.url)||!hasEvidence(s.claim)||!hasEvidence(s.limit)||!(/^\d{4}-\d\d-\d\d$/.test(s.checkedAt||''))))issues.push('Fuentes insuficientes o no trazables');
 if(!ev.separateReaudit?.completed||!evidenceURL(ev.separateReaudit.proof))issues.push('Falta reauditoría separada de la edición');
 const blockers=Array.isArray(review.blockers)?review.blockers.filter(Boolean):[];
 if(blockers.length)issues.push('Bloqueos críticos: '+blockers.join('; '));
 const approved=complete&&issues.length===0;
 const status=approved?'aprobado':blockers.length?'bloqueado':complete?'en corrección':'pendiente de verificación';
 return {id:review.moduleId||null,weighted:score,approved,status,issues};
}
