import { useSSRContext, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, renderSlot, toDisplayString, createTextVNode, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "ContentState",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "loading",
      validator: (value) => ["loading", "empty", "error"].includes(value)
    },
    contentType: {
      type: String,
      required: true,
      default: "items"
    },
    searchTerm: {
      type: String,
      default: ""
    },
    loadingMessage: {
      type: String,
      default: ""
    },
    loadingSubMessage: {
      type: String,
      default: ""
    },
    emptyMessage: {
      type: String,
      default: ""
    },
    emptySubMessage: {
      type: String,
      default: ""
    },
    errorMessage: {
      type: String,
      default: ""
    },
    errorSubMessage: {
      type: String,
      default: ""
    },
    primaryColor: {
      type: String,
      default: "blue"
    }
  },
  emits: ["clear-search", "retry", "clear-filters"],
  setup(__props) {
    const contentIllustrations = {
      videos: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      images: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
      newsletters: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
      brochures: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      products: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      documents: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    };
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        appear: "",
        show: true
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div id="content-state" class="w-full min-h-[400px] flex flex-col items-center justify-center p-6" data-v-b3c4ac71${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TransitionChild), {
              enter: "duration-300 ease-out",
              "enter-from": "opacity-0 scale-95",
              "enter-to": "opacity-100 scale-100",
              leave: "duration-200 ease-in",
              "leave-from": "opacity-100 scale-100",
              "leave-to": "opacity-0 scale-95"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-center max-w-md mx-auto" data-v-b3c4ac71${_scopeId2}>`);
                  if (__props.type === "loading") {
                    _push3(`<div class="animate-in fade-in duration-500" data-v-b3c4ac71${_scopeId2}><div class="relative mx-auto w-24 h-24 mb-6" data-v-b3c4ac71${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "loading-icon", {}, () => {
                      _push3(`<div class="absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin" data-v-b3c4ac71${_scopeId2}></div><div class="absolute inset-3 rounded-full bg-primary-50 animate-pulse" data-v-b3c4ac71${_scopeId2}></div><div class="absolute inset-[14px] rounded-full bg-primary-500" data-v-b3c4ac71${_scopeId2}></div>`);
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</div><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-b3c4ac71${_scopeId2}>${ssrInterpolate(__props.loadingMessage || `Loading ${__props.contentType}...`)}</h3><p class="text-gray-500" data-v-b3c4ac71${_scopeId2}>${ssrInterpolate(__props.loadingSubMessage || `Please wait while we fetch the ${__props.contentType}`)}</p></div>`);
                  } else if (__props.type === "empty") {
                    _push3(`<div class="animate-in fade-in duration-500" data-v-b3c4ac71${_scopeId2}><div class="relative mx-auto w-24 h-24 mb-6" data-v-b3c4ac71${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "empty-icon", {}, () => {
                      _push3(`<div class="empty-state-animation" data-v-b3c4ac71${_scopeId2}><svg class="w-full h-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b3c4ac71${_scopeId2}>`);
                      if (contentIllustrations[__props.contentType]) {
                        _push3(`<path${ssrRenderAttr("d", contentIllustrations[__props.contentType])} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-v-b3c4ac71${_scopeId2}></path>`);
                      } else {
                        _push3(`<path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-v-b3c4ac71${_scopeId2}></path>`);
                      }
                      _push3(`</svg></div>`);
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</div><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-b3c4ac71${_scopeId2}>${ssrInterpolate(__props.searchTerm ? `No ${__props.contentType} found for "${__props.searchTerm}"` : __props.emptyMessage || `No ${__props.contentType} found`)}</h3><p class="text-gray-500 mb-6" data-v-b3c4ac71${_scopeId2}>${ssrInterpolate(__props.searchTerm ? "Try adjusting your search terms" : __props.emptySubMessage || `${capitalize(__props.contentType)} will appear here once added`)}</p><div class="flex flex-wrap justify-center gap-3" data-v-b3c4ac71${_scopeId2}>`);
                    if (__props.searchTerm) {
                      _push3(`<button class="btn-primary" data-v-b3c4ac71${_scopeId2}><svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b3c4ac71${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-b3c4ac71${_scopeId2}></path></svg> Clear search </button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    ssrRenderSlot(_ctx.$slots, "empty-actions", {}, null, _push3, _parent3, _scopeId2);
                    _push3(`</div></div>`);
                  } else if (__props.type === "error") {
                    _push3(`<div class="animate-in fade-in duration-500" data-v-b3c4ac71${_scopeId2}><div class="relative mx-auto w-24 h-24 mb-6" data-v-b3c4ac71${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "error-icon", {}, () => {
                      _push3(`<div class="absolute inset-0 rounded-full bg-red-100 animate-pulse" data-v-b3c4ac71${_scopeId2}></div><svg class="absolute inset-0 w-full h-full text-red-500 transform -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b3c4ac71${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-b3c4ac71${_scopeId2}></path></svg>`);
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</div><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-b3c4ac71${_scopeId2}>${ssrInterpolate(__props.errorMessage || `Error loading ${__props.contentType}`)}</h3><p class="text-gray-500 mb-6" data-v-b3c4ac71${_scopeId2}>${ssrInterpolate(__props.errorSubMessage || `There was an error loading the ${__props.contentType}`)}</p><div class="flex flex-wrap justify-center gap-3" data-v-b3c4ac71${_scopeId2}><button class="btn-error" data-v-b3c4ac71${_scopeId2}><svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b3c4ac71${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-b3c4ac71${_scopeId2}></path></svg> Try again </button>`);
                    ssrRenderSlot(_ctx.$slots, "error-actions", {}, () => {
                      _push3(`<button class="btn-secondary" data-v-b3c4ac71${_scopeId2}><svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-b3c4ac71${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l18 0" data-v-b3c4ac71${_scopeId2}></path></svg> Clear filters </button>`);
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center max-w-md mx-auto" }, [
                      __props.type === "loading" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "animate-in fade-in duration-500"
                      }, [
                        createVNode("div", { class: "relative mx-auto w-24 h-24 mb-6" }, [
                          renderSlot(_ctx.$slots, "loading-icon", {}, () => [
                            createVNode("div", { class: "absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin" }),
                            createVNode("div", { class: "absolute inset-3 rounded-full bg-primary-50 animate-pulse" }),
                            createVNode("div", { class: "absolute inset-[14px] rounded-full bg-primary-500" })
                          ], true)
                        ]),
                        createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, toDisplayString(__props.loadingMessage || `Loading ${__props.contentType}...`), 1),
                        createVNode("p", { class: "text-gray-500" }, toDisplayString(__props.loadingSubMessage || `Please wait while we fetch the ${__props.contentType}`), 1)
                      ])) : __props.type === "empty" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "animate-in fade-in duration-500"
                      }, [
                        createVNode("div", { class: "relative mx-auto w-24 h-24 mb-6" }, [
                          renderSlot(_ctx.$slots, "empty-icon", {}, () => [
                            createVNode("div", { class: "empty-state-animation" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-full h-full text-gray-300",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                contentIllustrations[__props.contentType] ? (openBlock(), createBlock("path", {
                                  key: 0,
                                  d: contentIllustrations[__props.contentType],
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "1.5"
                                }, null, 8, ["d"])) : (openBlock(), createBlock("path", {
                                  key: 1,
                                  d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "1.5"
                                }))
                              ]))
                            ])
                          ], true)
                        ]),
                        createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, toDisplayString(__props.searchTerm ? `No ${__props.contentType} found for "${__props.searchTerm}"` : __props.emptyMessage || `No ${__props.contentType} found`), 1),
                        createVNode("p", { class: "text-gray-500 mb-6" }, toDisplayString(__props.searchTerm ? "Try adjusting your search terms" : __props.emptySubMessage || `${capitalize(__props.contentType)} will appear here once added`), 1),
                        createVNode("div", { class: "flex flex-wrap justify-center gap-3" }, [
                          __props.searchTerm ? (openBlock(), createBlock("button", {
                            key: 0,
                            class: "btn-primary",
                            onClick: ($event) => _ctx.$emit("clear-search")
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 mr-2",
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
                            ])),
                            createTextVNode(" Clear search ")
                          ], 8, ["onClick"])) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "empty-actions", {}, void 0, true)
                        ])
                      ])) : __props.type === "error" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "animate-in fade-in duration-500"
                      }, [
                        createVNode("div", { class: "relative mx-auto w-24 h-24 mb-6" }, [
                          renderSlot(_ctx.$slots, "error-icon", {}, () => [
                            createVNode("div", { class: "absolute inset-0 rounded-full bg-red-100 animate-pulse" }),
                            (openBlock(), createBlock("svg", {
                              class: "absolute inset-0 w-full h-full text-red-500 transform -rotate-12",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1.5",
                                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              })
                            ]))
                          ], true)
                        ]),
                        createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, toDisplayString(__props.errorMessage || `Error loading ${__props.contentType}`), 1),
                        createVNode("p", { class: "text-gray-500 mb-6" }, toDisplayString(__props.errorSubMessage || `There was an error loading the ${__props.contentType}`), 1),
                        createVNode("div", { class: "flex flex-wrap justify-center gap-3" }, [
                          createVNode("button", {
                            class: "btn-error",
                            onClick: ($event) => _ctx.$emit("retry")
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 mr-2",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              })
                            ])),
                            createTextVNode(" Try again ")
                          ], 8, ["onClick"]),
                          renderSlot(_ctx.$slots, "error-actions", {}, () => [
                            createVNode("button", {
                              class: "btn-secondary",
                              onClick: ($event) => _ctx.$emit("clear-filters")
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 mr-2",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l18 0"
                                })
                              ])),
                              createTextVNode(" Clear filters ")
                            ], 8, ["onClick"])
                          ], true)
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                id: "content-state",
                class: "w-full min-h-[400px] flex flex-col items-center justify-center p-6"
              }, [
                createVNode(unref(TransitionChild), {
                  enter: "duration-300 ease-out",
                  "enter-from": "opacity-0 scale-95",
                  "enter-to": "opacity-100 scale-100",
                  leave: "duration-200 ease-in",
                  "leave-from": "opacity-100 scale-100",
                  "leave-to": "opacity-0 scale-95"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-center max-w-md mx-auto" }, [
                      __props.type === "loading" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "animate-in fade-in duration-500"
                      }, [
                        createVNode("div", { class: "relative mx-auto w-24 h-24 mb-6" }, [
                          renderSlot(_ctx.$slots, "loading-icon", {}, () => [
                            createVNode("div", { class: "absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin" }),
                            createVNode("div", { class: "absolute inset-3 rounded-full bg-primary-50 animate-pulse" }),
                            createVNode("div", { class: "absolute inset-[14px] rounded-full bg-primary-500" })
                          ], true)
                        ]),
                        createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, toDisplayString(__props.loadingMessage || `Loading ${__props.contentType}...`), 1),
                        createVNode("p", { class: "text-gray-500" }, toDisplayString(__props.loadingSubMessage || `Please wait while we fetch the ${__props.contentType}`), 1)
                      ])) : __props.type === "empty" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "animate-in fade-in duration-500"
                      }, [
                        createVNode("div", { class: "relative mx-auto w-24 h-24 mb-6" }, [
                          renderSlot(_ctx.$slots, "empty-icon", {}, () => [
                            createVNode("div", { class: "empty-state-animation" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-full h-full text-gray-300",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                contentIllustrations[__props.contentType] ? (openBlock(), createBlock("path", {
                                  key: 0,
                                  d: contentIllustrations[__props.contentType],
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "1.5"
                                }, null, 8, ["d"])) : (openBlock(), createBlock("path", {
                                  key: 1,
                                  d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "1.5"
                                }))
                              ]))
                            ])
                          ], true)
                        ]),
                        createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, toDisplayString(__props.searchTerm ? `No ${__props.contentType} found for "${__props.searchTerm}"` : __props.emptyMessage || `No ${__props.contentType} found`), 1),
                        createVNode("p", { class: "text-gray-500 mb-6" }, toDisplayString(__props.searchTerm ? "Try adjusting your search terms" : __props.emptySubMessage || `${capitalize(__props.contentType)} will appear here once added`), 1),
                        createVNode("div", { class: "flex flex-wrap justify-center gap-3" }, [
                          __props.searchTerm ? (openBlock(), createBlock("button", {
                            key: 0,
                            class: "btn-primary",
                            onClick: ($event) => _ctx.$emit("clear-search")
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 mr-2",
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
                            ])),
                            createTextVNode(" Clear search ")
                          ], 8, ["onClick"])) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "empty-actions", {}, void 0, true)
                        ])
                      ])) : __props.type === "error" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "animate-in fade-in duration-500"
                      }, [
                        createVNode("div", { class: "relative mx-auto w-24 h-24 mb-6" }, [
                          renderSlot(_ctx.$slots, "error-icon", {}, () => [
                            createVNode("div", { class: "absolute inset-0 rounded-full bg-red-100 animate-pulse" }),
                            (openBlock(), createBlock("svg", {
                              class: "absolute inset-0 w-full h-full text-red-500 transform -rotate-12",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1.5",
                                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              })
                            ]))
                          ], true)
                        ]),
                        createVNode("h3", { class: "text-xl font-semibold text-gray-900 mb-2" }, toDisplayString(__props.errorMessage || `Error loading ${__props.contentType}`), 1),
                        createVNode("p", { class: "text-gray-500 mb-6" }, toDisplayString(__props.errorSubMessage || `There was an error loading the ${__props.contentType}`), 1),
                        createVNode("div", { class: "flex flex-wrap justify-center gap-3" }, [
                          createVNode("button", {
                            class: "btn-error",
                            onClick: ($event) => _ctx.$emit("retry")
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 mr-2",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              })
                            ])),
                            createTextVNode(" Try again ")
                          ], 8, ["onClick"]),
                          renderSlot(_ctx.$slots, "error-actions", {}, () => [
                            createVNode("button", {
                              class: "btn-secondary",
                              onClick: ($event) => _ctx.$emit("clear-filters")
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 mr-2",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l18 0"
                                })
                              ])),
                              createTextVNode(" Clear filters ")
                            ], 8, ["onClick"])
                          ], true)
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 3
                })
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentState.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3c4ac71"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ContentState-Dkx-zL53.mjs.map
