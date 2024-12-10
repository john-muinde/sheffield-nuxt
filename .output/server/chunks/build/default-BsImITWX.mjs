import { _ as __nuxt_component_0$1 } from './client-only-Bwxzq3Sq.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as _imports_1$1, a as _sfc_main$5 } from './virtual_public-50URkQ8a.mjs';
import { ref, computed, watchEffect, mergeProps, unref, useSSRContext, reactive, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, createTextVNode, toDisplayString, withAsyncContext, watch } from 'vue';
import { f as useRoute, B as useAuthStore, _ as _export_sfc } from './server.mjs';
import { g as getSegment, d as getProductLink } from './functions-D-pjxz_N.mjs';
import { a as assets } from './file-Dd0R4TFQ.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { useRoute as useRoute$1 } from 'vue-router';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
import { u as useAsyncData } from './asyncData-Bv9ALze0.mjs';
import { ChevronDown } from 'lucide-vue-next';
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
import 'pinia';
import 'unhead';
import 'consola/core';
import 'nuxt-site-config/urls';
import 'ipx';
import 'axios';

publicAssetsURL("/assets/images/menu-icons/consultancy-&-design.png");
const _sfc_main$4 = {
  __name: "navbar",
  __ssrInlineRender: true,
  setup(__props) {
    useAxios();
    const route = useRoute$1();
    const store = useAuthStore();
    computed(() => {
      return route.path.includes("/consultancy-and-design");
    });
    const user = computed(() => store.user);
    reactive([]);
    const query = ref("");
    const results = ref([]);
    const showResults = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_CartComponent = _sfc_main$5;
      _push(`<!--[--><div data-v-a0891196><header class="header header-14 sticky-header fixed custom" data-v-a0891196><div class="header-top header-top-color" data-v-a0891196><div class="container" data-v-a0891196><div class="header-left" data-v-a0891196><a href="tel:+254713777111" data-v-a0891196><i class="icon-phone" data-v-a0891196></i>+254 713 777 111</a><a class="ml-5" href="mailto:info@sheffieldafrica.com" data-v-a0891196><i class="icon-envelope" data-v-a0891196></i> info@sheffieldafrica.com</a></div><div class="header-right d-none d-lg-block" data-v-a0891196><ul class="top-menu" data-v-a0891196><li data-v-a0891196><a href="#" data-v-a0891196>Links</a><ul class="menus" data-v-a0891196>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(4, (n) => {
              _push2(`<li class="h-[20px] bg-gray-200 rounded animate-pulse" data-v-a0891196${_scopeId}><div class="flex items-center h-full px-2" data-v-a0891196${_scopeId}><div class="w-[40px] h-5 bg-gray-300 rounded mr-2" data-v-a0891196${_scopeId}></div><div class="flex-1 h-4 bg-gray-300 rounded" data-v-a0891196${_scopeId}></div></div></li>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(4, (n) => {
                return createVNode("li", {
                  key: n,
                  class: "h-[20px] bg-gray-200 rounded animate-pulse"
                }, [
                  createVNode("div", { class: "flex items-center h-full px-2" }, [
                    createVNode("div", { class: "w-[40px] h-5 bg-gray-300 rounded mr-2" }),
                    createVNode("div", { class: "flex-1 h-4 bg-gray-300 rounded" })
                  ])
                ]);
              }), 64))
            ];
          }
        })
      }, _parent));
      _push(`</ul></li></ul></div></div></div><div class="header-middle" data-v-a0891196><div class="container-fluid" data-v-a0891196><div class="row" data-v-a0891196><div class="col-auto col-lg-3 col-xl-3" data-v-a0891196>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1$1)} alt="Sheffield Logo" width="190" height="auto" data-v-a0891196${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1$1,
                alt: "Sheffield Logo",
                width: "190",
                height: "auto"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col col-lg-9 col-xl-9 header-middle-right" data-v-a0891196><div class="row" data-v-a0891196><div class="col-lg-8 d-none d-lg-block" data-v-a0891196><div class="header-search header-search-extended header-search-visible header-search-no-radius" data-v-a0891196><a href="#" class="search-toggle" role="button" data-v-a0891196><i class="icon-search" data-v-a0891196></i></a><form action="#" method="get" data-v-a0891196><div class="header-search-wrapper search-wrapper-wide searchListMainDiv" data-v-a0891196><label for="q" class="sr-only" data-v-a0891196>Search</label><input id="q"${ssrRenderAttr("value", query.value)} type="search" class="form-control" name="q" placeholder="Search product ..." autocomplete="off" required data-v-a0891196>`);
      if (showResults.value) {
        _push(`<ul class="" data-v-a0891196><!--[-->`);
        ssrRenderList(results.value, (result) => {
          _push(`<li data-v-a0891196>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(result)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img style="${ssrRenderStyle({ "display": "inline", "height": "28px" })}"${ssrRenderAttr("src", ("assets" in _ctx ? _ctx.assets : unref(assets))(result.main_image_path))} class="rounded profile-img" alt="" data-v-a0891196${_scopeId}> ${ssrInterpolate(result.name)}`);
              } else {
                return [
                  createVNode("img", {
                    style: { "display": "inline", "height": "28px" },
                    src: ("assets" in _ctx ? _ctx.assets : unref(assets))(result.main_image_path),
                    class: "rounded profile-img",
                    alt: ""
                  }, null, 8, ["src"]),
                  createTextVNode(" " + toDisplayString(result.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="btn btn-primary" type="submit" data-v-a0891196><i class="icon-search" data-v-a0891196></i></button></div></form></div></div><div class="col-lg-4 d-flex justify-content-end align-items-center" data-v-a0891196><div class="header-dropdown-link" data-v-a0891196><div class="dropdown compare-dropdown" data-v-a0891196>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/my-account",
        class: "dropdown-toggle",
        role: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        "data-display": "static",
        title: "Compare Products",
        "aria-label": "Compare Products"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon-user" data-v-a0891196${_scopeId}></i><span class="compare-txt" data-v-a0891196${_scopeId}>Account</span>`);
          } else {
            return [
              createVNode("i", { class: "icon-user" }),
              createVNode("span", { class: "compare-txt" }, "Account")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="dropdown-menu dropdown-menu-right" data-v-a0891196><ul class="compare-products" data-v-a0891196>`);
      if (!((_a = user.value) == null ? void 0 : _a.name)) {
        _push(`<li class="compare-product login" data-v-a0891196>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "btn-remove"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="icon-arrow-right" data-v-a0891196${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "icon-arrow-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` LOG IN `);
            } else {
              return [
                createTextVNode(" LOG IN ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (!((_b = user.value) == null ? void 0 : _b.name)) {
        _push(`<li class="compare-product" data-v-a0891196>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/register",
          class: "btn-remove"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="icon-arrow-right" data-v-a0891196${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "icon-arrow-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h4 class="compare-product-title" data-v-a0891196>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/register" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` REGISTER `);
            } else {
              return [
                createTextVNode(" REGISTER ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h4></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul><div class="compare-actions" data-v-a0891196><a href="javascript:void(0)" class="btn btn-outline-primary-2" data-v-a0891196><span data-v-a0891196>Logout</span><i class="icon-long-arrow-right" data-v-a0891196></i></a></div></div></div>`);
      _push(ssrRenderComponent(_component_CartComponent, null, null, _parent));
      _push(`</div></div></div></div></div></div></div></header></div><div class="mobile-menu-overlay" data-v-a0891196></div><div class="mobile-menu-container" data-v-a0891196><div class="mobile-menu-wrapper" data-v-a0891196><span class="mobile-menu-close" data-v-a0891196><i class="icon-close" data-v-a0891196></i></span><form action="#" method="get" class="mobile-search" data-v-a0891196><label for="mobile-search" class="sr-only" data-v-a0891196>Search</label><input id="mobile-search" type="search" class="form-control" name="mobile-search" placeholder="Search in..." required data-v-a0891196><button class="btn btn-primary" type="submit" data-v-a0891196><i class="icon-search" data-v-a0891196></i></button></form><div class="social-icons" data-v-a0891196><a href="https://www.facebook.com/SheffieldAfricaFacilitySolutions" class="social-icon" target="_blank" title="Facebook" data-v-a0891196><i class="icon-facebook-f" data-v-a0891196></i></a><a href="https://twitter.com/sheffield_afric/" class="social-icon" target="_blank" title="Twitter" data-v-a0891196><i class="icon-twitter" data-v-a0891196></i></a><a href="https://www.instagram.com/sheffieldafrica/" class="social-icon" target="_blank" title="Instagram" data-v-a0891196><i class="icon-instagram" data-v-a0891196></i></a><a href="https://www.youtube.com/channel/UCK-oWPdQazenIHndl4zABew" class="social-icon" target="_blank" title="Youtube" data-v-a0891196><i class="icon-youtube" data-v-a0891196></i></a><a href="https://www.facebook.com/SheffieldAfricaFacilitySolutions" class="social-icon" target="_blank" title="Facebook" data-v-a0891196><i class="icon-facebook-f" data-v-a0891196></i></a><a href="https://twitter.com/sheffield_afric/" class="social-icon" target="_blank" title="Twitter" data-v-a0891196><i class="icon-twitter" data-v-a0891196></i></a><a href="https://www.instagram.com/sheffieldafrica/" class="social-icon" target="_blank" title="Instagram" data-v-a0891196><i class="icon-instagram" data-v-a0891196></i></a><a href="https://www.youtube.com/channel/UCK-oWPdQazenIHndl4zABew" class="social-icon" target="_blank" title="Youtube" data-v-a0891196><i class="icon-youtube" data-v-a0891196></i></a></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/navbar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-a0891196"]]);
const _sfc_main$3 = {
  __name: "TopMenu",
  __ssrInlineRender: true,
  props: {
    segment: {
      type: Object,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    useRoute();
    const { api } = useAxios();
    ref(false);
    const arr = ref([
      {
        id: 24343434,
        name: "Consultancy & Design",
        url: "/consultancy-and-design"
      }
    ]);
    const {
      data: mainCategories,
      pending,
      error,
      refresh
    } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      `categories-${props.segment.id}`,
      async () => {
        if (!props.segment.id) {
          return [];
        }
        const { data } = await api.get(
          `/api/get-main-categories/${props.segment.id}`
        );
        arr.value.unshift(...data.data);
        return arr.value;
      },
      {
        server: true,
        lazy: false
      }
    )), __temp = await __temp, __restore(), __temp);
    watch(
      () => props.segment,
      () => {
        refresh();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<!--[-->`);
      if (unref(error)) {
        _push(`<div class="container mx-auto px-4" data-v-18e58d9c><div class="flex items-center justify-center p-4 bg-red-50 rounded-lg" data-v-18e58d9c><div class="text-center" data-v-18e58d9c><p class="text-red-600 mb-2" data-v-18e58d9c>Unable to load categories</p><button class="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors" data-v-18e58d9c> Retry </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto px-4 mt-5" data-v-18e58d9c${_scopeId}><div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" data-v-18e58d9c${_scopeId}><!--[-->`);
            ssrRenderList(6, (n) => {
              _push2(`<div class="h-[33px] bg-gray-200 rounded animate-pulse" data-v-18e58d9c${_scopeId}><div class="flex items-center h-full px-2" data-v-18e58d9c${_scopeId}><div class="w-[15%] h-5 bg-gray-300 rounded mr-2" data-v-18e58d9c${_scopeId}></div><div class="flex-1 h-4 bg-gray-300 rounded" data-v-18e58d9c${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto px-4 mt-5" }, [
                createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(6, (n) => {
                    return createVNode("div", {
                      key: n,
                      class: "h-[33px] bg-gray-200 rounded animate-pulse"
                    }, [
                      createVNode("div", { class: "flex items-center h-full px-2" }, [
                        createVNode("div", { class: "w-[15%] h-5 bg-gray-300 rounded mr-2" }),
                        createVNode("div", { class: "flex-1 h-4 bg-gray-300 rounded" })
                      ])
                    ]);
                  }), 64))
                ])
              ])
            ];
          }
        })
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TopMenu.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-18e58d9c"]]);
const _sfc_main$2 = {
  __name: "mobile-menu",
  __ssrInlineRender: true,
  setup(__props) {
    useAxios();
    const isMenuActive = ref(false);
    const closeMenu = () => {
      isMenuActive.value = false;
      (void 0).body.classList.remove("mmenu-active");
      const targetElement = (void 0).querySelector(".the_main_div");
      targetElement.classList.remove("mmenu-active");
    };
    const toggleSubMenu = (event) => {
      event.preventDefault();
      const parentLi = event.target.closest("li");
      parentLi.classList.toggle("show");
      const otherOpenLis = (void 0).querySelectorAll(".mobile-menu > li.show");
      otherOpenLis.forEach((li) => {
        if (li !== parentLi) {
          li.classList.remove("show");
        }
      });
    };
    const mainKitchenSolutions = ref([]);
    const mainLaundrySolutions = ref([]);
    const mainColdRoomSolutions = ref([]);
    const mainPromotionalSolutions = ref([]);
    const mainKitchenCategories = ref([]);
    const mainLaundryCategories = ref([]);
    const mainColdRoomCategories = ref([]);
    const mainPromotionalCategories = ref([]);
    const promotionExists = computed(() => mainPromotionalCategories.value.length > 0);
    const generateLink = (basePath, id, name) => {
      const transformedName = name.toLowerCase().replace(/-/g, " ").replace(/[\s/]+/g, "-").replace(/^-+|-+$/g, "");
      return `${basePath}/${id}/${transformedName}`;
    };
    const getSolutionKitchenLink = (id, name) => generateLink("/commercial-kitchen/solutions", id, name);
    const getSolutionLaundryLink = (id, name) => generateLink("/laundry/solutions", id, name);
    const getSolutionColdRoomLink = (id, name) => generateLink("/cold-storage/solutions", id, name);
    const getSolutionPromotionalLink = (id, name) => generateLink("/promotional-solutions", id, name);
    const getKitchenCategoryLink = (id, name) => generateLink("/commercial-kitchen", id, name);
    const getLaundryCategoryLink = (id, name) => generateLink("/laundry", id, name);
    const getColdRoomCategoryLink = (id, name) => generateLink("/cold-storage", id, name);
    const getPromotionalCategoryLink = (id, name) => generateLink("/promotional-solutions", id, name);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<!--[--><div class="mobile-menu-overlay" data-v-687cbdb6></div><div class="${ssrRenderClass([{ "active": isMenuActive.value }, "mobile-menu-container"])}" data-v-687cbdb6><div class="mobile-menu-wrapper" data-v-687cbdb6><span class="mobile-menu-close mobile-menu-toggler" data-v-687cbdb6><i class="icon-close" data-v-687cbdb6></i></span><ul class="nav nav-pills-mobile" role="tablist" data-v-687cbdb6><li class="nav-item" data-v-687cbdb6><a id="mobile-menu-link" class="nav-link active" data-toggle="tab" href="#mobile-menu-tab" role="tab" aria-controls="mobile-menu-tab" aria-selected="true" data-v-687cbdb6>Menu</a></li><li class="nav-item" data-v-687cbdb6><a id="mobile-cats-link" class="nav-link" data-toggle="tab" href="#mobile-cats-tab" role="tab" aria-controls="mobile-cats-tab" aria-selected="false" data-v-687cbdb6>Solutions</a></li></ul><div class="tab-content" data-v-687cbdb6><div id="mobile-menu-tab" class="tab-pane fade show active" role="tabpanel" aria-labelledby="mobile-menu-link" data-v-687cbdb6><nav class="mobile-nav" data-v-687cbdb6><ul class="mobile-menu" data-v-687cbdb6><li class="active" data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/commercial-kitchen",
        class: "sf-with-ul"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kitchen `);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: "chevron-icon",
              onClick: ($event) => toggleSubMenu($event)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Kitchen "),
              createVNode(unref(ChevronDown), {
                class: "chevron-icon",
                onClick: ($event) => toggleSubMenu($event)
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="submenu" data-v-687cbdb6><!--[-->`);
      ssrRenderList(mainKitchenCategories.value, (category) => {
        _push(`<li data-v-687cbdb6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: getKitchenCategoryLink(
            category.id,
            category.name
          ),
          onClick: closeMenu
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
        _push(`</li>`);
      });
      _push(`<!--]--></ul></li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/laundry",
        class: "sf-with-ul"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` LAUNDRY &amp; FLOOR CLEANING `);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: "chevron-icon",
              onClick: ($event) => toggleSubMenu($event)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" LAUNDRY & FLOOR CLEANING "),
              createVNode(unref(ChevronDown), {
                class: "chevron-icon",
                onClick: ($event) => toggleSubMenu($event)
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="submenu" data-v-687cbdb6><!--[-->`);
      ssrRenderList(mainLaundryCategories.value, (category) => {
        _push(`<li data-v-687cbdb6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: getLaundryCategoryLink(
            category.id,
            category.name
          ),
          onClick: closeMenu
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
        _push(`</li>`);
      });
      _push(`<!--]--></ul></li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cold-storage",
        class: "sf-with-ul"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cold Storage `);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: "chevron-icon",
              onClick: ($event) => toggleSubMenu($event)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Cold Storage "),
              createVNode(unref(ChevronDown), {
                class: "chevron-icon",
                onClick: ($event) => toggleSubMenu($event)
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="submenu" data-v-687cbdb6><!--[-->`);
      ssrRenderList(mainColdRoomCategories.value, (category) => {
        _push(`<li data-v-687cbdb6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: getColdRoomCategoryLink(
            category.id,
            category.name
          ),
          onClick: closeMenu
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
        _push(`</li>`);
      });
      _push(`<!--]--></ul></li>`);
      if (promotionExists.value) {
        _push(`<li data-v-687cbdb6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/promotional-solutions",
          class: "sf-with-ul"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Promotions `);
              _push2(ssrRenderComponent(unref(ChevronDown), {
                class: "chevron-icon",
                onClick: ($event) => toggleSubMenu($event)
              }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" Promotions "),
                createVNode(unref(ChevronDown), {
                  class: "chevron-icon",
                  onClick: ($event) => toggleSubMenu($event)
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<ul class="submenu" data-v-687cbdb6><!--[-->`);
        ssrRenderList(mainPromotionalCategories.value, (category) => {
          _push(`<li data-v-687cbdb6>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: getPromotionalCategoryLink(
              category.id,
              category.name
            ),
            onClick: closeMenu
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
          _push(`</li>`);
        });
        _push(`<!--]--></ul></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/consultancy-and-design",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Consultancy &amp; Design `);
          } else {
            return [
              createTextVNode(" Consultancy & Design ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about-us",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About Us `);
          } else {
            return [
              createTextVNode(" About Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about-us/sheffield-advantage",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sheffield Advantages `);
          } else {
            return [
              createTextVNode(" Sheffield Advantages ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/projects",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Project References `);
          } else {
            return [
              createTextVNode(" Project References ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/events",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Events `);
          } else {
            return [
              createTextVNode(" Events ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/careers",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Careers `);
          } else {
            return [
              createTextVNode(" Careers ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/faq",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` FAQ `);
          } else {
            return [
              createTextVNode(" FAQ ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Media Center `);
          } else {
            return [
              createTextVNode(" Media Center ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact-us",
        class: "sf-with-ul",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact us `);
          } else {
            return [
              createTextVNode(" Contact us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav></div><div id="mobile-cats-tab" class="tab-pane fade" role="tabpanel" aria-labelledby="mobile-cats-link" data-v-687cbdb6><nav class="mobile-cats-nav" data-v-687cbdb6><ul class="mobile-menu" data-v-687cbdb6><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/commercial-kitchen",
        class: "sf-with-ul"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` KITCHEN SOLUTIONS `);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: "chevron-icon",
              onClick: ($event) => toggleSubMenu($event)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" KITCHEN SOLUTIONS "),
              createVNode(unref(ChevronDown), {
                class: "chevron-icon",
                onClick: ($event) => toggleSubMenu($event)
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="submenu" data-v-687cbdb6><!--[-->`);
      ssrRenderList(mainKitchenSolutions.value, (solution) => {
        _push(`<li data-v-687cbdb6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: getSolutionKitchenLink(
            solution.id,
            solution.name
          ),
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(solution.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(solution.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/laundry",
        class: "sf-with-ul"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` LAUNDRY &amp; FLOOR CLEANING SOLUTIONS `);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: "chevron-icon",
              onClick: ($event) => toggleSubMenu($event)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" LAUNDRY & FLOOR CLEANING SOLUTIONS "),
              createVNode(unref(ChevronDown), {
                class: "chevron-icon",
                onClick: ($event) => toggleSubMenu($event)
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="submenu" data-v-687cbdb6><!--[-->`);
      ssrRenderList(mainLaundrySolutions.value, (solution) => {
        _push(`<li data-v-687cbdb6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: getSolutionLaundryLink(
            solution.id,
            solution.name
          ),
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(solution.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(solution.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></li><li data-v-687cbdb6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cold-storage",
        class: "sf-with-ul"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` COLD STORAGE SOLUTIONS `);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: "chevron-icon",
              onClick: ($event) => toggleSubMenu($event)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" COLD STORAGE SOLUTIONS "),
              createVNode(unref(ChevronDown), {
                class: "chevron-icon",
                onClick: ($event) => toggleSubMenu($event)
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="submenu" data-v-687cbdb6><!--[-->`);
      ssrRenderList(mainColdRoomSolutions.value, (solution) => {
        _push(`<li data-v-687cbdb6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: getSolutionColdRoomLink(
            solution.id,
            solution.name
          ),
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(solution.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(solution.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></li>`);
      if (promotionExists.value) {
        _push(`<li data-v-687cbdb6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/promotional-solutions",
          class: "sf-with-ul"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` PROMOTIONAL SOLUTIONS `);
              _push2(ssrRenderComponent(unref(ChevronDown), {
                class: "chevron-icon",
                onClick: ($event) => toggleSubMenu($event)
              }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" PROMOTIONAL SOLUTIONS "),
                createVNode(unref(ChevronDown), {
                  class: "chevron-icon",
                  onClick: ($event) => toggleSubMenu($event)
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<ul class="submenu" data-v-687cbdb6><!--[-->`);
        ssrRenderList(mainPromotionalSolutions.value, (solution) => {
          _push(`<li data-v-687cbdb6>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: getSolutionPromotionalLink(
              solution.id,
              solution.name
            ),
            onClick: closeMenu
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(solution.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(solution.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></nav></div></div></div></div><div id="signin-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" data-v-687cbdb6><div class="modal-dialog modal-dialog-centered" role="document" data-v-687cbdb6><div class="modal-content" data-v-687cbdb6><div class="modal-body" data-v-687cbdb6><button type="button" class="close" data-dismiss="modal" aria-label="Close" data-v-687cbdb6><span aria-hidden="true" data-v-687cbdb6><i class="icon-close" data-v-687cbdb6></i></span></button><div class="form-box" data-v-687cbdb6><div class="form-tab" data-v-687cbdb6><ul class="nav nav-pills nav-fill" role="tablist" data-v-687cbdb6><li class="nav-item" data-v-687cbdb6><a id="signin-tab" class="nav-link active" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true" data-v-687cbdb6>Sign In</a></li><li class="nav-item" data-v-687cbdb6><a id="register-tab" class="nav-link" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false" data-v-687cbdb6>Register</a></li></ul><div id="tab-content-5" class="tab-content" data-v-687cbdb6><div id="signin" class="tab-pane fade show active" role="tabpanel" aria-labelledby="signin-tab" data-v-687cbdb6><form action="#" data-v-687cbdb6><div class="form-group" data-v-687cbdb6><label for="singin-email" data-v-687cbdb6>Username or email address *</label><input id="singin-email" type="text" class="form-control" name="singin-email" required data-v-687cbdb6></div><div class="form-group" data-v-687cbdb6><label for="singin-password" data-v-687cbdb6>Password *</label><input id="singin-password" type="password" class="form-control" name="singin-password" required data-v-687cbdb6></div><div class="form-footer" data-v-687cbdb6><button type="submit" class="btn btn-outline-primary-2" data-v-687cbdb6><span data-v-687cbdb6>LOG IN</span><i class="icon-long-arrow-right" data-v-687cbdb6></i></button><div class="custom-control custom-checkbox" data-v-687cbdb6><input id="signin-remember" type="checkbox" class="custom-control-input" data-v-687cbdb6><label class="custom-control-label" for="signin-remember" data-v-687cbdb6>Remember Me</label></div><a href="#" class="forgot-link" data-v-687cbdb6>Forgot Your Password?</a></div></form></div><div id="register" class="tab-pane fade" role="tabpanel" aria-labelledby="register-tab" data-v-687cbdb6><form action="#" data-v-687cbdb6><div class="form-group" data-v-687cbdb6><label for="register-email" data-v-687cbdb6>Your email address *</label><input id="register-email" type="email" class="form-control" name="register-email" required data-v-687cbdb6></div><div class="form-group" data-v-687cbdb6><label for="register-password" data-v-687cbdb6>Password *</label><input id="register-password" type="password" class="form-control" name="register-password" required data-v-687cbdb6></div><div class="form-footer" data-v-687cbdb6><button type="submit" class="btn btn-outline-primary-2" data-v-687cbdb6><span data-v-687cbdb6>SIGN UP</span><i class="icon-long-arrow-right" data-v-687cbdb6></i></button><div class="custom-control custom-checkbox" data-v-687cbdb6><input id="register-policy" type="checkbox" class="custom-control-input" required data-v-687cbdb6><label class="custom-control-label" for="register-policy" data-v-687cbdb6>I agree to the <a href="#" data-v-687cbdb6>privacy policy</a> *</label></div></div></form></div></div></div></div></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile-menu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-687cbdb6"]]);
const _imports_0 = publicAssetsURL("/assets/images/footer-icons/footer_location.png");
const _imports_1 = publicAssetsURL("/assets/images/footer-icons/footer_postbox.png");
const _imports_2 = publicAssetsURL("/assets/images/footer-icons/footer_phone.png");
const _imports_3 = publicAssetsURL("/assets/images/footer-icons/footer_email.png");
const _imports_4 = publicAssetsURL("/assets/images/social-icons/facebook.png");
const _imports_5 = publicAssetsURL("/assets/images/social-icons/instagram.png");
const _imports_6 = publicAssetsURL("/assets/images/social-icons/threads.png");
const _imports_7 = publicAssetsURL("/assets/images/social-icons/whatsapp.png");
const _imports_8 = publicAssetsURL("/assets/images/social-icons/x.png");
const _imports_9 = publicAssetsURL("/assets/images/social-icons/linkedin.png");
const _imports_10 = publicAssetsURL("/assets/images/social-icons/youtube.png");
const _imports_11 = publicAssetsURL("/assets/images/social-icons/tiktok.png");
const _sfc_main$1 = {
  __name: "footer",
  __ssrInlineRender: true,
  setup(__props) {
    const showPopup = ref(false);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<!--[--><div data-v-e67b77e0><footer class="footer mt-5" data-v-e67b77e0><div class="mb-2 cta cta-horizontal cta-horizontal-box bg-dark bg-image cta-footer-boxed" style="${ssrRenderStyle({
        backgroundImage: "url(/assets/images/sheffield_stainless_steel_background.jpg)"
      })}" data-v-e67b77e0><div class="container-fluid" data-v-e67b77e0><div class="row mt-3" data-v-e67b77e0><div class="col-xl-12 justify-content-center footer-banner mb-1" data-v-e67b77e0><h1 class="cta-title cta-title-footer text-primary" data-v-e67b77e0> SHEFFIELD STEEL SYSTEMS LIMITED </h1></div><div class="col-xl-3 footer-contacts-col mt-2" data-v-e67b77e0><div class="footer-contacts" data-v-e67b77e0><h2 class="footer-banner-header" data-v-e67b77e0>Nairobi</h2><ul class="mt-1 mb-2" data-v-e67b77e0><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_0)} alt="Icon 1" data-v-e67b77e0> Off Old Mombasa Road before the Nairobi Standard Gauge Railway Station </li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_1)} alt="Icon 1" data-v-e67b77e0> P. O. Box 29 \u2013 00606, Nairobi Kenya </li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_2)} alt="Icon 1" data-v-e67b77e0><div data-v-e67b77e0><a href="tel:+254713777111" data-v-e67b77e0>+254 713 777 111 </a></div></li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_2)} alt="Icon 1" data-v-e67b77e0><div data-v-e67b77e0><a href="tel:+254713444000" data-v-e67b77e0>+254 713 444 000</a></div></li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_3)} alt="Icon 1" data-v-e67b77e0><a href="mailto:info@sheffieldafrica.com" data-v-e67b77e0> info@sheffieldafrica.com</a></li></ul></div></div><div class="col-xl-3 footer-contacts-col mt-2" data-v-e67b77e0><div class="footer-contacts" data-v-e67b77e0><h2 class="footer-banner-header" data-v-e67b77e0>Mombasa</h2><ul class="mt-1 mb-2" data-v-e67b77e0><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_0)} alt="Icon 1" data-v-e67b77e0> Petrocity Complex 1st Floor-Off Links Road, Nyali, Mombasa </li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_2)} alt="Icon 1" data-v-e67b77e0><div data-v-e67b77e0><a href="tel:+254713777111" data-v-e67b77e0>+254 713 777 111 </a></div></li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_2)} alt="Icon 1" data-v-e67b77e0><div data-v-e67b77e0><a href="tel:+254716518450" data-v-e67b77e0>+254 716 518 450 </a></div></li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_3)} alt="Icon 1" data-v-e67b77e0><a href="mailto:info@sheffieldafrica.com" data-v-e67b77e0> info@sheffieldafrica.com</a></li></ul></div></div><div class="col-xl-3 footer-contacts-col mt-2" data-v-e67b77e0><div class="footer-contacts" data-v-e67b77e0><h2 class="footer-banner-header" data-v-e67b77e0>Kampala</h2><ul class="mt-1 mb-2" data-v-e67b77e0><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_0)} alt="Icon 1" data-v-e67b77e0> Bugalobi Hardware City Opposite Uganda Baati, Block 3 Room 102, Mulwana Road. </li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_2)} alt="Icon 1" data-v-e67b77e0><a style="${ssrRenderStyle({ "width": "100%" })}" href="tel:+256741177711" data-v-e67b77e0>+256 741 177 711 </a></li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_2)} alt="Icon 1" data-v-e67b77e0><a href="tel:+256741177713" data-v-e67b77e0>+256 741 177 713</a></li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_3)} alt="Icon 1" data-v-e67b77e0><a href="mailto:sales@sheffieldafrica.com" data-v-e67b77e0> sales@sheffieldafrica.com</a></li></ul></div></div><div class="col-xl-3 footer-contacts-col mt-2" data-v-e67b77e0><div class="footer-contacts" data-v-e67b77e0><h2 class="footer-banner-header" data-v-e67b77e0>Kigali</h2><ul class="mt-1 mb-2" data-v-e67b77e0><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_2)} alt="Icon 1" data-v-e67b77e0><a href="tel:+250790001231" data-v-e67b77e0>+250 790 001 231 </a></li><li class="my-footer-li" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_3)} alt="Icon 1" data-v-e67b77e0><a href="mailto:sales1rwanda@sheffieldafrica.com" data-v-e67b77e0> sales1rwanda@sheffieldafrica.com</a></li></ul></div></div><div class="col-xl-12 justify-content-center footer-banner mt-4 mb-4" style="${ssrRenderStyle({ "gap": "10px", "padding": "10px !important" })}" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about-us",
        class: "btn btn-primary btn-footer",
        style: { "border": "solid 2px", "min-width": "fit-content" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-e67b77e0${_scopeId}><b data-v-e67b77e0${_scopeId}>About Us</b></span><i class="icon-long-arrow-right" data-v-e67b77e0${_scopeId}></i>`);
          } else {
            return [
              createVNode("span", null, [
                createVNode("b", null, "About Us")
              ]),
              createVNode("i", { class: "icon-long-arrow-right" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact-us",
        class: "btn btn-primary btn-footer",
        style: { "border": "solid 2px", "min-width": "fit-content" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-e67b77e0${_scopeId}><b data-v-e67b77e0${_scopeId}>Contact Us</b></span><i class="icon-long-arrow-right" data-v-e67b77e0${_scopeId}></i>`);
          } else {
            return [
              createVNode("span", null, [
                createVNode("b", null, "Contact Us")
              ]),
              createVNode("i", { class: "icon-long-arrow-right" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="footer-middle border-0" data-v-e67b77e0><div class="container-fluid footer-middle-content" data-v-e67b77e0><div class="row" data-v-e67b77e0><div class="col-sm-4 col-lg-3" data-v-e67b77e0><div class="widget widget-about" data-v-e67b77e0><h4 class="widget-title footer-title" data-v-e67b77e0>Let&#39;s Get Social</h4><div class="social-icons" data-v-e67b77e0><a href="https://www.facebook.com/SheffieldAfricaFacilitySolutions" style="${ssrRenderStyle({ "border": "0.1rem solid #c02434" })}" class="social-icon mt-1" target="_blank" title="Facebook" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_4)} alt="Facebook Logo" data-v-e67b77e0></a><a href="https://www.instagram.com/sheffieldafrica/" style="${ssrRenderStyle({ "border": "0.1rem solid #c02434" })}" class="social-icon mt-1" target="_blank" title="Instagram" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_5)} alt="Instagram Logo" data-v-e67b77e0></a><a href="https://www.threads.net/@sheffieldafrica" style="${ssrRenderStyle({ "border": "0.1rem solid #c02434" })}" class="social-icon mt-1" target="_blank" title="Threads" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_6)} alt="Threads Logo" data-v-e67b77e0></a><a href="https://wa.me/+254114838130?text=Hello%20Sheffield, I need assistance in " style="${ssrRenderStyle({ "border": "0.1rem solid #c02434" })}" class="social-icon mt-1" target="_blank" title="WhatsApp" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_7)} alt="WhatsApp Logo" data-v-e67b77e0></a><a href="https://twitter.com/sheffield_afric/" style="${ssrRenderStyle({ "border": "0.1rem solid #c02434" })}" class="social-icon mt-1" target="_blank" title="X" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_8)} alt="X Logo" data-v-e67b77e0></a><a href="https://www.linkedin.com/company/sheffield-steel-systems-ltd/mycompany" style="${ssrRenderStyle({ "border": "0.1rem solid #c02434" })}" class="social-icon mt-1" target="_blank" title="Linkedin" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_9)} alt="Linkedin Logo" data-v-e67b77e0></a><a href="https://www.youtube.com/channel/UCK-oWPdQazenIHndl4zABew" style="${ssrRenderStyle({ "border": "0.1rem solid #c02434" })}" class="social-icon mt-1" target="_blank" title="Youtube" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_10)} alt="Youtube Logo" data-v-e67b77e0></a><a href="http://tiktok.com/@sheffieldafrica" style="${ssrRenderStyle({ "border": "0.1rem solid #c02434" })}" class="social-icon mt-1" target="_blank" title="TikTok" data-v-e67b77e0><img${ssrRenderAttr("src", _imports_11)} alt="TikTok Logo" data-v-e67b77e0></a></div></div></div><div class="col-sm-4 col-lg-3" data-v-e67b77e0><div class="widget" data-v-e67b77e0><h4 class="widget-title footer-title" data-v-e67b77e0>Information</h4><ul class="widget-list" data-v-e67b77e0><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/about-us" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About us `);
          } else {
            return [
              createTextVNode(" About us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/about-us/sheffield-advantage" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sheffield Advantages `);
          } else {
            return [
              createTextVNode(" Sheffield Advantages ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/projects" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Project References `);
          } else {
            return [
              createTextVNode(" Project References ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/events" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Events `);
          } else {
            return [
              createTextVNode(" Events ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/careers" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Careers `);
          } else {
            return [
              createTextVNode(" Careers ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/faq" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` FAQ `);
          } else {
            return [
              createTextVNode(" FAQ ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/media" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Media Center `);
          } else {
            return [
              createTextVNode(" Media Center ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/contact-us" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact us `);
          } else {
            return [
              createTextVNode(" Contact us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div><div class="col-sm-4 col-lg-3" data-v-e67b77e0><div class="widget" data-v-e67b77e0><h4 class="widget-title footer-title" data-v-e67b77e0>Legal</h4><ul class="widget-list" data-v-e67b77e0><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/privacy-policy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Privacy Policy `);
          } else {
            return [
              createTextVNode(" Privacy Policy ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/cookie-policy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cookie Policy `);
          } else {
            return [
              createTextVNode(" Cookie Policy ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/terms-and-conditions" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Terms &amp; Conditions `);
          } else {
            return [
              createTextVNode(" Terms & Conditions ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/warranty-terms" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Warranty Terms `);
          } else {
            return [
              createTextVNode(" Warranty Terms ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="ec-footer-link" data-v-e67b77e0>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/lease-and-finance" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lease &amp; Finance `);
          } else {
            return [
              createTextVNode(" Lease & Finance ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div><div class="col-sm-4 col-lg-3" data-v-e67b77e0><div class="widget widget-newsletter" data-v-e67b77e0><h4 class="widget-title footer-title" data-v-e67b77e0> Sign Up to Our Newsletter </h4><p data-v-e67b77e0> Get instant updates about our new products and special promos! </p><form action="#" data-v-e67b77e0><div class="input-group" data-v-e67b77e0><input type="email" class="form-control" placeholder="Enter your Email Address" aria-label="Email Adress" required data-v-e67b77e0><div class="input-group-append" data-v-e67b77e0><button class="btn btn-dark" type="submit" data-v-e67b77e0><i class="icon-long-arrow-right" data-v-e67b77e0></i></button></div></div></form></div></div></div></div></div><div class="footer-bottom" data-v-e67b77e0><div class="container-fluid justify-content-center" data-v-e67b77e0><p class="footer-copyright" data-v-e67b77e0> Copyright \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} <b data-v-e67b77e0>Sheffield Africa</b>. All Rights Reserved. </p></div></div></footer></div>`);
      if (showPopup.value) {
        _push(`<div class="cookie-policy-popup" data-v-e67b77e0><div class="cookie-policy-content" data-v-e67b77e0><h2 data-v-e67b77e0>Cookie Policy</h2><p data-v-e67b77e0> This website uses cookies to ensure you get the best experience on our website. By using our site, you acknowledge that you have read and understand our `);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/privacy-policy" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Privacy Policy `);
            } else {
              return [
                createTextVNode(" Privacy Policy ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` and `);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/cookie-policy" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cookie Policy `);
            } else {
              return [
                createTextVNode(" Cookie Policy ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`. </p><p data-v-e67b77e0> By clicking &quot;Accept Cookies,&quot; you consent to the use of cookies on this website. </p><button class="btn btn-secondary mr-3" data-v-e67b77e0> Accept <i class="icon-check" data-v-e67b77e0></i></button><button class="btn btn-primary ml-3" data-v-e67b77e0> Reject <i class="icon-close" data-v-e67b77e0></i></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="whatsapp-logo" data-v-e67b77e0><a href="https://api.whatsapp.com/send/?phone=%2B254114838130&amp;text=Hello+Sheffield%2C+I+need+assistance+in" target="_blank" data-v-e67b77e0><i class="icon-whatsapp" data-v-e67b77e0></i></a></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e67b77e0"]]);
const useMetaGenerator = () => {
  const config = {
    appName: "Sheffield Steel Systems",
    locale: "en",
    // You can dynamically set this
    locales: ["en", "fr"]
    // Add your supported locales
  };
  const getDefaultMetaTags = () => ({
    title: `${config.appName} | Commercial Kitchen, Laundry & Steel Solutions`,
    description: "Discover Sheffield Steel Systems, East Africa's leader in commercial kitchen equipment, laundry solutions, coldrooms, steel fabrication.",
    ogTitle: "Sheffield Steel Systems Limited - Transforming Ideas into Sustainable Realities",
    ogDescription: "East Africa's leading solution and service provider for Commercial Kitchen, commercial equipment, Laundry, and Cold Storage Solutions.",
    primaryImage: "/assets/images/logo.png",
    jsonLdSchema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Sheffield Steel Systems Limited",
      "url": "/",
      "logo": "/assets/images/logo.png",
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+254 722 200 282",
        "contactType": "customer service"
      }],
      "sameAs": [
        "https://www.facebook.com/sheffieldafrica",
        "https://twitter.com/sheffield_afric",
        "https://www.linkedin.com/company/sheffield-steel-systems-ltd",
        "https://www.youtube.com/@sheffieldafrica315"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi",
        "postalCode": "00100",
        "streetAddress": "Mombasa Road, Saku Business Park, Block C, 2nd Floor"
      },
      "openingHours": "Mo,Tu,We,Th,Fr,Sa 08:00-17:00",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-1.3232",
        "longitude": "36.9272"
      }
    }
  });
  const generateMetaTags = (contentData) => {
    const defaultMetaTags = getDefaultMetaTags();
    if (!contentData) {
      return defaultMetaTags;
    }
    const content = contentData.content;
    const type = contentData.type;
    const cleanDescription = (description, maxLength = 160) => {
      let cleanText = description.replace(/<[^>]*>/g, "");
      cleanText = cleanText.replace(/&[^;]+;/g, "");
      if (cleanText.length > maxLength) {
        cleanText = cleanText.substring(0, maxLength) + "...";
      }
      return cleanText;
    };
    let generatedMetaTags;
    switch (type) {
      case "blogs":
        generatedMetaTags = {
          title: `${content.name} | Sheffield Steel Systems Blog`,
          description: cleanDescription(content.content),
          ogTitle: content.name,
          ogDescription: cleanDescription(content.content),
          primaryImage: content.main_image_path ? `/storage/${content.main_image_path}` : "/assets/images/logo.png",
          jsonLdSchema: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": content.name,
            "image": [`/storage/${content.main_image_path}`],
            "datePublished": content.created_at,
            "dateModified": content.updated_at,
            "author": content.author ? [{
              "@type": "Person",
              "name": content.author.name,
              "url": content.author.profile_url || `/author/${content.author.id}`
            }] : [{
              "@type": "Organization",
              "name": "Sheffield Steel Systems Limited",
              "url": "/"
            }]
          }
        };
        break;
      case "product":
        generatedMetaTags = {
          title: `${content.name} | Sheffield Steel Systems`,
          description: cleanDescription(content.description || ""),
          ogTitle: `${content.name} - Sheffield Steel Systems`,
          ogDescription: cleanDescription(content.description || ""),
          primaryImage: content.main_image_path ? `/storage/${content.main_image_path}` : "/assets/images/logo.png",
          jsonLdSchema: null
        };
        break;
      case "video":
        generatedMetaTags = {
          title: `${content.title} | Sheffield Steel Systems`,
          description: cleanDescription(content.description || ""),
          ogTitle: `${content.title} - Sheffield Steel Systems`,
          ogDescription: cleanDescription(content.description || ""),
          primaryImage: content.thumbnail || "/assets/images/logo.png",
          jsonLdSchema: {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": content.title,
            "description": content.description,
            "thumbnailUrl": content.thumbnail || "/assets/images/logo.png",
            "uploadDate": content.created_at
          }
        };
        break;
      default:
        generatedMetaTags = defaultMetaTags;
    }
    return {
      ...defaultMetaTags,
      ...generatedMetaTags,
      jsonLdSchema: {
        ...defaultMetaTags.jsonLdSchema,
        ...generatedMetaTags.jsonLdSchema
      }
    };
  };
  return {
    generateMetaTags,
    getDefaultMetaTags,
    config
  };
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const pageSegment = ref(null);
    useAxios();
    const { generateMetaTags, config } = useMetaGenerator();
    const metaTags = generateMetaTags();
    useHead({
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${config.appName}` : metaTags.title;
      },
      meta: [
        { name: "description", content: metaTags.description },
        { name: "keywords", content: metaTags.keywords },
        { name: "author", content: config.appName },
        { name: "application-name", content: config.appName },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "application-name", content: config.appName },
        { property: "og:locale", content: config.locale },
        { property: "og:title", content: metaTags.ogTitle },
        { property: "og:description", content: metaTags.ogDescription },
        { property: "og:image", content: `${metaTags.primaryImage}` },
        { property: "og:type", content: "website" },
        { property: "og:url", content: metaTags.url },
        { property: "og:site_name", content: config.appName },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: config.twitterHandle },
        { name: "twitter:creator", content: config.twitterHandle },
        { name: "twitter:title", content: metaTags.ogTitle },
        { name: "twitter:description", content: metaTags.ogDescription },
        { name: "twitter:image", content: `${metaTags.primaryImage}` },
        { name: "twitter:url", content: metaTags.url },
        { name: "twitter:domain", content: metaTags.url },
        { name: "robots", content: "index, follow" }
      ],
      htmlAttrs: {
        lang: config.locale,
        prefix: "og: https://ogp.me/ns#"
      },
      link: [
        // Favicon
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: `/favicon.ico`
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: `/favicon-32x32.png`
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: `/favicon-16x16.png`
        },
        // DearFlip CSS
        { rel: "stylesheet", href: `/dearflip/dflip/css/dflip.min.css` },
        // Other CSS files (converted from Laravel vite imports)
        { rel: "stylesheet", href: `/assets/css/bootstrap.min.css` },
        {
          rel: "stylesheet",
          href: `/assets/css/plugins/owl-carousel/owl.carousel.css`
        },
        {
          rel: "stylesheet",
          href: `/assets/css/plugins/jquery.countdown.css`
        },
        { rel: "stylesheet", href: `/assets/css/style.css` },
        { rel: "stylesheet", href: `/assets/css/skins/skin-demo-14.css` },
        { rel: "stylesheet", href: `/assets/css/demos/demo-14.css` },
        { rel: "stylesheet", href: `/assets/css/demos/demo-4.css` }
      ],
      script: [
        // jQuery and its migrate plugin
        {
          src: `/dearflip/dflip/js/libs/jquery.min.js`,
          id: "jquery-core-js"
        },
        {
          src: `/dearflip/dflip/js/libs/jquery-migrate.min.js`,
          id: "jquery-migrate-js"
        },
        // DearFlip and other JS libraries
        {
          src: `/dearflip/dflip/js/libs/imagesloaded.min.js`,
          id: "imagesloaded-js"
        },
        {
          src: `/dearflip/dflip/js/libs/masonry.min.js`,
          id: "masonry-js"
        },
        { src: `/dearflip/dflip/js/dflip.min.js`, id: "dflip-script-js" },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"
        },
        // Custom scripts
        {
          children: `
                window.dFlipLocation = "https://js.dearflip.com/wp-content/plugins/dflip/assets/";
                window.dFlipWPGlobal = ${JSON.stringify({
            text: {
              toggleSound: "Turn on/off Sound",
              toggleThumbnails: "Toggle Thumbnails",
              toggleOutline: "Toggle Outline/Bookmark",
              previousPage: "Previous Page",
              nextPage: "Next Page",
              toggleFullscreen: "Toggle Fullscreen",
              zoomIn: "Zoom In",
              zoomOut: "Zoom Out",
              toggleHelp: "Toggle Help",
              singlePageMode: "Single Page Mode",
              doublePageMode: "Double Page Mode",
              downloadPDFFile: "Download PDF File",
              gotoFirstPage: "Goto First Page",
              gotoLastPage: "Goto Last Page",
              share: "Share",
              search: "Search",
              print: "Print",
              mailSubject: "I wanted you to see this FlipBook",
              mailBody: "Check out this site {{ url()->current() }}",
              loading: "Loading"
            },
            viewerType: "flipbook",
            mobileViewerType: "auto",
            moreControls: "download,pageMode,startPage,endPage,sound",
            hideControls: "altPrev,altNext",
            leftControls: "outline,thumbnail",
            rightControls: "fullScreen,share,download,more",
            hideShareControls: "",
            scrollWheel: "true",
            backgroundColor: "rgb(229,229,229)",
            backgroundImage: "",
            height: "auto",
            paddingTop: "30",
            paddingBottom: "30",
            paddingLeft: "30",
            paddingRight: "30",
            controlsPosition: "bottom",
            controlsFloating: true,
            direction: "1",
            duration: "800",
            soundEnable: "true",
            showDownloadControl: "true",
            showSearchControl: "false",
            showPrintControl: "false",
            enableAnalytics: "true",
            webgl: "true",
            hard: "none",
            autoEnableOutline: "false",
            autoEnableThumbnail: "false",
            pageScale: "fit",
            maxTextureSize: "3200",
            rangeChunkSize: "1048576",
            disableRange: false,
            zoomRatio: "1.5",
            flexibility: "1",
            pageMode: "0",
            singlePageMode: "0",
            pageSize: "0",
            autoPlay: "false",
            autoPlayDuration: "5000",
            autoPlayStart: "false",
            linkTarget: "2",
            sharePrefix: "flipbook-",
            pdfVersion: "default",
            thumbLayout: "book-title-hover",
            targetWindow: "_popup",
            buttonClass: "",
            hasSpiral: false,
            spiralColor: "#eee",
            cover3DType: "plain",
            color3DCover: "#aaaaaa",
            color3DSheets: "#fff",
            flipbook3DTiltAngleUp: "0",
            flipbook3DTiltAngleLeft: "0",
            autoPDFLinktoViewer: false,
            sideMenuOverlay: true,
            displayLightboxPlayIcon: true,
            popupBackGroundColor: "#eee",
            shelfImage: "",
            enableAutoLinks: false
          })}
            `
        }
      ]
    });
    const isHomePage = computed(() => route.path === "/");
    watchEffect(() => {
      pageSegment.value = getSegment(route.params.segment);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Navbar = __nuxt_component_0;
      const _component_TopMenu = __nuxt_component_1;
      const _component_MobileMenu = __nuxt_component_2;
      const _component_Footer = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "the_main_div" }, _attrs))}>`);
      if (!isHomePage.value) {
        _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(pageSegment) != null && !_ctx.$route.path.includes("/product")) {
        _push(ssrRenderComponent(_component_TopMenu, { segment: unref(pageSegment) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_MobileMenu, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BsImITWX.mjs.map
