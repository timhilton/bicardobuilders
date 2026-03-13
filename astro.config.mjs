// @ts-check
import { defineConfig } from 'astro/config';
import { storyblok } from '@storyblok/astro';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN || '',
      apiOptions: { region: 'eu' },
      bridge: true,
    }),
  ],
  vite: {
    plugins: [basicSsl()],
  },
});
