// @ts-check
import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import basicSsl from '@vitejs/plugin-basic-ssl';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN || '',
      apiOptions: { region: 'eu' },
      bridge: true,
    }),
  ],
  vite: {
    plugins: [basicSsl()],
  },
  adapter: netlify(),
  output: 'server',
});
