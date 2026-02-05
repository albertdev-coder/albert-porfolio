import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import astroIcon from 'astro-icon';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://albertocisneros.dev',
  integrations: [
    mdx(),
    react(),
    astroIcon(),
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Alberto Cisneros - Full-Stack Developer',
        short_name: 'Alberto Portfolio',
        description: 'Portfolio of Alberto Cisneros Morando - Full-Stack Web Developer',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        navigateFallback: '/404',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\/$/],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['motion'],
    },
  },
});
