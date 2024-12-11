<template>
  <div class="the_main_div">
    <!-- Navbar handling -->
    <Navbar v-if="!isHomePage" />

    <!-- Menu components -->
    <TopMenu
      v-if="pageSegment != null && !$route.path.includes('/product')"
      :segment="pageSegment"
    />

    <!-- Main content slot -->
    <slot />

    <MobileMenu />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

declare global {
  interface Window {
    smartlook: any;
  }
}

const route = useRoute();

const pageSegment = ref<{
  id: number;
  active: boolean;
  name: string;
  slug: string;
  slugs: string[];
  color: string;
  image: string;
  icon: string;
} | null>(null);

const { API_URL } = useAxios();

// Generate meta tags
const { generateMetaTags, config } = useMetaGenerator();
const { createFAQSchema, createOrganizationSchema, createServiceAreasSchema } =
  useSchemas();
const metaTags = generateMetaTags();

const schema = [
  createOrganizationSchema(),
  createServiceAreasSchema([
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Kampala",
    "Dar es Salaam",
    "Kigali",
  ]),
  createFAQSchema([
    {
      question:
        "What commercial kitchen equipment services does Sheffield provide?",
      answer:
        "Sheffield provides complete commercial kitchen solutions including design, equipment supply, installation, maintenance, and custom fabrication. We serve restaurants, hotels, hospitals, schools, and industrial facilities.",
    },
    {
      question: "Which areas does Sheffield serve in East Africa?",
      answer:
        "Sheffield serves all major cities in East Africa including Nairobi, Mombasa, Kisumu, Kampala, Dar es Salaam, and Kigali, with additional coverage across Kenya, Uganda, Tanzania, and Rwanda.",
    },
  ]),
];

// Apply meta tags using useHead
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${config.appName}` : metaTags.title;
  },
  meta: [
    { name: "description", content: metaTags.description },
    { name: "keywords", content: metaTags.keywords },
    { name: "author", content: config.appName },
    { name: "application-name", content: config.appName },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "application-name", content: config.appName },
    { property: "og:locale", content: config.locale },
    { property: "og:title", content: metaTags.ogTitle },
    { property: "og:description", content: metaTags.ogDescription },
    { property: "og:image", content: `${metaTags.primaryImage}` },
    { property: "og:type", content: "website" },
    { property: "og:url", content: config.url + route.fullPath },
    { property: "og:site_name", content: config.appName },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: metaTags.ogTitle },
    { name: "twitter:description", content: metaTags.ogDescription },
    { name: "twitter:image", content: `${metaTags.primaryImage}` },
    { name: "twitter:url", content: config.url + route.fullPath },
    { name: "twitter:domain", content: config.url },
    { name: "robots", content: "index, follow" },
  ],
  htmlAttrs: {
    lang: config.locale,
    prefix: "og: https://ogp.me/ns#",
  },
  link: [
    // Favicon
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: `/favicon.ico`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: `/favicon-32x32.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: `/favicon-16x16.png`,
    },
    // Other CSS files (converted from Laravel vite imports)
    { rel: "stylesheet", href: `/assets/css/bootstrap.min.css` },
    {
      rel: "stylesheet",
      href: `/assets/css/plugins/owl-carousel/owl.carousel.css`,
    },
    {
      rel: "stylesheet",
      href: `/assets/css/plugins/jquery.countdown.css`,
    },
    { rel: "stylesheet", href: `/assets/css/style.css` },
    { rel: "stylesheet", href: `/assets/css/skins/skin-demo-14.css` },
    { rel: "stylesheet", href: `/assets/css/demos/demo-14.css` },
    { rel: "stylesheet", href: `/assets/css/demos/demo-4.css` },
  ],
});

// Page type computeds
const isHomePage = computed(() => route.path === "/");
// Pixel tracking similar to Laravel implementation
onMounted(() => {
  const trackPixel = async () => {
    let trackingId = localStorage.getItem("pixel-tracker");
    if (!localStorage.getItem("promotionActive")) {
      localStorage.setItem("promotionActive", "true");
    }

    if (!trackingId) {
      trackingId = generateRandomString(30);
      localStorage.setItem("pixel-tracker", trackingId);
    }

    const pixelTrackerImg = document.createElement("img");

    pixelTrackerImg.src = `${API_URL}/pixel-tracker?event=page_visit&tracking_id=${trackingId}&url=${window.location.href}`;
    pixelTrackerImg.style.display = "none";
    document.body.appendChild(pixelTrackerImg);
  };

  // Smartlook initialization
  if (typeof window !== "undefined") {
    window.smartlook ||
      (function (d) {
        const o = (window.smartlook = function () {
          (o as any).api.push(arguments);
        });
        const h = d.getElementsByTagName("head")[0];
        const c = d.createElement("script");
        (o as any).api = new Array();
        c.async = true;
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.src = "https://web-sdk.smartlook.com/recorder.js";
        h.appendChild(c);
      })(document);
    window.smartlook("init", "1877a41e49ec51b8bb404184dd7fa59f985f3925", {
      region: "eu",
    });
  }

  // Pixel tracking
  trackPixel();
});

watchEffect(() => {
  pageSegment.value = getSegment(route.params.segment) || null;
});

// Utility function for generating random string
function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
