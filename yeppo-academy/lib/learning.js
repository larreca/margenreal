import {getDb} from '@/lib/db';
import {getUserProgress,recordProgress,getQuizStatus} from '@/lib/academy';
import {assertCanConfirm,isModuleComplete,recordLessonAttempt} from '@/lib/lesson-assessment';
let schema;
export async function learningDb(){
 const sql=getDb();if(!sql)throw new Error('El guardado en tu cuenta no está disponible en este momento.');
 if(!schema)schema=sql`CREATE TABLE IF NOT EXISTS academy_learning_state (
 user_id uuid NOT NULL REFERENCES academy_users(id) ON DELETE CASCADE, chapter_id text NOT NULL,
 completed_modules jsonb NOT NULL DEFAULT '{}'::jsonb, notes jsonb NOT NULL DEFAULT '{}'::jsonb,
 favorite boolean NOT NULL DEFAULT false, current_module_id text, updated_at timestamptz NOT NULL DEFAULT NOW(),
 PRIMARY KEY(user_id,chapter_id))`.catch(e=>{schema=null;throw e});
 await schema;return sql;
}
export async function getLearningState(userId){
 const sql=await learningDb();
 const [rows,old,quizzes]=await Promise.all([sql`SELECT * FROM academy_learning_state WHERE user_id=${userId}::uuid`,getUserProgress(userId),sql`SELECT chapter_id,BOOL_OR(passed) passed FROM academy_quiz_attempts WHERE user_id=${userId}::uuid GROUP BY chapter_id`]);
 const states=Object.fromEntries(rows.map(r=>[r.chapter_id,{completed:r.completed_modules||{},notes:r.notes||{},favorite:r.favorite,moduleId:r.current_module_id,updatedAt:r.updated_at,passed:false}]));
 for(const [id,p] of Object.entries(old))if(p.completed)states[id]={...states[id],legacyCompleted:true};
 for(const q of quizzes)states[q.chapter_id]={...states[q.chapter_id],passed:q.passed};return states;
}
export async function updateLearning(userId,chapter,{action,moduleId,text,value,answers}){
 const sql=await learningDb();
 await sql`INSERT INTO academy_learning_state(user_id,chapter_id) VALUES(${userId}::uuid,${chapter.id}) ON CONFLICT DO NOTHING`;
 if(action==='read'||action==='lesson_quiz'){
 const module=chapter.modules.find(m=>m.id===moduleId);
 const existing=await sql`SELECT completed_modules FROM academy_learning_state WHERE user_id=${userId}::uuid AND chapter_id=${chapter.id}`;
 const completed=existing[0]?.completed_modules||{};
 if(action==='read')assertCanConfirm(module,{completed});
 if(action==='lesson_quiz'){
 const entry=recordLessonAttempt(module,answers,completed[moduleId]);
 await sql`UPDATE academy_learning_state SET completed_modules=jsonb_set(completed_modules,ARRAY[${moduleId}]::text[],${JSON.stringify(entry)}::jsonb),current_module_id=${moduleId},updated_at=NOW() WHERE user_id=${userId}::uuid AND chapter_id=${chapter.id}`;
 }
 }
 if(action==='read')await sql`UPDATE academy_learning_state SET completed_modules=CASE WHEN completed_modules ? ${moduleId} THEN completed_modules ELSE jsonb_set(completed_modules,ARRAY[${moduleId}]::text[],to_jsonb(NOW()::text)) END,current_module_id=${moduleId},updated_at=NOW() WHERE user_id=${userId}::uuid AND chapter_id=${chapter.id}`;
 if(action==='resume')await sql`UPDATE academy_learning_state SET current_module_id=${moduleId},updated_at=NOW() WHERE user_id=${userId}::uuid AND chapter_id=${chapter.id}`;
 if(action==='note')await sql`UPDATE academy_learning_state SET notes=jsonb_set(notes,ARRAY[${moduleId}]::text[],${JSON.stringify(text)}::jsonb),updated_at=NOW() WHERE user_id=${userId}::uuid AND chapter_id=${chapter.id}`;
 if(action==='favorite')await sql`UPDATE academy_learning_state SET favorite=${Boolean(value)},updated_at=NOW() WHERE user_id=${userId}::uuid AND chapter_id=${chapter.id}`;
 const rows=await sql`SELECT completed_modules FROM academy_learning_state WHERE user_id=${userId}::uuid AND chapter_id=${chapter.id}`;
 if(action==='read'||action==='sync'||action==='lesson_quiz'){
 const count=chapter.modules.filter(m=>isModuleComplete(m,{completed:rows[0].completed_modules})).length;
 const passed=!chapter.assessmentRequired||(await getQuizStatus(userId,chapter.id)).passed;
 await recordProgress(userId,chapter.id,moduleId||chapter.modules.at(-1)?.id,count===chapter.modules.length&&passed?100:Math.min(99,Math.round(count/chapter.modules.length*100)),count===chapter.modules.length&&passed);
 }
 return (await getLearningState(userId))[chapter.id];
}
