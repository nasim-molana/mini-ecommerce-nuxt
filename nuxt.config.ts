// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // Server-only absolute URL, used by server routes (server/api/*) to call Directus
    directusUrl: 'https://directus-stage.fiachehr.ir',
    public: {
      // Browser-facing base for Directus calls; goes through the dev/prod proxy below
      apiBase: '/directus',
    },
  },

  nitro: {
    routeRules: {
      '/directus/**': {
        proxy: 'https://directus-stage.fiachehr.ir/**',
      },
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt',
  ],
  pages: true,
  vite: {
    build: {
      rollupOptions: {
        external: ['url', 'path', 'source-map-js'],
      },
    },
    optimizeDeps: {
      exclude: ['url', 'path', 'source-map-js', 'source-map'],
    },
  },
})
