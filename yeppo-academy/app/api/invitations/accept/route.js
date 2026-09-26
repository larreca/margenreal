import {NextResponse} from "next/server";
import {createHash} from "crypto";
import bcrypt from "bcryptjs";
import {getDb} from "@/lib/db";
import {setSession} from "@/lib/auth";
const h=t=>createHash("sha256").update(t).digest("hex");
export async function POST(req){
 const sql=getDb();if(!sql)return NextResponse.json({error:"Base de datos no configurada."},{status:503});
 try{
  const {token,name,password}=await req.json();if(!token||!name||!password||password.length<10)return NextResponse.json({error:"Completa todos los datos y usa una contraseña de al menos 10 caracteres."},{status:400});
  const rows=await sql`SELECT id,organization_id,email,role,expires_at,accepted_at FROM academy_invitations WHERE token_hash=${h(token)} LIMIT 1`;
  const inv=rows[0];if(!inv||inv.accepted_at||new Date(inv.expires_at)<new Date())return NextResponse.json({error:"La invitación no existe, venció o ya fue utilizada."},{status:400});
  const exists=await sql`SELECT id FROM academy_users WHERE email=${inv.email} LIMIT 1`;if(exists[0])return NextResponse.json({error:"Ya existe una cuenta con este email."},{status:409});
  const hash=await bcrypt.hash(password,12);
  const users=await sql`INSERT INTO academy_users(organization_id,email,name,password_hash,role) VALUES(${inv.organization_id}::uuid,${inv.email},${name.trim()},${hash},${inv.role}) RETURNING id,email,name,role,organization_id`;
  await sql`UPDATE academy_invitations SET accepted_at=NOW() WHERE id=${inv.id}::uuid`;
  await setSession(users[0]);return NextResponse.json({ok:true});
 }catch(e){return NextResponse.json({error:e.message||"No se pudo crear la cuenta."},{status:500})}
}
