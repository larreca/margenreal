import lesson017 from "./lesson017.js";
import lesson016 from "./lesson016.js";
import lesson015 from "./lesson015.js";
import lesson014 from "./lesson014.js";
import lesson013 from "./lesson013.js";
import lesson012 from "./lesson012.js";
import lesson011 from "./lesson011.js";
const chapter01={
  id:"c01",n:1,contentVersion:10,
  title:"Qué es realmente K-Beauty",
  summary:"Capítulo de apertura: entiende K-Beauty como sistema de producto, industria, cultura y negocio; aprende a separar tendencia de evidencia y a convertir interés en una recomendación responsable y una compra B2B mejor.",
  tip:"El origen atrae; el valor se construye con criterio, evidencia, experiencia, rotación y recompra.",
  body:"Este capítulo establece el lenguaje y el método de toda Yeppo Academy: observar, preguntar, verificar, recomendar, medir y aprender.",
  assessmentRequired:true,
  modules:[
  lesson011,
  lesson012,
  lesson013,
  lesson014,
  lesson015,
  lesson016,
  lesson017,
  {id:"m8",label:"1.8",title:"Aplicación B2B y evaluación",html:`
  <section class="course-module" data-course-module-panel="m8">
    <div class="module-heading"><span>1.8</span><div><small>DE CONOCIMIENTO A DECISIÓN</small><h3>Cómo convertir K-Beauty en un negocio que aprende</h3></div></div>
    <div class="reading-copy">
      <p>El primer pedido no es una colección de productos interesantes. Es una hipótesis sobre tu cliente. Debe equilibrar categorías, riesgo, margen, capital, velocidad de reposición y capacidad de explicar lo comprado.</p>
      <p>El aprendizaje continúa en toda la academia: primero entiendes contexto y piel; después ingredientes y rutinas; luego venta, inventario, precio, canales, CRM, B2B, regulación, simulaciones y certificación.</p>
    </div>
    <figure class="course-image academy-infographic chapter-one-infographic"><img src="/assets/chapter01/cap01-roadmap.svg?v=visual2" alt="Mapa de aprendizaje de Yeppo Academy desde contexto hasta control"><figcaption>El capítulo 1 entrega el mapa; los capítulos siguientes construyen el criterio. · <a class="infographic-fullsize" href="/assets/chapter01/cap01-roadmap.svg?v=visual2" target="_blank" rel="noopener noreferrer">Ver a tamaño completo ↗</a></figcaption></figure>
    <h4 class="course-subtitle">Seis métricas para no comprar sólo por intuición</h4>
    <div class="metric-course"><div><b>Sell-through</b><code>vendido ÷ recibido</code><p>Qué porcentaje salió.</p></div><div><b>Velocidad</b><code>unidades ÷ días</code><p>Qué tan rápido rota.</p></div><div><b>Cobertura</b><code>stock ÷ venta diaria</code><p>Cuántos días quedan.</p></div><div><b>Margen</b><code>contribución ÷ venta neta</code><p>Si la venta deja economía.</p></div><div><b>Attach rate</b><code>complemento ÷ base</code><p>Si construye rutina.</p></div><div><b>Recompra</b><code>clientes repetidos ÷ compradores</code><p>Si existe recurrencia.</p></div></div>

    <div class="reading-copy"><h4>Las seis métricas necesitan un denominador claro</h4>
      <p><strong>Sell-through:</strong> unidades vendidas durante el período ÷ unidades disponibles según una base declarada. En un lanzamiento sin reposiciones puedes utilizar stock inicial; si hay entradas o devoluciones, ajusta y documenta la metodología. <strong>Velocidad:</strong> unidades vendidas ÷ días observados, aclarando si hubo quiebres.</p>
      <p><strong>Cobertura:</strong> stock disponible ÷ velocidad diaria de venta, útil solamente cuando existe demanda representativa. <strong>Margen de contribución:</strong> (venta neta de impuestos menos costo, comisiones y costos variables incluidos en tu análisis) ÷ venta neta de impuestos. Si trabajas con precios con IVA, primero separa impuestos para no sobreestimar el margen.</p>
      <p><strong>Attach rate:</strong> pedidos elegibles con un producto complementario ÷ pedidos elegibles con el producto base. <strong>Recompra:</strong> personas de una cohorte que vuelven a comprar en la ventana establecida ÷ compradores iniciales elegibles. Cada KPI necesita período, canal y denominador.</p>
    </div>
    <div class="learn-evidence-table"><table><caption>Simulación numérica para practicar</caption><thead><tr><th scope="col">Indicador</th><th scope="col">Datos del caso</th><th scope="col">Resultado</th></tr></thead><tbody>
      <tr><th scope="row">Sell-through</th><td>60 unidades vendidas de 100 iniciales, sin movimientos adicionales.</td><td>60 %.</td></tr>
      <tr><th scope="row">Velocidad</th><td>60 unidades en 30 días con disponibilidad continua.</td><td>2 unidades/día.</td></tr>
      <tr><th scope="row">Cobertura</th><td>40 unidades restantes ÷ 2 unidades/día.</td><td>20 días.</td></tr>
      <tr><th scope="row">Attach rate</th><td>15 pedidos con complemento de 50 elegibles.</td><td>30 %.</td></tr>
      <tr><th scope="row">Recompra</th><td>12 personas regresan de 40 compradores iniciales en 60 días.</td><td>30 %.</td></tr>
    </tbody></table></div>
    <div class="decision-game" data-decision-game>
      <article data-correct="test"><small>DECISIÓN 1</small><b>Un serum explota en TikTok</b><p>1,2 M de vistas, cero historial propio y función similar a tres SKUs actuales.</p><div><button type="button" data-choice="comprar">Comprar fuerte</button><button type="button" data-choice="test">Test pequeño</button><button type="button" data-choice="no">Descartar</button></div><span class="decision-feedback"></span></article>
      <article data-correct="escala"><small>DECISIÓN 2</small><b>Un SPF lleva 60 días estable</b><p>Venta constante, margen sano y clientes preguntando por reposición.</p><div><button type="button" data-choice="escala">Escalar</button><button type="button" data-choice="test">Mantener</button><button type="button" data-choice="no">Eliminar</button></div><span class="decision-feedback"></span></article>
      <article data-correct="no"><small>DECISIÓN 3</small><b>Quinto toner casi idéntico</b><p>Misma función y precio que cuatro SKUs actuales, menor margen y sin demanda propia.</p><div><button type="button" data-choice="comprar">Agregar</button><button type="button" data-choice="test">Test amplio</button><button type="button" data-choice="no">No incorporar aún</button></div><span class="decision-feedback"></span></article>
    </div>
    <div class="case-card wide course-case"><div><small>CASO FINAL</small><h5>Tienes CLP $800.000 para entrar a K-Beauty</h5><p>Tu tienda vende belleza tradicional. Tus clientes preguntan sobre todo por hidratación, manchas y protector solar. Conoces cuatro virales, pero no tienes historial de venta K-Beauty.</p></div><div class="case-actions"><b>Antes de comprar</b><ol><li>Define tres necesidades que cubrirás.</li><li>Separa productos de tráfico y productos de rutina.</li><li>Limita la profundidad de lo no probado.</li><li>Define qué medirás durante 30–60 días.</li></ol></div></div>
    <details class="case-solution"><summary>Ver resolución recomendada</summary><p>Comenzaría con amplitud funcional controlada: limpieza, hidratación/barrera, uno o dos tratamientos ligados a las preocupaciones más frecuentes y fotoprotección. Usaría uno o dos virales como productos de tráfico, no como toda la compra. La segunda compra profundiza lo que demostró rotación, margen y señales de recompra.</p></details>

    <div class="reading-copy"><h4>Asignación del capital: no gastar todo en productos virales</h4>
      <p>Para enseñar cómo distribuir riesgo, supón que los <strong>$800.000 son el presupuesto total de compra</strong>, con impuestos y costos de adquisición considerados dentro de las partidas. Los siguientes montos son <strong>completamente ficticios</strong>; no describen condiciones de proveedores ni un pedido real de Yeppo. La categoría de fotoprotección sólo puede comprarse para comercialización una vez verificada su situación sanitaria correspondiente.</p>
    </div>
    <div class="learn-evidence-table"><table><caption>Ejercicio de presupuesto de $800.000 CLP · asignación simulada</caption><thead><tr><th scope="col">Partida</th><th scope="col">Inversión</th><th scope="col">Justificación</th></tr></thead><tbody>
      <tr><th scope="row">Limpieza</th><td>$160.000 (20 %)</td><td>Función básica y opciones controladas.</td></tr>
      <tr><th scope="row">Hidratación y barrera</th><td>$240.000 (30 %)</td><td>Necesidad más consultada en el caso.</td></tr>
      <tr><th scope="row">Fotoprotección</th><td>$120.000 (15 %)</td><td>Función relevante; verificar autorizaciones.</td></tr>
      <tr><th scope="row">Tratamiento específico</th><td>$120.000 (15 %)</td><td>Una preocupación prioritaria, sin multiplicar variantes.</td></tr>
      <tr><th scope="row">Novedad en prueba</th><td>$80.000 (10 %)</td><td>Test comercial acotado; no proyectar ventas desde likes.</td></tr>
      <tr><th scope="row">Reserva operativa</th><td>$80.000 (10 %)</td><td>Cubrir costos imprevistos o reposición, sin inmovilizar todo.</td></tr>
      <tr><th scope="row">Total</th><td><strong>$800.000 (100 %)</strong></td><td>Ejemplo para aprender a priorizar.</td></tr>
    </tbody></table></div>
    <div class="lesson-box"><h4>Decisión 30–60 días después</h4><p>Registra stock inicial, ventas netas, incidencias, cobertura y margen por categoría. Ajusta la compra siguiente según rotación, condiciones del proveedor y experiencia del cliente. Si una novedad no aporta frente al catálogo, no es obligatorio reponerla aunque tenga demanda en redes.</p></div>
    <div class="lesson-box"><h4>Checklist de cierre</h4><p>Antes de avanzar deberías poder: explicar K-Beauty sin recurrir al mito de los diez pasos; diferenciar tendencia de evidencia; explicar OEM/ODM a nivel básico; leer una cifra de mercado con contexto; construir una rutina por función; evaluar un claim sin convertirlo en promesa médica; y nombrar al menos tres métricas para validar un surtido.</p></div>
    <div class="knowledge-challenge" data-challenge><div class="challenge-head"><small>EVALUACIÓN FINAL</small><h4>Capítulo 1 · Fundamentos K-Beauty</h4><p>Objetivo recomendado: 7 de 8.</p></div>
      <div class="challenge-q" data-answer="b"><p>1. ¿Qué describe mejor K-Beauty?</p><label><input type="radio" name="c1q1" value="a"> Una rutina universal de diez pasos.</label><label><input type="radio" name="c1q1" value="b"> Un ecosistema de industria, producto, cultura, canales y consumidor.</label><label><input type="radio" name="c1q1" value="c"> Sólo skincare fabricado en Corea.</label></div>
      <div class="challenge-q" data-answer="c"><p>2. Un producto viral merece escalar cuando:</p><label><input type="radio" name="c1q2" value="a"> Tiene muchas vistas.</label><label><input type="radio" name="c1q2" value="b"> El packaging destaca.</label><label><input type="radio" name="c1q2" value="c"> Demuestra encaje, margen, demanda y reposición.</label></div>
      <div class="challenge-q" data-answer="a"><p>3. ¿Qué puede hacer un ODM?</p><label><input type="radio" name="c1q3" value="a"> Participar en desarrollo y fabricación.</label><label><input type="radio" name="c1q3" value="b"> Garantizar que todas las fórmulas sean iguales.</label><label><input type="radio" name="c1q3" value="c"> Sustituir el control de calidad.</label></div>
      <div class="challenge-q" data-answer="b"><p>4. ¿Qué significa una cifra de exportaciones?</p><label><input type="radio" name="c1q4" value="a"> Ventas retail exactas.</label><label><input type="radio" name="c1q4" value="b"> Valor de productos enviados al exterior; no equivale automáticamente a sell-out.</label><label><input type="radio" name="c1q4" value="c"> Margen del retailer.</label></div>
      <div class="challenge-q" data-answer="c"><p>5. La mejor base de rutina es:</p><label><input type="radio" name="c1q5" value="a"> La mayor cantidad posible de pasos.</label><label><input type="radio" name="c1q5" value="b"> El producto más viral.</label><label><input type="radio" name="c1q5" value="c"> La mínima estructura funcional que la persona puede sostener.</label></div>
      <div class="challenge-q" data-answer="b"><p>6. Un ingrediente con estudios permite afirmar que:</p><label><input type="radio" name="c1q6" value="a"> Todo producto que lo contiene dará el mismo resultado.</label><label><input type="radio" name="c1q6" value="b"> Hay evidencia relevante, pero falta evaluar fórmula, producto y contexto.</label><label><input type="radio" name="c1q6" value="c"> La concentración más alta siempre gana.</label></div>
      <div class="challenge-q" data-answer="a"><p>7. ¿Qué valida mejor una decisión de reposición?</p><label><input type="radio" name="c1q7" value="a"> Venta sostenida, margen, cobertura y recompra.</label><label><input type="radio" name="c1q7" value="b"> Likes.</label><label><input type="radio" name="c1q7" value="c"> Cantidad de ingredientes.</label></div>
      <div class="challenge-q" data-answer="c"><p>8. En un surtido nuevo conviene:</p><label><input type="radio" name="c1q8" value="a"> Comprar profundidad máxima en todo.</label><label><input type="radio" name="c1q8" value="b"> Comprar uno de cada producto.</label><label><input type="radio" name="c1q8" value="c"> Construir roles, testear incertidumbre y profundizar ganadores con datos.</label></div>
      <button class="primary challenge-submit" type="button">Corregir evaluación</button><div class="challenge-result">Responde las 8 preguntas.</div>
    </div>
    <div class="source-course source-list"><b>Fuentes principales · actualización editorial 20-10-2026</b>
      <a href="https://www.mfds.go.kr/brd/m_99/view.do?Data_stts_gubun=C9999&company_cd=&company_nm=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&page=1&seq=50393&srchFr=&srchTo=&srchTp=8&srchWord=" target="_blank" rel="noopener">MFDS · exportaciones cosméticas a Q3 2026</a>
      <a href="https://nielseniq.com/global/en/news-center/2026/k-beauty-goes-global-sales-surge-53-as-korean-innovation-reshapes-beauty-growth/" target="_blank" rel="noopener">NIQ · K-Beauty Goes Global, 2026</a>
      <a href="https://www.latercera.com/pulso/noticia/el-boom-de-la-cosmetica-coreana-quienes-estan-detras-de-su-explosion-de-ventas/" target="_blank" rel="noopener">La Tercera · boom K-Beauty en Chile, 2026</a>
      <a href="https://health.clevelandclinic.org/korean-skincare-routine" target="_blank" rel="noopener">Cleveland Clinic · Korean skincare routine</a>
    </div>
    <div class="module-takeaway"><b>Resultado esperado</b><p>Ya no deberías mirar K-Beauty como una lista de marcas. Deberías poder leerlo como un sistema y tomar una primera decisión comercial con criterio.</p></div>
  </section>`}
  ]
};
export default chapter01;
