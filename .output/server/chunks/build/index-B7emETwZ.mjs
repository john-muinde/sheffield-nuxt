import { a as assets } from './file-Dd0R4TFQ.mjs';
import { ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { u as useAxios } from './useAxios-317E6qAZ.mjs';
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
import 'axios';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Projects",
      meta: [
        { name: "description", content: "Find out more about our projects" },
        { name: "keywords", content: "Projects" },
        { property: "og:title", content: "Projects" },
        { property: "og:description", content: "Find out more about our projects" },
        { property: "og:image", content: "/assets/images/projects_sheffield.jpg" },
        { property: "og:url", content: "/projects" }
      ],
      link: [{ rel: "canonical", href: "/projects" }]
    });
    const breakpoints = {
      0: {
        itemsToShow: 2,
        snapAlign: "start"
      },
      480: {
        itemsToShow: 2,
        snapAlign: "start"
      },
      768: {
        itemsToShow: 3.5,
        snapAlign: "start"
      },
      992: {
        itemsToShow: 3.5,
        snapAlign: "start"
      },
      1200: {
        itemsToShow: 5,
        snapAlign: "start"
      }
    };
    ref([]);
    const segmentsData = ref([]);
    useAxios();
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
    const slideTo = (val) => {
      currentSlide.value = val;
    };
    watch(currentSlide, (newIndex, oldIndex) => {
      const selectedItem = projectsMenu[newIndex];
      const selectedTitle = selectedItem.title;
      const tabPanes = (void 0).querySelectorAll(".tab-pane");
      tabPanes.forEach((pane) => {
        pane.classList.remove("active");
        pane.classList.remove("show");
      });
      const selectedElement = (void 0).getElementById(selectedTitle);
      if (selectedElement) {
        selectedElement.classList.add("active");
        selectedElement.classList.add("show");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))}><div class="my-projects-banner bg-image text-center"><div class="container justify-content-center mt-2 mb-1"><div class="row"><div class="col-lg-12 mb-2"><div class="my-page-header"><span>Project References</span></div></div><div class="col-lg-12 my-projects-section justify-content-center"><div class="my-projects-carousel">`);
      _push(ssrRenderComponent(unref(Carousel), {
        ref: "scrollableContainerCarosel",
        modelValue: currentSlide.value,
        "onUpdate:modelValue": ($event) => currentSlide.value = $event,
        class: "carousel-wrapper",
        "per-page": 1,
        breakpoints,
        "wrap-around": true,
        "pause-autoplay-on-hover": true
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
            _push2(`<!--[-->`);
            ssrRenderList(projectsMenu, (item, index) => {
              _push2(ssrRenderComponent(unref(Slide), {
                key: index,
                "data-toggle": "tab",
                href: "#" + item.title,
                role: "tab",
                "aria-controls": item.title,
                "aria-selected": "false"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="carousel-div-image"${_scopeId2}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.alt)}${_scopeId2}><div class="project-section-header"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(item.title)}</span></div></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "carousel-div-image",
                        onClick: ($event) => slideTo(index)
                      }, [
                        createVNode("img", {
                          src: item.image,
                          alt: item.alt
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "project-section-header" }, [
                          createVNode("span", null, toDisplayString(item.title), 1)
                        ])
                      ], 8, ["onClick"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(projectsMenu, (item, index) => {
                return createVNode(unref(Slide), {
                  key: index,
                  "data-toggle": "tab",
                  href: "#" + item.title,
                  role: "tab",
                  "aria-controls": item.title,
                  "aria-selected": "false"
                }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: "carousel-div-image",
                      onClick: ($event) => slideTo(index)
                    }, [
                      createVNode("img", {
                        src: item.image,
                        alt: item.alt
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "project-section-header" }, [
                        createVNode("span", null, toDisplayString(item.title), 1)
                      ])
                    ], 8, ["onClick"])
                  ]),
                  _: 2
                }, 1032, ["href", "aria-controls"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="col-lg-12 tab-content mt-5 mb-5 pb-5"><!--[-->`);
      ssrRenderList(segmentsData.value, (segment, segmentIndex) => {
        _push(`<div${ssrRenderAttr("id", segment.name)} class="${ssrRenderClass([{ "show active": segment.name === "Hotels" }, "tab-pane p-0 fade"])}" role="tabpanel"${ssrRenderAttr("aria-labelledby", segment.name)}><div class="main-clients"><div class="clients-container mb-5 row"><div class="col-md-10 offset-lg-1"><div class="row justify-content-center projects-row"><!--[-->`);
        ssrRenderList(segment.projects, (project, projectIndex) => {
          _push(`<div class="col-md-2"><article class=""><figure class=""><img${ssrRenderAttr("src", ("assets" in _ctx ? _ctx.assets : unref(assets))(project.main_image_path))} alt="image desc"></figure></article></div>`);
        });
        _push(`<!--]--></div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B7emETwZ.mjs.map
