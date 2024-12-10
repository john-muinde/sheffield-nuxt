import { RouteGenerator } from "./utils/urls";
const generator = new RouteGenerator(process.env.API_BASE_URL || "https://sheffieldafrica.com");

export default defineNuxtConfig({
  site: { url: 'https://dev.sheffieldafrica.com' },
  modules: [
    ['@pinia/nuxt', { disableVuex: true, autoImports: ['defineStore', 'acceptHMRUpdate'] }],
    'pinia-plugin-persistedstate/nuxt',
    'vue3-carousel-nuxt',
    '@nuxt/image',
    '@nuxtjs/sitemap',
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
  generate: {
    //@ts-ignore
    fallback: '404.html'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // These will be accessible as process.env.API_URL and process.env.BASE_URL
    API_URL: process.env.API_URL || "https://sheffieldafrica.com",
    public: {
      API_URL: process.env.API_URL || "https://sheffieldafrica.com",
      PUBLIC_URL: process.env.PUBLIC_URL || "https://dev.sheffieldafrica.com"
    }
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (process.env.NODE_ENV === 'production') {

        const routes = await generator.generateAllRoutes();

        nitroConfig.prerender = nitroConfig.prerender || {};
        nitroConfig.prerender.failOnError = false;
        nitroConfig.prerender.routes = [
          '/',
          ...routes
        ];

        // await generator.generateSitemap(process.env.PUBLIC_URL || "https://dev.sheffieldafrica.com");
      }
    }
  },

  //@ts-ignore
  sitemap: {
    //@ts-ignore
    routes: async () => {
      return generator.generateAllRoutes();
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})