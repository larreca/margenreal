Manual completo — MargenReal V37 (Chile)
0) Qué es esta app (en simple)

MargenReal es una web-app local (corre en tu navegador) para calcular margen real por canal y proponer precios que cumplan una meta de margen.

SKU: identificador único del producto.

Costo base (con IVA): tu costo de compra (CLP) incluyendo IVA.

IVA 19%: la app calcula venta neta (precio / 1,19).

Comisión: % cobrado por el canal (Mercado Libre, Falabella, etc.).

Logística: costo de envío/fulfillment estimado según reglas (tramos por precio o fijo).

Costo variable: suma de comisiones + logística + pasarela + packing + devoluciones + ads + buffer.

Utilidad: lo que queda después de costos variables y costo neto del producto.

Margen%: utilidad / venta neta.

1) Etapa 1 — Arranque rápido (primer uso en 10 minutos)
Paso 1: abrir la app

Abre el archivo HTML en Chrome/Edge.

Verifica que arriba diga Versión V37 · Fecha 13-02-2026 · Creado por Matías Trinidad.

Paso 2: cargar productos (dos caminos)

Camino A — Importar Excel (recomendado para operación real)

Clic en Descargar plantilla (icono archivo con flecha ↓).

Completa el Excel y vuelve.

Clic en Importar Excel y selecciona el archivo.

Camino B — Simular un SKU (para pruebas rápidas)

Clic Simular SKU.

Ingresa SKU, costo y precio.

Revisa resultados por canal.

Clic Guardar como SKU.

Paso 3: revisar configuración por canal (antes de decidir precios)

Clic en Reglas y comisiones (icono sliders).

Selecciona un canal (arriba del modal).

Ajusta comisión y logística (si aplica).

Guarda.

Paso 4: trabajar precios por canal o en OMNI

Si quieres un precio “que sobreviva” todos los canales, usa OMNI.

Si quieres optimizar por canal, entra a cada pestaña (Mercado Libre, Falabella, etc.).

Paso 5: exportar (para publicar o compartir)

Exportar Reporte (Excel completo).

Exportar Tab (Excel del canal/pestaña actual).

Exportar Filtrados (solo lo que estás viendo filtrado).

Feeds (export orientado a carga en marketplace).

2) Estructura de la pantalla (qué estás mirando)
2.1 Barra superior (header)

Incluye:

Nombre del sistema + estado de SKUs.

Botón Simular SKU.

Íconos (acciones avanzadas): configuración, escenarios, auditoría, salud de datos, tareas, KPIs, feeds, plantilla, exportes, backup, borrar.

Botones grandes: Backup y Importar Excel.

2.2 Panel de control (zona izquierda/arriba)

Buscador (por SKU o nombre).

Filtro por margen (todos / crítico / bajo / saludable / negativo).

Filtro por tags (etiquetas).

Filtro Guardrails (OK/WARN/BLOCK).

Acciones de selección (seleccionar filtrados / solo seleccionados / limpiar selección).

Comisión global del canal (aplica como override “masivo”).

Acciones masivas (tags, promo, export filtrados).

Controles adicionales (umbral alerta y otros).

2.3 Tabla principal (zona derecha/abajo)

Es la operación diaria: ver margen, editar precio, ajustar logística, aplicar sugeridos, etiquetar, exportar.

3) Conceptos clave (para que los números “cierren”)
3.1 “Venta neta”

Se calcula como: Precio publicado / 1,19

Es útil porque el margen se compara “sin IVA”.

3.2 “Recibes / líquido”

Es lo que te queda de la venta neta después de costos variables:

Comisión (% y fijo si aplica)

Logística (según reglas o manual)

Pasarela (si el canal la usa)

Packing fijo (si lo configuras)

Devoluciones % (si lo configuras)

Ads % (si lo configuras)

Buffer % (colchón de riesgo; “buffer” = margen de seguridad)

3.3 “Utilidad” y “Margen%”

Utilidad = líquido – costo neto (costo con IVA / 1,19)

Margen% = utilidad / venta neta

4) Pestañas (tabs) y cómo usarlas
4.1 OMNI (la pestaña más importante para pricing “sin sorpresas”)

Qué hace: calcula para cada SKU el peor margen entre canales y propone un precio OMNI para que el SKU cumpla la meta en el canal más débil.

Cómo usar:

Entra a OMNI.

Ordena por peor margen (si aplica).

Revisa columna de “canal débil”.

Si apruebas el sugerido, usa acciones para aplicarlo como precio de lista (nivelar).

Cuándo usarlo: cuando tu objetivo es consistencia omnicanal (misma lista base que no te rompa en un marketplace caro).

4.2 ZONA MUERTA (DEAD) — Mercado Libre

Qué es: una zona de precio donde, por salto de costos logísticos, te puede convenir “escapar” a $19.989.

Cómo usar:

Entra a ZONA MUERTA.

Verás SKUs marcados como “trampa” (shipping trap).

Compara margen/utilidad actual vs margen/utilidad a $19.989.

Si corresponde, usa acción masiva: “ML: poner 19.989” sobre seleccionados.

Cuándo importa: cuando vendes en Mercado Libre y trabajas rangos donde el costo de envío “pega un salto”.

4.3 Pestañas por canal marketplace (Mercado Libre, Falabella, Paris, Ripley, Líder/Walmart)

Cada canal muestra lo mismo pero usando sus reglas/costos.

Qué haces aquí:

Revisas precio actual vs sugerido.

Detectas SKUs con margen malo.

Ajustas overrides (precio/comisión/logística) por SKU si necesitas.

Exportas para publicación.

4.4 Canales “externos” (Shopify, PedidosYa, UberEats)

Son tratados como external:

Usan PVP Externo / Oferta Externa si existe.

Regla: si Oferta Externa > 0, se usa como precio activo; si no, se usa PVP Externo.

Cómo operar:

Entra al canal externo.

Edita PVP Externo u Oferta Externa (según corresponda).

Revisa margen.

Exporta (tab o reporte).

5) Tabla principal por canal (columna por columna)
5.1 Selección (checkbox)

Sirve para acciones masivas (aplicar sugerido, tags, promo, escape ML, etc.).

5.2 Producto

Muestra SKU y Nombre.

5.3 Tags (etiquetas)

Sirven para segmentar operación (ej: maquillaje, accesorios, alto_volumen, revisar, promo).

Botón Tags permite:

agregar tags (separados por coma)

eliminar tags

dejar vacío para limpiar

5.4 Comisión

Dropdown por SKU que permite override por SKU (si ese producto negocia diferente).

Importante: esto pisa la comisión “default” del canal.

5.5 Base (BASE / LISTA / etc.)

Indica de dónde sale el precio:

OVERRIDE: editaste precio manual para ese canal.

LISTA: usa precio de lista del SKU.

BASE: usa PVP del SKU si no hay lista.

PVP_EXT / OFERTA_EXT: usa esos campos en canales externos.

5.6 Fuente

Etiqueta operativa para entender si viene de lista/base/externo/override.

5.7 Precio (editable)

En marketplaces, normalmente editas Precio Lista del SKU.

En externos, editas PVP Externo u Oferta Externa (depende si hay oferta cargada).

Si editas aquí, estás creando un override (excepción) por SKU/canal.

5.8 Envío (logística)

Calculado por reglas del canal (tramos por precio o fijo).

Puedes forzar un override de logística por SKU/canal (si ese SKU realmente cuesta distinto).

5.9 Recibes (líquido), Utilidad, Margen%

Son el “P&L simple” (P&L = estado de resultados, en simple: ingresos vs costos).

5.10 Sugerido …90

Precio recomendado para cumplir meta de margen con regla de terminación (por defecto termina en 90).

Se calcula con:

Meta de margen (slider)

Comisión/costos

Logística

Piso mínimo

Ending (terminación)

5.11 Eliminar (ícono basurero)

Borra el SKU de la base local.

6) Filtros y acciones masivas (operación diaria)
6.1 Buscador

Escribe SKU o parte del nombre.

“Limpiar” borra el filtro.

6.2 Filtro de margen

Crítico / bajo / saludable / negativo: te ayuda a priorizar (priorización = ordenar qué atacar primero).

6.3 Filtro de tags

Selecciona un tag para ver solo esa “cartera” (cartera = conjunto de SKUs).

6.4 Filtro Guardrails (OK/WARN/BLOCK)

Filtra según estado de validación del sugerido (ver sección 9).

6.5 Selección masiva

Seleccionar filtrados: arma lista de trabajo.

Solo seleccionados: focus mode.

Limpiar selección: reset.

6.6 Acciones masivas (sobre seleccionados)

Aplicar sugerido (LISTA): escribe el sugerido como precio lista del SKU.

Reset overrides: elimina overrides de precio/comisión/logística.

ML: poner 19.989: aplica escape de zona muerta (solo útil en ML).

6.7 Tags masivos

Agregar tags a seleccionados.

Eliminar tags a seleccionados.

Marcar/Desmarcar Promo (si lo usas como etiqueta operativa).

6.8 Exportar filtrados

Genera un Excel solo con lo que estás viendo filtrado (por búsqueda/tags/margen/guardrails).

7) Simular SKU (el “laboratorio”)

Objetivo: probar un producto sin meterlo en Excel todavía.

Flujo recomendado

SKU y nombre (puede ser temporal).

Costo con IVA (o cambia BRUTO/NETO si lo ingresas sin IVA).

Ajusta:

PVP (lista base)

Oferta (si existe)

PVP Externo / Oferta Externa (si aplica)

Revisa:

Cards: precio sugerido, margen, utilidad, logística

Mira la tabla por canal:

margen por canal

si aparece zona muerta en Mercado Libre

Si está OK:

Guardar como SKU (queda en la base y aparece en tablas).

8) Reglas y comisiones (icono sliders)

Aquí se define la política por canal (policy = reglas estándar).

8.1 Qué puedes configurar

A) Comisión

% comisión

base comisión: neto o bruto

fijo comisión (si aplica)

B) Cost stack (pila de costos)

Pasarela % y fijo

Packing fijo

Devoluciones %

Ads %

Buffer %

C) Pricing rules

Ending Lista (terminación, ej: 90)

Ending Oferta

Piso mínimo (priceMin)

D) Logística

Modo:

Tramos por precio (si precio <= X, costo = Y)

Fijo (siempre el mismo costo)

Reglas por tramo (limit y cost)

8.2 Cómo chequear que quedó bien

Cambia a un canal.

Revisa 2–3 SKUs conocidos.

Confirma que logística y comisión coinciden con lo real.

Guarda.

9) Guardrails + Preflight (control de riesgo antes de exportar)

Guardrails = “barandas de seguridad” (límites para evitar publicar precios peligrosos).

9.1 Qué valida

Para cada SKU y canal, el export puede quedar:

OK: cumple todo.

WARN: hay alerta (por ejemplo cambio de precio muy grande).

BLOCK: no se permite exportar (costo vacío, margen bajo el mínimo, bajo piso, utilidad negativa, SKU duplicado, etc.).

9.2 Parámetros principales

Δ% max: cambio máximo vs precio actual permitido antes de advertir.

Mg min %: margen mínimo permitido.

Piso absoluto: mínimo general (ej: $3.990), además del piso del canal.

9.3 Dónde se usa

En el filtro Guardrails de la tabla.

En Feeds → Preflight (antes de exportar).

10) Feeds (icono “send”)

Feed = archivo de salida (Excel) para cargar precios en un canal.

10.1 Tipos de export

Actual: exporta el precio que tienes hoy (precio publicado).

Lista: exporta el sugerido de lista.

Promo: exporta lista + oferta (según descuento y ending de oferta).

10.2 Paso a paso recomendado

Abre Feeds.

Elige canal.

Configura promo si aplica (descuento y margen oferta).

Corre Preflight.

Si hay BLOCK, corrige antes.

Exporta:

“Solo OK” (seguro)

o incluir WARN si confirmas conscientemente.

11) KPIs por canal (icono bar-chart)

KPIs = indicadores clave (en simple: métricas resumen para decisión).

Qué verás (simplificado)

Cuántos SKUs están OK/WARN/BLOCK.

Margen promedio (actual o sugerido).

Percentiles P25/P50/P75 (distribución de margen/precio).

Δ Precio promedio y Δ Utilidad promedio.

Uso práctico: priorizar qué canal está “rompiendo margen” y dónde duele más cambiar precio.

12) Tareas / Backlog (icono list-check)

Backlog = lista de pendientes (pendientes operacionales).

Qué incluye

Issues de Data Health (duplicados, costo faltante, margen negativo).

Issues de Guardrails por canal (BLOCK/WARN).

Cómo usarlo

Abre Tareas.

Filtra por canal o “todos”.

Elige tipo (lista/promo).

Marca como resuelto cuando lo corregiste.

Botón “Seleccionar SKUs (canal actual)” para traerlos a tu tabla y trabajarlos.

13) Data Health (icono shield-alert)

Es un chequeo de calidad de datos (data quality, en simple: que los datos estén sanos).

Revisa:

SKU faltante

SKU duplicado

Costo faltante

Márgenes negativos detectados por canal

Úsalo antes de exportar o cuando algo “no cuadra”.

14) Auditoría + Undo (icono history)

Auditoría = registro de acciones (trazabilidad: saber qué cambió y cuándo).

Guarda entradas cuando:

cambias settings de un canal

creas un SKU desde simulador

Undo deshace la última acción (cuando hay snapshot):

settings: revierte política anterior

sku_add: elimina el SKU creado

15) Escenarios (icono layers)

Sirve para simular estrategias sin perder tu baseline.

Baseline = configuración normal.

Puedes crear escenarios desde baseline, activarlos, duplicarlos, borrarlos.

Comparación A vs B:

te dice cuántos SKUs cambian de sugerido

delta promedio

top 10 SKUs con mayor cambio

Uso ejecutivo (business): evaluar impacto de subir comisión, cambiar logística o subir meta de margen antes de aplicarlo.

16) Importar / Exportar / Backup (operación segura)
16.1 Importar Excel

La hoja debe llamarse Plantilla y requiere columnas:

sku (obligatoria)

costo_con_iva (obligatoria)

pvp (obligatoria)

precio_oferta (opcional)

pvp_externo (opcional)

oferta_externa (opcional)

nombre (opcional)

tags (opcional)

Reglas importantes del import:

Si precio_oferta = 0, borra oferta.

Si oferta_externa = 0, borra oferta externa.

Si tags = 0, borra tags.

16.2 Exportar Tab / Exportar Reporte

Exportar Tab: saca Excel del tab actual (con columnas principales).

Exportar Reporte: Excel completo para management/finanzas (más detallado).

16.3 Backup (JSON)

Exportar backup: descarga un JSON con datos/config.

Importar backup: restaura en otro navegador/equipo.
Esto es tu “single source of truth” portátil (fuente única de verdad: el archivo que contiene todo).

16.4 Borrar base

Elimina toda la base local del navegador. Úsalo solo si tienes backup.

17) Checklist por etapa (para no saltarte nada)
A) Setup inicial (1 vez)

Descargar plantilla

Importar SKUs

Configurar comisiones + logística por canal

Confirmar meta de margen y ending

Guardar baseline (opcional: crear escenario “Baseline 1”)

B) Operación semanal (pricing)

Revisar OMNI (los que rompen por canal débil)

Revisar ZONA MUERTA ML

Filtrar por margen crítico y atacar top SKUs

Ejecutar Tareas (cerrar BLOCK/WARN)

Exportar filtrados o feeds

C) Antes de publicar (control)

Abrir Feeds

Preflight

Export “Solo OK” (o WARN con confirmación)

Backup antes de cambios grandes

18) Troubleshooting (cuando “no funciona”)

No veo íconos: refrescar (Ctrl+R). Si sigue, abre consola (F12) y revisa errores; normalmente es por bloqueo de scripts locales, pero en V37 debería cargar lucide bien.

Import no trae nada: la hoja debe llamarse Plantilla y columnas deben coincidir.

Muchos BLOCK: revisa costo faltante, piso mínimo y margen mínimo guardrails.

Márgenes raros: revisa si tu comisión está sobre neto o bruto y si logística por tramos está bien configurada.

Se perdió data: revisa si cambiaste de navegador/perfil; usa Backup/Restore.


