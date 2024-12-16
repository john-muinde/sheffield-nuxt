import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './ContentState-Dkx-zL53.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
import { ref, computed, watch, watchEffect, withCtx, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { _ as _export_sfc, k as useAxios } from './server.mjs';
import '@headlessui/vue';
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
import 'ant-design-vue';
import 'axios';

const _sfc_main = {
  __name: "in-the-news",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "In The News",
      meta: [
        {
          name: "description",
          content: "Media Spotlight: Sheffield Making Waves in the News"
        }
      ]
    });
    const route = useRoute();
    const currentPage = ref(route.params.page ? parseInt(route.params.page) : 1);
    const perPage = ref(12);
    const totalProducts = ref(0);
    const products = ref([]);
    const category_id = ref(route.params.id ? parseInt(route.params.id) : 1);
    ref([]);
    const loading = ref(false);
    const error = ref(null);
    const { api } = useAxios();
    const fetchProducts = async () => {
      loading.value = true;
      try {
        const response = await api.get("/api/get-in-the-news", {
          params: {
            page: currentPage.value,
            per_page: perPage.value,
            category_id: category_id.value
          }
        });
        products.value = response.data.data;
        totalProducts.value = response.data.total;
        loading.value = false;
      } catch (error2) {
        loading.value = false;
        error2.value = error2;
        console.error(error2);
      }
    };
    const getBlogPageLink = (page) => {
      return `/media/in-the-news/page/${page}`;
    };
    const totalPages = computed(() => {
      return Math.ceil(totalProducts.value / perPage.value);
    });
    const displayedProducts = ref([]);
    const goToPreviousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const goToNextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    const goToThisPage = (page) => {
      currentPage.value = page;
    };
    const updateDisplayedProducts = () => {
      displayedProducts.value = products.value;
    };
    const isInteger = (value) => {
      return Number.isInteger(value);
    };
    const generatePageLinks = computed(() => {
      const pageLinks = [];
      const maxVisiblePages = 5;
      if (currentPage.value > 1) {
        pageLinks.push("Prev");
      }
      let startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      for (let page = startPage; page <= endPage; page++) {
        pageLinks.push(page);
      }
      if (currentPage.value < totalPages.value) {
        pageLinks.push("Next");
      }
      return pageLinks;
    });
    watch(currentPage, fetchProducts);
    watch(products, updateDisplayedProducts);
    watchEffect(() => {
      const params = route.params;
      route.query;
      if (params.id !== "" && category_id.value !== params.id) {
        currentPage.value = 1;
        category_id.value = params.id ? parseInt(params.id) : 1;
        if (params.page !== "" && currentPage.value !== params.page) {
          currentPage.value = params.page ? parseInt(params.page) : 1;
        }
        fetchProducts();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentState = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-7d7e4fe1><main class="main" data-v-7d7e4fe1><div class="page-content" data-v-7d7e4fe1><div class="container" data-v-7d7e4fe1><div class="row" data-v-7d7e4fe1><div class="col-lg-10 offset-lg-1 in-the-news-section" data-v-7d7e4fe1><h2 class="about-us-title" data-v-7d7e4fe1>In the News</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "btn btn-primary btn-round btn-shadow float-right"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon-long-arrow-left" data-v-7d7e4fe1${_scopeId}></i><span data-v-7d7e4fe1${_scopeId}>Back to Media Center</span>`);
          } else {
            return [
              createVNode("i", { class: "icon-long-arrow-left" }),
              createVNode("span", null, "Back to Media Center")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="lead about-us-lead text-primary mb-3" data-v-7d7e4fe1> Media Spotlight: Sheffield Making Waves in the News </p>`);
      if (loading.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "loading",
          "content-type": "Articles In The News"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!displayedProducts.value.length && !loading.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "empty",
          "content-type": "Our articles In The News"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!!error.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "error",
          "content-type": "Articles In The News"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (displayedProducts.value.length) {
        _push(`<div class="row justify-content-left" data-v-7d7e4fe1><!--[-->`);
        ssrRenderList(displayedProducts.value, (product) => {
          _push(`<div class="col-12 col-md-6 col-lg-4 mb-2 blog-item" data-v-7d7e4fe1><div class="p-6 border rounded" data-v-7d7e4fe1><div class="position-relative mb-2" style="${ssrRenderStyle({ "height": "216px" })}" data-v-7d7e4fe1><a target="_blank" class="float-center"${ssrRenderAttr("href", product.url)} data-v-7d7e4fe1><img class="w-100 h-100 rounded" style="${ssrRenderStyle({ "object-fit": "cover" })}"${ssrRenderAttr("src", ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(product.main_image_path))}${ssrRenderAttr("alt", product.name)} data-v-7d7e4fe1></a></div><a target="_blank" class="btn btn-primary ml-5 pl-4 mt-2 mb-2 float-center" style="${ssrRenderStyle({ "color": "white" })}"${ssrRenderAttr("href", product.url)} data-v-7d7e4fe1> Read More <i class="icon-long-arrow-right" data-v-7d7e4fe1></i></a></div></div>`);
        });
        _push(`<!--]--><div class="col-lg-12 blogs mt-3" data-v-7d7e4fe1><nav aria-label="Page navigation" data-v-7d7e4fe1><ul class="pagination justify-content-center" data-v-7d7e4fe1><li class="${ssrRenderClass([{
          disabled: currentPage.value === 1
        }, "page-item"])}" data-v-7d7e4fe1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "page-link page-link-prev",
          to: getBlogPageLink(currentPage.value - 1),
          "aria-label": "Previous",
          tabindex: "-1",
          "aria-disabled": "true",
          onClick: goToPreviousPage
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span aria-hidden="true" data-v-7d7e4fe1${_scopeId}><i class="icon-long-arrow-left" data-v-7d7e4fe1${_scopeId}></i></span> Prev `);
            } else {
              return [
                createVNode("span", { "aria-hidden": "true" }, [
                  createVNode("i", { class: "icon-long-arrow-left" })
                ]),
                createTextVNode(" Prev ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><!--[-->`);
        ssrRenderList(generatePageLinks.value, (page) => {
          _push(`<li class="${ssrRenderClass([{
            active: page === currentPage.value
          }, "page-item"])}" data-v-7d7e4fe1>`);
          if (isInteger(page)) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              class: "page-link",
              to: getBlogPageLink(page),
              onClick: ($event) => goToThisPage(page)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(page)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(page), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--><li class="page-item-total" data-v-7d7e4fe1>of ${ssrInterpolate(totalPages.value)}</li><li class="${ssrRenderClass([{
          disabled: currentPage.value === totalPages.value
        }, "page-item"])}" data-v-7d7e4fe1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "page-link page-link-next",
          to: getBlogPageLink(currentPage.value + 1),
          "aria-label": "Next",
          onClick: goToNextPage
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next <span aria-hidden="true" data-v-7d7e4fe1${_scopeId}><i class="icon-long-arrow-right" data-v-7d7e4fe1${_scopeId}></i></span>`);
            } else {
              return [
                createTextVNode(" Next "),
                createVNode("span", { "aria-hidden": "true" }, [
                  createVNode("i", { class: "icon-long-arrow-right" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></nav></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/in-the-news.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const inTheNews = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d7e4fe1"]]);

export { inTheNews as default };
//# sourceMappingURL=in-the-news-C9mQLiXJ.mjs.map
