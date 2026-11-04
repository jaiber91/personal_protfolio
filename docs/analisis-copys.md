# Análisis de textos (copys)

Fecha: 2026-11-02. Fuente: `src/i18n/dictionaries/es.ts`, `en.ts`, `src/content/projects/**` y
textos fijos en componentes. Método: skill `copy-editing` (pasadas de claridad, tono,
especificidad y prueba), leyendo cada texto como lo vería alguien que no conoce el sitio.

Prioridad: **A** = puede confundir o dar una idea equivocada · **B** = se entiende, pero cuesta
o suena raro · **C** = detalle.

---

## A. Textos que pueden confundir

### A1. Plataformas: el título contradice el contenido

- **Hoy:** `Un código, todas las pantallas` / `One codebase, every screen`.
- **Problema:** el paso "Web" dice que los portales se hacen en Angular y NestJS, o sea, con otro
  código. El título promete un solo código y el tercer paso lo desmiente. Además, en español
  "un código" se puede leer como "un código secreto" o "una clave"; lo habitual es "un solo código".
- **Propuesta:** `Móvil, tablet y web` / `Mobile, tablet and web`, o
  `Cada pantalla, bien resuelta` / `Every screen, done right`.
  Si se quiere conservar la idea, aplicarla solo a móvil y tablet:
  "Un solo código en Flutter para móvil y tablet".

### A2. "300 personas en el mismo proyecto bancario"

- **Problema:** se muestra "300" en grande bajo "Resultados". Se puede leer como 300 usuarios,
  300 personas a cargo o 300 personas formadas. El logro real (tu diseño de módulos es el
  estándar del proyecto) queda escondido en el detalle.
- **Propuesta:** `personas trabajan con la arquitectura de módulos que diseñé` /
  `people work with the module architecture I designed`. Es la misma cifra, pero dice qué hiciste.

### A3. "1.000+ descargas de la app del banco"

- **Problema:** para un banco, mil descargas parece poco y choca con "miles de usuarios" del
  manifiesto. Un lector puede pensar que el banco es muy pequeño o que la cifra es un error.
- **Propuesta:** si la cifra es baja porque la app es nueva o de un segmento, decirlo
  ("1.000+ descargas en sus primeros meses"). Si no, cambiar la métrica por otra
  (plataformas cubiertas: "4 plataformas con un solo código: iOS, Android, web y tablet").
  Necesito tu confirmación del dato.

### A4. Estado del vuelo en inglés: "Boarding"

- **Hoy:** ES `En curso` / `Completado`; EN `Boarding` / `Landed`.
- **Problema:** "Boarding" significa "abordando": suena a que el trabajo actual está por empezar.
  Además, los dos idiomas no dicen lo mismo.
- **Propuesta:** ES `En vuelo` / `Aterrizó`, EN `In flight` / `Landed`. Mantiene el juego del
  aeropuerto y deja claro que el trabajo actual sigue en marcha. Alternativa literal:
  `Actual` / `Finalizado`, `Current` / `Completed`.

### A5. El texto de contacto limita a quién le hablas

- **Hoy:** "He llevado apps a miles de usuarios en banca y en startups, y vengo del sector
  educativo. Si tu próximo proyecto va por alguno de esos caminos, construyámoslo juntos."
- **Problema:** se lee como "solo trabajo en banca, startups o educación". Un emprendedor con
  una tienda o un restaurante entiende que no es para él. "Caminos" también es vago.
- **Propuesta (doble enfoque, sin vender):**
  ES: "¿Tienes un proyecto, una idea o una vacante? Escríbeme: te respondo en menos de 24 horas."
  EN: "Have a project, an idea or a role to fill? Write to me and I'll reply within 24 hours."
  (Confirma si puedes cumplir las 24 horas; si no, quitar ese dato.)

### A6. El hero también limita el público

- **Hoy:** "Desarrollo apps móviles y web para banca y startups con Flutter, Angular y NestJS…"
- **Problema:** mismo efecto que A5, y no menciona landing pages, que es uno de tus tres servicios.
- **Propuesta:** "Desarrollo apps móviles, aplicaciones web y landing pages con Flutter, Angular
  y NestJS. He trabajado en banca, startups y educación." / "I build mobile apps, web apps and
  landing pages with Flutter, Angular and NestJS. I've worked in banking, startups and education."
  La experiencia pasa a ser prueba y deja de ser un filtro.

---

## B. Se entiende, pero cuesta o suena raro

| #   | Texto                                                                   | Problema                                                                                                                        | Propuesta                                                                                                                                     |
| --- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | Manifiesto: "banca, startups y experiencias multiplataforma"            | Mezcla dos sectores con un tipo de producto; la enumeración no es pareja                                                        | "en banca, startups y educación, en móvil, tablet y web"                                                                                      |
| B2  | Manifiesto: "Escribo código con propósito"                              | Frase genérica, no dice nada verificable                                                                                        | Quitarla o cambiarla por un hecho: "Pruebo lo que escribo y automatizo la publicación."                                                       |
| B3  | Proyectos: `Trabajo seleccionado`                                       | Calco de "Selected work"; en español suena traducido                                                                            | `Proyectos destacados`                                                                                                                        |
| B4  | Caso "Este portafolio": "Tablero flip-dot en WebGL, letras split-flap…" | Jerga técnica: un cliente no sabe qué es flip-dot ni split-flap                                                                 | "Un tablero de aeropuerto animado en 3D escribe mi nombre, y los proyectos se muestran como pases de abordar." Dejar WebGL y GLSL en el stack |
| B5  | Pases: `Puerta M1 / T2 / W3`                                            | Nadie descifra que M = móvil, W = web                                                                                           | Valor legible: `Móvil`, `Tablet`, `Web` (o conservar el código y añadir el texto: `W3 · Web`)                                                 |
| B6  | Formación: orden `En curso, 2018, 2021, 2020, 2019`                     | No es cronológico ni inverso; parece desordenado                                                                                | Orden inverso: En curso, 2021, 2020, 2019, 2018                                                                                               |
| B7  | Formación: `Full Stack Developer — Prográmate by Simplon`               | Es igual a tu cargo; parece un empleo repetido                                                                                  | `Bootcamp Full Stack Developer`                                                                                                               |
| B8  | EN: "technology for residential communities"                            | En EE. UU. no es un término común                                                                                               | "technology for HOAs and condo associations"                                                                                                  |
| B9  | EN contacto: "headed down any of those paths"                           | Expresión rebuscada para inglés no nativo                                                                                       | Se resuelve con A5                                                                                                                            |
| B10 | Ubicación: `Jamundí, Colombia`                                          | Un cliente extranjero no conoce Jamundí                                                                                         | `Jamundí (Cali), Colombia` / `Cali area, Colombia`                                                                                            |
| B11 | Nav: `Plataformas`                                                      | No anticipa qué hay en la sección                                                                                               | Se resuelve en la fase 1 del plan SEO ("Qué construyo")                                                                                       |
| B12 | EN `Bachelor's Degree in History`                                       | En Colombia, una licenciatura suele ser un título en educación. Verificar si el título es "Licenciatura en Historia" (docencia) | Si es docencia: `Bachelor's in History Education`                                                                                             |

---

## C. Detalles

- `10 min por despliegue (antes, más de 60)`: claro, pero "despliegue" es técnico para un cliente.
  Alternativa: `min por publicación de la app (antes, más de 60)`.
- "Ahora también construyo herramientas internas para la empresa" está dentro de la métrica de
  descargas y no tiene relación con ella. Moverla al rol o quitarla.
- Hora: `GMT−5` está bien para EE. UU.; se podría añadir "(igual que Nueva York en invierno)" en
  la página de detalle, no en el hero.
- QR "Escanea → LinkedIn": ya se oculta en pantallas pequeñas (`Contact.scss`). Sin cambios.
- Pronunciación "con la jota de jamón": funciona en español. Sin cambios.
- 404 "cambió de puerta": funciona con el concepto. Sin cambios.

---

## Lo que funciona bien

- El concepto de aeropuerto es coherente en todo el sitio (tablero, vuelos, pases, 404).
- Las métricas de Hipal (1.500 asistentes, 60 → 10 min, 8.000 descargas) son concretas y
  creíbles.
- El manifiesto abre con un hecho propio y diferenciador (formaste a más de 1.000 personas).
- Los textos en inglés son naturales en general; los problemas son puntuales (A4, B8, B9).

---

## Datos que necesito de Jaiber

1. ¿Cuáles de estos textos son los que te reportaron como confusos? (para confirmar que el
   análisis cubre lo que viste).
2. A3: ¿la cifra de 1.000 descargas es correcta? ¿Hay contexto (app nueva, segmento)?
3. A5: ¿puedes comprometerte a responder en menos de 24 horas?
4. B12: ¿el título de Univalle es de docencia?

## Relación con el plan SEO

A1, A5, A6, B10 y B11 tocan los mismos textos que la fase 1 de `docs/plan-seo-freelance.md`
(hero, contacto, sección "Qué construyo"). Conviene aplicarlos juntos para no reescribir dos veces.
