// Cadenas de interfaz (no contenido) en los dos idiomas del sitio.
// El contenido vive en src/content/. Aquí solo viven etiquetas de UI.

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es';
export type Lang = keyof typeof languages;

// Las 6 secciones de contenido. La clave coincide con la carpeta de
// src/content/ y con el segmento de URL.
export const sections = [
  'proyectos-ia',
  'github',
  'divulgacion',
  'prompts',
  'certificaciones',
] as const;
export type Section = (typeof sections)[number];

export const ui = {
  es: {
    'site.name': 'Mi perfil',
    'site.role': 'Economía · IA · Investigación',
    'site.tagline':
      'Proyectos de IA, papers, repositorios y divulgación. Un espacio para mostrar en qué trabajo.',

    'nav.home': 'Inicio',
    'nav.skip': 'Saltar al contenido',

    'lang.switch': 'English',
    'lang.label': 'Idioma',

    'section.proyectos-ia': 'Proyectos de IA',
    'section.github': 'GitHub',
    'section.divulgacion': 'Divulgación',
    'section.prompts': 'Prompts',
    'section.certificaciones': 'Certificaciones',

    'desc.proyectos-ia': 'Sistemas y agentes de IA, con su diagrama de flujo.',
    'desc.github': 'Repositorios destacados y código abierto.',
    'desc.divulgacion': 'Artículos de divulgación y opinión.',
    'desc.prompts': 'Prompts útiles, listos para copiar.',
    'desc.certificaciones': 'Formación y credenciales.',

    'home.explore': 'Explora',
    'home.latest': 'Novedades',
    'home.latest.desc': 'Lo último que he publicado, en todas las secciones.',
    'carousel.prev': 'Anterior',
    'carousel.next': 'Siguiente',
    'top.title': 'Lo más valorado',
    'boost.label': 'Dar boost',
    'boost.title': 'Dale boost si te gusta',
    'list.empty': 'Aún no hay contenido en esta sección.',
    'list.back': '← Volver',
    'card.featured': 'Destacado',
    'card.new': 'Nuevo',
    'meta.stack': 'Stack',
    'meta.repo': 'Repositorio',
    'meta.demo': 'Demo',
    'meta.authors': 'Autores',
    'meta.publication': 'Publicación',
    'meta.pdf': 'Ver PDF',
    'meta.link': 'Enlace',
    'meta.issuer': 'Emisor',
    'meta.verify': 'Verificar',
    'meta.credential': 'Credencial',
    'meta.language': 'Lenguaje',
    'meta.lenguaje': 'Lenguaje',
    'meta.category': 'Categoría',
    'meta.tags': 'Etiquetas',
    'meta.diagram': 'Diagrama de flujo',
    'meta.try': 'Pruébalo',
    'prompt.copy': 'Copiar',
    'prompt.copied': '¡Copiado!',
    'footer.built': 'Hecho con Astro · contenido en español e inglés',

    'meff.label': 'ANÁLISIS DIARIO · MEFF',
    'meff.movements': 'Movimientos destacados',
    'meff.cta': 'Ver análisis completo →',
    'meff.ai_generated': 'Generado automáticamente por IA',
    'meff.cost': 'Coste de ejecución:',
    'meff.placeholder': 'Análisis diario activado. Primer informe disponible mañana al cierre del mercado.',
    'meff.latest_summary': 'Último resumen MEFF',
    'meff.prev_summaries': 'Resúmenes anteriores',
  },
  en: {
    'site.name': 'My profile',
    'site.role': 'Economics · AI · Research',
    'site.tagline':
      'AI projects, papers, repositories and writing. A space to show what I work on.',

    'nav.home': 'Home',
    'nav.skip': 'Skip to content',

    'lang.switch': 'Español',
    'lang.label': 'Language',

    'section.proyectos-ia': 'AI Projects',
    'section.github': 'GitHub',
    'section.divulgacion': 'Writing',
    'section.prompts': 'Prompts',
    'section.certificaciones': 'Certifications',

    'desc.proyectos-ia': 'AI systems and agents, each with its flow diagram.',
    'desc.github': 'Featured repositories and open source.',
    'desc.divulgacion': 'Essays and opinion pieces.',
    'desc.prompts': 'Useful prompts, ready to copy.',
    'desc.certificaciones': 'Training and credentials.',

    'home.explore': 'Explore',
    'home.latest': 'Latest',
    'home.latest.desc': 'My most recent posts, across all sections.',
    'carousel.prev': 'Previous',
    'carousel.next': 'Next',
    'top.title': 'Most boosted',
    'boost.label': 'Boost',
    'boost.title': 'Boost it if you like it',
    'list.empty': 'No content in this section yet.',
    'list.back': '← Back',
    'card.featured': 'Featured',
    'card.new': 'New',
    'meta.stack': 'Stack',
    'meta.repo': 'Repository',
    'meta.demo': 'Demo',
    'meta.authors': 'Authors',
    'meta.publication': 'Published in',
    'meta.pdf': 'View PDF',
    'meta.link': 'Link',
    'meta.issuer': 'Issuer',
    'meta.verify': 'Verify',
    'meta.credential': 'Credential',
    'meta.language': 'Language',
    'meta.lenguaje': 'Language',
    'meta.category': 'Category',
    'meta.tags': 'Tags',
    'meta.diagram': 'Flow diagram',
    'meta.try': 'Try it',
    'prompt.copy': 'Copy',
    'prompt.copied': 'Copied!',
    'footer.built': 'Built with Astro · content in Spanish and English',

    'meff.label': 'DAILY ANALYSIS · MEFF',
    'meff.movements': 'Key movements',
    'meff.cta': 'See full analysis →',
    'meff.ai_generated': 'Automatically generated by AI',
    'meff.cost': 'Execution cost:',
    'meff.placeholder': 'Daily analysis activated. First report available tomorrow at market close.',
    'meff.latest_summary': 'Latest MEFF summary',
    'meff.prev_summaries': 'Previous summaries',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];

/** Devuelve una función de traducción para el idioma dado. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
