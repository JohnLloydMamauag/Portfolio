import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://johnlloydmamauag.com',
  trailingSlash: 'ignore',
  integrations: [sitemap(), react()],
  vite: { plugins: [tailwindcss()] },
  // Dev-only overlay; it never ships in a build, but it gets in the way locally.
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
