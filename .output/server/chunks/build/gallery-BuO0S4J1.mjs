import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { useSSRContext, ref, watch, watchEffect, withCtx, createVNode, unref, createTextVNode, toDisplayString, computed, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_1$1 } from './ContentState-Dkx-zL53.mjs';
import { _ as _sfc_main$2 } from './NuxtImg-CHbwr8LG.mjs';
import { a as assets } from './file-Dd0R4TFQ.mjs';
import { useRoute, useRouter } from 'vue-router';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
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
import '@headlessui/vue';
import 'axios';

const _sfc_main$1 = {
  __name: "DynamicFilters",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true
    },
    filterColumn: {
      type: String,
      required: true
    },
    filters: {
      type: Array,
      required: false,
      default: () => []
    },
    selectedFilters: {
      type: Array,
      required: false,
      default: () => []
    },
    showNumbers: {
      type: Boolean,
      default: false
    },
    searchTerm: {
      type: String,
      default: ""
    },
    classes: {
      type: String,
      default: ""
    }
  },
  emits: ["update:displayedProducts"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const selectedFilters = ref(props.selectedFilters);
    const showNumbers = ref(props.showNumbers);
    const dataRef = ref(props.items);
    const searchTerm = ref(props.searchTerm);
    const filters = ref([]);
    const titles = ref([]);
    if (props.filters.length > 0) {
      if (typeof props.filters[0] === "object") {
        filters.value = props.filters.map((filter) => Object.keys(filter)[0]);
        titles.value = props.filters.map((filter) => Object.values(filter)[0]);
      } else {
        filters.value = props.filters;
        titles.value = props.filters;
      }
    }
    computed(() => {
      var _a, _b, _c;
      if (filters.value.length) return filters.value;
      if (!((_a = props.items) == null ? void 0 : _a.length) && !((_b = filters.value) == null ? void 0 : _b.length) && !props.filterColumn)
        return [];
      if (!((_c = props.items) == null ? void 0 : _c.length) || !props.filterColumn) return [];
      filters.value = [
        ...new Set(
          props.items.map((item) => item[props.filterColumn]).filter(Boolean)
        )
      ].sort();
      titles.value = filters.value;
    });
    const getCount = (value) => {
      return props.items.filter((item) => item[props.filterColumn] === value).length;
    };
    const formatTitle = (column) => {
      return column.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };
    const handleFilterChange = () => {
      if (selectedFilters.value.length === 0) {
        dataRef.value = props.items;
      } else {
        dataRef.value = props.items.filter(
          (item) => selectedFilters.value.includes(item[props.filterColumn])
        );
      }
      if (searchTerm.value) {
        dataRef.value = dataRef.value.filter(
          (item) => {
            var _a, _b, _c;
            return ((_a = item.name) == null ? void 0 : _a.toLowerCase().includes(searchTerm.value.toLowerCase())) || ((_b = item.description) == null ? void 0 : _b.toLowerCase().includes(searchTerm.value.toLowerCase())) || ((_c = item.tags) == null ? void 0 : _c.toLowerCase().includes(searchTerm.value.toLowerCase())) || item[props.filterColumn].toLowerCase().includes(searchTerm.value.toLowerCase());
          }
        );
      }
      emit("update:displayedProducts", {
        filteredData: dataRef.value,
        selectedFilters: selectedFilters.value
      });
    };
    watch(
      () => props.searchTerm,
      (newSearchTerm) => {
        searchTerm.value = newSearchTerm;
        handleFilterChange();
      }
    );
    watch(
      () => props.items,
      (newItems) => {
        dataRef.value = newItems;
        if (selectedFilters.value.length > 0) {
          const filteredData = newItems.filter(
            (item) => selectedFilters.value.includes(item[props.filterColumn])
          );
          emit("update:displayedProducts", {
            filteredData,
            selectedFilters: selectedFilters.value
          });
        } else {
          emit("update:displayedProducts", {
            filteredData: newItems,
            selectedFilters: []
          });
        }
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (filters.value.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "filter-container" }, _attrs))} data-v-46647f62><h4 class="filter-heading" data-v-46647f62><span class="filter-icon" data-v-46647f62><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-46647f62><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" data-v-46647f62></path></svg></span> ${ssrInterpolate(formatTitle(__props.filterColumn))}</h4><div class="${ssrRenderClass([props.classes, "filter-options-container"])}" data-v-46647f62><!--[-->`);
        ssrRenderList(filters.value, (value, index) => {
          _push(`<label class="${ssrRenderClass([{ "filter-card-selected": selectedFilters.value.includes(value) }, "filter-card"])}" data-v-46647f62><input${ssrIncludeBooleanAttr(Array.isArray(selectedFilters.value) ? ssrLooseContain(selectedFilters.value, value) : selectedFilters.value) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", value)} class="filter-checkbox" data-v-46647f62><div class="filter-content" data-v-46647f62><div class="checkbox-wrapper" data-v-46647f62><div class="${ssrRenderClass([{ checked: selectedFilters.value.includes(value) }, "custom-checkbox"])}" data-v-46647f62>`);
          if (selectedFilters.value.includes(value)) {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="checkmark" data-v-46647f62><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-v-46647f62></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><span class="filter-label" data-v-46647f62>${ssrInterpolate(titles.value[index])}</span></div>`);
          if (showNumbers.value) {
            _push(`<span class="filter-count" data-v-46647f62>${ssrInterpolate(getCount(value))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></label>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DynamicFilters.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-46647f62"]]);
const _sfc_main = {
  __name: "gallery",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Gallery | Media Center",
      meta: [
        {
          name: "description",
          content: "Journey through the lens: Our story in pictures."
        }
      ]
    });
    const { api } = useAxios();
    const route = useRoute();
    useRouter();
    const currentPage = ref(route.params.page ? parseInt(route.params.page) : 1);
    ref(12);
    const totalProducts = ref(0);
    const products = ref([]);
    const category_id = ref(route.params.id ? parseInt(route.params.id) : 1);
    const displayedProducts = ref([]);
    const selectedFilters = ref([]);
    const pagination = ref({});
    const filters = ref(["CSR", "EVENT", "PROJECT"]);
    const loading = ref(false);
    const error = ref(null);
    const fetchProducts = async (url = null) => {
      loading.value = true;
      if (typeof url == "string" && url.includes("http")) {
        url = url.split("/api/").pop();
      }
      try {
        const response = await api.get(url || "/api/get-media-center-galleries", {
          params: {
            page: currentPage.value,
            // per_page: perPage.value,
            category_id: category_id.value,
            gallery_type: selectedFilters.value
          }
        });
        const data = response.data;
        products.value = data.data;
        totalProducts.value = data.total;
        pagination.value = {
          next_page_url: data.next_page_url,
          prev_page_url: data.prev_page_url,
          links: data.links
        };
        loading.value = false;
        updateDisplayedProducts(products.value);
      } catch (error2) {
        error2.value = error2;
        console.error(error2);
      } finally {
        loading.value = false;
      }
    };
    const getBlogLink = (id, name) => {
      let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
      transformedName = transformedName.replace(/-+/g, "-");
      transformedName = transformedName.replace(/^-+|-+$/g, "");
      transformedName = transformedName.toLowerCase();
      return `/media/gallery/${id}/${transformedName}`;
    };
    const updateDisplayedProducts = (filteredProducts) => {
      displayedProducts.value = filteredProducts;
    };
    const handleUpdateDisplayedProducts = ({ filteredData, selectedFilters: selectedFilters2 }) => {
      updateDisplayedProducts(filteredData);
      selectedFilters2.value = selectedFilters2;
    };
    watch(products, updateDisplayedProducts);
    watchEffect(() => {
      const params = route.params;
      const newCategoryId = params.id ? parseInt(params.id) : 1;
      const newPage = params.page ? parseInt(params.page) : 1;
      if (category_id.value !== newCategoryId || currentPage.value !== newPage) {
        category_id.value = newCategoryId;
        currentPage.value = newPage;
        fetchProducts();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DynamicFilters = __nuxt_component_1;
      const _component_ContentState = __nuxt_component_1$1;
      const _component_NuxtImg = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-b7b477b4><main class="main" data-v-b7b477b4><div class="page-content" data-v-b7b477b4><div class="container" data-v-b7b477b4><div class="row" data-v-b7b477b4><div class="col-lg-10 offset-lg-1 gallery-main-page-section" data-v-b7b477b4><h2 class="about-us-title" data-v-b7b477b4>Gallery</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "btn btn-primary btn-round btn-shadow float-right"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon-long-arrow-left" data-v-b7b477b4${_scopeId}></i><span data-v-b7b477b4${_scopeId}>Back to Media Center</span>`);
          } else {
            return [
              createVNode("i", { class: "icon-long-arrow-left" }),
              createVNode("span", null, "Back to Media Center")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="lead about-us-lead text-primary mb-3" data-v-b7b477b4> Journey Through the Lens: Our Story in Pictures </p>`);
      _push(ssrRenderComponent(_component_DynamicFilters, {
        items: products.value,
        "filter-column": "gallery_type",
        filters: filters.value,
        "onUpdate:displayedProducts": handleUpdateDisplayedProducts
      }, null, _parent));
      if (loading.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "loading",
          "content-type": "gallery"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!displayedProducts.value.length && !loading.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "empty",
          "content-type": "gallery"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!!error.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "error",
          "content-type": "gallery"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (displayedProducts.value.length) {
        _push(`<div class="row mt-2" data-v-b7b477b4><!--[-->`);
        ssrRenderList(displayedProducts.value, (product) => {
          _push(`<div class="entry-item col-sm-6 col-lg-4" data-v-b7b477b4><article class="entry entry-mask" data-v-b7b477b4><figure class="entry-media entry-gallery" data-v-b7b477b4>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: getBlogLink(product.id, product.name)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: ("assets" in _ctx ? _ctx.assets : unref(assets))(product.main_image_path),
                  alt: product.name,
                  format: "webp",
                  quality: "80",
                  loading: "lazy",
                  class: "w-full h-auto object-cover"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtImg, {
                    src: ("assets" in _ctx ? _ctx.assets : unref(assets))(product.main_image_path),
                    alt: product.name,
                    format: "webp",
                    quality: "80",
                    loading: "lazy",
                    class: "w-full h-auto object-cover"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</figure><div class="entry-body" data-v-b7b477b4><div class="entry-meta" data-v-b7b477b4><span class="meta-separator" data-v-b7b477b4>|</span></div><h2 class="entry-title" data-v-b7b477b4>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: getBlogLink(product.id, product.name)
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
          _push(`</h2><div class="entry-cats mt-1" data-v-b7b477b4><b style="${ssrRenderStyle({ "background-color": "#c02434", "padding": "5px" })}" data-v-b7b477b4>${ssrInterpolate(product.gallery_type)}</b></div></div></article></div>`);
        });
        _push(`<!--]--><div class="col-lg-12 mt-3" data-v-b7b477b4><nav aria-label="Page navigation" data-v-b7b477b4><ul class="pagination justify-content-center" data-v-b7b477b4><!--[-->`);
        ssrRenderList((_a = pagination.value) == null ? void 0 : _a.links, (page, index) => {
          _push(`<li class="${ssrRenderClass([{ active: page.active }, "page-item"])}" data-v-b7b477b4>`);
          if (page.url && Number.isInteger(Number(page.label))) {
            _push(`<a class="page-link" data-v-b7b477b4>${ssrInterpolate(page.label)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul></nav></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/gallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const gallery = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7b477b4"]]);

export { gallery as default };
//# sourceMappingURL=gallery-BuO0S4J1.mjs.map
