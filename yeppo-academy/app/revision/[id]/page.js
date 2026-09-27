import Link from "next/link";
import {notFound} from "next/navigation";
import ChapterReader from "@/components/ChapterReader";
import {getChapter} from "@/lib/academy";

export default async function RevisionChapter({params}){
 const {id}=await params;
 const chapter=await getChapter(id);
 if(!chapter||chapter.n>11)notFound();
 return <main><div className="ya-reader ya-reader-top"><Link href="/revision">← Volver al mapa</Link><span>Vista de revisión · {chapter.schoolName} · <Link href={"/revision/editar/"+id}>Editar contenido ↗</Link></span></div><ChapterReader chapter={chapter} previewMode/></main>;
}
