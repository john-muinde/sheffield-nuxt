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
  },
  generate: {
    //@ts-ignore
    fallback: '404.html',
    crawler: false, // Disable automatic route discovery
  },
  nitro: {
    preset: 'node-server',
    publicAssets: [
      {
        baseURL: '/backend',
        dir: './backend'
      }
    ],
    server: {
      host: '127.0.0.1',
      port: process.env.PORT || 3000
    },
    output: {
      //@ts-ignore
      clean: false,
      format: 'cjs'
    },
    prerender: {
      failOnError: false,
      //@ts-ignore
      ignorePaths: ['/api/**']
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    API_URL: process.env.API_URL || "https://sheffieldafrica.com",
    public: {
      API_URL: process.env.API_URL || "https://sheffieldafrica.com",
      PUBLIC_URL: process.env.PUBLIC_URL || "https://dev.sheffieldafrica.com"
    }
  },
  // hooks: {
  //   async 'nitro:config'(nitroConfig) {
  //     if (process.env.NODE_ENV === 'production') {
  //       const routes = await generator.generateAllRoutes();

  //       nitroConfig.prerender = nitroConfig.prerender || {};
  //       //@ts-ignore
  //       nitroConfig.prerender.enabled = false;
  //       nitroConfig.prerender.failOnError = false;
  //       //@ts-ignore
  //       nitroConfig.prerender.ignorePaths = ['/api/**'];
  //       nitroConfig.prerender.routes = [
  //         '/',
  //         ...routes
  //       ];
  //     }
  //   }
  // },
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
  routeRules: {
    '/kitchen': { redirect: 'commercial-kitchen' },
    '/kitchen/**': { redirect: '/commercial-kitchen/**' },
  },
})