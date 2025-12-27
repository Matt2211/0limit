import tailwindcss from '@tailwindcss/vite'

// Base URL handling
// - Dev (default): "/" (avoids Nuxt dev + router + SW issues)
// - Prod subfolder deploy: set env `NUXT_APP_BASE_URL=/phoenix/` at build time
const RAW_BASE = process.env.NUXT_APP_BASE_URL
const BASE_URL = RAW_BASE
  ? RAW_BASE.endsWith('/')
    ? RAW_BASE
    : `${RAW_BASE}/`
  : '/'

const withBase = (p: string) => `${BASE_URL}${String(p).replace(/^\//, '')}`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  // ✅ Modules
  modules: ['lenis/nuxt', '@nuxtjs/seo', '@vite-pwa/nuxt'],

  site: {
    // IMPORTANT: this is your real domain WITHOUT the subfolder
    // (the subfolder is handled by app.baseURL)
    url: 'https://matteofelicidesign.com',
    name: 'phoenix',
    description: 'to add',
    defaultLocale: 'en',
  },

  // ✅ Prevent @nuxt/robots from trying to generate robots.txt with a baseURL
  // (you can add a manual robots.txt later if needed)
  robots: {
    robotsTxt: false,
  },

  css: ['./app/assets/css/main.css', './app/assets/css/jet-brains-mono.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // ✅ App hosted under a subfolder (e.g. https://matteofelicidesign.com/phoenix)
  // In dev we keep it "/" unless you explicitly set NUXT_APP_BASE_URL.
  app: {
    baseURL: BASE_URL,

    head: {
      titleTemplate: '%s | phoenix',

      link: [
        // iOS “Add to Home Screen” icon
        { rel: 'apple-touch-icon', href: withBase('apple-touch-icon.png') },

        // Favicons
        { rel: 'icon', href: withBase('favicon.ico'), type: 'image/x-icon' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: withBase('favicon-32x32.png'),
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: withBase('favicon-16x16.png'),
        },
      ],

      meta: [
        { name: 'description', content: 'to add' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
    },
  },

  // ✅ PWA manifest + service worker
  pwa: {
    registerType: 'autoUpdate',

    // Disable SW in dev to avoid:
    // - /workbox-*.js router warnings
    // - dev overlay issues
    // You’ll still have SW in production builds.
    devOptions: {
      enabled: false,
    },

    manifest: {
      id: BASE_URL,
      name: 'Phoenix',
      short_name: 'Phoenix',
      start_url: BASE_URL,
      scope: BASE_URL,
      display: 'standalone',
      theme_color: '#0a0a0a',
      background_color: '#0a0a0a',
      icons: [
        {
          src: withBase('android-chrome-192x192.png'),
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: withBase('android-chrome-512x512.png'),
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
})
