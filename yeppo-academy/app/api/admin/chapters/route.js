import {NextResponse} from "next/server";import {readSession,canEdit,canReview} from "@/lib/auth";import {saveDraft,sendForReview,publishChapter,restoreVersion} from "@/lib/academy";
export async function POST(req){
  const s=await readSession();if(!s)return NextResponse.json({error:"No autorizado"},{status:401});const body=await req.json();
  try{
    if(body.action==="save"){if(!canEdit(s.role))return NextResponse.json({error:"Sin permiso de edición"},{status:403});return NextResponse.json({ok:true,chapter:await saveDraft(body.chapter,s.id)})}
    if(body.action==="review"){if(!canEdit(s.role)&&s.role!=="super_admin")return NextResponse.json({error:"Sin permiso"},{status:403});await sendForReview(body.chapterId,s.id);return NextResponse.json({ok:true})}
    if(body.action==="publish"){if(!canReview(s.role))return NextResponse.json({error:"Sin permiso de publicación"},{status:403});await publishChapter(body.chapterId,s.id);return NextResponse.json({ok:true})}
    if(body.action==="restore"){if(!["super_admin","editor"].includes(s.role))return NextResponse.json({error:"Sin permiso"},{status:403});await restoreVersion(body.chapterId,body.versionId,s.id);return NextResponse.json({ok:true})}
    return NextResponse.json({error:"Acción inválida"},{status:400});
  }catch(e){return NextResponse.json({error:e.message||"Error al guardar"},{status:500})}
}
