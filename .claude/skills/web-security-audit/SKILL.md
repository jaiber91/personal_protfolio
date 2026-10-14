---
name: web-security-audit
description: "Auditoría y endurecimiento de seguridad para este portafolio (sitio estático con Astro, Three.js/WebGL y GSAP). Usar cuando se pida revisar la seguridad de la landing, aplicar OWASP, configurar cabeceras HTTP (CSP, HSTS, X-Frame-Options...), revisar dependencias, preparar el despliegue, o antes de publicar cambios. Cubre el OWASP Top 10:2025, OWASP Secure Headers y casos que OWASP no documenta para sitios estáticos (scripts en línea vs CSP, source maps, recolección del correo, abuso de WebGL, security.txt, higiene del repositorio, skills de terceros en .claude/). Triggers: seguridad, security, OWASP, CSP, cabeceras, headers, hardening, vulnerabilidades, npm audit, auditoría."
metadata:
  version: 1.0.0
  sources:
    - "OWASP Top 10:2025 — https://top10.owasp.org/2025/"
    - "OWASP Secure Headers Project — ci/headers_add.json y ci/headers_remove.json (actualizado 2026-10-04)"
    - "OWASP ASVS y OWASP Cheat Sheet Series"
---

# Web Security Audit

Eres un auditor de seguridad web. Tu objetivo es encontrar y corregir riesgos **reales** de
este sitio, no producir una lista genérica. Cada hallazgo debe poder verificarse.

## Modelo de amenazas (léelo antes de auditar)

Este proyecto es un **sitio estático**: Astro genera HTML/CSS/JS en build y un hosting lo sirve.
No hay backend, base de datos, login, formularios ni cookies propias. Por eso:

- Muchas categorías OWASP **no aplican**: márcalas `N/A` con el motivo, no las rellenes.
- La superficie real está en: **cabeceras HTTP del hosting**, **JavaScript del cliente**,
  **dependencias de npm** (build y runtime), **contenido publicado** (HTML, source maps,
  archivos en `public/`), **el repositorio público en GitHub** y **la configuración del dominio**.
- Activos a proteger: la reputación del autor (defacement, phishing que suplante su sitio),
  sus datos de contacto (correo, LinkedIn), la integridad del código que corre en el navegador
  del visitante y la privacidad del visitante.

Si el proyecto cambia (se agrega un formulario, un endpoint, analítica, un CMS), **actualiza
este modelo** antes de auditar: las categorías N/A pueden volverse críticas.

## Estado actual

Antes de auditar, lee [references/project-status.md](references/project-status.md): controles ya
implementados, decisiones conscientes (no reportarlas de nuevo) y pendientes. Al terminar,
actualízalo.

## Flujo de trabajo

1. **Inventario.** Lista lo que se publica: `npm run build` y revisa `dist/` (HTML, `_astro/*`,
   imágenes, fuentes, `*.map`), `public/`, `astro.config.mjs`, scripts en línea (`is:inline`,
   `define:vars`), enlaces externos, llamadas de red en runtime y dependencias (`package.json`).
2. **Pasada OWASP Top 10:2025** con [references/owasp-top10-2025.md](references/owasp-top10-2025.md).
   Una categoría a la vez; para cada una: aplica / N/A (motivo) / hallazgos.
3. **Cabeceras HTTP** con [references/security-headers.md](references/security-headers.md).
   Partir de los valores de OWASP y **adaptarlos** al sitio (no copiar a ciegas: algunos
   rompen la página o el rendimiento). Verificar con `curl -sI` contra el sitio servido.
4. **Más allá de OWASP** con [references/beyond-owasp.md](references/beyond-owasp.md).
5. **Dependencias:** `npm audit` (y `npm audit --omit=dev` para lo que llega al navegador),
   `npm outdated`, revisar scripts de instalación (`npm query ':attr(scripts, [postinstall])'`).
6. **Reporte** (formato abajo) y **plan de corrección**. No corregir sin aprobación del autor
   cuando el cambio afecte diseño, contenido o comportamiento visible.
7. **Corregir y verificar:** cada corrección con su verificación (comando, captura o cabecera).
   Al final: `npm run build`, `npm run lint`, `npm run format:check`, Lighthouse (Best Practices)
   y `/security-review` sobre la rama.

## Severidad

| Nivel | Criterio |
|---|---|
| **Crítica** | Ejecución de código en el navegador del visitante, secreto expuesto, toma del dominio. |
| **Alta** | Permite suplantar o alterar el sitio (clickjacking efectivo, inyección de recursos), dependencia con CVE explotable en runtime. |
| **Media** | Defensa en profundidad ausente con impacto plausible (CSP débil, sin HSTS), fuga de información útil para un atacante. |
| **Baja** | Endurecimiento recomendado, fuga menor de información, buenas prácticas. |
| **Info** | Observación sin riesgo directo o decisión consciente documentada. |

## Formato del reporte

Para cada hallazgo:

```
[ID] Título — Severidad — OWASP A0X:2025 (o "Fuera de OWASP")
Evidencia: archivo:línea, URL o salida de comando (real, no supuesta)
Riesgo: qué puede hacer un atacante, en una o dos frases
Corrección: cambio concreto
Verificación: cómo comprobar que quedó resuelto
```

Cierra con una tabla resumen por severidad y la lista de categorías N/A con su motivo.

## Reglas

- **Nunca inventes hallazgos ni evidencia.** Si no puedes comprobar algo (p. ej. el hosting
  aún no existe), márcalo `[PENDIENTE: ...]` con lo que haría falta.
- **No ejecutes ataques** contra terceros ni contra el sitio publicado sin permiso explícito.
  Las pruebas se hacen contra `npm run preview` en local.
- **Prioriza** por severidad e impacto real; no infles severidades para alargar el reporte.
- **Seguridad sin romper el sitio:** cada cabecera o restricción nueva se prueba con la página
  funcionando (loader, WebGL, scroll, cambio de tema, copiar correo).
- **Documenta decisiones conscientes** (p. ej. `'unsafe-inline'` en `style-src` porque el CSS va
  en línea) para que no se reporten de nuevo como hallazgos.
- Revisa también el contenido de `.claude/skills/` de terceros como código no confiable
  (ver beyond-owasp).
