export class LessonInputError extends Error {}

export function gradeLesson(module, answers) {
  const assessment = module?.assessment;
  if (!assessment?.questions?.length) throw new LessonInputError('Esta lección no tiene una evaluación disponible.');
  const questions = assessment.questions;
  if (!Array.isArray(answers) || answers.length !== questions.length || questions.some((q,i) => !Number.isInteger(answers[i]) || answers[i] < 0 || answers[i] >= q.options.length)) {
    throw new LessonInputError('Responde todas las preguntas antes de corregir.');
  }
  const correct = questions.filter((q,i) => q.correct === answers[i]).length;
  const score = correct / questions.length * 100;
  const criticalMistakes = questions.filter((question,index) => question.critical === true && question.correct !== answers[index]).length;
  return {correct, total:questions.length, score, criticalMistakes, passed:score >= (assessment.passPercent ?? 80) && criticalMistakes === 0, assessmentVersion:assessment.version};
}

export function isModuleComplete(module, state={}) {
  const entry = state.completed?.[module.id];
  if (module.assessment) return Boolean(entry?.passed && entry?.completedAt && entry.assessmentVersion === module.assessment.version);
  return Boolean(typeof entry === 'object' ? entry?.completedAt : entry);
}

// Existing lessons retain timestamps. Assessed lessons store their versioned result.
export function recordLessonAttempt(module, answers, previous, now=new Date().toISOString()) {
  const result = gradeLesson(module, answers);
  const previouslyPassed = previous?.assessmentVersion === result.assessmentVersion && previous?.passed;
  const passed = Boolean(previouslyPassed || result.passed);
  return {...result, passed, completedAt:passed ? (previouslyPassed && previous.completedAt || now) : null, attemptedAt:now};
}

export function assertCanConfirm(module, state) {
  if (module?.assessment && !isModuleComplete(module, state)) throw new LessonInputError('Debes aprobar la actividad de esta lección, incluida toda respuesta de seguridad crítica, antes de completarla.');
}
