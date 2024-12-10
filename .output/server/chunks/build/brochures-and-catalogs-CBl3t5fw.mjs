import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './ContentState-Dkx-zL53.mjs';
import { withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { onBeforeRouteLeave } from 'vue-router';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
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
  __name: "brochures-and-catalogs",
  __ssrInlineRender: true,
  setup(__props) {
    const { api } = useAxios();
    useHead({
      title: "Brochures & Catalogs",
      meta: [
        {
          name: "description",
          content: "Explore our brochures and catalogs."
        }
      ]
    });
    const {
      processDocuments,
      initializeDflip,
      documents: brochures,
      loading,
      error,
      handleRouteLeave
    } = useMediaDocuments({
      thumbnailScale: 0.4,
      enableDflip: true
    });
    const fetchMediaCenter = async () => {
      const response = await api.get("/api/get-media-center");
      return response.data.brochures;
    };
    onBeforeRouteLeave(handleRouteLeave);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentState = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="main"><div class="page-content"><div class="container"><div class="row"><div class="col-lg-10 offset-lg-1"><h2 class="about-us-title"> Brochures &amp; Catalogs </h2>`);
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
      _push(`<p class="lead about-us-lead text-primary mb-1"> Explore Our Brochures &amp; Catalogs </p><p class="about-us-text mb-2"> Click on the documents to view </p>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "loading",
          "content-type": "Brochures & Catalogs"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(brochures).length && !unref(loading) && unref(error) == null) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "empty",
          "content-type": "Brochures & Catalogs"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!!unref(error) && !unref(loading)) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "error",
          "error-sub-message": unref(error).message,
          "content-type": "Brochures & Catalogs",
          onRetry: fetchMediaCenter
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle(unref(brochures).length ? null : { display: "none" })}" id="dflip-books" class="dflip-books row media-center"><!--[-->`);
      ssrRenderList(unref(brochures), (brochure) => {
        _push(`<a${ssrRenderAttr("id", `df_${brochure.id}`)}${ssrRenderAttr("href", `/media/brochures#${brochure.slug}/`)} class="_df_thumb"${ssrRenderAttr("data-slug", brochure.slug)}${ssrRenderAttr("data-title", brochure.name)}${ssrRenderAttr("data-df-option", `df_option_${brochure.id}`)}${ssrRenderAttr("thumb", brochure.thumb)}>${ssrInterpolate(brochure.name)}</a>`);
      });
      _push(`<!--]--></div><canvas style="${ssrRenderStyle({ "display": "none" })}"></canvas></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/brochures-and-catalogs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=brochures-and-catalogs-CBl3t5fw.mjs.map
