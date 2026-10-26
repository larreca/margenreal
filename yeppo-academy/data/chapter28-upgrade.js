// Ruta 6, capítulo 28. Casos comerciales hipotéticos, sin ventas reales atribuidas a Yeppo.
// Conservar los ejemplos originales: las cifras del snapshot de 01/10/2026 son HISTÓRICAS.
const cases={
 "28.1":{
 objective:"decidir qué necesidad necesita profundidad y cuál tiene productos redundantes",
 scenario:"Tienda de práctica: tienes presupuesto para 12 referencias. Ya ofreces seis tónicos calmantes de precio y textura parecidos; solo cuentas con un limpiador suave y no tienes protector solar cómodo para uso diario. No se aportan datos de ventas.",
 task:"¿Qué dos huecos o duplicaciones investigarías primero y qué dato exigirías antes de modificar el surtido?",
 resolution:"Primero valida demanda y disponibilidad de fotoprotección y limpieza; después revisa si los seis tónicos cubren necesidades distintas o duplican propuesta. No elimines productos solo por cantidad de SKU: compara ventas, margen, cobertura y rol por variante. La decisión debe preservar una opción por necesidad principal.",
 limit:"Las cifras de esta tienda son simuladas. Que dos fórmulas tengan la misma categoría no prueba que sean sustitutos."
 },
 "28.2":{
 objective:"asignar el rol principal a un SKU y seleccionar una métrica coherente",
 scenario:"Una mascarilla atrae búsquedas pero tiene margen bajo; un limpiador estable se recompra con frecuencia; una novedad viral no tiene historia de venta.",
 task:"Clasifica los tres roles y define un indicador principal para seguir cada uno.",
 resolution:"Mascarilla: tráfico, revisar contribución después de costos y si genera canasta. Limpiador: core y recompra, revisar disponibilidad y frecuencia de reposición. Novedad: tendencia, compra de prueba y sell-through de 14/30 días. No forzar un solo KPI para los tres roles.",
 limit:"El rol es una hipótesis de gestión, no una calificación contable universal."
 },
 "28.3":{
 objective:"calcular GMROI y separar eficiencia del capital de beneficio absoluto",
 scenario:"Ejercicio simulado de un trimestre: SKU A produjo $900.000 de margen bruto y mantuvo $600.000 de inventario promedio a costo; SKU B produjo $700.000 con $250.000 invertidos. No se incluyen costos de canal.",
 task:"Calcula ambos GMROI y decide cuál usa mejor el capital, explicando por qué no elegirías únicamente por esta métrica.",
 resolution:"GMROI A = 900.000 / 600.000 = 1,50. GMROI B = 700.000 / 250.000 = 2,80. B genera más margen bruto por peso de inventario, aunque A deja más margen absoluto. La decisión final también exige disponibilidad, riesgo, demanda, misión de compra y costos no incluidos.",
 limit:"Son datos simulados y el margen bruto no es contribución final del canal."
 },
 "28.4":{
 objective:"organizar surtido por misión de cliente antes que por popularidad de marca",
 scenario:"Una tienda de práctica quiere ayudar a quien pide una rutina simple y un protector solar de acabado ligero. Tiene cuatro productos de una sola familia de mascarillas y presupuesto para dos SKU más.",
 task:"Propón dos misiones de compra y define por qué incorporarías o descartarías una opción.",
 resolution:"Misión 1: rutina básica, identificando limpiador, hidratante y SPF según disponibilidad actual. Misión 2: fotoprotección de acabado ligero, comparando formato, modo de uso y sensorialidad. Comprar dos SKU requiere primero determinar qué huecos son reales y verificar sus fichas y demanda.",
 limit:"No se infiere que una marca resuelva una necesidad solo por su nombre o tendencia."
 },
 "28.5":{
 objective:"distinguir fotografía histórica de inventario de un diagnóstico comercial",
 scenario:"El material original del 01-10-2026 registró 7.560 unidades de una mascarilla Yeppo. Ejercicio hipotético: imagina ventas de 120 unidades/día, y después de 40 unidades/día; las ventas son supuestos, NO datos de Yeppo.",
 task:"Calcula días de cobertura en ambos escenarios y explica si el solo stock basta para anunciar sobrestock.",
 resolution:"Cobertura hipotética = 7.560 / 120 = 63 días; con 40 por día serían 189 días. El mismo inventario puede implicar necesidades opuestas según venta y reposición. Para interpretar el caso real faltan ventas efectivas, vencimiento, compromisos, stock por ubicación, costo y rol.",
 limit:"Los números de velocidad son totalmente simulados; el stock citado es histórico del contenido, no una consulta en vivo ni una alerta operativa."
 },
 "28.6":{
 objective:"diseñar una prueba de producto con umbrales y decisión de reposición",
 scenario:"Lanzamiento simulado: se reciben 40 unidades de un producto nuevo; se venden 24 en 14 días. No se informa lead time ni estacionalidad.",
 task:"Calcula sell-through inicial y enumera los datos faltantes antes de comprar otras 200 unidades.",
 resolution:"Sell-through = 24 / 40 × 100 = 60 % en 14 días. Es una señal inicial, no prueba de demanda permanente. Antes de ampliar compra consulta el margen, devoluciones, comentarios, cobertura, lead time, reposición del proveedor y tendencia sostenida. Define una nueva revisión a 30 días.",
 limit:"No existe umbral universal de 60 % para todas las categorías; la prueba es ilustrativa."
 },
 "28.7":{
 objective:"armar un tablero útil para decidir, no solo observar ventas",
 scenario:"Tienda simulada: el SKU X vende 60 de 100 unidades recibidas; el SKU Y tiene venta alta pero frecuentes quiebres; el SKU Z tiene cobertura muy alta y bajo margen.",
 task:"Calcula sell-through de X y asigna una acción verificable para Y y Z.",
 resolution:"X presenta 60 % de sell-through sobre la cohorte de 100 recibidas. Y requiere revisar demanda, lead time y reposición para reducir quiebres. Z exige revisar margen, días de cobertura y rol antes de inmovilizar más capital. Todo se contrasta por período y unidad de análisis.",
 limit:"No usar el score orientativo del capítulo como orden automática de compras ni mezclar stock al cierre con unidades recibidas."
 },
 "28.8":{
 objective:"documentar una decisión de surtido B2B con siguiente comprobación",
 scenario:"Revisión simulada: A tiene buena venta y reposición incierta; B es una novedad sin ventas suficientes; C presenta 150 días de cobertura y ocupa espacio esencial para otra categoría.",
 task:"Completa para cada SKU una decisión: mantener/escalar, testear o reducir, y fija qué comprobarías a 30 días.",
 resolution:"A: priorizar disponibilidad y riesgo de proveedor antes de escalar. B: testear con compra pequeña y criterio de salida. C: revisar rol, vencimiento y movimiento entre ubicaciones antes de reducir su profundidad. Registrar responsable, fecha y KPI de revisión evita decisiones sin seguimiento.",
 limit:"Los 150 días de cobertura se inventan para el ejercicio; no describen productos ni inventario de Yeppo."
 }
};
const lines=[
 ["28.1",[
 ["Una tienda ofrece diez tónicos similares y carece de SPF. ¿Qué revisas antes?",["Aumentar a quince tónicos","Necesidades no cubiertas y duplicaciones verificables","Eliminar los diez sin revisar venta"],1,"Antes de modificar surtido hay que identificar huecos de misión de compra y posibles redundancias.",false],
 ["Amplitud de surtido significa…",["Número de categorías y necesidades cubiertas","Unidades por cada SKU","Cantidad de pedidos del proveedor"],0,"Amplitud es cobertura de necesidades; profundidad es cantidad de opciones por necesidad.",false],
 ["Profundidad de surtido significa…",["Solo número de marcas","Margen porcentual total","Alternativas dentro de una necesidad"],2,"Profundidad es la diversidad de alternativas disponibles para una misma misión.",false],
 ["¿Cuál es la evidencia insuficiente para retirar un SKU?",["Margen negativo y vencimiento confirmado","Que haya otros SKU con nombres parecidos","Ausencia de función y rotación tras revisión"],1,"La similitud de nombre no prueba sustituibilidad ni justifica una baja sin datos.",false],
 ["¿Qué cambia entre tiendas?",["Necesidades y demanda local","La definición matemática de GMROI","La obligación de comprobar riesgos"],0,"Se puede adaptar el mix a demanda local; las reglas de calidad y los cálculos se mantienen.",false]
 ]],
 ["28.2",[
 ["Una novedad sin historia comercial debe tratarse primero como…",["Core de alta reposición","Tendencia a comprobar con test pequeño","Garantía de ventas"],1,"Un producto de tendencia exige hipótesis, compra controlada y revisión de tracción.",false],
 ["¿Qué KPI encaja con un SKU core?",["Seguidores del influencer","Cantidad de colores del envase","Disponibilidad y reposición"],2,"Una referencia core debe sostener servicio y disponibilidad de una necesidad permanente.",false],
 ["Un SKU de tráfico con margen bajo requiere revisar…",["Contribución de canal y valor de canasta","Solo número de likes","Cuánto espacio ocupa su imagen"],0,"La adquisición de visitas puede justificarse solo si la economía del conjunto sostiene el negocio.",false],
 ["¿Qué indica el rol de un SKU?",["Una clasificación médica","Para qué se mantiene y cómo se evaluará","Un permiso de importación"],1,"Asignar un rol ayuda a definir una expectativa comercial y un indicador coherente.",false],
 ["Un producto puede cumplir dos roles…",["Nunca","Solo si es premium","Sí, si se explican y miden ambos"],2,"Las funciones comerciales pueden coexistir, pero exigen argumentos y mediciones consistentes.",false]
 ]],
 ["28.3",[
 ["GMROI de $900.000 de margen bruto / $600.000 de inventario promedio a costo:",["1,5","0,67","150.000"],0,"900.000 dividido 600.000 equivale a 1,5 de margen bruto por peso de inventario.",false],
 ["GMROI de $700.000 / $250.000:",["0,36","2,8","450.000"],1,"700.000 dividido 250.000 equivale a 2,8; el cálculo utiliza la misma unidad monetaria.",false],
 ["¿Cuál usa mejor capital en los dos ejercicios?",["SKU A, por margen absoluto mayor","No pueden compararse sus índices","SKU B, mayor GMROI"],2,"B produce 2,8 por peso de inventario frente a 1,5 de A, pero no resuelve solo la decisión.",false],
 ["¿Qué dato NO es equivalente al margen bruto del ejercicio?",["Contribución neta después de comisiones y logística","Beneficio bruto de las ventas","Monto usado en numerador de GMROI"],0,"El margen bruto no descuenta todas las tarifas y otros costos de cumplimiento o canal.",false],
 ["¿Cuál variable falta antes de decidir la compra definitiva?",["Solo color del envase","Disponibilidad, demanda y riesgo de quiebres","Un promedio de reseñas sin fechas"],1,"Un buen índice de capital no reemplaza revisión de nivel de servicio y riesgo comercial.",false]
 ]],
 ["28.4",[
 ["Una misión de compra es…",["Una campaña de descuentos universal","La cantidad de marcas en un expositor","Una necesidad o trabajo que el cliente quiere resolver"],2,"La misión organiza primero qué necesita la persona y después qué producto podría cubrirlo.",false],
 ["Si la tienda carece de una opción de SPF ligero…",["Evaluar si hay hueco documentado de fotoprotección","Comprar más limpiadores sin revisión","Agregar cualquier viral"],0,"La selección de SKU se justifica por misión, requisitos del producto y demanda verificable.",false],
 ["La marca se elige mejor…",["Antes de conocer al cliente","Después de definir necesidades y atributos","Siempre por la de más seguidores"],1,"La arquitectura por misión prioriza función, textura, presupuesto y uso sobre nombre comercial.",false],
 ["Una opción complementaria debe…",["Ser la más cara","Repetir exactamente la función existente","Aportar una función relacionada y defendible"],2,"Los productos complementarios tienen sentido cuando añaden utilidad real al recorrido del cliente.",false],
 ["Un surtido orientado a cliente evita…",["Duplicación y huecos de solución","Preguntar por textura","Verificar ficha del fabricante"],0,"Organizar por misión vuelve visibles ausencias y redundancias que no se detectan por marca.",false]
 ]],
 ["28.5",[
 ["7.560 unidades a 120 unidades/día equivalen a…",["189 días","63 días","7 días"],1,"La cobertura hipotética es 7.560 dividido por 120: sesenta y tres días.",false],
 ["7.560 unidades a 40 unidades/día equivalen a…",["63 días","40 días","189 días"],2,"El mismo inventario cubre 189 días si el consumo promedio hipotético es de 40 por día.",false],
 ["¿Por qué ambas coberturas no describen a Yeppo?",["Porque las ventas usadas son datos simulados","Porque el inventario es siempre inventado","Porque una mascarilla no tiene cobertura"],0,"La ficha contiene un stock histórico; las velocidades de venta del ejercicio son supuestos.",false],
 ["¿Qué dato permite estimar cobertura real?",["Seguidores en redes","Venta diaria, stock utilizable y fecha de observación","Número de fotos del producto"],1,"Una cobertura interpretable requiere demanda real coherente con la misma ubicación y período.",false],
 ["Stock grande equivale automáticamente a sobrestock:",["Sí, sin excepciones","Solo si la marca es nueva","No: falta rotación, vencimiento, cobertura y compromisos"],2,"El inventario absoluto no indica por sí solo exceso ni demanda; hay que cruzar variables.",false]
 ]],
 ["28.6",[
 ["Se vendieron 24 de 40 recibidas. El sell-through inicial es…",["60 %","40 %","24 %"],0,"24 dividido por 40 multiplicado por 100 es 60 por ciento en el período indicado.",false],
 ["El 60 % del ejercicio autoriza pedir 200 unidades sin más datos:",["Siempre","No; faltan lead time, margen y tendencia","Sí, porque confirma recompra"],1,"Una señal inicial requiere validarse con abastecimiento, beneficio, devoluciones y período.",false],
 ["Test-buy es…",["Una compra de todo el catálogo","Una promesa de venta futura","Una compra acotada con hipótesis y umbral de revisión"],2,"La compra de prueba reduce exposición y crea datos para una decisión de escalamiento.",false],
 ["¿Qué harías si una novedad pierde tracción?",["Revisar reposición y riesgo de quedar con stock","Comprar profundo por orgullo","Cambiar de nombre sin análisis"],0,"La ausencia de tracción sostenida obliga a revisar profundidad y permanencia antes de comprar.",false],
 ["¿Cuál es una señal que conviene registrar?",["Solo el color preferido","Sell-through por cohorte y fechas","Solo una reseña positiva"],1,"El indicador requiere denominador, período y datos comparables para evitar interpretaciones erróneas.",false]
 ]],
 ["28.7",[
 ["60 unidades vendidas de 100 recibidas equivalen a…",["40 %","160 %","60 % de sell-through"],2,"Con cohorte de cien unidades, sesenta vendidas equivalen a sesenta por ciento.",false],
 ["Un SKU core con quiebres repetidos exige…",["Revisar demanda, lead time y punto de reposición","Reducir disponibilidad de inmediato","Solo subir el precio"],0,"La continuidad de un SKU core se evalúa con disponibilidad y riesgo de reposición.",false],
 ["Un tablero de surtido útil combina…",["Solo visitas","Venta, margen, sell-through, cobertura y rol","Solo inventario actual"],1,"El tablero permite decidir cuando conecta productividad y riesgo con función del SKU.",false],
 ["Un score orientativo de surtido…",["Puede comprar automáticamente por el alumno","Reemplaza evaluación de proveedor","Ayuda a priorizar revisión, no sustituye criterio"],2,"Un índice compuesto es una ayuda de triage y no una orden universal de compra.",false],
 ["¿Qué es un error al medir sell-through?",["Mezclar períodos y denominadores no comparables","Indicar el período de venta","Separar lo recibido de lo vendido"],0,"Hay que informar cohorte, período y unidades compatibles para que el porcentaje sea reproducible.",false]
 ]],
 ["28.8",[
 ["Un SKU con alto giro y riesgo de reposición…",["Se elimina siempre","Requiere plan de abastecimiento antes de escalar","Se sustituye por una tendencia"],1,"Las decisiones deben considerar proveedor y servicio, no solo rendimiento histórico.",false],
 ["Una tendencia nueva sin datos suficientes…",["Debe comprarse masivamente","Se ignora aunque haya demanda","Se prueba con límites y revisión"],2,"Un test pequeño permite contrastar hipótesis y limitar capital expuesto.",false],
 ["150 días de cobertura simulada requieren…",["Revisar rotación, vencimiento y rol antes de reducir","Liquidar sin contexto","Comprar para redondear pedido"],0,"El riesgo de exceso debe contextualizarse con datos, función y restricciones.",false],
 ["Una decisión ejecutable contiene…",["Solo la categoría","Acción, responsable, KPI y fecha de revisión","Solo opinión de un vendedor"],1,"Asignar un responsable y una fecha transforma una decisión de surtido en un control operativo.",false],
 ["¿Cuándo termina la revisión trimestral de surtido?",["Al exportar la planilla","Al sumar referencias","Cuando se ejecuta y se vuelve a medir el impacto"],2,"Un ciclo útil documenta hipótesis, acción, seguimiento y aprendizaje para la siguiente compra.",false]
 ]]
];
const questionBank=Object.fromEntries(lines);
const form=(c)=>'<section class="academy-applied-practice" aria-label="Aplicación de surtido"><small>EJERCICIO APLICADO · CIFRAS SIMULADAS</small><h4>Objetivo: '+c.objective+'</h4><p><strong>Datos del caso:</strong> '+c.scenario+'</p><p><strong>Tu decisión y cálculo:</strong> '+c.task+'</p><label class="academy-case-input">Escribe tu decisión antes de revisar la solución<textarea rows="4" maxlength="2500" placeholder="Explica el dato, la decisión y qué comprobarías. El texto no se guarda automáticamente."></textarea></label><p class="academy-case-hint" role="status" aria-live="polite">Escribe al menos una frase para habilitar la resolución.</p><details class="academy-case-answer"><summary>Consultar resolución razonada</summary><p>'+c.resolution+'</p><p><strong>Límite del ejemplo:</strong> '+c.limit+'</p></details></section>';
export function upgradeAssortmentChapter(chapter){
 if(chapter?.id!=='c28')throw new Error('El complemento de surtido requiere c28');
 return {...chapter,contentVersion:Math.max(3,Number(chapter.contentVersion||0)),modules:chapter.modules.map(m=>{
  const c=cases[m.label],qs=questionBank[m.label];
  if(!c||qs?.length!==5)throw new Error('Caso sin completar para '+m.label);
  return {...m,html:m.html+form(c),assessment:{version:1,passPercent:80,questions:qs.map(([prompt,options,correct,explanation,critical],i)=>({id:'q'+(i+1),prompt,options,correct,explanation,critical:Boolean(critical)}))}};
 })};
}
