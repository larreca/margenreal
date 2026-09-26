import {NextResponse} from "next/server";
import {getDb,hasDatabase} from "@/lib/db";
import {authConfigured} from "@/lib/auth";

export async function GET(){
  let database=false;
  if(hasDatabase()){
    try{const sql=getDb();await sql`SELECT 1 AS ok`;database=true}catch{}
  }
  return NextResponse.json({
    ok:true,
    app:"yeppo-b2b-academy",
    database,
    auth:authConfigured(),
    setupToken:Boolean(process.env.SETUP_TOKEN),
    environment:process.env.VERCEL_ENV||process.env.NODE_ENV||"unknown"
  },{headers:{"Cache-Control":"no-store"}});
}
