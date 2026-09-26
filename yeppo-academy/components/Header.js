"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
export default function Header({session}){
 const router=useRouter();
 async function logout(){await fetch("/api/logout",{method:"POST"});router.push("/login");router.refresh()}
 const admin=["super_admin","editor","reviewer","support"].includes(session?.role);
 return <header className="ya-header"><div className="ya-header-in"><Link className="ya-brand" href="/academy"><span className="ya-logo">Y</span><span><b>Yeppo B2B Academy</b><small>De comprar K-Beauty a saber vender K-Beauty</small></span></Link><nav className="ya-nav"><Link href="/academy">Mapa</Link><Link href="/library">Biblioteca</Link><Link href="/tutor">Tutor</Link><Link href="/certificates">Certificación</Link>{admin&&<Link href="/admin">Administración</Link>}{session?.role==="company_admin"&&<Link href="/team">Mi equipo</Link>}<button onClick={logout}>Salir</button></nav></div></header>
}
