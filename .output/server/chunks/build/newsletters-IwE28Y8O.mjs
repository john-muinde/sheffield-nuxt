import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './ContentState-Dkx-zL53.mjs';
import { withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { onBeforeRouteLeave } from 'vue-router';
import { k as useAxios } from './server.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { u as useMediaDocuments } from './useMediaDocuments-DQ1WXOdO.mjs';
import '@headlessui/vue';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../_/nitro.mjs';
import 'consola/core';
import 'nuxt-site-config/urls';
import 'ipx';
import 'pinia';
import 'unhead';
import 'ant-design-vue';
import 'axios';

const _sfc_main = {
  __name: "newsletters",
  __ssrInlineRender: true,
  setup(__props) {
    const { api } = useAxios();
    useHead({
      title: "Newsletters",
      meta: [
        {
          name: "description",
          content: "Explore our newsletters"
        },
        {
          property: "og:title",
          content: "Newsletters"
        },
        {
          property: "og:description",
          content: "Explore our newsletters"
        }
      ],
      link: [
        // DearFlip CSS
        { rel: "stylesheet", href: `/dearflip/dflip/css/dflip.min.css` }
      ],
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
              mailBody: "Check out this site {{ url()->current() }}",
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
    const {
      processDocuments,
      initializeDflip,
      documents: newsletters,
      loading,
      error,
      handleRouteLeave
    } = useMediaDocuments({
      thumbnailScale: 0.4,
      enableDflip: true
    });
    const fetchMediaCenter = async () => {
      const response = await api.get("/api/get-media-center");
      return response.data.newsletters;
    };
    onBeforeRouteLeave(handleRouteLeave);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentState = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="main"><div class="page-content"><div class="container"><div class="row"><div class="col-lg-10 offset-lg-1"><h2 class="about-us-title">Newsletters</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "btn btn-primary btn-round btn-shadow float-right"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon-long-arrow-left"${_scopeId}></i><span${_scopeId}>Back to Media Center</span>`);
          } else {
            return [
              createVNode("i", { class: "icon-long-arrow-left" }),
              createVNode("span", null, "Back to Media Center")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="lead about-us-lead text-primary mb-1"> Explore Our Newsletters </p><p class="about-us-text mb-2">Click on the documents to view</p>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "loading",
          "content-type": "NewsLetters"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(newsletters).length && !unref(loading) && unref(error) == null) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "empty",
          "content-type": "NewsLetters"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!!unref(error) && !unref(loading)) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "error",
          "error-sub-message": unref(error).message,
          "content-type": "NewsLetters",
          onRetry: fetchMediaCenter
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle(unref(newsletters).length ? null : { display: "none" })}" id="dflip-books" class="dflip-books row media-center"><!--[-->`);
      ssrRenderList(unref(newsletters), (newsletter) => {
        _push(`<a${ssrRenderAttr("id", `df_${newsletter.id}`)}${ssrRenderAttr("href", `/media/newsletters#${newsletter.slug}/`)} class="_df_thumb"${ssrRenderAttr("data-slug", newsletter.slug)}${ssrRenderAttr("data-title", newsletter.name)}${ssrRenderAttr("data-df-option", `df_option_${newsletter.id}`)}${ssrRenderAttr("thumb", newsletter.thumb)}>${ssrInterpolate(newsletter.name)}</a>`);
      });
      _push(`<!--]--></div><canvas style="${ssrRenderStyle({ "display": "none" })}"></canvas></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/newsletters.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=newsletters-IwE28Y8O.mjs.map
