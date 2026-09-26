import {NextResponse} from "next/server";import {readSession} from "@/lib/auth";import {recordProgress} from "@/lib/academy";
export async function POST(req){const s=await readSession();if(!s)return NextResponse.json({error:"No autorizado"},{status:401});const b=await req.json();await recordProgress(s.id,b.chapterId,b.moduleId,b.percent,b.completed);return NextResponse.json({ok:true})}
