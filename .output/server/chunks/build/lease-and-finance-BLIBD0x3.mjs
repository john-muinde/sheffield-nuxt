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
  __name: "lease-and-finance",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Lease & Finance",
      meta: [
        {
          name: "description",
          content: "Leasing has become a universally accepted method of financing and it is rare today to find a company that is not enjoying the benefits of a leasing program."
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
      _push(`</li><li class="breadcrumb-item active" aria-current="page"> LEASE &amp; FINANCE </li></ol></div></nav><div class="page-content pb-0"><div class="container terms_page"><div class="row"><div class="col-lg-12"><div class="headings"><h3 class="heading text-primary">Lease &amp; Finance</h3></div><p> Leasing has become a universally accepted method of financing and it is rare today to find a company that is not enjoying the benefits of a leasing program. </p><p> Sheffield can inform you about the many benefits of leasing but only you know your organization\u2019s long-term planning, cash flow, budget restrictions, tax position, and general financial policy. </p><p> Sheffield has a leasing partner- KCB Bank Kenya Limited, who will do the pre-requisite and prequalification process and determine if leasing can provide the right answer to your financial requirements based on their assessment. </p><h4 class="mt-3">Advantages of leasing:</h4><ol style="${ssrRenderStyle({ "list-style-type": "disc", "margin-left": "30px" })}"><li>Frees up available cash and lines of credit</li><li> Allows you to pay for your equipment as your business generates income </li><li>You can lease to own</li><li>Fix cost for the term of the loan</li><li>Take control of your cash flow</li><li>Manage your capital and debt</li><li>Maintain flexible security over assets</li></ol><p> For further information on finance leasing of our solutions simply contact us on <a href="mailto:info@sheffieldafrica.com">info@sheffieldafrica.com</a></p></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/lease-and-finance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=lease-and-finance-BLIBD0x3.mjs.map
