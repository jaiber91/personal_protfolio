import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un archivo Markdown por proyecto e idioma: src/content/projects/{es,en}/<slug>.md
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      role: z.string(),
      stack: z.array(z.string()).min(1),
      year: z.number().int(),
      order: z.number().default(0),
      url: z.url().optional(),
      /** Dispositivo en el que se muestra el proyecto (mismo lenguaje que Plataformas). */
      device: z.enum(['phone', 'tablet', 'web']).default('web'),
      /** Captura de la pantalla. Sin imagen se dibuja una interfaz de ejemplo. */
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Contenido provisional mientras se gestionan permisos para mostrar proyectos reales. */
      placeholder: z.boolean().default(false),
    }),
});

// Páginas de "Qué construyo": src/content/services/{es,en}/<clave>.md. El nombre del archivo
// es la clave del mapa de rutas (src/i18n/routes.ts), que define el slug de cada idioma.
const item = z.object({ title: z.string(), text: z.string() });
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    /** Orden en la sección "Qué construyo" del inicio. */
    order: z.number().int(),
    /** <title> y meta descripción. */
    title: z.string().max(65),
    description: z.string().max(160),
    /** Tipo de servicio en los datos estructurados (schema.org `serviceType`). */
    serviceType: z.string(),
    /** Nombre corto: miga de pan y enlaces. */
    name: z.string(),
    /** Resumen de una línea para la tarjeta del inicio. */
    summary: z.string(),
    heading: z.string(),
    lead: z.string(),
    audience: z.array(z.string()).min(1),
    includes: z.array(item).min(1),
    process: z.array(item).min(1),
    estimate: z.object({ intro: z.string(), factors: z.array(z.string()).min(1) }),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
  }),
});

export const collections = { projects, services };
