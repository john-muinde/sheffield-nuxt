import { a as assetsSync } from './file-DYudjGfO.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import VueEasyLightbox from 'vue-easy-lightbox';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { _ as _export_sfc, k as useAxios } from './server.mjs';
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

const _imports_0 = publicAssetsURL("/assets/images/events/training.png");
const _imports_1 = publicAssetsURL("/assets/images/events/client_demos.png");
const _imports_2 = publicAssetsURL("/assets/images/events/product_launch.png");
const _imports_3 = publicAssetsURL("/assets/images/events/live_cooking.png");
const _imports_4 = publicAssetsURL("/assets/images/events/chef_competitions.png");
const _imports_5 = publicAssetsURL("/assets/images/events/partner_training.png");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Events",
      meta: [
        {
          name: "description",
          content: "Sheffield hosts events at the Sheffield Academy and Our Facility based on the theme of experiential sessions so that you can interact with our solutions and network with like-minded industry players."
        },
        {
          name: "keywords",
          content: "Events, Sheffield, Sheffield Academy, Sheffield Solutions, Sheffield Events, Sheffield Industry Players"
        }
      ]
    });
    const imgs = ref([]);
    const visible = ref(false);
    const indexRef = ref(0);
    const handleHide = () => {
      visible.value = false;
    };
    const events = ref([]);
    useAxios();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-ea4e54ee><div class="page-content pg-white who-we-are-section pb-1" data-v-ea4e54ee><div class="overlay" data-v-ea4e54ee></div><div class="pt-1 mb-lg-8" data-v-ea4e54ee><div class="container" data-v-ea4e54ee><div class="row" data-v-ea4e54ee><div class="col-lg-10 offset-lg-1" data-v-ea4e54ee><h2 class="about-us-title" data-v-ea4e54ee>Events</h2><p class="lead about-us-lead text-primary mb-1" data-v-ea4e54ee> Elevate Skills, Amplify Visibility </p></div><div class="col-lg-10 offset-lg-1" data-v-ea4e54ee><p style="${ssrRenderStyle({})}" class="text-5 about-us-p" data-v-ea4e54ee> Sheffield hosts events at the Sheffield Academy and Our Facility based on the theme of experiential sessions so that you can interact with our solutions and network with like-minded industry players.<br data-v-ea4e54ee> Some of the events include: </p></div><div class="col-lg-10 offset-lg-1" data-v-ea4e54ee><div class="row justify-content-left links-container mt-3" data-v-ea4e54ee><div class="event-item" data-v-ea4e54ee><div class="event-image" data-v-ea4e54ee><img${ssrRenderAttr("src", _imports_0)} data-v-ea4e54ee></div><div class="event-text mt-2" data-v-ea4e54ee><p data-v-ea4e54ee>Product and Solutions Focus Business Training</p></div></div><div class="event-item" data-v-ea4e54ee><div class="event-image" data-v-ea4e54ee><img${ssrRenderAttr("src", _imports_1)} data-v-ea4e54ee></div><div class="event-text mt-2" data-v-ea4e54ee><p data-v-ea4e54ee>Client Dedicated Demos</p></div></div><div class="event-item" data-v-ea4e54ee><div class="event-image" data-v-ea4e54ee><img${ssrRenderAttr("src", _imports_2)} data-v-ea4e54ee></div><div class="event-text mt-2" data-v-ea4e54ee><p data-v-ea4e54ee>New Product Launches</p></div></div><div class="event-item" data-v-ea4e54ee><div class="event-image" data-v-ea4e54ee><img${ssrRenderAttr("src", _imports_3)} data-v-ea4e54ee></div><div class="event-text mt-2" data-v-ea4e54ee><p data-v-ea4e54ee> The Rational Live Cooking sessions that take place twice a month </p></div></div><div class="event-item" data-v-ea4e54ee><div class="event-image" data-v-ea4e54ee><img${ssrRenderAttr("src", _imports_4)} data-v-ea4e54ee></div><div class="event-text mt-2" data-v-ea4e54ee><p data-v-ea4e54ee>Chefs Competitions</p></div></div><div class="event-item" data-v-ea4e54ee><div class="event-image" data-v-ea4e54ee><img${ssrRenderAttr("src", _imports_5)} data-v-ea4e54ee></div><div class="event-text mt-2" data-v-ea4e54ee><p data-v-ea4e54ee>Partner training and Demos</p></div></div></div></div></div></div></div></div><div class="page-content pg-white" data-v-ea4e54ee><div class="mb-lg-8 pb-4" data-v-ea4e54ee><div class="container-fluid pb-4 pt-4 mb-5" data-v-ea4e54ee><div class="row" data-v-ea4e54ee><div class="col-md-10 offset-lg-1" data-v-ea4e54ee><h2 class="about-us-title mb-5" data-v-ea4e54ee>Upcoming Events</h2><div class="row justify-content-left" data-v-ea4e54ee><div data-v-ea4e54ee>`);
      _push(ssrRenderComponent(unref(VueEasyLightbox), {
        "esc-disabled": "",
        visible: visible.value,
        imgs: imgs.value,
        index: indexRef.value,
        onHide: handleHide
      }, null, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(events.value, (event) => {
        _push(`<div class="col-sm-6 col-lg-4" data-v-ea4e54ee><article class="entry entry-grid" data-v-ea4e54ee><figure class="entry-media" data-v-ea4e54ee><img style="${ssrRenderStyle({})}"${ssrRenderAttr("src", ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(event.main_image_path))} alt="image desc" data-v-ea4e54ee></figure><div class="entry-body pt-1" data-v-ea4e54ee><h2 class="entry-title" data-v-ea4e54ee>${ssrInterpolate(event.name)}</h2><div class="entry-content text-left" data-v-ea4e54ee><p data-v-ea4e54ee><i class="icon-map-marker" data-v-ea4e54ee></i><span class="ml-3" data-v-ea4e54ee>${ssrInterpolate(event.location)}</span><br data-v-ea4e54ee><i class="icon-calendar" data-v-ea4e54ee></i><span class="ml-3" data-v-ea4e54ee>${ssrInterpolate(event.start_date)}</span></p><a class="btn btn-primary btn-round mt-2 bottom-0"${ssrRenderAttr("href", event.url)} target="_blank" data-v-ea4e54ee> Register </a></div></div></article></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/events/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea4e54ee"]]);

export { index as default };
//# sourceMappingURL=index-BFVg4UaR.mjs.map
