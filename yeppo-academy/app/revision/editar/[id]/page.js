import {redirect} from "next/navigation";
import {requireRole} from "@/lib/auth";
export default async function EditReview({params}){
 await requireRole(["super_admin","editor","reviewer"]);
 const {id}=await params;
 redirect("/admin/content/"+id);
}
