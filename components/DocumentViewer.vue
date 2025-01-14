// components/DocumentViewer.vue

<template>
  <div class="document-viewer">
    {{ loading }}

    <ContentState
      v-if="!!error && !loading"
      type="error"
      :error-sub-message="error.message"
      :content-type="contentType"
      @retry="handleRetry"
    />
    <div
      class="_df_button"
      source="http://www.yoursite.com/books/intro.pdf"
      aria-hidden="true"
    >
      Intro Book
    </div>
    <!-- should handle only when everything is okay -->
    <div
      id="dflip-books"
      ref="bookContainer"
      class="dflip-books row media-center"
    >
      <!-- Shimmer loading state -->
      <div
        v-if="loading"
        v-for="n in 10"
        :key="n"
        class="relative group"
        style="width: 210px; margin: 10px"
      >
        <!-- Book cover shimmer -->
        <div
          class="relative w-[210px] h-[297px] bg-gray-100 rounded overflow-hidden"
        >
          <!-- Base shimmer animation -->
          <div
            class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"
          ></div>

          <!-- Book shadow effect -->
          <div
            class="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-gray-200 to-transparent opacity-50"
          ></div>

          <!-- Play button overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
            >
              <!-- Play icon shimmer -->
              <div class="relative w-full h-full">
                <div
                  class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Title shimmer -->
        <div class="mt-2 px-2">
          <div class="h-4 bg-gray-100 rounded w-3/4 overflow-hidden">
            <div
              class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"
            ></div>
          </div>
        </div>
      </div>

      <!-- Actual content -->
      <a
        v-for="processedDocument in documents"
        v-show="documents?.length && isDflipLoaded && !loading"
        :id="`df_${processedDocument.id}`"
        :key="processedDocument.id"
        :href="`#${processedDocument.slug}/`"
        class="_df_thumb"
        :source="assetsSync(processedDocument.publication_file)"
        :data-slug="processedDocument.slug"
        :data-title="processedDocument.name"
        :thumb="assetsSync(processedDocument.thumb)"
        :data-df-option="`df_option_${processedDocument.id}`"
      >
        {{ processedDocument.name }}
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {
  ProcessedDocument,
  DFlipGlobalConfig,
  DocumentOptionsType,
  SortType,
} from "~/types/types";

// Props
const props = defineProps({
  type: {
    type: String as PropType<DocumentOptionsType>,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  sorting: {
    type: String as PropType<SortType>,
    default: "height",
  },
});

// Emits
const emit = defineEmits<{
  (e: "retry"): void;
}>();

// Runtime checks
const isClient = import.meta.client;

// Composables
const route = useRoute();
const { processDocuments, initializeDflip, handleRouteLeave } =
  useMediaDocuments({
    type: props.type,
    thumbnailScale: 0.4,
    enableDflip: true,
    filters: {
      type: props.type,
    },
  });

// Methods
const handleRetry = async () => {
  emit("retry");
  await refresh();
};

// Computed
const loading = ref(true);

// Data fetching
const {
  data: documents,
  error,
  refresh,
} = await useAsyncData<ProcessedDocument[]>(
  `media-center`,
  async () => {
    const { api } = useAxios();
    const response = await api.get("/api/get-media-center");
    const res = await processDocuments(
      () => response.data[props.type],
      props.sorting
    );
    return res;
  },
  {
    server: true,
    lazy: true,
  }
);

// Script loading state
const isDflipLoaded = ref(false);

// Function to check if DFlip is loaded
const checkDflipLoaded = () => {
  isDflipLoaded.value =
    typeof window !== "undefined" && window.DFLIP !== undefined;
  return isDflipLoaded.value;
};

// Function to load DFlip scripts in sequence
const loadDflipScripts = async () => {
  console.log("Starting to load DFlip scripts...");
  const scripts = [
    "/assets/dearflip/js/libs/jquery.min.js",
    "/assets/dearflip/js/libs/jquery-migrate.min.js",
    "/assets/dearflip/js/libs/imagesloaded.min.js",
    "/assets/dearflip/js/libs/masonry.min.js",
    "/assets/dearflip/js/dflip.min.js",
  ];

  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // Important: maintain loading order
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Add the configuration script after all other scripts are loaded
  const configScript = document.createElement("script");
  configScript.textContent = `
    window.dFlipLocation = "/assets/dearflip/";
    window.dFlipWPGlobal = ${JSON.stringify(dFlipConfig)};
  `;
  document.head.appendChild(configScript);
};

// Lifecycle hooks
onMounted(async () => {
  if (!checkDflipLoaded()) {
    try {
      await loadDflipScripts();
      // Wait a bit for scripts to initialize
      await new Promise((resolve) => setTimeout(resolve, 500));
      isDflipLoaded.value = true;
    } catch (error) {
      console.error("Failed to load DFlip scripts:", error);
    }
  } else {
    isDflipLoaded.value = true;
  }

  (window.DFLIP as any).defaults.onReady = function (flipbook: any) {
    console.log("flipbook ready");
    flipbook.ui.fullScreen.trigger("click");
  };

  // Only initialize DFlip after scripts are loaded
  console.log("Attempting to initialize DFlip:", {
    isDflipLoaded: isDflipLoaded.value,
    hasDocuments: !!documents.value?.length,
    hasWindowDFLIP: !!window.DFLIP,
    windowDFLIPValue: window.DFLIP,
  });

  if (isDflipLoaded.value && documents.value?.length) {
    console.log(
      "About to call initializeDflip with documents:",
      documents.value
    );
    const result = initializeDflip(documents.value);
    console.log("initializeDflip result:", result);
  }
  setTimeout(() => {
    loading.value = false;
  }, 3000);
});

// DFlip configuration
const dFlipConfig: DFlipGlobalConfig = {
  text: {
    toggleSound: "Turn on/off Sound",
    toggleThumbnails: "Toggle Thumbnails",
    toggleOutline: "Toggle Outline/Bookmark",
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
    mailBody: `Check out this site ${assetsSync(route.fullPath)}`,
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
};

// Head configuration
useHead({
  link: [{ rel: "stylesheet", href: `/assets/dearflip/css/dflip.min.css` }],
});
</script>

<style scoped>
.df-posts {
  max-width: unset;

  margin-left: -10px;
  margin-right: -10px;
}
.df-sheet .df-page:before {
  opacity: 0.5;
}

section.linkAnnotation a,
a.linkAnnotation,
.buttonWidgetAnnotation a,
a.customLinkAnnotation,
.customHtmlAnnotation,
.customVideoAnnotation,
a.df-autolink {
  background-color: #ff0;
  opacity: 0.2;
}

section.linkAnnotation a:hover,
a.linkAnnotation:hover,
.buttonWidgetAnnotation a:hover,
a.customLinkAnnotation:hover,
.customHtmlAnnotation:hover,
.customVideoAnnotation:hover,
a.df-autolink:hover {
  background-color: #2196f3;
  opacity: 0.5;
}

.df-icon-play-popup:before {
  background-color: rgb(51, 133, 209);
  color: #fff;
}

.df-lightbox-bg {
  opacity: 0.8;
}

.df-lightbox-wrapper .df-bg {
  background-color: transparent;
}

.df-container.df-transparent.df-fullscreen {
  background-color: #eee;
}
</style>
