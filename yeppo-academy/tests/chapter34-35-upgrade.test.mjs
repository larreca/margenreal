import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import chapter34 from '../data/chapter34.js';
import chapter35 from '../data/chapter35.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
for(const chapter of [chapter34,chapter35]){
 test('capítulo '+chapter.n+': ocho casos con cinco preguntas, resolución y fuentes',()=>{
  assert.equal(chapter.modules.length,8);assert.ok(chapter.contentVersion>=3);
  const ids=new Set();
  for(const [i,m] of chapter.modules.entries()){
   assert.equal(m.label,chapter.n+'.'+(i+1));assert.ok(m.html.includes('academy-applied-practice'));
   assert.ok(m.html.includes('CASO SIMULADO'));
   assert.ok(m.html.includes('academy-case-input'));
   assert.ok(m.html.includes('Consultar resolución razonada'));
   assert.ok(m.html.includes('source-course'));
   assert.ok(m.html.includes('/assets/chapter'+chapter.n+'/'));
   const q=m.assessment.questions;assert.equal(q.length,5);assert.equal(m.assessment.passPercent,80);
   for(const question of q){
    assert.equal(question.options.length,3);
    assert.ok(question.prompt.length>=17,question.prompt);
    assert.ok(question.explanation.length>=35,question.explanation);
    assert.ok(Number.isInteger(question.correct)&&question.correct>=0&&question.correct<3);
    assert.equal(typeof question.critical,'boolean');
   }
   assert.equal(new Set(q.map(x=>x.id)).size,5);
   assert.ok(!ids.has(m.id));ids.add(m.id);
   const answers=q.map(x=>x.correct);assert.equal(gradeLesson(m,answers).passed,true);
   const recorded=recordLessonAttempt(m,answers,null);
   assert.equal(isModuleComplete(m,{completed:{[m.id]:recorded}}),true);
   const ordinary=q.map((x,index)=>x.critical?null:index).filter(i=>i!==null);
   const oneWrong=[...answers];oneWrong[ordinary[0]]=(oneWrong[ordinary[0]]+1)%3;
   assert.equal(gradeLesson(m,oneWrong).passed,true,'4/5 ordinary answer passes');
   const twoWrong=[...oneWrong];twoWrong[ordinary[1]]=(twoWrong[ordinary[1]]+1)%3;
   assert.equal(gradeLesson(m,twoWrong).passed,false,'3/5 fails');
  }
 });
}
test('34.4: regalos, enlaces afiliados y publicidad engañosa son preguntas críticas',()=>{
 const m=chapter34.modules[3];const q=m.assessment.questions;
 const crit=q.map((x,i)=>x.critical?i:null).filter(i=>i!==null);
 assert.ok(crit.length>=3);
 for(const index of crit){
  const answers=q.map(x=>x.correct);answers[index]=(answers[index]+1)%3;
  const graded=gradeLesson(m,answers);
  assert.equal(graded.score,80);
  assert.equal(graded.criticalMistakes,1);
  assert.equal(graded.passed,false);
 }
 assert.ok(m.html.includes('facebook.com/help/instagram/616901995832907'));
 assert.ok(m.html.includes('support.tiktok.com/es/business-and-creator'));
 assert.ok(m.html.includes('sernac.cl'));
});
test('35.4: manipulación y claims médicos no aprobables con cuatro aciertos',()=>{
 const m=chapter35.modules[3],q=m.assessment.questions;
 assert.ok(q.filter(x=>x.critical).length>=2);
 for(const [i,item] of q.entries()){
  if(!item.critical)continue;
  const answers=q.map(x=>x.correct);answers[i]=(answers[i]+1)%3;
  const res=gradeLesson(m,answers);
  assert.equal(res.score,80);assert.equal(res.criticalMistakes,1);assert.equal(res.passed,false);
 }
 assert.ok(m.html.includes('sernac.cl'));
});
test('34/35: cuatro diagramas válidos, alt suficientemente descriptivo y títulos SVG',()=>{
 const checks=[[chapter34,3,'cap34-commercial-disclosure.svg'],[chapter34,7,'cap34-content-metrics.svg'],[chapter35,3,'cap35-evidence-before-after.svg'],[chapter35,6,'cap35-video-safe-zones.svg']];
 for(const [chapter,idx,file] of checks){
  const m=chapter.modules[idx];
  const fp='public/assets/chapter'+chapter.n+'/'+file;
  assert.ok(existsSync(fp),fp);
  assert.ok(m.html.includes(file));
  assert.ok(m.html.includes('alt="'));
  const svg=readFileSync(fp,'utf8');
  assert.ok(svg.includes('<title')&&svg.includes('<desc'));
  assert.ok(svg.includes('viewBox="0 0 1280'));
 }
});
test('34/35: cálculos didácticos reproducibles y casos no reales',()=>{
 assert.equal(15/50*100,30);
 assert.equal(10/200*100,5);
 assert.equal(200/10000*100,2);
 assert.equal(8/200*100,4);
 assert.equal(8/20*100,40);
 assert.equal(160/4000*100,4);
 assert.equal(200/4000*100,5);
 assert.equal(8/160*100,5);
 assert.equal(10/200*100,5);
 for(const m of [...chapter34.modules,...chapter35.modules]){
  assert.ok(m.html.toLowerCase().includes('simulad'));
 }
});
test('35.7: Meta safe zones y TikTok música comercial citados',()=>{
 assert.ok(chapter35.modules[6].html.includes('facebook.com/business/ads/facebook-instagram-reels-ads'));
 assert.ok(chapter35.modules[6].html.includes('support.tiktok.com/es/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok'));
});
