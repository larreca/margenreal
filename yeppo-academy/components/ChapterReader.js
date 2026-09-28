"use client";
import {useEffect,useRef,useState} from "react";
import {videoEmbedUrl} from "@/lib/video";
import {editorialFor,editorialImage,editorialCover} from "@/lib/editorial";
import ChapterMap from "@/components/ChapterMap";
import MiniDecision from "@/components/MiniDecision";

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

 container.querySelectorAll("[data-decision-game] article button").forEach((b)=>{
   const fn=()=>{
     const card=b.closest("article"),f=card?.querySelector(".decision-feedback"),ok=b.dataset.choice===card?.dataset.correct;
     if(!f)return;
     f.textContent=ok?"Correcto. La decisión prioriza señal comercial, rotación y sostenibilidad.":"Revisa la señal comercial: viralidad y variedad no sustituyen rotación, margen y necesidad.";
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
     if(onAssessment)await onAssessment(answers);
   };
   b.addEventListener("click",fn);cleanups.push(()=>b.removeEventListener("click",fn));
 });

 return()=>cleanups.forEach(fn=>fn());
}

export default function ChapterReader({chapter,initialPercent=0,initialPassed=false,previewMode=false}){
 const modules=chapter.modules||[];
 const initialIndex=modules.length?Math.min(modules.length-1,Math.max(0,Math.floor((initialPercent/100)*modules.length))):0;
 const [index,setIndex]=useState(initialIndex);
 const [navOpen,setNavOpen]=useState(false);
 const [done,setDone]=useState(initialPercent>=100);
 const [passed,setPassed]=useState(initialPassed);
 const [assessmentMsg,setAssessmentMsg]=useState("");
 const stageRef=useRef(null);
 const m=modules[index]||{id:"empty",label:"",title:chapter.title,html:"<p>Contenido en preparación.</p>"};
 const videoSrc=videoEmbedUrl(m.videoUrl);
 const shown=Math.max(initialPercent,modules.length?Math.round(((index+1)/modules.length)*100):0);
 const feature=editorialFor(chapter.id);

 useEffect(()=>{
   return attachInteractions(stageRef.current,async(answers)=>{
     if(previewMode)return;
     const r=await fetch("/api/quiz",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chapterId:chapter.id,answers})});
     const j=await r.json();
     setPassed(Boolean(j.passed));
     setAssessmentMsg(j.passed?"Evaluación aprobada. Ya puedes completar el capítulo.":"Resultado guardado. Necesitas 80% para aprobar.");
   });
 },[index,m.html,chapter.id,previewMode]);

 async function save(nextIndex=index,complete=false){
   if(previewMode)return;
   const mm=modules[nextIndex];
   await fetch("/api/progress",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
     chapterId:chapter.id,moduleId:mm?.id||null,percent:complete?100:Math.round(((nextIndex+1)/Math.max(modules.length,1))*100),completed:complete
   })});
 }
 function move(i){
   const n=Math.max(0,Math.min(modules.length-1,i));
   setIndex(n);setNavOpen(false);save(n,false);window.scrollTo({top:0,behavior:"smooth"});
 }
 async function complete(){
   if(previewMode)return;
   if(chapter.assessmentRequired&&!passed){setAssessmentMsg("Este capítulo requiere aprobar la evaluación antes de completarlo.");return}
   await save(index,true);setDone(true);
 }

 return <div className="ya-reader editorial-reader"><div className="coursebook ya-course-shell">
  <div className="ya-module-tabs">
   <div className="editorial-index-head"><small>CAPÍTULO {chapter.n}</small><h2>{chapter.title}</h2><span>Módulo {index+1} de {modules.length}</span><div className="editorial-index-meter"><i style={{width:((index+1)/Math.max(modules.length,1)*100)+"%"}}/></div></div>
   <button type="button" className="ya-mobile-index" aria-expanded={navOpen} onClick={()=>setNavOpen(!navOpen)}>Índice de módulos · {index+1} de {modules.length} <span aria-hidden="true">{navOpen?"−":"+"}</span></button>
   <div className={"course-module-nav"+(navOpen?" is-open":"")}>{modules.map((x,i)=><button type="button" className={i===index?"active":""} key={x.id} onClick={()=>move(i)}><span>{x.label}</span>{x.title}</button>)}</div>
   <div className="module-progress"><b>Módulo {index+1} de {modules.length}</b><div><i style={{width:(modules.length?((index+1)/modules.length*100):0)+"%"}}/></div></div>
  </div>
  <section className={"course-module ya-stage"+(index===modules.length-1?" is-last":"")} ref={stageRef} key={m.id}>
   <div className="editorial-module-intro"><span>LECCIÓN {String(index+1).padStart(2,"0")} / {String(modules.length).padStart(2,"0")}</span><span>LECTURA + PRÁCTICA</span></div>
   {index===0&&<div className="editorial-first-lesson"><small>{m.label}</small><h2>{m.title}</h2><p>{chapter.summary}</p></div>}
   {index===0&&<figure className="editorial-lesson-image">
    {chapter.id==="c04"?<div className="editorial-skin-visual"><img src={editorialCover(chapter.id).src} alt={editorialCover(chapter.id).alt}/><img src="/assets/chapter4/cap4-4.1-capas-piel.svg" alt="Infografía de las capas de la piel"/></div>:<img src={editorialCover(chapter.id).src} alt={editorialCover(chapter.id).alt}/>}
    <figcaption>{feature.eyebrow} · Yeppo Academy</figcaption></figure>}
   {index===0&&<ChapterMap id={chapter.id}/>}
   {index===0&&(chapter.id==="c10"||chapter.id==="c12")&&<div className="yeppo-evidence-key" aria-label="Cómo leer la evidencia de ingredientes"><strong>Cómo leer la evidencia</strong><div><span>Uso tradicional</span><span>Laboratorio</span><span>Estudios en personas</span><span>Producto terminado</span></div><p>Son preguntas distintas. La historia y los ensayos de un ingrediente no demuestran el resultado de cualquier cosmético que lo incluya.</p></div>}
   {index===0&&chapter.id==="c10"&&<div className="yeppo-ingredient-map"><div><small>YEPPO / INGREDIENTES CON HISTORIA</small><h3>Centella: de la tradición a la fórmula</h3><p>Una misma planta puede aparecer en relatos culturales, investigaciones y cosméticos. Cada contexto permite afirmar cosas diferentes.</p></div><ol><li><b>01</b><strong>Uso tradicional</strong><span>Gotu kola en distintas regiones de Asia: una historia de uso, no una prueba clínica para cualquier crema.</span></li><li><b>02</b><strong>Compuestos estudiados</strong><span>Asiaticósido y madecasósido figuran entre los componentes que motivaron investigación.</span></li><li><b>03</b><strong>Fórmula real</strong><span>Importan el INCI completo, la concentración, la tolerancia y cómo se usa el producto.</span></li><li><b>04</b><strong>Consejo en Yeppo</strong><span>Explica el beneficio cosmético con precisión y evita prometer curación.</span></li></ol><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3834700/" target="_blank" rel="noopener noreferrer">Fuente: revisión científica sobre Centella asiatica ↗</a></div>}
   <div dangerouslySetInnerHTML={{__html:m.html}}/>
   {index===0&&<MiniDecision chapterId={chapter.id}/>}
   {videoSrc&&<div className="ya-video"><iframe src={videoSrc} title={"Video · "+m.title} loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div>}
   {chapter.assessmentRequired&&index===modules.length-1&&<div className="ya-alert" style={{background:passed?"#eaf8f2":"#fff4e5",color:passed?"#136c4a":"#874900"}}><b>{passed?"Evaluación aprobada":"Evaluación obligatoria"}</b><br/>{assessmentMsg||"Completa la evaluación del capítulo con al menos 80% antes de marcarlo como finalizado."}</div>}
   <div className="ya-module-actions">
    <button className="ya-btn ya-secondary" disabled={index===0} onClick={()=>move(index-1)}>← Anterior</button>
    {index<modules.length-1?<button className="ya-btn ya-primary" onClick={()=>move(index+1)}>Siguiente →</button>:previewMode?<a className="ya-btn ya-pink" href={chapter.n<14?"/revision/c"+String(chapter.n+1).padStart(2,"0"):"/revision#rutas"}>{chapter.n<14?"Ir al siguiente capítulo →":"Volver a las rutas →"}</a>:<button className="ya-btn ya-pink" disabled={chapter.assessmentRequired&&!passed} onClick={complete}>{done?"✓ Capítulo completado":chapter.assessmentRequired&&!passed?"Aprueba la evaluación":"Completar capítulo"}</button>}
   </div>
  </section>
  <aside className="editorial-context" aria-label="Contexto y consejos del capítulo">
   <div className="editorial-context-card editorial-context-story"><small>LO ESENCIAL</small><h3>{feature.eyebrow}</h3><p>{feature.story}</p>{chapter.id==="c02"&&<p className="editorial-data-note">Dato de mercado: indica el año y la fuente al citar cifras de importación. Revisado en septiembre de 2026; no son ventas de Yeppo. <a href="https://www.latercera.com/pulso/noticia/el-boom-de-la-cosmetica-coreana-quienes-estan-detras-de-su-explosion-de-ventas/" target="_blank" rel="noopener noreferrer">Fuente ↗</a></p>}{feature.source&&<a href={feature.source} target="_blank" rel="noopener noreferrer">Consultar fuente ↗</a>}</div>
   <div className="editorial-context-card editorial-context-tip"><small>APLICARLO EN TIENDA</small><h3>Consejo Yeppo</h3><p>{feature.tip}</p></div>
   <div className="editorial-context-card editorial-context-photo"><img src={feature.product?editorialImage(chapter.id):"/assets/editorial/yeppo-store.jpg"} alt={feature.product?feature.alt:"Espacio y productos de Yeppo"}/><span>{feature.product?"PRODUCTO DEL CATÁLOGO YEPPO":"YEPPO · APLICACIÓN EN TIENDA"}</span></div>
  </aside>
  <nav className="ya-mobile-step" aria-label="Navegación del capítulo"><button disabled={index===0} onClick={()=>move(index-1)}>← Anterior</button><span>{index+1} de {modules.length}</span><button disabled={index===modules.length-1} onClick={()=>move(index+1)}>Siguiente →</button></nav>
 </div></div>
}
