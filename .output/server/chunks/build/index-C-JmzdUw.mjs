import { ref, reactive, watch, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, useSSRContext, computed, nextTick } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel } from '@headlessui/vue';
import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { _ as _export_sfc, k as useAxios } from './server.mjs';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { s as setInterval } from './interval-gl53xdpR.mjs';
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

const _sfc_main$1 = {
  __name: "VideoPopup",
  __ssrInlineRender: true,
  props: {
    showPopup: {
      type: Boolean,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const videoElement = ref(null);
    const props = __props;
    const emit = __emit;
    const closeVideo = () => {
      emit("close");
    };
    const getYoutubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : "error";
    };
    const isYouTubeVideo = computed(() => {
      const regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
      return regExp.test(props.videoUrl);
    });
    watch(() => props.showPopup, (newValue) => {
      if (newValue && !isYouTubeVideo.value) {
        nextTick(() => {
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        appear: "",
        show: __props.showPopup,
        as: "template"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-50 w-full",
              onClose: closeVideo
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-75"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-75" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), {
                          class: "rounded-2xl bg-white",
                          style: {
                            width: "calc(100vw - 40px)",
                            maxWidth: "1200px"
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="relative aspect-video"${_scopeId4}>`);
                              if (isYouTubeVideo.value) {
                                _push5(`<div class="plyr__video-embed h-full"${_scopeId4}><iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${getYoutubeId(__props.videoUrl)}?autoplay=1`)} allowfullscreen allow="autoplay" class="w-full h-full rounded-2xl"${_scopeId4}></iframe></div>`);
                              } else {
                                _push5(`<div class="h-full"${_scopeId4}><video class="plyr-video w-full h-full rounded-2xl" crossorigin${_scopeId4}><source${ssrRenderAttr("src", __props.videoUrl)} type="video/mp4"${_scopeId4}></video></div>`);
                              }
                              _push5(`<button class="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"${_scopeId4}><span class="sr-only"${_scopeId4}>Close</span><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId4}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId4}></path></svg></button></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "relative aspect-video" }, [
                                  isYouTubeVideo.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "plyr__video-embed h-full"
                                  }, [
                                    createVNode("iframe", {
                                      src: `https://www.youtube.com/embed/${getYoutubeId(__props.videoUrl)}?autoplay=1`,
                                      allowfullscreen: "",
                                      allow: "autoplay",
                                      class: "w-full h-full rounded-2xl"
                                    }, null, 8, ["src"])
                                  ])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "h-full"
                                  }, [
                                    createVNode("video", {
                                      ref_key: "videoElement",
                                      ref: videoElement,
                                      class: "plyr-video w-full h-full rounded-2xl",
                                      crossorigin: ""
                                    }, [
                                      createVNode("source", {
                                        src: __props.videoUrl,
                                        type: "video/mp4"
                                      }, null, 8, ["src"])
                                    ], 512)
                                  ])),
                                  createVNode("button", {
                                    class: "absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors",
                                    onClick: closeVideo
                                  }, [
                                    createVNode("span", { class: "sr-only" }, "Close"),
                                    (openBlock(), createBlock("svg", {
                                      class: "w-6 h-6",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M6 18L18 6M6 6l12 12"
                                      })
                                    ]))
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), {
                            class: "rounded-2xl bg-white",
                            style: {
                              width: "calc(100vw - 40px)",
                              maxWidth: "1200px"
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "relative aspect-video" }, [
                                isYouTubeVideo.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "plyr__video-embed h-full"
                                }, [
                                  createVNode("iframe", {
                                    src: `https://www.youtube.com/embed/${getYoutubeId(__props.videoUrl)}?autoplay=1`,
                                    allowfullscreen: "",
                                    allow: "autoplay",
                                    class: "w-full h-full rounded-2xl"
                                  }, null, 8, ["src"])
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "h-full"
                                }, [
                                  createVNode("video", {
                                    ref_key: "videoElement",
                                    ref: videoElement,
                                    class: "plyr-video w-full h-full rounded-2xl",
                                    crossorigin: ""
                                  }, [
                                    createVNode("source", {
                                      src: __props.videoUrl,
                                      type: "video/mp4"
                                    }, null, 8, ["src"])
                                  ], 512)
                                ])),
                                createVNode("button", {
                                  class: "absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors",
                                  onClick: closeVideo
                                }, [
                                  createVNode("span", { class: "sr-only" }, "Close"),
                                  (openBlock(), createBlock("svg", {
                                    class: "w-6 h-6",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M6 18L18 6M6 6l12 12"
                                    })
                                  ]))
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-75" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      createVNode("div", { class: "flex min-h-full items-center justify-center p-4" }, [
                        createVNode(unref(TransitionChild), {
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), {
                              class: "rounded-2xl bg-white",
                              style: {
                                width: "calc(100vw - 40px)",
                                maxWidth: "1200px"
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "relative aspect-video" }, [
                                  isYouTubeVideo.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "plyr__video-embed h-full"
                                  }, [
                                    createVNode("iframe", {
                                      src: `https://www.youtube.com/embed/${getYoutubeId(__props.videoUrl)}?autoplay=1`,
                                      allowfullscreen: "",
                                      allow: "autoplay",
                                      class: "w-full h-full rounded-2xl"
                                    }, null, 8, ["src"])
                                  ])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "h-full"
                                  }, [
                                    createVNode("video", {
                                      ref_key: "videoElement",
                                      ref: videoElement,
                                      class: "plyr-video w-full h-full rounded-2xl",
                                      crossorigin: ""
                                    }, [
                                      createVNode("source", {
                                        src: __props.videoUrl,
                                        type: "video/mp4"
                                      }, null, 8, ["src"])
                                    ], 512)
                                  ])),
                                  createVNode("button", {
                                    class: "absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors",
                                    onClick: closeVideo
                                  }, [
                                    createVNode("span", { class: "sr-only" }, "Close"),
                                    (openBlock(), createBlock("svg", {
                                      class: "w-6 h-6",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M6 18L18 6M6 6l12 12"
                                      })
                                    ]))
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative z-50 w-full",
                onClose: closeVideo
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-75" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    createVNode("div", { class: "flex min-h-full items-center justify-center p-4" }, [
                      createVNode(unref(TransitionChild), {
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), {
                            class: "rounded-2xl bg-white",
                            style: {
                              width: "calc(100vw - 40px)",
                              maxWidth: "1200px"
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "relative aspect-video" }, [
                                isYouTubeVideo.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "plyr__video-embed h-full"
                                }, [
                                  createVNode("iframe", {
                                    src: `https://www.youtube.com/embed/${getYoutubeId(__props.videoUrl)}?autoplay=1`,
                                    allowfullscreen: "",
                                    allow: "autoplay",
                                    class: "w-full h-full rounded-2xl"
                                  }, null, 8, ["src"])
                                ])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "h-full"
                                }, [
                                  createVNode("video", {
                                    ref_key: "videoElement",
                                    ref: videoElement,
                                    class: "plyr-video w-full h-full rounded-2xl",
                                    crossorigin: ""
                                  }, [
                                    createVNode("source", {
                                      src: __props.videoUrl,
                                      type: "video/mp4"
                                    }, null, 8, ["src"])
                                  ], 512)
                                ])),
                                createVNode("button", {
                                  class: "absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors",
                                  onClick: closeVideo
                                }, [
                                  createVNode("span", { class: "sr-only" }, "Close"),
                                  (openBlock(), createBlock("svg", {
                                    class: "w-6 h-6",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M6 18L18 6M6 6l12 12"
                                    })
                                  ]))
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VideoPopup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/assets/images/about-us/sheffield_in_numbers.png");
const _imports_1 = publicAssetsURL("/assets/images/team/MD - Suresh Kanotra website.jpg");
const _imports_2 = publicAssetsURL("/assets/images/team/Saveer-Singh-Vohra.jpg");
const _imports_3 = publicAssetsURL("/assets/images/team/samman.jpg");
const _imports_4 = publicAssetsURL("/assets/images/team/Vikas-removebg-preview.jpg");
const _imports_5 = publicAssetsURL("/assets/images/team/Simon.jpg");
const _imports_6 = publicAssetsURL("/assets/images/team/Ann Ajode Pic.jpg");
const _imports_7 = publicAssetsURL("/assets/images/team/Mwangi_2.jpg");
const _imports_8 = publicAssetsURL("/assets/images/team/Hari G.JPG");
const _imports_9 = publicAssetsURL("/assets/images/about-us/our-culture.jpg");
const _imports_10 = publicAssetsURL("/assets/images/about-us/csr.png");
const _imports_11 = publicAssetsURL("/assets/images/about-us/csr/csr_2.jpg");
const _imports_12 = publicAssetsURL("/assets/images/about-us/csr/environment.png");
const _imports_13 = publicAssetsURL("/assets/images/about-us/csr/csr_1.jpg");
const _imports_14 = publicAssetsURL("/assets/images/about-us/csr/social-impact.png");
const _imports_15 = publicAssetsURL("/assets/images/partners/partners1.jpg");
const _imports_16 = publicAssetsURL("/assets/images/partners/partners2.jpg");
const _imports_17 = publicAssetsURL("/assets/images/partners/partners3.jpg");
const _imports_18 = publicAssetsURL("/assets/images/partners/partners4.jpg");
const _imports_19 = publicAssetsURL("/assets/images/partners/partners5.jpg");
const _imports_20 = publicAssetsURL("/assets/images/partners/partners6.jpg");
const _imports_21 = publicAssetsURL("/assets/images/about-us/video/iCombi.mp4");
const videoUrl = "/assets/images/about-us/sheffiled_tour.mov";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useAxios();
    useHead({
      title: "About Us",
      meta: [
        {
          name: "description",
          content: "Sheffield Steel Systems Limited was founded in 2003 and has since expanded to become East Africa\u2019s leading solution and service provider for Commercial Kitchen, Laundry, and Cold Storage Solutions, with a distinct specialization in Stainless Steel Fabrication and Customization."
        }
      ]
    });
    const isVideoPopupVisible = ref(false);
    const hideVideoPopup = () => {
      isVideoPopupVisible.value = false;
    };
    const projectsCount = ref(0);
    const conceptsCount = ref(0);
    const trainingdemosCount = ref(0);
    const yearsCount = ref(0);
    const stopCount = ref(0);
    const staffCount = ref(0);
    const engineersCount = ref(0);
    const executiveCount = ref(0);
    const designCount = ref(0);
    const inhouseCount = ref(0);
    const dataCounter = [
      { count: 10981, ref: projectsCount },
      { count: 2058, ref: conceptsCount },
      { count: 1805, ref: trainingdemosCount },
      { count: 20, ref: yearsCount },
      { count: 1, ref: stopCount },
      { count: 221, ref: staffCount },
      { count: 105, ref: engineersCount },
      { count: 45, ref: executiveCount },
      { count: 12, ref: designCount },
      { count: 6, ref: inhouseCount }
    ];
    const state = reactive({
      isSectionInView: false,
      observer: null
    });
    const animateCounters = () => {
      dataCounter.forEach((counter) => {
        setInterval();
      });
    };
    ref(null);
    watch(
      () => state.isSectionInView,
      (newValue) => {
        if (newValue) {
          animateCounters();
        }
      }
    );
    const clientList = ref([]);
    ref([]);
    const MethodologyResults = ref([]);
    const partnersSlider = [
      {
        image: "/assets/images/about-us/video/logos/rational.png",
        mobileImage: "/assets/images/about-us/video/logos/rational.png",
        url: "/assets/images/about-us/video/iCombi.mp4"
      },
      {
        image: "/assets/images/about-us/video/logos/Prisma Food.jpg",
        mobileImage: "/assets/images/about-us/video/logos/Prisma Food.jpg",
        url: "/assets/images/about-us/video/Prismafood.mp4"
      },
      {
        image: "/assets/images/about-us/video/logos/broaster.jpg",
        mobileImage: "/assets/images/about-us/video/logos/broaster.jpg",
        url: "/assets/images/about-us/video/PressureFryers.mp4"
      },
      {
        image: "/assets/images/about-us/video/logos/f4e.jpg",
        mobileImage: "/assets/images/about-us/video/logos/f4e.jpg",
        url: "/assets/images/about-us/video/FOOD_FOR_EDUCATION_GIGA_KITCHEN.mp4"
      },
      {
        image: "/assets/images/about-us/video/logos/mambo_safi_.jpg",
        mobileImage: "/assets/images/about-us/video/logos/mambo_safi_.jpg",
        url: "/assets/images/about-us/video/Mambo_Safi_Laundromat.mp4"
      },
      {
        image: "/assets/images/about-us/video/logos/sheffield.jpg",
        mobileImage: "/assets/images/about-us/video/logos/sheffield.jpg",
        url: "/assets/images/about-us/video/Sheffield_Africa_Suresh_Kanotra.mp4"
      }
    ];
    const isDesktop = ref(true);
    const items1 = [
      {
        image: "/assets/images/about-us/slider/history1.jpg",
        mobileImage: "/assets/images/about-us/slider/history1.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/history2.jpg",
        mobileImage: "/assets/images/about-us/slider/history3.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/history3.jpg",
        mobileImage: "/assets/images/about-us/slider/history3.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      }
    ];
    const items2 = [
      {
        image: "/assets/images/about-us/slider/mob-slider1.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider1.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/mob-slider2.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider2.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/mob-slider3.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider3.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/mob-slider4.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider4.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/mob-slider5.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider5.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/mob-slider6.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider6.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/mob-slider7.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider7.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/mob-slider8.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider8.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      },
      {
        image: "/assets/images/about-us/slider/mob-slider9.jpg",
        mobileImage: "/assets/images/about-us/slider/mob-slider9.jpg",
        alt: "Our History at Sheffield first slide",
        intro: {
          title: "Our History at Sheffield first slide"
        }
      }
    ];
    const items = isDesktop.value ? items1 : items2;
    const scrollableContainer = ref(null);
    const ulHeight = ref("");
    const updateUlHeight = () => {
      if (scrollableContainer.value) {
        const containerHeight = scrollableContainer.value.clientHeight;
        if (containerHeight == 0) {
          ulHeight.value = "417px";
        } else {
          ulHeight.value = `${containerHeight}px`;
        }
      }
    };
    watch(scrollableContainer, updateUlHeight);
    ref(false);
    ref(null);
    const getImage = (item) => {
      if (isDesktop.value) {
        return item.image;
      } else {
        return item.mobileImage;
      }
    };
    const adjustTheClass1Height = () => {
      const carouselHeight = this.$refs.carousel.$el.offsetHeight;
      this.$refs.carousel.$el.closest(".theClass1-wrapper").style.height = carouselHeight + "px";
    };
    ref("");
    const videoPlayer = ref(null);
    const isVideoPaused = (videoUrl2) => {
      return videoPlayer.value.src !== videoUrl2 || videoPlayer.value.paused;
    };
    const playVideo = (videoUrl2, checkboxId) => {
      const videoBasePath = void 0;
      const videoButtons = (void 0).querySelectorAll(".play-button");
      videoButtons.forEach((videoButton) => {
        const checkbox = videoButton.querySelector(".checkbox-play");
        if (checkbox) {
          checkbox.checked = false;
        }
      });
      const fullNewVideoURL = videoBasePath + videoUrl2;
      if (videoPlayer.value.src === fullNewVideoURL) {
        if (!isVideoPaused(fullNewVideoURL)) {
          videoPlayer.value.pause();
          const checkbox = (void 0).getElementById(checkboxId);
          if (checkbox) {
            checkbox.checked = true;
          }
        } else {
          videoPlayer.value.play();
          const checkbox = (void 0).getElementById(checkboxId);
          if (checkbox) {
            checkbox.checked = false;
          }
        }
      } else {
        videoPlayer.value.src = videoUrl2;
        videoPlayer.value.play();
        const checkbox = (void 0).getElementById(checkboxId);
        if (checkbox) {
          checkbox.checked = false;
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VideoPopup = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "main" }, _attrs))} data-v-e9d3a0ba><div class="page-content pg-white" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="page-content pg-white who-we-are-section" data-v-e9d3a0ba><div class="overlay" data-v-e9d3a0ba></div><div class="pt-5 pb-2" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-12" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-lg-6 who-we-are" style="${ssrRenderStyle({ "background-color": "#ffffff73", "padding": "20px" })}" data-v-e9d3a0ba><h2 class="our-history-title" data-v-e9d3a0ba>Who We Are</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Transforming Ideas into Sustainable Realities </p><p class="who-we-are-p" data-v-e9d3a0ba> Sheffield Steel Systems Limited was founded in 2003 and has since expanded to become East Africa\u2019s leading solution and service provider for Commercial Kitchen, Laundry, and Cold Storage Solutions, with a distinct specialization in Stainless Steel Fabrication and Customization. We are a Kenyan company headquartered in Nairobi, with additional offices in Uganda and Rwanda. Our project executions span the continent, reaching from Ethiopia, Burundi, South Sudan, and Nigeria to Congo, as we explore new territories and business lines. We are a Pan-African company dedicated to providing solutions built to last in Africa. </p></div><div class="col-lg-6" data-v-e9d3a0ba><div class="banner video-banner-about" style="${ssrRenderStyle({ "background-color": "unset !important" })}" data-v-e9d3a0ba><div class="video-banner video-banner-bg bg-image text-center" style="${ssrRenderStyle({})}" data-v-e9d3a0ba><div class="container container-video-button" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-e9d3a0ba><a class="btn-video btn-iframe" data-v-e9d3a0ba><i class="icon-play" data-v-e9d3a0ba></i></a>`);
      _push(ssrRenderComponent(_component_VideoPopup, {
        "show-popup": isVideoPopupVisible.value,
        "video-url": videoUrl,
        onClose: hideVideoPopup
      }, null, _parent));
      _push(`</div><span class="view-sheffield" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-e9d3a0ba><a class="" data-v-e9d3a0ba>View Sheffield</a></span></div></div></div></div></div></div></div></div></div></div></div><div class="page-content pg-white" data-v-e9d3a0ba><div class="container pt-3" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-12" data-v-e9d3a0ba><h2 class="our-history-title" data-v-e9d3a0ba>Our History</h2>`);
      _push(ssrRenderComponent(unref(Carousel), {
        ref: "scrollableContainerCarosel",
        class: "carousel-wrapper",
        "per-page": 1,
        autoplay: 5e3,
        "wrap-around": true,
        "pause-autoplay-on-hover": true,
        onLoad: adjustTheClass1Height
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
            ssrRenderList(unref(items), (item, index2) => {
              _push2(ssrRenderComponent(unref(Slide), { key: index2 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", getImage(item))}${ssrRenderAttr("alt", item.alt)} data-v-e9d3a0ba${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: getImage(item),
                        alt: item.alt
                      }, null, 8, ["src", "alt"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(items), (item, index2) => {
                return openBlock(), createBlock(unref(Slide), { key: index2 }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: getImage(item),
                      alt: item.alt
                    }, null, 8, ["src", "alt"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="page-content bg-image-breaker bg-image-breaker2" data-v-e9d3a0ba></div><div id="our-methodology-section" class="page-content pt-5 our-methodology-section" style="${ssrRenderStyle({
        backgroundImage: "url(/assets/images/methodology-gray.jpg)"
      })}" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-12" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><h2 class="our-history-title mt-3" data-v-e9d3a0ba>Sheffield Methodology</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> At Sheffield, our differentiating factor is you- Our Customer </p><p class="about-us-p" data-v-e9d3a0ba> We are 100% focused &amp; committed to creating and implementing solutions for you and your business. Sheffield is flexible to your evolving needs and we will work hard to ensure they are continuously met. <br data-v-e9d3a0ba>Our main service touch points and processes for Customer Satisfaction include: </p><div class="row" data-v-e9d3a0ba><div class="col-md-12 justify-content-center" data-v-e9d3a0ba><div class="row justify-content-left links-container mt-3 mb-3" data-v-e9d3a0ba><!--[-->`);
      ssrRenderList(MethodologyResults.value, (item, index2) => {
        _push(`<div class="${ssrRenderClass([{
          "left-class": item.direction === "left",
          "right-class": item.direction === "right",
          "down-class": item.direction === "down"
        }, "methodology-item"])}" data-v-e9d3a0ba><div class="methodology-item-internal" data-v-e9d3a0ba><div class="met-image" data-v-e9d3a0ba><img${ssrRenderAttr("src", item.image)} data-v-e9d3a0ba></div><div class="met-description" data-v-e9d3a0ba><span data-v-e9d3a0ba>${ssrInterpolate(item.title)}</span></div><div class="met-text" data-v-e9d3a0ba><span data-v-e9d3a0ba>${ssrInterpolate(item.text)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div></div></div><div class="page-content pb-0 page-content-counter" style="${ssrRenderStyle({
        backgroundImage: "url(/assets/images/sheffield_stainless_steel_background.jpg)"
      })}" data-v-e9d3a0ba><div class="${ssrRenderClass([{ visible: state.isSectionInView }, "container mt-0 counter-section"])}" data-v-e9d3a0ba><div class="row text-center icon-boxes-container" data-v-e9d3a0ba><div class="col counter_col" data-v-e9d3a0ba><i class="fa fa-user text-primary" style="${ssrRenderStyle({ "font-size": "3.5rem" })}" data-v-e9d3a0ba></i><h3 class="count-to text-primary mb-0" data-v-e9d3a0ba>${ssrInterpolate(projectsCount.value)}+</h3><p data-v-e9d3a0ba>Projects</p></div><div class="col counter_col" data-v-e9d3a0ba><i class="fa fa-star text-primary" style="${ssrRenderStyle({ "font-size": "3.5rem" })}" data-v-e9d3a0ba></i><h3 class="count-to text-primary mb-0" data-v-e9d3a0ba>${ssrInterpolate(conceptsCount.value)}+</h3><p data-v-e9d3a0ba>Innovative Concepts</p></div><div class="col counter_col" data-v-e9d3a0ba><i class="fa fa-coffee text-primary" style="${ssrRenderStyle({ "font-size": "3.5rem" })}" data-v-e9d3a0ba></i><h3 class="count-to text-primary mb-0" data-v-e9d3a0ba>${ssrInterpolate(trainingdemosCount.value)}+ </h3><p data-v-e9d3a0ba>Training Demos</p></div><div class="col counter_col" data-v-e9d3a0ba><i class="far fa-chart-bar text-primary" style="${ssrRenderStyle({ "font-size": "3.5rem" })}" data-v-e9d3a0ba></i><h3 class="count-to text-primary mb-0" data-v-e9d3a0ba>${ssrInterpolate(yearsCount.value)}+</h3><p data-v-e9d3a0ba>Years\u2019 Experience</p></div><div class="col counter_col" data-v-e9d3a0ba><i class="far fa-chart-bar text-primary" style="${ssrRenderStyle({ "font-size": "3.5rem" })}" data-v-e9d3a0ba></i><h3 class="count-to text-primary mb-0" data-v-e9d3a0ba>${ssrInterpolate(stopCount.value)}</h3><p data-v-e9d3a0ba>Stop Shop Solution</p></div></div></div></div><div class="page-content pg-white our-people-section" data-v-e9d3a0ba><div class="pt-6" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row pt-5 pb-5" data-v-e9d3a0ba><div class="col-md-6 people-text" data-v-e9d3a0ba><h2 class="about-us-title" data-v-e9d3a0ba>Our People</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Meet Our Exceptional Team </p><p class="about-us-p" data-v-e9d3a0ba> Sheffield proudly introduces our team of highly qualified professionals, each possessing expertise in engineering, project management, and technical skills. They are integral to the process of innovation and the implementation of <a href="#our-methodology-section" data-v-e9d3a0ba>The Sheffield Methodology</a>. </p></div><div class="${ssrRenderClass([{ visible: state.isSectionInView }, "col-md-6"])}" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_0)} data-v-e9d3a0ba><div class="people-numbers staff" data-v-e9d3a0ba><span class="number" data-v-e9d3a0ba>${ssrInterpolate(staffCount.value)}+</span><span class="number-title" data-v-e9d3a0ba>Staff</span></div><div class="people-numbers engineering-crew" data-v-e9d3a0ba><span class="number" data-v-e9d3a0ba>${ssrInterpolate(engineersCount.value)}+</span><span class="number-title" data-v-e9d3a0ba>Engineering &amp; Technical Skilled Crew</span></div><div class="people-numbers leaders" data-v-e9d3a0ba><span class="number" data-v-e9d3a0ba>${ssrInterpolate(executiveCount.value)}+</span><span class="number-title" data-v-e9d3a0ba>Executive Leaders</span></div><div class="people-numbers design" data-v-e9d3a0ba><span class="number" data-v-e9d3a0ba>${ssrInterpolate(designCount.value)}+</span><span class="number-title" data-v-e9d3a0ba>Design Engineers</span></div><div class="people-numbers in-house" data-v-e9d3a0ba><span class="number" data-v-e9d3a0ba>${ssrInterpolate(inhouseCount.value)}+</span><span class="number-title" data-v-e9d3a0ba>In-house Chefs &amp; Baristas</span></div></div></div></div></div></div></div><div class="page-content bg-image-breaker bg-image-breaker3" data-v-e9d3a0ba></div><div class="page-content pg-my-grey pt-5 leadership-section" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-10 offset-lg-1" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-12 pt-5" data-v-e9d3a0ba><h2 class="about-us-title" data-v-e9d3a0ba>Leadership</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Meet the Minds Behind Our Success </p><p class="about-us-p" data-v-e9d3a0ba> Our leadership team is made up of dedicated, focused, and experienced executives working with each other and their teams to implement Sheffield\u2019s strategy and vision, their knowledge and experience come together to make a difference for all our stakeholders. </p></div></div></div></div><div class="row" data-v-e9d3a0ba><div class="col-md-10 offset-lg-1 justify-content-center" data-v-e9d3a0ba><div class="row about-team-container about-team-container1 justify-content-center" data-v-e9d3a0ba><div class="col-md-3 mt-4" data-v-e9d3a0ba><div class="about-team" data-v-e9d3a0ba><div class="about-team-white" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_1)} data-v-e9d3a0ba></div><div class="details" data-v-e9d3a0ba><div class="name" data-v-e9d3a0ba>Dr. Suresh Kanotra</div><div class="job-title" data-v-e9d3a0ba>Managing Director</div></div><div class="description description-text-right" data-v-e9d3a0ba> Dr. Suresh Kanotra, the founder of Sheffield Africa, envisioned the need in the African market for solutions &amp; services in the food and beverage industry. With an engineering background, he started Sheffield Steel Systems Limited and continuously seeks to innovate &amp; tailor-make durable, efficient, and smart solutions. </div></div></div><div class="col-md-3 mt-4" data-v-e9d3a0ba><div class="about-team" data-v-e9d3a0ba><div class="about-team-white" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_2)} data-v-e9d3a0ba></div><div class="details" data-v-e9d3a0ba><div class="name" data-v-e9d3a0ba>Saveer Vohra</div><div class="job-title" data-v-e9d3a0ba>Financial Director</div></div><div class="description description-text-right" data-v-e9d3a0ba> Mr. Saveer Vohra has a Bachelor\u2019s degree in Civil Engineering and a Master\u2019s in Finance from the University of Warwick in the UK. As the Financial Director, he ensures the Company is aligned with financial growth, strategy, and a profitable vision. </div></div></div><div class="col-md-3 mt-4" data-v-e9d3a0ba><div class="about-team" data-v-e9d3a0ba><div class="about-team-white" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_3)} data-v-e9d3a0ba></div><div class="details" data-v-e9d3a0ba><div class="name" data-v-e9d3a0ba>Samman Vohra</div><div class="job-title" data-v-e9d3a0ba> Business Development &amp; Strategy Director </div></div><div class="description description-text-left" data-v-e9d3a0ba> Samman is a distinguished graduate from the CASS Business School, City University of London, with a strong background in business, economics, finance, and marketing. Leveraging international exposure and academic expertise, Samman works on special projects, drives revenue growth, identifies new opportunities, and strengthens the Sheffield brand whilst managing partnerships, aligning business goals, and providing cross-functional leadership, contributing significantly to our company&#39;s success and vision for the future. </div></div></div></div><div class="row about-team-container about-team-container2 mb-3" data-v-e9d3a0ba><div class="col mt-4" data-v-e9d3a0ba><div class="about-team" data-v-e9d3a0ba><div class="about-team-white" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_4)} data-v-e9d3a0ba></div><div class="details" data-v-e9d3a0ba><div class="name" data-v-e9d3a0ba>Vikas Sharma</div><div class="job-title" data-v-e9d3a0ba>Business Development Head</div></div><div class="description description-text-right" data-v-e9d3a0ba> As the Business Development Head, Vikas drives the organization&#39;s business growth strategies and enhances the current portfolio to explore new business opportunities. With a rich experience ranging from Strategic Management, Marketing, and Brand Management that has had a positive impact on Sheffield\u2019s operations, he efficiently executes business strategies that are in line with the organizational objectives. </div></div></div><div class="col mt-4" data-v-e9d3a0ba><div class="about-team" data-v-e9d3a0ba><div class="about-team-white" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_5)} data-v-e9d3a0ba></div><div class="details" data-v-e9d3a0ba><div class="name" data-v-e9d3a0ba>Simon Mbugua</div><div class="job-title" data-v-e9d3a0ba>Head of Design &amp; Development</div></div><div class="description description-text-right" data-v-e9d3a0ba> A Mechanical Engineer by profession, Simon specializes in product design 3D &amp; 2D, plant maintenance, lean Six Sigma manufacturing, workshop practices, and structural design and integrity. He leads the team of 2D &amp; 3D design engineers, research &amp; development, and project planning. </div></div></div><div class="col mt-4" data-v-e9d3a0ba><div class="about-team" data-v-e9d3a0ba><div class="about-team-white" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_6)} data-v-e9d3a0ba></div><div class="details" data-v-e9d3a0ba><div class="name" data-v-e9d3a0ba>Ann Ajode</div><div class="job-title" data-v-e9d3a0ba>Customer Relations Manager</div></div><div class="description description-text-right" data-v-e9d3a0ba> Ann is a proactive &amp; efficient and customer relations professional with over 12 years of experience in business development, sales, marketing, and operations coordination with a background in International Relations. She facilitates smooth workflow processes, communication, and integration to enhance customer satisfaction through quality management systems. The customer is the top most priority for her and her team who ensure communication and support through the contact points from enquiries, job processing, execution and after sales support. </div></div></div><div class="col mt-4" data-v-e9d3a0ba><div class="about-team" data-v-e9d3a0ba><div class="about-team-white" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_7)} data-v-e9d3a0ba></div><div class="details" data-v-e9d3a0ba><div class="name" data-v-e9d3a0ba>Joseph Mwangi</div><div class="job-title" data-v-e9d3a0ba>Service &amp; Installations Manager</div></div><div class="description description-text-left" data-v-e9d3a0ba> Mwangi supervises all the installation and service technicians to ensure the successful execution of all Sheffield projects by managing all the resources at the site and on the ground including project managers, the technical team, equipment, machinery, materials, and time. With a technical and engineering background, he ensures accurate and effective operations of all projects. </div></div></div><div class="col mt-4" data-v-e9d3a0ba><div class="about-team" data-v-e9d3a0ba><div class="about-team-white" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_8)} data-v-e9d3a0ba></div><div class="details" data-v-e9d3a0ba><div class="name" data-v-e9d3a0ba>Hari Singh</div><div class="job-title" data-v-e9d3a0ba>Sales Head</div></div><div class="description description-text-left" data-v-e9d3a0ba> Hari has over 20 Years of experience in Business Development, Distribution, Market Expansion, Penetration and Product Development. He drives the Sheffield sales team to realize the organization&#39;s sales goals by leading from the front as the Sales Head to a team that covers the East African Region and Segments. He is responsible for the successful prospecting, planning, execution, monitoring, and closure of sales projects. </div></div></div></div></div></div></div></div><div class="page-content our-culture" style="${ssrRenderStyle({
        backgroundImage: "url(/assets/images/about-us/our-culture.jpg)"
      })}" data-v-e9d3a0ba><div class="row no-margin" data-v-e9d3a0ba><div class="col-md-12" data-v-e9d3a0ba><div class="cuture-image" data-v-e9d3a0ba><img class=""${ssrRenderAttr("src", _imports_9)} data-v-e9d3a0ba><div class="culture-text-box" data-v-e9d3a0ba><h2 class="about-us-title" data-v-e9d3a0ba>Culture</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Fostering Innovation </p><p class="our-culture-p" data-v-e9d3a0ba> At Sheffield, we cultivate a collaborative work culture with an open-door policy that fosters interaction and underscores our commitment to collective teamwork dynamics. This cultural synergy is nurtured by inspirational leaders who are unafraid to take calculated risks for the betterment of the organization. As a company that thrives on fresh ideas in both product and concept design, Sheffield&#39;s environment promotes open-mindedness, innovation, and a sense of purpose among our dedicated and driven employees. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "btn btn-primary btn-round mt-4",
        to: "/careers"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<b data-v-e9d3a0ba${_scopeId}>View Sheffield Careers</b>`);
          } else {
            return [
              createVNode("b", null, "View Sheffield Careers")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="page-content pg-white csr-section" data-v-e9d3a0ba><div class="pt-6" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row pt-5 pb-5" data-v-e9d3a0ba><div class="col-lg-10 offset-lg-1" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-6 csr-image" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_10)} data-v-e9d3a0ba></div><div class="col-md-6 csr-text" data-v-e9d3a0ba><h2 class="about-us-title" data-v-e9d3a0ba>CSR</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Making a Difference Through Commitment </p><p class="about-us-p" data-v-e9d3a0ba> Sheffield Africa has been dedicated to corporate social responsibility from its inception. Our commitment to making a positive impact is driven by a policy that guides initiatives in Environment &amp; Social Impact. </p></div><div class="col-md-6 csr_image_impact" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_11)} data-v-e9d3a0ba><div class="text-block" data-v-e9d3a0ba><div class="csr-icon-text" data-v-e9d3a0ba><span data-v-e9d3a0ba>ENVIRONMENT</span></div><div class="csr-icon-image" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_12)} data-v-e9d3a0ba></div></div></div><div class="col-md-6 csr_image_impact" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_13)} data-v-e9d3a0ba><div class="text-block" data-v-e9d3a0ba><div class="csr-icon-text" data-v-e9d3a0ba><span data-v-e9d3a0ba>SOCIAL IMPACT</span></div><div class="csr-icon-image" data-v-e9d3a0ba><img${ssrRenderAttr("src", _imports_14)} data-v-e9d3a0ba></div></div></div></div></div></div></div></div></div><div class="page-content bg-image-breaker bg-image-breaker4" data-v-e9d3a0ba></div><div class="page-content bg-about-white div-after-bg-image-breaker" data-v-e9d3a0ba><div class="pt-6 mb-lg-8" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-10 offset-lg-1" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-lg-12 mb-lg-0 pt-4" data-v-e9d3a0ba><h2 class="about-us-title" data-v-e9d3a0ba>Partners</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Nurturing Innovation, Embracing Unity </p></div></div><div class="row partners-logos" data-v-e9d3a0ba><div class="col-lg-2 col-sm-6 col-xs-6" data-v-e9d3a0ba><img width="100%"${ssrRenderAttr("src", _imports_15)} data-v-e9d3a0ba></div><div class="col-lg-2 col-sm-6 col-xs-6" data-v-e9d3a0ba><img width="100%"${ssrRenderAttr("src", _imports_16)} data-v-e9d3a0ba></div><div class="col-lg-2 col-sm-6 col-xs-6" data-v-e9d3a0ba><img width="100%"${ssrRenderAttr("src", _imports_17)} data-v-e9d3a0ba></div><div class="col-lg-2 col-sm-6 col-xs-6" data-v-e9d3a0ba><img width="100%"${ssrRenderAttr("src", _imports_18)} data-v-e9d3a0ba></div><div class="col-lg-2 col-sm-6 col-xs-6" data-v-e9d3a0ba><img width="100%"${ssrRenderAttr("src", _imports_19)} data-v-e9d3a0ba></div><div class="col-lg-2 col-sm-6 col-xs-6" data-v-e9d3a0ba><img width="100%"${ssrRenderAttr("src", _imports_20)} data-v-e9d3a0ba></div></div></div></div></div></div></div><div class="page-content pg-my-grey" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-lg-10 offset-lg-1 mb-5 mt-5" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-12 mb-3 mb-lg-0 pt-4" data-v-e9d3a0ba><h2 class="about-us-title" data-v-e9d3a0ba>Clients</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Partnering with Industry Leaders </p></div></div><div class="row main-clients" data-v-e9d3a0ba><div class="clients-container mt-3 mb-5" data-v-e9d3a0ba><!--[-->`);
      ssrRenderList(clientList.value, (client) => {
        _push(`<div class="" data-v-e9d3a0ba><article class="" data-v-e9d3a0ba><figure class="" data-v-e9d3a0ba><img${ssrRenderAttr("src", ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(client.main_image_path))} alt="image desc" data-v-e9d3a0ba></figure></article></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div><div class="page-content bg-about-white div-after-bg-image-breaker" data-v-e9d3a0ba><div class="pt-6 mb-lg-8" data-v-e9d3a0ba><div class="container" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-md-10 offset-lg-1" data-v-e9d3a0ba><div class="row" data-v-e9d3a0ba><div class="col-lg-12 mb-3 mb-lg-0 pt-4 mobile-header" data-v-e9d3a0ba><h2 class="about-us-title" data-v-e9d3a0ba>Partners</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Nurturing Innovation, Embracing Unity </p></div></div><div class="row mt-3" data-v-e9d3a0ba><div class="col-md-5 video-section" data-v-e9d3a0ba><div class="video-player" data-v-e9d3a0ba><video controls${ssrRenderAttr("src", _imports_21)} loop data-v-e9d3a0ba></video></div></div><div class="col-md-6 offset-md-1" data-v-e9d3a0ba><div class="desktop-header-partners" data-v-e9d3a0ba><h2 class="about-us-title" data-v-e9d3a0ba>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/media" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Media `);
          } else {
            return [
              createTextVNode(" Media ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h2><p class="lead about-us-lead text-primary mb-1" data-v-e9d3a0ba> Explore Insights from the Media gallery of Sheffield </p></div><p class="about-us-p mb-4 ml-2 mr-2" data-v-e9d3a0ba> Embark on a dynamic exploration through our MEDIA section, revealing a curated collection of blogs, partner videos, company insights, and essential technical resources. Uncover a world of knowledge that empowers and inspires, seamlessly tailored to fuel your curiosity and drive innovation. </p><div class="my-carosel-section" data-v-e9d3a0ba>`);
      _push(ssrRenderComponent(unref(Carousel), {
        ref: "scrollableContainerCarosel",
        "items-to-show": 4,
        class: "carousel-wrapper",
        "per-page": 1,
        "wrap-around": true,
        "pause-autoplay-on-hover": true,
        onLoad: adjustTheClass1Height
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
            ssrRenderList(partnersSlider, (item, index2) => {
              _push2(ssrRenderComponent(unref(Slide), { key: index2 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="carousel-div-image" data-v-e9d3a0ba${_scopeId2}><img${ssrRenderAttr("src", getImage(item))}${ssrRenderAttr("alt", item.alt)} data-v-e9d3a0ba${_scopeId2}><div class="play-button" data-v-e9d3a0ba${_scopeId2}><label${ssrRenderAttr("for", "checkbox" + index2)} class="label-play" data-v-e9d3a0ba${_scopeId2}><div class="play_pause_icon play" data-v-e9d3a0ba${_scopeId2}></div></label><input${ssrRenderAttr("id", "checkbox" + index2)} class="checkbox-play" type="checkbox" data-v-e9d3a0ba${_scopeId2}></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "carousel-div-image" }, [
                        createVNode("img", {
                          src: getImage(item),
                          alt: item.alt
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "play-button" }, [
                          createVNode("label", {
                            for: "checkbox" + index2,
                            class: "label-play",
                            onClick: ($event) => playVideo(item.url, "checkbox" + index2)
                          }, [
                            createVNode("div", { class: "play_pause_icon play" })
                          ], 8, ["for", "onClick"]),
                          createVNode("input", {
                            id: "checkbox" + index2,
                            class: "checkbox-play",
                            type: "checkbox"
                          }, null, 8, ["id"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(partnersSlider, (item, index2) => {
                return createVNode(unref(Slide), { key: index2 }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "carousel-div-image" }, [
                      createVNode("img", {
                        src: getImage(item),
                        alt: item.alt
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "play-button" }, [
                        createVNode("label", {
                          for: "checkbox" + index2,
                          class: "label-play",
                          onClick: ($event) => playVideo(item.url, "checkbox" + index2)
                        }, [
                          createVNode("div", { class: "play_pause_icon play" })
                        ], 8, ["for", "onClick"]),
                        createVNode("input", {
                          id: "checkbox" + index2,
                          class: "checkbox-play",
                          type: "checkbox"
                        }, null, 8, ["id"])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "btn btn-primary mt-5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` GO TO MEDIA <i class="icon-long-arrow-right" data-v-e9d3a0ba${_scopeId}></i>`);
          } else {
            return [
              createTextVNode(" GO TO MEDIA "),
              createVNode("i", { class: "icon-long-arrow-right" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></div></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about-us/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e9d3a0ba"]]);

export { index as default };
//# sourceMappingURL=index-C-JmzdUw.mjs.map
