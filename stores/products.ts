// store/products.ts
export interface FilterState {
  isFilterLoading: boolean;
  checkedCategories: Record<number, number[]>;
  checkedBrands: Record<number, number[]>;
  categories?: Record<number, number[]>;
  brands?: Record<number, number[]>;
  sort?: SortOption;
  page?: number;
  selectedSortOption: SortOption;
  currentPage: number;
  perPage: number;
  trackApiCalls: number;
}

export type SortOption =
  | ""
  | "name_asc"
  | "name_desc"
  | "created_at_asc"
  | "created_at_desc";

export const useProductsStore = defineStore("products", {
  state: (): FilterState => ({
    isFilterLoading: false,
    checkedCategories: {},
    checkedBrands: {},
    selectedSortOption: "",
    currentPage: 1,
    perPage: 12,
    trackApiCalls: 0,
  }),

  actions: {
    setIsFilterLoading(loading: boolean) {
      // Force reactivity by creating a new state object
      this.$patch((state) => {
        state.isFilterLoading = loading;
      });
    },

    setCheckedCategories(categories: Record<number, number[]>) {
      this.$patch((state) => {
        state.checkedCategories = { ...categories };
      });
    },

    async addCategoryFilter(categoryId: number, filterId: number) {
      this.$patch((state) => {
        if (!state.checkedCategories[categoryId]) {
          state.checkedCategories[categoryId] = [];
        }
        if (!state.checkedCategories[categoryId].includes(filterId)) {
          state.checkedCategories[categoryId] = [
            ...state.checkedCategories[categoryId],
            filterId,
          ];
        }
      });
    },

    async removeCategoryFilter(categoryId: number, filterId: number) {
      this.$patch((state) => {
        if (state.checkedCategories[categoryId]) {
          state.checkedCategories[categoryId] = state.checkedCategories[
            categoryId
          ].filter((id) => id !== filterId);
        }
      });
    },

    setCheckedBrands(brands: Record<number, number[]>) {
      this.$patch((state) => {
        state.checkedBrands = { ...brands };
      });
    },

    async addBrandFilter(categoryId: number, brandId: number) {
      this.$patch((state) => {
        if (!state.checkedBrands[categoryId]) {
          state.checkedBrands[categoryId] = [];
        }
        if (!state.checkedBrands[categoryId].includes(brandId)) {
          state.checkedBrands[categoryId] = [
            ...state.checkedBrands[categoryId],
            brandId,
          ];
        }
      });
    },

    async removeBrandFilter(categoryId: number, brandId: number) {
      this.$patch((state) => {
        if (state.checkedBrands[categoryId]) {
          state.checkedBrands[categoryId] = state.checkedBrands[
            categoryId
          ].filter((id) => id !== brandId);
        }
      });
    },

    setSortOption(option: SortOption) {
      this.$patch((state) => {
        state.selectedSortOption = option;
      });
    },

    setCurrentPage(page: number) {
      this.$patch((state) => {
        state.currentPage = page;
      });
    },

    incrementApiCalls() {
      this.$patch((state) => {
        state.trackApiCalls++;
      });
    },

    resetFilters() {
      this.$patch((state) => {
        state.checkedCategories = {};
        state.checkedBrands = {};
        state.selectedSortOption = "";
        state.currentPage = 1;
      });
    },

    async applyFilters(
      categoryId: number,
      router: any,
      createPageLink: (page?: string) => string
    ) {
      // Create a loading lock to prevent race conditions
      if (this.isFilterLoading) return;

      this.setIsFilterLoading(true);

      try {
        await Promise.all([
          this.setCurrentPage(1),
          router.push(createPageLink("page=1")),
        ]);
        this.incrementApiCalls();
      } catch (error) {
        console.error("Error applying filters:", error);
      } finally {
        // Ensure loading state is updated in next tick
        await nextTick();
        this.setIsFilterLoading(false);
      }
    },
  },

  getters: {
    getFilters: (state): FilterState => ({
      ...state,
      checkedCategories: state.checkedCategories,
      checkedBrands: state.checkedBrands,
    }),

    hasActiveFilters: (state): boolean => {
      const hasCategories = Object.values(state.checkedCategories).some(
        (cats) => cats.length > 0
      );
      const hasBrands = Object.values(state.checkedBrands).some(
        (brands) => brands.length > 0
      );
      return hasCategories || hasBrands || !!state.selectedSortOption;
    },

    getActiveCategoryFilters:
      (state) =>
      (categoryId: number): number[] => {
        return [...(state.checkedCategories[categoryId] || [])];
      },

    getActiveBrandFilters:
      (state) =>
      (categoryId: number): number[] => {
        return [...(state.checkedBrands[categoryId] || [])];
      },

    getCurrentPageFilters: (state) => ({
      page: state.currentPage,
      perPage: state.perPage,
    }),
  },
});
