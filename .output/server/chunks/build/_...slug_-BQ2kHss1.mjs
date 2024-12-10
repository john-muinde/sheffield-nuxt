import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './LoadingData-Ctu2BGXV.mjs';
import { computed, ref, watch, watchEffect, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './NuxtImg-CHbwr8LG.mjs';
import { g as getSegment, c as capitalizeMainWords, d as getProductLink } from './functions-D-pjxz_N.mjs';
import { a as assets } from './file-Dd0R4TFQ.mjs';
import { f as useRoute } from './server.mjs';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import './interval-gl53xdpR.mjs';
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
const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const pageSegment = computed(() => {
      return getSegment(route.params.segment);
    });
    const route = useRoute();
    const { segment, id } = route.params;
    const slug = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug];
    const category = slug[0];
    const page = slug[2];
    const { api, loading } = useAxios();
    const title = ref(
      `${capitalizeMainWords(segment)} - ${capitalizeMainWords(category)}`
    );
    useHead({
      title,
      meta: [
        {
          name: "description",
          content: "We offer state of the art commercial cold room equipment at Sheffield africa Ltd"
        },
        {
          name: "keywords",
          content: "Cold room equipment"
        }
      ]
    });
    const currentPage = ref(page ? parseInt(page) : 1);
    const perPage = ref(12);
    ref(0);
    const products = ref([]);
    const solution_id = ref(id ? parseInt(id) : 1);
    const solutionCategories = ref([]);
    const solutionCategoriesList = ref([]);
    const checkedCategoriesSolutions = ref([]);
    const fetchSolutionCategories = async () => {
      try {
        const response = await api.get("/api/get-solution-categories", {
          params: {
            solution_id: solution_id.value
          }
        });
        solutionCategories.value = response.data.data;
        solutionCategoriesList.value = response.data.data.product_categories_json;
      } catch (error) {
        console.error(error);
      }
    };
    const solutionCategoryProducts = ref([]);
    const fetchSolutionCategoryProducts = async () => {
      try {
        const response = await api.get("/api/get-solution-category-products", {
          params: {
            solution_id: solution_id.value,
            checkedCategoriesSolutions: checkedCategoriesSolutions.value
          }
        });
        solutionCategoryProducts.value = response.data.products.data;
      } catch (error) {
        console.error(error);
      }
    };
    const displayedProducts = ref([]);
    const updateDisplayedProducts = () => {
      const startIndex = 0;
      displayedProducts.value = products.value.slice(
        startIndex,
        startIndex + perPage.value
      );
    };
    const fetchItems = (cb = null) => {
      loading.value = true;
      fetchSolutionCategories();
      fetchSolutionCategoryProducts();
    };
    watch(products, updateDisplayedProducts);
    watchEffect(() => {
      if (id !== "" && solution_id.value !== id) {
        currentPage.value = 1;
        solution_id.value = id ? parseInt(id) : 1;
        if (page !== "" && currentPage.value !== page) {
          currentPage.value = page ? parseInt(page) : 1;
        }
        fetchSolutionCategoryProducts();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b, _c, _d;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_LoadingData = __nuxt_component_1;
      const _component_NoSolutionData = _sfc_main$1;
      const _component_NuxtImg = _sfc_main$2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}><nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0"><div class="container d-flex align-items-center"><ol class="breadcrumb"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
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
      _push(`</li><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${pageSegment.value.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(pageSegment.value.name.toUpperCase())}`);
          } else {
            return [
              createTextVNode(toDisplayString(pageSegment.value.name.toUpperCase()), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active" aria-current="page">${ssrInterpolate(solutionCategories.value.name)}</li></ol></div></nav><div class="page-content"><div class="container">`);
      if (unref(loading) && !solutionCategories.value.length) {
        _push(ssrRenderComponent(_component_LoadingData, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((!solutionCategories.value.length && !solutionCategoriesList.value.length || !((_a = pageSegment.value) == null ? void 0 : _a.active)) && unref(loading) == false) {
        _push(ssrRenderComponent(_component_NoSolutionData, { "retry-function": fetchItems }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle(!unref(loading) && ((_b = pageSegment.value) == null ? void 0 : _b.active) || solutionCategories.value.length ? null : { display: "none" })}" class="row"><div style="${ssrRenderStyle(!unref(loading) && ((_c = pageSegment.value) == null ? void 0 : _c.active) || solutionCategories.value.length ? null : { display: "none" })}" class="col-lg-10"><div class="products mb-3"><div class="row"><div class="col-lg-12 col-md-12 mt-1"><div id="accordion-1" class="accordion" style="${ssrRenderStyle({ "width": "100%" })}"><div class="card"><div id="heading-2" class="card-header"><h2 class="card-title"><a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">${ssrInterpolate(solutionCategories.value.name)} - SOLUTION </a></h2></div><div id="collapse-2" class="collapse" aria-labelledby="heading-2" data-parent="#accordion-1" style="${ssrRenderStyle({})}"><div class="card-body"><span>${(_a2 = solutionCategories.value.description) != null ? _a2 : ""}</span></div></div></div></div></div><!--[-->`);
      ssrRenderList(solutionCategoryProducts.value, (product) => {
        _push(`<div class="col-6 col-md-2 col-lg-2 col-xl-2 image-container"><div class="product product-7 text-center"><figure class="product-media">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(product)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: ("assets" in _ctx ? _ctx.assets : unref(assets))(product.main_image_path),
                alt: product.name,
                format: "webp",
                quality: "80",
                loading: "lazy",
                class: "w-full h-auto object-cover product-image"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  src: ("assets" in _ctx ? _ctx.assets : unref(assets))(product.main_image_path),
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
        _push(`<div class="product-action-vertical"></div><div class="product-action"${ssrIncludeBooleanAttr(!product) ? " disabled" : ""}><button type="button" class="btn-product btn-cart"><span>Add to Cart</span></button></div></figure><div class="product-body"><div class="product-cat">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(product)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a22, _b2;
            if (_push2) {
              _push2(`${ssrInterpolate((_a22 = product.product_brand) == null ? void 0 : _a22.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString((_b2 = product.product_brand) == null ? void 0 : _b2.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><h3 class="product-title">`);
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
        _push(`</h3><div class="ratings-container"></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div><aside style="${ssrRenderStyle(!unref(loading) && ((_d = pageSegment.value) == null ? void 0 : _d.active) || solutionCategories.value.length ? null : { display: "none" })}" class="col-lg-2 order-lg-first mt-2"><div class="sidebar sidebar-shop sidebar-shop-solution">`);
      if (solutionCategoriesList.value.length) {
        _push(`<div class="widget widget-collapsible widget-categories"><h3 class="widget-title"><a data-toggle="collapse" href="#widget-1" role="button" aria-expanded="true" aria-controls="widget-1"> Product Categories </a></h3><div id="widget-1" class="show"><div class="widget-body"><div class="filter-items filter-items-count"><!--[-->`);
        ssrRenderList(solutionCategoriesList.value, (category2) => {
          _push(`<div class="filter-item"><div class="custom-control custom-checkbox"><input${ssrRenderAttr("id", "cat-" + category2.id)} type="checkbox" class="custom-control-input"${ssrRenderAttr("value", category2.id)}><label class="custom-control-label"${ssrRenderAttr("for", "cat-" + category2.id)}>${ssrInterpolate(category2.name)}</label></div></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="widget widget-collapsible"><div id="widget-4" class="show"><div class="widget-body">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: ("assets" in _ctx ? _ctx.assets : unref(assets))(solutionCategories.value.main_image_path),
        format: "webp",
        quality: "80",
        loading: "lazy",
        class: "w-full h-auto object-cover product-image"
      }, null, _parent));
      _push(`</div></div></div></div></aside></div></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[segment]/solutions/[id]/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-BQ2kHss1.mjs.map
