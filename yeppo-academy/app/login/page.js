import Link from "next/link";
import {redirect} from "next/navigation";
import {readSession,authConfigured} from "@/lib/auth";
import {getDb} from "@/lib/db";
import LoginForm from "@/components/LoginForm";

export const metadata={title:"Ingresar · Yeppo Academy"};
export default async function Login(){
 if(await readSession())redirect("/academy");
 const ready=Boolean(authConfigured()&&getDb());
 return <main className="editorial-login"><section className="editorial-login-photo"><img src="/assets/editorial/chile-model.jpg" alt="Retrato editorial de belleza fotografiado en Santiago de Chile"/><div><small>YEPPO · ACADEMIA K-BEAUTY</small><h1>Aprender para <em>hacer crecer.</em></h1><p>Una formación cercana, visual y práctica para asesorar con criterio.</p></div></section><section className="editorial-login-panel"><div className="editorial-login-brand">YEPPO <span>ACADEMIA</span></div><div className="editorial-login-card"><small>TU ESPACIO DE APRENDIZAJE</small><h2>{ready?"Bienvenido de nuevo":"Tu espacio de aprendizaje"}</h2><p>{ready?"Ingresa con la cuenta de tu empresa para continuar tus lecciones y guardar el progreso.":"Las lecciones ya están abiertas para que explores la academia y pruebes su contenido."}</p>{ready?<LoginForm/>:<div className="editorial-login-pending"><b>Acceso personal en preparación</b><p>Cuando estén activas las cuentas, aquí podrás guardar tu avance y retomar la ruta. Por ahora puedes recorrer los capítulos disponibles sin ingresar.</p></div>}<div className="editorial-login-links"><Link href="/revision">Explorar la academia →</Link></div></div><small className="editorial-login-bottom">© Yeppo · Formación B2B</small></section></main>
}
