import {NextResponse} from "next/server";
import {readSession,canEdit} from "@/lib/auth";
import {ensureSchema,getDb} from "@/lib/db";

export const runtime="nodejs";
const MAX_BYTES=2*1024*1024;
const supported=new Set(["image/jpeg","image/png","image/webp"]);

function matchesSignature(bytes,type){
 if(type==="image/jpeg")return bytes[0]===0xff&&bytes[1]===0xd8&&bytes[2]===0xff;
 if(type==="image/png")return bytes.slice(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
 if(type==="image/webp")return bytes.toString("ascii",0,4)==="RIFF"&&bytes.toString("ascii",8,12)==="WEBP";
 return false;
}

export async function POST(req){
 const user=await readSession();
 if(!user||!canEdit(user.role))return NextResponse.json({error:"Inicia sesión con una cuenta editora."},{status:401});
 const sql=getDb();if(!sql)return NextResponse.json({error:"La base de datos aún no está conectada."},{status:503});
 const form=await req.formData();const file=form.get("file"),chapterId=String(form.get("chapterId")||"");
 if(!/^c\d{2}$/.test(chapterId)||!file||typeof file.arrayBuffer!=="function")return NextResponse.json({error:"Archivo o capítulo inválido."},{status:400});
 if(!supported.has(file.type)||file.size>MAX_BYTES||file.size===0)return NextResponse.json({error:"Usa JPG, PNG o WebP de hasta 2 MB."},{status:400});
 const bytes=Buffer.from(await file.arrayBuffer());
 if(!matchesSignature(bytes,file.type))return NextResponse.json({error:"El contenido de la imagen no corresponde al formato declarado."},{status:400});
 try{
  await ensureSchema();
  const rows=await sql`INSERT INTO academy_media(chapter_id,content_type,data_base64,size_bytes,uploaded_by)
    VALUES(${chapterId},${file.type},${bytes.toString("base64")},${bytes.length},${user.id}::uuid) RETURNING id`;
  return NextResponse.json({url:"/api/media/"+rows[0].id});
 }catch{return NextResponse.json({error:"No se pudo guardar la imagen."},{status:500})}
}
