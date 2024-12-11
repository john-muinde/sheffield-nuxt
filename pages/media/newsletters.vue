<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <h2 class="about-us-title">Newsletters</h2>

              <NuxtLink
                to="/media"
                class="btn btn-primary btn-round btn-shadow float-right"
              >
                <i class="icon-long-arrow-left"></i>
                <span>Back to Media Center</span>
              </NuxtLink>

              <p class="lead about-us-lead text-primary mb-1">
                Explore Our Newsletters
              </p>

              <p class="about-us-text mb-2">Click on the documents to view</p>

              <ContentState
                v-if="loading"
                type="loading"
                content-type="NewsLetters"
              />
              <ContentState
                v-if="!newsletters.length && !loading && error == null"
                type="empty"
                content-type="NewsLetters"
              />
              <ContentState
                v-if="!!error && !loading"
                type="error"
                :error-sub-message="error.message"
                content-type="NewsLetters"
                @retry="fetchMediaCenter"
              />

              <div
                v-show="newsletters.length"
                id="dflip-books"
                ref="bookContainer"
                class="dflip-books row media-center"
              >
                <a
                  v-for="newsletter in newsletters"
                  :id="`df_${newsletter.id}`"
                  :key="newsletter.id"
                  :href="`/media/newsletters#${newsletter.slug}/`"
                  class="_df_thumb"
                  :data-slug="newsletter.slug"
                  :data-title="newsletter.name"
                  :data-df-option="`df_option_${newsletter.id}`"
                  :thumb="newsletter.thumb"
                >
                  {{ newsletter.name }}
                </a>
              </div>
              <canvas ref="thumbnailCanvas" style="display: none"></canvas>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
const { api } = useAxios();

useHead({
  title: "Newsletters",
  meta: [
    {
      name: "description",
      content: "Explore our newsletters",
    },
    {
      property: "og:title",
      content: "Newsletters",
    },
    {
      property: "og:description",
      content: "Explore our newsletters",
    },
  ],
  link: [
    // DearFlip CSS
    { rel: "stylesheet", href: `/dearflip/dflip/css/dflip.min.css` },
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

// Initialize with custom options
const {
  processDocuments,
  initializeDflip,
  documents: newsletters,
  loading,
  error,
  handleRouteLeave,
} = useMediaDocuments({
  thumbnailScale: 0.4,
  enableDflip: true,
});

// Fetch function for media center
const fetchMediaCenter = async () => {
  const response = await api.get("/api/get-media-center");
  return response.data.newsletters;
};

// Fetch and process documents
onMounted(async () => {
  await processDocuments(fetchMediaCenter);
  initializeDflip();
});

onBeforeRouteLeave(handleRouteLeave);
</script>

<style>
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
