import i18n from "../i18n";

const isMobile = window && window.innerWidth < 992;

export const useLayoutStore = defineStore("layoutStore", {
  state: () => ({
    layout: "app",
    is_show_sidebar: !isMobile,
    is_show_search: false,
    is_dark_mode: false,
    dark_mode: "light",
    locale: null,
    menu_style: "vertical",
    layout_style: "full",
    countryList: [
      { code: "zh", name: "Chinese" },
      { code: "da", name: "Danish" },
      { code: "en", name: "English" },
      { code: "fr", name: "French" },
      { code: "de", name: "German" },
      { code: "el", name: "Greek" },
      { code: "hu", name: "Hungarian" },
      { code: "it", name: "Italian" },
      { code: "ja", name: "Japanese" },
      { code: "pl", name: "Polish" },
      { code: "pt", name: "Portuguese" },
      { code: "ru", name: "Russian" },
      { code: "es", name: "Spanish" },
      { code: "sv", name: "Swedish" },
      { code: "tr", name: "Turkish" },
    ],
  }),
  actions: {
    setLayout(payload) {
      this.layout = payload;
    },
    toggleSideBar(value) {
      this.is_show_sidebar = value;
    },
    toggleSearch(value) {
      this.is_show_search = value;
    },
    toggleLocale(value) {
      value = value || "en";
      i18n.global.locale.value = value;
      localStorage.setItem("i18n_locale", value);
      this.locale = value;
    },
    toggleDarkMode(value) {
      value = value || "light";
      localStorage.setItem("dark_mode", value);
      this.dark_mode = value;
      if (value == "light") {
        this.is_dark_mode = false;
      } else if (value == "dark") {
        this.is_dark_mode = true;
      } else if (value == "system") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          this.is_dark_mode = true;
        } else {
          this.is_dark_mode = false;
        }
      }

      if (this.is_dark_mode) {
        document.querySelector("body").classList.add("dark");
      } else {
        document.querySelector("body").classList.remove("dark");
      }
    },
    toggleMenuStyle(value) {
      value = value || "";
      localStorage.setItem("menu_style", value);
      this.menu_style = value;
      if (!value || value === "vertical") {
        if (isMobile) {
          this.is_show_sidebar = false;
          return;
        }
        this.is_show_sidebar = true;
      } else if (value === "collapsible-vertical") {
        this.is_show_sidebar = false;
      }
    },
    toggleLayoutStyle(value) {
      value = value || "";
      localStorage.setItem("layout_style", value);
      this.layout_style = value;
    },
  },
  getters: {
    layout: (state) => state.layout,
  },
});
