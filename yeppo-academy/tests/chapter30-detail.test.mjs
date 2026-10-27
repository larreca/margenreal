import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import chapter from '../data/chapter30.js';

const lessons=Object.fromEntries(chapter.modules.map(module=>[module.label,module]));

test('30.3 y 30.4 muestran cálculos coherentes y sus dos versiones visuales',()=>{
 for(const label of ['30.3','30.4']){
  const html=lessons[label].html;
  assert.match(html,/<picture><source media="\(max-width: 640px\)"/);
  for(const name of [...html.matchAll(/\/assets\/chapter30\/([\w.-]+\.svg)/g)].map(match=>match[1])){
   assert.ok(fs.existsSync(path.join('public/assets/chapter30',name)),`${label}: falta ${name}`);
  }
 }
 assert.match(lessons['30.3'].html,/23\.800\/1,19 = \$20\.000/);
 assert.match(lessons['30.4'].html,/comisión \$1\.190, contribución \$2\.310/);
 assert.match(lessons['30.4'].html,/comisión \$1\.000, contribución \$2\.500/);
 assert.match(lessons['30.2'].html,/17\.500/);
 assert.doesNotMatch(lessons['30.3'].html,/class="channel-matrix"/);
});

test('los ejemplos no se presentan como tarifas internas ni precios vigentes',()=>{
 assert.doesNotMatch(lessons['30.4'].html,/Referencia interna|Comisión ref\.|vigentes para capacitación/);
 assert.doesNotMatch(lessons['30.6'].html,/muestra actualmente/);
 assert.match(lessons['30.6'].html,/precios del ejercicio simulados/);
 assert.match(lessons['30.8'].html,/no incorpora comisión ni pasarela/);
 for(const lesson of Object.values(lessons)){
  assert.equal(lesson.assessment.questions.length,5);
  assert.equal(lesson.assessment.version,3);
  assert.match(lesson.html,/EJERCICIO · CIFRAS SIMULADAS/);
 }
 assert.match(lessons['30.3'].assessment.questions[3].prompt,/margen bruto/);
 assert.match(lessons['30.8'].assessment.questions[3].prompt,/bruto en vez de neto/);
 assert.match(lessons['30.8'].assessment.questions[4].prompt,/referencial objetivo/);
});
