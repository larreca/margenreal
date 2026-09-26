import {NextResponse} from "next/server";
import {randomBytes,createHash} from "crypto";
import {readSession,canManagePeople} from "@/lib/auth";
import {getDb} from "@/lib/db";

const hashToken=t=>createHash("sha256").update(t).digest("hex");
export async function POST(req){
 const s=await readSession();if(!s||!canManagePeople(s.role))return NextResponse.json({error:"Sin permiso"},{status:403});
 const sql=getDb();if(!sql)return NextResponse.json({error:"Base de datos no configurada."},{status:503});
 const b=await req.json();
 try{
  if(b.action==="create_org"){
   if(!["super_admin","support"].includes(s.role))return NextResponse.json({error:"Solo Yeppo puede crear empresas."},{status:403});
   if(!b.name?.trim())return NextResponse.json({error:"Ingresa el nombre de la empresa."},{status:400});
   const rows=await sql`INSERT INTO academy_organizations(name) VALUES(${b.name.trim()}) RETURNING id,name`;
   return NextResponse.json({ok:true,organization:rows[0]});
  }
  if(b.action==="invite"){
   let orgId=b.organizationId,role=b.role||"student";
   if(s.role==="company_admin"){orgId=s.organizationId;role="student"}
   if(!orgId||!b.email)return NextResponse.json({error:"Empresa y email son obligatorios."},{status:400});
   if(!["student","company_admin"].includes(role))role="student";
   const token=randomBytes(32).toString("hex"),tokenHash=hashToken(token);
   await sql`INSERT INTO academy_invitations(organization_id,email,role,token_hash,invited_by,expires_at)
     VALUES(${orgId}::uuid,${String(b.email).trim().toLowerCase()},${role},${tokenHash},${s.id}::uuid,NOW()+INTERVAL '7 days')`;
   const origin=new URL(req.url).origin;
   return NextResponse.json({ok:true,inviteUrl:origin+"/join/"+token});
  }
  if(b.action==="toggle_user"){
   if(!["super_admin","support"].includes(s.role))return NextResponse.json({error:"Sin permiso"},{status:403});
   await sql`UPDATE academy_users SET active=${Boolean(b.active)} WHERE id=${b.userId}::uuid`;
   return NextResponse.json({ok:true});
  }
  return NextResponse.json({error:"Acción inválida."},{status:400});
 }catch(e){return NextResponse.json({error:e.message||"No se pudo completar."},{status:500})}
}
