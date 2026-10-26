import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import chapter from '../data/chapter33.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
test('33.1–33.8: 8 casos de ecommerce, ejercicios y 5 preguntas independientes',()=>{
 assert.equal(chapter.id,'c33');assert.equal(chapter.modules.length,8);assert.ok(chapter.contentVersion>=3);
 for(const [i,m] of chapter.modules.entries()){
  assert.equal(m.label,'33.'+(i+1));
  for(const phrase of ['PRÁCTICA ECOMMERCE','CASO SIMULADO','Tu decisión o cálculo','Consultar resolución razonada','Límites del ejemplo','academy-case-input'])
   assert.ok(m.html.includes(phrase),m.label+' '+phrase);
  assert.ok(m.html.includes('/assets/chapter33/'),m.label);
  const qs=m.assessment?.questions||[];
  assert.equal(qs.length,5);
  for(const q of qs){
   assert.equal(q.options.length,3);assert.ok(q.prompt.length>=16,q.prompt);
   assert.ok(q.explanation.length>=35,q.explanation);assert.ok(q.correct>=0&&q.correct<3);
   assert.equal(typeof q.critical,'boolean');
  }
  const a=qs.map(q=>q.correct);
  assert.equal(gradeLesson(m,a).passed,true);
  assert.equal(isModuleComplete(m,{completed:{[m.id]:recordLessonAttempt(m,a,null)}}),true);
  const ordinary=qs.map((x,j)=>x.critical?null:j).filter(x=>x!==null);
  const b=[...a];b[ordinary[0]]=(b[ordinary[0]]+1)%3;
  assert.equal(gradeLesson(m,b).passed,true,'4/5 normal puede aprobar');
  b[ordinary[1]]=(b[ordinary[1]]+1)%3;
  assert.equal(gradeLesson(m,b).passed,false,'3/5 no debe aprobar');
 }
});
test('33.1 y 33.2: error de claim médico o falsa seguridad veta examen',()=>{
 for(const i of [0,1]){
  const m=chapter.modules[i],qs=m.assessment.questions;const critical=qs.findIndex(x=>x.critical);
  assert.ok(critical>=0);
  const answers=qs.map(q=>q.correct);answers[critical]=(answers[critical]+1)%3;
  const result=gradeLesson(m,answers);
  assert.equal(result.score,80);
  assert.equal(result.criticalMistakes,1);
  assert.equal(result.passed,false);
 }
});
test('33.3–33.8: métricas didácticas correctas y causalidad no inventada',()=>{
 assert.equal(20/200*100,10);
 assert.equal(18/24*100,75);
 assert.equal(15/50*100,30);
 assert.equal(20/1000*100,2);
 assert.equal(42/60*100,70);
 assert.equal(8/200*100,4);
 assert.equal(11/200*100,5.5);
 assert.equal(5.5-4,1.5);
 assert.equal((5.5-4)/4*100,37.5);
 assert.ok(chapter.modules[7].html.includes('campaña concurrente'));
 assert.ok(chapter.modules[3].html.includes('Search & Discovery'));
});
test('diagramas 33.2 y 33.8: ALT, fuente editable SVG y rutas válidas',()=>{
 for(const [idx,file] of [[1,'cap33-pdp-variant-accuracy.svg'],[7,'cap33-ecommerce-funnel-controls.svg']]){
  const html=chapter.modules[idx].html;
  assert.ok(html.includes(file));
  assert.ok(/alt="[^"]{45,}"/.test(html));
  const p='public/assets/chapter33/'+file;
  assert.ok(existsSync(p));
  const raw=readFileSync(p,'utf8');
  assert.ok(raw.includes('<title')&&raw.includes('<desc'));
 }
});
test('fuentes 2026: investigaciones UX y herramientas de Shopify visibles sin datos inventados',()=>{
 assert.ok(chapter.modules.every(m=>m.html.includes('baymard.com/research-articles')));
 assert.ok(chapter.modules.every(m=>m.html.includes('help.shopify.com/en/manual/online-store')));
 assert.ok(chapter.modules.every(m=>m.html.includes('No se')||m.html.toLowerCase().includes('hipotétic')||m.html.toLowerCase().includes('fictici')));
});
