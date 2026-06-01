import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada elemento son dos archivos (.es.md / .en.md) que comparten `slug`.
// El loader glob recoge ambos; el campo `idioma` distingue la versión.
const idioma = z.enum(['es', 'en']);

// El id por defecto del glob loader colapsaría "x.es.md" y "x.en.md" en el
// mismo id ("x"), haciendo que una versión sobrescriba a la otra. Conservamos
// el sufijo de idioma en el id para que cada archivo sea único.
const sectionLoader = (folder: string) =>
  glob({
    pattern: '**/*.{es,en}.md',
    base: `./src/content/${folder}`,
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  });

const proyectosIa = defineCollection({
  loader: sectionLoader('proyectos-ia'),
  schema: z.object({
    slug: z.string(),
    idioma,
    titulo: z.string(),
    fecha: z.date(),
    resumen: z.string(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().or(z.literal('')).optional(),
    demo: z.string().url().or(z.literal('')).optional(),
    destacado: z.boolean().default(false),
    diagrama: z.string(),
  }),
});

const github = defineCollection({
  loader: sectionLoader('github'),
  schema: z.object({
    slug: z.string(),
    idioma,
    titulo: z.string(),
    descripcion: z.string(),
    repo: z.string().url().or(z.literal('')),
    lenguaje: z.string(),
    tags: z.array(z.string()).default([]),
    destacado: z.boolean().default(false),
  }),
});

const papers = defineCollection({
  loader: sectionLoader('papers'),
  schema: z.object({
    slug: z.string(),
    idioma,
    titulo: z.string(),
    fecha: z.date(),
    abstract: z.string(),
    autores: z.array(z.string()).default([]),
    publicacion: z.string().optional(),
    pdf: z.string(),
    enlace: z.string().optional(),
  }),
});

const divulgacion = defineCollection({
  loader: sectionLoader('divulgacion'),
  schema: z.object({
    slug: z.string(),
    idioma,
    titulo: z.string(),
    fecha: z.date(),
    resumen: z.string(),
    tags: z.array(z.string()).default([]),
    imagen: z.string().optional(),
  }),
});

const prompts = defineCollection({
  loader: sectionLoader('prompts'),
  schema: z.object({
    slug: z.string(),
    idioma,
    titulo: z.string(),
    categoria: z.string(),
    descripcion: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

const certificaciones = defineCollection({
  loader: sectionLoader('certificaciones'),
  schema: z.object({
    slug: z.string(),
    idioma,
    titulo: z.string(),
    emisor: z.string(),
    fecha: z.date(),
    logo: z.string().optional(),
    enlace_verificacion: z.string().optional(),
    credencial_id: z.string().optional(),
  }),
});

export const collections = {
  'proyectos-ia': proyectosIa,
  github,
  papers,
  divulgacion,
  prompts,
  certificaciones,
};
