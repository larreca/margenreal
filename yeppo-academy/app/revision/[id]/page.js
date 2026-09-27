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
 if(!chapter||chapter.n>12)notFound();
 return <main><div className="ya-reader ya-reader-top"><Link href="/revision">← Volver a las rutas</Link><span>Yeppo Academy · {chapter.schoolName}</span></div><ChapterReader chapter={chapter} previewMode/></main>;
}
