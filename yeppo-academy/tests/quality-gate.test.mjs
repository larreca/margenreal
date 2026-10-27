import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateQuality,WEIGHTS} from '../lib/quality-gate.js';
const sample=()=>({
 moduleId:'11.1',
 hasCriticalQuestions:true,
 scores:{depth:8,clarity:8,visuals:8,application:8,assessment:8,sources:8},
 evidence:{
  contentReview:'Se verificaron los conceptos, su secuencia y una explicación completa.',
  contextAndLimitations:'Es asesoría cosmética y no demuestra tratamiento de enfermedades.',
  exercise:{passed:true,solution:'El alumno justifica la selección de textura y compara la fórmula completa.'},
  assessment:{passed:true,wrongAnswerRejected:true,criticalErrorRejected:true,proof:'artifact:assessment-11-1'},
  views:[360,390,768,1280].map(width=>({width,checked:true,proof:'artifact:viewport-'+width})),
  zoom200:{checked:true,proof:'artifact:zoom-200'},
  images:{verified:true,creditsChecked:true,proof:'artifact:asset-check'},
  sources:[{url:'https://dermnetnz.org/topics/emollients-and-moisturisers',claim:'Se revisan humectantes, emolientes y oclusivos en la fuente.',limit:'No demuestra efectos de ninguna crema comercial concreta.',checkedAt:'2026-10-25'}],
  separateReaudit:{completed:true,proof:'artifact:separate-review'}
 },blockers:[]
});
test('la rúbrica mantiene exactamente los pesos del protocolo',()=>{
 assert.deepEqual(WEIGHTS,{depth:.3,clarity:.1,visuals:.2,application:.15,assessment:.15,sources:.1});
});
test('8,0 exacto con toda evidencia completa es elegible',()=>{
 const r=evaluateQuality(sample()); assert.equal(r.approved,true);assert.ok(Math.abs(r.weighted-8)<1e-9);assert.equal(r.status,'aprobado');
});
test('7,999 no aprueba y no se redondea',()=>{
 const m=sample();m.scores.sources=7.99;
 const r=evaluateQuality(m);assert.ok(r.weighted<8 && Math.abs(r.weighted-7.999)<1e-9);assert.equal(r.approved,false);
});
test('nota general alta no compensa visuales 7,9 o profundidad 7,9',()=>{
 for(const k of ['depth','visuals']){
  const m=sample();m.scores[k]=7.9;
  for(const other of Object.keys(m.scores))if(other!==k)m.scores[other]=10;
  assert.equal(evaluateQuality(m).approved,false);
 }
});
test('no inventar notas cuando faltan las seis dimensiones',()=>{
 const m=sample();delete m.scores.application;const r=evaluateQuality(m);
 assert.equal(r.weighted,null);assert.equal(r.status,'pendiente de verificación');assert.equal(r.approved,false);
});
test('sin evidencia móvil, fuentes o reauditoría NO se aprueba aunque seis notas sean 10',()=>{
 for(const missing of ['views','sources','separateReaudit']){
  const m=sample();Object.values(m.scores).forEach(()=>{});for(const k of Object.keys(m.scores))m.scores[k]=10;
  delete m.evidence[missing];assert.equal(evaluateQuality(m).approved,false);
 }
});
test('error crítico y bloqueo impiden el aprobado',()=>{
 const m=sample();m.evidence.assessment.criticalErrorRejected=false;
 assert.equal(evaluateQuality(m).approved,false);
 m.evidence.assessment.criticalErrorRejected=true;m.blockers=['imagen engañosa'];const r=evaluateQuality(m);
 assert.equal(r.approved,false);assert.equal(r.status,'bloqueado');
});
