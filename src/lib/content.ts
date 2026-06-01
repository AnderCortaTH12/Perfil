import { getCollection } from 'astro:content';
import type { Lang, Section } from '../i18n/ui';

/**
 * Devuelve los elementos de una colección filtrados por idioma y ordenados
 * (los que tienen `fecha`, de más reciente a más antiguo; `destacado` primero).
 */
export async function getItems(name: Section, lang: Lang) {
  const all = await getCollection(name as Parameters<typeof getCollection>[0]);
  const items = all.filter((e) => (e.data as { idioma: Lang }).idioma === lang);

  items.sort((a, b) => {
    const da = (a.data as { destacado?: boolean }).destacado ? 1 : 0;
    const db = (b.data as { destacado?: boolean }).destacado ? 1 : 0;
    if (da !== db) return db - da;
    const fa = (a.data as { fecha?: Date }).fecha?.getTime() ?? 0;
    const fb = (b.data as { fecha?: Date }).fecha?.getTime() ?? 0;
    return fb - fa;
  });

  return items;
}

/** Formatea una fecha según el idioma. */
export function formatDate(date: Date | undefined, lang: Lang): string {
  if (!date) return '';
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
