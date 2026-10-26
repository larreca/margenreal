import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import chapter from '../data/chapter32.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';

test('32.1–32.8: caso por lección y cinco preguntas con umbral de 80%',()=>{
 assert.equal(chapter.id,'c32');assert.equal(chapter.modules.length,8);assert.ok(chapter.contentVersion>=3);
 for(const [i,m] of chapter.modules.entries()){
  assert.equal(m.label,'32.'+(i+1));
  for(const snippet of ['PRÁCTICA DE TIENDA','CASO SIMULADO','Tu decisión y cálculo','Consultar resolución razonada','Límite y validez','academy-case-input'])
   assert.ok(m.html.includes(snippet),m.label+' '+snippet);
  assert.ok(m.html.includes('/assets/chapter32/'),m.label+' missing diagram');
  const qs=m.assessment?.questions||[];
  assert.equal(qs.length,5);
  for(const q of qs){
   assert.equal(q.options.length,3);
   assert.ok(q.prompt.length>=17,q.prompt);
   assert.ok(q.explanation.length>=35,q.explanation);
   assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<=2);
   assert.equal(typeof q.critical,'boolean');
  }
  const correct=qs.map(q=>q.correct);
  assert.equal(gradeLesson(m,correct).passed,true);
  assert.equal(isModuleComplete(m,{completed:{[m.id]:recordLessonAttempt(m,correct,null)}}),true);
  const wrong=[...correct];const ordinary=qs.findIndex(q=>!q.critical);
  wrong[ordinary]=(wrong[ordinary]+1)%3;
  assert.equal(gradeLesson(m,wrong).passed,true,'4 de 5 aciertos normales');
  const second=qs.findIndex((q,idx)=>!q.critical&&idx!==ordinary);
  wrong[second]=(wrong[second]+1)%3;
  assert.equal(gradeLesson(m,wrong).passed,false,'3 de 5 aciertos no pasa');
 }
});
test('32.5: errores críticos sobre testers vetan aprobación aunque se alcance 80%',()=>{
 const m=chapter.modules[4],q=m.assessment.questions;
 const critical=q.map((v,i)=>v.critical?i:null).filter(i=>i!==null);
 assert.ok(critical.length>=3);
 for(const idx of critical){
  const answers=q.map(v=>v.correct);answers[idx]=(answers[idx]+1)%3;
  const result=gradeLesson(m,answers);
  assert.equal(result.score,80);
  assert.equal(result.passed,false);
  assert.equal(result.criticalMistakes,1);
 }
});
test('32.2 32.7 32.8: cálculos reproducibles, sin atribuir datos a Yeppo',()=>{
 assert.equal(16/20*100,80);
 assert.equal(3/12*100,25);
 assert.equal(19/20*100,95);
 assert.equal((21000-20000)/20000*100,5);
 for(const m of [chapter.modules[1],chapter.modules[6],chapter.modules[7]])
  assert.ok(m.html.toLowerCase().includes('simulad')||m.html.toLowerCase().includes('fictici'),m.label);
});
test('diagramas nuevos: existen, tienen alt visible y SVG accesible',()=>{
 for(const [idx,file] of [[2,'cap32-store-route-decision.svg'],[4,'cap32-tester-safe-decision.svg']]){
  const html=chapter.modules[idx].html;
  assert.ok(html.includes(file));
  assert.ok(/alt="[^"]{55,}"/.test(html));
  const fp='public/assets/chapter32/'+file;
  assert.ok(existsSync(fp),fp);
  const svg=readFileSync(fp,'utf8');
  assert.ok(svg.includes('<title')&&svg.includes('<desc'));
  assert.ok(svg.includes('viewBox="0 0 1280'));
 }
});
test('32.4 y 32.5 distinguen fundamentos normativos y estudio piloto',()=>{
 assert.ok(chapter.modules[3].html.includes('sernac.cl/portal/609/w3-article-52753.html'));
 assert.ok(chapter.modules[4].html.includes('fda.gov/cosmetics'));
 assert.ok(chapter.modules[4].html.includes('pubmed.ncbi.nlm.nih.gov/42795700'));
 assert.ok(chapter.modules[4].html.includes('no prueban infección de clientes'));
});
