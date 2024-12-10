import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_0$1 } from './client-only-Bwxzq3Sq.mjs';
import { c as capitalizeMainWords, g as getSegment } from './functions-D-pjxz_N.mjs';
import { ref, computed, withAsyncContext, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { f as useRoute } from './server.mjs';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
import { defineStore } from 'pinia';
import { u as useAsyncData } from './asyncData-Bv9ALze0.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
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

const useProductsStore = defineStore("products", {
  state: () => ({
    isFilterLoading: false,
    checkedCategories: {},
    checkedBrands: {},
    selectedSortOption: "",
    currentPage: 1,
    perPage: 12,
    trackApiCalls: 0
  }),
  actions: {
    setIsFilterLoading(loading) {
      this.isFilterLoading = loading;
    },
    setCheckedCategories(categories) {
      this.checkedCategories = categories;
    },
    setCheckedBrands(brands) {
      this.checkedBrands = brands;
    },
    setSortOption(option) {
      this.selectedSortOption = option;
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    incrementApiCalls() {
      this.trackApiCalls++;
    },
    resetFilters() {
      this.checkedCategories = {};
      this.checkedBrands = {};
      this.selectedSortOption = "";
    }
  },
  getters: {
    getFilters() {
      return {
        categories: this.checkedCategories,
        brands: this.checkedBrands,
        sort: this.selectedSortOption,
        page: this.currentPage,
        perPage: this.perPage,
        isFilterLoading: this.isFilterLoading,
        trackApiCalls: this.trackApiCalls
      };
    }
  }
});
const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { segment, id } = route.params;
    const { api } = useAxios();
    const slug = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug];
    const category = slug[0];
    const page = slug[2];
    const productsFetched = ref(false);
    const store = useProductsStore();
    const title = ref(
      `${capitalizeMainWords(segment)} - ${capitalizeMainWords(category)}`
    );
    const category_id = ref(id ? parseInt(id) : 1);
    if (page) {
      store.setCurrentPage(parseInt(page));
    }
    const pageSegment = computed(() => {
      return getSegment(segment);
    });
    const {
      data: productsData,
      refresh: refreshProducts,
      status,
      error
    } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      `products-${category_id.value}-${store.currentPage}-${JSON.stringify(
        store.checkedCategories
      )}-${JSON.stringify(store.checkedBrands)}-${store.selectedSortOption}`,
      async () => {
        const newCheckedCategories = {
          [category_id.value]: store.checkedCategories[category_id.value] || []
        };
        store.setCheckedCategories(newCheckedCategories);
        const newCheckedBrands = {
          [category_id.value]: store.checkedBrands[category_id.value] || []
        };
        store.setCheckedBrands(newCheckedBrands);
        const response = await api.get("/api/get-products", {
          params: {
            category_id: category_id.value,
            page: store.currentPage,
            per_page: store.perPage,
            checkedCategories: store.checkedCategories,
            checkedBrands: store.checkedBrands,
            selectedSortOption: store.selectedSortOption
          }
        });
        productsFetched.value = true;
        return {
          products: response.data.products.data,
          total: response.data.products.total,
          perPage: response.data.products.per_page,
          categories: response.data.categories,
          brands: response.data.brands,
          theCategory: response.data.the_category,
          totalPages: response.data.products.last_page,
          next_page_url: response.data.products.next_page_url,
          prev_page_url: response.data.products.prev_page_url,
          links: response.data.products.links
        };
      },
      {
        server: true,
        lazy: false,
        watch: [() => store.currentPage]
      }
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title,
      meta: [
        {
          name: "description",
          content: title
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}><nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0"><div class="container d-flex align-items-center"><ol class="breadcrumb"><li class="breadcrumb-item">`);
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
      _push(`</li><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${pageSegment.value.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`${ssrInterpolate((_a2 = pageSegment.value) == null ? void 0 : _a2.name.toUpperCase())}`);
          } else {
            return [
              createTextVNode(toDisplayString((_b2 = pageSegment.value) == null ? void 0 : _b2.name.toUpperCase()), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active" aria-current="page">${ssrInterpolate((_b = (_a = unref(productsData)) == null ? void 0 : _a.theCategory) == null ? void 0 : _b.name)}</li></ol></div></nav><div class="page-content"><div class="container">`);
      if (unref(status) == "pending") {
        _push(`<div class="products mb-3 products-section"><div class="row"><!--[-->`);
        ssrRenderList(12, (n) => {
          _push(`<div class="col-6 col-md-3 col-lg-2 col-xl-2"><div class="product product-7 text-center"><div class="product-media shimmer"><div class="product-image-shimmer"></div></div><div class="product-body"><div class="product-cat"><div class="shimmer brand-shimmer"></div></div><div class="product-title"><div class="shimmer title-shimmer"></div></div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="products mb-3 products-section"${_scopeId}><div class="row"${_scopeId}><!--[-->`);
            ssrRenderList(12, (n) => {
              _push2(`<div class="col-6 col-md-3 col-lg-2 col-xl-2"${_scopeId}><div class="product product-7 text-center"${_scopeId}><div class="product-media shimmer"${_scopeId}><div class="product-image-shimmer"${_scopeId}></div></div><div class="product-body"${_scopeId}><div class="product-cat"${_scopeId}><div class="shimmer brand-shimmer"${_scopeId}></div></div><div class="product-title"${_scopeId}><div class="shimmer title-shimmer"${_scopeId}></div></div></div></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "products mb-3 products-section" }, [
                createVNode("div", { class: "row" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(12, (n) => {
                    return createVNode("div", {
                      key: n,
                      class: "col-6 col-md-3 col-lg-2 col-xl-2"
                    }, [
                      createVNode("div", { class: "product product-7 text-center" }, [
                        createVNode("div", { class: "product-media shimmer" }, [
                          createVNode("div", { class: "product-image-shimmer" })
                        ]),
                        createVNode("div", { class: "product-body" }, [
                          createVNode("div", { class: "product-cat" }, [
                            createVNode("div", { class: "shimmer brand-shimmer" })
                          ]),
                          createVNode("div", { class: "product-title" }, [
                            createVNode("div", { class: "shimmer title-shimmer" })
                          ])
                        ])
                      ])
                    ]);
                  }), 64))
                ])
              ])
            ];
          }
        })
      }, _parent));
      _push(`</div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[segment]/[id]/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-BzmwiY2p.mjs.map
