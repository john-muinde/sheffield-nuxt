export default defineNuxtConfig({
  modules: [
    ['@pinia/nuxt', { disableVuex: true, autoImports: ['defineStore', 'acceptHMRUpdate'] }],
    'vue3-carousel-nuxt',
    '@nuxt/image',
  ],
  imports: {
    dirs: [
      'stores'
    ]
  },
  ignore: [
    'backend/**'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // These will be accessible as process.env.API_URL and process.env.BASE_URL
    API_URL: process.env.API_URL || "http://127.0.0.1:8000",
    public: {
      API_URL: process.env.API_URL || "http://127.0.0.1:8000",
    }
  },
  nitro: {
    dev: process.env.NODE_ENV !== 'production',
    prerender: {
      crawlLinks: true,
      failOnError: false,
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})