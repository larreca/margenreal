import Link from "next/link";
import {requireRole} from "@/lib/auth";
import {getAdminChapterRows} from "@/lib/academy";

export const metadata={title:"Editar academia · Yeppo Academy"};

export default async function EditAcademy(){
 const session=await requireRole(["super_admin","editor","reviewer"]);
 const chapters=await getAdminChapterRows();
 return <main className="ya-container"><div className="ya-head"><div><small>YEPPO ACADEMY · EDICIÓN</small><h1>Editar la academia</h1><p>Elige un capítulo para editar texto, videos, imágenes e infografías. Guarda el borrador en el servidor y revísalo antes de publicarlo.</p></div><Link className="ya-btn ya-secondary" href="/revision">Ver academia ↗</Link></div><div className="ya-list">{chapters.map(c=><div className="ya-row" key={c.id}><strong>#{String(c.n).padStart(2,"0")}</strong><div><strong>{c.title}</strong><br/><span>{c.school} · {c.status==="seed"?"Contenido base":c.status} · v{c.version}</span></div><Link className="ya-btn ya-secondary" href={"/admin/content/"+c.id}>{session.role==="reviewer"?"Revisar":"Editar"}</Link></div>)}</div></main>;
}
