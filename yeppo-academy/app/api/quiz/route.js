import {NextResponse} from "next/server";
import {updateLearning} from '@/lib/learning';
import {readSession} from "@/lib/auth";
import {getChapterForUser,recordQuizAttempt} from "@/lib/academy";
import {gradeChapterQuiz} from "@/lib/chapter-assessment";

export async function POST(req){
  const session=await readSession();
  if(!session)return NextResponse.json({error:"No autorizado"},{status:401});
  try{
    const {chapterId,answers}=await req.json();
    const chapter=await getChapterForUser(chapterId,session);
    if(!chapter?.assessmentRequired||!Array.isArray(answers))return NextResponse.json({error:"Evaluación inválida"},{status:400});
    const html=chapter.modules.at(-1)?.html||"";
    let grade;
    try{grade=gradeChapterQuiz(html,answers)}catch(e){return NextResponse.json({error:e.message},{status:400})}
    const result=await recordQuizAttempt(session.id,chapterId,grade,answers);
    await updateLearning(session.id,chapter,{action:"sync"});
    return NextResponse.json(result);
  }catch{
    return NextResponse.json({error:"No se pudo evaluar"},{status:500});
  }
}
