"use client";import {useState} from "react";
export default function AccessManager({organizationId,chapters,initialAssignments,role}){
 const [map,setMap]=useState(()=>Object.fromEntries(initialAssignments.map(a=>[a.chapter_id,{available:a.available,required:a.required}])));
 const [saving,setSaving]=useState("");
 async function change(id,next){
  setMap(m=>({...m,[id]:next}));setSaving(id);
  const r=await fetch("/api/admin/access",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({organizationId,chapterId:id,...next})});
  setSaving("");if(!r.ok){const j=await r.json();alert(j.error||"No se pudo guardar")}
 }
 const yeppo=["super_admin","support"].includes(role);
 return <div className="ya-list">{chapters.map(c=>{const v=map[c.id]||{available:true,required:false};return <div className="ya-row" key={c.id} style={{gridTemplateColumns:"72px 1fr auto auto"}}>
  <strong>#{String(c.n).padStart(2,"0")}</strong><div><strong>{c.title}</strong><br/><span>{c.school}</span></div>
  <label style={{display:"flex",gap:7,alignItems:"center",fontSize:13}}><input type="checkbox" checked={v.available} disabled={!yeppo||saving===c.id} onChange={e=>change(c.id,{...v,available:e.target.checked,required:e.target.checked?v.required:false})}/> Disponible</label>
  <label style={{display:"flex",gap:7,alignItems:"center",fontSize:13}}><input type="checkbox" checked={v.required} disabled={!v.available||saving===c.id} onChange={e=>change(c.id,{...v,required:e.target.checked})}/> Obligatorio</label>
 </div>})}</div>
}
