import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_0$1 } from './client-only-Bwxzq3Sq.mjs';
import { f as useRoute, u as useRouter, k as useAxios, l as getSegment, g as getProductLink } from './server.mjs';
import { nextTick, defineComponent, ref, computed, withAsyncContext, mergeProps, withCtx, createTextVNode, toDisplayString, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useSeoMeta, a as useMetaGenerator } from './metaGenerator-Tue2Ui9B.mjs';
import { defineStore } from 'pinia';
import { u as useAsyncData } from './asyncData-BBLQfHDv.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
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
import 'ant-design-vue';
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
      this.$patch((state) => {
        state.isFilterLoading = loading;
      });
    },
    setCheckedCategories(categories) {
      this.$patch((state) => {
        state.checkedCategories = { ...categories };
      });
    },
    async addCategoryFilter(categoryId, filterId) {
      this.$patch((state) => {
        if (!state.checkedCategories[categoryId]) {
          state.checkedCategories[categoryId] = [];
        }
        if (!state.checkedCategories[categoryId].includes(filterId)) {
          state.checkedCategories[categoryId] = [
            ...state.checkedCategories[categoryId],
            filterId
          ];
        }
      });
    },
    async removeCategoryFilter(categoryId, filterId) {
      this.$patch((state) => {
        if (state.checkedCategories[categoryId]) {
          state.checkedCategories[categoryId] = state.checkedCategories[categoryId].filter((id) => id !== filterId);
        }
      });
    },
    setCheckedBrands(brands) {
      this.$patch((state) => {
        state.checkedBrands = { ...brands };
      });
    },
    async addBrandFilter(categoryId, brandId) {
      this.$patch((state) => {
        if (!state.checkedBrands[categoryId]) {
          state.checkedBrands[categoryId] = [];
        }
        if (!state.checkedBrands[categoryId].includes(brandId)) {
          state.checkedBrands[categoryId] = [
            ...state.checkedBrands[categoryId],
            brandId
          ];
        }
      });
    },
    async removeBrandFilter(categoryId, brandId) {
      this.$patch((state) => {
        if (state.checkedBrands[categoryId]) {
          state.checkedBrands[categoryId] = state.checkedBrands[categoryId].filter((id) => id !== brandId);
        }
      });
    },
    setSortOption(option) {
      this.$patch((state) => {
        state.selectedSortOption = option;
      });
    },
    setCurrentPage(page) {
      this.$patch((state) => {
        state.currentPage = page;
      });
    },
    incrementApiCalls() {
      this.$patch((state) => {
        state.trackApiCalls++;
      });
    },
    resetFilters() {
      this.$patch((state) => {
        state.checkedCategories = {};
        state.checkedBrands = {};
        state.selectedSortOption = "";
        state.currentPage = 1;
      });
    },
    async applyFilters(categoryId, router, createPageLink) {
      if (this.isFilterLoading) return;
      this.setIsFilterLoading(true);
      try {
        await Promise.all([
          this.setCurrentPage(1),
          router.push(createPageLink("page=1"))
        ]);
        this.incrementApiCalls();
      } catch (error) {
        console.error("Error applying filters:", error);
      } finally {
        await nextTick();
        this.setIsFilterLoading(false);
      }
    }
  },
  getters: {
    getFilters: (state) => ({
      ...state,
      checkedCategories: state.checkedCategories,
      checkedBrands: state.checkedBrands
    }),
    hasActiveFilters: (state) => {
      const hasCategories = Object.values(state.checkedCategories).some(
        (cats) => cats.length > 0
      );
      const hasBrands = Object.values(state.checkedBrands).some(
        (brands) => brands.length > 0
      );
      return hasCategories || hasBrands || !!state.selectedSortOption;
    },
    getActiveCategoryFilters: (state) => (categoryId) => {
      return [...state.checkedCategories[categoryId] || []];
    },
    getActiveBrandFilters: (state) => (categoryId) => {
      return [...state.checkedBrands[categoryId] || []];
    },
    getCurrentPageFilters: (state) => ({
      page: state.currentPage,
      perPage: state.perPage
    })
  }
});
const useProductsPageSEO = (pageData, segment) => {
  const route = useRoute();
  const {
    generateSeoMeta,
    generateHeadInput,
    generateContentMetaTags,
    config
  } = useMetaGenerator();
  const getMetaDescription = () => {
    var _a, _b, _c, _d;
    const brandNames = (_b = (_a = pageData.value) == null ? void 0 : _a.brands) == null ? void 0 : _b.map((b) => {
      var _a2;
      return (_a2 = b.product_brand) == null ? void 0 : _a2.name;
    }).filter(Boolean).slice(0, 3).join(", ");
    const categoryName = (_d = (_c = pageData.value) == null ? void 0 : _c.theCategory) == null ? void 0 : _d.name;
    const segmentName = segment == null ? void 0 : segment.name;
    return `Explore our selection of ${categoryName} products in the ${segmentName} category. 
            Browse top brands like ${brandNames} and more. 
            Professional ${segmentName.toLowerCase()} solutions by Sheffield Steel Systems in East Africa.`;
  };
  const metaTags = computed(
    () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      return generateContentMetaTags({
        type: "productList",
        content: {
          name: `${(_b = (_a = pageData.value) == null ? void 0 : _a.theCategory) == null ? void 0 : _b.name} - ${segment == null ? void 0 : segment.name} Products`,
          description: getMetaDescription(),
          keywords: `${segment == null ? void 0 : segment.keywords}, 
                  ${(_d = (_c = pageData.value) == null ? void 0 : _c.theCategory) == null ? void 0 : _d.name}, 
                  ${(_f = (_e = pageData.value) == null ? void 0 : _e.brands) == null ? void 0 : _f.map((b) => {
            var _a2;
            return (_a2 = b.product_brand) == null ? void 0 : _a2.name;
          }).join(", ")},
                  ${(_h = (_g = pageData.value) == null ? void 0 : _g.products) == null ? void 0 : _h.map((p) => p.name).join(", ")}`,
          main_image_path: (_k = (_j = (_i = pageData.value) == null ? void 0 : _i.products) == null ? void 0 : _j[0]) == null ? void 0 : _k.main_image_path
        }
      });
    }
  );
  const productListSchema = computed(() => {
    var _a, _b, _c, _d, _e;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${(_b = (_a = pageData.value) == null ? void 0 : _a.theCategory) == null ? void 0 : _b.name} Products by Sheffield Steel Systems`,
      description: getMetaDescription(),
      numberOfItems: ((_c = pageData.value) == null ? void 0 : _c.total) || 0,
      itemListElement: ((_e = (_d = pageData.value) == null ? void 0 : _d.products) == null ? void 0 : _e.map((product, index) => {
        var _a2, _b2, _c2;
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
            category: (_c2 = (_b2 = pageData.value) == null ? void 0 : _b2.theCategory) == null ? void 0 : _c2.name,
            description: product.description || `Professional ${product.name} by Sheffield Steel Systems`,
            manufacturer: {
              "@type": "Organization",
              name: "Sheffield Steel Systems",
              "@id": "https://sheffieldafrica.com/#organization"
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "Sheffield Steel Systems",
                "@id": "https://sheffieldafrica.com/#organization"
              }
            }
          }
        };
      })) || []
    };
  });
  const breadcrumbSchema = computed(() => {
    var _a, _b;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": config.url,
            name: "Home"
          }
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@id": `${config.url}/${segment == null ? void 0 : segment.slug}`,
            name: segment == null ? void 0 : segment.name
          }
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@id": config.url + route.fullPath,
            name: (_b = (_a = pageData.value) == null ? void 0 : _a.theCategory) == null ? void 0 : _b.name
          }
        }
      ]
    };
  });
  const filterSchema = computed(() => {
    var _a, _b, _c, _d, _e, _f;
    return {
      "@context": "https://schema.org",
      "@type": "FilterList",
      name: `Filters for ${(_b = (_a = pageData.value) == null ? void 0 : _a.theCategory) == null ? void 0 : _b.name}`,
      itemListElement: [
        {
          "@type": "FilterSection",
          name: "Categories",
          filterOptions: (_d = (_c = pageData.value) == null ? void 0 : _c.categories) == null ? void 0 : _d.map((cat) => ({
            "@type": "FilterOption",
            name: cat.name,
            value: cat.id
          }))
        },
        {
          "@type": "FilterSection",
          name: "Brands",
          filterOptions: (_f = (_e = pageData.value) == null ? void 0 : _e.brands) == null ? void 0 : _f.map((brand) => {
            var _a2, _b2;
            return {
              "@type": "FilterOption",
              name: (_a2 = brand.product_brand) == null ? void 0 : _a2.name,
              value: (_b2 = brand.product_brand) == null ? void 0 : _b2.id
            };
          })
        }
      ]
    };
  });
  return {
    metaTags,
    productListSchema,
    breadcrumbSchema,
    filterSchema
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { generateSeoMeta, generateHeadInput } = useMetaGenerator();
    const route = useRoute();
    useRouter();
    const { segment, id } = route.params;
    const { api } = useAxios();
    const store = useProductsStore();
    const slug = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug];
    const [category, , page] = slug;
    const productsFetched = ref(false);
    const category_id = ref(id ? parseInt(id) : 1);
    {
      if (page) {
        store.setCurrentPage(parseInt(page));
      }
      store.resetFilters();
    }
    const pageSegment = computed(() => getSegment(segment));
    const {
      data: productsData,
      refresh: refreshProducts,
      error,
      status
    } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      `products-${category_id.value}-${store.currentPage}`,
      async () => {
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
        immediate: true
      }
    )), __temp = await __temp, __restore(), __temp);
    const { metaTags, productListSchema, breadcrumbSchema, filterSchema } = useProductsPageSEO(productsData, pageSegment.value);
    const createPageLink = (page2) => {
      const label = page2 == null ? void 0 : page2.split("page=")[1];
      return page2 ? `/${segment}/${id}/${category}/page/${label}` : `/${segment}/${id}/${category}`;
    };
    useHead(() => {
      var _a, _b, _c, _d, _e;
      return {
        ...generateHeadInput(route, [
          productListSchema.value,
          breadcrumbSchema.value,
          filterSchema.value
        ]),
        title: ((_b = (_a = productsData.value) == null ? void 0 : _a.theCategory) == null ? void 0 : _b.name) ? `${productsData.value.theCategory.name} - ${(_c = pageSegment.value) == null ? void 0 : _c.name} Products` : "Products",
        link: [
          ...((_d = productsData.value) == null ? void 0 : _d.prev_page_url) ? [
            {
              rel: "prev",
              href: createPageLink(productsData.value.prev_page_url)
            }
          ] : [],
          ...((_e = productsData.value) == null ? void 0 : _e.next_page_url) ? [
            {
              rel: "next",
              href: createPageLink(productsData.value.next_page_url)
            }
          ] : []
        ]
      };
    });
    useSeoMeta(generateSeoMeta(metaTags.value, route));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
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
        to: `/${(_a = pageSegment.value) == null ? void 0 : _a.slug}`
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
      _push(`</li><li class="breadcrumb-item active" aria-current="page">${ssrInterpolate((_c = (_b = unref(productsData)) == null ? void 0 : _b.theCategory) == null ? void 0 : _c.name)}</li></ol></div></nav><div class="page-content"><div class="container">`);
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
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[segment]/[id]/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-yngk8GtF.mjs.map
