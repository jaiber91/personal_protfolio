# Más allá de OWASP: casos propios de este tipo de sitio

Riesgos que el Top 10 no nombra explícitamente o que aparecen solo en sitios estáticos,
portafolios personales o sitios con WebGL.

---

## 1. Exposición de datos personales

- [ ] **Correo recolectado por bots:** el correo aparece como texto plano en el HTML (botón de
      copiar, `aria-label`, `data-copy-email`, `mailto:` de respaldo). Opciones, de menos a más
      fricción: dejarlo (decisión consciente), ensamblarlo en JS desde partes, ofuscar con
      entidades HTML, o reemplazarlo por un formulario con protección anti-spam.
- [ ] **Datos de más:** coordenadas, ciudad y hora local son públicas por decisión; no publicar
      dirección, teléfono ni documentos (el CV no debe incluir teléfono si se publica).
- [ ] **Metadatos de imágenes:** las capturas en `src/assets` no deben llevar EXIF/GPS.
      `exiftool src/assets/**/*` (o el optimizador de Astro los elimina: verificar en `dist/`).

## 2. Repositorio público (GitHub)

- [ ] Sin secretos en el historial completo, no solo en el último commit:
      `git log -p | grep -iE "api[_-]?key|secret|token|password|BEGIN .*PRIVATE KEY"`.
- [ ] `.gitignore` cubre `.env*`, reportes (Lighthouse, auditorías), `dist/`, `.astro/`.
- [ ] Rama `main` protegida (sin push forzado, PR obligatorio si hay colaboradores).
- [ ] Alertas de seguridad, Dependabot y secret scanning activados en GitHub.
- [ ] El correo de los commits es el que se quiere hacer público (o usar el noreply de GitHub).

## 3. Skills y agentes de IA en el repositorio

- [ ] `.claude/skills/` de terceros son **instrucciones que un agente sigue**: un cambio
      malicioso en una skill es inyección de prompts. Revisar diferencias al actualizarlas,
      registrar origen y commit, y no aceptar skills con scripts sin leerlos.
- [ ] Ninguna skill debe pedir ejecutar comandos de red, enviar datos fuera o desactivar
      verificaciones.

## 4. Código del cliente

- [ ] **Source maps** no publicados (exponen el código fuente completo y comentarios).
- [ ] **Comentarios HTML y meta `generator`** fuera del HTML final (revelan stack y versiones).
- [ ] **Enlaces externos** con `target="_blank"` → `rel="noopener noreferrer"`.
- [ ] **Clickjacking** del botón de copiar o enlaces: cubierto por `frame-ancestors 'none'`.
- [ ] **`localStorage`:** solo la preferencia de tema; leerla siempre validando el valor
      (ya se valida `light`/`dark`).
- [ ] **Portapapeles:** solo escritura y solo tras un clic; nunca `clipboard.readText()`.

## 5. WebGL y rendimiento como superficie de abuso

- [ ] **Agotamiento de GPU/CPU:** el sitio debe dejar de renderizar cuando el canvas no es
      visible (ya lo hace `Stage`), limitar `devicePixelRatio` (ya: máx. 2) y la cantidad de
      instancias según el tamaño de pantalla.
- [ ] **Pérdida de contexto WebGL** (`webglcontextlost`): la página no debe quedar rota ni
      en un bucle; el contenido HTML sigue visible.
- [ ] **Fingerprinting:** no leer `WEBGL_debug_renderer_info` ni enviar datos del dispositivo.

## 6. Dominio y DNS (cuando exista)

- [ ] Registrador con 2FA y bloqueo de transferencia.
- [ ] Registros CAA limitando qué autoridades emiten certificados.
- [ ] DNSSEC si el registrador lo permite.
- [ ] Sin registros DNS apuntando a servicios dados de baja (subdomain takeover).
- [ ] SPF/DMARC (`v=DMARC1; p=reject`) si el dominio no envía correo, para que no se use en
      suplantaciones.
- [ ] HSTS preload solo cuando todo el dominio y subdominios estén en HTTPS de forma definitiva.

## 7. Archivos de política y descubrimiento

- [ ] `/.well-known/security.txt` (RFC 9116) con contacto y fecha de expiración.
- [ ] `robots.txt` y `sitemap.xml` sin rutas que no deban indexarse.
- [ ] Página 404 sin información técnica.

## 8. Privacidad del visitante

- [ ] Sin analítica ni scripts de terceros sin aviso; si se agregan, preferir opciones sin
      cookies y actualizar la CSP.
- [ ] Fuentes autoalojadas (sin Google Fonts en runtime: evita enviar IPs a terceros).
- [ ] `Referrer-Policy` restrictiva para no filtrar rutas a sitios externos.
