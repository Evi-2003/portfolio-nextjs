import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://eviwammes.amsterdam',
  integrations: [tailwind(),     robotsTxt({
    host: 'eviwammes.amsterdam',
    policy: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/projecten',
      },
    ]
  }),],
  output: "hybrid",
  adapter: cloudflare(),
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

});