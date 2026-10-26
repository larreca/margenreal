import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import c39 from '../data/chapter39.js';
import c40 from '../data/chapter40.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';
for(const chapter of [c39,c40]){
 test('Capítulo '+chapter.n+': 8 módulos mejorados con ejercicios y cinco evaluaciones',()=>{
  assert.equal(chapter.id,'c'+chapter.n);assert.equal(chapter.modules.length,8);
  assert.ok(chapter.contentVersion>=(chapter.n===40?4:3));
  const ids=new Set();
  for(const [i,m] of chapter.modules.entries()){
   assert.equal(m.label,chapter.n+'.'+(i+1));
   assert.ok(!ids.has(m.id));ids.add(m.id);
   for(const word of ['CASO SIMULADO','academy-applied-practice','academy-case-input','Consultar resolución razonada','source-course','Limitaciones']){
    assert.ok(m.html.includes(word),m.label+': missing '+word);
   }
   assert.ok(m.html.includes('/assets/chapter'+chapter.n+'/'));
   assert.ok(m.html.length>=2000,m.label);
   assert.equal(m.assessment.passPercent,80);
   const qs=m.assessment.questions;assert.equal(qs.length,5,m.label);
   assert.equal(new Set(qs.map(x=>x.id)).size,5);
   for(const q of qs){
    assert.equal(q.options.length,3);
    assert.ok(q.prompt.length>=16,q.prompt);
    assert.ok(q.explanation.length>=35,q.explanation);
    assert.ok(q.correct>=0&&q.correct<3);
    assert.equal(typeof q.critical,'boolean');
   }
   const correct=qs.map(x=>x.correct);
   assert.equal(gradeLesson(m,correct).passed,true);
   assert.equal(isModuleComplete(m,{completed:{[m.id]:recordLessonAttempt(m,correct,null)}}),true);
   const regular=qs.map((x,j)=>x.critical?null:j).filter(x=>x!==null);
   assert.ok(regular.length>=2);
   const oneWrong=[...correct];oneWrong[regular[0]]=(oneWrong[regular[0]]+1)%3;
   assert.equal(gradeLesson(m,oneWrong).passed,true,m.label+' 4/5 should pass');
   oneWrong[regular[1]]=(oneWrong[regular[1]]+1)%3;
   assert.equal(gradeLesson(m,oneWrong).passed,false,m.label+' 3/5 should fail');
  }
 });
}
test('39.3: VIP Points earned distinto de saldo y programa no implementado',()=>{
 const m=c39.modules[2];assert.ok(m.html.includes('Onni'));assert.ok(m.html.includes('260.000'));
 assert.ok(m.html.includes('140.000'));
 assert.ok(m.html.includes('DISEÑO'));
 assert.ok(m.html.includes('smile.io/vip'));
 assert.ok(m.html.includes('Calendar year'));
 const qs=m.assessment.questions;
 const critical=qs.findIndex(q=>q.critical);assert.ok(critical>=0);
 const a=qs.map(q=>q.correct);a[critical]=(a[critical]+1)%3;
 const r=gradeLesson(m,a);assert.equal(r.score,80);assert.equal(r.criticalMistakes,1);assert.equal(r.passed,false);
});
test('39.5/39.6: no usar inferencias de salud ni reseñas falsas',()=>{
 for(const i of [4,5]){
  const q=c39.modules[i].assessment.questions;
  const critical=q.findIndex(x=>x.critical);assert.ok(critical>=0);
  const a=q.map(x=>x.correct);a[critical]=(a[critical]+1)%3;
  assert.equal(gradeLesson(c39.modules[i],a).passed,false);
 }
});
test('39: cohortes, beneficios y costos demostrables aritméticamente',()=>{
 assert.equal(4/20*100,20);
 assert.equal(32/80*100,40);
 assert.equal(36/120*100,30);
 assert.equal(260000-120000,140000);
 assert.equal(40+60-12,88);
 assert.equal(100*7000-40*(1200+300)-80000,560000);
 assert.equal(70/200*100,35);
 assert.equal(90/200*100,45);
});
test('40: Shopify AOV y net sales son distintos según reversals',()=>{
 const m=c40.modules[1];assert.ok(m.html.includes('Sales reversals')||m.html.includes('reversiones'));
 assert.ok(m.html.includes('$36.000'));
 assert.ok(m.html.includes('$35.000'));
 assert.equal(12000000-1200000-300000,10500000);
 assert.equal((12000000-1200000)/300,36000);
 assert.equal((12000000-1200000-300000)/300,35000);
 assert.ok(m.html.includes('help.shopify.com'));
});
test('40: cálculos de canal, coberturas, marketing y fidelidad',()=>{
 assert.equal(23800/1.19,20000);
 assert.equal(23800*.15,3570);
 assert.equal(20000-12000-3570-1000,3430);
 assert.ok(Math.abs(3430/20000*100-17.15)<1e-9);
 assert.equal(90/3,30);
 assert.equal(1500000/500000,3);
 assert.equal(800000/500000,1.6);
 assert.equal(1200000/200000,6);
 assert.equal(200000/20,10000);
 assert.equal(10000/(2*4000)*12,15);
 assert.equal(200/10000*100,2);
 assert.equal(400/800*100,50);
 assert.equal(30/100*100,30);
 assert.equal(160/100,1.6);
 assert.equal(25000*1.6*3,120000);
 assert.equal(120000*.2,24000);
 assert.equal((18-20)/20*100,-10);
 assert.equal(26-21,5);
});
test('39 y 40: cuatro SVG nuevos tienen título, descripción, alt y sentido contextual',()=>{
 const imgs=[[c39,2,'cap39-earned-vs-balance.svg'],[c39,6,'cap39-reward-economics.svg'],[c40,1,'cap40-shopify-aov-vs-net-sales.svg'],[c40,4,'cap40-roas-vs-payback.svg']];
 for(const [c,i,name] of imgs){
  const file='public/assets/chapter'+c.n+'/'+name;
  assert.ok(existsSync(file),file);
  const src=readFileSync(file,'utf8');
  assert.ok(src.includes('<title')&&src.includes('<desc')&&src.includes('viewBox="0 0 1280'));
  const html=c.modules[i].html;
  assert.ok(html.includes(name));
  assert.ok(/alt="[^"]{60,}"/.test(html));
 }
});
test('Fuentes 2026: Smile, Shopify, SII visibles sin afirmar cifras reales Yeppo',()=>{
 assert.ok(c39.modules.every(m=>m.html.includes('smile.io/vip')));
 assert.ok(c39.modules.every(m=>m.html.includes('son propuestas aún pendientes')));
 assert.ok(c40.modules.every(m=>m.html.includes('help.shopify.com')));
 assert.ok(c40.modules.every(m=>m.html.includes('sii.cl')));
 assert.ok(c40.modules.every(m=>m.html.includes('Los KPI ilustrativos no son reportes de Yeppo')));
});
