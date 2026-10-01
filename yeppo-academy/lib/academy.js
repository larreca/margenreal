import seed from "@/data/academy.seed.json";
import newChapters from "@/data/new-chapters.json";
import chapter11 from "@/data/chapter11.json";
import chapter12 from "@/data/chapter12";
import chapter13 from "@/data/chapter13";
import chapter14 from "@/data/chapter14";
import chapter15 from "@/data/chapter15";
import chapter16 from "@/data/chapter16";
import chapter17 from "@/data/chapter17";
import chapter18 from "@/data/chapter18";
import chapter19 from "@/data/chapter19";
import chapter20 from "@/data/chapter20";
import chapter21 from "@/data/chapter21";
import chapter22 from "@/data/chapter22";
import chapter23 from "@/data/chapter23";
import chapter24 from "@/data/chapter24";
import chapter25 from "@/data/chapter25";
import chapter26 from "@/data/chapter26";
import chapter27 from "@/data/chapter27";
import chapter28 from "@/data/chapter28";
import chapter29 from "@/data/chapter29";
import chapter30 from "@/data/chapter30";
import chapter31 from "@/data/chapter31";
import chapter32 from "@/data/chapter32";
import chapter33 from "@/data/chapter33";
import chapter34 from "@/data/chapter34";
import chapter35 from "@/data/chapter35";
import chapterOverrides from "@/data/chapter-overrides-22-24";
import {getDb} from "@/lib/db";
import {editableChapter,plainTextChapter} from "@/lib/content-utils";
import {videoEmbedUrl} from "@/lib/video";

const newById=new Map([...newChapters,chapter11,chapter12,chapter13,chapter14,chapter15,chapter16,chapter17,chapter18,chapter19,chapter20,chapter21,...Object.values(chapterOverrides),chapter22,chapter23,chapter24,chapter25,chapter26,chapter27,chapter28,chapter29,chapter30,chapter31,chapter32,chapter33,chapter34,chapter35].map(c=>[c.id,c]));
const allSeed={...seed,schools:seed.schools.map(s=>({...s,chapters:s.chapters.map(c=>({...c,...newById.get(c.id)}))}))};
const baseChapters=()=>allSeed.schools.flatMap(s=>s.chapters.map(c=>({...c,schoolId:s.id,schoolName:s.name})));
const baseById=id=>baseChapters().find(c=>c.id===id)||null;
const pilotChapter=id=>{const n=Number(String(id).replace("c",""));return n>=1&&n<=50};
export const isPilotChapter=pilotChapter;
export async function isAvailableChapter(id){
  if(pilotChapter(id))return true;
  if(!baseById(id))return false;
  const sql=getDb();if(!sql)return false;
  try{const rows=await sql`SELECT 1 FROM academy_chapters WHERE chapter_id=${id} AND published_content IS NOT NULL LIMIT 1`;return rows.length>0}catch{return false}
}
async function availableChapterIds(){
  const ids=new Set(baseChapters().filter(c=>pilotChapter(c.id)).map(c=>c.id));
  const sql=getDb();if(sql){try{const rows=await sql`SELECT chapter_id FROM academy_chapters WHERE published_content IS NOT NULL`;for(const row of rows)ids.add(row.chapter_id)}catch{}}
  return ids;
}
const overlay=(base,stored)=>{if(!stored)return base;const baseVersion=Number(base.contentVersion||0),storedVersion=Number(stored.contentVersion||0);if(baseVersion>storedVersion)return base;return{...base,...stored,id:base.id,n:base.n,schoolId:base.schoolId,schoolName:base.schoolName}};

export async function getAcademyData(){
  const sql=getDb();let rows=[];
  if(sql){try{rows=await sql`SELECT chapter_id,published_content FROM academy_chapters WHERE published_content IS NOT NULL`}catch{}}
  const by=new Map(rows.map(r=>[r.chapter_id,r.published_content]));
  return{...allSeed,schools:allSeed.schools.map(s=>({...s,chapters:s.chapters.map(c=>overlay({...c,schoolId:s.id,schoolName:s.name},by.get(c.id)))}))};
}
export async function getChapter(id){
  const data=await getAcademyData();
  for(const s of data.schools){const c=s.chapters.find(x=>x.id===id);if(c)return editableChapter({...c,schoolId:s.id,schoolName:s.name})}
  return null;
}
export async function getChapterForEditor(id){
  const base=baseById(id);if(!base)return null;const sql=getDb();if(!sql)return editableChapter(base);
  try{const rows=await sql`SELECT draft_content,published_content FROM academy_chapters WHERE chapter_id=${id} LIMIT 1`;return editableChapter(overlay(base,rows[0]?.draft_content||rows[0]?.published_content))}catch{return editableChapter(base)}
}
export async function saveDraft(chapter,userId){
  const sql=getDb();if(!sql)throw new Error("DATABASE_NOT_CONFIGURED");const base=baseById(chapter.id);if(!base)throw new Error("CHAPTER_NOT_FOUND");
  const modules=Array.isArray(chapter.modules)?chapter.modules:[];
  if(!modules.length||new Set(modules.map(m=>m.id)).size!==modules.length)throw new Error("MÓDULOS_INVÁLIDOS");
  if(modules.some(m=>m.videoUrl&&!videoEmbedUrl(m.videoUrl)))throw new Error("VIDEO_INVÁLIDO: usa YouTube o Vimeo HTTPS");
  const normalized={id:base.id,n:base.n,contentVersion:Number(chapter.contentVersion??base.contentVersion??0),title:chapter.title,summary:chapter.summary||"",tip:chapter.tip||"",body:chapter.body||"",assessmentRequired:Boolean(chapter.assessmentRequired),modules,
    coverImage:chapter.coverImage||null,coverAlt:chapter.coverAlt||null,
    editorial:chapter.editorial||null,infographic:chapter.infographic||null};
  const payload=JSON.stringify(normalized);
  await sql`INSERT INTO academy_chapters(chapter_id,title,summary,draft_content,status,updated_by,updated_at)
    VALUES(${chapter.id},${normalized.title},${normalized.summary},${payload}::jsonb,'draft',${userId}::uuid,NOW())
    ON CONFLICT(chapter_id) DO UPDATE SET title=EXCLUDED.title,summary=EXCLUDED.summary,draft_content=EXCLUDED.draft_content,status='draft',updated_by=EXCLUDED.updated_by,updated_at=NOW()`;
  return normalized;
}
export async function sendForReview(chapterId,userId){
  const sql=getDb();if(!sql)throw new Error("DATABASE_NOT_CONFIGURED");
  await sql`UPDATE academy_chapters SET status='review',updated_by=${userId}::uuid,updated_at=NOW() WHERE chapter_id=${chapterId} AND draft_content IS NOT NULL`;
}
export async function publishChapter(chapterId,userId){
  const sql=getDb();if(!sql)throw new Error("DATABASE_NOT_CONFIGURED");
  const rows=await sql`SELECT draft_content,published_content,version FROM academy_chapters WHERE chapter_id=${chapterId} LIMIT 1`;const r=rows[0];
  if(!r?.draft_content)throw new Error("NO_DRAFT");
  const draft=r.draft_content,modules=draft.modules||[];
  if(modules.length<8||modules.some(m=>plainTextChapter({title:m.title,modules:[m]}).length<120))throw new Error("Completa los ocho módulos antes de publicar.");
  if(draft.assessmentRequired){
    const questions=(modules.at(-1)?.html||"").match(/class=["'][^"']*challenge-q/g)||[];
    if(questions.length<7)throw new Error("La evaluación final necesita siete preguntas.");
  }
  if(r.published_content)await sql`INSERT INTO academy_chapter_versions(chapter_id,version,content,published_by) VALUES(${chapterId},${r.version||0},${JSON.stringify(r.published_content)}::jsonb,${userId}::uuid)`;
  await sql`UPDATE academy_chapters SET published_content=draft_content,status='published',version=COALESCE(version,0)+1,published_at=NOW(),published_by=${userId}::uuid,updated_at=NOW() WHERE chapter_id=${chapterId}`;
}
export async function getVersions(chapterId){const sql=getDb();if(!sql)return[];try{return await sql`SELECT id,version,published_at FROM academy_chapter_versions WHERE chapter_id=${chapterId} ORDER BY published_at DESC LIMIT 20`}catch{return[]}}
export async function getUserProgress(userId){
  const sql=getDb();if(!sql||!userId)return{};
  try{const rows=await sql`SELECT chapter_id,progress_percent,completed_at FROM academy_progress WHERE user_id=${userId}::uuid`;return Object.fromEntries(rows.map(r=>[r.chapter_id,{percent:Number(r.progress_percent||0),completed:Boolean(r.completed_at)}]))}catch{return{}}
}
export async function recordProgress(userId,chapterId,moduleId,percent,completed=false){
  const sql=getDb();if(!sql)return;const p=Math.max(0,Math.min(100,Number(percent||0)));
  await sql`INSERT INTO academy_progress(user_id,chapter_id,current_module_id,progress_percent,completed_at,last_activity_at)
    VALUES(${userId}::uuid,${chapterId},${moduleId||null},${p},${completed?new Date().toISOString():null}::timestamptz,NOW())
    ON CONFLICT(user_id,chapter_id) DO UPDATE SET current_module_id=EXCLUDED.current_module_id,progress_percent=GREATEST(academy_progress.progress_percent,EXCLUDED.progress_percent),completed_at=COALESCE(academy_progress.completed_at,EXCLUDED.completed_at),last_activity_at=NOW()`;
}
export async function searchAcademy(query,session){
  const q=String(query||"").trim().toLowerCase();if(!q||!session)return[];const d=await getAcademyDataForUser(session),out=[];
  for(const s of d.schools)for(const c of s.chapters){const full={...c,schoolId:s.id,schoolName:s.name};if(plainTextChapter(full).toLowerCase().includes(q))out.push({id:c.id,n:c.n,title:c.title,summary:c.summary,school:s.name})}
  return out.slice(0,20);
}
export async function getAdminStats(){
  const sql=getDb();if(!sql)return{users:0,organizations:0,completions:0,versions:0,database:false};
  try{const [u,o,c,v]=await Promise.all([sql`SELECT COUNT(*)::int count FROM academy_users WHERE active=TRUE`,sql`SELECT COUNT(*)::int count FROM academy_organizations WHERE active=TRUE`,sql`SELECT COUNT(*)::int count FROM academy_progress WHERE completed_at IS NOT NULL`,sql`SELECT COUNT(*)::int count FROM academy_chapter_versions`]);return{users:u[0].count,organizations:o[0].count,completions:c[0].count,versions:v[0].count,database:true}}catch{return{users:0,organizations:0,completions:0,versions:0,database:false}}
}

export async function getAdminChapterRows(){
  const data=await getAcademyData();const sql=getDb();let statusRows=[];
  if(sql){try{statusRows=await sql`SELECT chapter_id,status,version,updated_at,published_at FROM academy_chapters`}catch{}}
  const status=new Map(statusRows.map(r=>[r.chapter_id,r]));
  return data.schools.flatMap(s=>s.chapters.map(ch=>({
    id:ch.id,n:ch.n,title:ch.title,school:s.name,
    status:status.get(ch.id)?.status||"seed",
    version:Number(status.get(ch.id)?.version||0),
    updatedAt:status.get(ch.id)?.updated_at||null,
    publishedAt:status.get(ch.id)?.published_at||null
  })));
}

export async function getOrganizationsAndUsers(){
  const sql=getDb();if(!sql)return{organizations:[],users:[]};
  try{
    const [organizations,users]=await Promise.all([
      sql`SELECT id,name,active,created_at FROM academy_organizations ORDER BY name`,
      sql`SELECT u.id,u.email,u.name,u.role,u.active,u.last_login_at,u.organization_id,o.name organization_name
          FROM academy_users u LEFT JOIN academy_organizations o ON o.id=u.organization_id
          ORDER BY COALESCE(o.name,''),u.name`
    ]);
    return{organizations,users};
  }catch{return{organizations:[],users:[]}}
}

export async function getOrganizationProgress(organizationId){
  const sql=getDb();if(!sql||!organizationId)return[];
  try{return await sql`
    SELECT u.id,u.name,u.email,
      COUNT(p.chapter_id)::int AS touched,
      COUNT(*) FILTER (WHERE p.completed_at IS NOT NULL)::int AS completed,
      MAX(p.last_activity_at) AS last_activity
    FROM academy_users u
    LEFT JOIN academy_progress p ON p.user_id=u.id
    WHERE u.organization_id=${organizationId}::uuid AND u.active=TRUE
    GROUP BY u.id,u.name,u.email
    ORDER BY u.name
  `}catch{return[]}
}

export async function restoreVersion(chapterId,versionId,userId){
  const sql=getDb();if(!sql)throw new Error("DATABASE_NOT_CONFIGURED");
  const rows=await sql`SELECT content FROM academy_chapter_versions WHERE id=${versionId}::uuid AND chapter_id=${chapterId} LIMIT 1`;
  if(!rows[0])throw new Error("VERSION_NOT_FOUND");
  await sql`INSERT INTO academy_chapters(chapter_id,title,summary,draft_content,status,updated_by,updated_at)
    VALUES(${chapterId},${rows[0].content.title||"Capítulo"},${rows[0].content.summary||""},${JSON.stringify(rows[0].content)}::jsonb,'draft',${userId}::uuid,NOW())
    ON CONFLICT(chapter_id) DO UPDATE SET draft_content=EXCLUDED.draft_content,title=EXCLUDED.title,summary=EXCLUDED.summary,status='draft',updated_by=EXCLUDED.updated_by,updated_at=NOW()`;
}

export async function getOrganizationAssignments(organizationId){
  const sql=getDb();if(!sql||!organizationId)return[];
  try{return await sql`SELECT chapter_id,required,available FROM academy_assignments WHERE organization_id=${organizationId}::uuid`}catch{return[]}
}

export async function setOrganizationAssignment(organizationId,chapterId,available,required){
  const sql=getDb();if(!sql)throw new Error("DATABASE_NOT_CONFIGURED");
  await sql`INSERT INTO academy_assignments(organization_id,chapter_id,available,required)
    VALUES(${organizationId}::uuid,${chapterId},${Boolean(available)},${Boolean(required)})
    ON CONFLICT(organization_id,chapter_id) DO UPDATE SET available=EXCLUDED.available,required=EXCLUDED.required`;
}

export async function getAcademyDataForUser(session){
  const [all,available]=await Promise.all([getAcademyData(),availableChapterIds()]);
  const data={...all,schools:all.schools.map(s=>({...s,chapters:s.chapters.filter(c=>available.has(c.id))})).filter(s=>s.chapters.length)};
  if(!session?.organizationId)return data;
  const rows=await getOrganizationAssignments(session.organizationId);if(!rows.length)return data;
  const map=new Map(rows.map(r=>[r.chapter_id,r]));
  return{...data,schools:data.schools.map(s=>({...s,chapters:s.chapters.filter(c=>map.get(c.id)?.available!==false)}))};
}

export async function getChapterForUser(id,session){
  if(!(await isAvailableChapter(id)))return null;
  if(session?.organizationId){
    const rows=await getOrganizationAssignments(session.organizationId);
    const row=rows.find(r=>r.chapter_id===id);
    if(row&&row.available===false)return null;
  }
  return getChapter(id);
}

export async function recordQuizAttempt(userId,chapterId,score,answers=null){
  const sql=getDb();if(!sql)return{passed:false};const safe=Math.max(0,Math.min(100,Number(score||0))),passed=safe>=80;
  await sql`INSERT INTO academy_quiz_attempts(user_id,chapter_id,score,answers,passed) VALUES(${userId}::uuid,${chapterId},${safe},${JSON.stringify(answers||{})}::jsonb,${passed})`;
  return{passed,score:safe};
}
export async function getQuizStatus(userId,chapterId){
  const sql=getDb();if(!sql)return{passed:false,best:0};
  try{const rows=await sql`SELECT COALESCE(MAX(score),0)::float best,COALESCE(BOOL_OR(passed),FALSE) passed FROM academy_quiz_attempts WHERE user_id=${userId}::uuid AND chapter_id=${chapterId}`;return{passed:Boolean(rows[0]?.passed),best:Number(rows[0]?.best||0)}}catch{return{passed:false,best:0}}
}

export async function seedAcademyContent(userId=null){
  const sql=getDb();if(!sql)throw new Error("DATABASE_NOT_CONFIGURED");
  const chapters=baseChapters();
  for(const base of chapters){
    const normalized=editableChapter(base);
    const payload=JSON.stringify(normalized);
    await sql`INSERT INTO academy_chapters(chapter_id,title,summary,draft_content,published_content,status,version,updated_by,published_by,updated_at,published_at)
      VALUES(${base.id},${normalized.title},${normalized.summary||""},${payload}::jsonb,${pilotChapter(base.id)?payload:null}::jsonb,${pilotChapter(base.id)?'published':'draft'},${pilotChapter(base.id)?1:0},${userId}::uuid,${pilotChapter(base.id)?userId:null}::uuid,NOW(),${pilotChapter(base.id)?new Date().toISOString():null}::timestamptz)
      ON CONFLICT(chapter_id) DO NOTHING`;
  }
  return{chapters:chapters.length};
}
