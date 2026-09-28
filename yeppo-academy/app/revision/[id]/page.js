import Link from "next/link";
import {notFound} from "next/navigation";
import ChapterReader from "@/components/ChapterReader";
import {getChapter} from "@/lib/academy";

export async function generateMetadata({params}){
 const {id}=await params;const c=await getChapter(id);
 return {title:c?`${c.title} · Yeppo Academy`:"Capítulo · Yeppo Academy"};
}
export default async function RevisionChapter({params}){
 const {id}=await params;
 const chapter=await getChapter(id);
 if(!chapter||chapter.n>14)notFound();
 return <main><nav className="ya-reader ya-reader-top chapter-dashboard-nav" aria-label="Navegación de la lección"><Link href="/revision" className="chapter-dashboard-logo">YEPPO<small>ACADEMY</small></Link><div><Link href="/revision">← Rutas de aprendizaje</Link><span>Capítulo {chapter.n} · {chapter.schoolName}</span></div></nav><ChapterReader chapter={chapter} previewMode/></main>;
}
