import type { Dictionary } from './es';

const en: Dictionary = {
  meta: {
    title: 'Jaiber Flor — Full Stack & Mobile Developer',
    description:
      'Portfolio of Jaiber Flor, Full Stack and Mobile developer. Flutter, Angular, NestJS and TypeScript.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    changeLanguage: 'Change language',
    toggleTheme: 'Toggle light or dark theme',
    loading: 'Loading',
  },
  nav: {
    platforms: 'Platforms',
    story: 'Journey',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Full Stack & Mobile Developer',
    title: 'Jaiber Flor',
    lead: 'I build digital products for mobile, tablet and web — from the architecture to the last interface detail.',
    primaryCta: 'See projects',
    secondaryCta: "Let's talk",
    scrollHint: 'Scroll',
  },
  platforms: {
    eyebrow: '01 — Platforms',
    title: 'One codebase, every screen',
    steps: [
      {
        label: 'Mobile',
        description: 'Flutter apps for iOS and Android, with modular architecture and tests.',
      },
      {
        label: 'Tablet',
        description: 'Adaptive interfaces that make the most of every inch of screen.',
      },
      {
        label: 'Web',
        description: 'Angular applications and NestJS APIs, ready to scale.',
      },
    ],
  },
  story: {
    eyebrow: '02 — Journey',
    title: 'My journey',
    metricsLabel: 'Results',
    stackLabel: 'Stack',
    items: [
      {
        period: '2025 — Now',
        current: true,
        role: 'Flutter / Mobile Developer',
        company: 'Pragma',
        metrics: [
          {
            value: 300,
            suffix: '',
            label: 'people in the banking program',
            detail:
              'Designed the package-based routing of a modular Flutter architecture: a 10-person team ships in parallel with no rework.',
          },
          {
            value: 80,
            suffix: '%+',
            label: 'unit test coverage',
            detail:
              'Across reusable packages, keeping production builds stable in a regulated banking environment.',
          },
          {
            value: 1000,
            suffix: '+',
            label: 'downloads on iOS, Android, web and tablet',
            detail:
              'Cross-platform features for the banking app and, later, internal enterprise tools.',
          },
        ],
        stack: ['Flutter', 'Dart', 'Testing', 'Scrum'],
      },
      {
        period: '2022 — 2025',
        role: 'Full Stack Developer',
        company: 'Hipal',
        metrics: [
          {
            value: 1500,
            suffix: '+',
            label: 'concurrent users',
            detail:
              'Integrated Zoom SDK into the Angular virtual assembly portal: 300 to 2,000 attendees per session.',
          },
          {
            value: 10,
            from: 60,
            suffix: ' min',
            label: 'per release (down from 60+)',
            detail:
              'Automated Flutter releases with Fastlane: 15+ hours saved monthly, no paid CodeMagic.',
          },
          {
            value: 8000,
            suffix: '+',
            label: 'mobile app downloads',
            detail:
              'New Flutter features for Google Play and the App Store, plus 10+ REST endpoints with NestJS, MongoDB and PostgreSQL.',
          },
        ],
        stack: ['Angular', 'NestJS', 'Flutter', 'Fastlane', 'MongoDB', 'PostgreSQL'],
      },
      {
        period: '2018 — 2022',
        role: 'IT Advisor',
        company: 'Fundación Carvajal',
        metrics: [
          {
            value: 1000,
            suffix: '+',
            label: 'people trained',
            detail:
              'Online workshops on digital tools for teachers, content creators and students nationwide.',
          },
          {
            value: 100,
            suffix: '+',
            label: 'programming and robotics workshops',
            detail:
              'For children and youth: first steps in code and STEM, with my own teaching guides.',
          },
          {
            value: 10,
            suffix: '+',
            label: 'websites and landing pages',
            detail:
              'Built with WordPress, Wix, JavaScript, HTML and CSS for teachers and small businesses.',
          },
        ],
        stack: ['JavaScript', 'HTML', 'CSS', 'WordPress', 'Wix'],
      },
    ],
    educationTitle: 'Education',
    education: [
      {
        period: 'In progress',
        title: 'Systems Engineering',
        place: 'Universidad Internacional de La Rioja',
      },
      { period: '2021', title: 'Full Stack Developer', place: 'Prográmate by Simplon' },
      { period: '2020', title: 'Frontend Developer Master', place: 'Platzi' },
      { period: '2019', title: 'Multimedia Production Technology', place: 'SENA' },
    ],
  },
  projects: {
    eyebrow: '03 — Projects',
    title: 'Selected work',
    empty: 'Projects coming soon.',
    stackLabel: 'Stack',
    roleLabel: 'Role',
    viewLabel: 'View project',
  },
  contact: {
    eyebrow: '04 — Contact',
    title: "Let's talk",
    lead: "I'm open to new projects and opportunities.",
    copyEmail: 'Copy email',
    emailCopied: 'Email copied!',
  },
  footer: {
    builtWith: 'Built with Astro and Three.js',
  },
};

export default en;
