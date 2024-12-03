import Cookies from "js-cookie";

export const useLangStore = defineStore("langStore", {
  state: () => ({
    locale: getLocale(),
    locales: window.config.locales,
  }),
  getters: {
    locale: (state) => state.locale,
    locales: (state) => state.locales,
  },
  actions: {
    setLocale(locale) {
      this.locale = locale;
      Cookies.set("locale", locale, { expires: 365 });
    },
  },
});

/**
 * @return {String}
 */
function getLocale() {
  const { locale, locales } = window.config;
  const storedLocale = Cookies.get("locale");

  if (locales.includes(storedLocale)) {
    return storedLocale;
  } else if (storedLocale) {
    Cookies.remove("locale");
  }

  return locale;
}
