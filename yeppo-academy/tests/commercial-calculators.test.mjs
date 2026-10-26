import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateStockDecision,calculatePricingDecision} from '../lib/commercial-calculators.js';
const stock=()=>({daily:4,lead:15,safety:20,current:72,received:100,sold:70});
const price=()=>({cost:6000,gross:11900,vat:19,commission:10,payment:0,shipping:500,discount:0,target:25});
test('stock: ROP, cobertura, cohorte y pedido calculados consistentemente',()=>{
 const r=calculateStockDecision(stock());assert.equal(r.ok,true);
 assert.equal(r.rop,80);assert.equal(r.coverage,18);assert.equal(r.reorder,8);assert.equal(r.sellThrough,70);
});
test('stock: no inventar sell-through cuando recibidas cero o no comparables',()=>{
 const x=calculateStockDecision({...stock(),received:0,sold:0});assert.equal(x.ok,true);assert.equal(x.sellThrough,null);
 const y=calculateStockDecision({...stock(),received:3,sold:7});assert.equal(y.ok,true);assert.equal(y.sellThrough,null);
});
test('stock: no aceptar vacíos, demanda cero, negativos ni valor no numérico',()=>{
 for(const changes of [{daily:0},{daily:''},{daily:-1},{lead:-2},{current:-1},{safety:-1},{sold:-1},{received:-1},{daily:'abc'},{current:Infinity}]){
  const r=calculateStockDecision({...stock(),...changes});assert.equal(r.ok,false,JSON.stringify(changes));
 }
});
test('precio: IVA, cargo sobre bruto, contribución y margen correctos',()=>{
 const r=calculatePricingDecision(price());assert.equal(r.ok,true);
 assert.equal(r.finalGross,11900);assert.equal(r.netSale,10000);assert.equal(r.channelFees,1190);
 assert.equal(r.contribution,2310);assert.equal(r.contributionMargin,23.1);
 assert.ok(Math.abs(r.targetGross-10313.333333333334)<1e-7);
});
test('precio: sin IVA y descuento controlado',()=>{
 const r=calculatePricingDecision({cost:1000,gross:2000,vat:0,commission:0,payment:0,shipping:0,discount:20,target:25});
 assert.equal(r.ok,true);assert.equal(r.finalGross,1600);assert.equal(r.netSale,1600);assert.equal(r.grossMargin,37.5);
});
test('precio: rechazar descuentos/objetivos imposibles, costos negativos y div cero',()=>{
 for(const changes of [{gross:0},{gross:-1},{gross:''},{gross:'no'},{cost:-1},{cost:''},{commission:-1},{commission:101},{vat:-1},{vat:101},{discount:-1},{discount:100},{discount:110},{target:100},{target:-1},{shipping:-100}]){
  const r=calculatePricingDecision({...price(),...changes});
  assert.equal(r.ok,false,JSON.stringify(changes));
 }
});
