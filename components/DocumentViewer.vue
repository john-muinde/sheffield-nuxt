// components/DocumentViewer.vue
<template>
  <div class="document-viewer">
    <!-- Loading State -->
    <ContentState v-if="loading" type="loading" :content-type="contentType" />

    <!-- Empty State -->
    <ContentState
      v-if="!documents?.length && !loading && error == null"
      type="empty"
      :content-type="contentType"
    />

    <!-- Error State -->
    <ContentState
      v-if="!!error && !loading"
      type="error"
      :error-sub-message="error.message"
      :content-type="contentType"
      @retry="handleRetry"
    />

    <!-- Documents Grid -->
    <ClientOnly>
      <div
        v-show="documents?.length"
        id="dflip-books"
        ref="bookContainer"
        class="dflip-books row media-center"
      >
        <a
          v-for="document in documents"
          :id="`df_${document.id}`"
          :key="document.id"
          :href="`/media/${type}#${document.slug}/`"
          class="_df_thumb"
          :data-slug="document.slug"
          :data-title="document.name"
          :thumb="assetsSync(document.thumb)"
          :data-df-option="`df_option_${document.id}`"
        >
          {{ document.name }} / {{ document.heightWidthRatio }}
        </a>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  sorting: {
    type: String,
    default: "height",
  },
});

const emit = defineEmits(["retry"]);

// Use our composable with all configurations
const {
  documents,
  loading,
  error,
  processDocuments,
  initializeDflip,
  handleRouteLeave,
} = useMediaDocuments({
  type: props.type,
  thumbnailScale: 0.4,
  enableDflip: true,
  filters: {
    type: props.type,
  },
});

// Fetch media center data
const fetchMediaCenter = async () => {
  const { api } = useAxios();
  const response = await api.get("/api/get-media-center");
  return response.data[props.type];
};

// Handle retry
const handleRetry = async () => {
  emit("retry");
  await processDocuments(fetchMediaCenter, props.sorting);
};

// Initialize on mount
onMounted(async () => {
  await processDocuments(fetchMediaCenter, props.sorting);
  console.log("Initializing DearFlip...");
  console.table(documents.value);
  initializeDflip();
});

// Handle route leaving
onBeforeRouteLeave(handleRouteLeave);

// Setup DearFlip configuration
useHead({
  link: [{ rel: "stylesheet", href: `/dearflip/dflip/css/dflip.min.css` }],
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
                window.dFlipLocation = "https://js.dearflip.com/wp-content/plugins/dflip/assets/";
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
                    mailBody: `Check out this site ${assetsSync(
                      useRoute().fullPath
                    )}`,
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
</script>

<style scoped>
/* Styles remain unchanged */
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
}

.df-icon-play-popup:before {
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
