import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://johnlloydmamauag.com',
  trailingSlash: 'ignore',
  // /thanks is a post-submit page, not something to surface in search.
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks') }), react()],
  vite: { plugins: [tailwindcss()] },
  // Dev-only overlay; it never ships in a build, but it gets in the way locally.
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
