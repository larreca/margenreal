"use client";
import {useEffect,useRef,useState} from "react";

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
 const [done,setDone]=useState(initialPercent>=100);
 const [passed,setPassed]=useState(initialPassed);
 const [assessmentMsg,setAssessmentMsg]=useState("");
 const stageRef=useRef(null);
 const m=modules[index]||{id:"empty",label:"",title:chapter.title,html:"<p>Contenido en preparación.</p>"};
 const shown=Math.max(initialPercent,modules.length?Math.round(((index+1)/modules.length)*100):0);

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
   setIndex(n);save(n,false);window.scrollTo({top:0,behavior:"smooth"});
 }
 async function complete(){
   if(previewMode)return;
   if(chapter.assessmentRequired&&!passed){setAssessmentMsg("Este capítulo requiere aprobar la evaluación antes de completarlo.");return}
   await save(index,true);setDone(true);
 }

 return <div className="ya-reader"><div className="coursebook ya-course-shell">
  <div className="course-cover">
   <div className="course-cover-copy">
    <span className="course-label">CAPÍTULO {chapter.n} · {chapter.schoolName}</span>
    <h2>{chapter.title}</h2>
    <p>{chapter.summary}</p>
    {chapter.tip&&<p><strong>Idea guía:</strong> {chapter.tip}</p>}
   </div>
   <div className="course-cover-data">
    <div><small>ESTRUCTURA</small><b>{modules.length}</b><span>módulos</span></div>
    <div><small>AVANCE</small><b>{done?100:shown}%</b><span>guardado</span></div>
    <div><small>FORMATO</small><b>Curso</b><span>lectura + práctica</span></div>
    <div><small>PLANTILLA</small><b>Única</b><span>estándar Cap. 1</span></div>
   </div>
  </div>
  <div className="ya-module-tabs">
   <div className="course-module-nav">{modules.map((x,i)=><button type="button" className={i===index?"active":""} key={x.id} onClick={()=>move(i)}><span>{x.label}</span>{x.title}</button>)}</div>
   <div className="module-progress"><b>Módulo {index+1} de {modules.length}</b><div><i style={{width:(modules.length?((index+1)/modules.length*100):0)+"%"}}/></div></div>
  </div>
  <section className="course-module ya-stage" ref={stageRef} key={m.id}>
   <div dangerouslySetInnerHTML={{__html:m.html}}/>
   {chapter.assessmentRequired&&index===modules.length-1&&<div className="ya-alert" style={{background:passed?"#eaf8f2":"#fff4e5",color:passed?"#136c4a":"#874900"}}><b>{passed?"Evaluación aprobada":"Evaluación obligatoria"}</b><br/>{assessmentMsg||"Completa la evaluación del capítulo con al menos 80% antes de marcarlo como finalizado."}</div>}
   <div className="ya-module-actions">
    <button className="ya-btn ya-secondary" disabled={index===0} onClick={()=>move(index-1)}>← Anterior</button>
    {index<modules.length-1?<button className="ya-btn ya-primary" onClick={()=>move(index+1)}>Siguiente →</button>:<button className="ya-btn ya-pink" disabled={chapter.assessmentRequired&&!passed} onClick={complete}>{done?"✓ Capítulo completado":chapter.assessmentRequired&&!passed?"Aprueba la evaluación":"Completar capítulo"}</button>}
   </div>
  </section>
 </div></div>
}
