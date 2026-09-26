"use client";
import {useRef,useState} from "react";
import {useRouter} from "next/navigation";

const BLOCKS={
 text:'<div class="reading-copy"><h4>Nuevo subtítulo</h4><p>Escribe aquí el contenido del módulo.</p></div>',
 takeaway:'<div class="module-takeaway"><b>Idea clave</b><p>Escribe aquí la conclusión que el alumno debe recordar.</p></div>',
 case:'<div class="case-story"><small>CASO REAL</small><h4>Nombre del caso</h4><p>Describe el contexto, qué ocurrió y qué principio comercial deja.</p></div>',
 tip:'<div class="commercial-tip"><b>Cómo usar esto para vender mejor</b><p>Transforma el aprendizaje en una acción comercial concreta.</p></div>',
 error:'<div class="myth-course"><details open><summary>Error frecuente</summary><p>Explica el error y cómo corregirlo.</p></details></div>',
 source:'<div class="source-course">Fuente: <a href="https://" target="_blank" rel="noopener">Agregar fuente</a></div>'
};

export default function ContentEditor({initial,role,versions=[]}){
 const router=useRouter();const [chapter,setChapter]=useState(initial);const [index,setIndex]=useState(0);const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);const surface=useRef(null);
 const canEdit=["super_admin","editor"].includes(role),canPublish=["super_admin","reviewer"].includes(role);
 const current=chapter.modules[index];

 function commitSurface(){
   if(!surface.current||!current)return chapter;
   const html=surface.current.innerHTML;
   const next={...chapter,modules:chapter.modules.map((m,i)=>i===index?{...m,html}:m)};
   setChapter(next);return next;
 }
 function setMeta(key,value){setChapter(c=>({...c,[key]:value}))}
 function setModuleTitle(value){setChapter(c=>({...c,modules:c.modules.map((m,i)=>i===index?{...m,title:value}:m)}))}
 function switchModule(i){commitSurface();setIndex(i)}
 function command(cmd,value=null){surface.current?.focus();document.execCommand(cmd,false,value)}
 function addBlock(kind){if(!canEdit)return;surface.current?.focus();document.execCommand("insertHTML",false,BLOCKS[kind]||BLOCKS.text)}
 async function action(kind,versionId=null){
   setBusy(true);setMessage("");let payload;
   if(kind==="save"){const next=commitSurface();payload={action:"save",chapter:next}}
   else payload={action:kind,chapterId:chapter.id,versionId};
   const r=await fetch("/api/admin/chapters",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
   const j=await r.json();setBusy(false);setMessage(r.ok?(kind==="save"?"Borrador guardado.":kind==="review"?"Enviado a revisión.":"Versión publicada."):(j.error||"No se pudo completar la acción."));
   if(r.ok)router.refresh();
 }
 return <div className="ya-editor">
  <aside className="ya-card ya-editor-side">
   <small style={{fontWeight:900,color:"#ed3489"}}>MÓDULOS</small>
   {chapter.modules.map((m,i)=><button key={m.id} className={i===index?"active":""} onClick={()=>switchModule(i)}><b>{m.label}</b><br/><span>{m.title}</span></button>)}
  </aside>
  <div className="ya-editor-main">
   <div className="ya-card ya-editor-meta">
    <div className="ya-field"><label>Título del capítulo</label><input value={chapter.title} disabled={!canEdit} onChange={e=>setMeta("title",e.target.value)}/></div>
    <div className="ya-field"><label>Resumen / introducción</label><textarea rows={4} value={chapter.summary} disabled={!canEdit} onChange={e=>setMeta("summary",e.target.value)}/></div>
    <div className="ya-field"><label>Título del módulo {current?.label}</label><input value={current?.title||""} disabled={!canEdit} onChange={e=>setModuleTitle(e.target.value)}/></div><label style={{display:"flex",gap:8,alignItems:"center",fontSize:13,fontWeight:800,color:"#555870"}}><input type="checkbox" checked={Boolean(chapter.assessmentRequired)} disabled={!canEdit} onChange={e=>setMeta("assessmentRequired",e.target.checked)}/> Exigir evaluación aprobada para completar este capítulo</label>
   </div>
   <div className="ya-editor-toolbar">
    <button disabled={!canEdit} onClick={()=>command("bold")}>Negrita</button><button disabled={!canEdit} onClick={()=>command("italic")}>Cursiva</button>
    <button disabled={!canEdit} onClick={()=>command("formatBlock","h4")}>Subtítulo</button><button disabled={!canEdit} onClick={()=>command("insertUnorderedList")}>Lista</button>
    <button disabled={!canEdit} onClick={()=>addBlock("text")}>+ Texto</button><button disabled={!canEdit} onClick={()=>addBlock("takeaway")}>+ Idea clave</button>
    <button disabled={!canEdit} onClick={()=>addBlock("case")}>+ Caso</button><button disabled={!canEdit} onClick={()=>addBlock("tip")}>+ Consejo comercial</button>
    <button disabled={!canEdit} onClick={()=>addBlock("error")}>+ Error frecuente</button><button disabled={!canEdit} onClick={()=>addBlock("source")}>+ Fuente</button>
   </div>
   <div key={current?.id} ref={surface} className="ya-edit coursebook" contentEditable={canEdit} suppressContentEditableWarning dangerouslySetInnerHTML={{__html:current?.html||""}}/>
   <div className="ya-editor-actions">
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{canEdit&&<><button className="ya-btn ya-primary" disabled={busy} onClick={()=>action("save")}>Guardar borrador</button><button className="ya-btn ya-secondary" disabled={busy} onClick={()=>action("review")}>Enviar a revisión</button></>}{canPublish&&<button className="ya-btn ya-pink" disabled={busy} onClick={()=>action("publish")}>Publicar versión</button>}</div>
    <a className="ya-btn ya-secondary" href={"/academy/chapter/"+chapter.id} target="_blank">Vista alumno ↗</a>
   </div>
   {message&&<div className="ya-alert" style={{background:message.includes("No se")?"#fff0f1":"#eaf8f2",color:message.includes("No se")?"#982139":"#136c4a"}}>{message}</div>}
   <div className="ya-card" style={{padding:18,marginTop:18}}><b>Historial de versiones</b><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:10}}>{versions.length?versions.map(v=><span className="ya-version" key={v.id} style={{display:"inline-flex",alignItems:"center",gap:6}}>v{v.version} · {new Date(v.published_at).toLocaleString("es-CL")}{canEdit&&<button className="ya-btn ya-secondary" style={{padding:"5px 8px"}} onClick={()=>action("restore",v.id)}>Restaurar a borrador</button>}</span>):<span className="ya-version">Aún no hay versiones anteriores publicadas.</span>}</div></div>
  </div>
 </div>
}
