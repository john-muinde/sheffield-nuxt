import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { loginForm, validationErrors, processing, submitLogin } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper" }, _attrs))}><main class="main"><div class="login-page bg-image pt-8 pb-8 pt-md-5 pb-md-5 pt-lg-6 pb-lg-6" style="${ssrRenderStyle({ "background-image": "url('/assets/images/login-background.jpg')" })}"><div class="container"><div class="form-box"><div class="form-tab"><ul class="nav nav-pills nav-fill" role="tablist"><li class="nav-item"><a id="signin-tab-2" class="nav-link active" data-toggle="tab" href="#signin-2" role="tab" aria-controls="signin-2" aria-selected="false">Log In</a></li><li class="nav-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link",
        to: "/register"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Register `);
          } else {
            return [
              createTextVNode(" Register ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="tab-content"><div id="signin-2" class="tab-pane fade show active" role="tabpanel" aria-labelledby="signin-tab-2"><form><div class="form-group"><label for="singin-email-2">Email address *</label><input id="singin-email-2"${ssrRenderAttr("value", unref(loginForm).email)} type="email" class="form-control" required autofocus autocomplete="username"></div><div class="form-group"><label for="singin-password-2">Password *</label><input id="singin-password-2"${ssrRenderAttr("value", unref(loginForm).password)} type="password" class="form-control" required autocomplete="current-password"></div><div class="form-footer"><button type="submit" class="btn btn-outline-primary-2"><span>LOG IN</span><i class="icon-long-arrow-right"></i></button><div class="custom-control custom-checkbox"><input id="signin-remember-2" type="checkbox" class="custom-control-input"><label class="custom-control-label" for="signin-remember-2">Remember Me</label></div><a href="#" class="forgot-link">Forgot Your Password?</a></div></form></div></div></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CqERvaxU.mjs.map
