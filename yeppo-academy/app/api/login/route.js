import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {getDb} from "@/lib/db";
import {setSession} from "@/lib/auth";
export async function POST(req){
  try{
    const sql=getDb();if(!sql)return NextResponse.json({error:"Base de datos no configurada."},{status:503});
    const {email,password}=await req.json();
    const rows=await sql`SELECT id,email,name,password_hash,role,organization_id,active FROM academy_users WHERE email=${String(email||"").toLowerCase()} LIMIT 1`;
    const u=rows[0];if(!u||!u.active||!(await bcrypt.compare(password||"",u.password_hash)))return NextResponse.json({error:"Usuario o contraseña incorrectos."},{status:401});
    await sql`UPDATE academy_users SET last_login_at=NOW() WHERE id=${u.id}::uuid`;
    await setSession(u);return NextResponse.json({ok:true,role:u.role});
  }catch{return NextResponse.json({error:"No fue posible iniciar sesión."},{status:500})}
}
