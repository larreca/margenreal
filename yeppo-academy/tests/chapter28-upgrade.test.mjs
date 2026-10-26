import test from 'node:test';
import assert from 'node:assert/strict';
import chapter from '../data/chapter28.js';
import {readFileSync,existsSync} from 'node:fs';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
test('28.1–28.8: cada módulo ofrece caso comercial resuelto y 5 preguntas independientes',()=>{
 assert.equal(chapter.id,'c28');assert.equal(chapter.modules.length,8);assert.ok(chapter.contentVersion>=3);
 for(let i=0;i<8;i++){
  const m=chapter.modules[i];
  assert.equal(m.label,'28.'+(i+1));
  for(const phrase of ['EJERCICIO APLICADO','CIFRAS SIMULADAS','Tu decisión y cálculo','Consultar resolución razonada','Límite del ejemplo','academy-case-input'])assert.ok(m.html.includes(phrase),m.label+': '+phrase);
  assert.equal(m.assessment.questions.length,5);
  for(const q of m.assessment.questions){
   assert.equal(q.options.length,3);assert.ok(q.prompt.length>25);assert.ok(q.explanation.length>=65);assert.ok(q.correct>=0&&q.correct<3);
  }
  const correct=m.assessment.questions.map(q=>q.correct);
  assert.equal(gradeLesson(m,correct).passed,true);
  const oneWrong=[...correct];oneWrong[0]=(oneWrong[0]+1)%3;assert.equal(gradeLesson(m,oneWrong).passed,true,'4/5 cumple 80%');
  const twoWrong=[...oneWrong];twoWrong[1]=(twoWrong[1]+1)%3;assert.equal(gradeLesson(m,twoWrong).passed,false,'3/5 no cumple 80%');
  const record=recordLessonAttempt(m,correct,null);assert.equal(isModuleComplete(m,{completed:{[m.id]:record}}),true);
 }
});
test('28.3 y 28.5: matemáticas didácticas coherentes y ejemplos bien identificados',()=>{
 assert.equal(900000/600000,1.5);assert.equal(700000/250000,2.8);
 assert.equal(7560/120,63);assert.equal(7560/40,189);
 assert.ok(chapter.modules[4].html.includes('01-10-2026'));
 assert.ok(chapter.modules[4].html.includes('son supuestos, NO datos de Yeppo'));
});
test('capítulo 28 conserva sus recursos visuales y contenido original mientras se auditan',()=>{
 const m=chapter.modules[0];
 assert.ok(m.html.includes('/assets/chapter28/cap28-28.1-breadth-depth.svg'));
 assert.ok(m.html.includes('Oracle Retail'));
 const ui=readFileSync('components/ChapterReader.js','utf8');
 assert.ok(ui.includes('.academy-case-input textarea'));
});

test('28.4 y 28.5 tienen infografías temáticas accesibles e instaladas',()=>{
 for(const [i,file] of [[3,'cap28-mission-decision.svg'],[4,'cap28-stock-versus-demand.svg']]){
  const html=chapter.modules[i].html;
  assert.ok(html.includes('/assets/chapter28/'+file));
  assert.ok(/alt="[^"]{50,}"/.test(html));
  assert.ok(existsSync('public/assets/chapter28/'+file));
  const svg=readFileSync('public/assets/chapter28/'+file,'utf8');
  assert.ok(svg.includes('<title')&&svg.includes('<desc'));
  assert.ok(svg.includes('1280')&&svg.includes('800')||svg.includes('810'));
 }
});
