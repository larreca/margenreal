"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
export default function SetupForm(){
 const [error,setError]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e){
  e.preventDefault();setBusy(true);setError("");const f=new FormData(e.currentTarget);
  const r=await fetch("/api/setup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:f.get("token"),name:f.get("name"),email:f.get("email"),password:f.get("password")})});
  const j=await r.json();setBusy(false);if(!r.ok)return setError(j.error||"No fue posible configurar.");
  router.push("/admin");router.refresh();
 }
 return <form onSubmit={submit}><div className="ya-field"><label>Token de configuración</label><input name="token" type="password" required/></div><div className="ya-field"><label>Nombre</label><input name="name" required/></div><div className="ya-field"><label>Email</label><input name="email" type="email" required/></div><div className="ya-field"><label>Contraseña inicial</label><input name="password" type="password" minLength={10} required/></div>{error&&<div className="ya-alert">{error}</div>}<button className="ya-btn ya-primary" style={{width:"100%"}} disabled={busy}>{busy?"Configurando…":"Crear Super Admin"}</button></form>
}
