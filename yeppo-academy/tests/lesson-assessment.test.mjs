import test from 'node:test';
import assert from 'node:assert/strict';
import chapter from '../data/chapter01.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete,assertCanConfirm} from '../lib/lesson-assessment.js';
import {chapterProgress,weeklyCount,lessonSummary,withLegacyCompletion} from '../lib/learning-model.js';
const module=chapter.modules[0];
const correct=module.assessment.questions.map(q=>q.correct);
const wrong=module.assessment.questions.map(q=>(q.correct+1)%q.options.length);
test('cinco preguntas: cuatro aprueban, tres no',()=>{
 assert.equal(gradeLesson(module,[...correct.slice(0,4),wrong[4]]).passed,true);
 assert.equal(gradeLesson(module,[...correct.slice(0,3),...wrong.slice(3)]).passed,false);
});
test('rechaza respuestas incompletas, fuera de rango o manipuladas',()=>{
 for(const answers of [null,[],correct.slice(1),[...correct,0],['1',...correct.slice(1)],[99,...correct.slice(1)]])assert.throws(()=>gradeLesson(module,answers));
});
test('una lectura anterior no evita la nueva actividad',()=>{
 const state={completed:{m1:'2026-10-19T14:00:00Z'}};
 assert.equal(isModuleComplete(module,state),false);assert.throws(()=>assertCanConfirm(module,state));
});
test('un intento fallido no aumenta el progreso ni la actividad semanal',()=>{
 const completed={m1:recordLessonAttempt(module,wrong,null,'2026-10-19T14:00:00Z')};
 assert.equal(chapterProgress(chapter,{completed}).read,0);
 assert.equal(weeklyCount({c01:{completed}},new Date('2026-10-19T15:00:00Z')),0);
});
test('aprobar completa una sola lección y conserva la evaluación final pendiente',()=>{
 const completed={m1:recordLessonAttempt(module,correct,null,'2026-10-19T14:00:00Z')};
 assert.equal(chapterProgress(chapter,{completed}).read,1);
 assert.equal(chapterProgress(chapter,{completed}).finished,false);
 assert.equal(weeklyCount({c01:{completed}},new Date('2026-10-19T15:00:00Z')),1);
 assert.doesNotThrow(()=>assertCanConfirm(module,{completed}));
});
test('practicar después de aprobar conserva logro y fecha original',()=>{
 const first=recordLessonAttempt(module,correct,null,'2026-10-19T14:00:00Z');
 const second=recordLessonAttempt(module,wrong,first,'2026-10-20T14:00:00Z');
 assert.equal(second.passed,true);assert.equal(second.completedAt,first.completedAt);
});
test('una evaluación modificada requiere nueva aprobación',()=>{
 const old=recordLessonAttempt(module,correct,null);
 assert.equal(isModuleComplete({...module,assessment:{...module.assessment,version:2}},{completed:{m1:old}}),false);
});
test('los otros módulos conservan la confirmación de lectura existente',()=>{
 const state={completed:{m2:'2026-10-19T14:00:00Z'}};
 assert.equal(isModuleComplete(chapter.modules[1],state),true);assert.doesNotThrow(()=>assertCanConfirm(chapter.modules[1],state));
});
test('el catálogo mantiene el requisito de la actividad sin enviar el cuestionario',()=>{
 const summary=lessonSummary(module);
 assert.equal(summary.assessment.questions,undefined);
 assert.equal(isModuleComplete(summary,{completed:{m1:true}}),false);
 const entry=recordLessonAttempt(module,correct,null);
 assert.equal(isModuleComplete(summary,{completed:{m1:entry}}),true);
});
test('el progreso heredado conserva intentos actuales y no aprueba actividades nuevas',()=>{
 const empty=withLegacyCompletion(chapter,{legacyCompleted:true});
 assert.equal(isModuleComplete(module,empty),false);
 assert.equal(isModuleComplete(chapter.modules[1],empty),true);
 const entry=recordLessonAttempt(module,correct,null);
 const merged=withLegacyCompletion(chapter,{legacyCompleted:true,completed:{m1:entry}});
 assert.equal(isModuleComplete(module,merged),true);
 assert.equal(merged.completed.m1.completedAt,entry.completedAt);
});
