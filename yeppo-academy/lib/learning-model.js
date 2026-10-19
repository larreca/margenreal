export const LEARNING_STORAGE_KEY = 'yeppo-academy-learning-v1';
export const emptyLearning = () => ({completed:{},notes:{},favorite:false,moduleId:null,passed:false,updatedAt:null});
export function readMinutes(html=''){return Math.max(2,Math.ceil(html.replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length/180));}
export function chapterProgress(chapter,state={}){
 const modules=chapter.modules||[];const read=modules.filter(m=>state.completed?.[m.id]).length;
 const finished=modules.length>0&&read===modules.length&&(!chapter.assessmentRequired||Boolean(state.passed));
 return {read,total:modules.length,finished,percent:finished?100:Math.min(99,Math.round(read/Math.max(1,modules.length)*100)),minutes:modules.filter(m=>!state.completed?.[m.id]).reduce((s,m)=>s+(m.minutes||readMinutes(m.html)),0)};
}
export function weeklyCount(states,now=new Date()){
 const local=new Date(now.toLocaleString('en-US',{timeZone:'America/Santiago'}));const day=(local.getDay()+6)%7;local.setDate(local.getDate()-day);local.setHours(0,0,0,0);
 return Object.values(states).reduce((sum,s)=>sum+Object.values(s.completed||{}).filter(t=>{const date=new Date(new Date(t).toLocaleString('en-US',{timeZone:'America/Santiago'}));return date>=local&&new Date(t)<=now;}).length,0);
}
export function normalizeSearch(text=''){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
