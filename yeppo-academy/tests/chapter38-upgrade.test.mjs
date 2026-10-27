import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import chapter from '../data/chapter38.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
test('38.1–38.8: casos CRM, cinco preguntas independientes y soluciones aplicadas',()=>{
 assert.equal(chapter.id,'c38');assert.equal(chapter.modules.length,8);assert.ok(chapter.contentVersion>=3);
 for(const [i,m] of chapter.modules.entries()){
  assert.equal(m.label,'38.'+(i+1));for(const str of ['PRÁCTICA CRM','CASO SIMULADO','academy-case-input','Consultar resolución razonada','source-course','Limitación del ejemplo'])
   assert.ok(m.html.includes(str),m.label+' '+str);
  assert.ok(m.html.includes('/assets/chapter38/'));
  const q=m.assessment?.questions||[];
  assert.equal(q.length,5,m.label);assert.equal(m.assessment.passPercent,80);
  assert.equal(new Set(q.map(x=>x.id)).size,5);
  for(const item of q){
   assert.equal(item.options.length,3);
   assert.ok(item.prompt.length>=18,item.prompt);
   assert.ok(item.explanation.length>=35,item.explanation);
   assert.ok(Number.isInteger(item.correct)&&item.correct>=0&&item.correct<3);
   assert.equal(typeof item.critical,'boolean');
  }
  const correct=q.map(x=>x.correct);
  assert.equal(gradeLesson(m,correct).passed,true);
  assert.equal(isModuleComplete(m,{completed:{[m.id]:recordLessonAttempt(m,correct,null)}}),true);
  const ordinary=q.map((x,index)=>x.critical?null:index).filter(x=>x!==null);
  assert.ok(ordinary.length>=2);
  const a=[...correct];a[ordinary[0]]=(a[ordinary[0]]+1)%3;
  assert.equal(gradeLesson(m,a).passed,true);
  a[ordinary[1]]=(a[ordinary[1]]+1)%3;
  assert.equal(gradeLesson(m,a).passed,false);
 }
});
for(const i of [1,3,6,7]){
 test('38.'+(i+1)+': errores críticos de privacidad o legalidad vetan examen',()=>{
  const m=chapter.modules[i],q=m.assessment.questions;
  const indices=q.map((x,index)=>x.critical?index:null).filter(x=>x!==null);
  assert.ok(indices.length>=1);
  for(const idx of indices){
   const answers=q.map(x=>x.correct);answers[idx]=(answers[idx]+1)%3;
   const result=gradeLesson(m,answers);
   assert.equal(result.score,80);assert.equal(result.criticalMistakes,1);assert.equal(result.passed,false);
  }
 });
}
test('38.3, 38.4, 38.5 y 38.8: cálculos consistentes',()=>{
 assert.equal(1000-80,920);assert.equal(18/24*100,75);
 assert.ok(Math.abs(40/120*100-100/3)<1e-9);
 assert.equal(10/40*100,25);
 assert.equal(150/200*100,75);
 assert.ok(chapter.modules[2].html.includes('920 registros'));
});
test('38.7: vigencia diferida distinguida de propuesta gubernamental',()=>{
 const m=chapter.modules[6];const t=m.html;
 assert.ok(t.includes('1 de diciembre de 2026'));
 assert.ok(t.includes('diciembre de 2027'));
 assert.ok(t.includes('propuesta, no un cambio legal confirmado'));
 assert.ok(t.includes('bcn.cl/leychile'));
 assert.ok(t.includes('economia.gob.cl/2026/09/01'));
});
test('dos diagramas nuevos tienen fuente, alt y descripción estructurada',()=>{
 for(const [index,file] of [[2,'cap38-crm-identity-control.svg'],[6,'cap38-data-law-effective.svg']]){
  const path='public/assets/chapter38/'+file;assert.ok(existsSync(path),path);
  const svg=readFileSync(path,'utf8');assert.ok(svg.includes('<title')&&svg.includes('<desc')&&svg.includes('viewBox="0 0 1280'));
  assert.ok(chapter.modules[index].html.includes(file));
  assert.ok(/alt="[^"]{50,}"/.test(chapter.modules[index].html));
 }
});
