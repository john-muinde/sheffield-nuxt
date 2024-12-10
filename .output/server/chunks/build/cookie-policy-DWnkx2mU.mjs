import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import './server.mjs';
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
  __name: "cookie-policy",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Cookie Policy",
      meta: [
        {
          name: "description",
          content: 'This Cookie Policy explains how Sheffield Steel Systems LTD, with its website located at sheffieldafrica.com ("we," "us," or "our"), uses cookies and similar technologies when you visit our website.'
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="main"><nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0"><div class="container"><ol class="breadcrumb"><li class="breadcrumb-item">`);
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
      _push(`</li><li class="breadcrumb-item active" aria-current="page"> COOKIE POLICY </li></ol></div></nav><div class="page-content pb-0"><div class="container terms_page"><div class="row"><div class="col-lg-12"><div class="headings"><h3 class="heading text-primary">Our Cookie Policy</h3></div><p> This Cookie Policy explains how Sheffield Steel Systems LTD, with its website located at sheffieldafrica.com (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), uses cookies and similar technologies when you visit our website. </p><p> By continuing to browse and use our website, you agree to the use of cookies and similar technologies as described in this policy. If you do not agree with our use of cookies, you may adjust your browser settings to reject cookies or opt-out as explained below. </p><h4>What Are Cookies?</h4><p> Cookies are small text files that are placed on your device (computer, smartphone, tablet, etc.) when you visit a website. They are widely used to make websites work more efficiently and provide essential functionality, as well as to gather information about user interactions and preferences. </p><h4 class="mt-2">How We Use Cookies</h4><p>We use cookies for the following purposes:</p><p><b>Essential Cookies:</b> These cookies are necessary for the basic functionality of our website, such as enabling you to navigate between pages and access secure areas. Without these cookies, our website may not function correctly. </p><p><b>Performance and Analytics Cookies:</b> These cookies help us understand how visitors use our website. They collect information such as the number of visitors, pages visited, and the source of traffic. This data helps us improve our website&#39;s performance and user experience. </p><p><b>Functional Cookies:</b> Functional cookies enable us to provide enhanced features and personalization. For example, they may remember your preferences or settings. </p><p><b>Third-Party Cookies:</b> We may also allow third-party cookies to be set by third-party services that appear on our website. These cookies are controlled by the third parties and are used for various purposes, including tracking and analytics. </p><h4 class="mt-2">Types of Cookies We Use</h4><p> Session Cookies: These are temporary cookies that are stored on your device only while you are visiting our website. They are deleted when you close your browser. </p><p> Persistent Cookies: Persistent cookies are stored on your device for a specified period, even after you close your browser. They are used to remember your preferences and settings. </p><h4 class="mt-2">Your Choices</h4><p> You have the option to manage and control cookies in different ways: </p><p><b>Browser Settings:</b> You can configure your web browser to accept or reject cookies. Most browsers automatically accept cookies, but you can usually modify your browser settings to reject them. However, please note that blocking cookies may affect the functionality of our website. </p><p><b>Cookie Consent Tool:</b> When you first visit our website, you may be presented with a cookie consent banner that allows you to accept or reject specific types of cookies. You can revisit this banner to change your preferences at any time. </p><h4 class="mt-2">Updates to this Policy</h4><p> We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed about our use of cookies. </p></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cookie-policy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cookie-policy-DWnkx2mU.mjs.map
