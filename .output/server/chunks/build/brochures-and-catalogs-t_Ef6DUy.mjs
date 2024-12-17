import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './DocumentViewer-p149PKNb.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
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
import 'vue-router';
import 'ant-design-vue';
import 'axios';
import './ContentState-Dkx-zL53.mjs';
import '@headlessui/vue';
import './client-only-Bwxzq3Sq.mjs';
import './file-DYudjGfO.mjs';

const _sfc_main = {
  __name: "brochures-and-catalogs",
  __ssrInlineRender: true,
  setup(__props) {
    const handleRetry = () => {
      console.log("Retrying brochures load...");
    };
    useHead({
      title: "Brochures & Catalogs",
      meta: [
        {
          name: "description",
          content: "Explore our Brochures & Catalogs"
        },
        {
          property: "og:title",
          content: "Brochures & Catalogs"
        },
        {
          property: "og:description",
          content: "Explore our Brochures & Catalogs"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DocumentViewer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row"><div class="col-lg-10 offset-lg-1"><h2 class="about-us-title">Brochures &amp; Catalogs</h2>`);
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
      _push(`<p class="lead about-us-lead text-primary mb-1"> Explore Our Brochures &amp; Catalogs </p><p class="about-us-text mb-2">Click on the documents to view</p>`);
      _push(ssrRenderComponent(_component_DocumentViewer, {
        type: "brochures",
        "content-type": "Brochures & Catalogs",
        sorting: "height",
        onRetry: handleRetry
      }, null, _parent));
      _push(`</div></div></div>`);
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
//# sourceMappingURL=brochures-and-catalogs-t_Ef6DUy.mjs.map
