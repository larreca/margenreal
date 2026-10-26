import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import chapter29 from '../data/chapter29.js';
import chapter30 from '../data/chapter30.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';

for(const chapter of [chapter29,chapter30]){
 test('capítulo '+chapter.n+': ocho prácticas resueltas y cinco preguntas por módulo',()=>{
  assert.equal(chapter.modules.length,8);
  assert.ok(chapter.contentVersion >= (chapter.n===30?4:3));
  for(const [i,module] of chapter.modules.entries()){
   assert.equal(module.label,chapter.n+'.'+(i+1));
   assert.ok(module.html.includes('academy-applied-practice'));
   assert.ok(module.html.includes('academy-case-input'));
   assert.ok(module.html.includes('Consultar resolución razonada'));
   assert.ok(module.html.includes('Límite'));
   const qs=module.assessment?.questions||[];
   assert.equal(qs.length,5,module.label);
   assert.equal(module.assessment.passPercent,80);
   for(const q of qs){
    assert.ok(q.prompt?.length>=12,q.prompt);
    assert.equal(q.options.length,3);
    assert.ok(q.explanation?.length>=35,q.explanation);
    assert.ok(q.correct>=0 && q.correct<3);
   }
   const correct=qs.map(q=>q.correct);
   assert.equal(gradeLesson(module,correct).passed,true);
   const wrong=[...correct];wrong[0]=(wrong[0]+1)%3;
   assert.equal(gradeLesson(module,wrong).passed,true,'4/5 alcanza umbral 80%');
   wrong[1]=(wrong[1]+1)%3;
   assert.equal(gradeLesson(module,wrong).passed,false,'3/5 NO aprueba');
   assert.equal(isModuleComplete(module,{completed:{[module.id]:recordLessonAttempt(module,correct,null)}}),true);
  }
 });
}
test('29.1: distingue On hand de disponible y enlaza fuente',()=>{
 assert.ok(chapter29.modules[0].html.includes('100 unidades'));
 assert.ok(chapter29.modules[0].html.includes('75 disponibles'));
 assert.ok(chapter29.modules[0].html.includes('help.shopify.com'));
 assert.ok(chapter29.modules[0].html.includes('cap29-stock-available-vs-on-hand.svg'));
 assert.ok(existsSync('public/assets/chapter29/cap29-stock-available-vs-on-hand.svg'));
});
test('30.1–30.8: ejercicios de IVA y margen con bases explícitas',()=>{
 assert.ok(chapter30.modules[0].html.includes('23,1 %'));
 assert.ok(chapter30.modules[2].html.includes('40 %'));
 assert.ok(chapter30.modules[2].html.includes('23.800/1,19'));
 assert.ok(chapter30.modules[0].html.includes('cap30-net-contribution-waterfall.svg'));
 assert.ok(existsSync('public/assets/chapter30/cap30-net-contribution-waterfall.svg'));
 assert.ok(chapter30.modules.every(m=>m.html.includes('sii.cl')));
});
test('recursos educativos incluyen títulos, texto alternativo y descripción',()=>{
 const svgFiles=['public/assets/chapter29/cap29-stock-available-vs-on-hand.svg','public/assets/chapter30/cap30-net-contribution-waterfall.svg'];
 for(const f of svgFiles){
  const s=readFileSync(f,'utf8');
  assert.ok(s.includes('<title')&&s.includes('<desc'));
 }
});
test('29, 30 cálculos principales reproducibles con datos ficticios',()=>{
 assert.equal(4*15+20,80);assert.equal(30/3,10);
 assert.equal(70/100*100,70);assert.equal(5/3>1.6&&5/3<1.7,true);
 assert.equal(11900/1.19,10000);assert.equal(10000-6000-1190-500,2310);
 assert.equal((16000-10000-1904)/16000*100,25.6);
 assert.equal(600000/300000,2);
});
