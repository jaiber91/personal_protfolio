# Estado de seguridad del proyecto

Última auditoría: 2026-10-13 (rama `security/owasp-hardening`). Actualizar este archivo en
cada auditoría: es lo que evita reportar dos veces la misma decisión.

## Controles implementados

| Control | Dónde | Verificación |
|---|---|---|
| CSP con hashes (sin `'unsafe-inline'`/`'unsafe-eval'` en scripts) | `astro.config.mjs` → `security.csp` (Astro la genera en un `<meta>`) | `grep -o 'content-security-policy[^>]*' dist/es/index.html`; prueba sin violaciones (`securitypolicyviolation`) recorriendo la página |
| Cabeceras OWASP adaptadas | `public/_headers` (Netlify/Cloudflare) y `vercel.json` | `curl -sI` en el hosting real (`astro preview` no las aplica) |
| `frame-ancestors 'none'` + `X-Frame-Options: DENY` | Cabeceras del hosting | ídem |
| Sin recursos `data:` | `vite.build.assetsInlineLimit: 0` | `grep -c "data:" dist/es/index.html` → 0 |
| Correo sin dirección completa en el HTML | `Contact.astro` (el "@" lo pinta CSS; el script arma la dirección) | `grep -c "jaiver.navia@gmail.com" dist/*/index.html` → 0 |
| Respaldo si se pierde el contexto WebGL | `webgl/Stage.ts` (`webglcontextlost` → clase `no-webgl`) | `WEBGL_lose_context.loseContext()` → el nombre aparece en HTML |
| Sin source maps, meta `generator` ni comentarios HTML | Build de Astro | `find dist -name "*.map"`, `grep -c "<!--\|generator" dist/es/index.html` |
| `security.txt` (RFC 9116) | `public/.well-known/security.txt` | Renovar `Expires` antes del 2027-10-13 |
| Dependabot | `.github/dependabot.yml` | Activar alertas y secret scanning en GitHub |
| Identidad de commits personal | `git config user.email` local = correo personal | `git log --format='%ae %ce' \| sort -u` |

## Decisiones conscientes (no reportar como hallazgos)

- **`style-src-attr 'unsafe-inline'`:** los componentes usan atributos `style="--var: …"`
  (variables CSS en el marcado). Los `<style>` siguen protegidos con hashes en `style-src`.
  Riesgo bajo: no permite ejecutar scripts.
- **`clipboard-write=(self)` en Permissions-Policy:** necesario para "Copiar correo".
- **Sin `Clear-Site-Data` ni `Cache-Control: no-store` global:** borrarían la preferencia de
  tema y destruirían el rendimiento sin proteger nada (no hay datos privados).
- **`npm audit`: `braces` (alta) vía `eslint-plugin-astro`:** solo desarrollo (lint), sin
  versión corregida; `npm audit --omit=dev` = 0. Revisar cuando Dependabot proponga una versión.
- **Coordenadas, ciudad y hora local públicas:** decisión de diseño del autor.
- **QR con `set:html`:** se genera en build desde una constante del código, sin datos externos.

## Pendientes (requieren acción fuera del código)

- [ ] **Dominio real** en `astro.config.mjs` (`site` todavía es `https://example.com`) y en
      `security.txt` (`Canonical:`).
- [ ] **Hosting:** confirmar cabeceras con `curl -sI` y https://securityheaders.com.
- [ ] **GitHub:** 2FA, proteger `main`, activar Dependabot alerts y secret scanning.
- [ ] **Dominio:** 2FA y bloqueo en el registrador, CAA, DMARC `p=reject` si no envía correo.
