import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_0$1 } from './client-only-Bwxzq3Sq.mjs';
import { F as useCartStore } from './server.mjs';
import { useSSRContext, computed, ref, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';

const _sfc_main = {
  __name: "CartComponent",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useCartStore();
    const cartItems = computed(() => store.cartItems);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dropdown cart-dropdown" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/request-for-quote",
        class: "dropdown-toggle",
        role: "button",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        "data-display": "static"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon-shopping-cart"${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(`<span class="cart-txt"${_scopeId}>Cart</span>`);
          } else {
            return [
              createVNode("i", { class: "icon-shopping-cart" }),
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("span", { class: "cart-count" }, toDisplayString((_a = cartItems.value) == null ? void 0 : _a.length), 1)
                  ];
                }),
                _: 1
              }),
              createVNode("span", { class: "cart-txt" }, "Cart")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="dropdown-menu dropdown-menu-right"><div class="dropdown-cart-products">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center py-4"${_scopeId}><p class="text-gray-500"${_scopeId}>Loading cart items...</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center py-4" }, [
                createVNode("p", { class: "text-gray-500" }, "Loading cart items...")
              ])
            ];
          }
        })
      }, _parent));
      _push(`<div class="dropdown-cart-action">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/request-for-quote",
        class: "btn btn-primary mt-2 float-right",
        style: { "color": "white" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Request for Quote `);
          } else {
            return [
              createTextVNode(" Request for Quote ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><button class="mobile-menu-toggler"><span class="sr-only">Toggle mobile menu</span><i class="icon-bars"></i></button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartComponent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _imports_1 = publicAssetsURL("/assets/images/logo.png");

export { _imports_1 as _, _sfc_main as a };
//# sourceMappingURL=virtual_public-BNlGICV1.mjs.map
