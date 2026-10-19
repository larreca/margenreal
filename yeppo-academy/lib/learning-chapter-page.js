import {notFound} from 'next/navigation';
import LearningHeader from '@/components/LearningHeader';
import ChapterOverview from '@/components/ChapterOverview';
import ChapterReader from '@/components/ChapterReader';
import {requireSession} from '@/lib/auth';
import {getChapter,getChapterForUser,getUserProgress,getQuizStatus} from '@/lib/academy';
import {getLearningState} from '@/lib/learning';
export default async function LearningChapterPage({params,searchParams,preview=false}){
 const {id}=await params;const query=await searchParams;const session=preview?null:await requireSession();const chapter=preview?await getChapter(id):await getChapterForUser(id,session);if(!chapter)notFound();
 let initialStates={},initialPassed=false,error='';
 if(session)try{initialStates=await getLearningState(session.id);initialPassed=(await getQuizStatus(session.id,id)).passed;const old=await getUserProgress(session.id);if(old[id]?.completed)initialStates[id]={...initialStates[id],completed:Object.fromEntries(chapter.modules.map(m=>[m.id,true])),passed:true};}catch{error='No se pudo recuperar tu avance. Reintenta antes de continuar.';}
 const lesson=chapter.modules.find(m=>m.id===query?.lesson);return <div className="learning-app"><LearningHeader preview={preview} session={session}/>{error?<main id="learning-main" className="learn-main"><p role="alert">{error}</p></main>:lesson?<main id="learning-main" className="learn-reader-main"><ChapterReader chapter={chapter} initialPassed={initialPassed} initialStates={initialStates} initialModuleId={lesson.id} previewMode={preview}/></main>:<ChapterOverview chapter={chapter} preview={preview} initialStates={initialStates}/>}</div>;
}
