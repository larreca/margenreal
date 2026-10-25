// Critical questions require a correct answer in addition to the 80% minimum.
export const QUIZ_RULE_VERSION = '2026-10-safe-v2';
export const hasSafetyGate = chapterId => chapterId === 'c14' || chapterId === 'c50';

export function quizQuestions(html = '') {
  return [...html.matchAll(/<[^>]*class=["'][^"']*\bchallenge-q\b[^"']*["'][^>]*>/gi)]
    .map(([tag]) => ({
      key: tag.match(/\bdata-answer=["']([^"']+)["']/i)?.[1] || '',
      critical: /\bdata-critical=["']true["']/i.test(tag)
    })).filter(question => question.key);
}

export function gradeChapterQuiz(html, answers) {
  const questions = quizQuestions(html);
  if (!questions.length || !Array.isArray(answers) || answers.length !== questions.length || answers.some(answer => typeof answer !== 'string' || answer.length > 20 || !answer)) {
    throw new Error('Responde todas las preguntas');
  }
  const correct = questions.reduce((count, question, index) => count + Number(answers[index] === question.key), 0);
  const criticalMistakes = questions.reduce((count, question, index) => count + Number(question.critical && answers[index] !== question.key), 0);
  const score = correct / questions.length * 100;
  return {correct, total: questions.length, score, criticalMistakes, passed: score >= 80 && criticalMistakes === 0};
}
