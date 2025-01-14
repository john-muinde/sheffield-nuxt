// components/DflipInitializer.vue
<template>
  <div style="display: none"><!-- Hidden container --></div>
</template>

<script setup>
const emit = defineEmits(["dflip-ready"]);
const props = defineProps({
  documents: {
    type: Array,
    required: true,
  },
});

// Initialize DFlip configuration for each document
const initializeDocuments = () => {
  props.documents.forEach((doc) => {
    if (doc.publication_file?.toLowerCase().endsWith(".pdf")) {
      window[`df_option_${doc.id}`] = {
        source: assetsSync(doc.publication_file),
        outline: [],
        autoEnableOutline: false,
        autoEnableThumbnail: false,
        overwritePDFOutline: false,
        pageSize: "0",
        is3D: true,
        height: "100",
        direction: "1",
        slug: doc.slug,
        wpOptions: "true",
        id: doc.id,
      };
    }
  });
};

// Setup DFlip only on client side
onMounted(async () => {
  // Load DFlip resources
  useHead({
    link: [{ rel: "stylesheet", href: `/assets/dearflip/css/dflip.min.css` }],
    script: [
      { src: `/assets/dearflip/js/libs/jquery.min.js`, id: "jquery-core-js" },
      {
        src: `/assets/dearflip/js/libs/jquery-migrate.min.js`,
        id: "jquery-migrate-js",
      },
      {
        src: `/assets/dearflip/js/libs/imagesloaded.min.js`,
        id: "imagesloaded-js",
      },
      { src: `/assets/dearflip/js/libs/masonry.min.js`, id: "masonry-js" },
      { src: `/assets/dearflip/js/dflip.min.js`, id: "dflip-script-js" },
    ],
  });

  // Initialize configuration
  window.dFlipLocation = "/assets/dearflip/";
  window.dFlipWPGlobal = {
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
      mailBody: `Check out this site ${window.location.href}`,
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
    webgl: "true",
    hard: "none",
  };

  // Initialize documents
  initializeDocuments();

  // Wait for scripts to load and initialize
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (window.DFLIP?.parseBooks) {
    window.DFLIP.parseBooks();

    // Handle any hash navigation
    const hash = window.location.hash;
    if (hash && hash !== "#_") {
      const brochure = props.documents.find((b) => hash.includes(b.slug));
      if (brochure) {
        document.getElementById(`df_${brochure.id}`)?.click();
      }
    }
  }

  emit("dflip-ready");
});

// Watch for document changes
watch(
  () => props.documents,
  () => {
    if (window.DFLIP?.parseBooks) {
      initializeDocuments();
      window.DFLIP.parseBooks();
    }
  },
  { deep: true }
);
</script>
