// Cuestionarios de criterio con casos simulados; no se atribuyen ventas ni márgenes a Yeppo.
// Cifras de los ejercicios comerciales: supuestos didácticos explícitos, no precios vigentes.
const cases={
  "12.1": [
    [
      "Una clienta relata ardor creciente y dolor después de probar tres activos. ¿Cuál es la primera decisión?",
      [
        "Ofrecer un cuarto producto calmante",
        "Detener la recomendación y orientar a evaluación profesional",
        "Afirmar que toda reacción es normal"
      ],
      1,
      "El dolor y el empeoramiento quedan fuera de una recomendación cosmética rutinaria.",
      true
    ],
    [
      "La palabra «calmante» en un envase permite concluir que…",
      [
        "Trata una enfermedad cutánea",
        "No puede producir reacciones",
        "Describe una intención cosmética, no un diagnóstico ni garantía"
      ],
      2,
      "La fórmula completa, la persona y la categoría regulatoria determinan los límites.",
      false
    ],
    [
      "Antes de comparar dos cremas para una persona con tirantez leve, pregunta…",
      [
        "Qué usa ahora, qué cambió y qué textura tolera",
        "Cuántas reseñas tiene el anuncio viral",
        "Qué concentración sería la más alta"
      ],
      0,
      "La entrevista da contexto para elegir una opción sencilla y tolerable.",
      false
    ]
  ],
  "12.2": [
    [
      "Una planta tiene historia de uso tradicional. ¿Qué puedes afirmar?",
      [
        "Cualquier sérum con esa planta funciona igual",
        "Su historia no demuestra por sí sola eficacia clínica del producto terminado",
        "El producto está autorizado como medicamento"
      ],
      1,
      "Tradición, experimentos y resultados sobre fórmulas comerciales son evidencias distintas.",
      false
    ],
    [
      "Una etiqueta destaca centella en el frente. ¿Qué revisas antes de recomendar?",
      [
        "INCI completo y ficha actual",
        "Color verde del envase",
        "Número de videos con el hashtag"
      ],
      0,
      "El ingrediente destacado no describe toda la formulación.",
      false
    ],
    [
      "La clienta pide centella para curar dermatitis. Debes…",
      [
        "Prometer reparación",
        "Recomendar una dosis alta",
        "Explicar límites de la asesoría y derivar una condición médica"
      ],
      2,
      "El vendedor no prescribe ni diagnostica y no transforma evidencias preliminares en tratamientos.",
      true
    ]
  ],
  "12.3": [
    [
      "«Centella Asiatica Extract» y «Madecassoside» significan…",
      [
        "Exactamente la misma sustancia",
        "Extracto complejo frente a compuesto identificado",
        "La misma concentración"
      ],
      1,
      "Un extracto incluye diversos constituyentes; un compuesto aislado es otra materia prima.",
      false
    ],
    [
      "El lugar de un ingrediente en el INCI revela…",
      [
        "Su eficacia clínica exacta",
        "La concentración precisa en porcentaje",
        "Pistas sobre el orden de declaración, no el desempeño del producto"
      ],
      2,
      "Una lista INCI no reemplaza estudios ni datos cuantitativos cuando no se publican.",
      false
    ],
    [
      "¿Cuál es una comparación válida entre dos fórmulas?",
      [
        "Textura, vehículo, objetivo y etiquetado completo",
        "Elegir siempre la que mencione madecasósido más veces",
        "Afirmar equivalencia con cirugía reparadora"
      ],
      0,
      "La elección real depende del producto terminado y la tolerancia.",
      false
    ]
  ],
  "12.4": [
    [
      "Una crema contiene pantenol y glicerina. ¿Qué conclusión es correcta?",
      [
        "Podría combinar funciones humectantes en una fórmula concreta",
        "Cura cualquier daño en 24 horas",
        "No requiere revisar emolientes ni conservantes"
      ],
      0,
      "La combinación se interpreta por funciones cosméticas y no garantiza una respuesta universal.",
      false
    ],
    [
      "¿Qué explica una diferencia de respuesta entre dos productos con pantenol?",
      [
        "El color de las tapas",
        "Vehículo, composición y condiciones de uso distintos",
        "Que el INCI es irrelevante"
      ],
      1,
      "No se extrapola automáticamente evidencia de una formulación a otra.",
      false
    ],
    [
      "Si una crema resulta demasiado pesada para usar a diario, ¿qué priorizas?",
      [
        "Imponerla por su activo",
        "Duplicar la dosis",
        "Comparar una textura que la persona sostenga"
      ],
      2,
      "La adherencia y comodidad son parte de una recomendación aplicable.",
      false
    ]
  ],
  "12.5": [
    [
      "«Natural» en un producto botánico significa…",
      [
        "Que no causa alergias",
        "Que no requiere leer ingredientes",
        "Que no garantiza inocuidad ni tolerancia individual"
      ],
      2,
      "Los extractos vegetales también pueden generar reacciones.",
      false
    ],
    [
      "Heartleaf, mugwort y aloe son…",
      [
        "Nombres que exigen revisar especie, extracto y composición concreta",
        "La misma planta en tres idiomas",
        "Ingredientes con dosis idéntica en todas las marcas"
      ],
      0,
      "La identificación botánica y el procesamiento cambian la interpretación.",
      false
    ],
    [
      "Una persona relata alergia previa a una planta del producto. ¿Qué haces?",
      [
        "Prometer tolerancia por ser cosmético",
        "Evitar recomendación automática, revisar ingredientes y orientar consulta si corresponde",
        "Indicar prueba casera como garantía de seguridad"
      ],
      1,
      "No se debe minimizar un antecedente al recomendar un producto.",
      true
    ]
  ],
  "12.6": [
    [
      "Los beta-glucanos derivados de fuentes distintas…",
      [
        "Tienen siempre el mismo peso molecular",
        "No necesariamente son equivalentes en estructura ni desempeño",
        "Son medicamentos"
      ],
      1,
      "La fuente y formulación pueden cambiar propiedades de uso.",
      false
    ],
    [
      "¿Cómo juzgar una fórmula con alantoína y beta-glucano?",
      [
        "Solo por la cantidad de activos destacados",
        "Asumiendo que sirve para todo tipo de piel",
        "Por textura, conjunto de ingredientes, objetivo y tolerancia"
      ],
      2,
      "La fórmula completa pesa más que una lista de reclamos.",
      false
    ],
    [
      "Una clienta quiere duplicar cinco sérums de confort. La respuesta útil es…",
      [
        "Revisar funciones repetidas y simplificar",
        "Vender todos para sumar beneficio",
        "Ignorar la rutina actual"
      ],
      0,
      "Duplicar pasos no prueba más eficacia y puede aumentar fricción e incertidumbre.",
      false
    ]
  ],
  "12.7": [
    [
      "Una clienta presenta hinchazón facial y dificultad respiratoria tras usar un cosmético. ¿Qué corresponde?",
      [
        "Ofrecer ampolla calmante",
        "Suspender la recomendación y buscar atención médica urgente",
        "Esperar a que se adapte la piel"
      ],
      1,
      "La dificultad respiratoria es una señal de urgencia médica, no una consulta comercial.",
      true
    ],
    [
      "Al usar como caso la SKIN1004 Madagascar Centella Ampoule, ¿qué confirmas?",
      [
        "Ficha y presentación vigentes, uso y compatibilidad con la rutina",
        "Que elimina cualquier enfermedad",
        "Que sustituye a toda crema"
      ],
      0,
      "La imagen y el nombre del producto no sustituyen una lectura correcta y actualizada.",
      false
    ],
    [
      "¿Cuál es un seguimiento razonable?",
      [
        "Prometer resultados en 24 horas",
        "Pedir que aplique diez capas",
        "Acordar observación de tolerancia y evitar sumar varios cambios juntos"
      ],
      2,
      "Una variable a la vez facilita identificar qué se tolera.",
      false
    ]
  ],
  "12.8": [
    [
      "Un estudio sobre un ingrediente permite afirmar…",
      [
        "Que toda marca con ese ingrediente tiene el mismo resultado",
        "Lo que estudió ese diseño y formulación, con sus límites",
        "Que reemplaza aprobación sanitaria local"
      ],
      1,
      "La transferencia de evidencia exige correspondencia con el producto y la vía estudiada.",
      false
    ],
    [
      "Una reseña internacional positiva demuestra…",
      [
        "La eficacia clínica de cualquier tratamiento",
        "Que no habrá efectos adversos",
        "Una experiencia de usuario, no un resultado representativo"
      ],
      2,
      "Las reseñas son útiles como señal de percepción y uso, no como prueba clínica.",
      false
    ],
    [
      "¿Cuándo tiene sentido cerrar una venta de cosmética calmante?",
      [
        "Cuando la recomendación responde al objetivo sin ocultar contraindicaciones ni incertidumbre",
        "Siempre que el producto sea tendencia",
        "Cuando se le asegura a la clienta que no habrá reacción"
      ],
      0,
      "La decisión debe ser informada, realista y consistente con el alcance comercial.",
      false
    ]
  ],
  "30.1": [
    [
      "Simulación: precio $11.900 IVA incluido, IVA 19 %. ¿Venta neta?",
      [
        "$11.900",
        "$10.000",
        "$9.900"
      ],
      1,
      "Venta neta = 11.900 ÷ 1,19 = 10.000 CLP.",
      false
    ],
    [
      "Sobre venta neta $10.000, COGS $5.000, comisión $1.000 y logística $500. ¿Contribución?",
      [
        "$3.500",
        "$5.000",
        "$4.500"
      ],
      0,
      "10.000 − 5.000 − 1.000 − 500 = 3.500 CLP.",
      false
    ],
    [
      "Para calcular el margen de contribución del caso anterior, divides…",
      [
        "3.500 por precio bruto 11.900",
        "5.000 por costo 5.000",
        "3.500 por venta neta 10.000"
      ],
      2,
      "La contribución / venta neta = 35 %; no mezclar bases brutas con netas.",
      false
    ]
  ],
  "30.2": [
    [
      "Costo $5.000, recargo sobre costo de 60 %. ¿Precio neto?",
      [
        "$8.000",
        "$6.250",
        "$5.300"
      ],
      0,
      "Recargo del 60 % sobre el costo: 5.000 × (1 + 0,60) = 8.000 CLP netos. El denominador del recargo es el costo.",
      false
    ],
    [
      "Sobre precio neto $8.000 y costo $5.000, margen bruto es…",
      [
        "60 %",
        "37,5 %",
        "25 %"
      ],
      1,
      "(8.000 − 5.000)/8.000 = 37,5 %; recargo y margen usan denominadores diferentes.",
      false
    ],
    [
      "Para obtener un 20 % de margen bruto con costo $5.000, precio neto mínimo exacto…",
      [
        "$6.000",
        "$5.200",
        "$6.250"
      ],
      2,
      "P = costo/(1 − 0,20) = 6.250 CLP, antes de costos de canal.",
      false
    ]
  ],
  "30.3": [
    [
      "PVP $23.800 con IVA 19 %. ¿Venta neta?",
      [
        "$20.000",
        "$19.000",
        "$23.800"
      ],
      0,
      "La venta neta se obtiene dividiendo el precio bruto por 1,19: 23.800 ÷ 1,19 = 20.000 CLP sin IVA.",
      false
    ],
    [
      "Una comisión de 10 % sobre venta neta de $20.000 es…",
      [
        "$2.380",
        "$2.000",
        "$200"
      ],
      1,
      "La base del caso es venta sin IVA; 0,10 × 20.000 = 2.000.",
      false
    ],
    [
      "¿Qué error se debe evitar al informar margen?",
      [
        "Indicar impuesto y base de cálculo",
        "Separar bruto y neto",
        "Restar IVA y luego dividir ganancia por PVP bruto"
      ],
      2,
      "Los numeradores y denominadores deben estar expresados sobre una base coherente.",
      false
    ]
  ],
  "30.4": [
    [
      "Simulación: canal A cobra 12 % + $500 y canal B 15 % sin fijo. Venta neta $10.000. ¿Cuál fee es menor?",
      [
        "Canal A: $1.700",
        "Canal B: $1.500",
        "Son iguales"
      ],
      1,
      "A = 1.200 + 500 = 1.700; B = 1.500. Comparar costos totales.",
      false
    ],
    [
      "Si la venta es $5.000 netos, mismo esquema. ¿Qué canal cuesta menos?",
      [
        "A ($1.100)",
        "B ($750)",
        "Ambos $500"
      ],
      1,
      "Con venta neta de 5.000 CLP, el canal A cobra 12 % (600) más 500 fijo = 1.100 CLP; el canal B cobra 15 % = 750 CLP.",
      false
    ],
    [
      "Una comisión anunciada de 12 % por sí sola…",
      [
        "No representa necesariamente el costo total por SKU",
        "Incluye siempre embalaje y devoluciones",
        "Garantiza margen neto positivo"
      ],
      0,
      "Incorporar logística y otros costos variables, según reglas reales del canal.",
      false
    ]
  ],
  "30.5": [
    [
      "Producto con venta neta $10.000, costo $6.000. Tras 10 % de descuento neto queda…",
      [
        "$9.000 de venta neta",
        "$10.000 de venta neta",
        "$8.000 de costo"
      ],
      0,
      "Se asume descuento antes de comisiones y sin otros cambios: 10.000 × 0,90 = 9.000.",
      false
    ],
    [
      "En esa simulación, el margen bruto tras descuento es…",
      [
        "40 %",
        "33,33 %",
        "10 %"
      ],
      1,
      "Después del descuento, el margen sobre venta neta es (9.000 − 6.000) ÷ 9.000 = 33,33 %, antes de gastos de canal.",
      false
    ],
    [
      "Para aprobar la promo de un canal real necesitas…",
      [
        "Mirar unidades estimadas solamente",
        "Ignorar precio de referencia",
        "Recalcular comisiones, aportes, logística y margen posterior"
      ],
      2,
      "El margen postpromoción cambia con la base de cálculo y costos por venta.",
      false
    ]
  ],
  "30.6": [
    [
      "Un cosmético de 50 ml cuesta $10.000. Precio por ml…",
      [
        "$200/ml",
        "$500/ml",
        "$50/ml"
      ],
      0,
      "Dividir el precio de 10.000 CLP por los 50 ml contenidos: el precio unitario es 200 CLP por ml.",
      false
    ],
    [
      "Otra presentación de 100 ml cuesta $17.500. Por unidad de medida resulta…",
      [
        "$200/ml",
        "$175/ml",
        "$350/ml"
      ],
      1,
      "La segunda presentación contiene 100 ml: 17.500 ÷ 100 = 175 CLP/ml, inferior a 200 CLP/ml del formato anterior.",
      false
    ],
    [
      "¿Qué debe comunicar una comparación entre tamaños?",
      [
        "El más grande es siempre apropiado",
        "Que vence más tarde sin verificar",
        "Precio unitario más bajo sin ocultar consumo, vencimiento ni preferencia"
      ],
      2,
      "El precio unitario es un indicador, no sustituye la conveniencia para el cliente.",
      false
    ]
  ],
  "30.7": [
    [
      "Utilidad bruta anual de $2.000.000; inventario promedio a costo $1.000.000. GMROI es…",
      [
        "2,0",
        "50 %",
        "$1.000.000"
      ],
      0,
      "GMROI = utilidad bruta / inventario promedio a costo = 2,0.",
      false
    ],
    [
      "Dos productos con igual margen pueden dar GMROI distinto por…",
      [
        "Color de su etiqueta",
        "Rotación e inversión promedio en inventario",
        "Cantidad de hashtags"
      ],
      1,
      "La rentabilidad del capital inmovilizado depende de cuánto rota el stock.",
      false
    ],
    [
      "Si compras inventario para 280 días con demanda incierta, corresponde…",
      [
        "Comprar más por descuento de proveedor",
        "Ignorar cobertura porque margen es alto",
        "Revisar cobertura, liquidez y riesgo de vencimiento antes de reponer"
      ],
      2,
      "El margen por SKU no resuelve la productividad del capital ni riesgo de obsolescencia.",
      false
    ]
  ],
  "30.8": [
    [
      "Caso de cálculo: PVP $11.900 IVA incluido, costo neto $5.000, fee 10 % de neto y logística $500. ¿Contribución?",
      [
        "$4.500",
        "$3.500",
        "$5.000"
      ],
      1,
      "Ingreso 10.000 − costo 5.000 − comisión 1.000 − logística 500 = 3.500 CLP.",
      false
    ],
    [
      "En ese caso el margen de contribución es…",
      [
        "35 %",
        "29,4 %",
        "50 %"
      ],
      0,
      "3.500/10.000 = 35 %. El 29,4 % usaría la base bruta incorrecta.",
      false
    ],
    [
      "Si la calculadora recibe precio cero o negativo, debe…",
      [
        "Devolver margen infinito",
        "Inventar un precio de referencia",
        "Bloquear el cálculo y solicitar un valor válido"
      ],
      2,
      "Nunca dividir por cero ni interpretar cifras inválidas como rentabilidad.",
      false
    ]
  ]
};
export function withIndependentAssessments(chapter){
  return {...chapter,modules:chapter.modules.map(module=>{
    const rows=cases[module.label];
    if(!rows)return module;
    return {...module,assessment:{version:1,passPercent:80,questions:rows.map(([prompt,options,correct,explanation,critical],i)=>({id:'q'+(i+1),prompt,options,correct,explanation,critical:Boolean(critical)}))}};
  })};
}
