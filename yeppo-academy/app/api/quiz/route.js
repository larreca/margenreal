import {NextResponse} from "next/server";
import {readSession} from "@/lib/auth";
import {getChapterForUser,recordQuizAttempt} from "@/lib/academy";

export async function POST(req){
  const session=await readSession();
  if(!session)return NextResponse.json({error:"No autorizado"},{status:401});
  try{
    const {chapterId,answers}=await req.json();
    const chapter=await getChapterForUser(chapterId,session);
    if(!chapter?.assessmentRequired||!Array.isArray(answers))return NextResponse.json({error:"Evaluación inválida"},{status:400});
    const html=chapter.modules.at(-1)?.html||"";
    const keys=[...html.matchAll(/<[^>]*class=["'][^"']*challenge-q[^"']*["'][^>]*>/gi)]
      .map(([tag])=>tag.match(/\bdata-answer=["']([^"']+)["']/i)?.[1])
      .filter(Boolean);
    if(!keys.length||answers.length!==keys.length||answers.some(a=>typeof a!=="string"||a.length>20))
      return NextResponse.json({error:"Responde todas las preguntas"},{status:400});
    const correct=keys.reduce((count,key,index)=>count+(answers[index]===key?1:0),0);
    return NextResponse.json(await recordQuizAttempt(session.id,chapterId,correct/keys.length*100,answers));
  }catch{
    return NextResponse.json({error:"No se pudo evaluar"},{status:500});
  }
}
