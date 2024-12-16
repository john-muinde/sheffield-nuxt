import { s as setInterval } from './interval-gl53xdpR.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  data() {
    return {
      rotateIndex: 0,
      loadingTexts: [
        "Preparing your data...",
        "Almost there...",
        "Just a moment more..."
      ],
      currentLoadingTextIndex: 0
    };
  },
  computed: {
    rotateClasses() {
      return ["rotate-0", "rotate-90", "rotate-180", "rotate-270"][this.rotateIndex];
    },
    currentLoadingText() {
      return this.loadingTexts[this.currentLoadingTextIndex];
    }
  },
  mounted() {
    this.startRotationCycle();
    this.startTextCycle();
  },
  methods: {
    startRotationCycle() {
      setInterval();
    },
    startTextCycle() {
      setInterval();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center w-full min-h-[350px]" }, _attrs))} data-v-6da5eba4><div class="text-center" data-v-6da5eba4><div class="relative mx-auto w-48 h-48 mb-6" data-v-6da5eba4><svg class="absolute inset-0 w-full h-full text-rose-600/20" viewBox="0 0 100 100" data-v-6da5eba4><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="8" stroke-dasharray="282" class="animate-circle-dash" data-v-6da5eba4></circle></svg><div class="${ssrRenderClass([$options.rotateClasses, "absolute inset-0 flex items-center justify-center transform transition-all duration-300"])}" data-v-6da5eba4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-32 h-32 text-rose-600" data-v-6da5eba4><path d="M50 10 
                 Q70 30, 50 50 
                 Q30 70, 50 90 
                 Q70 70, 50 50 
                 Q30 30, 50 10 Z" fill="currentColor" class="animate-pulse" data-v-6da5eba4></path><circle cx="50" cy="50" r="5" fill="#ffffff" stroke="currentColor" stroke-width="2" data-v-6da5eba4></circle></svg></div></div><div class="space-y-2" data-v-6da5eba4><h3 class="text-2xl font-bold text-rose-900 animate-fade-in" data-v-6da5eba4>${ssrInterpolate($options.currentLoadingText)}</h3><p class="text-rose-700 opacity-75 animate-fade-in-delay" data-v-6da5eba4> We&#39;re gathering your information, just a moment... </p></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoadingData.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6da5eba4"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=LoadingData-Ctu2BGXV.mjs.map
