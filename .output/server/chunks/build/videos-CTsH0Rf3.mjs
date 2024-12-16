import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './ContentState-Dkx-zL53.mjs';
import { ref, computed, watch, withCtx, createVNode, unref, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel } from '@headlessui/vue';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { _ as _export_sfc, k as useAxios } from './server.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
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
  __name: "videos",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Videos | Media Center"
    });
    const videos2 = ref([]);
    const selectedVideo = ref(null);
    const isPaused = ref(true);
    const filteredVideos = ref(videos2.value);
    const searchTerm = ref("");
    const loading = ref(false);
    const error = ref(null);
    const videoElement = ref(null);
    useAxios();
    const isYouTubeVideo = computed(() => {
      return selectedVideo.value && selectedVideo.value.type !== "Upload";
    });
    const getYoutubeId = (url) => {
      if (!url) return "";
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : "";
    };
    const videoSrc = (video) => {
      if (!video) return "";
      return video.type === "Upload" ? assetsSync(video.file_path) : "";
    };
    const getVideoPoster = (video) => {
      if (!video) return null;
      if (video.thumbnail) return video.thumbnail;
      if (video.type !== "Upload" && video.video_url) {
        const videoId = getYoutubeId(video.video_url);
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
      return "/placeholder_image.webp";
    };
    const closeVideo = () => {
      selectedVideo.value = null;
      isPaused.value = true;
    };
    watch(searchTerm, (value) => {
      filteredVideos.value = videos2.value.filter((video) => {
        return video.name.toLowerCase().includes(value.toLowerCase());
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentState = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-616f401c><main class="main" data-v-616f401c><div class="page-content bg-gray-50" data-v-616f401c><div class="container mx-auto px-4" data-v-616f401c><div class="row" data-v-616f401c><div class="col-lg-10 offset-lg-1 media-video" data-v-616f401c><div class="flex justify-between items-center" data-v-616f401c><div data-v-616f401c><h2 class="about-us-title" data-v-616f401c>Videos</h2><p class="lead about-us-lead text-primary mb-1" data-v-616f401c> Explore our videos </p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "btn btn-primary btn-round btn-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon-long-arrow-left" data-v-616f401c${_scopeId}></i><span data-v-616f401c${_scopeId}>Back to Media Center</span>`);
          } else {
            return [
              createVNode("i", { class: "icon-long-arrow-left" }),
              createVNode("span", null, "Back to Media Center")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><span data-v-616f401c> Search for Videos </span><span class="relative" data-v-616f401c><input${ssrRenderAttr("value", searchTerm.value)} type="text" placeholder="Search videos..." class="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-red-600 shadow-sm mb-2" data-v-616f401c><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-v-616f401c><svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-616f401c><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" data-v-616f401c></path></svg></div></span>`);
      if (loading.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "loading",
          "content-type": "videos"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!filteredVideos.value.length && !loading.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "empty",
          "content-type": "videos"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!!error.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "error",
          "content-type": "videos"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (filteredVideos.value.length) {
        _push(`<div${ssrRenderAttrs({
          class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6",
          css: false
        })} data-v-616f401c>`);
        ssrRenderList(filteredVideos.value, (video) => {
          var _a;
          _push(`<div${ssrRenderAttr("data-index", video.id)} class="group relative rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300" data-v-616f401c><div class="aspect-video relative overflow-hidden cursor-pointer" data-v-616f401c><img${ssrRenderAttr("src", getVideoPoster(video))}${ssrRenderAttr("alt", video.name)} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-v-616f401c><div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" data-v-616f401c><div class="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300" data-v-616f401c><div class="${ssrRenderClass([{
            playing: ((_a = selectedVideo.value) == null ? void 0 : _a.id) === video.id && !isPaused.value
          }, "play-icon w-8 h-8"])}" data-v-616f401c><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8" data-v-616f401c><path d="M8 5v14l11-7z" data-v-616f401c></path></svg></div></div></div></div><div class="p-4" data-v-616f401c><h4 class="font-semibold text-gray-900 mb-2 line-clamp-2" style="${ssrRenderStyle({ "font-size": "1.6rem" })}" data-v-616f401c>${ssrInterpolate(video.name)}</h4></div></div>`);
        });
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(TransitionRoot), {
        appear: "",
        show: !!selectedVideo.value,
        as: "template"
      }, {
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
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-75" data-v-616f401c${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-75" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto" data-v-616f401c${_scopeId2}><div class="flex min-h-full items-center justify-center p-4" data-v-616f401c${_scopeId2}>`);
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
                            var _a, _b;
                            if (_push5) {
                              _push5(`<div class="relative aspect-video" data-v-616f401c${_scopeId4}>`);
                              if (isYouTubeVideo.value) {
                                _push5(`<div class="plyr__video-embed h-full" data-v-616f401c${_scopeId4}><iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${getYoutubeId(
                                  (_a = selectedVideo.value) == null ? void 0 : _a.video_url
                                )}?autoplay=1`)} allowfullscreen allow="autoplay" class="w-full h-full rounded-2xl" data-v-616f401c${_scopeId4}></iframe></div>`);
                              } else {
                                _push5(`<video${ssrRenderAttr("src", videoSrc(selectedVideo.value))} class="w-full h-full rounded-2xl" controls autoplay data-v-616f401c${_scopeId4}></video>`);
                              }
                              _push5(`<button class="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors" data-v-616f401c${_scopeId4}><span class="sr-only" data-v-616f401c${_scopeId4}>Close</span><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-616f401c${_scopeId4}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-616f401c${_scopeId4}></path></svg></button></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "relative aspect-video" }, [
                                  isYouTubeVideo.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "plyr__video-embed h-full"
                                  }, [
                                    createVNode("iframe", {
                                      src: `https://www.youtube.com/embed/${getYoutubeId(
                                        (_b = selectedVideo.value) == null ? void 0 : _b.video_url
                                      )}?autoplay=1`,
                                      allowfullscreen: "",
                                      allow: "autoplay",
                                      class: "w-full h-full rounded-2xl"
                                    }, null, 8, ["src"])
                                  ])) : (openBlock(), createBlock("video", {
                                    key: 1,
                                    ref_key: "videoElement",
                                    ref: videoElement,
                                    src: videoSrc(selectedVideo.value),
                                    class: "w-full h-full rounded-2xl",
                                    controls: "",
                                    autoplay: ""
                                  }, null, 8, ["src"])),
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
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode("div", { class: "relative aspect-video" }, [
                                  isYouTubeVideo.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "plyr__video-embed h-full"
                                  }, [
                                    createVNode("iframe", {
                                      src: `https://www.youtube.com/embed/${getYoutubeId(
                                        (_a = selectedVideo.value) == null ? void 0 : _a.video_url
                                      )}?autoplay=1`,
                                      allowfullscreen: "",
                                      allow: "autoplay",
                                      class: "w-full h-full rounded-2xl"
                                    }, null, 8, ["src"])
                                  ])) : (openBlock(), createBlock("video", {
                                    key: 1,
                                    ref_key: "videoElement",
                                    ref: videoElement,
                                    src: videoSrc(selectedVideo.value),
                                    class: "w-full h-full rounded-2xl",
                                    controls: "",
                                    autoplay: ""
                                  }, null, 8, ["src"])),
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
                            }),
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
                              default: withCtx(() => {
                                var _a;
                                return [
                                  createVNode("div", { class: "relative aspect-video" }, [
                                    isYouTubeVideo.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "plyr__video-embed h-full"
                                    }, [
                                      createVNode("iframe", {
                                        src: `https://www.youtube.com/embed/${getYoutubeId(
                                          (_a = selectedVideo.value) == null ? void 0 : _a.video_url
                                        )}?autoplay=1`,
                                        allowfullscreen: "",
                                        allow: "autoplay",
                                        class: "w-full h-full rounded-2xl"
                                      }, null, 8, ["src"])
                                    ])) : (openBlock(), createBlock("video", {
                                      key: 1,
                                      ref_key: "videoElement",
                                      ref: videoElement,
                                      src: videoSrc(selectedVideo.value),
                                      class: "w-full h-full rounded-2xl",
                                      controls: "",
                                      autoplay: ""
                                    }, null, 8, ["src"])),
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
                              }),
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
                            default: withCtx(() => {
                              var _a;
                              return [
                                createVNode("div", { class: "relative aspect-video" }, [
                                  isYouTubeVideo.value ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "plyr__video-embed h-full"
                                  }, [
                                    createVNode("iframe", {
                                      src: `https://www.youtube.com/embed/${getYoutubeId(
                                        (_a = selectedVideo.value) == null ? void 0 : _a.video_url
                                      )}?autoplay=1`,
                                      allowfullscreen: "",
                                      allow: "autoplay",
                                      class: "w-full h-full rounded-2xl"
                                    }, null, 8, ["src"])
                                  ])) : (openBlock(), createBlock("video", {
                                    key: 1,
                                    ref_key: "videoElement",
                                    ref: videoElement,
                                    src: videoSrc(selectedVideo.value),
                                    class: "w-full h-full rounded-2xl",
                                    controls: "",
                                    autoplay: ""
                                  }, null, 8, ["src"])),
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
                            }),
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
      _push(`</div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/videos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const videos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-616f401c"]]);

export { videos as default };
//# sourceMappingURL=videos-CTsH0Rf3.mjs.map
