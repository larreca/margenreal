export function videoEmbedUrl(value){
 try{
  const url=new URL(String(value||"").trim());
  if(url.protocol!=="https:")return null;
  const host=url.hostname.toLowerCase();
  let id=null;
  if(host==="youtu.be")id=url.pathname.slice(1).split("/")[0];
  if(["youtube.com","www.youtube.com","m.youtube.com","www.youtube-nocookie.com"].includes(host)){
   id=url.searchParams.get("v")||url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
  }
  if(id&&/^[A-Za-z0-9_-]{11}$/.test(id))return "https://www.youtube-nocookie.com/embed/"+id;
  if(["vimeo.com","www.vimeo.com","player.vimeo.com"].includes(host)){
   id=url.pathname.match(/^\/(?:video\/)?([0-9]+)\/?$/)?.[1];
   if(id)return "https://player.vimeo.com/video/"+id;
  }
 }catch{}
 return null;
}
