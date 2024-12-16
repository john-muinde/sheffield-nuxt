import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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
import 'ant-design-vue';
import 'axios';

const _sfc_main = {
  __name: "privacy-policy",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Privacy Policy",
      meta: [
        {
          name: "description",
          content: "Our Privacy Policy"
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
      _push(`</li><li class="breadcrumb-item active" aria-current="page"> PRIVACY POLICY </li></ol></div></nav><div class="page-content pb-0"><div class="container terms_page"><div class="row"><div class="col-lg-12"><div class="headings"><h3 class="heading text-primary"> Our Privacy Policy </h3></div><p>At Sheffield Steel Systems LTD, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our services through the website sheffieldafrica.com.</p><p>Please read this Privacy Policy carefully to understand how we handle your data. By accessing or using our services, you consent to the practices described in this Privacy Policy.</p><ul class="mt-2" style="${ssrRenderStyle({ "margin-left": "20px" })}"><li><h4>Information We Collect</h4><p>We may collect the following types of information:</p><ol style="${ssrRenderStyle({ "list-style-type": "disc", "margin-left": "30px" })}"><li><b>Personal Information:</b> When you use our services, we may collect personal information such as your name, email address, phone number, postal address, and other identifiable information.</li><li><b>Usage Information:</b> We may collect non-personal information about your use of our website and services, including but not limited to your IP address, browser type, operating system, and browsing behavior.</li><li><b>Cookies:</b> We may use cookies and similar tracking technologies to collect information about your online activity on our website. You can manage your cookie preferences through your browser settings.</li></ol></li><li class="mt-2"><h4>How We Use Your Information</h4><p>We may use the information we collect for the following purposes:</p><ol style="${ssrRenderStyle({ "list-style-type": "disc", "margin-left": "30px" })}"><li><b>To Provide Services:</b> We use your personal information to provide the services you request and to improve and customize your experience.</li><li><b>Communication:</b> We may use your contact information to send you important updates, newsletters, and promotional materials. You can opt out of these communications at any time.</li><li><b>Analytics:</b> We may analyze usage data to better understand how our website and services are used and to improve our offerings.</li></ol></li><li class="mt-2"><h4>Sharing Your Information</h4><p> We may share your information with third parties under the following circumstances:</p><ol style="${ssrRenderStyle({ "list-style-type": "disc", "margin-left": "30px" })}"><li><b>Service Providers:</b> We may share your information with trusted third-party service providers who help us operate our website and provide services.</li><li><b>Legal Requirements:</b> We may disclose your information if required by law, court order, or other legal processes.</li></ol></li><li class="mt-2"><h4>Security</h4><p>We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, please be aware that no security measures can provide absolute protection.</p></li><li class="mt-2"><h4>Your Rights</h4><p>You have certain rights regarding your personal information, including:</p><ol style="${ssrRenderStyle({ "list-style-type": "disc", "margin-left": "30px" })}"><li><b>Access:</b> You can request access to the personal information we hold about you.</li><li><b>Correction:</b> You can request corrections to any inaccuracies in your personal information.</li><li><b>Deletion:</b> You can request the deletion of your personal information. </li></ol></li><li class="mt-2"><h4>Changes to this Privacy Policy</h4><p>We may update this Privacy Policy from time to time. Any changes will be posted on our website with the updated effective date.</p></li></ul></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy-policy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacy-policy-iv716GfA.mjs.map
