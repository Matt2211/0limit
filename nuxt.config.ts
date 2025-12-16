import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  components: {
    dirs: ['~/components', '~/components/sections'],
  },

  modules: ['lenis/nuxt', '@nuxtjs/seo'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Lisa Marini CBT',
    description: 'Lisa Marini CBT',
    defaultLocale: 'en',
  },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
})
