import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {ensureSchema,getDb} from "@/lib/db";
import {setSession} from "@/lib/auth";
export async function POST(req){
  try{
    const {token,email,password,name}=await req.json();
    if(!process.env.SETUP_TOKEN||token!==process.env.SETUP_TOKEN)return NextResponse.json({error:"Token de configuración inválido."},{status:403});
    if(!email||!password||password.length<10)return NextResponse.json({error:"Completa email y una contraseña de al menos 10 caracteres."},{status:400});
    await ensureSchema();const sql=getDb();
    const existing=await sql`SELECT COUNT(*)::int count FROM academy_users WHERE role='super_admin'`;
    if(existing[0].count>0)return NextResponse.json({error:"La academia ya fue configurada."},{status:409});
    const hash=await bcrypt.hash(password,12);
    const rows=await sql`INSERT INTO academy_users(email,name,password_hash,role) VALUES(${email.toLowerCase()},${name||"Super Admin"},${hash},'super_admin') RETURNING id,email,name,role,organization_id`;
    await setSession(rows[0]);return NextResponse.json({ok:true});
  }catch(e){return NextResponse.json({error:e.message||"No se pudo configurar."},{status:500})}
}
