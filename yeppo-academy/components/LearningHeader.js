'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
export default function LearningHeader({preview=false,session}){
 const path=usePathname();const [open,setOpen]=useState(false);const root=preview?'/revision':'/academy';
 return <><a className="learn-skip" href="#learning-main">Saltar al contenido</a><header className="learn-header"><Link href={root} className="learn-brand">YEPPO<span>ACADEMY</span></Link><button className="learn-menu" aria-label="Abrir navegación" aria-expanded={open} onClick={()=>setOpen(!open)}>Menú</button><nav aria-label="Navegación principal" className={open?'is-open':''}>
 {[[root,'Mi aprendizaje'],[root+'/explorar','Explorar'],[root+'/perfil?tab=favoritos','Favoritos']].map(([href,label])=><Link key={label} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}
 <Link href={root+'/perfil'} className="learn-profile-link">Mi perfil</Link>
 {preview?<Link href="/login" className="learn-login">Iniciar sesión</Link>:<details className="learn-account"><summary>Mi cuenta</summary><div><Link href="/library">Biblioteca</Link><Link href="/tutor">Buscar en el contenido</Link><Link href="/certificates">Certificado</Link>{['super_admin','editor','reviewer','support'].includes(session?.role)&&<Link href="/admin">Administración</Link>}<button onClick={async()=>{await fetch('/api/logout',{method:'POST'});window.location.assign('/login');}}>Cerrar sesión</button></div></details>}
 </nav></header>{preview&&<div className="learn-preview">Acceso abierto · Tu avance y tus notas se guardan en este navegador. <Link href="/login">Usa tu cuenta para guardar entre dispositivos.</Link></div>}</>;
}
