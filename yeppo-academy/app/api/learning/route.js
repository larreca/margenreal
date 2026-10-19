import {NextResponse} from 'next/server';
import {readSession} from '@/lib/auth';
import {getChapterForUser} from '@/lib/academy';
import {updateLearning} from '@/lib/learning';
export async function POST(req){
 const session=await readSession();if(!session)return NextResponse.json({error:'Inicia sesión para guardar en tu cuenta.'},{status:401});
 try{
 const input=await req.json();const {action,moduleId,text,value}=input;
 if(!['read','resume','note','favorite'].includes(action)||typeof input.chapterId!=='string')return NextResponse.json({error:'Acción inválida.'},{status:400});
 const chapter=await getChapterForUser(input.chapterId,session);
 if(!chapter||(action!=='favorite'&&!chapter.modules.some(m=>m.id===moduleId)))return NextResponse.json({error:'Lección no disponible.'},{status:400});
 if(action==='note'&&(typeof text!=='string'||text.length>10000))return NextResponse.json({error:'La nota debe tener hasta 10.000 caracteres.'},{status:400});
 if(action==='favorite'&&typeof value!=='boolean')return NextResponse.json({error:'Valor inválido.'},{status:400});
 return NextResponse.json({state:await updateLearning(session.id,chapter,input)});
 }catch{return NextResponse.json({error:'No se pudo guardar. Reintenta; tu avance no se ha confirmado.'},{status:503});}
}
