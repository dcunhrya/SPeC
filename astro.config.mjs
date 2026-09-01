import { defineConfig } from 'astro/config';
import { site } from './src/content/site.ts';

export default defineConfig({
  site: site.baseUrl,
  output: 'static',
  compressHTML: true,
});
