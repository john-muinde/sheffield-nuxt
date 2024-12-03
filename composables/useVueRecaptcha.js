import { VueReCaptcha, useReCaptcha } from "vue-recaptcha-v3";
import { useNuxtApp } from "#app";

export const useVueRecaptcha = async () => {
  const { vueApp } = useNuxtApp();
  vueApp.use(VueReCaptcha, {
    siteKey: "6Ldyw1wpAAAAAGx6vRq1hhnnfKaKHPmcuJ0imPkT",
    loaderOptions: {
      autoHideBadge: true,
    },
  });
  return useReCaptcha;
};
