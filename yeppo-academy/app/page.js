import {redirect} from "next/navigation";import {readSession} from "@/lib/auth";
export default async function Page(){const s=await readSession();redirect(s?"/academy":"/revision")}
