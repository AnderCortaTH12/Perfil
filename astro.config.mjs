// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Despliegue en GitHub Pages bajo https://AnderCortaTH12.github.io/Perfil
  site: 'https://AnderCortaTH12.github.io',
  base: '/Perfil',
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    allowDangerousHtml: true,
  },
  vite: {
    plugins: [tailwindcss()]
  }
});