import type { APIRoute } from 'astro';
import { profile } from '@/config/profile';
import en from '@/i18n/dictionaries/en';

// llms.txt (https://llmstxt.org): resumen en texto plano para asistentes y buscadores de IA
// (ChatGPT, Perplexity, Claude...). Se genera desde los mismos datos del sitio.
export const GET: APIRoute = ({ site }) => {
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
