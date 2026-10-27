import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const seed=JSON.parse(readFileSync(resolve('data/academy.seed.json'),'utf-8'));
const source=readFileSync(resolve('components/LearningDashboard.js'),'utf8');
const css=readFileSync(resolve('app/learning.css'),'utf8');
test('las diez rutas reales están definidas en el mapa del curso',()=>{
 assert.equal(seed.schools.length,10);
 assert.equal(seed.schools.reduce((n,s)=>n+s.chapters.length,0),50);
 for(const [i,school] of seed.schools.entries()){
  assert.ok(school.id&&school.name&&school.desc,'Ruta '+(i+1)+' sin metadatos');
  assert.ok(school.chapters.length>=1,'Ruta '+(i+1)+' vacía');
 }
});
test('Ruta 6 comienza en capítulo 28 y rutas 6–10 cubren 28–50 sin huecos',()=>{
 const actual=seed.schools.slice(5).flatMap(s=>s.chapters.map(c=>c.n)).sort((a,b)=>a-b);
 assert.deepEqual(actual,Array.from({length:23},(_,i)=>i+28));
 const intervals=seed.schools.slice(5).map(s=>[s.chapters[0].n,s.chapters.at(-1).n]);
 assert.deepEqual(intervals,[[28,35],[36,40],[41,44],[45,47],[48,50]]);
});
test('home no trunca la lista a 4 ni muestra un número fijo',()=>{
 assert.ok(source.includes('Las {totalRoutes} rutas de YEPPO Academy'));
 assert.ok(source.includes('schools.map((s,i)=><Link'));
 assert.ok(source.includes("encodeURIComponent(s.id)"));
 assert.ok(!source.includes('schools.slice(0,4)'));
});
test('rutas son legibles en móvil: 5, 4, 3, 2 y 1 columnas',()=>{
 for(const n of ['repeat(5,minmax(0,1fr))','repeat(4,minmax(0,1fr))','repeat(3,minmax(0,1fr))','repeat(2,minmax(0,1fr))','grid-template-columns:minmax(0,1fr)'])assert.ok(css.includes(n));
});
