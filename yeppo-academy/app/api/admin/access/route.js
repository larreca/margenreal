import {NextResponse} from "next/server";import {readSession} from "@/lib/auth";import {setOrganizationAssignment,getOrganizationAssignments,isAvailableChapter} from "@/lib/academy";
export async function POST(req){
 const s=await readSession();if(!s)return NextResponse.json({error:"No autorizado"},{status:401});
 const b=await req.json();let orgId=b.organizationId,available=Boolean(b.available),required=Boolean(b.required);
 if(!(await isAvailableChapter(b.chapterId)))return NextResponse.json({error:"Capítulo aún no publicado"},{status:400});
 if(s.role==="company_admin"){
   orgId=s.organizationId;if(!orgId)return NextResponse.json({error:"Empresa no asignada"},{status:400});
   const rows=await getOrganizationAssignments(orgId);const current=rows.find(r=>r.chapter_id===b.chapterId);
   available=current?current.available:true;
 }else if(!["super_admin","support"].includes(s.role))return NextResponse.json({error:"Sin permiso"},{status:403});
 try{await setOrganizationAssignment(orgId,b.chapterId,available,required);return NextResponse.json({ok:true})}
 catch(e){return NextResponse.json({error:e.message||"No se pudo guardar"},{status:500})}
}
