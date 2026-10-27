# YEPPO Academy — prioridad editorial rutas 6 a 10
Fecha: 25/10/2026. Rama de revisión: `codex/academy-autonomia-mvp8-20261025`.

## Nueva prioridad establecida por el responsable del curso
Priorizar contenidos desde el capítulo **28 hasta el 50** (23 capítulos × 8 módulos = **184 módulos**). Los capítulos 1–27 mantienen sus avances, pero dejan de ser el foco salvo corrección de defectos críticos, bloqueos de seguridad o regresiones del sistema compartido.

| Ruta | Tema | Capítulos | Módulos | Orden |
|---|---|---|---:|---:|
| 6 | Gestión del negocio | 28–35 | 64 | 1 |
| 7 | Journey y recompra | 36–40 | 40 | 2 |
| 8 | Yeppo Partner B2B | 41–44 | 32 | 3 |
| 9 | Seguridad y regulación | 45–47 | 24 | 4 (riesgos críticos escalados antes) |
| 10 | Certificación | 48–50 | 24 | 5 |

## Causa y arreglo del inicio
- Causa comprobada en `components/LearningDashboard.js`: `schools.slice(0,4)` truncaba la sección inicial a cuatro rutas, aunque el catálogo contenía las diez.
- Corrección: `schools.map(...)`, encabezado dinámico, tarjetas enlazadas a filtros reales y CSS responsivo 5/4/3/2/1 columnas según ancho.
- Regresión automática: `tests/home-routes.test.mjs` comprueba diez rutas, cincuenta capítulos y correspondencia de las últimas cinco rutas con 28–50.
- Verificación con la versión Vercel de revisión: diez tarjetas renderizadas en HTML, URL /revision/explorar?route=gestion y /revision/c28 cargando. Falta inspección visual manual con tamaños y accesibilidad; el HTML 200 no certifica UX.

## Capítulo 28: primera mejora del nuevo bloque
- Conservar explicación, términos y casos históricos existentes donde siguen aportando.
- Ocho nuevos casos **simulados** específicos de surtido, productividad, GMROI, misiones de compra, stock histórico, test-buy, dashboard y decisiones B2B; cada uno exige una respuesta escrita antes de consultar la pauta.
- **40 preguntas nuevas**: cinco por módulo, 80 % mínimo (4/5), con feedback razonado y prueba de regresión.
- Dos recursos didácticos de apoyo para 28.4 y 28.5: mapa de misión de compra e inventario histórico vs ventas **hipotéticas** (no métricas actuales de Yeppo).
- Subir `contentVersion` a 3 para que la versión de código revisada supere overlays antiguos con versión menor.
- Pendiente: validar enlaces y fuentes originales; inspección gráfica 360, 390, 768, 1280 px, zoom 200 %, teclado y evaluación real en navegador; calificar las seis dimensiones por módulo. **Ningún módulo 28.x se marca aprobado ≥8 sin pruebas.**

## Secuencia operativa de mejora
1. 28 (en corrección): revisar integridad visual, fuentes, casos y examen.
2. 29 y 30: stock, rotación, IVA, margen, aportes de canal y calculadoras; datos hipotéticos separados de operaciones Yeppo.
3. 31–35: promociones, merchandising, ecommerce, contenidos sociales y video de venta.
4. 36–40: journey, atención, CRM, fidelización y tablero de métricas.
5. 41–44: compra y recompra con Yeppo, operación B2B y escenarios reales que puedan verificarse.
6. 45–47: ISP, claims, lotes, trazabilidad, señales de alarma y derivación; suspender aprobación por error crítico.
7. 48–50: simuladores y certificación con soluciones, límites, veto de seguridad y feedback; login/pagos/certificado por cuenta quedan para etapa de lanzamiento.
8. Reauditoría integral, evidencia por cada uno de los **184 módulos**, sin notas inventadas y revisión de dependencias anteriores.

Se mantiene sin cambios la rúbrica de seis dimensiones (30/10/20/15/15/10), nota ponderada ≥8, profundidad y visuales ≥8, demás ≥7 y cero errores críticos. Ningún merge a producción sin aprobación final.
