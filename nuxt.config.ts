import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['lenis/nuxt', '@nuxtjs/seo'],

  site: {
    url: 'https://studio3266.com',
    name: 'STUDIO3266',
    description: 'A curated hair experience set in a private studio space',
    defaultLocale: 'en',
  },

  css: ['./app/assets/css/main.css', './app/assets/css/jet-brains-mono.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      titleTemplate: '%s | STUDIO3266',
      meta: [
        {
          name: 'description',
          content: 'A curated hair experience set in a private studio space',
        },
      ],
    },
  },
})
