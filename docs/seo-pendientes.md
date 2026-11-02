# SEO: pendientes

Estado al 2026-10-14. Sitio en producción: https://jaiberflor.dev (Cloudflare, rama `main`).

## Ya hecho (verificado en producción)

- [x] Dominio `jaiberflor.dev` en canonical, hreflang, Open Graph, sitemap, `robots.txt` y `llms.txt`
      (única fuente: `site` en `astro.config.mjs`).
- [x] Título y meta descripción por idioma (la descripción incluye "Jaiber Leonardo Flor").
- [x] Imagen para compartir 1200×630 por idioma (`npm run og` la regenera), también en la raíz `/`.
- [x] Etiquetas para X (`summary_large_image`).
- [x] Datos estructurados JSON-LD: `Person` (con "Jaiber Flor" y "Leonardo Flor" como
      `alternateName`), `ProfilePage` y `WebSite`.
- [x] `sitemap-index.xml` con hreflang y `x-default`; `robots.txt`; `llms.txt` para IA.
- [x] Favicon "JF", íconos de iOS/Android y `site.webmanifest`.
- [x] Lighthouse 100 en Performance, Accessibility, Best Practices y SEO (escritorio).
- [x] Correo `hola@jaiberflor.dev` (Cloudflare Email Routing → Gmail) y DMARC `p=reject`.

## 1. Registrar el sitio en buscadores (lo hace Jaiber)

- [x] **Google Search Console** (verificado por DNS, sitemap enviado, indexación solicitada) — https://search.google.com/search-console
  1. Agregar propiedad → tipo **Dominio** → `jaiberflor.dev`.
  2. Verificar con el registro `TXT` que entrega Google (agregarlo en el DNS de Cloudflare;
     Cloudflare puede hacerlo automático).
  3. **Sitemaps** → enviar `sitemap-index.xml`.
  4. **Inspección de URLs** → solicitar indexación de `https://jaiberflor.dev/es/` y `/en/`.
- [x] **Bing Webmaster Tools** (importado desde Search Console) — https://www.bing.com/webmasters
  - Importar desde Search Console (un clic). Bing alimenta ChatGPT y Copilot.

## 2. Coherencia fuera del sitio (lo hace Jaiber)

- [ ] **LinkedIn:** agregar `https://jaiberflor.dev` en "Sitio web" e información de contacto;
      evaluar mostrar el nombre como **Jaiber Leonardo Flor**; correo `hola@jaiberflor.dev`.
- [ ] **GitHub** (`jaiber91`): agregar `jaiberflor.dev` en el perfil.
- [ ] **CV:** sitio y correo nuevos.

## 3. Validar (lo hace Jaiber, con apoyo)

- [ ] Prueba de resultados enriquecidos de Google — https://search.google.com/test/rich-results
      (debe detectar `Person` / `ProfilePage`).
- [ ] Post Inspector de LinkedIn — https://www.linkedin.com/post-inspector/
      (fuerza a LinkedIn a leer la imagen nueva).
- [ ] Vista previa en WhatsApp con una URL nueva (p. ej. `https://jaiberflor.dev/?v=3`),
      porque WhatsApp guarda en caché la vista previa de cada URL.

## 4. Pendientes técnicos (los hace Claude)

- [x] **`www.jaiberflor.dev` → `jaiberflor.dev`:** regla de Cloudflare "Redirect from WWW to root"
      (301, conserva ruta y parámetros).
- [x] **Página 404 propia** con el concepto del aeropuerto ("Vuelo cancelado") y enlace al
      inicio, en ES y EN. Hoy una URL inexistente devuelve una página genérica.
- [x] **Cloudflare Web Analytics** (CSP lista; falta activarla en el panel de Cloudflare:
      Analytics & Logs → Web Analytics → agregar `jaiberflor.dev` con instalación automática) (gratis, sin cookies): activar en Cloudflare y ajustar la
      CSP para permitir su script (`static.cloudflareinsights.com`) y el envío de datos
      (`cloudflareinsights.com`). Actualizar `project-status.md` de la skill de seguridad.
- [ ] **HTTP → HTTPS** (detectado el 2026-11-02 por el aviso de Search Console "Excluida por
      una etiqueta noindex", que lista `https://jaiberflor.dev/`, `https://www.jaiberflor.dev/`
      y `http://jaiberflor.dev/`). Hoy `http://jaiberflor.dev/` responde 200 sin redirigir y
      `http://www.jaiberflor.dev/` responde 522. Arreglo en Cloudflare: SSL/TLS → Edge
      Certificates → activar **Always Use HTTPS**. Verificar después (deben dar 301 hasta
      `https://jaiberflor.dev/`):
      `for u in http://jaiberflor.dev/ http://www.jaiberflor.dev/ https://www.jaiberflor.dev/; do curl -s -o /dev/null -w "$u %{http_code} -> %{redirect_url}\n" "$u"; done`
      Los avisos de "noindex" (raíz `/` y páginas 404) y de "Página alternativa con etiqueta
      canónica adecuada" son intencionales: no pulsar "Validar corrección".
- [ ] (Opcional) Desactivar en Cloudflare los builds de ramas que no son de producción
      (Settings → Build → Branch control): hoy fallan con `wrangler preview` sin afectar
      producción.

## 5. Mediano plazo: contenido

- [ ] **Casos de estudio** (una página por proyecto: problema, rol, decisiones, resultados)
      cuando haya permiso para mostrar proyectos reales. Reemplazan los pases "Próximamente"
      y suman contenido indexable ("desarrollador Flutter Colombia", "Flutter banca", etc.).
- [ ] Revisar en Search Console, a las 2–4 semanas, qué búsquedas traen visitas y ajustar
      títulos y textos (skill `seo-audit`).

## Referencias en el repo

- Skills: `.claude/skills/seo-audit`, `.claude/skills/schema`, `.claude/skills/ai-seo`.
- Perfil y nombres: `src/config/profile.ts`.
- Metadatos para compartir: `src/components/layout/SocialMeta/SocialMeta.astro`.
- Datos estructurados: `src/components/layout/StructuredData/StructuredData.astro`.
- Imagen OG: `scripts/og/render.ts` (`npm run og`).
