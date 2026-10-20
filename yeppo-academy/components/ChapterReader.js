"use client";
import {useEffect,useRef,useState} from "react";
import Link from 'next/link';
import useLearning from './useLearning';
import LessonAssessment from './LessonAssessment';
import {isModuleComplete} from '@/lib/lesson-assessment';
import {chapterProgress,readMinutes} from '@/lib/learning-model';
import {Meter} from './LearningDashboard';
import {downloadGuide} from './ChapterOverview';
import {videoEmbedUrl} from "@/lib/video";
import {editorialFor,editorialImage,editorialCover} from "@/lib/editorial";
import ChapterMap from "@/components/ChapterMap";
import MiniDecision from "@/components/MiniDecision";
import {enhanceChapterVisuals} from "@/lib/chapter-visuals";

function attachInteractions(container,onAssessment){
 if(!container)return;
 const cleanups=[];

 container.querySelectorAll("[data-routine]").forEach((b)=>{
   const fn=()=>{
     const w=b.closest("[data-routine-builder]"),r=w?.querySelector("[data-routine-result]");
     w?.querySelectorAll("[data-routine]").forEach(x=>x.classList.toggle("active",x===b));
     const v={
       simple:'<b>Rutina esencial</b><p><strong>AM:</strong> limpiador si se necesita → hidratante → protector solar.</p><p><strong>PM:</strong> limpieza → hidratante.</p><span>Objetivo: crear adherencia y una base antes de sumar tratamientos.</span>',
       media:'<b>Rutina intermedia</b><p><strong>AM:</strong> limpieza → serum según necesidad → hidratante → protector solar.</p><p><strong>PM:</strong> limpieza → tratamiento → hidratante.</p><span>Objetivo: sumar un tratamiento claro.</span>',
       completa:'<b>Rutina completa</b><p><strong>AM:</strong> limpieza → capa hidratante si aporta valor → tratamiento → hidratante → SPF.</p><p><strong>PM:</strong> limpieza → capas según necesidad → tratamiento → crema.</p><span>Completa no significa obligatoria ni mejor para todos.</span>'
     };
     if(r)r.innerHTML=v[b.dataset.routine]||v.simple;
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".margin-calc-btn").forEach((b)=>{
   const fn=()=>{
     const w=b.closest("[data-margin-calculator]");
     const g=k=>Number(w?.querySelector('[data-calc="'+k+'"]')?.value||0);
     const p=g("price"),cost=g("cost"),fee=g("fee"),extra=g("extra"),r=w?.querySelector(".calc-result");
     if(!r)return;if(p<=0){r.textContent="Ingresa un precio válido.";return}
     const net=p/1.19,con=net-cost-p*(fee/100)-extra,mar=net?con/net*100:0;
     r.innerHTML="<b>Venta neta:</b> $"+Math.round(net).toLocaleString("es-CL")+" · <b>Contribución:</b> $"+Math.round(con).toLocaleString("es-CL")+" · <b>Margen:</b> "+mar.toFixed(1)+"%";
     r.style.color=mar>=25?"#157b53":mar>=15?"#b06013":"#b42318";
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".crosssell-calc-btn").forEach((b)=>{
   const fn=()=>{
     const w=b.closest("[data-crosssell-calculator]");
     const g=k=>Number(w?.querySelector('[data-xcalc="'+k+'"]')?.value||0);
     const tickets=g("tickets"),units=g("units"),revenue=g("revenue"),anchor=g("anchor"),withComplement=g("withComplement");
     const r=w?.querySelector(".crosssell-calc-result");
     if(!r)return;
     if(tickets<=0){r.textContent="Ingresa una cantidad de tickets válida.";return}
     const aov=revenue/tickets,upt=units/tickets,attach=anchor>0?(withComplement/anchor*100):0;
     r.innerHTML="<b>AOV / ticket:</b> $"+Math.round(aov).toLocaleString("es-CL")+" · <b>UPT:</b> "+upt.toFixed(2)+" · <b>Attach rate:</b> "+attach.toFixed(1)+"%";
     r.style.color="#111858";
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".upsell-calc-btn").forEach((b)=>{
   const fn=()=>{
     const w=b.closest("[data-upsell-calculator]");
     const g=k=>Number(w?.querySelector('[data-ucalc="'+k+'"]')?.value||0);
     const basePrice=g("basePrice"),upPrice=g("upPrice"),baseSize=g("baseSize"),upSize=g("upSize"),offers=g("offers"),upgrades=g("upgrades");
     const r=w?.querySelector(".upsell-calc-result");
     if(!r)return;
     if(basePrice<=0||upPrice<=0||baseSize<=0||upSize<=0){r.textContent="Completa precios y tamaños válidos.";return}
     const baseUnit=basePrice/baseSize,upUnit=upPrice/upSize;
     const unitSaving=(1-upUnit/baseUnit)*100;
     const upgradeRate=offers>0?(upgrades/offers*100):0;
     const incremental=Math.max(0,upPrice-basePrice)*Math.max(0,upgrades);
     r.innerHTML="<b>Base:</b> $"+Math.round(baseUnit).toLocaleString("es-CL")+"/ml · <b>Upgrade:</b> $"+Math.round(upUnit).toLocaleString("es-CL")+"/ml · <b>Valor unitario:</b> "+(unitSaving>=0?unitSaving.toFixed(1)+"% menor":"sin ahorro por ml")+" · <b>Upgrade rate:</b> "+upgradeRate.toFixed(1)+"% · <b>Venta incremental:</b> $"+Math.round(incremental).toLocaleString("es-CL");
     r.style.color="#111858";
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".objection-calc-btn").forEach((b)=>{
   const fn=()=>{
     const w=b.closest("[data-objection-calculator]");
     const g=k=>Number(w?.querySelector('[data-ocalc="'+k+'"]')?.value||0);
     const conversations=g("conversations"),objections=g("objections"),sales=g("sales"),discounted=g("discounted"),avgTicket=g("avgTicket"),avgDiscount=g("avgDiscount");
     const r=w?.querySelector(".objection-calc-result");
     if(!r)return;
     if(conversations<=0||objections<0||sales<0){r.textContent="Completa valores válidos.";return}
     const objectionRate=conversations>0?objections/conversations*100:0;
     const resolution=objections>0?sales/objections*100:0;
     const discountReliance=sales>0?discounted/sales*100:0;
     const leakage=discounted*avgTicket*(avgDiscount/100);
     r.innerHTML="<b>Tasa de objeción:</b> "+objectionRate.toFixed(1)+"% · <b>Conversión post-objeción:</b> "+resolution.toFixed(1)+"% · <b>Dependencia de descuento:</b> "+discountReliance.toFixed(1)+"% · <b>Descuento estimado cedido:</b> $"+Math.round(leakage).toLocaleString("es-CL");
     r.style.color="#111858";
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".assortment-calc-btn").forEach((b)=>{
  const fn=()=>{const w=b.closest("[data-assortment-calculator]"),g=k=>Number(w?.querySelector('[data-acalc="'+k+'"]')?.value||0),clamp=v=>Math.max(0,Math.min(100,v));const demand=clamp(g("demand")),margin=clamp(g("margin")),sell=clamp(g("sell")),role=Math.max(1,Math.min(5,g("role"))),risk=Math.max(0,Math.min(5,g("risk")));const score=clamp(demand*.30+margin*.25+sell*.25+(role*20)*.20-risk*4);const label=score>=75?"Prioridad alta para sostener/invertir":score>=55?"Mantener y optimizar":score>=35?"Revisar rol y profundidad":"Candidato a reducir, testear o salir";const r=w?.querySelector(".assortment-calc-result");if(r){r.innerHTML="<b>Score orientativo:</b> "+score.toFixed(1)+"/100 · <b>Lectura:</b> "+label;r.style.color="#111858"}};b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".stock-calc-btn").forEach((b)=>{
  const fn=()=>{const w=b.closest("[data-stock-calculator]"),g=k=>Number(w?.querySelector('[data-stcalc="'+k+'"]')?.value||0);const daily=g("daily"),lead=g("lead"),safety=g("safety"),current=g("current"),received=g("received"),sold=g("sold"),r=w?.querySelector(".stock-calc-result");if(!r)return;if(daily<=0||lead<0||current<0){r.textContent="Completa demanda diaria, lead time y stock válidos.";return}const rop=daily*lead+safety,coverage=current/daily,sell=received>0?sold/received*100:0,reorder=Math.max(0,rop-current);r.innerHTML="<b>Punto de reposición:</b> "+Math.ceil(rop)+" u · <b>Cobertura actual:</b> "+coverage.toFixed(1)+" días · <b>Sell-through:</b> "+sell.toFixed(1)+"% · <b>Faltante hasta ROP:</b> "+Math.ceil(reorder)+" u";r.style.color="#111858"};b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".pricing-calc-btn").forEach((b)=>{
  const fn=()=>{const w=b.closest("[data-pricing-calculator]"),g=k=>Number(w?.querySelector('[data-pcalc="'+k+'"]')?.value||0);const cost=g("cost"),gross=g("gross"),vat=g("vat")/100,commission=g("commission")/100,payment=g("payment")/100,shipping=g("shipping"),discount=g("discount")/100,target=g("target")/100,r=w?.querySelector(".pricing-calc-result");if(!r)return;if(cost<0||gross<=0){r.textContent="Completa costo y precio válidos.";return}const finalGross=gross*(1-discount),netSale=finalGross/(1+vat),grossProfit=netSale-cost,grossMargin=netSale>0?grossProfit/netSale*100:0,channelFees=finalGross*(commission+payment),contribution=netSale-cost-channelFees-shipping,contributionMargin=netSale>0?contribution/netSale*100:0,targetNet=target<1?(cost+shipping)/(1-target):0,targetGross=targetNet*(1+vat);r.innerHTML="<b>Precio final c/desc.:</b> $"+Math.round(finalGross).toLocaleString("es-CL")+" · <b>Venta neta s/IVA:</b> $"+Math.round(netSale).toLocaleString("es-CL")+" · <b>Margen bruto:</b> "+grossMargin.toFixed(1)+"% · <b>Contribución post-canal:</b> $"+Math.round(contribution).toLocaleString("es-CL")+" ("+contributionMargin.toFixed(1)+"%) · <b>Precio referencial para margen objetivo antes de fees:</b> $"+Math.round(targetGross).toLocaleString("es-CL");r.style.color="#111858"};b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll("[data-stock-answer]").forEach((b)=>{
   const fn=()=>{
     const w=b.closest("[data-stock-game]"),o=w?.querySelector(".stock-feedback");
     w?.querySelectorAll("[data-stock-answer]").forEach(x=>x.classList.toggle("selected",x===b));
     if(o)o.textContent={test:"TEST PEQUEÑO: valida rotación antes de profundizar.",scale:"PROFUNDIZAR: venta sostenida + margen + reposición justifican más stock.",stop:"NO INCORPORAR AÚN: evita duplicar función sin una razón clara."}[b.dataset.stockAnswer]||"";
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".level-btn").forEach((b)=>{
   const fn=()=>{
     const w=b.closest("[data-level-switch]");
     w?.querySelectorAll(".level-btn").forEach(x=>x.classList.toggle("active",x===b));
     w?.querySelectorAll("[data-level-panel]").forEach(x=>x.classList.toggle("active",x.dataset.levelPanel===b.dataset.level));
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll("[data-decision-game] article button,.decision-game article button").forEach((b)=>{
   const fn=()=>{
     const card=b.closest("article"),f=card?.querySelector(".decision-feedback"),ok=b.dataset.choice===card?.dataset.correct;
     if(!f)return;
     f.textContent=ok?(card?.dataset.correctFeedback||"Correcto. La decisión prioriza el objetivo, la tolerancia y una recomendación sostenible."):(card?.dataset.wrongFeedback||"Revisa la decisión: sumar intensidad o complejidad no sustituye una rutina tolerable y coherente.");
     f.className="decision-feedback "+(ok?"good":"bad");
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 container.querySelectorAll(".challenge-submit").forEach((b)=>{
   const fn=async()=>{
     const box=b.closest("[data-challenge]"),qs=[...(box?.querySelectorAll(".challenge-q")||[])],out=box?.querySelector(".challenge-result");
     if(!out)return;
     let score=0,answered=0;const answers=[];
     qs.forEach(q=>{
       const picked=q.querySelector('input[type="radio"]:checked');
       answers.push(picked?.value??null);
       if(picked){answered++;if(String(picked.value)===String(q.dataset.answer))score++}
     });
     if(answered<qs.length){out.textContent="Responde todas las preguntas antes de corregir.";return}
     out.textContent=score+"/"+qs.length+" correctas.";
     qs.forEach(q=>{
       const picked=q.querySelector('input[type="radio"]:checked');
       const correct=q.querySelector(`input[value="${q.dataset.answer}"]`);
       const isCorrect=picked?.value===q.dataset.answer;
       let feedback=q.querySelector(".challenge-feedback");
       if(!feedback){feedback=document.createElement("p");q.appendChild(feedback)}
       feedback.className="challenge-feedback "+(isCorrect?"good":"bad");
       feedback.textContent=(isCorrect?"Correcto. ":"Revisa: "+(correct?.parentElement?.textContent?.trim()||"la respuesta indicada")+". ")+(q.dataset.explanation||"");
     });
     if(onAssessment)await onAssessment(answers,qs.length?score/qs.length*100:0);
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 return()=>cleanups.forEach(fn=>fn());
}

export default function ChapterReader({chapter,initialPercent=0,initialPassed=false,previewMode=false,initialStates={},initialModuleId}){
 const modules=chapter.modules||[];
 const [index,setIndex]=useState(Math.max(0,modules.findIndex(m=>m.id===initialModuleId)));
 const [navOpen,setNavOpen]=useState(false);const [notesOpen,setNotesOpen]=useState(false);const [note,setNote]=useState('');const [noteDirty,setNoteDirty]=useState(false);const [savedMsg,setSavedMsg]=useState('');const [busy,setBusy]=useState(false);
 const {states,ready,error,update}=useLearning(initialStates,previewMode);const state=states[chapter.id]||{};
 const [passed,setPassed]=useState(initialPassed);const [assessmentMsg,setAssessmentMsg]=useState('');const stageRef=useRef(null);const dialogRef=useRef(null);const [zoom,setZoom]=useState(null);const [zoomDetail,setZoomDetail]=useState(false);const lastImageTrigger=useRef(null);const resumed=useRef(null);
 const m=modules[index]||{id:'empty',title:chapter.title,html:'<p>Contenido en preparación.</p>'};const videoSrc=videoEmbedUrl(m.videoUrl);
 const p=chapterProgress(chapter,{...state,passed:state.passed||passed});
 const feature={...editorialFor(chapter.id),...chapter.editorial};const cover=editorialCover(chapter.id);const coverSrc=chapter.coverImage||cover.src;const coverAlt=chapter.coverAlt||cover.alt;
 const root=previewMode?'/revision':'/academy';const chapterPath=root+(previewMode?'/':'/chapter/')+chapter.id;
 useEffect(()=>{if(ready&&!noteDirty)setNote(state.notes?.[m.id]||'');},[ready,m.id,state.notes,noteDirty]);
 useEffect(()=>{if(ready&&resumed.current!==m.id){resumed.current=m.id;update(chapter.id,{action:'resume',moduleId:m.id});}},[ready,m.id]);
 useEffect(()=>{if(ready&&state.passed)setPassed(true);},[ready,state.passed]);
 useEffect(()=>{
 const container=stageRef.current;if(!container)return;
 const clean=attachInteractions(container,async(answers,score)=>{
 if(previewMode){const ok=await update(chapter.id,{action:'quiz',value:!!state.passed||score>=80});if(ok){setPassed(v=>v||score>=80);setAssessmentMsg(score>=80?'Evaluación aprobada. Confirma la lectura para finalizar.':'Necesitas un 80 % para aprobar. Puedes volver a intentarlo.');}return;}
 try{const r=await fetch('/api/quiz',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chapterId:chapter.id,answers})});const j=await r.json();if(!r.ok)throw new Error(j.error);setPassed(v=>v||Boolean(j.passed));setAssessmentMsg(j.passed?'Evaluación aprobada. Confirma la lectura para finalizar.':'Resultado guardado. Necesitas un 80 % para aprobar.');}catch(e){setAssessmentMsg(e.message||'No se pudo guardar la evaluación. Reintenta.');}
 });
 const triggers=[];
 container.querySelectorAll('img').forEach(img=>{if(img.closest('button,a'))return;const button=document.createElement('button');button.className='learn-expand-image';button.type='button';button.textContent='Ampliar imagen';button.setAttribute('aria-label','Ampliar imagen: '+(img.alt||m.title));img.after(button);const click=()=>{lastImageTrigger.current=button;setZoom({src:img.currentSrc||img.src,alt:img.alt||m.title,width:img.naturalWidth});setZoomDetail(false);};button.addEventListener('click',click);triggers.push(()=>button.remove());});
 return()=>{clean();triggers.forEach(fn=>fn());};
 },[index,m.html,chapter.id,previewMode]);
 useEffect(()=>{if(zoom)dialogRef.current?.showModal();},[zoom]);
 async function saveNote(){setBusy(true);const result=await update(chapter.id,{action:'note',moduleId:m.id,text:note});setBusy(false);if(result){setNoteDirty(false);setSavedMsg('Nota guardada.');}return Boolean(result);}
 async function move(i){if(busy)return;if(noteDirty&&!(await saveNote()))return;const n=Math.max(0,Math.min(modules.length-1,i));setIndex(n);setNavOpen(false);setSavedMsg('');window.history.replaceState(null,'',chapterPath+'?lesson='+encodeURIComponent(modules[n].id));window.scrollTo({top:0,behavior:'smooth'});}
 async function confirm(){setBusy(true);const result=await update(chapter.id,{action:'read',moduleId:m.id},m);setBusy(false);if(!result)return;setSavedMsg('Lectura confirmada y guardada.');if(index<modules.length-1)await move(index+1);else if(chapter.assessmentRequired&&!passed)setAssessmentMsg('Lectura guardada. Aprueba la evaluación para completar el capítulo.');}
 async function submitLesson(answers){setBusy(true);try{return await update(chapter.id,{action:'lesson_quiz',moduleId:m.id,answers},m);}finally{setBusy(false);}}
 function closeZoom(){dialogRef.current?.close();setZoom(null);lastImageTrigger.current?.focus();}
 return <div className="learn-reader"><aside className="learn-reader-index"><Link href={chapterPath} className="learn-back">Volver al capítulo</Link><small>CAPÍTULO {String(chapter.n).padStart(2,'0')}</small><h2>{chapter.title}</h2><p>{p.read} de {p.total} lecciones confirmadas</p><Meter value={p.percent} label="Avance del capítulo"/><button className="learn-index-toggle" aria-expanded={navOpen} onClick={()=>setNavOpen(!navOpen)}>Índice de lecciones</button><nav className={navOpen?'is-open':''} aria-label="Lecciones del capítulo">{modules.map((x,i)=><button key={x.id} onClick={()=>move(i)} disabled={busy} aria-current={index===i?'step':undefined} className={index===i?'active':''}><span>{String(i+1).padStart(2,'0')}</span><span>{x.title}<small>{isModuleComplete(x,state)?(x.assessment?'Actividad aprobada':'Lectura confirmada'):(x.assessment?'Actividad pendiente':'Por leer')}</small></span></button>)}</nav><p className="learn-reading-time">{p.minutes} min de lectura pendientes</p></aside>
 <div className="learn-reader-content"><div className="learn-reader-toolbar"><span>Lección {index+1} de {modules.length} · {readMinutes(m.html)} min estimados</span><div><button aria-pressed={notesOpen} onClick={()=>setNotesOpen(!notesOpen)}>Tomar notas</button><button aria-pressed={!!state.favorite} onClick={()=>update(chapter.id,{action:'favorite',value:!state.favorite})}>{state.favorite?'Guardado':'Guardar capítulo'}</button><button onClick={()=>downloadGuide(chapter)}>Descargar guía</button></div></div><h1>{m.title}</h1>
 {notesOpen&&<section className="learn-note-editor"><label htmlFor="lesson-note">Mis notas de esta lección</label><textarea id="lesson-note" maxLength={10000} rows={5} value={note} onChange={e=>{setNote(e.target.value);setNoteDirty(true);setSavedMsg('');}} placeholder="Una idea para recordar o aplicar en tu negocio…"/><button className="learn-button" disabled={busy||!noteDirty} onClick={saveNote}>Guardar nota</button><small>{noteDirty?'Tienes cambios sin guardar.':'Tus notas son personales.'}</small></section>}
 <section className={'editorial-reader learn-lesson-body course-module ya-stage'+(index===modules.length-1?' is-last':'')} ref={stageRef} key={m.id}>
   {index===0&&(chapter.id==="c10"||chapter.id==="c12")&&<div className="yeppo-evidence-key" aria-label="Cómo leer la evidencia de ingredientes"><strong>Cómo leer la evidencia</strong><div><span>Uso tradicional</span><span>Laboratorio</span><span>Estudios en personas</span><span>Producto terminado</span></div><p>Son preguntas distintas. La historia y los ensayos de un ingrediente no demuestran el resultado de cualquier cosmético que lo incluya.</p></div>}
   {index===0&&chapter.id==="c10"&&<div className="yeppo-ingredient-map"><div><small>YEPPO / INGREDIENTES CON HISTORIA</small><h3>Centella: de la tradición a la fórmula</h3><p>Una misma planta puede aparecer en relatos culturales, investigaciones y cosméticos. Cada contexto permite afirmar cosas diferentes.</p></div><ol><li><b>01</b><strong>Uso tradicional</strong><span>Gotu kola en distintas regiones de Asia: una historia de uso, no una prueba clínica para cualquier crema.</span></li><li><b>02</b><strong>Compuestos estudiados</strong><span>Asiaticósido y madecasósido figuran entre los componentes que motivaron investigación.</span></li><li><b>03</b><strong>Fórmula real</strong><span>Importan el INCI completo, la concentración, la tolerancia y cómo se usa el producto.</span></li><li><b>04</b><strong>Consejo en Yeppo</strong><span>Explica el beneficio cosmético con precisión y evita prometer curación.</span></li></ol><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3834700/" target="_blank" rel="noopener noreferrer">Fuente: revisión científica sobre Centella asiatica ↗</a></div>}
   <div dangerouslySetInnerHTML={{__html:enhanceChapterVisuals(chapter.id,m).replace(/(<div class="reading-copy">[\s\S]*?<\/div>)\s*(<figure class="course-image academy-infographic academy-focused-visual">[\s\S]*?<\/figure>)/,'<div class="learn-reading-visual">$1$2</div>')}}/>
   {index===0&&!m.assessment&&<ChapterMap id={chapter.id} override={chapter.infographic}/>}
   {index===0&&!m.assessment&&<MiniDecision chapterId={chapter.id}/>}
   {m.assessment&&<LessonAssessment key={m.id} module={m} state={state} onSubmit={submitLesson} busy={busy} ready={ready}/>}
   {videoSrc&&<div className="ya-video"><iframe src={videoSrc} title={"Video · "+m.title} loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div>}
   {chapter.assessmentRequired&&index===modules.length-1&&<div className="ya-alert" style={{background:passed?"#eaf8f2":"#fff4e5",color:passed?"#136c4a":"#874900"}}><b>{passed?"Evaluación aprobada":"Evaluación obligatoria"}</b><br/>{assessmentMsg||"Completa la evaluación del capítulo con al menos 80% antes de marcarlo como finalizado."}</div>}

 </section>
 <div className="learn-save-status" aria-live="polite">{error?<p className="learn-error" role="alert">{error}</p>:<p>{savedMsg}</p>}</div>
 <div className="learn-reader-actions"><button className="learn-button secondary" disabled={index===0||busy} onClick={()=>move(index-1)}>Anterior</button><div>{index<modules.length-1&&<button className="learn-text-button" disabled={busy} onClick={()=>move(index+1)}>Solo consultar siguiente</button>}<button className="learn-button" disabled={busy||!ready||Boolean(m.assessment&&!isModuleComplete(m,state))} onClick={confirm}>{busy?'Guardando…':m.assessment&&!isModuleComplete(m,state)?'Aprueba la actividad para completar':m.assessment&&index<modules.length-1?'Continuar a la siguiente lección':index<modules.length-1?'Completar y continuar':p.finished?'Lectura completada':'Confirmar lectura'}</button></div></div>
 {p.finished&&<div className="learn-completion" role="status"><h2>Capítulo completado</h2><p>Tu lectura y evaluación están registradas. Puedes volver a consultar este contenido cuando quieras.</p><Link className="learn-button" href={root+'/explorar'}>Seguir explorando</Link></div>}
 <details className="learn-context"><summary>Consejo práctico y contexto</summary><h3>{feature.eyebrow}</h3><p>{feature.story}</p><h3>Consejo práctico</h3><p>{feature.tip}</p>{feature.source&&<a href={feature.source} target="_blank" rel="noopener noreferrer">Consultar fuente</a>}</details></div>
 <dialog className="learn-image-dialog" ref={dialogRef} onCancel={()=>{setZoom(null);lastImageTrigger.current?.focus();}} onClick={e=>{if(e.target===e.currentTarget)closeZoom();}}><button className="learn-button" onClick={closeZoom} autoFocus>Cerrar imagen</button><button className="learn-button secondary" onClick={()=>setZoomDetail(!zoomDetail)}>{zoomDetail?"Ajustar a la pantalla":"Ver a tamaño original"}</button>{zoomDetail&&<p>Desliza la imagen para ver los detalles.</p>}{zoom&&<figure className={zoomDetail?"is-detail":""}><img src={zoom.src} alt={zoom.alt} style={zoomDetail?{width:zoom.width||1200,maxWidth:"none"}:undefined}/><figcaption>{zoom.alt}</figcaption></figure>}</dialog>
 </div>;
}
