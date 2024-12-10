import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './ContentState-Dkx-zL53.mjs';
import { withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { onBeforeRouteLeave } from 'vue-router';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
import { u as useMediaDocuments } from './useMediaDocuments-B1ZijcQg.mjs';
import './server.mjs';
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
import '@headlessui/vue';
import 'axios';

const _sfc_main = {
  __name: "newsletters",
  __ssrInlineRender: true,
  setup(__props) {
    const { api } = useAxios();
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
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="main"><div class="page-content"><div class="container"><div class="row"><div class="col-lg-10 offset-lg-1"><h2 class="about-us-title"> Newsletters </h2>`);
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
      _push(`<p class="lead about-us-lead text-primary mb-1"> Explore Our Newsletters </p><p class="about-us-text mb-2"> Click on the documents to view </p>`);
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
//# sourceMappingURL=newsletters-p4joebAU.mjs.map
