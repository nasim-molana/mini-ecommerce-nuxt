// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'https://directus-stage.fiachehr.ir',
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],
  pages: true,
  vite: {
    build: {
      rollupOptions: {
        external: ['url', 'path', 'source-map-js']
      }
    },
    optimizeDeps: {
      exclude: ['url', 'path', 'source-map-js', 'source-map']
    }
  },
})
