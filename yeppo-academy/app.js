(()=> {
const BASE=window.YEPPO_ACADEMY_DATA;
const KEY_DRAFT="yeppo_academy_v3_draft";
const KEY_PROGRESS="yeppo_academy_v2_progress";
let data=loadDraft()||structuredClone(BASE);
let progress=JSON.parse(localStorage.getItem(KEY_PROGRESS)||"{}");
let selectedSchool=data.schools[0].id;
let currentChapterId=data.schools[0].chapters[0].id;
let editorOpen=false;
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),1800)}
function loadDraft(){try{const x=JSON.parse(localStorage.getItem(KEY_DRAFT)||"null");return x&&Array.isArray(x.schools)?x:null}catch{return null}}
function allChapters(){return data.schools.flatMap(s=>s.chapters.map(c=>({...c,schoolId:s.id,schoolName:s.name})))}
function school(id=selectedSchool){return data.schools.find(s=>s.id===id)||data.schools[0]}
function chapter(id=currentChapterId){return allChapters().find(c=>c.id===id)||allChapters()[0]}
function idxOf(id=currentChapterId){return allChapters().findIndex(c=>c.id===id)}
function pct(n,d){return d?Math.round(n/d*100):0}
function saveProgress(){localStorage.setItem(KEY_PROGRESS,JSON.stringify(progress));renderProgress()}
function route(){const h=location.hash||"#home";if(h.startsWith("#chapter-")){currentChapterId=h.replace("#chapter-","");if(!allChapters().some(c=>c.id===currentChapterId))currentChapterId=allChapters()[0].id;selectedSchool=chapter().schoolId;showChapter()}else showHome()}
function goHome(sid){if(sid)selectedSchool=sid;location.hash="home";showHome();window.scrollTo({top:0,behavior:"smooth"})}
function openChapter(id){currentChapterId=id;selectedSchool=chapter(id).schoolId;location.hash="chapter-"+id;showChapter();window.scrollTo({top:0,behavior:"smooth"})}
function renderNav(){
 const nav=$("#academyNav");nav.innerHTML="";
 const home=document.createElement("button");home.type="button";home.className="navHome "+(!location.hash.startsWith("#chapter-")?"active":"");home.innerHTML='<span class="navIcon">⌂</span><span>Inicio</span>';home.onclick=()=>goHome();nav.appendChild(home);
 const label=document.createElement("small");label.className="navLabel";label.textContent="ESCUELAS";nav.appendChild(label);
 data.schools.forEach(s=>{const done=s.chapters.filter(c=>progress[c.id]).length;const b=document.createElement("button");b.type="button";b.className="navSchool "+(selectedSchool===s.id?"activeSchool":"");b.innerHTML='<span class="navIcon">'+esc(s.icon)+'</span><span class="navText"><b>'+esc(s.name)+'</b><small>'+done+'/'+s.chapters.length+' completados</small></span>';b.onclick=()=>goHome(s.id);nav.appendChild(b)})
}
function renderProgress(){
 const all=allChapters(),done=all.filter(c=>progress[c.id]).length,p=pct(done,all.length);
 $("#sideProgressPct").textContent=p+"%";$("#sideProgressBar").style.width=p+"%";$("#sideProgressText").textContent=done+" de "+all.length+" capítulos";
 $("#doneCount").textContent=done;$("#donePct").textContent=p+"% de avance";
 if($("#chapterProgressPct")){$("#chapterProgressPct").textContent=p+"%";$("#chapterProgressBar").style.width=p+"%";$("#chapterProgressText").textContent=done+" de "+all.length+" completados"}
}
function renderHome(){
 const s=school();
 $("#schoolCount").textContent=data.schools.length;$("#chapterCount").textContent=allChapters().length;$("#activeSchoolLabel").textContent=s.name.replace(" K-Beauty","");
 const incomplete=allChapters().find(c=>!progress[c.id])||allChapters()[0];
 $("#continueCard").innerHTML='<small>Continuar aprendiendo</small><b>Capítulo '+incomplete.n+' · '+esc(incomplete.title)+'</b><p>'+esc(incomplete.summary||"")+'</p><button class="primary" type="button">Continuar →</button>';
 $("#continueCard button").onclick=()=>openChapter(incomplete.id);
 const road=$("#schoolRoadmap");road.innerHTML="";
 data.schools.forEach((x,i)=>{const done=x.chapters.filter(c=>progress[c.id]).length,p=pct(done,x.chapters.length);const b=document.createElement("button");b.type="button";b.className="roadCard "+(x.id===selectedSchool?"active":"");b.innerHTML='<span class="roadStep">'+String(i+1).padStart(2,"0")+'</span><i>'+esc(x.icon)+'</i><b>'+esc(x.name)+'</b><p>'+esc(x.desc)+'</p><div class="roadFoot"><span>'+done+'/'+x.chapters.length+'</span><div class="miniMeter"><i style="width:'+p+'%"></i></div></div>';b.onclick=()=>{selectedSchool=x.id;renderHome();renderNav();document.querySelector(".schoolSection").scrollIntoView({behavior:"smooth",block:"start"})};road.appendChild(b)});
 $("#schoolTitle").textContent=s.name;$("#schoolDesc").textContent=s.desc;
 const sd=s.chapters.filter(c=>progress[c.id]).length,sp=pct(sd,s.chapters.length);$("#schoolProgressText").textContent=sd+"/"+s.chapters.length;$("#schoolProgressBar").style.width=sp+"%";
 renderChapterCards(s.chapters,$("#chapterGrid"));
}
function renderChapterCards(chapters,root){
 root.innerHTML="";
 chapters.forEach(c=>{const card=document.createElement("article");card.className="homeChapterCard "+(progress[c.id]?"done":"");card.innerHTML='<div class="chapterNum">CAP. '+String(c.n).padStart(2,"0")+'</div><h3>'+esc(c.title)+'</h3><p>'+esc(c.summary||"")+'</p><div class="chapterCardFoot"><span>'+(progress[c.id]?"✓ Completado":"Abrir capítulo")+'</span><button type="button">Entrar →</button></div>';card.querySelector("button").onclick=()=>openChapter(c.id);root.appendChild(card)})
}
function search(){
 const q=$("#searchInput").value.trim().toLowerCase();
 if(!q){$("#searchResultsSection").hidden=true;$(".schoolSection").hidden=false;return}
 const found=allChapters().filter(c=>(c.title+" "+c.summary+" "+(c.body||"")+" "+c.schoolName).toLowerCase().includes(q));
 $("#searchResultsSection").hidden=false;$(".schoolSection").hidden=true;$("#searchMeta").textContent=found.length+" capítulos encontrados para “"+q+"”";renderChapterCards(found,$("#searchResults"));
}
function showHome(){
 $("#homeView").hidden=false;$("#chapterView").hidden=true;editorOpen=false;$("#editorPanel").hidden=true;renderNav();renderHome();renderProgress();$("#searchInput").value="";$("#goHomeBtn").style.display="none";$("#editorToggle").style.display="none"
}
function renderObjectives(c){
  $("#chapterObjectives").innerHTML="";
  $("#railObjectives").innerHTML='<span class="railHint">Selecciona una sección para saltar dentro del capítulo.</span>';
}
function showCourseModule(key,scroll=true){
  const root=$("#chapterContent");
  const book=root.querySelector("[data-coursebook]");
  if(!book)return;
  const panels=[...book.querySelectorAll("[data-course-module-panel]")];
  const buttons=[...book.querySelectorAll("[data-course-module]")];
  const panel=panels.find(p=>p.dataset.courseModulePanel===key)||panels[0];
  const actual=panel?.dataset.courseModulePanel;
  panels.forEach(p=>p.classList.toggle("active",p===panel));
  buttons.forEach(b=>b.classList.toggle("active",b.dataset.courseModule===actual));
  const index=Math.max(0,panels.indexOf(panel));
  const current=book.querySelector("[data-module-current]");
  const bar=book.querySelector("[data-module-bar]");
  if(current)current.textContent=String(index+1);
  if(bar)bar.style.width=((index+1)/Math.max(1,panels.length)*100)+"%";
  $("#railObjectives").querySelectorAll(".railTocBtn").forEach(b=>b.classList.toggle("active",b.dataset.module===actual));
  if(scroll)book.scrollIntoView({behavior:"smooth",block:"start"});
}
function renderToc(){
  const root=$("#chapterContent"),rail=$("#railObjectives");
  const book=root.querySelector("[data-coursebook]");
  if(book){
    const panels=[...book.querySelectorAll("[data-course-module-panel]")];
    rail.innerHTML="";
    panels.forEach((panel,i)=>{
      const key=panel.dataset.courseModulePanel;
      const nav=book.querySelector('[data-course-module="'+key+'"]');
      const b=document.createElement("button");
      b.type="button";b.className="railTocBtn";b.dataset.module=key;
      b.textContent=(nav?.querySelector("span")?.textContent||String(i+1))+" · "+(panel.dataset.moduleTitle||"Módulo");
      b.addEventListener("click",()=>showCourseModule(key,true));
      rail.appendChild(b);
    });
    showCourseModule(panels[0]?.dataset.courseModulePanel,false);
    return;
  }
  const sections=[...root.querySelectorAll("[data-toc]")];
  if(!sections.length){rail.innerHTML='<span class="railHint">Contenido continuo.</span>';return}
  rail.innerHTML="";
  sections.forEach((section,i)=>{
    const id="cap-section-"+(i+1);section.id=id;
    const b=document.createElement("button");b.type="button";b.className="railTocBtn";b.textContent=section.dataset.toc||("Sección "+(i+1));
    b.addEventListener("click",()=>section.scrollIntoView({behavior:"smooth",block:"start"}));rail.appendChild(b);
  });
}
function renderMedia(c){
 let out="";
 if(c.video){let src=c.video;try{const u=new URL(c.video);if(u.hostname.includes("youtu.be"))src="https://www.youtube.com/embed/"+u.pathname.slice(1);else if(u.hostname.includes("youtube.com"))src="https://www.youtube.com/embed/"+(u.searchParams.get("v")||u.pathname.split("/").pop())}catch{}out+='<div class="mediaBlock"><span>Video</span><iframe src="'+esc(src)+'" title="Video del capítulo" allowfullscreen></iframe></div>'}
 if(c.slides)out+='<div class="mediaBlock"><span>Recurso</span><a href="'+esc(c.slides)+'" target="_blank" rel="noopener">Abrir diapositivas / recurso ↗</a></div>';
 $("#chapterMedia").innerHTML=out?'<div class="chapterMediaGrid">'+out+'</div>':""
}
function renderQuiz(c){
 const root=$("#chapterQuiz");if(!c.quiz||!c.quiz.q){root.innerHTML="";return}
 root.innerHTML='<section class="chapterQuizBox"><span class="eyebrow">Mini trivia</span><h3>'+esc(c.quiz.q)+'</h3><form id="chapterQuizForm">'+c.quiz.options.map((o,i)=>'<label><input type="radio" name="qa" value="'+i+'"> '+esc(o)+'</label>').join("")+'<button class="primary" type="submit">Responder</button><div class="quizFeedback"></div></form></section>';
 $("#chapterQuizForm").onsubmit=e=>{e.preventDefault();const v=e.currentTarget.querySelector('input[name="qa"]:checked'),r=e.currentTarget.querySelector(".quizFeedback");if(!v){r.textContent="Selecciona una respuesta.";r.className="quizFeedback bad";return}const ok=Number(v.value)===Number(c.quiz.answer);r.textContent=ok?"Correcto. Puedes avanzar.":"Revisa el concepto y vuelve a intentarlo.";r.className="quizFeedback "+(ok?"good":"bad")}
}
function showChapter(){
 $("#homeView").hidden=true;$("#chapterView").hidden=false;$("#goHomeBtn").style.display="";$("#editorToggle").style.display="";
 const c=chapter();selectedSchool=c.schoolId;renderNav();renderProgress();
 $("#chapterSchoolCrumb").textContent=c.schoolName;$("#chapterEyebrow").textContent="Capítulo "+c.n+" · "+c.schoolName;$("#chapterTitle").textContent=c.title;$("#chapterSummary").textContent=c.summary||"";
 renderObjectives(c);$("#chapterContent").innerHTML=c.richHtml||'<div class="simpleBody">'+esc(c.body||"Contenido en desarrollo.").replace(/\n\n/g,"</p><p>").replace(/^/,"<p>").replace(/$/,"</p>")+'</div>';renderToc();renderMedia(c);renderQuiz(c);
 const done=!!progress[c.id];$("#completeBtn").textContent=done?"✓ Capítulo completado":"Marcar como completado";$("#completeBtn").className=done?"ghost":"primary";$("#completeBtn").onclick=()=>{progress[c.id]=!progress[c.id];saveProgress();showChapter()};
 const all=allChapters(),i=idxOf(),prev=all[i-1],next=all[i+1];
 setupNavButton($("#prevChapter"),prev,"← Anterior");setupNavButton($("#railPrev"),prev,"← Capítulo anterior");
 setupNavButton($("#nextChapter"),next,"Siguiente →");setupNavButton($("#railNext"),next,"Capítulo siguiente →");
 if(editorOpen){$("#editorPanel").hidden=false;fillEditor()}else $("#editorPanel").hidden=true
}
function setupNavButton(btn,c,label){btn.textContent=label;btn.disabled=!c;btn.style.opacity=c?"1":".35";btn.onclick=c?()=>openChapter(c.id):null}
function fillEditor(){
 const c=chapter();$("#editTitle").value=c.title||"";$("#editSummary").value=c.summary||"";$("#editObjectives").value=(c.objectives||[]).join("\n");$("#editBody").value=c.body||"";$("#editRichHtml").value=c.richHtml||"";$("#editTip").value=c.tip||"";$("#editVideo").value=c.video||"";$("#editImage").value=c.image||"";$("#editSlides").value=c.slides||"";$("#editQuizQ").value=c.quiz?.q||"";$("#editQuizOptions").value=(c.quiz?.options||[]).join("\n");$("#editQuizAnswer").value=c.quiz?Number(c.quiz.answer)+1:""
}
function mutable(){for(const s of data.schools){const c=s.chapters.find(x=>x.id===currentChapterId);if(c)return c}return null}
function saveEdit(){
 const c=mutable();if(!c)return;c.title=$("#editTitle").value.trim()||c.title;c.summary=$("#editSummary").value.trim();c.objectives=$("#editObjectives").value.split("\n").map(x=>x.trim()).filter(Boolean);c.body=$("#editBody").value.trim();c.richHtml=$("#editRichHtml").value;c.tip=$("#editTip").value.trim();c.video=$("#editVideo").value.trim();c.image=$("#editImage").value.trim();c.slides=$("#editSlides").value.trim();const q=$("#editQuizQ").value.trim(),ops=$("#editQuizOptions").value.split("\n").map(x=>x.trim()).filter(Boolean),ans=Math.max(1,Number($("#editQuizAnswer").value||1))-1;c.quiz=q&&ops.length>=2?{q,options:ops,answer:Math.min(ans,ops.length-1)}:null;localStorage.setItem(KEY_DRAFT,JSON.stringify(data));toast("Borrador guardado");showChapter()
}
function restoreChapter(){
 const base=BASE.schools.flatMap(s=>s.chapters).find(c=>c.id===currentChapterId),cur=mutable();if(!base||!cur)return;Object.keys(cur).forEach(k=>delete cur[k]);Object.assign(cur,structuredClone(base));localStorage.setItem(KEY_DRAFT,JSON.stringify(data));toast("Capítulo restaurado");showChapter()
}
function exportData(){const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="yeppo-academy-content.json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function importData(file){const fr=new FileReader();fr.onload=()=>{try{const x=JSON.parse(fr.result);if(!x||!Array.isArray(x.schools))throw 0;data=x;localStorage.setItem(KEY_DRAFT,JSON.stringify(data));toast("Contenido importado");route()}catch{toast("Formato inválido")}};fr.readAsText(file)}
document.addEventListener("click",e=>{
  const moduleBtn=e.target.closest("[data-course-module]");
  if(moduleBtn){showCourseModule(moduleBtn.dataset.courseModule,true);return}
  const next=e.target.closest("[data-course-next]");
  if(next){showCourseModule(next.dataset.courseNext,true);return}
  const prev=e.target.closest("[data-course-prev]");
  if(prev){showCourseModule(prev.dataset.coursePrev,true);return}
  const routine=e.target.closest("[data-routine]");
  if(routine){
    const wrap=routine.closest("[data-routine-builder]");
    const result=wrap.querySelector("[data-routine-result]");
    wrap.querySelectorAll("[data-routine]").forEach(b=>b.classList.toggle("active",b===routine));
    const k=routine.dataset.routine;
    const views={
      simple:'<b>Rutina esencial</b><p><strong>AM:</strong> limpiador si se necesita → hidratante → protector solar.</p><p><strong>PM:</strong> limpieza → hidratante.</p><span>Objetivo: crear adherencia y una base antes de sumar tratamientos.</span>',
      media:'<b>Rutina intermedia</b><p><strong>AM:</strong> limpieza → serum según necesidad → hidratante → protector solar.</p><p><strong>PM:</strong> limpieza → tratamiento → hidratante.</p><span>Objetivo: sumar un tratamiento claro sin convertir la rutina en una colección de productos.</span>',
      completa:'<b>Rutina completa</b><p><strong>AM:</strong> limpieza → toner/essence si aporta valor → tratamiento → hidratante → protector solar.</p><p><strong>PM:</strong> primera limpieza cuando corresponda → segunda limpieza → capa hidratante → tratamiento → crema; extras según tolerancia.</p><span>Objetivo: personalizar capas. Completa no significa obligatoria ni mejor para todos.</span>'
    };
    result.innerHTML=views[k]||views.simple;
    return;
  }
});
document.addEventListener("click",e=>{
  const level=e.target.closest(".level-btn");
  if(level){
    const wrap=level.closest("[data-level-switch]");
    const key=level.dataset.level;
    wrap.querySelectorAll(".level-btn").forEach(b=>b.classList.toggle("active",b===level));
    wrap.querySelectorAll("[data-level-panel]").forEach(p=>p.classList.toggle("active",p.dataset.levelPanel===key));
    return;
  }
  const choice=e.target.closest("[data-decision-game] article button");
  if(choice){
    const card=choice.closest("article");
    const correct=card.dataset.correct;
    const picked=choice.dataset.choice;
    const feedback=card.querySelector(".decision-feedback");
    card.querySelectorAll("button").forEach(b=>b.classList.remove("chosen","correctChoice"));
    choice.classList.add("chosen");
    if(picked===correct){
      choice.classList.add("correctChoice");
      const msg=correct==="test"
        ?"Correcto: hay interés, pero primero valida rotación e incrementalidad."
        :correct==="escala"
        ?"Correcto: venta sostenida, reposición y margen justifican profundizar stock."
        :"Correcto: duplicar función sin demanda o margen claro aumenta complejidad e inventario.";
      feedback.textContent=msg;
      feedback.className="decision-feedback good";
    }else{
      feedback.textContent="Revisa la señal comercial: viralidad no equivale a rotación y más variedad no siempre mejora el surtido.";
      feedback.className="decision-feedback bad";
    }
    return;
  }
});
document.addEventListener("click",e=>{const btn=e.target.closest(".challenge-submit");if(!btn)return;const box=btn.closest("[data-challenge]");if(!box)return;const qs=[...box.querySelectorAll(".challenge-q")];let score=0,answered=0;qs.forEach(q=>{const picked=q.querySelector('input[type="radio"]:checked');if(!picked)return;answered++;if(String(picked.value)===String(q.dataset.answer))score++});const out=box.querySelector(".challenge-result");if(answered<qs.length){out.textContent="Responde las "+qs.length+" preguntas antes de corregir.";out.style.color="#b42318";return}const target=Math.max(1,qs.length-1);out.textContent=score+"/"+qs.length+" correctas · "+(score>=target?"Capítulo dominado: puedes avanzar.":score>=Math.ceil(qs.length*.6)?"Buen punto de partida: revisa las respuestas y vuelve a intentarlo.":"Conviene repasar los conceptos clave antes de avanzar.");out.style.color=score>=target?"#157b53":"#b06013"});
$("#searchInput").addEventListener("input",()=>{if($("#homeView").hidden)goHome(selectedSchool);search()});
$("#goHomeBtn").onclick=()=>goHome(selectedSchool);$("#backToMap").onclick=()=>goHome(selectedSchool);
$("#editorToggle").onclick=()=>{editorOpen=!editorOpen;$("#editorPanel").hidden=!editorOpen;if(editorOpen){fillEditor();$("#editorPanel").scrollIntoView({behavior:"smooth",block:"start"})}};
$("#saveEdit").onclick=saveEdit;$("#resetChapter").onclick=restoreChapter;$("#exportBtn").onclick=exportData;$("#importBtn").onclick=()=>$("#importFile").click();$("#importFile").onchange=e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value=""};
window.addEventListener("hashchange",route);route();
})();