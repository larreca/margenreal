// Inventario estático reproducible. No asigna notas automáticas de calidad.
// Ejecutar desde yeppo-academy con: node scripts/audit-inventory.mjs
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {repairLegacyImagePaths} from '../lib/content-utils.js';
import {upgradeHydrationChapter} from '../data/chapter11-upgrade.js';
const app=resolve(fileURLToPath(new URL('..',import.meta.url)));
const dataDir=join(app,'data'),publicDir=join(app,'public');
const readJSON=name=>JSON.parse(readFileSync(join(dataDir,name),'utf8'));
const seed=readJSON('academy.seed.json');
const catalog=new Map(seed.schools.flatMap(s=>s.chapters).map(c=>[c.id,c]));
for(const chapter of readJSON('new-chapters.json'))catalog.set(chapter.id,chapter);
catalog.set('c11',upgradeHydrationChapter(readJSON('chapter11.json')));
for(const n of [1,...Array.from({length:39},(_,i)=>i+12)]){
 const filename=n===1?'chapter01.js':'chapter'+n+'.js';
 const {default:chapter}=await import(pathToFileURL(join(dataDir,filename)).href);
 catalog.set(chapter.id,chapter);
}
const chapters=[...catalog.values()].filter(c=>/^c\d{2}$/.test(c.id)).sort((a,b)=>a.n-b.n);
const errors=[],rows=[],assetCount=new Set(), missingImages=new Set();
for(const chapter of chapters){
 if(!Array.isArray(chapter.modules)||chapter.modules.length!==8)errors.push('Cantidad de módulos '+chapter.id+': '+(chapter.modules?.length??'sin datos'));
 const ids=new Set();
 for(const [i,module] of (chapter.modules||[]).entries()){
  if(ids.has(module.id))errors.push('Módulo duplicado '+chapter.id+': '+module.id);
  ids.add(module.id);
  const html=module.html||'',lessonId=module.label||chapter.n+'.'+(i+1);
  const imgs=[...html.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]);
  const missingAlt=imgs.filter(tag=>!(/\balt\s*=\s*["'][^"']+["']/i.test(tag))).length;
  for(const tag of imgs){
   const src=tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
   if(!src)continue;const effectiveSrc=repairLegacyImagePaths(src);assetCount.add(effectiveSrc);
   if(effectiveSrc.startsWith('/assets/')){
    const local=join(publicDir,effectiveSrc.split('?')[0].slice(1));
    if(!existsSync(local))missingImages.add(effectiveSrc);
   }
  }
  const questions=module.assessment?.questions;
  rows.push({
   capitulo:chapter.n,modulo:lessonId,id:module.id,titulo:module.title||'',
   ruta:'/revision/'+chapter.id+'?lesson='+module.id,
   version:String(chapter.contentVersion||0),
   objetivo:'No auditado individualmente',nota_inicial:'',fecha_inicial:'2026-10-25',
   profundidad:'',claridad:'',visuales:'',aplicacion:'',evaluacion:'',fuentes:'',nota_ponderada:'',
   estado:'pendiente de verificación',bloqueo:missingAlt?'Imágenes sin alt: '+missingAlt:'',
   cambios:questions?'Evaluación independiente disponible; falta revisión pedagógica y pruebas en UI':'Evaluación independiente pendiente de crear o verificar',
   fuentes:'Pendiente de verificar afirmaciones',
   visuales:'Imágenes HTML: '+imgs.length+'; no incluye visuales del componente compartido',
   prueba_ejercicio:'No probada visualmente',
   prueba_movil_escritorio:'No probada',
   evidencia:'Revisión estática de código y referencias locales',
   siguiente_accion:'Revisar contenido, imágenes renderizadas, práctica, feedback y fuentes',
   quiz_independiente:Array.isArray(questions)?questions.length:0,imagenes_sin_alt:missingAlt
  });
 }
}
if(chapters.length!==50)errors.push('Capítulos: '+chapters.length+' (esperados 50)');
if(rows.length!==400)errors.push('Módulos: '+rows.length+' (esperados 400)');
if(missingImages.size)errors.push('Imágenes locales no encontradas: '+[...missingImages].join('; '));
const dir=join(app,'reports');mkdirSync(dir,{recursive:true});
const headers=Object.keys(rows[0]||{});
const csvValue=value=>'"'+String(value??'').replace(/"/g,'""')+'"';
writeFileSync(join(dir,'matriz-evidencias-400.csv'),[headers.join(','),...rows.map(r=>headers.map(h=>csvValue(r[h])).join(','))].join('\n')+'\n');
writeFileSync(join(dir,'auditoria-estatica.json'),JSON.stringify({
 checked_at:new Date().toISOString(),scope:'solo estructura y recursos locales del código',
 chapters:chapters.length,modules:rows.length,independent_assessments:rows.filter(r=>r.quiz_independiente>0).length,
 referenced_inline_image_urls:assetCount.size,missing_local_images:[...missingImages],images_without_alt:rows.reduce((s,r)=>s+r.imagenes_sin_alt,0),
 errors,unverified:['exactitud científica/regulatoria','fuentes externas','renderizado móvil y escritorio','calidad visual','pruebas en alumnos','certificados y acceso'],
 note:'No se asignan notas de 8/10 por estructura o número de preguntas.'
},null,2)+'\n');
console.log(JSON.stringify({chapters:chapters.length,modules:rows.length,independentAssessments:rows.filter(r=>r.quiz_independiente>0).length,inlineImages:assetCount.size,errors},null,2));
if(errors.length)process.exitCode=1;
