import { ref, resolveComponent, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import MarkdownIt from 'markdown-it';
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

const _sfc_main = {
  __name: "terms-and-conditions",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Terms and Conditions",
      meta: [
        {
          name: "description",
          content: "Our terms and conditions"
        }
      ]
    });
    ref(null);
    new MarkdownIt({
      html: true,
      breaks: true,
      linkify: true
    });
    const renderedContent = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="main"><nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0"><div class="container"><ol class="breadcrumb"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` HOME `);
          } else {
            return [
              createTextVNode(" HOME ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active" aria-current="page"> TERMS AND CONDITIONS </li></ol></div></nav><div class="page-content pb-0"><div class="container terms_page"><div class="row"><div class="col-lg-12"><div>${(_a = renderedContent.value) != null ? _a : ""}</div></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms-and-conditions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=terms-and-conditions-Di2X2TeR.mjs.map
