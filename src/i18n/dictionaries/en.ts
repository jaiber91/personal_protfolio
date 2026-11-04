import type { Dictionary } from './es';

const en: Dictionary = {
  meta: {
    title: 'Jaiber Flor | Full Stack Developer · Mobile & Web Apps',
    description:
      'Jaiber Leonardo Flor, a Full Stack developer in Colombia with 5+ years of experience. Mobile apps, web apps and landing pages, working remotely.',
    ogImageAlt: 'A board of yellow discs spelling Jaiber Flor, with the role Full Stack Developer.',
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
    services: 'What I build',
    contact: 'Contact',
  },
  hud: {
    location: 'Jamundí (Cali), Colombia',
    coordinates: '3°15′N 76°32′W',
    localTime: 'Local time',
    status: 'Available for projects',
    hire: "Let's talk",
  },
  loader: {
    log: [
      'booting jaiber.flor',
      'flutter build ios android web',
      'nestjs api ··· ok',
      'angular ··· ok',
      'calibrating board',
      'now boarding',
    ],
  },
  hero: {
    eyebrow: 'Full Stack Developer',
    title: 'Jaiber Flor',
    lead: "I build mobile apps, web apps and landing pages with Flutter, Angular and NestJS. I've worked in banking, startups and education.",
    primaryCta: 'See my journey',
    secondaryCta: "Let's talk about your project",
    scrollHint: 'Scroll',
    // "HIGH" in English sounds like the Spanish "JAI" (the J is never pronounced like "Jack").
    pronunciation: {
      label: 'Pronounced',
      name: 'Jaiber',
      phonetic: '/HIGH-ber/',
      spoken: 'Pronounced HIGH-ber.',
    },
  },
  manifesto: {
    eyebrow: '00 — Manifesto',
    text: 'I taught *over 1,000 people* to use technology before I started building it. Today I build mobile and web apps for *thousands of users* in environments where *quality matters*, like banking and startups. I take care of *every stage*: I test what I write and automate releases.',
  },
  platforms: {
    eyebrow: '01 — Platforms',
    title: 'Mobile, tablet and web',
    steps: [
      {
        label: 'Mobile',
        description:
          'Flutter apps for iOS and Android, split into modules and tested so they can grow without breaking.',
        route: 'mobile-apps',
        link: 'How I build mobile apps',
      },
      {
        label: 'Tablet',
        description:
          'The same Flutter app rearranges its interface for large screens, with navigation and columns designed for tablets.',
      },
      {
        label: 'Web',
        description:
          'Angular portals and NestJS APIs built for thousands of users connected in real time.',
        route: 'web-apps',
        link: 'How I build web apps',
      },
    ],
  },
  story: {
    eyebrow: '02 — Journey',
    title: 'My journey',
    metricsLabel: 'Results',
    stackLabel: 'Stack',
    board: {
      title: 'Departures',
      subtitle: 'Salidas',
      columns: { period: 'Period', company: 'Destination', role: 'Flight', status: 'Status' },
      status: { current: 'In flight', done: 'Landed' },
      details: 'Details',
      close: 'Close',
      hint: 'Tap a flight to see its details',
    },
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
            label: 'people work with the module architecture I designed',
            detail:
              'The app is split into independent modules. I designed how they connect and navigate between each other, and that solution became the standard every team on the project uses in their packages.',
          },
          {
            value: 80,
            suffix: '%+',
            label: 'unit test coverage',
            detail:
              'I write tests for the packages every team shares, so each release ships stable in a regulated banking environment.',
          },
          {
            value: 1000,
            suffix: '+',
            label: "downloads of the bank's app",
            detail:
              "I build features for the bank's app, which runs on iOS, Android, web and tablet from a single Flutter codebase. I now also build internal tools for the company.",
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
            label: 'attendees connected at once',
            detail:
              'At a startup building technology for HOAs and condo associations, I helped build its virtual and hybrid assembly platform in Angular. It includes live video, real-time quorum and voting for sessions of 300 to 2,000 attendees.',
          },
          {
            value: 10,
            from: 60,
            suffix: ' min',
            label: 'per release (down from 60+)',
            detail:
              'Automated Flutter app releases with Fastlane (CI/CD). Each release went from over an hour to 10 minutes, and the team got back 15+ hours a month without paying for external services.',
          },
          {
            value: 8000,
            suffix: '+',
            label: 'mobile app downloads',
            detail:
              'Built new features for the Flutter app on Google Play and the App Store, and the REST APIs behind it with NestJS, MongoDB and PostgreSQL.',
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
              'In the education sector, I ran online workshops on digital tools for teachers, content creators and students nationwide.',
          },
          {
            value: 100,
            suffix: '+',
            label: 'programming and robotics workshops',
            detail:
              'Designed workshops so children and teens could take their first steps in programming and robotics, with my own teaching guides.',
          },
          {
            value: 10,
            suffix: '+',
            label: 'websites and landing pages',
            detail:
              'Built sites with WordPress, Wix, JavaScript, HTML and CSS for teachers and small businesses.',
          },
        ],
        stack: ['JavaScript', 'HTML', 'CSS', 'WordPress', 'Wix'],
      },
    ],
    educationTitle: 'Layovers · Education',
    education: [
      {
        period: 'In progress',
        title: 'Systems Engineering',
        place: 'Universidad Internacional de La Rioja',
      },
      { period: '2021', title: 'Full Stack Developer Bootcamp', place: 'Prográmate by Simplon' },
      { period: '2020', title: 'Frontend Developer Master', place: 'Platzi' },
      { period: '2019', title: 'Multimedia Production Technology', place: 'SENA' },
      {
        period: '2018',
        title: "Bachelor's Degree in History Education",
        place: 'Universidad del Valle',
      },
    ],
  },
  projects: {
    eyebrow: '03 — Projects',
    title: 'Selected work',
    pass: 'Boarding pass',
    gateLabel: 'Gate',
    gates: { phone: 'Mobile', tablet: 'Tablet', web: 'Web' },
    yearLabel: 'Year',
    empty: 'Projects coming soon.',
    stackLabel: 'Stack',
    roleLabel: 'Role',
    viewLabel: 'View project',
  },
  services: {
    eyebrow: '04 — What I build',
    title: 'What I build',
    lead: 'Projects I build end to end for companies, founders and teams across Latin America and the US.',
    more: 'See details',
  },
  contact: {
    eyebrow: '05 — Contact',
    title: "Let's talk",
    lead: "Have a project, an idea or a role to fill? Write to me and I'll reply within 24 hours. I work remotely with teams across Latin America and the US.",
    copyEmail: 'Copy email',
    emailCopied: 'Email copied!',
    qrLabel: 'Scan → LinkedIn',
  },
  service: {
    breadcrumbHome: 'Home',
    breadcrumbLabel: 'Breadcrumb',
    audienceTitle: 'Who it is for',
    includesTitle: "What's included",
    processTitle: 'How I work',
    estimateTitle: 'How cost is estimated',
    faqTitle: 'Frequently asked questions',
    ctaTitle: 'Have a project in mind?',
    ctaText: "Tell me the idea and I'll reply within 24 hours with the next steps.",
    ctaButton: "Let's talk about your project",
  },
  notFound: {
    title: 'Flight cancelled | Jaiber Flor',
    code: '404',
    destination: 'Unknown destination',
    status: 'Cancelled',
    heading: 'Flight cancelled',
    text: 'The page you are looking for does not exist or changed gates.',
    cta: 'Back to home',
  },
  footer: {
    backToTop: 'Back to top',
  },
};

export default en;
