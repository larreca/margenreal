import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
const chapters=JSON.parse(readFileSync(new URL('../data/new-chapters.json',import.meta.url),'utf8'));
const c10=chapters.find(c=>c.n===10);
test('10.1–10.8: etiquetas, fórmula, INCI y verificación con 5 preguntas por módulo',()=>{
 assert.equal(c10.modules.length,8);assert.ok(c10.contentVersion>=6);
 for(const [i,m] of c10.modules.entries()){
  assert.equal(m.label,'10.'+(i+1));
  assert.ok(m.html.includes('LABORATORIO INCI'));
  assert.ok(m.html.includes('Consultar resolución razonada'));
  assert.ok(m.html.includes('nuevo.leychile.cl'));
  assert.ok(m.html.includes('ec.europa.eu'));
  const qs=m.assessment.questions;assert.equal(qs.length,5);
  assert.equal(m.assessment.passPercent,80);
  for(const q of qs){assert.equal(q.options.length,3);assert.ok(q.explanation.length>=36);}
  const ans=qs.map(q=>q.correct);
  assert.equal(gradeLesson(m,ans).passed,true);
  assert.equal(isModuleComplete(m,{completed:{[m.id]:recordLessonAttempt(m,ans,null)}}),true);
  const bad=[...ans];bad[1]=(bad[1]+1)%3;assert.equal(gradeLesson(m,bad).passed,true);
  bad[3]=(bad[3]+1)%3;assert.equal(gradeLesson(m,bad).passed,false);
  if(i>=3){
   const critical=[...ans];critical[0]=(critical[0]+1)%3;
   assert.equal(gradeLesson(m,critical).score,80);
   assert.equal(gradeLesson(m,critical).passed,false);
  }
 }
});
