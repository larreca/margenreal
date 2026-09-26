import {NextResponse} from "next/server";import {readSession} from "@/lib/auth";import {searchAcademy} from "@/lib/academy";
export async function GET(req){const s=await readSession();if(!s)return NextResponse.json({error:"No autorizado"},{status:401});const q=new URL(req.url).searchParams.get("q")||"";return NextResponse.json({results:await searchAcademy(q)})}
