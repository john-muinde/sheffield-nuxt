import { RouteGenerator } from "./utils/urls";

const generator = new RouteGenerator(process.env.API_URL as string);

const testing = true;

const testingRoutes = ["/"];

const routes = testing ? testingRoutes : await generator.generateAllRoutes();

export default defineNuxtConfig({
  site: {
    url: process.env.PUBLIC_URL,
  },
  devtools: { enabled: true },

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
  plugins: [{ src: "~/plugins/dflip.client.ts", mode: "client" }],

  ignore: ["backend/**"],

  app: {
    head: {
      // @ts-ignore
      script: [
        process.env.NODE_ENV === "production" && {
          src: "https://www.googletagmanager.com/gtag/js?id=G-GEKN7GV7YC",
          async: true,
        },
        process.env.NODE_ENV === "production" && {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GEKN7GV7YC');
          `,
        },
      ].filter(Boolean),
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      ignore: ["/api/**", "/backend/**"],
      concurrency: 50, // Reduce concurrent requests
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

    "/api/get-media-center": {
      swr: 3600, // Cache for 1 hour
    },

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

    // Admin routes - client-side only, no prerendering
    "/admin": {
      ssr: false,
      prerender: true,
    },
    "/admin/**": {
      ssr: false,
      prerender: false,
    },

    // API routes - proxy in development
    "/api/**":
      process.env.NODE_ENV === "development"
        ? {
            proxy: process.env.API_URL + "/api/**",
          }
        : {},

    // Redirects
    // "/kitchen": { redirect: { to: "commercial-kitchen", statusCode: 301 } },
    // "/kitchen/": { redirect: { to: "/commercial-kitchen/", statusCode: 301 } },
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
    API_URL: process.env.API_URL,
    buildToken: process.env.BUILD_TOKEN,
    public: {
      API_URL: process.env.API_URL,
      PUBLIC_URL: process.env.PUBLIC_URL,
    },
  },

  // Build hooks for route generation
  hooks: {
    "nitro:config": async (nitroConfig) => {
      if (process.env.NODE_ENV === "production") {
        nitroConfig.prerender = {
          ...nitroConfig.prerender,
          routes: ["/", ...routes],
          crawlLinks: true,
          failOnError: false,
          ignore: ["/api/**", "/backend/**", "/admin/**"],
        };
      }
    },
  },

  // Sitemap configuration
  sitemap: {
    // @ts-ignore
    routes: routes,
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
    renderJsonPayloads: false,
  },

  compatibilityDate: "2024-12-21",
});
