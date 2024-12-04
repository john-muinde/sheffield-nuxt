<template>
  <div class="the_main_div">
    <!-- Navbar handling -->
    <Navbar v-if="!isHomePage" />

    <!-- Menu components -->
    <KitchenMenu v-if="isKitchenPage" />
    <LaundryMenu v-if="isLaundryPage" />
    <ColdRoomMenu v-if="isColdRoomPage" />
    <PromotionalMenu v-if="isPromotionalPage" />

    <!-- Main content slot -->
    <slot />

    <MobileMenu />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const { API_URL } = useAxios();

// Generate meta tags
const { generateMetaTags, config } = useMetaGenerator();
const metaTags = generateMetaTags();

// Apply meta tags using useHead
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${config.appName}` : metaTags.title;
  },
  meta: [
    { name: "description", content: metaTags.description },
    { property: "og:title", content: metaTags.ogTitle },
    { property: "og:description", content: metaTags.ogDescription },
    { property: "og:image", content: `${metaTags.primaryImage}` },
    { property: "og:type", content: "website" },
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

    // DearFlip CSS
    { rel: "stylesheet", href: `/dearflip/dflip/css/dflip.min.css` },

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
  script: [
    // jQuery and its migrate plugin
    {
      src: `/dearflip/dflip/js/libs/jquery.min.js`,
      id: "jquery-core-js",
    },
    {
      src: `/dearflip/dflip/js/libs/jquery-migrate.min.js`,
      id: "jquery-migrate-js",
    },

    // DearFlip and other JS libraries
    {
      src: `/dearflip/dflip/js/libs/imagesloaded.min.js`,
      id: "imagesloaded-js",
    },
    {
      src: `/dearflip/dflip/js/libs/masonry.min.js`,
      id: "masonry-js",
    },
    { src: `/dearflip/dflip/js/dflip.min.js`, id: "dflip-script-js" },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js",
    },

    // Custom scripts
    {
      children: `
                window.dFlipLocation = "/wp-content/plugins/dflip/assets/";
                window.dFlipWPGlobal = ${JSON.stringify({
                  text: {
                    toggleSound: "Turn on\/off Sound",
                    toggleThumbnails: "Toggle Thumbnails",
                    toggleOutline: "Toggle Outline\/Bookmark",
                    previousPage: "Previous Page",
                    nextPage: "Next Page",
                    toggleFullscreen: "Toggle Fullscreen",
                    zoomIn: "Zoom In",
                    zoomOut: "Zoom Out",
                    toggleHelp: "Toggle Help",
                    singlePageMode: "Single Page Mode",
                    doublePageMode: "Double Page Mode",
                    downloadPDFFile: "Download PDF File",
                    gotoFirstPage: "Goto First Page",
                    gotoLastPage: "Goto Last Page",
                    share: "Share",
                    search: "Search",
                    print: "Print",
                    mailSubject: "I wanted you to see this FlipBook",
                    mailBody: "Check out this site {{ url()->current() }}",
                    loading: "Loading",
                  },
                  viewerType: "flipbook",
                  mobileViewerType: "auto",
                  moreControls: "download,pageMode,startPage,endPage,sound",
                  hideControls: "altPrev,altNext",
                  leftControls: "outline,thumbnail",
                  rightControls: "fullScreen,share,download,more",
                  hideShareControls: "",
                  scrollWheel: "true",
                  backgroundColor: "rgb(229,229,229)",
                  backgroundImage: "",
                  height: "auto",
                  paddingTop: "30",
                  paddingBottom: "30",
                  paddingLeft: "30",
                  paddingRight: "30",
                  controlsPosition: "bottom",
                  controlsFloating: true,
                  direction: "1",
                  duration: "800",
                  soundEnable: "true",
                  showDownloadControl: "true",
                  showSearchControl: "false",
                  showPrintControl: "false",
                  enableAnalytics: "true",
                  webgl: "true",
                  hard: "none",
                  autoEnableOutline: "false",
                  autoEnableThumbnail: "false",
                  pageScale: "fit",
                  maxTextureSize: "3200",
                  rangeChunkSize: "1048576",
                  disableRange: false,
                  zoomRatio: "1.5",
                  flexibility: "1",
                  pageMode: "0",
                  singlePageMode: "0",
                  pageSize: "0",
                  autoPlay: "false",
                  autoPlayDuration: "5000",
                  autoPlayStart: "false",
                  linkTarget: "2",
                  sharePrefix: "flipbook-",
                  pdfVersion: "default",
                  thumbLayout: "book-title-hover",
                  targetWindow: "_popup",
                  buttonClass: "",
                  hasSpiral: false,
                  spiralColor: "#eee",
                  cover3DType: "plain",
                  color3DCover: "#aaaaaa",
                  color3DSheets: "#fff",
                  flipbook3DTiltAngleUp: "0",
                  flipbook3DTiltAngleLeft: "0",
                  autoPDFLinktoViewer: false,
                  sideMenuOverlay: true,
                  displayLightboxPlayIcon: true,
                  popupBackGroundColor: "#eee",
                  shelfImage: "",
                  enableAutoLinks: false,
                })}
            `,
    },
  ],
});

const route = useRoute();

// Page type computeds
const isHomePage = computed(() => route.path === "/");
const isKitchenPage = computed(() =>
  route.path.includes("/commercial-kitchen")
);
const isLaundryPage = computed(() => route.path.includes("/laundry"));
const isColdRoomPage = computed(() => route.path.includes("/cold-storage"));
const isPromotionalPage = computed(() => route.path.includes("/promotional"));

// Pixel tracking similar to Laravel implementation
onMounted(() => {
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

  // Smartlook initialization
  if (typeof window !== "undefined") {
    (window as any).smartlook ||
      (function (d) {
        const o: any = ((window as any).smartlook = function () {
          o.api.push(arguments);
        });
        const h = d.getElementsByTagName("head")[0];
        const c = d.createElement("script");
        o.api = new Array();
        c.async = true;
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.src = "https://web-sdk.smartlook.com/recorder.js";
        h.appendChild(c);
      })(document);
    (window as any).smartlook(
      "init",
      "1877a41e49ec51b8bb404184dd7fa59f985f3925",
      {
        region: "eu",
      }
    );
  }

  // Pixel tracking
  trackPixel();
});

// Utility function for generating random string
function generateRandomString(length: number): string {
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
