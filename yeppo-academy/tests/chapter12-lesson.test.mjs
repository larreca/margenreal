import test from 'node:test';
import assert from 'node:assert/strict';
import chapter from '../data/chapter12.js';
import {gradeLesson,isModuleComplete,recordLessonAttempt} from '../lib/lesson-assessment.js';

const module=chapter.modules[0];

test('12.1 exige una decisión comprobada y no acepta la lectura heredada',()=>{
  assert.equal(module.label,'12.1');
  assert.equal(module.assessment.questions.length,3);
  assert.equal(isModuleComplete(module,{completed:{[module.id]:true}}),false);
  const wrongUrgency=[1,0,1];
  const result=gradeLesson(module,wrongUrgency);
  assert.equal(result.correct,2);
  assert.equal(result.score,67);
  assert.equal(result.passed,false);
  const attempt=recordLessonAttempt(module,wrongUrgency);
  assert.equal(isModuleComplete(module,{completed:{[module.id]:attempt}}),false);
  const passed=recordLessonAttempt(module,[1,1,1]);
  assert.equal(isModuleComplete(module,{completed:{[module.id]:passed}}),true);
});
