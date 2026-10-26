// Herramientas pedagógicas. Bases e IVA explícitos; sin datos reales de tienda o canal.
const toNumber=(v,defaultZero=false)=>{
 if((v===undefined||v===null||String(v).trim()==='')&&defaultZero)return 0;
 if(v===undefined||v===null||String(v).trim()==='')return NaN;
 const n=typeof v==='number'?v:Number(String(v).trim().replace(',','.'));
 return Number.isFinite(n)?n:NaN;
};
export function calculateStockDecision({daily,lead,safety,current,received,sold}={}){
 const nums={daily:toNumber(daily),lead:toNumber(lead),safety:toNumber(safety,true),current:toNumber(current),received:toNumber(received,true),sold:toNumber(sold,true)};
 const {daily:d,lead:l,safety:s,current:c,received:r,sold:v}=nums;
 if(!Object.values(nums).every(Number.isFinite)||d<=0||l<0||s<0||c<0||r<0||v<0)
  return {ok:false,error:'Completa demanda diaria positiva, lead time y stock no negativos; revisa valores vacíos o inválidos.'};
 const rop=d*l+s,coverage=c/d,reorder=Math.max(0,rop-c);
 // Cuando se registran más ventas que recepciones, el cociente no equivale al sell-through de una cohorte.
 const sellThrough=r>0&&v<=r?v/r*100:null;
 return {ok:true,rop,coverage,reorder,sellThrough,sellThroughNote:sellThrough===null?'Sell-through no comparable: registra unidades recibidas y vendidas de la misma cohorte.':''};
}
export function calculatePricingDecision({cost,gross,vat=19,commission=0,payment=0,shipping=0,discount=0,target=25}={}){
 const nums={cost:toNumber(cost),gross:toNumber(gross),vat:toNumber(vat),commission:toNumber(commission,true),payment:toNumber(payment,true),shipping:toNumber(shipping,true),discount:toNumber(discount,true),target:toNumber(target)};
 const {cost:c,gross:g,vat:v,commission:co,payment:pa,shipping:sh,discount:di,target:ta}=nums;
 if(!Object.values(nums).every(Number.isFinite)||c<0||g<=0||v<0||v>100||co<0||co>100||pa<0||pa>100||sh<0||di<0||di>=100||ta<0||ta>=100)
  return {ok:false,error:'Revisa precio positivo, costos no negativos y porcentajes válidos (descuento y margen objetivo menores a 100 %).'};
 const finalGross=g*(1-di/100),netSale=finalGross/(1+v/100);
 if(!Number.isFinite(netSale)||netSale<=0)return {ok:false,error:'La venta neta debe ser mayor que cero.'};
 const grossProfit=netSale-c,grossMargin=grossProfit/netSale*100;
 const channelFees=finalGross*((co+pa)/100),contribution=netSale-c-channelFees-sh,contributionMargin=contribution/netSale*100;
 // Precio objetivo antes de comisiones/pasarela: sí suma logística declarada.
 const targetNet=(c+sh)/(1-ta/100),targetGross=targetNet*(1+v/100);
 if(![grossMargin,channelFees,contribution,contributionMargin,targetGross].every(Number.isFinite))return {ok:false,error:'Los valores generan un resultado fuera de rango.'};
 return {ok:true,finalGross,netSale,grossMargin,channelFees,contribution,contributionMargin,targetGross,targetNote:'Precio referencial antes de comisiones y pasarela; incluye costo de logística informado.'};
}
