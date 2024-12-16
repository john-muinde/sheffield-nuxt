import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';
import { b as useNuxtApp } from './server.mjs';

const useVueRecaptcha = async () => {
  const { vueApp } = useNuxtApp();
  vueApp.use(VueReCaptcha, {
    siteKey: "6Ldyw1wpAAAAAGx6vRq1hhnnfKaKHPmcuJ0imPkT",
    loaderOptions: {
      autoHideBadge: true
    }
  });
  return useReCaptcha;
};

export { useVueRecaptcha as u };
//# sourceMappingURL=useVueRecaptcha-Dk53wG_R.mjs.map
