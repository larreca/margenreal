import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gradeLesson,isModuleComplete,recordLessonAttempt} from '../lib/lesson-assessment.js';
const source=JSON.parse(readFileSync(new URL('../data/new-chapters.json',import.meta.url),'utf8'));
const chapters=[8,9].map(n=>source.find(c=>c.n===n));
test('capítulos 8 y 9: 16 lecciones requieren evaluación individual antes de completarse',()=>{
 assert.equal(chapters.length,2);
 for(const ch of chapters){
  assert.ok(ch&&ch.contentVersion>=6);
  assert.equal(ch.modules.length,8);
  for(const [i,m] of ch.modules.entries()){
   assert.equal(m.label,ch.n+'.'+(i+1));
   assert.ok(m.html.includes('PRÁCTICA DE SEGURIDAD'));
   assert.ok(m.html.includes('Consultar resolución razonada'));
   assert.ok(m.html.includes('ispch.cl'));
   assert.equal(m.assessment.passPercent,80);
   const q=m.assessment.questions;
   assert.equal(q.length,5);
   assert.equal(q.filter(a=>a.critical).length,2);
   for(const item of q){assert.equal(item.options.length,3);assert.ok(item.explanation.length>=40);}
   const a=q.map(item=>item.correct);
   assert.equal(gradeLesson(m,a).passed,true);
   assert.equal(isModuleComplete(m,{completed:{[m.id]:recordLessonAttempt(m,a,null)}}),true);
   const unsafe=[...a];unsafe[0]=(unsafe[0]+1)%3;
   assert.equal(gradeLesson(m,unsafe).score,80);
   assert.equal(gradeLesson(m,unsafe).passed,false,'critical error '+m.label);
   const ordinary=[...a];ordinary[1]=(ordinary[1]+1)%3;
   assert.equal(gradeLesson(m,ordinary).passed,true);
  }
 }
});
test('situaciones graves de 9.2 y 9.4 no se convierten en claims o tratamiento de tienda',()=>{
 for(const label of ['9.2','9.4']){
  const m=chapters[1].modules.find(m=>m.label===label);
  assert.ok(/urgenci|evaluación|derivar/.test(m.html));
  assert.ok(/sin diagnóstico|sin diagnosticar|no.*diagnostic/i.test(m.html));
 }
});
