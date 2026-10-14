# Cabeceras HTTP de seguridad

Fuente: OWASP Secure Headers Project, archivos `ci/headers_add.json` y `ci/headers_remove.json`
(https://github.com/OWASP/www-project-secure-headers, actualizados 2026-10-04).

## 1. Valores recomendados por OWASP (referencia, sin adaptar)

| Cabecera | Valor OWASP |
|---|---|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains` |
| Content-Security-Policy | `default-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests` |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `deny` |
| Referrer-Policy | `no-referrer` |
| Permissions-Policy | `accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(self), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), unload=()` |
| Cross-Origin-Opener-Policy | `same-origin` |
| Cross-Origin-Embedder-Policy | `require-corp` |
| Cross-Origin-Resource-Policy | `same-origin` |
| X-Permitted-Cross-Domain-Policies | `none` |
| X-DNS-Prefetch-Control | `off` |
| Cache-Control | `no-store, max-age=0` |
| Clear-Site-Data | `"cache","cookies","storage"` |

**Eliminar** (88 en la lista de OWASP), entre ellas: `Server`, `X-Powered-By`, `Powered-By`,
`X-Generator`, `X-Generated-By`, `X-Framework`, `SourceMap`, `X-SourceMap`, `X-CF-Powered-By`,
`X-Nextjs-*`, `X-Redirect-By`, trazas `X-B3-*`/`X-Datadog-*`/`X-Envoy-*`.

## 2. Adaptación a este sitio (por qué no se copian todas tal cual)

| Cabecera | Decisión aquí | Motivo |
|---|---|---|
| **Content-Security-Policy** | Partir de la de OWASP y añadir solo lo necesario (ver abajo). | El sitio usa un script en línea (tema antes del primer pintado) y CSS en línea (`inlineStylesheets: 'always'`). |
| **Permissions-Policy** | La de OWASP **excepto `clipboard-write=(self)`**. | El botón "Copiar correo" usa `navigator.clipboard.writeText`. Con `clipboard-write=()` dejaría de funcionar (Chromium). |
| **Cache-Control** | `no-store` **solo** en HTML si se quiere; los assets con hash (`/_astro/*`) con `public, max-age=31536000, immutable`. | `no-store` en todo destruye el rendimiento y no protege nada en un sitio sin datos privados. |
| **Clear-Site-Data** | **No usar** en el sitio. | Es para endpoints de cierre de sesión; aquí borraría la preferencia de tema en cada visita. |
| **Cross-Origin-Embedder-Policy** | `require-corp` es viable porque todo es del mismo origen; si se agrega un recurso externo (imagen, video, fuente) debe enviar CORP/CORS o romperá. | Defensa contra fugas entre orígenes; habilita aislamiento. |
| **X-Frame-Options** | `DENY` + `frame-ancestors 'none'` en la CSP. | Antiguo + moderno: evita clickjacking. |
| **Referrer-Policy** | `no-referrer` o `strict-origin-when-cross-origin`. | `no-referrer` es lo más privado; los enlaces salientes (LinkedIn) no necesitan el referrer. |

### CSP de este proyecto

Implementada con la CSP nativa de Astro (`security.csp` en `astro.config.mjs`): Astro calcula
en build los hashes de scripts y estilos en línea. La cabecera del hosting añade
`frame-ancestors 'none'` (un `<meta>` no la admite). Ver `project-status.md`.

### CSP de referencia (si se hiciera a mano)

```
default-src 'self';
script-src 'self' 'sha256-<hash del script de tema>';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
worker-src 'self' blob:;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests
```

Notas:
- **`script-src`:** nunca `'unsafe-inline'` ni `'unsafe-eval'`. Los scripts en línea van con
  su hash (`sha256-...`). Cualquier cambio en el script exige recalcular el hash: automatizarlo
  en build o verificarlo en CI.
- **`style-src 'unsafe-inline'`:** decisión consciente por el CSS en línea y los estilos en
  línea que escribe GSAP en `style=""`. El riesgo de inyección de estilos es bajo frente al de
  scripts; documentarlo para que no se reporte de nuevo.
- **`img-src data:`:** solo si hay imágenes en `data:` (revisar `dist/`); si no, quitarlo.
- **`worker-src blob:`:** solo si alguna librería crea workers desde blobs; si no, quitarlo.
- **Meta-CSP de respaldo:** `<meta http-equiv="Content-Security-Policy">` sirve mientras no
  haya hosting, pero **no** admite `frame-ancestors`, `report-uri` ni `sandbox`: la cabecera
  HTTP sigue siendo necesaria.

## 3. Dónde se configuran según el hosting

| Hosting | Archivo |
|---|---|
| Netlify / Cloudflare Pages | `public/_headers` (se copia a `dist/_headers`) |
| Vercel | `vercel.json` → `headers` |
| GitHub Pages | No permite cabeceras propias: solo meta-CSP. Preferir otro hosting. |

## 4. Verificación

```bash
npm run build && npx astro preview --port 4400 &
curl -sI http://localhost:4400/es/ | sort       # ¡astro preview no aplica _headers!
```

`astro preview` **no** aplica `_headers` ni `vercel.json`: verificar en el hosting real
(previsualización de rama) con `curl -sI` y con https://securityheaders.com u
https://observatory.mozilla.org una vez publicado.
