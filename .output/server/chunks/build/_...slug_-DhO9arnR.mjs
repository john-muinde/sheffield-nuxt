import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './LoadingData-Ctu2BGXV.mjs';
import { useSSRContext, defineComponent, ref, computed, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './NuxtImg-BmkCHIFd.mjs';
import { _ as _export_sfc, f as useRoute, k as useAxios, l as getSegment, g as getProductLink } from './server.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
import { u as useMetaGenerator, a as useSeoMeta } from './metaGenerator-BW2u5JQ1.mjs';
import { u as useAsyncData } from './asyncData-BBLQfHDv.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import './interval-gl53xdpR.mjs';
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

const _sfc_main$1 = {
  __name: "NoSolutionData",
  __ssrInlineRender: true,
  props: {
    isAnimating: {
      type: Boolean,
      default: false
    },
    primaryColor: {
      type: String,
      default: "#c02434"
    },
    gradientStart: {
      type: String,
      default: "#e74c5d"
    },
    gradientEnd: {
      type: String,
      default: "#a11d2a"
    },
    borderColor: {
      type: String,
      default: "#7c1520"
    },
    retryFunction: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const isAnimating = ref(props.isAnimating);
    const gradientStart = computed(() => props.gradientStart);
    const gradientEnd = computed(() => props.gradientEnd);
    const borderColor = computed(() => props.borderColor);
    const titleColor = computed(() => "text-rose-900");
    const subtitleColor = computed(() => "text-rose-800");
    const buttonClasses = computed(() => [
      "bg-rose-600",
      "text-white",
      "hover:bg-rose-700",
      { "animate-pulse": isAnimating }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center min-h-[400px] p-6 bg-gradient-to-br w-full" }, _attrs))}><div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="${ssrRenderClass([{ "animate-bounce": unref(isAnimating) }, "mx-auto mb-6 w-64 h-64"])}"><defs><linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%"${ssrRenderAttr("stop-color", unref(gradientStart))} stop-opacity="1"></stop><stop offset="100%"${ssrRenderAttr("stop-color", unref(gradientEnd))} stop-opacity="1"></stop></linearGradient></defs><path d="M100 120 L200 50 L300 120 L300 250 L100 250 Z" fill="url(#giftGradient)"${ssrRenderAttr("stroke", unref(borderColor))} stroke-width="4"></path><path d="M100 120 L200 190 L300 120" fill="none"${ssrRenderAttr("stroke", unref(borderColor))} stroke-width="4"></path><circle cx="200" cy="85" r="20" fill="#FFFFFF"${ssrRenderAttr("stroke", unref(borderColor))} stroke-width="4"></circle><path d="M190 85 L210 85 M200 75 L200 95"${ssrRenderAttr("stroke", unref(borderColor))} stroke-width="3"></path></svg><h2 class="${ssrRenderClass([unref(titleColor), "text-2xl font-bold mb-4"])}"> Exciting Products Coming Soon! </h2><p class="${ssrRenderClass([unref(subtitleColor), "max-w-md mx-auto mb-6"])}"> We&#39;re crafting something extraordinary just for you. Stay tuned for exclusive deals that&#39;ll make your day! </p><button class="${ssrRenderClass([unref(buttonClasses), "flex items-center justify-center mx-auto px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"])}"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${ssrRenderClass([{ "animate-spin": unref(isAnimating) }, "mr-2"])}"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg> Check Again </button></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NoSolutionData.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { segment, id } = route.params;
    const { api } = useAxios();
    const { generateSeoMeta, generateHeadInput, generateContentMetaTags } = useMetaGenerator();
    const selectedCategories = ref({});
    const pageSegment = computed(() => getSegment(segment));
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      `solution-category-${id}`,
      async () => {
        const [categoriesRes, productsRes] = await Promise.all([
          api.get("/api/get-solution-categories", {
            params: { solution_id: id }
          }),
          api.get("/api/get-solution-category-products", {
            params: {
              solution_id: id,
              checkedCategoriesSolutions: selectedCategories.value[Number(id)] || []
            }
          })
        ]);
        return {
          categories: categoriesRes.data.data,
          products: productsRes.data.products.data
        };
      },
      {
        watch: [selectedCategories]
      }
    )), __temp = await __temp, __restore(), __temp);
    const metaTags = computed(
      () => {
        var _a, _b, _c, _d, _e, _f, _g;
        return generateContentMetaTags({
          type: "category",
          content: {
            name: (_a = data.value) == null ? void 0 : _a.categories.name,
            description: ((_c = (_b = data.value) == null ? void 0 : _b.categories.description) == null ? void 0 : _c.replace(/<[^>]*>/g, "")) || "",
            keywords: `${(_d = pageSegment.value) == null ? void 0 : _d.keywords}, ${(_e = data.value) == null ? void 0 : _e.categories.name}, 
                ${(_f = data.value) == null ? void 0 : _f.products.map((p) => p.name).join(", ")}`,
            main_image_path: (_g = data.value) == null ? void 0 : _g.categories.main_image_path
          }
        });
      }
    );
    const categorySchema = computed(() => {
      var _a, _b, _c, _d, _e;
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${(_a = data.value) == null ? void 0 : _a.categories.name} by Sheffield Steel Systems`,
        description: ((_c = (_b = data.value) == null ? void 0 : _b.categories.description) == null ? void 0 : _c.replace(/<[^>]*>/g, "")) || "",
        numberOfItems: ((_d = data.value) == null ? void 0 : _d.products.length) || 0,
        itemListElement: ((_e = data.value) == null ? void 0 : _e.products.map(
          (product, index) => {
            var _a2, _b2;
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: product.name,
                image: assetsSync(product.main_image_path),
                url: getProductLink(product),
                brand: {
                  "@type": "Brand",
                  name: ((_a2 = product.product_brand) == null ? void 0 : _a2.name) || "Sheffield Steel Systems"
                },
                description: product.description || `${product.name} by Sheffield Steel Systems`,
                category: (_b2 = data.value) == null ? void 0 : _b2.categories.name,
                manufacturer: {
                  "@type": "Organization",
                  name: "Sheffield Steel Systems"
                }
              }
            };
          }
        )) || []
      };
    });
    useHead(() => {
      var _a, _b;
      return {
        ...generateHeadInput(route, categorySchema.value),
        title: `${(_a = data.value) == null ? void 0 : _a.categories.name} - ${(_b = pageSegment.value) == null ? void 0 : _b.name} Solutions`
      };
    });
    useSeoMeta(generateSeoMeta(metaTags.value, route));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_LoadingData = __nuxt_component_1;
      const _component_NoSolutionData = _sfc_main$1;
      const _component_NuxtImg = _sfc_main$2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-45dea500><nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0" data-v-45dea500><div class="container d-flex align-items-center" data-v-45dea500><ol class="breadcrumb" data-v-45dea500><li class="breadcrumb-item" data-v-45dea500>`);
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
      _push(`</li><li class="breadcrumb-item" data-v-45dea500>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${(_a = unref(pageSegment)) == null ? void 0 : _a.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`${ssrInterpolate((_b2 = (_a2 = unref(pageSegment)) == null ? void 0 : _a2.name) == null ? void 0 : _b2.toUpperCase())}`);
          } else {
            return [
              createTextVNode(toDisplayString((_d2 = (_c2 = unref(pageSegment)) == null ? void 0 : _c2.name) == null ? void 0 : _d2.toUpperCase()), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active" aria-current="page" data-v-45dea500>${ssrInterpolate((_c = (_b = unref(data)) == null ? void 0 : _b.categories) == null ? void 0 : _c.name)}</li></ol></div></nav><div class="page-content" data-v-45dea500><div class="container" data-v-45dea500>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_LoadingData, null, null, _parent));
      } else if (!((_d = unref(data)) == null ? void 0 : _d.categories) || !((_e = unref(pageSegment)) == null ? void 0 : _e.active)) {
        _push(ssrRenderComponent(_component_NoSolutionData, {
          "retry-function": () => unref(refresh)()
        }, null, _parent));
      } else {
        _push(`<div class="row" data-v-45dea500><div class="col-lg-10" data-v-45dea500><div class="products mb-3" data-v-45dea500><div class="row" data-v-45dea500><div class="col-lg-12 col-md-12 mt-1" data-v-45dea500><div class="card w-100 mb-1" data-v-45dea500><div id="heading-2" class="card-header" data-v-45dea500><h2 class="card-title" data-v-45dea500><a data-v-45dea500>${ssrInterpolate(unref(data).categories.name)} - SOLUTION </a></h2></div></div></div><!--[-->`);
        ssrRenderList(unref(data).products, (product) => {
          _push(`<div class="col-6 col-md-2 col-lg-2 col-xl-2 image-container" data-v-45dea500><div class="product product-7 text-center" data-v-45dea500><figure class="product-media" data-v-45dea500>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(product)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(product.main_image_path),
                  alt: product.name,
                  format: "webp",
                  quality: "80",
                  loading: "lazy",
                  class: "w-full h-auto object-cover product-image"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtImg, {
                    src: ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(product.main_image_path),
                    alt: product.name,
                    format: "webp",
                    quality: "80",
                    loading: "lazy",
                    class: "w-full h-auto object-cover product-image"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="product-action" data-v-45dea500><button type="button" class="btn-product btn-cart" data-v-45dea500><span data-v-45dea500>Add to Cart</span></button></div></figure><div class="product-body" data-v-45dea500><div class="product-cat" data-v-45dea500>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(product)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a2, _b2;
              if (_push2) {
                _push2(`${ssrInterpolate((_a2 = product.product_brand) == null ? void 0 : _a2.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString((_b2 = product.product_brand) == null ? void 0 : _b2.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><h3 class="product-title" data-v-45dea500>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(product)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(product.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(product.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h3></div></div></div>`);
        });
        _push(`<!--]--></div></div></div><aside class="col-lg-2 order-lg-first mt-2" data-v-45dea500><div class="sidebar sidebar-shop sidebar-shop-solution" data-v-45dea500>`);
        if ((_f = unref(data).categories.product_categories_json) == null ? void 0 : _f.length) {
          _push(`<div class="widget widget-collapsible widget-categories" data-v-45dea500><h3 class="widget-title" data-v-45dea500><a data-toggle="collapse" href="#widget-1" role="button" data-v-45dea500> Product Categories </a></h3><div id="widget-1" class="show" data-v-45dea500><div class="widget-body" data-v-45dea500><div class="filter-items filter-items-count" data-v-45dea500><!--[-->`);
          ssrRenderList(unref(data).categories.product_categories_json, (category) => {
            _push(`<div class="filter-item" data-v-45dea500><div class="custom-control custom-checkbox" data-v-45dea500><input${ssrRenderAttr("id", "cat-" + category.id)} type="checkbox" class="custom-control-input"${ssrRenderAttr("value", category.id)} data-v-45dea500><label${ssrRenderAttr("for", "cat-" + category.id)} class="custom-control-label" data-v-45dea500>${ssrInterpolate(category.name)}</label></div></div>`);
          });
          _push(`<!--]--></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="widget widget-collapsible" data-v-45dea500><div id="widget-4" class="show" data-v-45dea500><div class="widget-body" data-v-45dea500>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(unref(data).categories.main_image_path),
          format: "webp",
          quality: "80",
          loading: "lazy",
          class: "w-full h-auto object-cover product-image",
          alt: unref(data).categories.name
        }, null, _parent));
        _push(`</div></div></div></div></aside></div>`);
      }
      _push(`</div></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[segment]/solutions/[id]/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-45dea500"]]);

export { ____slug_ as default };
//# sourceMappingURL=_...slug_-DhO9arnR.mjs.map
