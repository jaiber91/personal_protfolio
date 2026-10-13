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

export const collections = { projects };
