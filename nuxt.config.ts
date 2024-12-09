import { generateSolutionRoutes, generateCategoryRoutes } from "./utils/functions"
import { APP_SEGMENTS } from "./utils/api"

export default defineNuxtConfig({
  
  modules: [
    ['@pinia/nuxt', { disableVuex: true, autoImports: ['defineStore', 'acceptHMRUpdate'] }],
    'pinia-plugin-persistedstate/nuxt',
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
  app: {
    head: {
      meta: [
        {
          name: 'google-site-verification',
          content: 'HTu3UM8rSXb95ng7ySUN6dIa0OTHQtzcZiJa7C9T1pk'
        }
      ]
    },
    // global transition
    // pageTransition: { name: "page", mode: "out-in" },
    // layoutTransition: { name: "layout", mode: "out-in" },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // These will be accessible as process.env.API_URL and process.env.BASE_URL
    API_URL: process.env.API_URL || "https://sheffieldafrica.com",
    public: {
      API_URL: process.env.API_URL || "https://sheffieldafrica.com",
    }
  },
  nitro: {
    dev: process.env.NODE_ENV !== 'production',
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: await (async () => {
        const [solutionRoutes, categoryRoutes] = await Promise.all([
          generateSolutionRoutes(),
          generateCategoryRoutes()
        ])

        return [
          ...solutionRoutes,
          ...categoryRoutes,
          ...APP_SEGMENTS.map(segment => `/${segment.slug}`)
        ]
      })()
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    // Try a more specific route first
    '/kitchen': { redirect: { to: '/commercial-kitchen', statusCode: 301 } },
    '/kitchen/**': { redirect: { to: '/commercial-kitchen/**', statusCode: 301 } }
  },
})
