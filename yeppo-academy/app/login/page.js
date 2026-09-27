import Link from "next/link";
import {redirect} from "next/navigation";
import {readSession,authConfigured} from "@/lib/auth";
import {getDb} from "@/lib/db";
import LoginForm from "@/components/LoginForm";

export const metadata={title:"Ingresar · Yeppo Academy"};
export default async function Login(){
 if(await readSession())redirect("/academy");
 const ready=Boolean(authConfigured()&&getDb());
 return <main className="editorial-login"><section className="editorial-login-photo"><img src="/assets/editorial/portrait.jpg" alt="Retrato fotográfico para Yeppo Academy"/><div><small>YEPPO · ACADEMIA K-BEAUTY</small><h1>Aprender para <em>hacer crecer.</em></h1><p>Una formación cercana, visual y práctica para asesorar con criterio.</p></div></section><section className="editorial-login-panel"><div className="editorial-login-brand">YEPPO <span>ACADEMIA</span></div><div className="editorial-login-card"><small>TU ESPACIO DE APRENDIZAJE</small><h2>Bienvenido de nuevo</h2><p>Ingresa con la cuenta de tu empresa para continuar tus lecciones y guardar el progreso.</p>{ready?<LoginForm/>:<div className="editorial-login-pending"><b>Acceso de cuentas en preparación</b><p>El formulario ya está diseñado. Para habilitar ingresos y progreso compartido falta conectar la base de datos y crear las cuentas; mientras tanto, puedes recorrer la academia y editar borradores en esta versión de revisión.</p></div>}<div className="editorial-login-links"><Link href="/revision">Explorar la academia →</Link><Link href="/revision/editar/c01">Editar borradores →</Link></div></div><small className="editorial-login-bottom">© Yeppo · Formación B2B</small></section></main>
}
