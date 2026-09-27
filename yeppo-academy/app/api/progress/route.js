import {NextResponse} from "next/server";
import {readSession} from "@/lib/auth";
import {getChapterForUser,getQuizStatus,recordProgress} from "@/lib/academy";

export async function POST(req){
  const session=await readSession();
  if(!session)return NextResponse.json({error:"No autorizado"},{status:401});
  try{
    const {chapterId,moduleId,percent,completed}=await req.json();
    const chapter=await getChapterForUser(chapterId,session);
    if(!chapter||!chapter.modules.some(m=>m.id===moduleId))return NextResponse.json({error:"Capítulo o módulo inválido"},{status:400});
    if(completed&&chapter.assessmentRequired&&!(await getQuizStatus(session.id,chapterId)).passed)
      return NextResponse.json({error:"Primero debes aprobar la evaluación"},{status:403});
    const safePercent=completed?100:Math.max(0,Math.min(99,Number(percent)||0));
    await recordProgress(session.id,chapterId,moduleId,safePercent,Boolean(completed));
    return NextResponse.json({ok:true});
  }catch{
    return NextResponse.json({error:"No se pudo guardar el avance"},{status:500});
  }
}
