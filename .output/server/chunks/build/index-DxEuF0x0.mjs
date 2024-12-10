import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { ref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
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
import 'pinia';
import 'unhead';
import 'vue-router';
import 'consola/core';
import 'nuxt-site-config/urls';
import 'ipx';

const _imports_0 = publicAssetsURL("/assets/images/media/media_blogs.jpg");
const _imports_1 = publicAssetsURL("/assets/images/media/media_in_the_news.jpg");
const _imports_2 = publicAssetsURL("/assets/images/media/media_video.jpg");
const _imports_3 = publicAssetsURL("/assets/images/media/media_newsletters.jpg");
const _imports_4 = publicAssetsURL("/assets/images/media/media_documents.jpg");
const _imports_5 = publicAssetsURL("/assets/images/media/media_gallery.jpg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Media Center",
      meta: [
        {
          name: "description",
          content: "Welcome to Our Media Center, a hub of captivating multimedia content regularly updated with new and exciting news so there's always something to discover About Sheffield. Check back often to stay updated."
        },
        {
          name: "keywords",
          content: "Media Center, Blogs, In The News, Videos, Newsletters, Brochures & Catalogs, Gallery"
        }
      ]
    });
    ref([]);
    ref([]);
    ref([]);
    ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="main"><div class="page-content"><div class="container"><div class="row"><div class="col-lg-10 offset-lg-1 mb-3"><h2 class="about-us-title"> Media Center </h2><p class="lead about-us-lead text-primary mb-1"> Immerse Yourself in our Media Showcase </p><p> Welcome to Our Media Center, a hub of captivating multimedia content regularly updated with new and exciting news so there&#39;s always something to discover About Sheffield. Check back often to stay updated. </p></div></div></div><div class="container"><div class="row"><div class="col-md-10 offset-lg-1 justify-content-center media-center-section"><div class="row about-team-container about-team-container1 justify-content-center"><div class="col-md-4 mt-2 mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/media/blogs" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="about-team"${_scopeId}><div class="about-team-white"${_scopeId}><img${ssrRenderAttr("src", _imports_0)}${_scopeId}></div><div class="details"${_scopeId}><div class="name"${_scopeId}> Blogs </div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "about-team" }, [
                createVNode("div", { class: "about-team-white" }, [
                  createVNode("img", { src: _imports_0 })
                ]),
                createVNode("div", { class: "details" }, [
                  createVNode("div", { class: "name" }, " Blogs ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-md-4 mt-2 mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/media/in-the-news" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="about-team"${_scopeId}><div class="about-team-white"${_scopeId}><img${ssrRenderAttr("src", _imports_1)}${_scopeId}></div><div class="details"${_scopeId}><div class="name"${_scopeId}> In The News </div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "about-team" }, [
                createVNode("div", { class: "about-team-white" }, [
                  createVNode("img", { src: _imports_1 })
                ]),
                createVNode("div", { class: "details" }, [
                  createVNode("div", { class: "name" }, " In The News ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-md-4 mt-2 mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/media/videos" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="about-team"${_scopeId}><div class="about-team-white"${_scopeId}><img${ssrRenderAttr("src", _imports_2)}${_scopeId}></div><div class="details"${_scopeId}><div class="name"${_scopeId}> Videos </div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "about-team" }, [
                createVNode("div", { class: "about-team-white" }, [
                  createVNode("img", { src: _imports_2 })
                ]),
                createVNode("div", { class: "details" }, [
                  createVNode("div", { class: "name" }, " Videos ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-md-4 mt-2 mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/media/newsletters" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="about-team"${_scopeId}><div class="about-team-white"${_scopeId}><img${ssrRenderAttr("src", _imports_3)}${_scopeId}></div><div class="details"${_scopeId}><div class="name"${_scopeId}> Newsletters </div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "about-team" }, [
                createVNode("div", { class: "about-team-white" }, [
                  createVNode("img", { src: _imports_3 })
                ]),
                createVNode("div", { class: "details" }, [
                  createVNode("div", { class: "name" }, " Newsletters ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-md-4 mt-2 mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/media/brochures-and-catalogs" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="about-team"${_scopeId}><div class="about-team-white"${_scopeId}><img${ssrRenderAttr("src", _imports_4)}${_scopeId}></div><div class="details"${_scopeId}><div class="name"${_scopeId}> Brochures &amp; Catalogs </div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "about-team" }, [
                createVNode("div", { class: "about-team-white" }, [
                  createVNode("img", { src: _imports_4 })
                ]),
                createVNode("div", { class: "details" }, [
                  createVNode("div", { class: "name" }, " Brochures & Catalogs ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-md-4 mt-2 mb-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/media/gallery" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="about-team"${_scopeId}><div class="about-team-white"${_scopeId}><img${ssrRenderAttr("src", _imports_5)}${_scopeId}></div><div class="details"${_scopeId}><div class="name"${_scopeId}> Gallery </div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "about-team" }, [
                createVNode("div", { class: "about-team-white" }, [
                  createVNode("img", { src: _imports_5 })
                ]),
                createVNode("div", { class: "details" }, [
                  createVNode("div", { class: "name" }, " Gallery ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DxEuF0x0.mjs.map
