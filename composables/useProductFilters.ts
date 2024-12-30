// composables/useProductFilters.ts
export type SortOption =
  | ""
  | "name_asc"
  | "name_desc"
  | "created_at_asc"
  | "created_at_desc";

export const useProductFilters = () => {
  // Reactive state with proper typing and default values
  const checkedCategories = useState<Record<number, number[]>>(
    "checkedCategories",
    () => ({})
  );
  const checkedBrands = useState<Record<number, number[]>>(
    "checkedBrands",
    () => ({})
  );
  const selectedSortOption = useState<SortOption>(
    "selectedSortOption",
    () => ""
  );
  const currentPage = useState<number>("currentPage", () => 1);
  const perPage = useState<number>("perPage", () => 12);
  const isFilterLoading = useState<boolean>("isFilterLoading", () => false);
  const trackApiCalls = useState<number>("trackApiCalls", () => 0);

  // Computed properties for filter states
  const hasActiveFilters = computed(() => {
    const hasCategories = Object.values(checkedCategories.value).some(
      (cats) => cats.length > 0
    );
    const hasBrands = Object.values(checkedBrands.value).some(
      (brands) => brands.length > 0
    );
    return hasCategories || hasBrands || !!selectedSortOption.value;
  });

  // Methods with improved type safety and reactivity
  const setIsFilterLoading = (loading: boolean) => {
    isFilterLoading.value = loading;
  };

  const addCategoryFilter = (categoryId: number, filterId: number) => {
    if (!checkedCategories.value[categoryId]) {
      checkedCategories.value[categoryId] = [];
    }

    const categoryFilters = checkedCategories.value[categoryId];
    if (!categoryFilters.includes(filterId)) {
      categoryFilters.push(filterId);
    }
  };

  const removeCategoryFilter = (categoryId: number, filterId: number) => {
    if (checkedCategories.value[categoryId]) {
      const categoryFilters = checkedCategories.value[categoryId];
      const index = categoryFilters.indexOf(filterId);
      if (index !== -1) {
        categoryFilters.splice(index, 1);
      }
    }
  };

  const addBrandFilter = (categoryId: number, brandId: number) => {
    if (!checkedBrands.value[categoryId]) {
      checkedBrands.value[categoryId] = [];
    }

    const brandFilters = checkedBrands.value[categoryId];
    if (!brandFilters.includes(brandId)) {
      brandFilters.push(brandId);
    }
  };

  const removeBrandFilter = (categoryId: number, brandId: number) => {
    if (checkedBrands.value[categoryId]) {
      const brandFilters = checkedBrands.value[categoryId];
      const index = brandFilters.indexOf(brandId);
      if (index !== -1) {
        brandFilters.splice(index, 1);
      }
    }
  };

  const setCurrentPage = (page: number) => {
    currentPage.value = page;
  };

  const setSortOption = (option: SortOption) => {
    selectedSortOption.value = option;
  };

  const resetFilters = () => {
    checkedCategories.value = {};
    checkedBrands.value = {};
    selectedSortOption.value = "";
    currentPage.value = 1;
  };

  const applyFilters = async (
    categoryId: number,
    router: any,
    createPageLink: (page?: string) => string
  ) => {
    if (isFilterLoading.value) return;

    try {
      setIsFilterLoading(true);

      await Promise.all([
        Promise.resolve(setCurrentPage(1)),
        router.push(createPageLink("page=1")),
      ]);

      // Increment API call tracker
      trackApiCalls.value++;
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      // Use nextTick to ensure state update
      await nextTick();
      setIsFilterLoading(false);
    }
  };

  // Helper methods for getting active filters
  const getActiveCategoryFilters = (categoryId: number): number[] => {
    return [...(checkedCategories.value[categoryId] || [])];
  };

  const getActiveBrandFilters = (categoryId: number): number[] => {
    return [...(checkedBrands.value[categoryId] || [])];
  };

  return {
    // Reactive States
    checkedCategories,
    checkedBrands,
    selectedSortOption,
    currentPage,
    perPage,
    isFilterLoading,
    trackApiCalls,

    // Computed
    hasActiveFilters,

    // Methods
    setIsFilterLoading,
    addCategoryFilter,
    removeCategoryFilter,
    addBrandFilter,
    removeBrandFilter,
    setCurrentPage,
    setSortOption,
    resetFilters,
    applyFilters,

    // Getter Methods
    getActiveCategoryFilters,
    getActiveBrandFilters,
  };
};
