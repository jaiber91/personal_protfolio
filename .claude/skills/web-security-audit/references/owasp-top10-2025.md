# OWASP Top 10:2025 aplicado a un sitio estático

Fuente: https://top10.owasp.org/2025/ (categorías confirmadas en el repositorio OWASP/Top10,
carpeta `2025/docs`). Para cada categoría: qué significa aquí, qué revisar y cómo.

---

## A01:2025 — Broken Access Control

**Aquí:** no hay usuarios ni rutas privadas, pero sí "control de acceso" sobre lo publicado.

- [ ] `dist/` solo contiene lo que debe ser público (sin `.env`, borradores, reportes, `*.map`
      salvo decisión consciente). `find dist -type f | sort`
- [ ] `public/` no tiene archivos privados.
- [ ] El repositorio público no contiene información que no deba ser pública (ver beyond-owasp).
- [ ] Sin directorios listables en el hosting.
- [ ] CORS: un sitio estático no necesita `Access-Control-Allow-Origin`; si el hosting lo
      agrega con `*`, evaluar.

## A02:2025 — Security Misconfiguration

**Aquí:** la categoría más relevante. Cabeceras, hosting y build.

- [ ] Cabeceras de seguridad (ver `security-headers.md`), verificadas con `curl -sI`.
- [ ] Cabeceras que revelan tecnología eliminadas (`Server`, `X-Powered-By`, `X-Generator`...).
- [ ] Sin `<meta name="generator">` ni comentarios HTML con detalles internos en `dist/`.
- [ ] Source maps: no publicados (o decisión consciente). `find dist -name "*.map"`
- [ ] Página 404 propia sin trazas ni información del servidor.
- [ ] HTTPS forzado y redirección de HTTP → HTTPS en el hosting.
- [ ] `site` en `astro.config.mjs` apunta al dominio real (canonical/hreflang correctos).

## A03:2025 — Software Supply Chain Failures

**Aquí:** dependencias de npm que corren en build (Astro, Sass, Prettier...) y en el navegador
(Three.js, GSAP, Lenis, fuentes). También acciones de CI y skills de terceros.

- [ ] `npm audit` y `npm audit --omit=dev`: sin vulnerabilidades altas/críticas sin plan.
- [ ] `package-lock.json` versionado y usado (`npm ci` en CI/hosting).
- [ ] Versiones fijadas o con rangos razonables; revisar paquetes abandonados.
- [ ] Scripts de instalación (`postinstall`, `preinstall`) de dependencias: listarlos y evaluar.
- [ ] Sin scripts ni estilos cargados desde CDNs externos en runtime (todo empaquetado o
      autoalojado). Si se agrega uno: SRI (`integrity`) + CSP.
- [ ] Dependabot o Renovate para actualizaciones de seguridad.
- [ ] GitHub Actions (si se agregan): versiones fijadas por SHA, permisos mínimos.

## A04:2025 — Cryptographic Failures

**Aquí:** casi todo lo cubre TLS del hosting.

- [ ] HTTPS en todo el sitio, HSTS (ver headers). Certificado válido y renovación automática.
- [ ] Sin contenido mixto (`http://` en recursos). `grep -rn "http://" dist`
- [ ] Sin secretos ni tokens en el código del cliente (todo lo de `dist/` es público).

## A05:2025 — Injection

**Aquí:** XSS en el cliente es el riesgo principal.

- [ ] Sin `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`
      con datos no confiables. `grep -rn "innerHTML\|insertAdjacentHTML\|eval(\|new Function" src`
- [ ] `set:html` de Astro solo con contenido generado por nosotros (p. ej. el QR en build).
- [ ] Sin lectura de `location.hash`, `location.search` o `postMessage` hacia el DOM.
- [ ] Contenido de `src/content` (Markdown) controlado por el autor; si algún día viene de un
      CMS, sanitizar.
- [ ] CSP como segunda barrera (sin `'unsafe-eval'`; scripts en línea con hash, no `'unsafe-inline'`).

## A06:2025 — Insecure Design

**Aquí:** decisiones de diseño con impacto en seguridad o privacidad.

- [ ] El correo se muestra completo en el HTML (decisión de producto): evaluar exposición a
      bots (ver beyond-owasp) y documentar la decisión.
- [ ] Copiar al portapapeles solo tras un clic del usuario (ya es así) y sin leer el portapapeles.
- [ ] Sin funciones que dependan de datos del visitante enviados a terceros.
- [ ] Si se agrega un formulario de contacto: anti-spam, validación, límites de tasa.

## A07:2025 — Authentication Failures

**Aquí:** N/A en el sitio (no hay autenticación). **Sí aplica a las cuentas que lo controlan:**

- [ ] GitHub: 2FA activo; ramas protegidas en `main`.
- [ ] Hosting y registrador del dominio: 2FA activo, correo de recuperación seguro.

## A08:2025 — Software or Data Integrity Failures

**Aquí:** integridad de lo que se publica.

- [ ] El despliegue sale de `main` (rama protegida) con build reproducible (`npm ci`).
- [ ] Sin recursos de terceros sin SRI.
- [ ] El QR apunta al perfil correcto (se genera en build desde una constante del código).
- [ ] Enlaces externos con `rel="noopener noreferrer"` (evita tabnabbing).

## A09:2025 — Security Logging and Alerting Failures

**Aquí:** sin backend propio; el registro es el del hosting.

- [ ] Alertas del hosting/CI ante despliegues fallidos o inesperados.
- [ ] Notificaciones de Dependabot/alertas de seguridad de GitHub activas.
- [ ] (Opcional) `report-to`/`report-uri` de CSP para enterarse de violaciones.

## A10:2025 — Mishandling of Exceptional Conditions

**Aquí:** que un fallo no deje el sitio roto o filtre información.

- [ ] Sin WebGL, sin JS o con `prefers-reduced-motion`: el contenido sigue legible
      (el loader no puede quedar bloqueando la página).
- [ ] Si el portapapeles falla: hay alternativa (`mailto:`) y no se muestran errores técnicos.
- [ ] Errores de carga de módulos dinámicos (`import()`) no rompen la página.
- [ ] Sin `console.error` con información interna en producción.
