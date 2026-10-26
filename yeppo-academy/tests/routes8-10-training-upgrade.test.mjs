import test from 'node:test';
import assert from 'node:assert/strict';
import {gradeLesson,isModuleComplete,recordLessonAttempt} from '../lib/lesson-assessment.js';
import c41 from '../data/chapter41.js';
import c42 from '../data/chapter42.js';
import c43 from '../data/chapter43.js';
import c44 from '../data/chapter44.js';
import c45 from '../data/chapter45.js';
import c46 from '../data/chapter46.js';
import c47 from '../data/chapter47.js';
import c48 from '../data/chapter48.js';
import c49 from '../data/chapter49.js';
import c50 from '../data/chapter50.js';
const chapters=[c41,c42,c43,c44,c45,c46,c47,c48,c49,c50];
test('Rutas 8–10: 10 capítulos, 80 módulos con 5 preguntas independientes por módulo',()=>{
 assert.equal(chapters.length,10);
 let total=0,crit=0;
 for(const chapter of chapters){
  assert.equal(chapter.modules.length,8);
  assert.ok(chapter.contentVersion>=(chapter.n>=48?7:6));
  for(const [index,m] of chapter.modules.entries()){
   assert.equal(m.label,chapter.n+'.'+(index+1));
   const q=m.assessment?.questions||[];
   assert.equal(q.length,5,m.label);
   assert.equal(new Set(q.map(x=>x.id)).size,5);
   assert.equal(m.assessment.passPercent,80);
   for(const field of ['academy-applied-practice','CASO APLICADO','Prueba de criterio','Riesgo a evitar','Consultar resolución razonada','source-course']){
    assert.ok(m.html.includes(field),m.label+' '+field);
   }
   for(const entry of q){
    assert.equal(entry.options.length,3);
    assert.ok(entry.prompt.length>=23,entry.prompt);
    assert.ok(entry.explanation.length>=55,entry.explanation);
    assert.ok(Number.isInteger(entry.correct)&&entry.correct>=0&&entry.correct<=2);
    assert.equal(typeof entry.critical,'boolean');
   }
   const answers=q.map(x=>x.correct);
   assert.equal(gradeLesson(m,answers).passed,true);
   const v=recordLessonAttempt(m,answers,null);
   assert.equal(isModuleComplete(m,{completed:{[m.id]:v}}),true);
   const bad=[...answers];bad[1]=(bad[1]+1)%3;
   assert.equal(gradeLesson(m,bad).passed,true,'4 of 5 noncritical passes '+m.label);
   bad[3]=(bad[3]+1)%3;
   assert.equal(gradeLesson(m,bad).passed,false,'3 of 5 fails '+m.label);
   if(chapter.n>=45){
    assert.equal(q[0].critical,true,'Safety-gated question '+m.label);
    const criticalAnswer=[...answers];criticalAnswer[0]=(criticalAnswer[0]+1)%3;
    const res=gradeLesson(m,criticalAnswer);
    assert.equal(res.score,80);
    assert.equal(res.criticalMistakes,1);
    assert.equal(res.passed,false,'Critical safety response veto '+m.label);
    crit++;
   }
   total++;
  }
 }
 assert.equal(total,80);
 assert.equal(crit,48);
});
test('41–44: practical purchase and stock mathematics, costs not fabricated as actual Yeppo sales',()=>{
 assert.equal(300000*1.19,357000);
 assert.equal(3*10+8,38);
 assert.equal(4*7+10,38);
 assert.equal(24/60*100,40);
 assert.equal(48/80*100,60);
 assert.equal(60/10,6);
 assert.equal(90/5,18);
 for(const ch of chapters.filter(c=>c.n<=44))
  assert.ok(ch.modules.every(m=>m.html.includes('NO SON DATOS YEPPO')));
});
test('45–47: ISP and cosmetovigilance are referenced across all lessons',()=>{
 for(const chapter of [c45,c46,c47])
  for(const m of chapter.modules){
    assert.ok(m.html.includes('ispch.cl'),m.label);
    assert.ok(m.html.includes('nuevo.leychile.cl'),m.label);
    assert.ok(m.assessment.questions[2].critical,m.label);
  }
});
test('48–50: final simulations cannot certify medical knowledge and critical errors block',()=>{
 for(const ch of [c48,c49,c50])
  for(const m of ch.modules){
    assert.ok(m.html.includes('CASO APLICADO'),m.label);
    assert.ok(m.html.includes('No se guarda automáticamente.'),m.label);
  }
 assert.ok(c50.modules.some(m=>m.html.includes('acreditación')));
});
