"use client";
import Link from "next/link";
import {useEffect,useState} from "react";

const routes=[
 ["01","Entender K-Beauty","1–3","pink"],["02","Entender la piel","4–9","lilac"],
 ["03","Productos e ingredientes","10–12","peach"],["04","Venta consultiva","13–20","sage"],
 ["05","Crecer tu negocio","21–50","lavender"],["06","Certificación Yeppo","Futuro","rose"]
];
const terms=[
 ["Ácido hialurónico","Humectante que ayuda a retener agua en una fórmula.","yeppo-aloe.jpg"],
 ["Centella asiática","Planta usada en cosmética; importa la fórmula completa.","centella.jpg"],
 ["Niacinamida","Ingrediente versátil; su efecto depende de la fórmula.","yeppo-cream.jpg"],
 ["Ceramidas","Lípidos asociados a la función de barrera.","chile-makeup.jpg"]
];
const choices=[
 ["A","Limpieza suave, hidratación y protector solar","Buen punto de partida. Pregunta qué usa hoy y prioriza tolerancia y constancia."],
 ["B","Varios activos potentes desde el primer día","Conviene simplificar: introducir muchos activos dificulta evaluar la tolerancia."],
 ["C","Elegir solo los productos virales","Vuelve a la necesidad de la persona y a la fórmula antes de recomendar."]
];
export default function DashboardHome({chapters}){
 const [progress,setProgress]=useState({});const [choice,setChoice]=useState(-1);
 useEffect(()=>{try{setProgress(JSON.parse(localStorage.getItem("yeppo-academy-progress-v1")||"{}"))}catch{}},[]);
 const completed=chapters.filter(c=>progress[c.id]?.completed).length;
 const active=chapters.find(c=>progress[c.id]&&!progress[c.id].completed)||chapters.find(c=>!progress[c.id]?.completed)||chapters[0];
 const moduleIndex=progress[active?.id]?.moduleIndex||0;
 const percent=Math.round(completed/Math.max(chapters.length,1)*100);
 const nextHref=`/revision/${active?.id||"c01"}`;
 return <main className="academy-dashboard"><div className="dash-wrap">
  <nav className="dash-nav" aria-label="Academia"><Link className="dash-logo" href="/revision">YEPPO <small>ACADEMY</small></Link><div className="dash-nav-links"><a href="#rutas">Rutas</a><a className="active" href="#aprendizaje">Mi aprendizaje</a><a href="#capitulos">Capítulos</a><a href="#glosario">Glosario</a></div><Link className="dash-nav-action" href={nextHref}>Continuar →</Link></nav>
  <div className="dash-top" id="aprendizaje">
   <div className="dash-left">
    <section className="dash-hero dash-card"><div className="dash-hero-copy"><span className="dash-eyebrow">TU ESPACIO DE APRENDIZAJE</span><h1>Aprende belleza.<br/><em>Recomienda con criterio.</em></h1><p>Capítulos prácticos de K-Beauty para aplicar en tienda y hacer crecer tu negocio con Yeppo.</p><Link className="dash-button" href={nextHref}>{progress[active?.id]?"Continuar aprendiendo":"Empezar mi ruta"}<span>→</span></Link></div><div className="dash-hero-model"><img src="/assets/editorial/chile-model.jpg" alt="Retrato editorial de belleza fotografiado en Santiago de Chile"/><span>YEPPO<br/>ACADEMY</span></div></section>
    <section className="dash-path dash-card" id="rutas"><div className="dash-title-row"><div><span className="dash-icon">◇</span><h2>Tu ruta de aprendizaje</h2></div><a href="#capitulos">Ver capítulos →</a></div><div className="dash-steps">{routes.map(([num,name,range,tone],i)=><div className="dash-step" key={num}><span className={"dash-step-dot "+tone}>{i<3?"✓":i+1}</span><b>{name}</b><small>{range==="Futuro"?"Próximamente":`Capítulos ${range}`}</small></div>)}</div></section>
    <section className="dash-simulator dash-card"><div className="dash-title-row"><div><span className="dash-icon">✦</span><h2>Simulador de clientes</h2></div><span className="dash-pill">CASO 01 / 01</span></div><p className="dash-subtitle">Practica una recomendación breve antes de atender a una persona.</p><div className="dash-sim-grid"><div className="dash-sim-photo"><img src="/assets/editorial/chile-beauty.jpg" alt="Retrato editorial de belleza"/><blockquote>“Tengo la piel mixta y quiero empezar una rutina sin usar demasiados productos.”</blockquote></div><div className="dash-sim-options"><strong>¿Qué recomendarías primero?</strong>{choices.map(([letter,label],i)=><button key={letter} className={choice===i?"selected":""} onClick={()=>setChoice(i)} type="button"><b>{letter}</b>{label}</button>)}{choice>=0&&<p role="status" className="dash-feedback">{choices[choice][2]}</p>}</div></div></section>
   </div>
   <section className="dash-phone-column" aria-label="Vista de una lección en móvil"><div className="dash-phone"><div className="dash-phone-speaker"/><div className="dash-phone-screen"><div className="dash-phone-head"><span>☰</span><b>YEPPO<small>ACADEMY</small></b><span>⌕</span></div><div className="dash-phone-crumb">MI RUTA <span>›</span> CAPÍTULO {active?.n||1}<small>MÓDULO {moduleIndex+1} DE {active?.modules||8}</small></div><span className="dash-phone-kicker">CAPÍTULO {active?.n||1} ↗</span><h2>{active?.title||"Entender K-Beauty"}</h2><p>{active?.summary||"Aprende a recomendar con criterio."}</p><div className="dash-phone-image"><img src={active?.image||"/assets/editorial/chile-makeup.jpg"} alt={active?.alt||"Fotografía de belleza"}/><span>LECCIÓN VISUAL · YEPPO</span></div><div className="dash-phone-tabs"><b>Contenido</b><span>Consejos</span><span>Recursos</span></div><div className="dash-phone-points"><strong>En este capítulo aprenderás:</strong><p>✓ Conceptos fundamentales</p><p>✓ Cómo aplicarlos en tienda</p><p>✓ Ejemplos y decisiones prácticas</p></div><Link className="dash-button" href={nextHref}>Abrir capítulo →</Link></div></div></section>
   <div className="dash-right">
    <section className="dash-course dash-card"><span className="dash-icon">▣</span><small>YEPPO ACADEMY</small><h2>Una academia que crece contigo.</h2><p><b>{chapters.length} capítulos disponibles</b> en 3 rutas. El plan completo contempla 50 capítulos.</p><Link className="dash-button" href="#capitulos">Explorar capítulos →</Link><img src="/assets/editorial/yeppo-centella.jpg" alt="Producto del catálogo Yeppo"/></section>
    <section className="dash-progress dash-card"><div className="dash-title-row"><div><span className="dash-icon">▥</span><h2>Mi progreso</h2></div><small>EN ESTE NAVEGADOR</small></div><div className="dash-progress-content"><div className="dash-ring" style={{"--progress":percent+"%"}}><div><b>{percent}%</b><span>completado</span></div></div><div className="dash-progress-stats"><p><b>{completed} / {chapters.length}</b><span>capítulos terminados</span></p><p><b>{chapters.length}</b><span>disponibles ahora</span></p><p><b>50</b><span>capítulos planificados</span></p></div></div></section>
    <section className="dash-fact dash-card"><div className="dash-title-row"><div><span className="dash-icon">✧</span><h2>Dato curioso</h2></div><Link href="/revision/c12">Ver capítulo →</Link></div><div className="dash-fact-body"><img src="/assets/editorial/centella.jpg" alt="Hoja de Centella asiatica"/><div><small>INGREDIENTES CON HISTORIA</small><h3>La centella asiática tiene una historia anterior a la cosmética moderna.</h3><p>Conoce sus usos tradicionales y cómo distinguirlos de la evidencia sobre una fórmula actual.</p></div></div></section>
   </div>
  </div>
  <div className="dash-bottom"><section className="dash-glossary dash-card" id="glosario"><div className="dash-title-row"><div><span className="dash-icon">▤</span><h2>Glosario vivo</h2></div><Link href="/revision/c10">Leer INCI →</Link></div><p className="dash-subtitle">Conceptos clave sin promesas exageradas.</p><div className="dash-glossary-grid">{terms.map(([name,description,image])=><article key={name}><img src={`/assets/editorial/${image}`} alt={name}/><h3>{name}</h3><p>{description}</p></article>)}</div></section>
   <section className="dash-next dash-card"><div className="dash-title-row"><div><span className="dash-icon">◎</span><h2>Tu próxima meta</h2></div></div><div className="dash-next-center"><div className="dash-next-star">✦</div><div><small>SIGUIENTE LECCIÓN</small><h3>Capítulo {active?.n||1}: {active?.title||"Entender K-Beauty"}</h3><p>Continúa desde el módulo {moduleIndex+1} de {active?.modules||8}.</p></div></div><Link className="dash-next-link" href={nextHref}>Ir a la lección <span>→</span></Link></section>
   <section className="dash-awards dash-card"><div className="dash-title-row"><div><span className="dash-icon">♛</span><h2>Certificación Yeppo</h2></div></div><p>Una meta para el futuro de la academia.</p><div className="dash-award-grid">{[["◇","Asesor K-Beauty"],["✧","Especialista en venta"],["♛","Yeppo B2B"]].map(([icon,name])=><div key={name}><span>{icon}</span><b>{name}</b><small>En preparación</small></div>)}</div></section></div>
  <section className="dash-chapters dash-card" id="capitulos"><div className="dash-title-row"><div><span className="dash-icon">▣</span><h2>Capítulos disponibles</h2></div><small>12 DE 50 PLANIFICADOS</small></div><div className="dash-chapter-grid">{chapters.map(c=><Link key={c.id} href={`/revision/${c.id}`}><img src={c.image} alt={c.alt}/><div><small>CAPÍTULO {String(c.n).padStart(2,"0")} · {c.modules} MÓDULOS</small><h3>{c.title}</h3><span>{progress[c.id]?.completed?"✓ Completado":progress[c.id]?"Continuar →":"Empezar →"}</span></div></Link>)}</div></section>
  <footer className="dash-footer">YEPPO ACADEMY <span>Aprende, aplica y recomienda con criterio.</span></footer>
 </div></main>;
}
