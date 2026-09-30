const clean=(v="")=>String(v).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
const attr=(tag,name)=>tag.match(new RegExp(name+'="([^"]*)"',"i"))?.[1]||"";
function sectionEnd(html,start){
  const token=/<\/?section\b[^>]*>/gi;token.lastIndex=start;let depth=1,m;
  while((m=token.exec(html))){depth+=/^<\/section/i.test(m[0])?-1:1;if(depth===0)return{start:m.index,end:token.lastIndex}}
  return null;
}
const stripLegacy=(html)=>html.replace(/<div class="module-nav-bottom">[\s\S]*?<\/div>/gi,"").replace(/<script[\s\S]*?<\/script>/gi,"");
export function extractModules(chapter){
  if(Array.isArray(chapter.modules)&&chapter.modules.length)return chapter.modules;
  const html=chapter.richHtml||"",re=/<section\b[^>]*data-course-module-panel="[^"]+"[^>]*>/gi,out=[];let m;
  while((m=re.exec(html))){
    const end=sectionEnd(html,re.lastIndex);if(!end)break;
    const body=html.slice(re.lastIndex,end.start),heading=body.match(/<div class="module-heading"[\s\S]*?<span>([\s\S]*?)<\/span>[\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<\/div>/i);
    out.push({id:attr(m[0],"data-course-module-panel")||"m"+(out.length+1),label:heading?clean(heading[1]):chapter.n+"."+(out.length+1),title:attr(m[0],"data-module-title")||(heading?clean(heading[2]):chapter.title),html:stripLegacy(body).trim()});
    re.lastIndex=end.end;
  }
  if(out.length)return out;
  return [{id:"m"+chapter.n+"1",label:chapter.n+".1",title:chapter.title,html:'<div class="reading-copy"><p>'+clean(chapter.body||chapter.summary||"Contenido en preparación.")+"</p></div>"}];
}
export function editableChapter(chapter){return{id:chapter.id,n:chapter.n,contentVersion:Number(chapter.contentVersion||0),title:chapter.title,summary:chapter.summary||"",tip:chapter.tip||"",body:chapter.body||"",schoolId:chapter.schoolId||"",schoolName:chapter.schoolName||"",assessmentRequired:chapter.id==="c01"||Boolean(chapter.assessmentRequired),modules:extractModules(chapter),coverImage:chapter.coverImage||null,coverAlt:chapter.coverAlt||null,editorial:chapter.editorial||null,infographic:chapter.infographic||null}}
export function plainTextChapter(chapter){const c=editableChapter(chapter);return[c.title,c.summary,c.tip,...c.modules.map(m=>m.title+" "+clean(m.html))].join(" ").replace(/\s+/g," ").trim()}
