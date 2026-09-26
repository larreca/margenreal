# Plantilla maestra — Shopify → Yeppo B2B CRM

## Comando corto recomendado

**ACTUALIZAR SHOPIFY B2B CRM COMPLETO**

Interpretación obligatoria: consultar Shopify con datos reales, sin anonimizar, clasificar únicamente la operación B2B, hacer upsert sobre la base local del CRM y conservar todo el histórico y todos los datos manuales existentes.

## Regla maestra de clasificación B2B

Un pedido se considera B2B si cumple al menos una de estas condiciones:

1. El cliente ya pertenece a la base B2B.
2. El cliente tiene etiquetas B2B / Mayorista / Por-Mayor / Wholesale o equivalentes.
3. El pedido tiene etiquetas Astroselling / Por-Mayor / B2B / Wholesale o equivalentes.
4. El origen del pedido es el portal B2B de Yeppo.
5. El total del pedido es igual o superior a CLP 300.000.

Si un pedido >= CLP 300.000 pertenece a un cliente que aún no está en la base B2B, crear/agregar ese cliente al CRM cuando tenga identidad disponible. Si el pedido no tiene cliente identificable, conservarlo como pedido B2B pendiente de identificación, sin inventar datos.

No mezclar ventas B2C, POS o web normales salvo que el pedido o el cliente cumplan la regla B2B anterior.

## Política de sincronización

- Datos reales solamente. No mocks, datos ficticios ni anonimización.
- Nunca borrar históricos anteriores.
- Actualizar por UPSERT:
  - cliente: Shopify Customer GID; fallback email normalizado.
  - pedido: Shopify Order GID.
  - producto/variante: SKU.
  - venta diaria: fecha.
  - costo: SKU + fecha de vigencia.
- Mantener un solapamiento mínimo de 7 días en cada actualización incremental para absorber cambios tardíos, pagos, cancelaciones o correcciones.
- No sobrescribir notas, pipeline, tareas, esperas de SKU ni campos manuales del CRM con valores vacíos de Shopify.
- No guardar nombres, correos, teléfonos ni historial individual de clientes en el repositorio público de GitHub. Los datos personales deben entrar por el canal de sincronización hacia IndexedDB/local del CRM.

## Datos que debe solicitar Shopify

### 1. Ventas B2B diarias
Para el dashboard, tendencia semanal y evolución mensual:
- fecha
- cantidad de pedidos B2B
- venta B2B
- ticket promedio
- opcional: descuentos, devoluciones y venta neta

Para una carga completa inicial, traer al menos los últimos 13 meses a nivel diario. Luego usar sincronización incremental.

### 2. Maestro de clientes B2B
Por cada cliente:
- Shopify Customer GID
- nombre
- email
- teléfono
- etiquetas
- fecha de alta
- fecha de última actualización
- cantidad de pedidos B2B, no total general de Shopify
- venta acumulada B2B, no gasto B2C
- fecha del último pedido B2B
- número/nombre del último pedido
- total del último pedido B2B
- mediana de recompra calculada solo con pedidos B2B
- fecha estimada de próxima recompra
- días desde última compra
- estado sugerido: activo / próximo / vencido / dormido

### 3. Pedidos B2B
Por cada pedido:
- Shopify Order GID
- número/nombre de pedido
- fecha/hora
- cliente GID, nombre y email
- etiquetas del pedido
- sourceName / canal
- estado financiero
- estado de fulfillment cuando exista
- cancelación
- devoluciones/reembolsos cuando existan
- total
- descuentos
- impuestos
- shipping
- subtotal
- total neto utilizable para análisis

### 4. Líneas de pedido / SKU
Obligatorio para rentabilidad, productos top, categoría y recompra por SKU:
- SKU
- Variant GID
- Product GID
- nombre de producto
- variante
- vendor/marca
- productType/categoría
- cantidad
- precio unitario
- precio unitario descontado
- total de línea descontado
- descuento de línea

Con estas líneas, construir también por cliente una historia de SKU con:
- SKU
- producto
- cantidad de pedidos donde apareció
- unidades compradas
- ventas
- primera compra
- última compra
- ciclo aproximado de recompra por SKU

### 5. Catálogo actual
Por producto y variante:
- Product GID
- Variant GID
- título
- vendor
- productType
- tags
- estado
- SKU
- barcode
- precio
- compare-at
- inventoryItem GID

### 6. Stock de Bodega Central
El CRM B2B usa Bodega Central como referencia comercial.

Por SKU:
- stock disponible en Bodega Central
- stock on-hand si está disponible
- committed si está disponible
- incoming si Shopify realmente lo mantiene
- fecha/hora de lectura

Regla comercial B2B: destacar stock útil cuando Bodega Central tenga más de 30 unidades. No confundir stock total de todas las tiendas con stock de Bodega Central.

### 7. Costos
Para rentabilidad:
- SKU
- nombre producto
- costo con IVA
- fecha de vigencia
- fuente

Si Shopify contiene costo unitario vigente, puede usarse como costo actual. Para margen histórico, mantener costos con fecha de vigencia; no reemplazar costos históricos por el costo nuevo.

### 8. Próximos ingresos
Solo si la fuente está disponible de forma fiable:
- SKU
- producto
- cantidad entrante
- ETA
- estado

Si Shopify no contiene esta información de forma confiable, conservar el flujo actual de carga de próximos ingresos y cruzarlo con historial de compra y stock BC.

## Auditorías obligatorias al terminar

- ventas del día B2B vs suma de pedidos clasificados
- ventas últimos 7 días vs suma de pedidos clasificados
- cantidad de clientes B2B
- clientes nuevos detectados por regla >= CLP 300.000
- pedidos >= CLP 300.000 sin cliente identificable
- pedidos cancelados/refundados excluidos o ajustados
- pedidos sin detalle de SKU
- SKU sin costo
- SKU sin stock BC
- duplicados de cliente por email/GID
- porcentaje de pedidos con línea de producto completa
- fecha/hora de la última sincronización

## Modos de solicitud

### Completo
**ACTUALIZAR SHOPIFY B2B CRM COMPLETO**

Debe actualizar ventas, clientes, pedidos, detalle SKU, catálogo, stock BC y costos disponibles; conservar histórico y ejecutar auditoría final.

### Incremental rápido
**ACTUALIZAR SHOPIFY B2B CRM DESDE LA ÚLTIMA SINCRONIZACIÓN**

Debe consultar cambios recientes con solapamiento de 7 días, actualizar solamente lo nuevo/modificado y no borrar históricos.

### Solo ventas/dashboard
**ACTUALIZAR VENTAS B2B CRM**

Debe actualizar venta diaria B2B, pedidos y ticket promedio; nunca mezclar ventas B2C.

### Clientes/recompra
**ACTUALIZAR CLIENTES B2B Y RECOMPRA**

Debe actualizar maestro B2B, últimas compras, ciclo de recompra, clientes nuevos y clientes vencidos.

### Productos/stock
**ACTUALIZAR PRODUCTOS Y STOCK B2B CRM**

Debe actualizar catálogo y stock real de Bodega Central por SKU.

### Rentabilidad
**ACTUALIZAR RENTABILIDAD B2B CRM**

Debe actualizar pedidos con detalle de líneas, precios y costos por SKU con vigencia.

## Contrato resumido esperado por el CRM

```json
{
  "generatedAt": "ISO-8601",
  "source": "Shopify Yeppo",
  "scope": "b2b_only",
  "salesDaily": [
    {"date":"YYYY-MM-DD","orders":0,"sales":0,"aov":0}
  ],
  "customers": [
    {
      "id":"gid://shopify/Customer/...",
      "shopifyId":"gid://shopify/Customer/...",
      "name":"",
      "email":"",
      "phone":"",
      "tags":[],
      "orders":0,
      "spent":0,
      "lastOrderDate":"",
      "lastOrderName":"",
      "lastOrderTotal":0,
      "reorderMedian":0,
      "ordersHistory":[],
      "skuHistory":[]
    }
  ],
  "recentOrders": [],
  "products": [],
  "productCosts": [],
  "audit": {}
}
```

## Regla de operación

Cuando Matías pida **“actualizar/cargar Shopify para el B2B CRM completo”**, aplicar esta plantilla sin volver a preguntar qué campos necesita, salvo que Shopify devuelva un bloqueo técnico o falte una autorización indispensable.
