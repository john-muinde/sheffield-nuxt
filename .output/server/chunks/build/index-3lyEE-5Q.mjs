import { _ as __nuxt_component_0 } from './client-only-Bwxzq3Sq.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
import { ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { _ as _export_sfc, k as useAxios } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Projects",
      meta: [
        {
          name: "description",
          content: "Explore our projects"
        },
        {
          property: "og:title",
          content: "Projects"
        },
        {
          property: "og:description",
          content: "Explore our projects"
        }
      ]
    });
    const projectsMenu = [
      {
        image: "/assets/images/projects/hotel.png",
        title: "Hotels"
      },
      {
        image: "/assets/images/projects/restaurant.png",
        title: "Restaurants"
      },
      {
        image: "/assets/images/projects/coffee-shop.png",
        title: "Coffee Shops"
      },
      {
        image: "/assets/images/projects/retail.png",
        title: "Retail"
      },
      {
        image: "/assets/images/projects/corporate.png",
        title: "Corporates"
      },
      {
        image: "/assets/images/projects/institutions.png",
        title: "Institutions"
      },
      {
        image: "/assets/images/projects/hospital.png",
        title: "Healthcare"
      }
    ];
    const currentSlide = ref(0);
    const currentSegment = computed(() => {
      var _a;
      return (_a = projectsMenu[currentSlide.value]) == null ? void 0 : _a.title;
    });
    ref([]);
    const segmentsData = ref([]);
    const myCarousel = ref(null);
    const onNext = (e) => {
      e.preventDefault();
      if (currentSlide.value < projectsMenu.length - 1) {
        currentSlide.value++;
      }
    };
    const onPrev = (e) => {
      e.preventDefault();
      if (currentSlide.value > 0) {
        currentSlide.value--;
      }
    };
    const slideTo = (index2) => {
      currentSlide.value = index2;
    };
    useAxios();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-c15ee601><div class="relative py-12 bg-cover bg-center bg-no-repeat" style="${ssrRenderStyle({ "background-image": "url(/assets/images/projects_sheffield.jpg)" })}" data-v-c15ee601><div class="container mx-auto px-4 max-w-full" data-v-c15ee601><div class="text-center mb-8" data-v-c15ee601><h1 class="inline-block px-8 py-3 text-4xl md:text-5xl font-medium text-white bg-red-600 rounded-md" data-v-c15ee601> Project References </h1></div><div class="max-w-full mx-auto" data-v-c15ee601>`);
      _push(ssrRenderComponent(unref(Carousel), {
        ref_key: "myCarousel",
        ref: myCarousel,
        modelValue: currentSlide.value,
        "onUpdate:modelValue": ($event) => currentSlide.value = $event,
        "items-to-show": 7,
        "items-to-scroll": 1,
        "wrap-around": false,
        "disable-on-click": true,
        gap: 5,
        "mouse-drag": true,
        "touch-drag": true,
        "snap-align": "start",
        transition: 500,
        breakpoints: {
          320: {
            itemsToShow: 1,
            itemsToScroll: 1,
            snapAlign: "start"
          },
          480: {
            itemsToShow: 3,
            itemsToScroll: 1,
            snapAlign: "start"
          },
          768: {
            itemsToShow: 4,
            itemsToScroll: 1,
            snapAlign: "start"
          },
          1024: {
            itemsToShow: 5,
            itemsToScroll: 1,
            snapAlign: "start"
          },
          1280: {
            itemsToShow: 7,
            itemsToScroll: 1,
            snapAlign: "start"
          }
        },
        onNext,
        onPrev
      }, {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Pagination), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Navigation)),
              createVNode(unref(Pagination))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(projectsMenu, (item, index2) => {
                    return createVNode(unref(Slide), {
                      key: index2,
                      class: "px-2"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: ["carousel__item transition-all duration-300 rounded-xl h-60 w-52 hover:shadow-lg cursor-pointer p-6 transform hover:-translate-y-1", [
                            currentSlide.value === index2 ? "!bg-red-600 shadow-xl" : "bg-white hover:bg-gray-50"
                          ]],
                          onClick: ($event) => slideTo(index2)
                        }, [
                          createVNode("div", { class: "flex flex-col items-center space-y-4" }, [
                            createVNode("img", {
                              src: item.image,
                              alt: item.title,
                              class: ["w-16 h-16 object-contain transition-all duration-300", [
                                currentSlide.value === index2 ? "brightness-0 invert" : "filter-gray-scale"
                              ]]
                            }, null, 10, ["src", "alt"]),
                            createVNode("div", { class: "relative" }, [
                              createVNode("span", {
                                class: ["text-lg font-semibold uppercase", [
                                  currentSlide.value === index2 ? "text-white" : "text-gray-700"
                                ]]
                              }, toDisplayString(item.title), 3),
                              createVNode("div", {
                                class: ["absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2", [
                                  currentSlide.value === index2 ? "bg-white" : "bg-gray-400"
                                ]]
                              }, null, 2)
                            ])
                          ])
                        ], 10, ["onClick"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="container mx-auto py-8" data-v-c15ee601><div class="max-w-full mx-auto" data-v-c15ee601><!--[-->`);
      ssrRenderList(segmentsData.value, (segment, segmentIndex) => {
        _push(`<div${ssrRenderAttr("id", segment.name)} class="${ssrRenderClass([{
          "opacity-100": segment.name === currentSegment.value,
          "opacity-0 hidden": segment.name !== currentSegment.value
        }, "tab-pane transition-opacity duration-300"])}" data-v-c15ee601><div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4" data-v-c15ee601><!--[-->`);
        ssrRenderList(segment.projects, (project, projectIndex) => {
          _push(`<div class="transform transition-all duration-300 hover:scale-105" data-v-c15ee601><div class="rounded-2xl overflow-hidden shadow-md hover:shadow-xl" data-v-c15ee601><div class="relative overflow-hidden aspect-w-1 aspect-h-1" data-v-c15ee601><img${ssrRenderAttr("src", ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(project.main_image_path))}${ssrRenderAttr("alt", project.name)} class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" data-v-c15ee601></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c15ee601"]]);

export { index as default };
//# sourceMappingURL=index-3lyEE-5Q.mjs.map
