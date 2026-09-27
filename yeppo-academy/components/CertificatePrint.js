"use client";
export default function CertificatePrint({name,date,chapterCount}){
 return <div><div className="ya-card" id="academyCertificate" style={{padding:42,textAlign:"center",border:"8px solid #101858",outline:"2px solid #ed3489",outlineOffset:"-18px"}}>
  <small style={{fontWeight:900,letterSpacing:".16em",color:"#ed3489"}}>YEPPO B2B ACADEMY</small>
  <h2 style={{fontSize:42,color:"#101858",margin:"18px 0 8px"}}>Constancia de ruta inicial</h2>
  <p style={{fontSize:18,color:"#686b80"}}>Se certifica que</p><h3 style={{fontSize:34,color:"#101858",margin:"12px"}}>{name}</h3>
  <p style={{maxWidth:650,margin:"0 auto 20px",lineHeight:1.6}}>completó {chapterCount} capítulos de la etapa inicial de Yeppo B2B Academy y aprobó las evaluaciones requeridas.</p>
  <b>{date}</b>
 </div><button className="ya-btn ya-primary" style={{marginTop:15}} onClick={()=>window.print()}>Imprimir / Guardar PDF</button></div>
}
