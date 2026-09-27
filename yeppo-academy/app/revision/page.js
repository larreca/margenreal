import DashboardHome from "@/components/DashboardHome";
import {getAcademyData} from "@/lib/academy";
import {extractModules} from "@/lib/content-utils";
import {editorialFor,editorialImage} from "@/lib/editorial";

export const metadata={title:"Mi aprendizaje · Yeppo Academy"};
export default async function Revision(){
 const data=await getAcademyData();
 const chapters=data.schools.flatMap(s=>s.chapters).filter(c=>c.n<=12).map(c=>({id:c.id,n:c.n,title:c.title,summary:c.summary,modules:extractModules(c).length,image:editorialImage(c.id),alt:editorialFor(c.id).alt}));
 return <DashboardHome chapters={chapters}/>;
}
