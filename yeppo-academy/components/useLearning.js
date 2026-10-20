'use client';
import {useEffect,useRef,useState} from 'react';
import {LEARNING_STORAGE_KEY,emptyLearning} from '@/lib/learning-model';
import {assertCanConfirm,recordLessonAttempt} from '@/lib/lesson-assessment';
export default function useLearning(initial={},preview=false){
 const queue=useRef(Promise.resolve());
 const [states,setStates]=useState(initial);const [ready,setReady]=useState(!preview);const [error,setError]=useState('');
 useEffect(()=>{if(preview){try{const saved=JSON.parse(localStorage.getItem(LEARNING_STORAGE_KEY)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))setStates(saved);}catch{setError('El navegador no permite recuperar tu avance.');}setReady(true);}},[preview]);
 function update(chapterId,input,module){const task=queue.current.then(()=>performUpdate(chapterId,input,module));queue.current=task.catch(()=>{});return task;}
 async function performUpdate(chapterId,input,module){
 setError('');
 try{
 if(preview){
 const saved=JSON.parse(localStorage.getItem(LEARNING_STORAGE_KEY)||'{}');const state={...emptyLearning(),...saved[chapterId],updatedAt:new Date().toISOString()};
 if(input.action==='read'){assertCanConfirm(module,state);state.completed={...state.completed,[input.moduleId]:state.completed?.[input.moduleId]||new Date().toISOString()};}
 if(input.action==='lesson_quiz')state.completed={...state.completed,[input.moduleId]:recordLessonAttempt(module,input.answers,state.completed?.[input.moduleId])};
 if(input.action==='resume'||input.action==='read')state.moduleId=input.moduleId;
 if(input.action==='note')state.notes={...state.notes,[input.moduleId]:input.text};
 if(input.action==='favorite')state.favorite=input.value;
 if(input.action==='quiz')state.passed=Boolean(input.value);
 saved[chapterId]=state;localStorage.setItem(LEARNING_STORAGE_KEY,JSON.stringify(saved));setStates(saved);return state;
 }
 const r=await fetch('/api/learning',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chapterId,...input})});const j=await r.json();if(!r.ok)throw new Error(j.error);
 setStates(s=>({...s,[chapterId]:j.state}));return j.state;
 }catch(e){setError(e.message||'No se pudo guardar. Inténtalo de nuevo.');return null;}
 }
 return {states,ready,error,update};
}
