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

/** Elemento normalizado para el feed/carrusel de portada (cruza secciones). */
export type FeedItem = {
  section: Section;
  slug: string;
  titulo: string;
  fecha?: Date;
  resumen: string;
  destacado: boolean;
};

/**
 * Devuelve los `limit` elementos más recientes combinando varias secciones,
 * ordenados por fecha descendente con los `destacado` siempre primero.
 */
export async function getFeed(lang: Lang, limit = 6): Promise<FeedItem[]> {
  const secciones: Section[] = ['proyectos-ia', 'divulgacion', 'papers', 'certificaciones'];
  const all: FeedItem[] = [];

  for (const section of secciones) {
    const items = await getItems(section, lang);
    for (const e of items) {
      const d = e.data as {
        slug: string;
        titulo: string;
        fecha?: Date;
        resumen?: string;
        abstract?: string;
        emisor?: string;
        destacado?: boolean;
      };
      all.push({
        section,
        slug: d.slug,
        titulo: d.titulo,
        fecha: d.fecha,
        resumen: d.resumen ?? d.abstract ?? d.emisor ?? '',
        destacado: Boolean(d.destacado),
      });
    }
  }

  all.sort((a, b) => {
    const da = a.destacado ? 1 : 0;
    const db = b.destacado ? 1 : 0;
    if (da !== db) return db - da;
    return (b.fecha?.getTime() ?? 0) - (a.fecha?.getTime() ?? 0);
  });

  return all.slice(0, limit);
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
