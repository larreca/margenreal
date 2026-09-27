import {notFound} from "next/navigation";
import {getChapter} from "@/lib/academy";
import ReviewEditor from "@/components/ReviewEditor";

export default async function EditReview({params}){
 const {id}=await params;
 const chapter=await getChapter(id);
 if(!chapter)notFound();
 return <ReviewEditor initial={chapter}/>;
}
