import Header from "@/components/Header";
import {requireRole} from "@/lib/auth";
import {hasDatabase,getDb} from "@/lib/db";
import {authConfigured} from "@/lib/auth";

export default async function SystemStatus(){
  const s=await requireRole(["super_admin","support"]);
  let database=false,dbMessage="DATABASE_URL no configurada";
  if(hasDatabase()){
    try{const sql=getDb();await sql`SELECT 1 AS ok`;database=true;dbMessage="Conexión a Neon correcta"}catch(e){dbMessage="DATABASE_URL existe, pero la conexión falló"}
  }
  const checks=[
    {name:"Base de datos Neon",ok:database,detail:dbMessage},
    {name:"AUTH_SECRET",ok:authConfigured(),detail:authConfigured()?"Configurado":"Falta configurar"},
    {name:"SETUP_TOKEN",ok:Boolean(process.env.SETUP_TOKEN),detail:process.env.SETUP_TOKEN?"Configurado":"Falta configurar"},
    {name:"Entorno Vercel",ok:Boolean(process.env.VERCEL),detail:process.env.VERCEL_ENV||"No detectado"},
    {name:"Build",ok:true,detail:"Aplicación compilable con Next.js"}
  ];
  return <><Header session={s}/><main className="ya-container">
    <div className="ya-head"><div><small>SISTEMA</small><h1>Diagnóstico del MVP</h1><p>Esta pantalla no muestra secretos. Solo confirma si cada dependencia necesaria para producción está disponible.</p></div></div>
    <div className="ya-list">{checks.map(x=><div className="ya-row" key={x.name}><strong style={{color:x.ok?"#157b53":"#b42318"}}>{x.ok?"OK":"FALTA"}</strong><div><strong>{x.name}</strong><br/><span>{x.detail}</span></div><span>{x.ok?"✓":"Pendiente"}</span></div>)}</div>
  </main></>
}
