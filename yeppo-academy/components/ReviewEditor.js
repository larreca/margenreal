"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {videoEmbedUrl} from "@/lib/video";
import ChapterReader from "@/components/ChapterReader";

const storageKey=id=>"yeppo-review-"+id;

export default function ReviewEditor({initial}){
 const [chapter,setChapter]=useState(initial);
 const [index,setIndex]=useState(0);
 const [preview,setPreview]=useState(false);
 const [message,setMessage]=useState("Los cambios quedan en este navegador hasta que exportes el archivo.");
 const surface=useRef(null);
 useEffect(()=>{try{const saved=localStorage.getItem(storageKey(initial.id));if(saved)setChapter(JSON.parse(saved))}catch{}},[initial.id]);
 const current=chapter.modules[index];
 function capture(){return {...chapter,modules:chapter.modules.map((m,i)=>i===index?{...m,html:surface.current?.innerHTML??m.html}:m)}}
 function switchTo(i){setChapter(capture());setIndex(i)}
 function meta(key,value){setChapter(c=>({...c,[key]:value}))}
 function module(key,value){setChapter(c=>({...c,modules:c.modules.map((m,i)=>i===index?{...m,[key]:value}:m)}))}
 function save(){const next=capture();localStorage.setItem(storageKey(initial.id),JSON.stringify(next));setChapter(next);setMessage("Guardado en este navegador. Exporta el JSON para conservarlo fuera de él.")}
 function exportFile(){const next=capture();localStorage.setItem(storageKey(initial.id),JSON.stringify(next));const blob=new Blob([JSON.stringify({schools:[{chapters:[next]}]},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="yeppo-"+next.id+"-revision.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage("Archivo exportado. Más adelante se puede cargar en el panel de administración.")}
 function addModule(){const next=capture();const n=next.modules.length+1;setChapter({...next,modules:[...next.modules,{id:"review-"+Date.now(),label:next.n+"."+n,title:"Nuevo módulo",html:"<div class='reading-copy'><h4>Nuevo contenido</h4><p>Escribe aquí.</p></div>",videoUrl:""}]});setIndex(n-1)}
 function showPreview(){setChapter(capture());setPreview(true);window.scrollTo({top:0,behavior:"smooth"})}
 return <main className="ya-container"><div className="ya-head"><div><small>EDICIÓN DE REVISIÓN · CAPÍTULO {chapter.n}</small><h1>Editar la academia</h1><p>Modifica textos y videos, guarda en este navegador y exporta tus cambios. El diseño real se puede ver desde el mapa de revisión.</p></div><Link className="ya-btn ya-secondary" href={chapter.n<=13?"/revision/"+chapter.id:"/revision"}>{chapter.n<=13?"Ver diseño del capítulo ↗":"Ver mapa de capítulos ↗"}</Link></div>
  <div className="ya-card" style={{padding:20,marginBottom:18,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}><Link className="ya-btn ya-secondary" href="/revision">← Todos los capítulos</Link><button className="ya-btn ya-secondary" onClick={()=>preview?setPreview(false):showPreview()}>{preview?"Volver a editar":"Vista previa con mis cambios"}</button><button className="ya-btn ya-primary" onClick={save}>Guardar en este navegador</button><button className="ya-btn ya-pink" onClick={exportFile}>Exportar cambios JSON</button><span style={{fontSize:13}}>{message}</span></div>
  {preview?<ChapterReader chapter={chapter} previewMode/>:<div className="ya-editor"><aside className="ya-card ya-editor-side"><small>MÓDULOS</small>{chapter.modules.map((m,i)=><button key={m.id} className={i===index?"active":""} onClick={()=>switchTo(i)}><b>{m.label}</b><br/>{m.title}</button>)}<button className="ya-btn ya-secondary" onClick={addModule}>+ Nuevo módulo</button></aside><div className="ya-editor-main"><div className="ya-card ya-editor-meta"><div className="ya-field"><label>Título del capítulo</label><input value={chapter.title||""} onChange={e=>meta("title",e.target.value)}/></div><div className="ya-field"><label>Resumen</label><textarea rows={3} value={chapter.summary||""} onChange={e=>meta("summary",e.target.value)}/></div><div className="ya-field"><label>Título de este módulo</label><input value={current?.title||""} onChange={e=>module("title",e.target.value)}/></div><div className="ya-field"><label>Video del módulo (YouTube o Vimeo)</label><input type="url" placeholder="https://www.youtube.com/watch?v=…" value={current?.videoUrl||""} onChange={e=>module("videoUrl",e.target.value)}/>{current?.videoUrl&&!videoEmbedUrl(current.videoUrl)&&<small>Usa un enlace HTTPS de YouTube o Vimeo.</small>}</div></div><div className="ya-editor-toolbar"><span>Haz clic en el texto para editarlo. Puedes usar los controles del navegador para dar formato.</span></div><div key={current?.id} ref={surface} className="ya-edit coursebook" contentEditable suppressContentEditableWarning dangerouslySetInnerHTML={{__html:current?.html||""}}/></div></div>}
 </main>
}
