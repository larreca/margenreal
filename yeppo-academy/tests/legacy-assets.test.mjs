import test from 'node:test';
import assert from 'node:assert/strict';
import {repairLegacyImagePaths} from '../lib/content-utils.js';
test('cuatro imágenes perdidas del capítulo 2 usan esquemas SVG existentes',()=>{
 const names=['cap2-2.1-mercado-chile','cap2-2.2-consumidora-viaje','cap2-2.3-venta-ingredientes','cap2-2.4-b2b-vender-mas'];
 for(const name of names){
  const original='/assets/chapter2/'+name+'.webp';
  assert.equal(repairLegacyImagePaths(original),'/assets/chapter2/'+name+'.svg');
 }
 assert.equal(repairLegacyImagePaths('/assets/chapter30/cap30-30.2-margin-markup.svg'),'/assets/chapter30/cap30-30.2-margin-markup.svg');
});
