// Diccionario base: define la forma (tipo) que deben cumplir los demás idiomas.
const es = {
  meta: {
    title: 'Jaiber Flor | Desarrollador Flutter y Full Stack',
    description:
      'Jaiber Leonardo Flor es desarrollador Full Stack y Mobile en Colombia, con más de 5 años en banca, startups y educación. Flutter, Angular y NestJS.',
    ogImageAlt:
      'Tablero de discos amarillos que escribe Jaiber Flor, con el rol Full Stack & Mobile Developer.',
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
      'calibrando tablero',
      'embarque abierto',
    ],
  },
  hero: {
    eyebrow: 'Full Stack & Mobile Developer',
    title: 'Jaiber Flor',
    lead: 'Desarrollo apps móviles y web para banca y startups con Flutter, Angular y NestJS, desde la arquitectura hasta la interfaz.',
    primaryCta: 'Ver trayectoria',
    secondaryCta: 'Hablemos',
    scrollHint: 'Desliza',
    // Pista de pronunciación bajo el nombre (en inglés la J se lee "Y": ver en.ts).
    pronunciation: {
      label: 'Se pronuncia',
      name: 'Jaiber',
      phonetic: '/JÁI-ber/',
      spoken: 'Se pronuncia Jáiber, con la jota de jamón.',
    },
  },
  manifesto: {
    eyebrow: '00 — Manifiesto',
    // Las palabras entre *asteriscos* se resaltan con el color de la señal.
    text: 'Enseñé a *más de 1.000 personas* a usar la tecnología antes de dedicarme a construirla. Hoy desarrollo aplicaciones para *miles de usuarios* en entornos donde *la calidad importa*: banca, startups y experiencias multiplataforma. Escribo código con propósito y cuido *cada etapa*, desde las pruebas hasta el despliegue.',
  },
  platforms: {
    eyebrow: '01 — Plataformas',
    title: 'Un código, todas las pantallas',
    steps: [
      {
        label: 'Móvil',
        description:
          'Apps en Flutter para iOS y Android, divididas en módulos y con pruebas para crecer sin romperse.',
      },
      {
        label: 'Tablet',
        description:
          'La misma app en Flutter reorganiza su interfaz para pantallas grandes, con navegación y columnas pensadas para tablet.',
      },
      {
        label: 'Web',
        description:
          'Portales en Angular y APIs en NestJS preparados para miles de usuarios conectados en tiempo real.',
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
              'Escribo pruebas para los paquetes que comparten todos los equipos, así cada versión sale estable en un entorno bancario regulado.',
          },
          {
            value: 1000,
            suffix: '+',
            label: 'descargas de la app del banco',
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
              'En una startup de tecnología para copropiedades, participé en el desarrollo en Angular de su plataforma de asambleas virtuales e híbridas. Incluye video en vivo, quórum y votaciones en tiempo real para sesiones de 300 a 2.000 asistentes.',
          },
          {
            value: 10,
            from: 60,
            suffix: ' min',
            label: 'por despliegue (antes, más de 60)',
            detail:
              'Automaticé la publicación de las apps Flutter con Fastlane (CI/CD). Cada despliegue pasó de más de una hora a 10 minutos, y el equipo recuperó más de 15 horas al mes sin pagar servicios externos.',
          },
          {
            value: 8000,
            suffix: '+',
            label: 'descargas de la app móvil',
            detail:
              'Desarrollé nuevas funcionalidades para la app en Flutter de Google Play y App Store, y las APIs REST que la sostienen con NestJS, MongoDB y PostgreSQL.',
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
              'En el sector educativo, dicté talleres en línea sobre herramientas digitales a docentes, creadores de contenido y estudiantes de todo el país.',
          },
          {
            value: 100,
            suffix: '+',
            label: 'talleres de programación y robótica',
            detail:
              'Diseñé talleres para que niños y jóvenes dieran sus primeros pasos en programación y robótica, con guías didácticas propias.',
          },
          {
            value: 10,
            suffix: '+',
            label: 'sitios web y landing pages',
            detail:
              'Construí sitios con WordPress, Wix, JavaScript, HTML y CSS para docentes y pequeños negocios.',
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
    lead: 'He llevado apps a miles de usuarios en banca y en startups, y vengo del sector educativo. Si tu próximo proyecto va por alguno de esos caminos, construyámoslo juntos.',
    copyEmail: 'Copiar correo',
    emailCopied: '¡Correo copiado!',
    qrLabel: 'Escanea → LinkedIn',
  },
  footer: {
    backToTop: 'Volver arriba',
  },
};

export type Dictionary = typeof es;
export default es;
