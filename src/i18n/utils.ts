import { defaultLang, type Lang } from './ui';

/** Deduce el idioma a partir de la URL (el español vive en la raíz). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'en') return 'en';
  return defaultLang;
}

/**
 * Construye una ruta localizada. El idioma por defecto (es) vive en la raíz;
 * el inglés se prefija con /en.
 *   localizedPath('/papers', 'es') -> '/papers'
 *   localizedPath('/papers', 'en') -> '/en/papers'
 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');
  const base = clean === '/' ? '' : clean;
  return lang === defaultLang ? base || '/' : `/en${base}` || '/en';
}

/**
 * Dada la URL actual, devuelve la ruta equivalente en el otro idioma,
 * preservando el resto del path (para el conmutador de idioma).
 */
export function alternateLangPath(url: URL): { lang: Lang; path: string } {
  const lang = getLangFromUrl(url);
  const other: Lang = lang === 'es' ? 'en' : 'es';
  let rest = url.pathname;
  if (lang === 'en') {
    rest = rest.replace(/^\/en/, '') || '/';
  }
  return { lang: other, path: localizedPath(rest, other) };
}
