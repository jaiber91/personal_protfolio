import type { APIRoute } from 'astro';
import { profile } from '@/config/profile';
import { getCollection } from 'astro:content';
import { isRouteKey, routePath, type RouteKey } from '@/i18n';
import en from '@/i18n/dictionaries/en';

// llms.txt (https://llmstxt.org): resumen en texto plano para asistentes y buscadores de IA
// (ChatGPT, Perplexity, Claude...). Se genera desde los mismos datos del sitio.
// `en/mobile-apps` -> `mobile-apps` (clave del mapa de rutas).
function serviceKey(id: string): RouteKey {
  const key = id.split('/')[1] ?? '';
  if (!isRouteKey(key)) throw new Error(`Servicio sin ruta en src/i18n/routes.ts: ${id}`);
  return key;
}

export const GET: APIRoute = async ({ site }) => {
  const services = (await getCollection('services', ({ id }) => id.startsWith('en/'))).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const home = (path: string) => new URL(path, site).href;
  const strip = (text: string) => text.replace(/\*/g, '');
  const number = new Intl.NumberFormat('en', { useGrouping: 'always' });

  const experience = en.story.items.map((item) =>
    [
      `### ${item.role} — ${item.company} (${item.period})`,
      ...item.metrics.map(
        (metric) =>
          `- ${number.format(metric.value)}${metric.suffix} ${metric.label}: ${metric.detail}`,
      ),
      `- Stack: ${item.stack.join(', ')}`,
    ].join('\n'),
  );

  const body = [
    `# ${profile.fullName}`,
    '',
    `> ${en.meta.description}`,
    '',
    `Also known as: ${profile.alternateNames.join(', ')}. Based in ${profile.location.locality}, Colombia.`,
    '',
    '## About',
    '',
    strip(en.manifesto.text),
    '',
    '## What I build',
    '',
    'Available for freelance projects and job opportunities. Works remotely with clients in Latin America and the US (GMT-5). Spanish (native) and English. No fixed prices: each project gets a written estimate after a first call.',
    '',
    ...services.map(
      (entry) =>
        `- [${entry.data.heading}](${home(routePath('en', serviceKey(entry.id)))}): ${entry.data.description}`,
    ),
    // El correo no se publica completo (ver Contact): se enlaza la sección de contacto.
    `- [Contact](${home('/en/#contact')})`,
    '',
    '## Experience',
    '',
    experience.join('\n\n'),
    '',
    '## Education',
    '',
    ...en.story.education.map((entry) => `- ${entry.title}, ${entry.place} (${entry.period})`),
    '',
    '## Skills',
    '',
    profile.knowsAbout.join(', '),
    '',
    '## Links',
    '',
    `- [Portfolio (English)](${home('/en/')})`,
    `- [Portafolio (Español)](${home('/es/')})`,
    `- [LinkedIn](${profile.linkedin})`,
    `- [GitHub](${profile.github})`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
