const V11 = {
  version: "11.0-alpha",
  bcMinStock: 30,
  b2bMinOrder: 300000,
  academy: [
    ["K-Beauty desde cero","Inicio"],
    ["Cómo recomendar una rutina","Inicio"],
    ["Ingredientes que debes conocer","Vendedor"],
    ["Vender más sin descontar","Vendedor"],
    ["Cómo exhibir K-Beauty","Especialista"],
    ["Instagram, TikTok y WhatsApp","Especialista"],
    ["Comprar y controlar stock","Negocio"],
    ["Venta responsable de cosméticos","Negocio"]
  ]
};

function money(n){return new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(Number(n)||0)}
function el(id){return document.getElementById(id)}
function renderAcademy(){
  el("academy").innerHTML=V11.academy.map((m,i)=>`<article class="module"><small>MÓDULO ${i+1} · ${m[1]}</small><h3>${m[0]}</h3><p>Microlección práctica + misión comercial aplicada al negocio.</p><button onclick="alert('La asignación a clientes se conecta en la siguiente migración de datos V10 → V11.')">Asignar</button></article>`).join("");
}
function aiScript(){
 const goal=el("goal").value, channel=el("channel").value;
 const scripts={
 "Recompra":"Quería revisar contigo cómo viene tu stock y anticiparnos a la próxima reposición. Podemos priorizar lo que más te rota y evitar sobrecargar el pedido.",
 "Reactivar":"Hace un tiempo que no hacemos reposición. Antes de ofrecerte algo prefiero entender qué cambió y ver si podemos armar un regreso pequeño y de bajo riesgo.",
 "Crecer":"Veo una oportunidad para ampliar tu surtido sin desordenar lo que ya funciona. Podemos revisar uno o dos productos complementarios con sentido comercial.",
 "2da compra":"Quería saber cómo te fue con la primera compra y qué productos se movieron mejor. Con eso podemos afinar una segunda compra más segura."
 };
 el("aiout").textContent=(channel==="Llamada"?"APERTURA: ":"Hola, ¿cómo estás? ")+scripts[goal]+" ¿Te parece si lo revisamos?";
}
function saveNote(){localStorage.setItem("yeppoV11Notes",el("notes").value);el("saved").textContent="Guardado";}
function backup(){
 const blob=new Blob([JSON.stringify({version:V11.version,notes:el("notes").value,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="yeppo-b2b-v11-backup.json";a.click();
}
document.addEventListener("DOMContentLoaded",()=>{renderAcademy();el("notes").value=localStorage.getItem("yeppoV11Notes")||"";});
