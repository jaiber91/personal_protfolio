// Diccionario base: define la forma (tipo) que deben cumplir los demás idiomas.
const es = {
  meta: {
    title: 'Jaiber Flor — Full Stack & Mobile Developer',
    description:
      'Portafolio de Jaiber Flor, desarrollador Full Stack y Mobile. Flutter, Angular, NestJS y TypeScript.',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    mainNav: 'Navegación principal',
    changeLanguage: 'Cambiar idioma',
    toggleTheme: 'Cambiar tema claro u oscuro',
    loading: 'Cargando',
  },
  nav: {
    platforms: 'Plataformas',
    story: 'Trayectoria',
    projects: 'Proyectos',
    contact: 'Contacto',
  },
  hero: {
    eyebrow: 'Full Stack & Mobile Developer',
    title: 'Jaiber Flor',
    lead: 'Construyo productos digitales para móvil, tablet y web: de la arquitectura al último detalle de la interfaz.',
    primaryCta: 'Ver proyectos',
    secondaryCta: 'Hablemos',
    scrollHint: 'Desliza',
  },
  platforms: {
    eyebrow: '01 — Plataformas',
    title: 'Un código, todas las pantallas',
    steps: [
      {
        label: 'Móvil',
        description: 'Apps en Flutter para iOS y Android, con arquitectura modular y pruebas.',
      },
      {
        label: 'Tablet',
        description: 'Interfaces adaptativas que aprovechan cada centímetro de pantalla.',
      },
      {
        label: 'Web',
        description: 'Aplicaciones en Angular y APIs en NestJS, listas para escalar.',
      },
    ],
  },
  story: {
    eyebrow: '02 — Trayectoria',
    title: 'Mi trayectoria',
    metricsLabel: 'Resultados',
    stackLabel: 'Stack',
    items: [
      {
        period: '2025 — Hoy',
        current: true,
        role: 'Flutter / Mobile Developer',
        company: 'Pragma',
        metrics: [
          {
            value: 300,
            suffix: '',
            label: 'personas en el programa bancario',
            detail:
              'Diseñé el routing por paquetes de una arquitectura Flutter modular: un equipo de 10 personas desarrolla en paralelo sin retrabajo.',
          },
          {
            value: 80,
            suffix: '%+',
            label: 'cobertura de pruebas unitarias',
            detail:
              'En paquetes reutilizables, para mantener builds estables en un entorno bancario regulado.',
          },
          {
            value: 1000,
            suffix: '+',
            label: 'descargas en iOS, Android, web y tablet',
            detail:
              'Funcionalidades multiplataforma para la app bancaria y, después, herramientas internas para la empresa.',
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
            label: 'usuarios concurrentes',
            detail:
              'Integré Zoom SDK en el portal de asambleas virtuales en Angular: de 300 a 2.000 asistentes por sesión.',
          },
          {
            value: 10,
            from: 60,
            suffix: ' min',
            label: 'por despliegue (antes 60+)',
            detail:
              'Automaticé los despliegues de Flutter con Fastlane: más de 15 horas ahorradas al mes y sin pagar CodeMagic.',
          },
          {
            value: 8000,
            suffix: '+',
            label: 'descargas de la app móvil',
            detail:
              'Nuevas funcionalidades en Flutter para Google Play y App Store, y más de 10 endpoints REST con NestJS, MongoDB y PostgreSQL.',
          },
        ],
        stack: ['Angular', 'NestJS', 'Flutter', 'Fastlane', 'MongoDB', 'PostgreSQL'],
      },
      {
        period: '2018 — 2022',
        role: 'Asesor TI',
        company: 'Fundación Carvajal',
        metrics: [
          {
            value: 1000,
            suffix: '+',
            label: 'personas formadas',
            detail:
              'Talleres en línea sobre herramientas digitales para docentes, creadores de contenido y estudiantes de todo el país.',
          },
          {
            value: 100,
            suffix: '+',
            label: 'talleres de programación y robótica',
            detail:
              'Para niños y jóvenes: primeros pasos en código y STEM, con guías didácticas propias.',
          },
          {
            value: 10,
            suffix: '+',
            label: 'sitios web y landing pages',
            detail: 'Con WordPress, Wix, JavaScript, HTML y CSS para docentes y pequeños negocios.',
          },
        ],
        stack: ['JavaScript', 'HTML', 'CSS', 'WordPress', 'Wix'],
      },
    ],
    educationTitle: 'Formación',
    education: [
      {
        period: 'En curso',
        title: 'Ingeniería de Sistemas',
        place: 'Universidad Internacional de La Rioja',
      },
      { period: '2021', title: 'Full Stack Developer', place: 'Prográmate by Simplon' },
      { period: '2020', title: 'Frontend Developer Master', place: 'Platzi' },
      { period: '2019', title: 'Tecnología en Producción Multimedia', place: 'SENA' },
    ],
  },
  projects: {
    eyebrow: '03 — Proyectos',
    title: 'Trabajo seleccionado',
    empty: 'Pronto habrá proyectos aquí.',
    stackLabel: 'Stack',
    roleLabel: 'Rol',
    viewLabel: 'Ver proyecto',
  },
  contact: {
    eyebrow: '04 — Contacto',
    title: '¿Hablamos?',
    lead: 'Estoy abierto a nuevos proyectos y oportunidades.',
    copyEmail: 'Copiar correo',
    emailCopied: '¡Correo copiado!',
  },
  footer: {
    builtWith: 'Hecho con Astro y Three.js',
  },
};

export type Dictionary = typeof es;
export default es;
