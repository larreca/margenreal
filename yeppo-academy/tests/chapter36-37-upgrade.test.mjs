import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import c36 from '../data/chapter36.js';
import c37 from '../data/chapter37.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';

for(const chapter of [c36,c37]){
 test('capítulo '+chapter.n+': ocho experiencias, 40 preguntas y fuente primaria por lección',()=>{
  assert.equal(chapter.id,'c'+chapter.n);
  assert.equal(chapter.modules.length,8);
  assert.ok(chapter.contentVersion>=3);
  const ids=new Set();
  for(const [i,m] of chapter.modules.entries()){
   assert.equal(m.label,chapter.n+'.'+(i+1));
   assert.ok(!ids.has(m.id));ids.add(m.id);
   for(const piece of ['academy-applied-practice','CASO SIMULADO','academy-case-input','Consultar resolución razonada','source-course']){
    assert.ok(m.html.includes(piece),m.label+' missing '+piece);
   }
   assert.ok(m.html.includes('/assets/chapter'+chapter.n+'/'),m.label+' missing figure');
   const q=m.assessment?.questions||[];
   assert.equal(q.length,5,m.label);
   assert.equal(m.assessment.passPercent,80);
   assert.equal(new Set(q.map(x=>x.id)).size,5);
   for(const item of q){
    assert.equal(item.options.length,3);
    assert.ok(item.prompt.length>=18,item.prompt);
    assert.ok(item.explanation.length>=35,item.explanation);
    assert.ok(Number.isInteger(item.correct)&&item.correct>=0&&item.correct<3);
    assert.equal(typeof item.critical,'boolean');
   }
   const correct=q.map(x=>x.correct);
   assert.equal(gradeLesson(m,correct).passed,true,m.label+' all correct');
   const entry=recordLessonAttempt(m,correct,null);
   assert.equal(isModuleComplete(m,{completed:{[m.id]:entry}}),true);
   const regular=q.map((x,j)=>x.critical?null:j).filter(x=>x!==null);
   assert.ok(regular.length>=2);
   const a=[...correct];a[regular[0]]=(a[regular[0]]+1)%3;
   assert.equal(gradeLesson(m,a).passed,true,m.label+' 80% pass');
   a[regular[1]]=(a[regular[1]]+1)%3;
   assert.equal(gradeLesson(m,a).passed,false,m.label+' 60% fail');
  }
 });
}
for(const [chapter,index,label] of [[c36,2,'36.3'],[c36,4,'36.5'],[c36,5,'36.6'],[c37,0,'37.1'],[c37,2,'37.3'],[c37,3,'37.4'],[c37,6,'37.7']]){
 test(label+': error crítico veta incluso cuatro de cinco respuestas correctas',()=>{
  const m=chapter.modules[index],q=m.assessment.questions,critical=q.map((x,i)=>x.critical?i:null).filter(i=>i!==null);
  assert.ok(critical.length>=1);
  for(const i of critical){
   const answers=q.map(x=>x.correct);answers[i]=(answers[i]+1)%3;
   const r=gradeLesson(m,answers);
   assert.equal(r.score,80);
   assert.equal(r.criticalMistakes,1);
   assert.equal(r.passed,false);
  }
 });
}
test('recorridos y seguimiento: cálculos y denominadores reproducibles',()=>{
 assert.equal((38+42+40)/3,40);
 assert.equal(20/100*100,20);
 assert.equal(8/40*100,20);
 assert.equal(10/50*100,20);
 assert.equal((42+48+45)/3,45);
 assert.equal(24/2,12);
 assert.equal(10/100*100,10);
 assert.equal(30/40*100,75);
 assert.ok(c36.modules[7].html.includes('Búsqueda sin éxito=20 %'));
 assert.ok(c37.modules[5].html.includes('Cobertura reportada =24/2=12 días'));
});
test('SERNAC y Klaviyo: fuentes visibles, y mensajería separada de marketing',()=>{
 assert.ok(c36.modules[4].html.includes('Klaviyo'));
 assert.ok(c36.modules[4].html.includes('No se mezcla')||c36.modules[4].html.includes('Separar mensajes comerciales'));
 assert.ok(c36.modules[3].html.includes('sernac.cl'));
 assert.ok(c37.modules[0].html.includes('Klaviyo'));
 assert.ok(c37.modules[6].html.includes('sernac.cl'));
 assert.ok(c37.modules[6].html.includes('frenar promociones'));
});
test('cuatro diagramas: existen y contienen título, descripción y alt',()=>{
 for(const [chap,index,file] of [
  [c36,0,'cap36-customer-journey-feedback.svg'],
  [c36,4,'cap36-postpurchase-message-order.svg'],
  [c37,2,'cap37-signal-triage.svg'],
  [c37,5,'cap37-b2b-repurchase-signal.svg']
 ]){
  const f='public/assets/chapter'+chap.n+'/'+file;
  assert.ok(existsSync(f),f);
  const raw=readFileSync(f,'utf8');
  assert.ok(raw.includes('<title')&&raw.includes('<desc')&&raw.includes('viewBox="0 0 1280'));
  const html=chap.modules[index].html;
  assert.ok(html.includes(file));
  assert.ok(/alt="[^"]{50,}"/.test(html));
 }
});
