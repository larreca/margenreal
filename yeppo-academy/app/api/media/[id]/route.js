import {getDb} from "@/lib/db";

export const runtime="nodejs";

export async function GET(_req,{params}){
 const {id}=await params;
 if(!/^[0-9a-f-]{36}$/i.test(id))return new Response("No encontrado",{status:404});
 const sql=getDb();if(!sql)return new Response("No disponible",{status:503});
 try{
  const rows=await sql`SELECT content_type,data_base64 FROM academy_media WHERE id=${id}::uuid LIMIT 1`;
  if(!rows.length)return new Response("No encontrado",{status:404});
  return new Response(Buffer.from(rows[0].data_base64,"base64"),{headers:{"Content-Type":rows[0].content_type,"Cache-Control":"public, max-age=31536000, immutable","X-Content-Type-Options":"nosniff"}});
 }catch{return new Response("No disponible",{status:503})}
}
