# Portafolio — Jaiber Flor

Portafolio personal bilingüe (ES/EN) construido con **Astro**, **Three.js**, **GSAP + Lenis**, **TypeScript** y **Sass**.

## Scripts

| Comando           | Acción                                    |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Servidor local en `http://localhost:4321` |
| `npm run build`   | Chequeo de tipos (`astro check`) + build  |
| `npm run preview` | Sirve el build de `dist/`                 |
| `npm run lint`    | ESLint (TS + Astro)                       |
| `npm run format`  | Prettier                                  |

## Estructura

```text
src/
├── components/
│   ├── layout/        # Header, Dock (navegación inferior), Footer
│   ├── sections/      # Loader, Hero, Manifesto, Platforms, Story, Projects, Contact
│   └── ui/            # Button, DeviceFrame, LanguageSwitcher, LiveClock,
│                      # ProjectCard (pase de abordar), ThemeToggle
├── content/projects/  # Proyectos en Markdown, una carpeta por idioma (es/, en/)
├── i18n/              # Idiomas, diccionarios tipados y helpers de rutas
├── layouts/           # BaseLayout (SEO, hreflang, tema)
├── pages/[lang]/      # Una página por idioma (/es/, /en/)
├── scripts/
│   ├── core/          # gsap, scroll (Lenis), lifecycle, motion, theme
│   └── interactions/  # fit, flap, magnetic, reveal, split (comportamientos reutilizables por data-attributes)
├── styles/
│   ├── tokens/        # Colores (temas), tipografía, espaciado, movimiento, breakpoints
│   ├── abstracts/     # Funciones y mixins (no emiten CSS)
│   ├── base/          # Custom properties, reset, tipografía y estilos globales
│   ├── utilities/     # Clases utilitarias
│   └── main.scss      # Hoja global (se importa una vez en BaseLayout)
└── webgl/
    ├── Stage.ts       # Un renderer por sección: cámara, loop (solo si es visible), puntero
    ├── flip/          # FlipBoard: tablero flip-dot (hero)
    ├── pixels/        # PixelDevices: píxeles que forman móvil -> tablet -> web
    └── shapes/        # Formas dibujadas en canvas 2D y muestreadas como puntos
```

## Convenciones

### Componentes

Cada componente vive en su carpeta con archivos separados:

```text
Hero/
├── Hero.astro   # HTML (markup + props)
├── Hero.scss    # Estilos (BEM: .hero, .hero__title, .hero--variant)
└── Hero.ts      # Comportamiento (custom element <hero-section>)
```

- El `.astro` importa su `.scss` en el frontmatter y su `.ts` con `<script>import './Hero.ts'</script>`.
- Los componentes interactivos son **custom elements**: limpian lo que crean en `disconnectedCallback`
  (`gsap.context().revert()`, `AbortController`).
- No hagas `pin` de GSAP sobre el custom element: el pin lo mueve en el DOM y vuelve a disparar
  su ciclo de vida. Fija un `div` interno (ver `Platforms`).
- Los hooks de JS van en `data-*` (`data-hero-title`); las clases son solo para estilos.

### Estilos

- **Nunca** hex ni tamaños sueltos en componentes: usa los tokens a través de las funciones
  `color()`, `space()`, `font-size()`, `radius()`, `duration()`, `ease()` y `z()`.
- Cada `.scss` de componente empieza con `@use 'abstracts' as *;`.
- Mobile first con `@include mq(lg) { ... }`; hovers con `@include hover { ... }`.
- Los temas claro/oscuro se definen en `styles/tokens/_colors.scss` y se exponen como
  custom properties. Three.js lee el color de las partículas del token `--color-particle`.

### i18n

- Textos de interfaz en `src/i18n/dictionaries/{es,en}.ts`. `es.ts` define el tipo: si falta
  una clave en `en.ts`, TypeScript falla.
- Proyectos en `src/content/projects/{es,en}/*.md` (esquema en `src/content.config.ts`).

### Movimiento y accesibilidad

- `prefers-reduced-motion`: sin loader, sin Lenis, sin explosiones de partículas y contenido
  visible de inmediato.
- Sin WebGL o sin JS el sitio sigue siendo completamente legible.

## Dirección visual: “SALIDAS”

Tableros de aeropuerto (flip-dot y split-flap): la trayectoria se lee como un viaje. Basada en
[UI UX Pro Max](https://uupm.cc/): **Brutalism** + **Kinetic Typography** con un solo acento
(**Swiss Modernism 2.0**): el amarillo de los discos flip-dot (`signal`) sobre tinta y papel.
Tipografías: Archivo expandida (titulares), Epilogue (texto) y JetBrains Mono (datos).

## Flujo de la experiencia

1. **Loader**: log de terminal + contador 000 → 100; el fondo se deshace en una grilla de píxeles.
2. **Hero**: tablero flip-dot en WebGL (`webgl/flip`): los discos giran en 3D para escribir el nombre y
   se voltean al paso del cursor.
3. **Manifiesto**: las palabras se encienden con el scroll; las clave se marcan en amarillo.
4. **Plataformas**: sección fija; píxeles cuadrados forman móvil → tablet → web.
5. **Trayectoria**: tablero de salidas con letras split-flap (`scripts/interactions/flap.ts`); cada vuelo
   (empresa) se abre y muestra sus cifras. Debajo, las "escalas" (formación).
6. **Proyectos**: pases de abordar en un carril horizontal fijado (escritorio), con inclinación 3D al cursor
   (`device: phone | tablet | web` en el Markdown define la "puerta" y el marco).
7. **Contacto**: bloque que copia el correo, LinkedIn, QR (generado en build) y hora local en vivo.

Navegación: header mínimo arriba y un dock inferior (como la barra de pestañas de una app) que marca la
sección activa y el progreso.

## SEO

- **Dominio:** una sola fuente, `site` en `astro.config.mjs`. De ahí salen canonical, hreflang,
  Open Graph, datos estructurados, sitemap, `robots.txt` y `llms.txt`.
- **Perfil:** `src/config/profile.ts` (nombre completo, variantes "Jaiber Flor" / "Leonardo Flor",
  redes, ubicación). Lo usan los datos estructurados (`Person`, `ProfilePage`, `WebSite`) y `llms.txt`.
- **Imagen para compartir:** `npm run og` regenera `public/og/og-{es,en}.png` (1200×630) con el
  nombre y la frase del hero de cada idioma. Usa el Chrome instalado (o `CHROME_PATH`).
- **Generados en build:** `sitemap-index.xml` (con hreflang y x-default), `robots.txt` y `llms.txt`.
- **Íconos:** `favicon.svg`/`.ico`, `apple-touch-icon.png`, `icon-192/512.png` y `site.webmanifest`.

## Pendientes

- [ ] Dominio real en `astro.config.mjs` (`site`).
- [ ] Proyectos reales (pendiente de permisos) en `src/content/projects/`, con su captura en
      `src/assets/projects/` (`image` + `imageAlt` en el frontmatter).
- [ ] CV descargable.
