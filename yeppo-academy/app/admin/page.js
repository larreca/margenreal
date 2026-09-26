import Link from "next/link";
import Header from "@/components/Header";
import {requireRole} from "@/lib/auth";
import {getAdminStats,getAdminChapterRows,getOrganizationsAndUsers} from "@/lib/academy";

export default async function Admin(){
 const s=await requireRole(["super_admin","editor","reviewer","support"]);
 const [stats,chapters,people]=await Promise.all([getAdminStats(),getAdminChapterRows(),getOrganizationsAndUsers()]);
 const canContent=["super_admin","editor","reviewer"].includes(s.role);
 return <><Header session={s}/><main className="ya-container">
  <div className="ya-head"><div><small>ADMINISTRACIÓN</small><h1>Control de Yeppo Academy</h1><p>Contenido, publicación, empresas, usuarios y seguimiento desde un solo lugar.</p></div><div style={{display:"flex",gap:8}}><Link className="ya-btn ya-secondary" href="/academy">Ver academia</Link>{["super_admin","support"].includes(s.role)&&<Link className="ya-btn ya-primary" href="/admin/people">Empresas y usuarios</Link>}</div></div>
  {!stats.database&&<div className="ya-alert">La interfaz está lista, pero falta conectar DATABASE_URL en el proyecto publicado para guardar usuarios, progreso y cambios.</div>}
  <section className="ya-admin-grid">
   <div className="ya-card ya-stat"><small>Usuarios activos</small><b>{stats.users}</b></div>
   <div className="ya-card ya-stat"><small>Empresas</small><b>{stats.organizations}</b></div>
   <div className="ya-card ya-stat"><small>Capítulos completados</small><b>{stats.completions}</b></div>
   <div className="ya-card ya-stat"><small>Versiones guardadas</small><b>{stats.versions}</b></div>
  </section>
  <div className="ya-head" style={{marginTop:28}}><div><small>CONTENIDO</small><h1 style={{fontSize:34}}>50 capítulos, una sola plantilla</h1><p>El diseño no se edita por capítulo. Cada capítulo utiliza el sistema visual del Capítulo 1; aquí solo cambia contenido, imágenes, recursos y actividades.</p></div></div>
  <div className="ya-list">{chapters.map(c=><div className="ya-row" key={c.id}><strong>#{String(c.n).padStart(2,"0")}</strong><div><strong>{c.title}</strong><br/><span>{c.school} · {c.status==="seed"?"Contenido base":c.status} · v{c.version}</span></div>{canContent?<Link className="ya-btn ya-secondary" href={"/admin/content/"+c.id}>{s.role==="reviewer"?"Revisar":"Editar"}</Link>:<span>Solo lectura</span>}</div>)}</div>
 </main></>
}
