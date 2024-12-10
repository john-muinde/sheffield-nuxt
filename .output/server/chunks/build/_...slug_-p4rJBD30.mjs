import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_0$1 } from './client-only-Bwxzq3Sq.mjs';
import { g as getSegment, b as getCategoryLink } from './functions-D-pjxz_N.mjs';
import { a as assets } from './file-Dd0R4TFQ.mjs';
import { computed, ref, withAsyncContext, watch, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, f as useRoute } from './server.mjs';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
import { u as useSchemas } from './useSchemas-DrxAXi_A.mjs';
import { u as useAsyncData, r as refreshNuxtData } from './asyncData-Bv9ALze0.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import 'pinia';
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
import 'axios';

const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { api } = useAxios();
    const { createProductSchema } = useSchemas();
    const segment = computed(
      () => {
        var _a;
        return getSegment((_a = product.value) == null ? void 0 : _a.categories_json[0].parent_name_with_slashes);
      }
    );
    ref(false);
    ref(0);
    const mainImage = ref("");
    ref(0);
    ref(null);
    ref("description");
    const {
      data: product,
      pending,
      error
    } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      `product-${route.params.id}`,
      async () => {
        try {
          const response = await api.get("/api/get-product", {
            params: {
              product_id: route.params.id
            }
          });
          return response.data.data;
        } catch (err) {
          throw new Error("Failed to load product data");
        }
      },
      {
        server: true,
        lazy: false,
        immediate: true
      }
    )), __temp = await __temp, __restore(), __temp);
    const { API_URL } = useAxios();
    useHead(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      if (!product.value) return {};
      const schema = createProductSchema(product.value);
      return {
        title: (_a = product.value) == null ? void 0 : _a.name,
        meta: [
          {
            name: "description",
            content: ((_c = (_b = product.value) == null ? void 0 : _b.short_description) == null ? void 0 : _c.replace(/<[^>]*>/g, "")) || ""
          },
          {
            property: "og:title",
            content: (_d = product.value) == null ? void 0 : _d.name
          },
          {
            property: "og:description",
            content: ((_f = (_e = product.value) == null ? void 0 : _e.short_description) == null ? void 0 : _f.replace(/<[^>]*>/g, "")) || ""
          },
          {
            property: "og:image",
            content: assets((_g = product.value) == null ? void 0 : _g.main_image_path)
          },
          {
            property: "og:url",
            content: API_URL + route.fullPath
          },
          {
            property: "og:type",
            content: "product"
          },
          {
            property: "twitter:title",
            content: (_h = product.value) == null ? void 0 : _h.name
          },
          {
            property: "twitter:description",
            content: ((_j = (_i = product.value) == null ? void 0 : _i.short_description) == null ? void 0 : _j.replace(/<[^>]*>/g, "")) || ""
          },
          {
            property: "twitter:image",
            content: assets((_k = product.value) == null ? void 0 : _k.main_image_path)
          },
          {
            property: "twitter:url",
            content: API_URL + route.fullPath
          }
        ],
        script: [
          {
            type: "application/ld+json",
            children: JSON.stringify(schema)
          }
        ]
      };
    });
    computed(
      () => {
        var _a, _b;
        return ((_b = (_a = product.value) == null ? void 0 : _a.product_images) == null ? void 0 : _b.map((item) => assets(item.name))) || [];
      }
    );
    watch(
      () => route.params.id,
      async (newId, oldId) => {
        if (newId !== oldId) {
          await refreshNuxtData();
        }
      }
    );
    watch(
      () => product.value,
      (newProduct) => {
        var _a;
        if (((_a = newProduct == null ? void 0 : newProduct.product_images) == null ? void 0 : _a.length) > 0) {
          mainImage.value = newProduct.product_images[0].name;
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-64245369><nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0" data-v-64245369><div class="container d-flex align-items-center" data-v-64245369><ol class="breadcrumb" data-v-64245369><li class="breadcrumb-item" data-v-64245369>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`HOME`);
          } else {
            return [
              createTextVNode("HOME")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (((_a = unref(product)) == null ? void 0 : _a.categories_json) && ((_b = unref(product)) == null ? void 0 : _b.categories_json.length) > 0 && ((_c = unref(product)) == null ? void 0 : _c.categories_json[0].parent_name_with_slashes)) {
        _push(`<li class="breadcrumb-item" data-v-64245369>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/" + ((_d = segment.value) == null ? void 0 : _d.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b2;
            if (_push2) {
              _push2(`${ssrInterpolate((_a2 = segment.value) == null ? void 0 : _a2.name.toUpperCase())}`);
            } else {
              return [
                createTextVNode(toDisplayString((_b2 = segment.value) == null ? void 0 : _b2.name.toUpperCase()), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="breadcrumb-item" data-v-64245369><!--[-->`);
      ssrRenderList((_e = unref(product)) == null ? void 0 : _e.categories_json, (category) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: category.id,
          to: ("getCategoryLink" in _ctx ? _ctx.getCategoryLink : unref(getCategoryLink))(category.id, category.name)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(category.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(category.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></li><li class="breadcrumb-item active" aria-current="page" data-v-64245369>${ssrInterpolate((_f = unref(product)) == null ? void 0 : _f.name)}</li></ol></div></nav><div class="page-content mt-0" data-v-64245369><div class="container" data-v-64245369>`);
      if (unref(error)) {
        _push(`<div class="product-error-state" data-v-64245369><div class="row justify-content-center" data-v-64245369><div class="col-md-8 text-center py-5" data-v-64245369><div class="error-icon mb-4" data-v-64245369><i class="icon-exclamation-circle text-danger" style="${ssrRenderStyle({ "font-size": "3rem" })}" data-v-64245369></i></div><h2 class="error-title mb-3" data-v-64245369>Unable to Load Product</h2><p class="error-message text-muted mb-4" data-v-64245369> We&#39;re having trouble loading this product&#39;s information. This might be because: </p><ul class="error-reasons text-left mb-4 mx-auto" style="${ssrRenderStyle({ "max-width": "400px" })}" data-v-64245369><li data-v-64245369>The product may no longer be available</li><li data-v-64245369>There might be a temporary connection issue</li><li data-v-64245369>The product URL might be incorrect</li></ul><div class="error-actions" data-v-64245369><button class="btn btn-primary me-3" data-v-64245369> Try Again </button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "btn btn-outline-primary whitespace-nowrap"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to Homepage `);
            } else {
              return [
                createTextVNode(" Return to Homepage ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><p class="mt-4 small text-muted" data-v-64245369> If this problem persists, please contact our support team </p></div></div></div>`);
      } else {
        _push(`<div class="product-details-top" data-v-64245369><div class="row" data-v-64245369><div class="col-md-5" data-v-64245369>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="product-gallery-shimmer" data-v-64245369${_scopeId}><div class="main-image-shimmer shimmer" data-v-64245369${_scopeId}></div><div class="thumbnail-container" data-v-64245369${_scopeId}><!--[-->`);
              ssrRenderList(4, (n) => {
                _push2(`<div class="thumbnail-shimmer shimmer" data-v-64245369${_scopeId}></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                createVNode("div", { class: "product-gallery-shimmer" }, [
                  createVNode("div", { class: "main-image-shimmer shimmer" }),
                  createVNode("div", { class: "thumbnail-container" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(4, (n) => {
                      return createVNode("div", {
                        class: "thumbnail-shimmer shimmer",
                        key: n
                      });
                    }), 64))
                  ])
                ])
              ];
            }
          })
        }, _parent));
        _push(`</div><div class="col-md-7" data-v-64245369>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {
          fallback: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="product-details-shimmer" data-v-64245369${_scopeId}><div class="shimmer title-shimmer mb-4" data-v-64245369${_scopeId}></div><!--[-->`);
              ssrRenderList(3, (n) => {
                _push2(`<div class="shimmer text-shimmer mb-3" data-v-64245369${_scopeId}></div>`);
              });
              _push2(`<!--]--><div class="shimmer button-shimmer mt-4" data-v-64245369${_scopeId}></div><div class="tabs-shimmer mt-4" data-v-64245369${_scopeId}><!--[-->`);
              ssrRenderList(2, (n) => {
                _push2(`<div class="shimmer tab-shimmer" data-v-64245369${_scopeId}></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                createVNode("div", { class: "product-details-shimmer" }, [
                  createVNode("div", { class: "shimmer title-shimmer mb-4" }),
                  (openBlock(), createBlock(Fragment, null, renderList(3, (n) => {
                    return createVNode("div", {
                      class: "shimmer text-shimmer mb-3",
                      key: n
                    });
                  }), 64)),
                  createVNode("div", { class: "shimmer button-shimmer mt-4" }),
                  createVNode("div", { class: "tabs-shimmer mt-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(2, (n) => {
                      return createVNode("div", {
                        class: "shimmer tab-shimmer",
                        key: n
                      });
                    }), 64))
                  ])
                ])
              ];
            }
          })
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[segment]/product/[id]/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-64245369"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-p4rJBD30.mjs.map
