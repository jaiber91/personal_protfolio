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
│   ├── layout/        # Header, Footer, WebGLCanvas
│   ├── sections/      # Loader, Hero, Platforms, Story, Projects, Contact
│   └── ui/            # Button, DeviceFrame, SectionHeading, ThemeToggle, LanguageSwitcher, ProjectCard
├── content/projects/  # Proyectos en Markdown, una carpeta por idioma (es/, en/)
├── i18n/              # Idiomas, diccionarios tipados y helpers de rutas
├── layouts/           # BaseLayout (SEO, hreflang, tema, canvas)
├── pages/[lang]/      # Una página por idioma (/es/, /en/)
├── scripts/
│   ├── core/          # gsap, scroll (Lenis), lifecycle, motion, theme
│   └── interactions/  # magnetic, reveal, split (comportamientos reutilizables por data-attributes)
├── styles/
│   ├── tokens/        # Colores (temas), tipografía, espaciado, movimiento, breakpoints
│   ├── abstracts/     # Funciones y mixins (no emiten CSS)
│   ├── base/          # Custom properties, reset, tipografía y estilos globales
│   ├── utilities/     # Clases utilitarias
│   └── main.scss      # Hoja global (se importa una vez en BaseLayout)
└── webgl/
    ├── Experience.ts  # Renderer, cámara, loop y conversión pantalla -> mundo
    ├── particles/     # ParticleMorph + shaders GLSL
    └── shapes/        # Formas dibujadas en canvas 2D y muestreadas como partículas
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

## Flujo de la experiencia

1. **Loader**: contador 0 → 100 mientras cargan fuentes y partículas.
2. **Intro**: el “100” se convierte en partículas que forman un móvil (hero).
3. **Plataformas**: sección fija; el scroll transforma móvil → tablet → web.
4. **Trayectoria**: la sección se fija y el scroll recorre las cifras de cada empresa. Las partículas forman
   la cifra activa encima del número HTML (que queda transparente) y entre cifras estallan y se rearman.
   Debajo, la formación.
5. **Proyectos**: en escritorio la sección se fija y el scroll desplaza los proyectos en horizontal, cada uno
   dentro del dispositivo para el que se hizo (`device: phone | tablet | web` en el Markdown).
6. **Contacto**: el campo de partículas vuelve a juntarse formando un “@”.

## Pendientes

- [ ] Dominio real en `astro.config.mjs` (`site`).
- [ ] Proyectos reales (pendiente de permisos) en `src/content/projects/`, con su captura en
      `src/assets/projects/` (`image` + `imageAlt` en el frontmatter).
- [ ] Imagen Open Graph y favicon propios.
- [ ] CV descargable.
