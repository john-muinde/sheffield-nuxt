import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'consola/core';
import 'nuxt-site-config/urls';
import 'ipx';
import 'node:path';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:net';
import 'pinia';
import 'unhead';
import 'vue-router';
import 'ant-design-vue';
import 'axios';

const _imports_0 = publicAssetsURL("/assets/images/sheffield_advantage_embosed.jpg");
const _imports_1 = publicAssetsURL("/assets/images/sheffield-advantages-icons/our_experience.png");
const _imports_2 = publicAssetsURL("/assets/images/sheffield-advantages-icons/our_african.png");
const _imports_3 = publicAssetsURL("/assets/images/sheffield-advantages-icons/our_staff.png");
const _imports_4 = publicAssetsURL("/assets/images/sheffield-advantages-icons/our_infrastucture.png");
const _imports_5 = publicAssetsURL("/assets/images/sheffield-advantages-icons/one_stop.png");
const _imports_6 = publicAssetsURL("/assets/images/sheffield-advantages-icons/our_innovation.png");
const _imports_7 = publicAssetsURL("/assets/images/sheffield-advantages-icons/our_certifications.png");
const _imports_8 = publicAssetsURL("/assets/images/sheffield-advantages-icons/we_gurantee.png");
const _imports_9 = publicAssetsURL("/assets/images/sheffield-advantages-icons/we_offer_smart.png");
const _imports_10 = publicAssetsURL("/assets/images/sheffield-advantages-icons/we_provide_training.png");
const _imports_11 = publicAssetsURL("/assets/images/sheffield-advantages-icons/warranty.png");
const _imports_12 = publicAssetsURL("/assets/images/sheffield-advantages-icons/after_sales_service.png");
const _imports_13 = publicAssetsURL("/assets/images/working-happy-chef.jpg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-d939a3a1><div class="page-content pb-3 pt-1 my-header-image-section" data-v-d939a3a1><div class="container" data-v-d939a3a1><div class="row" data-v-d939a3a1><div class="col-md-12 justify-content-center" data-v-d939a3a1><div class="row justify-content-left links-container mt-3 mb-3" data-v-d939a3a1><div class="advantage-item start-advantage-item" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_0)} data-v-d939a3a1></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_1)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>Our Experience &amp; Expertise</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> Sheffield draws from a deep well of experience &amp; exposure nurtured over 20+ years in the industry to deliver high-quality, efficient and sustainable solutions to our customers. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_2)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1> Our African Footprint</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> We are a Pan African Company offering solutions built for Africa and have installed projects in Kenya, Uganda, Tanzania, Rwanda, Ethiopia, Burundi, Nigeria, Congo &amp; Sudan. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_3)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>Our Staff\u2019s Capacity and Capability</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> Fully equipped with an in-house design team, service and manufacturing engineers and qualified technicians for every project. Our people are the heart of the Company. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_4)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>Our Infrastructure Support</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> Our state-of-the-art showroom, manufacturing plant, and experience center supports our customized solutions. Our clients can visit and see the concepts and solutions we have to offer. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_5)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>One-Stop Solution Provider</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> For every project, we provide drawings concept design, supply, installation, and training and after-sales support for Commercial Kitchen, Laundry, Cold Storage with a Fixed Time &amp; Fixed Price Approach. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_6)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>Our Innovation and R&amp;D</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> We are driven by innovation and re-engineering solutions to advance the operations of your facilities. With continuous Research &amp; Development to develop the most suitable products to the local market. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_7)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>Our Certifications</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> Certified in both local and international standards with notable certifications such as the ISO 9001:2015 in Quality Management Systems and NCA in Mechanical Engineering amongst others. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_8)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>We Guarantee Quality</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> Exclusive distributor of several international brands hence can offer unmatched durability and reliability to ensure high-end performance. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_9)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>We Offer Smart &amp; Green Solutions</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> By ensuring a balance in the Ecosystem, we offer technologically smart solutions focused on Economy and Ecology. This in turn ensures the quickest Return on Investment and minimized Carbon Footprint. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_10)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>We Provide Training</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> With an equipped Academy Center where our clients can test out concepts and products before investing on them. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_11)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>We Offer Manufacturer\u2019s Warranty</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> Sheffield ensures that your unit gets full application of warranty from the manufacturer\u2019s side. </p></div></div><div class="advantage-item" data-v-d939a3a1><div class="advantage-image" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_12)} data-v-d939a3a1></div><div class="advantage-description" data-v-d939a3a1><span data-v-d939a3a1>We Guarantee Availability of Spares and After Sales Service</span></div><div class="advantage-text" data-v-d939a3a1><p data-v-d939a3a1> Our expert service staff are available all the time 24 hours to help you with after-sales support for your solutions. </p></div></div><div class="advantage-item last-advantage-item" data-v-d939a3a1><img${ssrRenderAttr("src", _imports_13)} data-v-d939a3a1></div></div></div></div></div></div></main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about-us/sheffield-advantage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sheffieldAdvantage = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d939a3a1"]]);

export { sheffieldAdvantage as default };
//# sourceMappingURL=sheffield-advantage-8wOrNPW1.mjs.map
