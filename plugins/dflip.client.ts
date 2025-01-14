// plugins/dflip.client.ts

declare global {
  interface Window {
    DFLIP?: {
      defaults: any;
      parseBooks: () => void;
    };
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  // Add any global DFlip functionality here if needed
  nuxtApp.vueApp.config.globalProperties.$dflip = {
    parseBooks: () => {
      if (window.DFLIP?.parseBooks) {
        window.DFLIP.parseBooks();
        return true;
      }
      return false;
    },
  };
});
