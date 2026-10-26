import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import chapter from '../data/chapter13.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
test('13.1–13.8: preservan los ocho módulos y añaden casos específicos',()=>{
 assert.equal(chapter.id,'c13');
 assert.equal(chapter.modules.length,8);
 assert.ok(chapter.contentVersion>=3);
 for(const [i,module] of chapter.modules.entries()){
  assert.equal(module.label,'13.'+(i+1));
  assert.ok(module.html.includes('APLICACIÓN GUIADA'));
  assert.ok(module.html.includes('Tu decisión:'));
  assert.ok(module.html.includes('Consultar resolución razonada'));
  assert.ok(module.html.includes('Tu respuesta no se guarda automáticamente'));
  assert.ok(module.html.includes('academy-case-input'));
  assert.ok(module.html.includes('Fuente')||module.html.includes('Fuentes'));
  assert.equal(module.assessment.questions.length,3);
  for(const question of module.assessment.questions) {
   assert.equal(question.options.length,3);
   assert.equal(typeof question.critical,'boolean');
   assert.ok(question.explanation.length>=55);
  }
  const answers=module.assessment.questions.map(q=>q.correct);
  assert.equal(gradeLesson(module,answers).passed,true);
  let wrong=[...answers];wrong[1]=(wrong[1]+1)%3;
  assert.equal(gradeLesson(module,wrong).passed,false);
  assert.equal(isModuleComplete(module,{completed:{[module.id]:recordLessonAttempt(module,answers,null)}}),true);
 }
});
test('Capítulo 13 contiene visuales locales y texto alternativo útil',()=>{
 let imgs=chapter.modules.flatMap(x=>[...x.html.matchAll(/<img\b[^>]*>/g)].map(m=>m[0]));
 assert.ok(imgs.length>=2);
 for(const tag of imgs){
  const path=tag.match(/src="([^"]+)"/)?.[1];
  assert.ok(path?.startsWith('/assets/chapter13/'),path);
  assert.ok(existsSync(resolve('public'+path)),path);
  assert.ok(/alt="[^"]{25,}"/.test(tag),tag);
 }
});
test('Errores críticos del capítulo 13 impiden aprobar aunque otros ítems sean correctos',()=>{
 let criticalCount=0;
 for(const m of chapter.modules){
  const questions=m.assessment.questions, idx=questions.findIndex(q=>q.critical);
  if(idx<0)continue;
  criticalCount++;
  const a=questions.map(q=>q.correct);
  a[idx]=(a[idx]+1)%3;
  const result=gradeLesson(m,a);
  assert.equal(result.criticalMistakes,1);
  assert.equal(result.passed,false);
 }
 assert.ok(criticalCount>=3);
});
test('La interfaz exige respuesta propia antes de mostrar la pauta de caso',()=>{
 const source=readFileSync(resolve('components/ChapterReader.js'),'utf8');
 assert.ok(source.includes('.academy-case-input textarea'));
 assert.ok(source.includes('input.value.trim().length>=20'));
 assert.ok(source.includes('event.preventDefault()'));
});
