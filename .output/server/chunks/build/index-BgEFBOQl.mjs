import { _ as __nuxt_component_1 } from './LoadingData-Ctu2BGXV.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { g as getSegment, a as getSolutionLink } from './functions-D-pjxz_N.mjs';
import { a as assets } from './file-Dd0R4TFQ.mjs';
import { ref, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
import { _ as _export_sfc, f as useRoute } from './server.mjs';
import './interval-gl53xdpR.mjs';
import 'pinia';
import 'axios';
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
import 'unhead';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { api, loading } = useAxios();
    const pageSegment = ref(null);
    const route = useRoute();
    pageSegment.value = getSegment(route.params.segment);
    const mainSolutions = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingData = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="page-wrapper" data-v-d024f61d><main class="main" data-v-d024f61d><div class="container" style="${ssrRenderStyle({ "margin-top": "1px" })}" data-v-d024f61d>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_LoadingData, null, null, _parent));
      } else {
        _push(`<div class="row cat-banner-row" data-v-d024f61d><div class="col-xl-2 col-xxl-2 slide-from-right" data-v-d024f61d><div class="cat-banner row no-gutters" data-v-d024f61d><div class="col-sm-12 col-xl-12 col-xxl-12" data-v-d024f61d><div class="banner banner-overlay solution-image" data-v-d024f61d><a href="#" data-v-d024f61d><img${ssrRenderAttr("src", pageSegment.value.image)} alt="Banner img desc" data-v-d024f61d></a></div></div></div></div><div class="col-xl-10 col-xxl-10 mt-1 slide-from-left" data-v-d024f61d><div class="row" data-v-d024f61d><!--[-->`);
        ssrRenderList(mainSolutions.value, (solution) => {
          _push(`<div class="col-md-2 col-sm-4 slide-solutions" data-v-d024f61d>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: "cat-block",
            to: ("getSolutionLink" in _ctx ? _ctx.getSolutionLink : unref(getSolutionLink))(solution.id, solution.name, pageSegment.value)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<figure data-v-d024f61d${_scopeId}><span data-v-d024f61d${_scopeId}><img${ssrRenderAttr("src", ("assets" in _ctx ? _ctx.assets : unref(assets))(solution.main_image_path))} alt="Category image" data-v-d024f61d${_scopeId}></span></figure><h3 class="cat-block-title" data-v-d024f61d${_scopeId}>${ssrInterpolate(solution.name)}</h3>`);
              } else {
                return [
                  createVNode("figure", null, [
                    createVNode("span", null, [
                      createVNode("img", {
                        src: ("assets" in _ctx ? _ctx.assets : unref(assets))(solution.main_image_path),
                        alt: "Category image"
                      }, null, 8, ["src"])
                    ])
                  ]),
                  createVNode("h3", { class: "cat-block-title" }, toDisplayString(solution.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div></main></div><button id="scroll-top" title="Back to Top" data-v-d024f61d><i class="icon-arrow-up" data-v-d024f61d></i></button><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[segment]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d024f61d"]]);

export { index as default };
//# sourceMappingURL=index-BgEFBOQl.mjs.map
