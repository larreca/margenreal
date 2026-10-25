'use client';
import {useRef,useState} from 'react';
import {gradeLesson,isModuleComplete} from '@/lib/lesson-assessment';

export default function LessonAssessment({module,state,onSubmit,busy,ready}) {
  const {questions,passPercent=80}=module.assessment;
  const [answers,setAnswers]=useState({});
  const [result,setResult]=useState(null);
  const [message,setMessage]=useState('');
  const resultRef=useRef(null);
  const complete=isModuleComplete(module,state);
  async function submit(event){
    event.preventDefault();setMessage('');
    try {
      const values=questions.map(q=>answers[q.id]);
      const grade=gradeLesson(module,values);
      const saved=await onSubmit(values);
      if(!saved){setMessage('No se guardó el intento. Reintenta antes de continuar.');return;}
      setResult(grade);
      requestAnimationFrame(()=>resultRef.current?.focus());
    } catch(error){setMessage(error.message);}
  }
  function retry(){setResult(null);setAnswers({});setMessage('');}
  return <section className="learn-lesson-assessment" aria-labelledby="lesson-assessment-title">
    <small>COMPRUEBA TU CRITERIO · LECCIÓN {module.label}</small>
    <h3 id="lesson-assessment-title">Decide antes de avanzar</h3>
    <p>Responde las {questions.length} preguntas. Para aprobar necesitas {Math.ceil(questions.length*passPercent/100)} de {questions.length} correctas (umbral mínimo de {passPercent} %) y acertar todas las preguntas de seguridad señaladas. Al aprobar, la lección queda completada. Puedes consultar el contenido y volver a intentarlo.</p>
    {complete&&!result&&<p className="learn-assessment-success" role="status">Actividad aprobada y avance guardado. Puedes repetirla para practicar.</p>}
    <form onSubmit={submit}>
      {questions.map((q,i)=><fieldset key={q.id} disabled={busy||Boolean(result)} aria-describedby={result?'feedback-'+q.id:undefined}>
        <legend>{i+1}. {q.prompt} {q.critical&&<strong>(seguridad: respuesta obligatoria)</strong>}</legend>
        {q.options.map((option,j)=><label key={j} className={answers[q.id]===j?'is-selected':''}><input type="radio" required name={'lesson-'+module.id+'-'+q.id} value={j} checked={answers[q.id]===j} onChange={()=>setAnswers(a=>({...a,[q.id]:j}))}/><span>{option}</span></label>)}
        {result&&<p id={'feedback-'+q.id} className={'learn-question-feedback '+(answers[q.id]===q.correct?'is-correct':'needs-review')}><strong>{answers[q.id]===q.correct?'Correcto.':'Para revisar.'}</strong> {answers[q.id]!==q.correct&&<>Respuesta: {q.options[q.correct]} </>}{q.explanation}</p>}
      </fieldset>)}
      {!result&&<button type="submit" className="learn-button" disabled={busy||!ready}>{busy?'Guardando…':'Corregir actividad'}</button>}
    </form>
    {message&&<p role="alert" className="learn-error">{message}</p>}
    {result&&<div tabIndex={-1} ref={resultRef} className="learn-assessment-result" role="status"><h4>{result.correct} de {result.total} · {result.score} %</h4><p>{result.passed?'Actividad aprobada. Tu avance quedó guardado.':result.criticalMistakes?'Hay una respuesta de seguridad incorrecta: la actividad sigue pendiente aunque el porcentaje general sea suficiente.':complete?'Este intento necesita repaso; conservas tu aprobación anterior.':'Revisa las explicaciones y vuelve a intentarlo. La lección sigue pendiente.'}</p><button type="button" className="learn-button secondary" disabled={busy} onClick={retry}>Volver a practicar</button></div>}
  </section>;
}
