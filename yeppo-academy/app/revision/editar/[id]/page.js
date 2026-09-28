import {notFound} from "next/navigation";
import {redirect} from "next/navigation";
import {requireRole} from "@/lib/auth";
import {getChapterForEditor} from "@/lib/academy";

export const metadata={title:"Editar borrador · Yeppo Academy"};
export default async function EditReview({params}){
 const {id}=await params;
 await requireRole(["super_admin","editor","reviewer"]);
 if(!/^c\d{2}$/.test(id)||!(await getChapterForEditor(id)))notFound();
 redirect("/admin/content/"+id);
}
