import { _ as __nuxt_component_1$1 } from './ContentState-Dkx-zL53.mjs';
import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
import { useSSRContext, mergeProps, unref, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { _ as _export_sfc, f as useRoute, H as useCookie, k as useAxios } from './server.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';

function useMediaDocuments(options = {}) {
  const {
    type = "all",
    cacheTime = 3600,
    thumbnailScale = 0.4,
    enableDflip = true,
    cdnBaseUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174",
    filters = {
      type: "document"
    }
  } = options;
  const documents = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();
  const cacheKey = `documents_${type}`;
  useCookie(cacheKey, {
    maxAge: cacheTime,
    sameSite: true
  });
  const loadPdfJS = async () => {
    if ((void 0).pdfjsLib) return (void 0).pdfjsLib;
    try {
      await Promise.all([
        new Promise((resolve) => {
          const script = (void 0).createElement("script");
          script.src = `${cdnBaseUrl}/pdf.min.js`;
          script.onload = resolve;
          (void 0).head.appendChild(script);
        }),
        new Promise((resolve) => {
          const script = (void 0).createElement("script");
          script.src = `${cdnBaseUrl}/pdf.worker.min.js`;
          script.onload = resolve;
          (void 0).head.appendChild(script);
        })
      ]);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return (void 0).pdfjsLib;
    } catch (err) {
      console.error("Failed to load PDF.js", err);
      throw err;
    }
  };
  const generateThumbnail = async (filePath, scale = thumbnailScale) => {
    try {
      const pdfjsLib = await loadPdfJS();
      const loadingTask = pdfjsLib.getDocument(filePath);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale });
      const canvas = (void 0).createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({
        canvasContext: context,
        viewport
      }).promise;
      return canvas.toDataURL("image/jpeg", 0.8);
    } catch (error2) {
      console.error("Error generating thumbnail:", error2);
      return null;
    }
  };
  const extractDimensions = (filename) => {
    const match = filename.match(/(\d+\.?\d*)x(\d+\.?\d*)/);
    return match ? { width: parseFloat(match[1]), height: parseFloat(match[2]) } : null;
  };
  const processDocuments = async (fetchFunction, sorting = "height") => {
    loading.value = true;
    try {
      const documentsData = await fetchFunction();
      const documentPromises = documentsData.map(async (doc) => {
        doc.slug = doc.slug || doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        let height = 0, width = 0, heightWidthRatio = 1, orientation = "unknown";
        try {
          if (!doc.thumbnail_path && doc.publication_file.toLowerCase().endsWith(".pdf")) {
            const thumbnail = await generateThumbnail(doc.publication_file);
            doc.thumb = thumbnail || void 0;
          } else if (doc.thumbnail_path) {
            doc.thumb = doc.thumbnail_path;
          }
          if (doc.thumb && sorting === "height") {
            const dimensions = extractDimensions(doc.thumb);
            if (dimensions) {
              width = dimensions.width || 1;
              height = dimensions.height || 1;
              heightWidthRatio = width === 0 ? Infinity : height / width;
              if (heightWidthRatio > 1) {
                orientation = "portrait";
              } else if (heightWidthRatio < 1) {
                orientation = "landscape";
              } else {
                orientation = "square";
              }
            }
          }
        } catch (error2) {
          console.error(`Error processing thumbnail for ${doc.name}:`, error2);
        }
        doc.thumb = assetsSync(doc.thumb);
        return {
          ...doc,
          height,
          width,
          heightWidthRatio: parseFloat(heightWidthRatio.toFixed(2)),
          orientation
        };
      });
      documents.value = await Promise.all(documentPromises);
      if (sorting === "height") {
        documents.value = sortDocumentsByThumbnailRatios(documents.value);
      }
      loading.value = false;
      return documents.value;
    } catch (err) {
      loading.value = false;
      error.value = err instanceof Error ? err : new Error(String(err));
      return [];
    }
  };
  const sortDocumentsByThumbnailRatios = (documents2) => {
    return documents2.sort((a, b) => {
      return b.heightWidthRatio - a.heightWidthRatio;
    });
  };
  const filterDocuments = (searchTerm = "") => {
    return documents.value.filter((doc) => {
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => doc[key] === value
      );
      const matchesSearch = !searchTerm || Object.values(doc).some(
        (field) => String(field).toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesFilters && matchesSearch;
    });
  };
  const initializeDflip = (docs = documents.value) => {
    var _a;
    if (!enableDflip || !docs.length) return false;
    docs.forEach((doc) => {
      if (doc.publication_file.toLowerCase().endsWith(".pdf")) {
        (void 0)[`df_option_${doc.id}`] = {
          source: assetsSync(`${doc.publication_file}`),
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
          id: doc.id
        };
      }
    });
    if ((_a = (void 0).DFLIP) == null ? void 0 : _a.parseBooks) {
      (void 0).DFLIP.parseBooks();
      if (router.currentRoute.value.hash) {
        if (router.currentRoute.value.hash === "#_") {
          router.replace({
            hash: ""
          });
          return;
        }
        const brochure = docs.find(
          (b) => router.currentRoute.value.hash.includes(b.slug)
        );
        if (brochure) {
          (void 0).getElementById(`df_${brochure.id}`).click();
        }
      }
      return true;
    }
    console.warn("DFLIP library not loaded");
    return false;
  };
  const handleRouteLeave = (to, from) => {
    var _a;
    const wrapper = (void 0).querySelector(".df-lightbox-wrapper");
    const wrapperOpen = wrapper && wrapper.style.display !== "none";
    if ((void 0).DFLIP && wrapperOpen) {
      (_a = (void 0).querySelector(".df-lightbox-close")) == null ? void 0 : _a.click();
      return false;
    }
    return true;
  };
  const cleanup = () => {
    documents.value = [];
    error.value = null;
  };
  return {
    documents,
    loading,
    error,
    processDocuments,
    initializeDflip,
    handleRouteLeave,
    filterDocuments,
    generateThumbnail,
    cleanup
  };
}
const _sfc_main = {
  __name: "DocumentViewer",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    sorting: {
      type: String,
      default: "height"
    }
  },
  emits: ["retry"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      documents,
      loading,
      error,
      processDocuments,
      initializeDflip,
      handleRouteLeave
    } = useMediaDocuments({
      type: props.type,
      thumbnailScale: 0.4,
      enableDflip: true,
      filters: {
        type: props.type
      }
    });
    const fetchMediaCenter = async () => {
      const { api } = useAxios();
      const response = await api.get("/api/get-media-center");
      return response.data[props.type];
    };
    const handleRetry = async () => {
      emit("retry");
      await processDocuments(fetchMediaCenter, props.sorting);
    };
    onBeforeRouteLeave(handleRouteLeave);
    useHead({
      link: [{ rel: "stylesheet", href: `/dearflip/dflip/css/dflip.min.css` }],
      script: [
        // jQuery and its migrate plugin
        {
          src: `/dearflip/dflip/js/libs/jquery.min.js`,
          id: "jquery-core-js"
        },
        {
          src: `/dearflip/dflip/js/libs/jquery-migrate.min.js`,
          id: "jquery-migrate-js"
        },
        // DearFlip and other JS libraries
        {
          src: `/dearflip/dflip/js/libs/imagesloaded.min.js`,
          id: "imagesloaded-js"
        },
        {
          src: `/dearflip/dflip/js/libs/masonry.min.js`,
          id: "masonry-js"
        },
        { src: `/dearflip/dflip/js/dflip.min.js`, id: "dflip-script-js" },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"
        },
        // Custom scripts
        {
          children: `
                window.dFlipLocation = "https://js.dearflip.com/wp-content/plugins/dflip/assets/";
                window.dFlipWPGlobal = ${JSON.stringify({
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
              mailBody: `Check out this site ${assetsSync(
                useRoute().fullPath
              )}`,
              loading: "Loading"
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
            enableAutoLinks: false
          })}
            `
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_ContentState = __nuxt_component_1$1;
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "document-viewer" }, _attrs))} data-v-4787de86>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "loading",
          "content-type": __props.contentType
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!((_a = unref(documents)) == null ? void 0 : _a.length) && !unref(loading) && unref(error) == null) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "empty",
          "content-type": __props.contentType
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!!unref(error) && !unref(loading)) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "error",
          "error-sub-message": unref(error).message,
          "content-type": __props.contentType,
          onRetry: handleRetry
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DocumentViewer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4787de86"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=DocumentViewer-p149PKNb.mjs.map
