import { SignJWT,jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE="yeppo_academy_session";
const secret=()=> {
  const v=process.env.AUTH_SECRET||process.env.SETUP_TOKEN;
  return v?new TextEncoder().encode(v):null;
};
export function authConfigured(){return Boolean(secret());}

export async function setSession(user){
  const key=secret(); if(!key) throw new Error("AUTH_NOT_CONFIGURED");
  const token=await new SignJWT({
    email:user.email,role:user.role,organizationId:user.organization_id||null,name:user.name||user.email
  }).setProtectedHeader({alg:"HS256"}).setSubject(String(user.id)).setIssuedAt().setExpirationTime("12h").sign(key);
  const jar=await cookies();
  jar.set(SESSION_COOKIE,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:43200});
}
export async function clearSession(){
  const jar=await cookies(); jar.set(SESSION_COOKIE,"",{httpOnly:true,path:"/",maxAge:0});
}
export async function readSession(){
  const key=secret(); if(!key) return null;
  const jar=await cookies(); const token=jar.get(SESSION_COOKIE)?.value; if(!token) return null;
  try{
    const {payload}=await jwtVerify(token,key);
    return {id:payload.sub,email:payload.email,role:payload.role,organizationId:payload.organizationId||null,name:payload.name||payload.email};
  }catch{return null}
}
export async function requireSession(){const s=await readSession();if(!s) redirect("/login");return s}
export async function requireRole(roles){const s=await requireSession();if(!roles.includes(s.role)) redirect("/academy");return s}
export const canEdit=(r)=>["super_admin","editor"].includes(r);
export const canReview=(r)=>["super_admin","reviewer"].includes(r);
export const canManagePeople=(r)=>["super_admin","support","company_admin"].includes(r);
