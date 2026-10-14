// Datos del perfil profesional: una sola fuente para el contenido, los metadatos
// para compartir (Open Graph), los datos estructurados (JSON-LD) y llms.txt.

export const profile = {
  /** Nombre completo (datos estructurados). */
  fullName: 'Jaiber Leonardo Flor Navia',
  givenName: 'Jaiber Leonardo',
  familyName: 'Flor Navia',
  /** Nombre que se muestra en el sitio. */
  displayName: 'Jaiber Flor',
  /** Variantes con las que buscan a la persona (en distintos trabajos lo conocen por cada una). */
  alternateNames: ['Jaiber Flor', 'Leonardo Flor', 'Jaiber Leonardo Flor'],
  jobTitle: 'Full Stack & Mobile Developer',
  // El correo se guarda en partes: nunca se publica completo en el HTML (ver Contact).
  email: { user: 'jaiver.navia', domain: 'gmail.com' },
  linkedin: 'https://www.linkedin.com/in/jaiberflor',
  github: 'https://github.com/jaiber91',
  location: { locality: 'Jamundí', region: 'Valle del Cauca', country: 'CO' },
  knowsAbout: [
    'Flutter',
    'Dart',
    'Angular',
    'NestJS',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'PostgreSQL',
    'CI/CD',
    'Fastlane',
    'Mobile development',
    'Web development',
  ],
  alumniOf: [
    'Universidad Internacional de La Rioja',
    'Universidad del Valle',
    'Servicio Nacional de Aprendizaje (SENA)',
  ],
} as const;
