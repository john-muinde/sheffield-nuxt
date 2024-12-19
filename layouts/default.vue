<template>
  <div class="the_main_div">
    <Navbar v-if="!isHomePage" />

    <TopMenu
      v-if="pageSegment != null && !route.path.includes('/product')"
      :segment="pageSegment"
    />

    <slot />

    <MobileMenu />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watchEffect } from "vue";
import type { SegmentInterface } from "~/types/meta-tags";

// Type declaration for Smartlook
declare global {
  interface Window {
    smartlook: any;
  }
}

// Composables
const route = useRoute();
const { API_URL } = useAxios();
const { generateSeoMeta, generateHeadInput, generateContentMetaTags } =
  useMetaGenerator();

// State
const pageSegment = ref<SegmentInterface | null>(null);

// Generate meta tags
const metaTags = generateContentMetaTags();

// Apply SEO meta tags
useSeoMeta(generateSeoMeta(metaTags, route));

// Apply additional head elements
useHead(generateHeadInput(route, metaTags.jsonLdSchema));

// Computed
const isHomePage = computed(() => route.path === "/");

// Utility function for random string generation
const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

// Pixel tracking implementation
const trackPixel = async () => {
  let trackingId = localStorage.getItem("pixel-tracker");

  if (!trackingId) {
    trackingId = generateRandomString(30);
    localStorage.setItem("pixel-tracker", trackingId);
  }

  const pixelTrackerImg = document.createElement("img");
  pixelTrackerImg.src = `${API_URL}/pixel-tracker?event=page_visit&tracking_id=${trackingId}&url=${window.location.href}`;
  pixelTrackerImg.style.display = "none";
  document.body.appendChild(pixelTrackerImg);
};

// Initialize Smartlook
const initializeSmartlook = () => {
  if (typeof window === "undefined") return;

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
};

// Lifecycle hooks
onMounted(() => {
  initializeSmartlook();
  trackPixel();
});

watchEffect(() => {
  pageSegment.value = getSegment(route.params.segment) || null;
});
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
