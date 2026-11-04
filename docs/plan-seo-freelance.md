# Plan SEO: conseguir clientes freelance desde jaiberflor.dev

Análisis: 2026-11-02 · Decisiones confirmadas: 2026-11-02. Sitio: https://jaiberflor.dev

Objetivo: que empresas y emprendedores de **Latinoamérica y EE. UU.** que buscan **apps móviles,
aplicaciones web o landing pages** encuentren el sitio y escriban, sin dejar de servir como
portafolio para reclutadores.

Pendientes técnicos y de configuración previos: `docs/seo-pendientes.md`.

---

## 0. Decisiones confirmadas

| Tema             | Decisión                                                           | Qué cambia en el plan                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Público          | Doble enfoque con tono neutral: ni solo reclutadores ni solo venta | El inicio describe **qué construyes y cómo trabajas**. Los textos sirven igual a un reclutador y a un cliente. Sin lenguaje de venta agresivo ("¡Cotiza ya!", "ofertas")                                             |
| Precios          | No se publican: se estiman conociendo el proyecto                  | Sin `priceRange` en datos estructurados. Cada servicio explica **qué define el costo y el plazo** y cómo se hace la estimación                                                                                       |
| Contacto         | Sin WhatsApp por ahora. Formulario: se analiza aparte (sección 4)  | El correo sigue siendo el canal principal. Se mejora el texto y el `mailto:`                                                                                                                                         |
| Mercado          | Latinoamérica y EE. UU., donde no se exija inglés avanzado         | Español es el idioma principal del contenido. En EE. UU. el foco son negocios y startups hispanohablantes. Perfil de Google Business pasa a prioridad baja (sirve para búsquedas locales, que ya no son el objetivo) |
| Casos de estudio | No se puede mostrar trabajo de Pragma ni Hipal                     | Los casos salen de proyectos propios (BRUMA, este portafolio y nuevos demos). La trayectoria se queda como está: ya muestra métricas sin datos confidenciales                                                        |
| Buscadores       | Search Console y Bing ya configurados                              | Fase 0 se reduce a revisar los datos que ya están llegando                                                                                                                                                           |

---

## 1. Diagnóstico

### 1.1 Lo técnico está bien resuelto

Verificado en producción el 2026-11-02:

| Punto                                                        | Estado                                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `http://` y `www.` redirigen 301 a `https://jaiberflor.dev/` | OK (el 522 de `www` ya está corregido)                                          |
| `robots.txt`, `sitemap-index.xml` con hreflang y `x-default` | OK, pero el sitemap solo tiene 2 URL                                            |
| Canonical, hreflang, `lang`, Open Graph, imagen por idioma   | OK                                                                              |
| JSON-LD `Person`, `ProfilePage`, `WebSite`                   | OK, pero no menciona servicios                                                  |
| 404 real por idioma, `llms.txt`                              | OK (`llms.txt` no menciona servicios)                                           |
| Lighthouse 100 en escritorio                                 | Documentado. **Falta medir móvil** (la API de PageSpeed no respondió por cuota) |

### 1.2 El problema: el contenido no cubre lo que quieres ofrecer

Medido sobre el HTML de `/es/` (835 palabras): "freelance" 0 veces, "aplicaciones web" 0,
"landing" 2 (solo en trayectoria y BRUMA), "servicio" 1.

- **Una sola página por idioma**, con título `Jaiber Flor | Desarrollador Full Stack`. Solo puede
  posicionar por tu nombre.
- **No hay páginas de servicios, proceso de trabajo ni preguntas frecuentes**, que es lo que un
  cliente busca y lo que citan los buscadores de IA.
- **Proyectos:** 2 reales y 2 tarjetas "Próximamente". Ninguno tiene página propia.
- **El texto de contacto se dirige a empleadores.**

### 1.3 Incoherencias fuera del sitio

- **GitHub** (`jaiber91`): el campo "sitio web" apunta a LinkedIn, no a `jaiberflor.dev`, y no
  tiene biografía.
- **Ubicación:** GitHub dice "Cali, Colombia"; el sitio y el JSON-LD dicen "Jamundí". Elegir una
  forma y usarla en todas partes (sugerencia: "Cali, Colombia" en perfiles, porque es lo que
  reconoce un cliente extranjero; el sitio puede decir "Jamundí, Cali (Colombia)").
- **LinkedIn:** no se puede verificar desde aquí. Revisar los puntos de `seo-pendientes.md` §2.

### 1.4 Expectativas realistas

- Términos genéricos ("desarrollo de apps") los dominan agencias con años de autoridad. El objetivo
  de los primeros 6 meses son **búsquedas específicas**: tecnología + tipo de proyecto + "freelance"
  o "en español", y tu nombre.
- El SEO tarda de 3 a 6 meses. Los primeros clientes suelen llegar antes por LinkedIn, plataformas
  freelance y referidos. Esos canales también generan enlaces y menciones que ayudan al SEO.

---

## 2. Estrategia

### 2.1 Tono neutral (doble enfoque)

Regla para todos los textos: **describir trabajo y resultados, no vender**. La misma frase debe
funcionar para un reclutador y para un cliente.

| En vez de                    | Usar                                                     |
| ---------------------------- | -------------------------------------------------------- |
| "Servicios" (suena a tienda) | "Qué construyo" / "What I build"                         |
| "Cotiza tu proyecto"         | "Hablemos de tu proyecto" (un reclutador también lo usa) |
| "Contrátame"                 | "Disponible para proyectos y nuevas oportunidades"       |

Las páginas de detalle (apps, web, landing) sí pueden hablarle al cliente, porque solo llega a
ellas quien busca eso.

### 2.2 Mercados

1. **Latinoamérica, en español (prioridad 1):** pymes, emprendedores y startups que trabajan en
   remoto. Búsquedas sin ciudad.
2. **EE. UU., en español (prioridad 2):** negocios y startups hispanohablantes (Florida, Texas,
   California, Nueva York). Argumento: misma zona horaria (Colombia es UTC-5, igual que la costa
   este en horario de invierno) y comunicación en español.
3. **EE. UU., en inglés (prioridad 3):** las páginas `/en/` existen y se mantienen, con texto
   claro y directo. Se puede indicar "Spanish and written English" para fijar expectativas sin
   cerrar puertas.

El hreflang `es` (sin país) ya cubre todos los países hispanohablantes: no hace falta `es-419`
ni páginas por país.

### 2.3 Grupos de palabras clave (a validar con datos)

Volúmenes por confirmar con Google Keyword Planner y con las consultas que ya aparezcan en
Search Console.

| Página destino   | Búsquedas objetivo (ejemplos)                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inicio `/es/`    | jaiber flor, desarrollador full stack freelance, desarrollador freelance latinoamérica                                                                          |
| Apps móviles     | desarrollador flutter freelance, desarrollo de apps android e ios, crear una app para mi negocio, programador de apps en español                                |
| Aplicaciones web | desarrollo de aplicaciones web a medida, desarrollador angular freelance, desarrollo de sistemas web para empresas, desarrollador web en español estados unidos |
| Landing pages    | diseño de landing page, landing page para emprendedores, landing page animada / 3d                                                                              |
| Casos de estudio | landing page 3d con three.js, (los demos nuevos)                                                                                                                |
| Artículos        | qué define el costo de una app, flutter vs nativo, landing page vs sitio web, cómo preparar un proyecto antes de contratar un desarrollador                     |
| EN               | freelance flutter developer latam, spanish speaking app developer, nearshore web developer colombia                                                             |

### 2.4 Arquitectura del sitio

```
/es/                                    Inicio (perfil + "Qué construyo" + trayectoria + proyectos)
/es/desarrollo-apps-moviles/
/es/desarrollo-aplicaciones-web/
/es/landing-pages/
/es/proyectos/<slug>/                   Un caso por proyecto propio
/es/blog/<slug>/                        Artículos (fase 4)
/en/mobile-app-development/  /en/web-app-development/  /en/landing-pages/  /en/projects/...  /en/blog/...
```

URLs de primer nivel (sin `/servicios/`) para que no suene a catálogo y queden más cortas.

Cada página de detalle incluye:

1. Para quién es y qué problema resuelve.
2. Qué incluye (diseño, desarrollo, publicación en tiendas, mantenimiento…).
3. Proceso por etapas (descubrimiento → propuesta → desarrollo por entregas → publicación → soporte).
4. **Cómo se estima el costo y el plazo** (alcance, plataformas, integraciones, diseño propio o
   existente) sin cifras. Es contenido útil y responde la búsqueda "cuánto cuesta" con honestidad.
5. Tecnologías y por qué (Flutter, Angular, NestJS, Astro).
6. Proyectos relacionados y experiencia (sin datos confidenciales).
7. Preguntas frecuentes (zona horaria, idioma, forma de trabajo, propiedad del código).
8. Llamado a la acción al contacto.

Unas 800-1.200 palabras útiles por página. **No crear páginas por país o ciudad** en masa: Google
las trata como páginas puerta.

---

## 3. Plan de ejecución

Responsable: **J** = Jaiber (cuentas, datos, decisiones) · **K** = Kiro (código y textos).

### Fase 0 · Esta semana · Línea base

| #   | Tarea                                                                                                                                   | Resp. |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 0.1 | Search Console → Rendimiento: anotar impresiones, clics y consultas actuales. Indexación: confirmar que `/es/` y `/en/` están indexadas | J     |
| 0.2 | Activar Cloudflare Web Analytics en el panel si aún no está (la CSP ya lo permite)                                                      | J     |
| 0.3 | Medir PageSpeed móvil de `/es/` y anotar LCP, INP y CLS                                                                                 | J/K   |
| 0.4 | Prueba de resultados enriquecidos sobre `/es/` (debe detectar `Person` / `ProfilePage`)                                                 | J     |

### Fase 1 · Semanas 1-3 · Contenido de "qué construyo" (mayor impacto)

| #    | Tarea                                                                                                                                                                                                                                                                                                                                                          | Resp.       |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1.1  | Título y descripción del inicio con doble enfoque. Ej.: `Jaiber Flor · Desarrollador Full Stack: apps móviles, web y landing pages`                                                                                                                                                                                                                            | K           |
| 1.2  | Hero: mantener nombre y tablero; ajustar la frase para incluir los 3 tipos de proyecto y "Latinoamérica y EE. UU., en remoto". CTA secundaria "Hablemos de tu proyecto"                                                                                                                                                                                        | K           |
| 1.3  | Sección "Qué construyo" en el inicio (puede evolucionar la actual "Plataformas": móvil / tablet / web ya existe) con enlaces a las 3 páginas                                                                                                                                                                                                                   | K           |
| 1.4  | Colección de contenido para las páginas de detalle y rutas con slugs traducidos                                                                                                                                                                                                                                                                                | K           |
| 1.5  | i18n: hoy `stripLocale` / `localizePath` asumen la misma ruta en ambos idiomas. Con slugs traducidos hace falta un mapa de equivalencias para canonical, hreflang, sitemap y el selector de idioma                                                                                                                                                             | K           |
| 1.6  | Redactar las 3 páginas en ES y EN (skills `copywriting` + `copy-editing`)                                                                                                                                                                                                                                                                                      | K, revisa J |
| 1.7  | Contacto: reescribir el texto con doble enfoque ("¿Tienes un proyecto o una oportunidad? Escríbeme y te respondo en menos de 24 horas"). Añadir `mailto:` con asunto prellenado como acción secundaria                                                                                                                                                         | K           |
| 1.8  | Quitar las tarjetas "Próximamente" hasta tener casos reales                                                                                                                                                                                                                                                                                                    | K           |
| 1.9  | Datos estructurados: `Person` con `makesOffer` → `Offer` → `Service` por tipo de proyecto, `areaServed` Latinoamérica y EE. UU., `knowsLanguage` es/en. Sin `priceRange`. `WebPage` + `BreadcrumbList` en subpáginas y `FAQPage` en las páginas de detalle (Google casi no muestra el resultado enriquecido de FAQ, pero los buscadores de IA leen el marcado) | K           |
| 1.10 | Imagen OG por página de detalle (`npm run og` ampliado)                                                                                                                                                                                                                                                                                                        | K           |
| 1.11 | `llms.txt`: añadir "What I build", mercados, idiomas y contacto                                                                                                                                                                                                                                                                                                | K           |
| 1.12 | Enlaces internos: inicio ↔ páginas de detalle ↔ proyectos                                                                                                                                                                                                                                                                                                      | K           |

### Fase 2 · Semanas 2-4 · Perfiles y coherencia (en paralelo)

| #   | Tarea                                                                                                                                                                                 | Resp. |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 2.1 | GitHub: sitio web → `https://jaiberflor.dev`, biografía corta con los 3 tipos de proyecto, README de perfil                                                                           | J     |
| 2.2 | LinkedIn: sitio web, titular con doble enfoque (ej.: "Full Stack Developer · Flutter, Angular, NestJS · Apps móviles, web y landing pages"), sección "Servicios" de LinkedIn activada | J     |
| 2.3 | Plataformas freelance en español: **Workana** (la principal en Latinoamérica). Opcionales: Contra, Toptal más adelante. Upwork queda para cuando el inglés no sea limitante           | J     |
| 2.4 | Mismo nombre, ubicación y descripción en todos los perfiles. Añadir los nuevos perfiles a `sameAs` en `profile.ts`                                                                    | J/K   |
| 2.5 | (Prioridad baja) Perfil de Google Business: aporta reseñas y presencia de marca, pero el mercado objetivo no es local                                                                 | J     |

### Fase 3 · Semanas 3-8 · Casos de estudio con proyectos propios

| #   | Tarea                                                                                                                                                                                 | Resp.      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 3.1 | Ruta `/[lang]/proyectos/[slug]/` sobre la colección `projects` existente (cuerpo Markdown + campos reto, solución, resultado)                                                         | K          |
| 3.2 | Caso BRUMA (landing 3D): objetivo, modelado en Blender, rendimiento con Three.js, capturas                                                                                            | K, datos J |
| 3.3 | Caso "este portafolio": WebGL, accesibilidad, Lighthouse 100, seguridad (CSP)                                                                                                         | K          |
| 3.4 | **Demo de app móvil en Flutter** (ej.: app de reservas o pedidos para un negocio pequeño), idealmente publicada en Google Play o como web. Cubre la falta de casos móviles mostrables | J          |
| 3.5 | **Demo de aplicación web** (ej.: panel de gestión con Angular + NestJS), con código en GitHub                                                                                         | J          |
| 3.6 | Cada proyecto futuro con cliente: pedir permiso por escrito para publicarlo como caso                                                                                                 | J          |

### Fase 4 · Mes 2 en adelante · Contenido y autoridad (continuo)

| #   | Tarea                                                                                                                                                                  | Resp. |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 4.1 | Blog en Astro (`/[lang]/blog/`), 1-2 artículos al mes sobre dudas de quien va a contratar (tabla 2.3)                                                                  | K     |
| 4.2 | Cada artículo responde la pregunta en el primer párrafo y enlaza a la página de detalle relacionada (formato que citan los buscadores de IA: skill `ai-seo`)           | K     |
| 4.3 | Publicar en LinkedIn una versión corta de cada caso o artículo, con enlace al sitio                                                                                    | J     |
| 4.4 | Enlaces entrantes: artículos en dev.to o Medium en español, comunidades (Flutter, GDG, Platzi), crédito "Desarrollado por Jaiber Flor" en el pie de sitios de clientes | J     |
| 4.5 | Revisión mensual en Search Console: consultas en posiciones 8-20 → mejorar título y texto de esa página (skill `seo-audit`, `references/rankings-push.md`)             | K     |

---

## 4. Formulario de contacto: análisis

Pendiente de decidir con calma. Resumen para esa conversación:

|                            | Solo correo (hoy)                             | Formulario                                                                                              |
| -------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Fricción para el visitante | Media: copiar la dirección y abrir su correo  | Baja: escribir y enviar sin salir del sitio                                                             |
| Calidad del mensaje        | Variable                                      | Mejor: preguntas guía (tipo de proyecto, plazo, ¿proyecto u oferta laboral?)                            |
| Medición                   | No se sabe cuántos escribieron desde el sitio | Cada envío se puede contar                                                                              |
| Costo y mantenimiento      | Ninguno                                       | Bajo: Cloudflare Pages Functions + Turnstile (anti-spam) + reenvío al correo. Sin servicios de terceros |
| Seguridad                  | Sin superficie nueva                          | Nueva entrada de datos: validar, limitar envíos, ajustar CSP                                            |
| Efecto en SEO              | Ninguno directo                               | Ninguno directo; mejora la conversión del tráfico que llegue                                            |

Opinión: aporta valor cuando haya tráfico de las páginas de detalle (fase 1 publicada y 1-2 meses
de datos). Mientras tanto, el `mailto:` con asunto prellenado (tarea 1.7) reduce la fricción sin
añadir código de servidor.

---

## 5. Métricas

| Métrica                                | Fuente                                  | Meta a 3 meses        | Meta a 6 meses |
| -------------------------------------- | --------------------------------------- | --------------------- | -------------- |
| Páginas indexadas                      | Search Console                          | 8+                    | 15+            |
| Impresiones en búsquedas sin tu nombre | Search Console                          | crecimiento mes a mes | 1.000+/mes     |
| Clics orgánicos                        | Search Console                          | 50+/mes               | 200+/mes       |
| Contactos recibidos desde el sitio     | Correo (asunto prellenado) o formulario | 2+/mes                | 5+/mes         |

Metas orientativas: se ajustan con la línea base de la fase 0.

---

## 6. Sobre la skill de SE Ranking

[seranking/seo-skills](https://github.com/seranking/seo-skills) requiere una cuenta de SE Ranking
con acceso a la API (de pago). Con un sitio de 2 URL y un dominio nuevo, sus informes de
competencia y enlaces no cambiarían las decisiones de este plan. Las skills del repo (`seo-audit`,
`schema`, `ai-seo`, `copywriting`, `copy-editing`) cubren la ejecución, y Keyword Planner, Google
Trends y Search Console cubren la investigación de palabras clave gratis. Reevaluar en el mes 3.

---

## 7. Siguiente paso propuesto

Empezar la fase 1 en una rama `seo/que-construyo`, en este orden:

1. Mapa de rutas traducidas en i18n (1.5), porque todo lo demás depende de él.
2. Página de **apps móviles** completa en ES y EN como plantilla, para revisarla juntos.
3. Con la plantilla aprobada: web, landing pages, cambios del inicio y datos estructurados.

## 8. Avance (rama `seo/que-construyo`)

Hecho el 2026-11-03, pendiente de revisión:

- [x] Correcciones de `docs/analisis-copys.md` (A1-A6, B1-B8, B10, B12).
- [x] 1.1 Título y descripción del inicio. 1.2 Frase del hero y CTA. 1.7 Texto de contacto (sin el `mailto:`).
- [x] 1.5 Mapa de rutas traducidas (`src/i18n/routes.ts`): canonical, hreflang, sitemap y selector de idioma.
- [x] 1.4 / 1.6 Colección `services` y página de apps móviles en ES y EN (`/es/desarrollo-apps-moviles/`, `/en/mobile-app-development/`).
- [x] 1.8 Tarjetas "Próximamente" ocultas (los archivos se conservan con `placeholder: true`).
- [x] 1.9 `WebPage`, `Service`, `BreadcrumbList` y `FAQPage` en la página de servicio; `knowsLanguage` en `Person`.
- [x] 1.11 `llms.txt` con "What I build". 1.12 Enlace desde "Plataformas" (paso Móvil).
- [x] Páginas de aplicaciones web (`/es/desarrollo-aplicaciones-web/`, `/en/web-app-development/`) y landing pages (`/es/landing-pages/`, `/en/landing-pages/`).
- [x] 1.3 Sección "Qué construyo" en el inicio (04, entre Proyectos y Contacto) con las tres tarjetas, y enlace en el dock.
- [ ] Jaiber confirma plazos (6-12, 8-16 y 1-3 semanas), propiedad del código y cuentas, y la respuesta sobre inglés.
- [ ] 1.10 Imagen OG por página de servicio (hoy usa la del idioma).
