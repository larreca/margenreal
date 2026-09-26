"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
export default function LoginForm(){
 const [error,setError]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e){
  e.preventDefault();setBusy(true);setError("");const fd=new FormData(e.currentTarget);
  const r=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:fd.get("email"),password:fd.get("password")})});
  const j=await r.json();setBusy(false);if(!r.ok)return setError(j.error||"No fue posible ingresar.");
  router.push(j.role==="super_admin"?"/admin":"/academy");router.refresh();
 }
 return <form onSubmit={submit}><div className="ya-field"><label>Email</label><input name="email" type="email" required autoComplete="email"/></div><div className="ya-field"><label>Contraseña</label><input name="password" type="password" required autoComplete="current-password"/></div>{error&&<div className="ya-alert">{error}</div>}<button className="ya-btn ya-primary" style={{width:"100%"}} disabled={busy}>{busy?"Ingresando…":"Ingresar a la academia"}</button></form>
}
