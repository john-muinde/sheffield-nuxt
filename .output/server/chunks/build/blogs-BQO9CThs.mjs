import { _ as __nuxt_component_0 } from './nuxt-link-b8Qz_wJG.mjs';
import { _ as __nuxt_component_1 } from './ContentState-Dkx-zL53.mjs';
import { _ as _sfc_main$1 } from './NuxtImg-BmkCHIFd.mjs';
import { a as assetsSync } from './file-DYudjGfO.mjs';
import { ref, computed, watch, watchEffect, withCtx, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useHead } from './vue.8fc199ce-DerijIML.mjs';
import { _ as _export_sfc, k as useAxios } from './server.mjs';
import '@headlessui/vue';
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
import 'ant-design-vue';
import 'axios';

const _sfc_main = {
  __name: "blogs",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Blogs | Media Center",
      meta: [
        {
          name: "description",
          content: "In-depth insights on various topics."
        }
      ]
    });
    const route = useRoute();
    const currentPage = ref(route.params.page ? parseInt(route.params.page) : 1);
    const perPage = ref(9);
    const totalPosts = ref(0);
    const posts = ref([]);
    const category_id = ref(route.params.id ? parseInt(route.params.id) : 1);
    ref([]);
    const loading = ref(false);
    const error = ref(null);
    const { api } = useAxios();
    const fetchBlogPosts = async () => {
      loading.value = true;
      try {
        const response = await api.get("/api/get-blogs", {
          params: {
            page: currentPage.value,
            per_page: perPage.value,
            category_id: category_id.value
          }
        });
        posts.value = response.data.data;
        totalPosts.value = response.data.total;
      } catch (error2) {
        error2.value = error2;
        console.error(error2);
      } finally {
        loading.value = false;
      }
    };
    const getBlogLink = (id, name) => {
      let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
      transformedName = transformedName.replace(/-+/g, "-");
      transformedName = transformedName.replace(/^-+|-+$/g, "");
      transformedName = transformedName.toLowerCase();
      return `/media/blogs/${id}/${transformedName}`;
    };
    const getBlogPageLink = (page) => {
      return `/media/blogs/page/${page}`;
    };
    const totalPages = computed(() => {
      return Math.ceil(totalPosts.value / perPage.value);
    });
    const displayedPosts = ref([]);
    const goToPreviousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const goToNextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    const goToThisPage = (page) => {
      currentPage.value = page;
    };
    const updateDisplayedPosts = () => {
      displayedPosts.value = posts.value;
    };
    const isInteger = (value) => {
      return Number.isInteger(value);
    };
    const generatePageLinks = computed(() => {
      const pageLinks = [];
      const maxVisiblePages = 5;
      if (currentPage.value > 1) {
        pageLinks.push("Prev");
      }
      let startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      for (let page = startPage; page <= endPage; page++) {
        pageLinks.push(page);
      }
      if (currentPage.value < totalPages.value) {
        pageLinks.push("Next");
      }
      return pageLinks;
    });
    const getFirstParagraph = (content) => {
      const tempElement = (void 0).createElement("div");
      tempElement.innerHTML = content;
      const paragraphs = tempElement.querySelectorAll("p");
      for (const paragraph of paragraphs) {
        const textContent = paragraph.textContent.trim();
        if (textContent.length > 50) {
          if (textContent.length > 140) {
            return textContent.slice(0, 144) + "...";
          } else {
            return textContent;
          }
        }
      }
      return "";
    };
    const getBlogParagraph = (content) => {
      if (content.length > 5) {
        if (content.length > 35) {
          return content.slice(0, 35) + "...";
        } else {
          return content;
        }
      }
      return "";
    };
    watch(currentPage, fetchBlogPosts);
    watch(posts, updateDisplayedPosts);
    watchEffect(() => {
      const params = route.params;
      route.query;
      if (params.id !== "" && category_id.value !== params.id) {
        currentPage.value = 1;
        category_id.value = params.id ? parseInt(params.id) : 1;
        if (params.page !== "" && currentPage.value !== params.page) {
          currentPage.value = params.page ? parseInt(params.page) : 1;
        }
        fetchBlogPosts();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentState = __nuxt_component_1;
      const _component_NuxtImg = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0df8c30b><main class="main" data-v-0df8c30b><div class="page-content" data-v-0df8c30b><div class="container" data-v-0df8c30b><div class="row" data-v-0df8c30b><div class="col-lg-10 offset-lg-1" data-v-0df8c30b><h2 class="about-us-title" data-v-0df8c30b>Blogs</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/media",
        class: "btn btn-primary btn-round btn-shadow float-right"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon-long-arrow-left" data-v-0df8c30b${_scopeId}></i><span data-v-0df8c30b${_scopeId}>Back to Media Center</span>`);
          } else {
            return [
              createVNode("i", { class: "icon-long-arrow-left" }),
              createVNode("span", null, "Back to Media Center")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="lead about-us-lead text-primary mb-3" data-v-0df8c30b> In-Depth Insights </p>`);
      if (loading.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "loading",
          "content-type": "Blog Posts"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!displayedPosts.value.length && !loading.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "empty",
          "content-type": "Blog Posts"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!!error.value) {
        _push(ssrRenderComponent(_component_ContentState, {
          type: "error",
          "content-type": "Blog Posts"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (displayedPosts.value.length) {
        _push(`<div class="row blogs-main-page-section" data-v-0df8c30b><!--[-->`);
        ssrRenderList(displayedPosts.value, (post) => {
          _push(`<div class="entry-item col-sm-6 col-lg-4" data-v-0df8c30b><article class="entry entry-grid" data-v-0df8c30b><figure class="entry-media entry-gallery" data-v-0df8c30b>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: getBlogLink(post.id, post.name)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(post.main_image_path),
                  alt: post.name,
                  format: "webp",
                  quality: "80",
                  loading: "lazy",
                  class: "w-full h-auto object-cover"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtImg, {
                    src: ("assetsSync" in _ctx ? _ctx.assetsSync : unref(assetsSync))(post.main_image_path),
                    alt: post.name,
                    format: "webp",
                    quality: "80",
                    loading: "lazy",
                    class: "w-full h-auto object-cover"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</figure><div class="entry-body" data-v-0df8c30b><h2 class="entry-title" data-v-0df8c30b>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: "text-primary",
            to: getBlogLink(post.id, post.name)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(getBlogParagraph(post.name))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(getBlogParagraph(post.name)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h2><div class="entry-content" data-v-0df8c30b><div class="mb-2" data-v-0df8c30b>${ssrInterpolate(getFirstParagraph(post.excerpt))}</div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: "btn btn-primary",
            to: getBlogLink(post.id, post.name)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Read More <i class="icon-long-arrow-right" data-v-0df8c30b${_scopeId}></i>`);
              } else {
                return [
                  createTextVNode(" Read More "),
                  createVNode("i", { class: "icon-long-arrow-right" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></article></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (displayedPosts.value.length) {
        _push(`<div class="row" data-v-0df8c30b><div class="col-md-12" data-v-0df8c30b><nav aria-label="Page navigation" data-v-0df8c30b><ul class="pagination justify-content-center" data-v-0df8c30b><li class="${ssrRenderClass([{
          disabled: currentPage.value === 1
        }, "page-item"])}" data-v-0df8c30b>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "page-link page-link-prev",
          to: getBlogPageLink(currentPage.value - 1),
          "aria-label": "Previous",
          tabindex: "-1",
          "aria-disabled": "true",
          onClick: goToPreviousPage
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span aria-hidden="true" data-v-0df8c30b${_scopeId}><i class="icon-long-arrow-left" data-v-0df8c30b${_scopeId}></i></span> Prev `);
            } else {
              return [
                createVNode("span", { "aria-hidden": "true" }, [
                  createVNode("i", { class: "icon-long-arrow-left" })
                ]),
                createTextVNode(" Prev ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><!--[-->`);
        ssrRenderList(generatePageLinks.value, (page) => {
          _push(`<li class="${ssrRenderClass([{
            active: page === currentPage.value
          }, "page-item"])}" data-v-0df8c30b>`);
          if (isInteger(page)) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              class: "page-link",
              to: getBlogPageLink(page),
              onClick: ($event) => goToThisPage(page)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(page)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(page), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--><li class="page-item-total" data-v-0df8c30b>of ${ssrInterpolate(totalPages.value)}</li><li class="${ssrRenderClass([{
          disabled: currentPage.value === totalPages.value
        }, "page-item"])}" data-v-0df8c30b>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "page-link page-link-next",
          to: getBlogPageLink(currentPage.value + 1),
          "aria-label": "Next",
          onClick: goToNextPage
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next <span aria-hidden="true" data-v-0df8c30b${_scopeId}><i class="icon-long-arrow-right" data-v-0df8c30b${_scopeId}></i></span>`);
            } else {
              return [
                createTextVNode(" Next "),
                createVNode("span", { "aria-hidden": "true" }, [
                  createVNode("i", { class: "icon-long-arrow-right" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></nav></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media/blogs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blogs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0df8c30b"]]);

export { blogs as default };
//# sourceMappingURL=blogs-BQO9CThs.mjs.map
