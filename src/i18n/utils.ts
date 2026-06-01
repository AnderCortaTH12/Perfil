import { defaultLang, type Lang } from './ui';

// BASE_URL siempre acaba en "/" (p. ej. "/Perfil/" o "/" en dev sin base).
const BASE = import.meta.env.BASE_URL;
const BASE_NO_SLASH = BASE.replace(/\/$/, ''); // "/Perfil" o ""

/** Antepone el `base` del sitio a una ruta absoluta interna. */
export function withBase(path: string): string {
  if (!path) return BASE;
  // Rutas externas o anclas no se tocan.
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const clean = '/' + path.replace(/^\/+/, '');
  return clean === '/' ? BASE_NO_SLASH + '/' : BASE_NO_SLASH + clean;
}

/** Quita el `base` del inicio de un pathname (para razonar sobre la ruta). */
function stripBase(pathname: string): string {
  if (BASE_NO_SLASH && pathname.startsWith(BASE_NO_SLASH)) {
    return pathname.slice(BASE_NO_SLASH.length) || '/';
  }
  return pathname;
}

/** Deduce el idioma a partir de la URL (el español vive en la raíz). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = stripBase(url.pathname).split('/');
  if (seg === 'en') return 'en';
  return defaultLang;
}

/**
 * Construye una ruta localizada YA con el `base` del sitio. El idioma por
 * defecto (es) vive en la raíz; el inglés se prefija con /en.
 *   localizedPath('/papers', 'es') -> '/Perfil/papers'
 *   localizedPath('/papers', 'en') -> '/Perfil/en/papers'
 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');
  const tail = clean === '/' ? '' : clean;
  const localePath = lang === defaultLang ? tail || '/' : `/en${tail}`;
  return withBase(localePath);
}

/**
 * Dada la URL actual, devuelve la ruta equivalente en el otro idioma,
 * preservando el resto del path (para el conmutador de idioma).
 */
export function alternateLangPath(url: URL): { lang: Lang; path: string } {
  const lang = getLangFromUrl(url);
  const other: Lang = lang === 'es' ? 'en' : 'es';
  let rest = stripBase(url.pathname);
  if (lang === 'en') {
    rest = rest.replace(/^\/en/, '') || '/';
  }
  return { lang: other, path: localizedPath(rest, other) };
}
