import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import { y as useAuth } from './server.mjs';
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

const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper" }, _attrs))}><main class="main"><div class="login-page bg-image pt-8 pb-8 pt-md-5 pb-md-5 pt-lg-6 pb-lg-6" style="${ssrRenderStyle({ "background-image": "url('/assets/images/login-background.jpg')" })}"><div class="container"><div class="form-box"><div class="form-tab"><ul class="nav nav-pills nav-fill" role="tablist"><li class="nav-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link",
        to: "/login"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Log in `);
          } else {
            return [
              createTextVNode(" Log in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item"><a id="register-tab-2" class="nav-link active" data-toggle="tab" href="#register-2" role="tab" aria-controls="register-2" aria-selected="true">Register</a></li></ul><div class="tab-content"><div id="register-2" class="tab-pane fade show active" role="tabpanel" aria-labelledby="register-tab-2"><form action="#"><div class="form-group"><label for="register-email-2">Your email address *</label><input id="register-email-2" type="email" class="form-control" name="register-email" required=""></div><div class="form-group"><label for="register-password-2">Password *</label><input id="register-password-2" type="password" class="form-control" name="register-password" required=""></div><div class="form-footer"><button type="submit" class="btn btn-outline-primary-2"><span>SIGN UP</span><i class="icon-long-arrow-right"></i></button><div class="custom-control custom-checkbox"><input id="register-policy-2" type="checkbox" class="custom-control-input" required=""><label class="custom-control-label" for="register-policy-2">I agree to the <a href="#">privacy policy</a> *</label></div></div></form></div></div></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-yIyHONVA.mjs.map
