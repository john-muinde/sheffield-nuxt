import { _ as __nuxt_component_1 } from './LoadingData-Ctu2BGXV.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as _export_sfc, f as useRoute, k as useAxios, l as getSegment, q as getSolutionLink } from './server.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
import { useSSRContext, defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useSeoMeta, a as useMetaGenerator } from './metaGenerator-Tue2Ui9B.mjs';
import { u as useAsyncData } from './asyncData-BBLQfHDv.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import './interval-gl53xdpR.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { api } = useAxios();
    const { generateSeoMeta, generateHeadInput, generateContentMetaTags } = useMetaGenerator();
    const segment = computed(() => getSegment(route.params.segment));
    const { data: solutions, pending } = ([__temp, __restore] = withAsyncContext(async () => {
      var _a;
      return useAsyncData(
        `solutions-${(_a = segment.value) == null ? void 0 : _a.id}`,
        async () => {
          var _a2;
          if (!((_a2 = segment.value) == null ? void 0 : _a2.id)) return [];
          try {
            const response = await api.get(
              `/api/get-solutions/${segment.value.id}`
            );
            return response.data.data;
          } catch (error) {
            console.error("Error fetching solutions:", error);
            return [];
          }
        },
        {
          server: true,
          lazy: false
        }
      );
    }), __temp = await __temp, __restore(), __temp);
    const metaTags = computed(
      () => {
        var _a, _b, _c, _d, _e, _f;
        return generateContentMetaTags({
          type: "category",
          content: {
            name: ((_a = segment.value) == null ? void 0 : _a.name) || "Solutions",
            description: `Explore our ${(_b = segment.value) == null ? void 0 : _b.name} solutions for your business needs. Sheffield Steel Systems offers professional ${(_d = (_c = segment.value) == null ? void 0 : _c.name) == null ? void 0 : _d.toLowerCase()} solutions in East Africa.`,
            keywords: ((_e = segment.value) == null ? void 0 : _e.keywords) || "",
            main_image_path: assetsSync((_f = segment.value) == null ? void 0 : _f.image, {
              local: true,
              transform: { width: 1200, height: 630 }
            })
          }
        });
      }
    );
    const solutionSchema = computed(() => {
      var _a, _b, _c, _d;
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${(_a = segment.value) == null ? void 0 : _a.name} Solutions by Sheffield Steel Systems`,
        description: `Browse our comprehensive range of ${(_b = segment.value) == null ? void 0 : _b.name} solutions for businesses in East Africa`,
        numberOfItems: ((_c = solutions.value) == null ? void 0 : _c.length) || 0,
        itemListElement: ((_d = solutions.value) == null ? void 0 : _d.map((solution, index2) => {
          var _a2;
          return {
            "@type": "ListItem",
            position: index2 + 1,
            item: {
              "@type": "Product",
              name: solution.name,
              image: assetsSync(solution.main_image_path),
              url: assetsSync(
                getSolutionLink(solution.id, solution.name, segment.value)
              ),
              description: solution.description || `Professional ${solution.name} solutions by Sheffield Steel Systems`,
              brand: {
                "@type": "Brand",
                name: "Sheffield Steel Systems"
              },
              category: (_a2 = segment.value) == null ? void 0 : _a2.name,
              offers: {
                "@type": "AggregateOffer",
                availability: "https://schema.org/InStock"
              }
            }
          };
        })) || []
      };
    });
    useHead(() => ({
      ...generateHeadInput(route, solutionSchema.value)
    }));
    useSeoMeta(generateSeoMeta(metaTags.value, route));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_LoadingData = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wrapper" }, _attrs))} data-v-b62d9f79><main class="main" data-v-b62d9f79><div class="container" style="${ssrRenderStyle({ "margin-top": "1px" })}" data-v-b62d9f79>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_LoadingData, null, null, _parent));
      } else {
        _push(`<div class="row cat-banner-row" data-v-b62d9f79><div class="col-xl-2 col-xxl-2 slide-from-right" data-v-b62d9f79><div class="cat-banner row no-gutters" data-v-b62d9f79><div class="col-sm-12 col-xl-12 col-xxl-12" data-v-b62d9f79><div class="banner banner-overlay solution-image" data-v-b62d9f79><a href="#" data-v-b62d9f79><img${ssrRenderAttr("src", (_a = unref(segment)) == null ? void 0 : _a.image)}${ssrRenderAttr("alt", (_b = unref(segment)) == null ? void 0 : _b.name)} data-v-b62d9f79></a></div></div></div></div><div class="col-xl-10 col-xxl-10 mt-1 slide-from-left" data-v-b62d9f79><div class="row" data-v-b62d9f79><!--[-->`);
        ssrRenderList(unref(solutions), (solution) => {
          _push(`<div class="col-md-2 col-sm-4 slide-solutions" data-v-b62d9f79>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: "cat-block",
            to: ("getSolutionLink" in _ctx ? _ctx.getSolutionLink : unref(getSolutionLink))(solution.id, solution.name, unref(segment))
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<figure data-v-b62d9f79${_scopeId}><span data-v-b62d9f79${_scopeId}><img${ssrRenderAttr("src", ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(solution.main_image_path))}${ssrRenderAttr("alt", solution.name)} data-v-b62d9f79${_scopeId}></span></figure><h3 class="cat-block-title" data-v-b62d9f79${_scopeId}>${ssrInterpolate(solution.name)}</h3>`);
              } else {
                return [
                  createVNode("figure", null, [
                    createVNode("span", null, [
                      createVNode("img", {
                        src: ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(solution.main_image_path),
                        alt: solution.name
                      }, null, 8, ["src", "alt"])
                    ])
                  ]),
                  createVNode("h3", { class: "cat-block-title" }, toDisplayString(solution.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div></main><button id="scroll-top" title="Back to Top" data-v-b62d9f79><i class="icon-arrow-up" data-v-b62d9f79></i></button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[segment]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b62d9f79"]]);

export { index as default };
//# sourceMappingURL=index-Cb5tPt21.mjs.map
