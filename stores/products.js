// stores/products.js
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    isFilterLoading: false,
    checkedCategories: {},
    checkedBrands: {},
    selectedSortOption: "",
    currentPage: 1,
    perPage: 12,
    trackApiCalls: 0,
  }),

  actions: {
    setIsFilterLoading(loading) {
      this.isFilterLoading = loading;
    },
    setCheckedCategories(categories) {
      this.checkedCategories = categories;
    },
    setCheckedBrands(brands) {
      this.checkedBrands = brands;
    },
    setSortOption(option) {
      this.selectedSortOption = option;
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    incrementApiCalls() {
      this.trackApiCalls++;
    },
    resetFilters() {
      this.checkedCategories = {};
      this.checkedBrands = {};
      this.selectedSortOption = "";
    },
  },
  getters: {
    getFilters() {
      return {
        categories: this.checkedCategories,
        brands: this.checkedBrands,
        sort: this.selectedSortOption,
        page: this.currentPage,
        perPage: this.perPage,
        isFilterLoading: this.isFilterLoading,
        trackApiCalls: this.trackApiCalls,
      };
    },
  },
});
