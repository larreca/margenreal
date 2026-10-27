import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import chapter from '../data/chapter31.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
test('31.1–31.8: ocho lecciones de promociones con caso y preguntas específicas',()=>{
 assert.equal(chapter.id,'c31');assert.equal(chapter.modules.length,8);assert.ok(chapter.contentVersion>=3);
 for(const [i,m] of chapter.modules.entries()){
  assert.equal(m.label,'31.'+(i+1));
  for(const str of ['PRÁCTICA GUIADA','SIMULACIÓN COMERCIAL','Tu decisión','Consultar resolución razonada','Límite del caso','academy-case-input'])assert.ok(m.html.includes(str),m.label+' '+str);
  assert.equal(m.assessment.questions.length,5);
  for(const q of m.assessment.questions){assert.ok(q.prompt.length>=15);assert.ok(q.explanation.length>=35);assert.equal(q.options.length,3);}
  const all=m.assessment.questions.map(q=>q.correct);
  assert.equal(gradeLesson(m,all).passed,true);
  const wrong=[...all];wrong[0]=(wrong[0]+1)%3;
  assert.equal(gradeLesson(m,wrong).passed,true,'4/5 cumple mínimo de 80%');
  wrong[1]=(wrong[1]+1)%3;
  assert.equal(gradeLesson(m,wrong).passed,false,'3/5 es insuficiente');
  assert.equal(isModuleComplete(m,{completed:{[m.id]:recordLessonAttempt(m,all,null)}}),true);
 }
});
test('promociones: casos calculados y hechos históricos separados',()=>{
 assert.equal(100*7000,700000);assert.equal(120*5500,660000);
 assert.equal(27000-12000,15000);assert.equal((30000-27000)/30000*100,10);
 assert.equal(47000+6000,53000);
 assert.equal(Math.ceil(100*10000/6000),167);
 assert.ok(chapter.modules[7].html.includes('Escenario didáctico · campaña multicanal Yeppo'));
 assert.ok(!chapter.modules[7].html.includes('Caso interno · Cyber octubre 2026'));
 assert.ok(chapter.modules[7].html.includes('SIMULACIÓN COMERCIAL'));
});
test('visuales de decisión mantienen alternativas de escritorio y móvil',()=>{
 for(const m of chapter.modules){
  assert.match(m.html,/<picture><source media="\(max-width: 640px\)"/);
  for(const file of [...m.html.matchAll(/\/assets\/chapter31\/([\w.-]+\.svg)/g)].map(x=>x[1]))
   assert.ok(fs.existsSync(path.join('public/assets/chapter31',file)),`${m.label}: ${file}`);
 }
});
test('condiciones al cliente y stock prometible son errores críticos',()=>{
 for(const label of ['31.5','31.8']){
  const m=chapter.modules.find(x=>x.label===label),answers=m.assessment.questions.map(q=>q.correct);
  assert.equal(m.assessment.questions[4].critical,true);
  answers[4]=(answers[4]+1)%3;
  assert.equal(gradeLesson(m,answers).passed,false);
 }
});
