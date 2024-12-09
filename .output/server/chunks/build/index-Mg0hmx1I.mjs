import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as _imports_1$1, a as _sfc_main$2 } from './virtual_public-50URkQ8a.mjs';
import { d as getProductLink, e as calculateDiscount, f as formatPrice, h as addToCartText } from './functions-D-pjxz_N.mjs';
import { a as assets } from './file-Dd0R4TFQ.mjs';
import { useSSRContext, ref, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, resolveDirective, mergeProps, createCommentVNode, withDirectives } from 'vue';
import { ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from 'vue-router';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
import './client-only-Bwxzq3Sq.mjs';
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
import 'unhead';
import 'consola/core';
import 'nuxt-site-config/urls';
import 'ipx';
import 'axios';

const _sfc_main$1 = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const product = props.product;
    const isAdding = ref(false);
    ref(false);
    const imageLoaded = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_lazy = resolveDirective("lazy");
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "own-product position-relative px-2 product-card" }, _attrs))} data-v-383403e9><span class="savings-badge" data-v-383403e9> Save ${ssrInterpolate(("calculateDiscount" in _ctx ? _ctx.calculateDiscount : unref(calculateDiscount))(unref(product).cost_price, unref(product).retail_price))}% </span><div class="product-image-container" data-v-383403e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(unref(product)),
        class: "d-flex justify-content-center align-items-center mt-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a;
          if (_push2) {
            if (!imageLoaded.value) {
              _push2(`<div class="image-skeleton" data-v-383403e9${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<img${ssrRenderAttrs(_temp0 = mergeProps({
              alt: unref(product).name,
              class: "img img-fluid product-image"
            }, ssrGetDirectiveProps(_ctx, _directive_lazy, ("assets" in _ctx ? _ctx.assets : unref(assets))(unref(product).main_image_path))))} data-v-383403e9${_scopeId}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}`);
          } else {
            return [
              !imageLoaded.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "image-skeleton"
              })) : createCommentVNode("", true),
              withDirectives(createVNode("img", {
                alt: unref(product).name,
                class: "img img-fluid product-image",
                onLoad: ($event) => imageLoaded.value = true
              }, null, 40, ["alt", "onLoad"]), [
                [_directive_lazy, ("assets" in _ctx ? _ctx.assets : unref(assets))(unref(product).main_image_path)]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="product-details" data-v-383403e9><span class="text-start product-name" data-v-383403e9>${ssrInterpolate(unref(product).name)}</span><span class="text-start text-muted product-description" data-v-383403e9>${ssrInterpolate(unref(product).model_number)}</span></div><div class="pricing-section" data-v-383403e9><span class="fw-bold text-center text-muted original-price" data-v-383403e9> KES ${ssrInterpolate(("formatPrice" in _ctx ? _ctx.formatPrice : unref(formatPrice))(unref(product).cost_price))}</span><div class="price-tag bg-danger fw-bold text-uppercase" data-v-383403e9> KES ${ssrInterpolate(("formatPrice" in _ctx ? _ctx.formatPrice : unref(formatPrice))(unref(product).retail_price))}</div><div class="product-action-image" data-v-383403e9><button class="${ssrRenderClass([{ adding: isAdding.value }, "btn-product btn-cart"])}" data-v-383403e9><span class="btn-text" data-v-383403e9>${ssrInterpolate("addToCartText" in _ctx ? _ctx.addToCartText : unref(addToCartText))}</span>`);
      if (isAdding.value) {
        _push(`<div class="btn-loading-icon" data-v-383403e9><span class="spinner" data-v-383403e9></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div><button id="scroll-top" title="Back to Top" data-v-383403e9><i class="icon-arrow-up" data-v-383403e9></i></button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-383403e9"]]);
const _imports_1 = publicAssetsURL("/assets/images/homepage/sheffield_engineer.jpg");
const _imports_2 = publicAssetsURL("/assets/images/homepage/cold_storage_home.jpg");
const _imports_3 = publicAssetsURL("/assets/images/homepage/food_service_equipment.jpg");
const _imports_4 = publicAssetsURL("/assets/images/homepage/laundry_and_cleaning.jpg");
const _imports_5 = publicAssetsURL("/assets/images/homepage/female_worker.jpg");
const _imports_6 = publicAssetsURL("/assets/images/events/november-promo.png");
const _imports_7 = publicAssetsURL("/assets/images/events/Rational Live 11 Dec.jpg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const swiperInstance = ref(null);
    const slidesPerView = computed(() => {
      const width = (void 0).innerWidth;
      if (width < 576) return 1;
      if (width < 768) return 2;
      if (width < 992) return 2;
      if (width < 1200) return 3;
      return 4;
    });
    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
    };
    const query = ref("");
    const results = ref([]);
    const showResults = ref(false);
    const searchLoading = ref(false);
    const showPopup = ref(false);
    useAxios();
    ref("");
    const promotionProducts = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CartComponent = _sfc_main$2;
      const _component_ProductCard = __nuxt_component_2;
      _push(`<!--[--><header class="header header-6 header-transparent desktop-header" data-v-e07e5f71><div class="header-middle mt-2" data-v-e07e5f71><div class="container" data-v-e07e5f71><div class="header-left" data-v-e07e5f71><div class="header-search header-search-extended header-search-visible d-none d-lg-block" data-v-e07e5f71><a href="#" class="search-toggle" role="button" data-v-e07e5f71><i class="icon-search" data-v-e07e5f71></i></a><form action="#" method="get" data-v-e07e5f71><div class="header-search-wrapper search-wrapper-wide searchListMainDiv" data-v-e07e5f71><label for="q" class="sr-only" data-v-e07e5f71>Search</label><button class="btn btn-primary" type="submit" data-v-e07e5f71><i class="icon-search" data-v-e07e5f71></i></button><input${ssrRenderAttr("value", query.value)} type="search" class="form-control" name="q" autocomplete="off" placeholder="Search product ..." required="" data-v-e07e5f71>`);
      if (showResults.value) {
        _push(`<ul style="${ssrRenderStyle({ "width": "370px" })}" data-v-e07e5f71>`);
        if (searchLoading.value) {
          _push(`<div class="form-control" data-v-e07e5f71> Loading... </div>`);
        } else {
          _push(`<!---->`);
        }
        if (!results.value.length && !searchLoading.value) {
          _push(`<div class="form-control" data-v-e07e5f71> No results found </div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(results.value, (result) => {
            _push(`<li data-v-e07e5f71>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(result)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<img style="${ssrRenderStyle({ "display": "inline" })}" width="28"${ssrRenderAttr("src", ("assets" in _ctx ? _ctx.assets : unref(assets))(result.main_image_path))} class="rounded profile-img" alt="" data-v-e07e5f71${_scopeId}> ${ssrInterpolate(result.name)}`);
                } else {
                  return [
                    createVNode("img", {
                      style: { "display": "inline" },
                      width: "28",
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
          _push(`<!--]-->`);
        }
        _push(`</ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></div></div><div class="header-center" data-v-e07e5f71>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="zoom-image"${ssrRenderAttr("src", _imports_1$1)} alt="Sheffield Logo" width="245" height="auto" data-v-e07e5f71${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "zoom-image",
                src: _imports_1$1,
                alt: "Sheffield Logo",
                width: "245",
                height: "auto"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-right" data-v-e07e5f71>`);
      _push(ssrRenderComponent(_component_CartComponent, null, null, _parent));
      _push(`</div></div></div></header><header class="header header-6 mobile-header" data-v-e07e5f71><div class="header-middle" data-v-e07e5f71><div class="container" data-v-e07e5f71><div class="header-left" data-v-e07e5f71><div class="header-search header-search-extended header-search-visible d-none d-lg-block" data-v-e07e5f71><a href="#" class="search-toggle" role="button" data-v-e07e5f71><i class="icon-search" data-v-e07e5f71></i></a><form action="#" method="get" data-v-e07e5f71><div class="header-search-wrapper search-wrapper-wide searchListMainDiv" data-v-e07e5f71><label for="q" class="sr-only" data-v-e07e5f71>Search</label><button class="btn btn-primary" type="submit" data-v-e07e5f71><i class="icon-search" data-v-e07e5f71></i></button><input id="q"${ssrRenderAttr("value", query.value)} type="search" class="form-control" name="q" autocomplete="off" placeholder="Search product ..." required="" data-v-e07e5f71>`);
      if (showResults.value) {
        _push(`<ul class="" data-v-e07e5f71><!--[-->`);
        ssrRenderList(results.value, (result) => {
          _push(`<li data-v-e07e5f71>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: ("getProductLink" in _ctx ? _ctx.getProductLink : unref(getProductLink))(result)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img style="${ssrRenderStyle({ "display": "inline" })}" width="28"${ssrRenderAttr("src", ("assets" in _ctx ? _ctx.assets : unref(assets))(result.main_image_path))} class="rounded profile-img" alt="" data-v-e07e5f71${_scopeId}> ${ssrInterpolate(result.name)}`);
              } else {
                return [
                  createVNode("img", {
                    style: { "display": "inline" },
                    width: "28",
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
      _push(`</div></form></div></div><div class="header-center" data-v-e07e5f71>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1$1)} alt="Sheffield Logo" width="245" height="auto" data-v-e07e5f71${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1$1,
                alt: "Sheffield Logo",
                width: "245",
                height: "auto"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-right" data-v-e07e5f71><button id="mobile-menu-toggler" class="mobile-menu-toggler" data-v-e07e5f71><span class="sr-only" data-v-e07e5f71>Toggle mobile menu</span><i class="icon-bars" data-v-e07e5f71></i></button></div></div></div></header><div class="page-wrapper" data-v-e07e5f71><main class="main1 container" data-v-e07e5f71><div class="justify-content-center mt-4 home-design" data-v-e07e5f71>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-first home-section home-section-cat",
        to: "/about-us/sheffield-advantage",
        as: "a"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="home-section-white" data-v-e07e5f71${_scopeId}><img${ssrRenderAttr("src", _imports_1)} data-v-e07e5f71${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "home-section-white" }, [
                createVNode("img", { src: _imports_1 })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-cold-storage home-section home-section-cat",
        to: "cold-storage",
        as: "a"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="home-section-white" data-v-e07e5f71${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="Commercial Cold Storage" data-v-e07e5f71${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "home-section-white" }, [
                createVNode("img", {
                  src: _imports_2,
                  alt: "Commercial Cold Storage"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-kitchen home-section home-section-cat",
        to: "/commercial-kitchen",
        as: "a"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="home-section-white" data-v-e07e5f71${_scopeId}><img${ssrRenderAttr("src", _imports_3)} alt="Commercial Food Service Equipment" data-v-e07e5f71${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "home-section-white" }, [
                createVNode("img", {
                  src: _imports_3,
                  alt: "Commercial Food Service Equipment"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-laundry home-section home-section-cat",
        to: "/laundry",
        as: "a"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="home-section-white" data-v-e07e5f71${_scopeId}><img${ssrRenderAttr("src", _imports_4)} alt="Commercial Laundry and Cleaning" data-v-e07e5f71${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "home-section-white" }, [
                createVNode("img", {
                  src: _imports_4,
                  alt: "Commercial Laundry and Cleaning"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-last home-section home-section-cat",
        to: "/projects",
        as: "a"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="home-section-white" data-v-e07e5f71${_scopeId}><img${ssrRenderAttr("src", _imports_5)} data-v-e07e5f71${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "home-section-white" }, [
                createVNode("img", { src: _imports_5 })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="justify-content-center mt-4 home-design-mobile" data-v-e07e5f71>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-kitchen home-section home-section-cat",
        to: "/commercial-kitchen",
        as: "a"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="home-section-white" data-v-e07e5f71${_scopeId}><img${ssrRenderAttr("src", _imports_3)} alt="Commercial Food Service Equipment" data-v-e07e5f71${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "home-section-white" }, [
                createVNode("img", {
                  src: _imports_3,
                  alt: "Commercial Food Service Equipment"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-cold-storage home-section home-section-cat",
        to: "cold-storage",
        as: "a"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="home-section-white" data-v-e07e5f71${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="Commercial Cold Storage" data-v-e07e5f71${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "home-section-white" }, [
                createVNode("img", {
                  src: _imports_2,
                  alt: "Commercial Cold Storage"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "home-laundry home-section home-section-cat",
        to: "/laundry",
        as: "a"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="home-section-white" data-v-e07e5f71${_scopeId}><img${ssrRenderAttr("src", _imports_4)} alt="Commercial Laundry and Cleaning" data-v-e07e5f71${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "home-section-white" }, [
                createVNode("img", {
                  src: _imports_4,
                  alt: "Commercial Laundry and Cleaning"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if ((_a = promotionProducts.value) == null ? void 0 : _a.length) {
        _push(`<div class="container-fluid" data-v-e07e5f71><div class="d-flex align-items-center mt-1 row" style="${ssrRenderStyle({ "min-height": "500px !important" })}" data-v-e07e5f71><div class="image-container col-xl-3 col-lg-4 col-md-12 mb-md-4" style="${ssrRenderStyle({ "height": "100%" })}" data-v-e07e5f71><div class="promo-image-wrapper" data-v-e07e5f71><img${ssrRenderAttr("src", _imports_6)} alt="Promotion Banner" class="img img-fluid contain promo-image" style="${ssrRenderStyle({ "height": "100%", "width": "90%" })}" data-v-e07e5f71></div></div><div class="col-xl-9 col-lg-8 col-md-12" style="${ssrRenderStyle({ "height": "100%" })}" data-v-e07e5f71><div class="row d-flex justify-content-between" data-v-e07e5f71><div class="bg-danger d-flex justify-content-between text-uppercase fw-bold p-1 col-xl-9 pr-2" style="${ssrRenderStyle({ "color": "white", "border-radius": "4px", "position": "relative", "overflow": "hidden", "font-weight": "bold" })}" data-v-e07e5f71><span data-v-e07e5f71> Pizzeria NOVEMBER PROMOTIONS </span><span data-v-e07e5f71> VALID 1ST - 30TH NOVEMBER, 2024 </span></div><div class="view-all-slide align-items-center justify-content-center h-100 d-none d-lg-flex col-3" data-v-e07e5f71>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/promotional-solutions/371/nov-1-nov-31-2024-promotions",
          class: "btn btn-dark btn-md view-all-button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View All Products <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="ms-2" width="16" height="16" data-v-e07e5f71${_scopeId}><path d="M12 2L10.59 3.41 17.17 10H2v2h15.17l-6.58 6.59L12 22l10-10z" data-v-e07e5f71${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" View All Products "),
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  class: "ms-2",
                  width: "16",
                  height: "16"
                }, [
                  createVNode("path", { d: "M12 2L10.59 3.41 17.17 10H2v2h15.17l-6.58 6.59L12 22l10-10z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><hr class="divider" data-v-e07e5f71><h3 class="text-start mb-4" style="${ssrRenderStyle({ "font-style": "italic" })}" data-v-e07e5f71> Pizzeria Solutions </h3>`);
        _push(ssrRenderComponent(unref(Swiper), {
          "slides-per-view": slidesPerView.value,
          "space-between": 20,
          navigation: true,
          modules: [unref(Navigation), unref(Pagination), unref(Autoplay)],
          pagination: {
            clickable: true,
            dynamicBullets: true
          },
          autoplay: {
            delay: 5e3,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          },
          "slides-per-group": slidesPerView.value,
          class: "products-container",
          onSwiper
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(promotionProducts.value, (product) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), {
                  key: product.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_ProductCard, { product }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_ProductCard, { product }, null, 8, ["product"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(promotionProducts.value, (product) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    key: product.id
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProductCard, { product }, null, 8, ["product"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="d-md-none text-center mt-4" data-v-e07e5f71>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/promotional-solutions/371/nov-1-nov-31-2024-promotions",
          class: "btn btn-dark btn-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View All Products `);
            } else {
              return [
                createTextVNode(" View All Products ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
      if (showPopup.value) {
        _push(`<div class="popup-advert" data-v-e07e5f71><div class="popup-content" data-v-e07e5f71><img${ssrRenderAttr("src", _imports_7)} alt="Rotobake Ovens Solutions" class="popup-image" style="${ssrRenderStyle({ "width": "100%", "min-height": "480px" })}" data-v-e07e5f71><div class="button-group row" data-v-e07e5f71><button class="btn btn-primary btn-footer col-4" data-v-e07e5f71> Cancel </button><button class="btn btn-secondary btn-footer col-4" data-v-e07e5f71> View </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e07e5f71"]]);

export { index as default };
//# sourceMappingURL=index-Mg0hmx1I.mjs.map
