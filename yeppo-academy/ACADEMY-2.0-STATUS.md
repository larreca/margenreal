# Yeppo B2B Academy 2.0 — decisiones cerradas

Fecha: 2026-09-26

## Principio de diseño
El Capítulo 1 es el sistema visual maestro. Ningún capítulo vuelve a tener una interfaz independiente. Todos usan el mismo lector, navegación, jerarquía, tipografía y tipos de bloque.

## Decisiones de producto
1. Acceso: usuario + contraseña individual.
2. Empresas: múltiples usuarios por empresa.
3. Altas: Yeppo y administrador de empresa pueden invitar usuarios.
4. Admin empresa: progreso, evaluaciones, certificados, asignación de contenidos obligatorios.
5. Acceso a contenido: configurable por empresa.
6. Certificación: insignias por escuela + certificación final.
7. Aprobación: modelo mixto; capítulos configurables con evaluación obligatoria.
8. Publicación: borrador + revisión + historial.
9. Roles internos: Super Admin, Editor, Revisor y Soporte.
10. Branding: una sola Yeppo Academy, sin white-label por empresa.
11. Analítica: preparada para avance, evaluación y actividad por usuario/empresa.
12. Videos: opcionales.
13. Recursos: biblioteca central + materiales por capítulo.
14. Búsqueda: buscador dentro de contenido aprobado; arquitectura preparada para tutor conversacional.
15. Tutor: académico + apoyo comercial, sin diagnóstico médico.
16. Catálogo Yeppo: no conectado.
17. IA en editor: no.
18. Móvil: web responsive.
19. Registro: solo por invitación.
20. Publicación inicial: URL de Vercel.

## Implementado
- Next.js app.
- Login y sesiones HTTP-only.
- Bootstrap de primer Super Admin.
- Empresas, usuarios e invitaciones.
- Admin de empresa y equipo.
- Rutas de aprendizaje por empresa.
- Lector único derivado del Capítulo 1.
- Conservación del contenido histórico como seed.
- Progreso individual.
- Editor visual de contenido con bloques aprobados.
- Borrador, revisión y publicación.
- Historial y restauración de versiones.
- Evaluación configurable y registro de intentos.
- Insignias por escuela.
- Certificado final imprimible / PDF.
- Biblioteca preparada.
- Buscador de contenido aprobado.
- Esquema Neon/Postgres.
- Configuración de Vercel preparada.

## Pendiente de infraestructura externa
- Aprovisionar base Neon y obtener DATABASE_URL.
- Configurar DATABASE_URL, AUTH_SECRET y SETUP_TOKEN en Vercel.
- Crear el proyecto Vercel con root directory `yeppo-academy`.
- Ejecutar el build de producción y corregir cualquier error que aparezca.
- Crear primer Super Admin desde `/setup`.
- Activar tutor conversacional en una fase posterior con OPENAI_API_KEY.

## Regla editorial para nuevos capítulos
Cada módulo debe responder:
1. ¿Qué necesito entender?
2. ¿Por qué importa?
3. ¿Cómo lo uso para vender?
4. ¿Cómo sé si lo estoy haciendo bien?

No se aceptan capítulos tipo dashboard o resumen corto. Deben tener teoría sustancial, recursos visuales, ejemplos/casos, aplicación comercial, ejercicios y fuentes.
