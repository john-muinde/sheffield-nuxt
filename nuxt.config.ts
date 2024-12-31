import { RouteGenerator } from "./utils/urls";
const generator = new RouteGenerator(
  process.env.API_BASE_URL || "https://sheffieldafrica.com"
);

export default defineNuxtConfig({
  site: {
    url: process.env.PUBLIC_URL || "https://dev.sheffieldafrica.com",
  },

  modules: [
    [
      "@pinia/nuxt",
      { disableVuex: true, autoImports: ["defineStore", "acceptHMRUpdate"] },
    ],
    "pinia-plugin-persistedstate/nuxt",
    "vue3-carousel-nuxt",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@morev/vue-transitions",
    "@vueuse/nuxt",
  ],

  imports: {
    dirs: ["stores", "components"],
  },

  // Ignore backend directory in Nuxt processing
  ignore: ["backend/**"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      ignore: ["/api/**", "/backend/**"],
      concurrency: 1, // Reduce concurrent requests
      delay: 500, // Add delay between requests
      // @ts-ignore
      retry: {
        // Add retry logic
        attempts: 3,
        delay: 1000,
        statusCodes: [429, 503],
      },
    },
    static: true,
    // Development server configuration
    // @ts-ignore
    server:
      process.env.NODE_ENV === "development"
        ? {
            host: "127.0.0.1",
            port: process.env.PORT || 3000,
          }
        : undefined,
  },

  // Route rules for static, dynamic, and API routes
  routeRules: {
    // Static pages
    "/": { prerender: true },

    // Dynamic routes with ISR
    "/products/**": {
      isr: 3600, // 1 hour cache
    },
    "/solutions/**": {
      isr: 3600,
    },
    "/categories/**": {
      isr: 3600,
    },

    // API routes - proxy in development
    "/api/**":
      process.env.NODE_ENV === "development"
        ? {
            proxy: process.env.API_URL + "/api/**",
          }
        : {},

    // Redirects
    "/kitchen": { redirect: "commercial-kitchen" },
    "/kitchen/": { redirect: "/commercial-kitchen/" },
  },

  // Vue transitions configuration
  vueTransitions: {
    defaultProps: {
      duration: 300,
      mode: "out-in",
      onBeforeLeave(el: any) {
        const scrollPosition = window.scrollY;
        el.dataset.scrollPosition = scrollPosition.toString();
      },
      onEnter(el: any) {
        const scrollPosition = parseInt(el.dataset.scrollPosition || "0");
        window.scrollTo(0, scrollPosition);
      },
    },
    transitions: {
      page: {
        name: "fade-slide-y",
        mode: "out-in",
        duration: 300,
        onLeave: (el: any, done: any) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(20px)";
          setTimeout(done, 300);
        },
        onEnter: (el: any, done: any) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          setTimeout(done, 300);
        },
      },
    },
  },

  // Runtime config
  runtimeConfig: {
    API_URL: process.env.API_URL || "https://sheffieldafrica.com",
    buildToken: process.env.BUILD_TOKEN,
    public: {
      API_URL: process.env.API_URL || "https://sheffieldafrica.com",
      PUBLIC_URL: process.env.PUBLIC_URL || "https://dev.sheffieldafrica.com",
    },
  },

  // Build hooks for route generation
  hooks: {
    "nitro:config": async (nitroConfig) => {
      if (process.env.NODE_ENV === "production") {
        const routes = await generator.generateAllRoutes();

        nitroConfig.prerender = {
          ...nitroConfig.prerender,
          routes: ["/", ...routes],
          crawlLinks: true,
          failOnError: false,
          ignore: ["/api/**", "/backend/**"],
        };
      }
    },
  },

  // Sitemap configuration
  sitemap: {
    // @ts-ignore
    routes: async () => {
      return generator.generateAllRoutes();
    },
  },

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Build optimization
  experimental: {
    payloadExtraction: true,
    // @ts-ignore
    inlineSSRStyles: false,
    viewTransition: true,
    renderJsonPayloads: true,
  },

  // Development tools
  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },

  // CSS files
  css: ["~/assets/css/main.css"],

  compatibilityDate: "2024-12-21",
});
