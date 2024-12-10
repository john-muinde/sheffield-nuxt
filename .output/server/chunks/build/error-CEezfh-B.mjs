import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'consola/core';
import 'nuxt-site-config/urls';
import 'ipx';
import 'node:path';
import './server.mjs';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:net';
import 'pinia';
import 'unhead';
import 'vue-router';

const _imports_0 = publicAssetsURL("/assets/images/logo2.svg");
const _sfc_main = {
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "404 Error",
      meta: [
        {
          name: "description",
          content: "404 Error Page"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-px-spacing" }, _attrs))}><div class="error404 text-center"><div class="container-fluid"><div class="row"><div class="col-md-4 me-auto mt-5 text-md-start text-center"><a href="index.html" class="ms-md-5"><img alt="image-404"${ssrRenderAttr("src", _imports_0)} class="theme-logo"></a></div></div></div><div class="container-fluid error-content"><div class=""><h1 class="error-number">404</h1><p class="mini-text">Ooops!</p><p class="error-text mb-4 mt-1"> The page you requested was not found! </p><a href="/" class="btn btn-primary mt-5">Go Back</a></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=error-CEezfh-B.mjs.map
