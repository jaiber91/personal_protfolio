## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Convenciones del proyecto

Lee `README.md` (sección "Convenciones") antes de crear o modificar componentes. Resumen:

- Un componente = una carpeta con `Nombre.astro` + `Nombre.scss` + `Nombre.ts` (si tiene comportamiento).
- Estilos solo con tokens (`color()`, `space()`, `font-size()`…) vía `@use 'abstracts' as *;`. BEM.
- Interactividad con custom elements que limpian en `disconnectedCallback`.
- Textos nuevos: agrégalos en `src/i18n/dictionaries/es.ts` y `en.ts` (nunca texto fijo en componentes).
- Antes de terminar: `npm run build` (incluye `astro check`), `npm run lint`, `npm run format:check`.
