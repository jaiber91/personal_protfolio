// Diccionario base: define la forma (tipo) que deben cumplir los demás idiomas.
const es = {
  meta: {
    title: 'Jaiber Flor — Full Stack & Mobile Developer',
    description:
      'Portafolio de Jaiber Flor, desarrollador Full Stack y Mobile en Colombia. Flutter, Angular, NestJS y TypeScript.',
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
  hud: {
    location: 'Jamundí, Colombia',
    coordinates: '3°15′N 76°32′W',
    localTime: 'Hora local',
    status: 'Disponible para proyectos',
    hire: 'Hablemos',
  },
  loader: {
    log: [
      'iniciando jaiber.flor',
      'flutter build ios android web',
      'nestjs api ··· ok',
      'angular ··· ok',
      'calibrando partículas',
      'señal estable',
    ],
  },
  hero: {
    eyebrow: 'Full Stack & Mobile Developer',
    title: 'Jaiber Flor',
    lead: 'Construyo productos digitales para móvil, tablet y web: de la arquitectura al último píxel.',
    primaryCta: 'Ver proyectos',
    secondaryCta: 'Hablemos',
    scrollHint: 'Desliza',
  },
  manifesto: {
    eyebrow: '00 — Manifiesto',
    // Las palabras entre *asteriscos* se resaltan con el color de la señal.
    text: 'Antes de escribir código enseñé a *más de mil personas* a usar la tecnología. Hoy diseño la arquitectura de apps que usan *miles*: banca, asambleas virtuales y herramientas que tienen que funcionar en *cualquier pantalla*. Me importa lo que no se ve —pruebas, despliegues, rendimiento— tanto como el *último píxel*.',
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
    board: {
      title: 'Salidas',
      subtitle: 'Departures',
      columns: { period: 'Periodo', company: 'Destino', role: 'Vuelo', status: 'Estado' },
      status: { current: 'En curso', done: 'Completado' },
      details: 'Detalles',
      close: 'Cerrar',
      hint: 'Toca un vuelo para ver sus detalles',
    },
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
            label: 'personas en el mismo proyecto bancario',
            detail:
              'La app está dividida en módulos independientes. Diseñé cómo se conectan y navegan entre sí, y esa solución se volvió el estándar que todos los equipos del proyecto usan en sus paquetes.',
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
              'Desarrollo funcionalidades de la app del banco, que corre en iOS, Android, web y tablet con un solo código en Flutter. Ahora también construyo herramientas internas para la empresa.',
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
            label: 'asistentes conectados a la vez',
            detail:
              'Participé en el desarrollo en Angular de una plataforma de asambleas virtuales e híbridas para copropiedades: video en vivo, quórum y votaciones en tiempo real, con sesiones de 300 a 2.000 asistentes.',
          },
          {
            value: 10,
            from: 60,
            suffix: ' min',
            label: 'por despliegue (antes, más de 60)',
            detail:
              'Automaticé la publicación de las apps Flutter con Fastlane (CI/CD): de más de una hora a 10 minutos por despliegue, más de 15 horas ahorradas al mes y sin costos de servicios externos.',
          },
          {
            value: 8000,
            suffix: '+',
            label: 'descargas de la app móvil',
            detail:
              'Nuevas funcionalidades para la app en Flutter publicada en Google Play y App Store, y las APIs REST que la sostienen con NestJS, MongoDB y PostgreSQL.',
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
    educationTitle: 'Escalas · Formación',
    education: [
      {
        period: 'En curso',
        title: 'Ingeniería de Sistemas',
        place: 'Universidad Internacional de La Rioja',
      },
      { period: '2018', title: 'Licenciatura en Historia', place: 'Universidad del Valle' },
      { period: '2021', title: 'Full Stack Developer', place: 'Prográmate by Simplon' },
      { period: '2020', title: 'Frontend Developer Master', place: 'Platzi' },
      { period: '2019', title: 'Tecnología en Producción Multimedia', place: 'SENA' },
    ],
  },
  projects: {
    eyebrow: '03 — Proyectos',
    title: 'Trabajo seleccionado',
    pass: 'Pase de abordar',
    gateLabel: 'Puerta',
    yearLabel: 'Año',
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
    qrLabel: 'Escanea → LinkedIn',
  },
  footer: {
    builtWith: 'Hecho con Astro, Three.js y GSAP',
    backToTop: 'Volver arriba',
  },
};

export type Dictionary = typeof es;
export default es;
