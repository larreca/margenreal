import test from 'node:test';
import assert from 'node:assert/strict';
import chapter14 from '../data/chapter14.js';
import chapter50 from '../data/chapter50.js';
import {gradeChapterQuiz,quizQuestions,QUIZ_RULE_VERSION} from '../lib/chapter-assessment.js';
import {chapterProgress,withLegacyCompletion} from '../lib/learning-model.js';

for (const chapter of [chapter14,chapter50]) {
  const html=chapter.modules.at(-1).html;
  const questions=quizQuestions(html);
  test(`capítulo ${chapter.n}: examen visible, ocho preguntas y veto crítico`,()=>{
    assert.equal(questions.length,8);
    assert.equal(questions.filter(q=>q.critical).length,1);
    const correct=questions.map(q=>q.key);
    assert.equal(gradeChapterQuiz(html,correct).passed,true);
    const noncritical=questions.findIndex(q=>!q.critical);
    const seven=[...correct];seven[noncritical]='wrong';
    assert.equal(gradeChapterQuiz(html,seven).passed,true);
    const critical=questions.findIndex(q=>q.critical);
    const unsafe=[...correct];unsafe[critical]='wrong';
    assert.deepEqual({score:gradeChapterQuiz(html,unsafe).score,passed:gradeChapterQuiz(html,unsafe).passed,criticalMistakes:gradeChapterQuiz(html,unsafe).criticalMistakes},{score:87.5,passed:false,criticalMistakes:1});
    assert.throws(()=>gradeChapterQuiz(html,correct.slice(1)));
  });
  test(`capítulo ${chapter.n}: avance antiguo requiere aprobación con regla actual`,()=>{
    const old=withLegacyCompletion(chapter,{legacyCompleted:true,passed:true});
    assert.equal(chapterProgress(chapter,old).finished,false);
    assert.equal(chapterProgress(chapter,{...old,quizVersion:QUIZ_RULE_VERSION}).finished,true);
  });
}
