import Link from "next/link";
import {getAcademyData} from "@/lib/academy";
import {extractModules} from "@/lib/content-utils";

export const metadata={title:"Revisión · Yeppo B2B Academy"};

export default async function Revision(){
 const data=await getAcademyData();
 return <main className="ya-container">
  <div className="ya-head"><div><small>VISTA DE REVISIÓN · YEPPO B2B ACADEMY</small><h1>La academia, en pantalla real</h1><p>Explora el diseño, los módulos, las actividades y las infografías. Los capítulos 1 al 11 tienen contenido desarrollado; el resto muestra la ruta planificada.</p></div><Link className="ya-btn ya-pink" href="/revision/editar/c01">Editar textos y videos ↗</Link></div>
  {data.schools.map((school,i)=><section className="ya-school" key={school.id}><div className="ya-school-title"><span className="ya-school-num">{String(i+1).padStart(2,"0")}</span><div><h2>{school.name}</h2><p>{school.desc}</p></div></div><div className="ya-grid">{school.chapters.map(c=>c.n<=11?<Link className="ya-chapter" href={"/revision/"+c.id} key={c.id}><small>CAPÍTULO {String(c.n).padStart(2,"0")} · {c.n<=7?"BASE":"BORRADOR EDITORIAL"}</small><h3>{c.title}</h3><p>{c.summary}</p><div className="ya-chapter-foot"><span>{extractModules(c).length} módulos</span><span>Ver capítulo →</span></div></Link>:<Link className="ya-chapter" href={"/revision/editar/"+c.id} key={c.id} style={{opacity:.75}}><small>CAPÍTULO {String(c.n).padStart(2,"0")} · PLANIFICADO</small><h3>{c.title}</h3><p>{c.summary}</p><div className="ya-chapter-foot"><span>Contenido por desarrollar</span><span>Editar borrador →</span></div></Link>)}</div></section>)}
 </main>
}
