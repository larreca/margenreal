import LearningHeader from '@/components/LearningHeader';
import LearningDashboard from '@/components/LearningDashboard';
import {getAcademyData,getAcademyDataForUser} from '@/lib/academy';
import {getLearningState} from '@/lib/learning';
import {requireSession} from '@/lib/auth';
import {editableChapter} from '@/lib/content-utils';
import {editorialCover} from '@/lib/editorial';
import {readMinutes} from '@/lib/learning-model';
export default async function LearningPage({preview=false,view='home'}){
 const s=preview?null:await requireSession();const data=preview?await getAcademyData():await getAcademyDataForUser(s);let initialStates={},error='';
 if(s)try{initialStates=await getLearningState(s.id);}catch{error='No se pudo recuperar tu avance. Reintenta antes de continuar.';}
 const schools=data.schools.map(sc=>({...sc,chapters:sc.chapters.map(ch=>{const c=editableChapter(ch),cover=editorialCover(c.id);if(initialStates[c.id]?.legacyCompleted)initialStates[c.id]={...initialStates[c.id],completed:Object.fromEntries(c.modules.map(m=>[m.id,true])),passed:true};return {id:c.id,n:c.n,title:c.title,summary:c.summary,assessmentRequired:c.assessmentRequired,cover:c.coverImage||cover.src,coverAlt:c.coverAlt||cover.alt,modules:c.modules.map(m=>({id:m.id,title:m.title,minutes:readMinutes(m.html)}))};})}));
 return <div className="learning-app"><LearningHeader preview={preview} session={s}/>{error?<main id="learning-main" className="learn-main"><p role="alert">{error}</p></main>:<LearningDashboard schools={schools} initialStates={initialStates} preview={preview} name={s?.name} view={view}/>}</div>;
}
