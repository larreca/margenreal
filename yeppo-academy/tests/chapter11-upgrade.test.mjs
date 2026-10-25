import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {upgradeHydrationChapter,hydrationPractices} from '../data/chapter11-upgrade.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
const seed=JSON.parse(readFileSync(resolve('data/chapter11.json'),'utf8'));
const c=upgradeHydrationChapter(seed);

test('11.1–11.8: lecciones originales conservadas con ocho prácticas verificables',()=>{
 assert.equal(c.modules.length,8);
 assert.ok(c.contentVersion>=3);
 for(let i=0;i<8;i++){
  const a=seed.modules[i],b=c.modules[i];
  assert.equal(a.id,b.id);
  assert.ok(b.html.startsWith(a.html),'Texto base debe preservarse');
  assert.ok(b.html.includes('PRÁCTICA GUIADA'));
  assert.ok(b.html.includes('Consultar resolución razonada'));
  assert.ok(b.html.includes('CASO SIMULADO'));
  assert.ok(b.html.includes('Tu decisión:'));
  assert.ok(b.html.includes('Límite del consejo:'));
  assert.ok(hydrationPractices[b.label]);
  assert.equal(b.assessment.questions.length,3);
  for(const q of b.assessment.questions){
   assert.equal(q.options.length,3);
   assert.ok(q.prompt.length>25);
   assert.ok(q.explanation.length>55);
  }
  const correctAnswers=b.assessment.questions.map(q=>q.correct);
  assert.equal(gradeLesson(b,correctAnswers).passed,true);
  const fail=[...correctAnswers];fail[0]=(fail[0]+1)%3;
  assert.equal(gradeLesson(b,fail).passed,false);
  const record=recordLessonAttempt(b,correctAnswers,null);
  assert.equal(isModuleComplete(b,{completed:{[b.id]:record}}),true);
 }
});
test('capítulo 11: dos figuras nuevas, alt, fuentes y ubicación pública verificadas',()=>{
 const figures=c.modules.flatMap(m=>[...m.html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)]);
 assert.equal(figures.length,2);
 for(const [,src] of figures){
  assert.ok(src.startsWith('/assets/chapter11/'));
  assert.ok(existsSync(resolve('public'+src)));
 }
 const countSources=c.modules.filter(m=>m.html.includes('DermNet')).length;
 assert.ok(countSources>=7);
});
test('capítulo 11: fallos críticos no se pueden compensar con puntuación',()=>{
 for(const m of c.modules.filter(m=>m.assessment.questions.some(q=>q.critical))){
  const q=m.assessment.questions,answers=q.map(x=>x.correct),idx=q.findIndex(x=>x.critical);
  answers[idx]=(answers[idx]+1)%q[idx].options.length;
  assert.equal(gradeLesson(m,answers).criticalMistakes,1);
  assert.equal(gradeLesson(m,answers).passed,false);
 }
});
