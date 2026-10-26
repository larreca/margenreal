import test from 'node:test';
import assert from 'node:assert/strict';
import chapter12 from '../data/chapter12.js';
import chapter30 from '../data/chapter30.js';
import {gradeLesson,recordLessonAttempt,isModuleComplete} from '../lib/lesson-assessment.js';

for(const chapter of [chapter12,chapter30]){
  test(`capítulo ${chapter.n}: ocho lecciones evaluables con feedback y cinco campos de control`,()=>{
    assert.equal(chapter.modules.length,8);
    for(const lesson of chapter.modules){
      const a=lesson.assessment;
      assert.ok(a,`Sin evaluación: ${lesson.label}`);
      assert.equal(a.questions.length,chapter.n===30?5:3);
      assert.equal(a.passPercent,80);
      assert.ok(Number.isInteger(a.version)&&a.version>0);
      for(const q of a.questions){
        assert.ok(q.id&&q.prompt&&q.options?.length===3);
        assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);
        assert.ok(q.explanation?.length>=35);
        assert.equal(typeof q.critical,'boolean');
      }
      const correct=a.questions.map(q=>q.correct);
      const wrong=[...correct]; wrong[1]=(wrong[1]+1)%a.questions[1].options.length;
      assert.equal(gradeLesson(lesson,correct).passed,true);
      assert.equal(gradeLesson(lesson,wrong).passed,chapter.n===30);
      const passed=recordLessonAttempt(lesson,correct,null);
      assert.equal(isModuleComplete(lesson,{completed:{[lesson.id]:passed}}),true);
    }
  });
}
for(const lesson of chapter12.modules.filter(m=>m.assessment.questions.some(q=>q.critical))){
  test(`seguridad ${lesson.label}: veto aunque el resto sea perfecto`,()=>{
    const answers=lesson.assessment.questions.map(q=>q.correct);
    const critical=lesson.assessment.questions.findIndex(q=>q.critical);
    answers[critical]=(answers[critical]+1)%lesson.assessment.questions[critical].options.length;
    const result=gradeLesson(lesson,answers);
    assert.equal(result.criticalMistakes,1);
    assert.equal(result.passed,false);
    assert.equal(recordLessonAttempt(lesson,answers,null).completedAt,null);
  });
}
