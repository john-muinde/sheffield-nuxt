<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container d-flex align-items-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/">HOME</NuxtLink>
          </li>
          <li class="breadcrumb-item">
            <NuxtLink :to="`/${pageSegment?.slug}`">
              {{ pageSegment?.name.toUpperCase() }}
            </NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ productsData?.theCategory?.name }}
          </li>
        </ol>
      </div>
    </nav>

    <div class="page-content">
      <div class="container">
        <!-- Loading state -->
        <div
          v-if="status === 'pending' && isFilterLoading"
          class="products mb-3"
        >
          <div class="row">
            <div
              v-for="n in 12"
              :key="n"
              class="col-6 col-md-3 col-lg-2 col-xl-2"
            >
              <div class="product product-7 text-center">
                <div class="product-media shimmer">
                  <div class="product-image-shimmer"></div>
                </div>
                <div class="product-body">
                  <div class="product-cat">
                    <div class="shimmer brand-shimmer"></div>
                  </div>
                  <div class="product-title">
                    <div class="shimmer title-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error || !pageSegment?.active" class="error-content">
          <i
            class="icon-exclamation-circle text-danger mb-4"
            style="font-size: 3rem"
          ></i>
          <h2 class="error-title mb-3">No Products Found</h2>
          <p class="error-message text-muted mb-4">
            We couldn't find any products in this category. This might be
            because:
          </p>
          <ul
            class="error-reasons text-left mb-4 mx-auto"
            style="max-width: 400px"
          >
            <li>The selected filters might be too restrictive</li>
            <li>The category might be temporarily empty</li>
            <li>New products might be coming soon</li>
            <li>{{ pageSegment?.active }}</li>
          </ul>
          <div class="error-actions">
            <button class="btn btn-primary me-3" @click="refreshProducts">
              Try Again
            </button>
            <NuxtLink to="/" class="btn btn-outline-primary">
              Browse All Products
            </NuxtLink>
          </div>
        </div>

        <!-- Products Content -->
        <div v-else-if="productsData?.products?.length" class="row">
          <div class="col-lg-10">
            <!-- Toolbar -->
            <div class="toolbox">
              <div class="toolbox-left">
                <div class="toolbox-info">
                  Showing
                  <span>
                    {{ Math.min(productsData.products.length, perPage) }}
                    of {{ productsData.total }}
                  </span>
                  Products
                </div>
              </div>
              <div class="toolbox-right">
                <div class="toolbox-sort">
                  <label for="sortby">Sort by:</label>
                  <div class="select-custom">
                    <select
                      id="sortby"
                      v-model="selectedSortOption"
                      name="sortby"
                      class="form-control"
                      @change="handleSortChange"
                    >
                      <option value="">Default</option>
                      <option value="name_asc">Name A - Z</option>
                      <option value="name_desc">Name Z - A</option>
                      <option value="created_at_asc">Latest First</option>
                      <option value="created_at_desc">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Products Grid -->
            <div class="products mb-3 products-section">
              <div class="row">
                <div
                  v-for="product in productsData.products"
                  :key="product.id"
                  class="col-6 col-md-3 col-lg-2 col-xl-2"
                >
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink :to="getProductLink(product)">
                        <NuxtImg
                          :src="assetsSync(product.main_image_path)"
                          :alt="product.name"
                          format="webp"
                          quality="80"
                          loading="lazy"
                          class="w-full h-auto object-cover product-image"
                        />
                      </NuxtLink>
                      <div class="product-action">
                        <button
                          type="button"
                          class="btn-product btn-cart"
                          @click="addToCart(product)"
                        >
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </figure>
                    <div class="product-body">
                      <div class="product-cat">
                        <NuxtLink :to="getProductLink(product)">
                          {{ product.product_brand?.name }}
                        </NuxtLink>
                      </div>
                      <h3 class="product-title">
                        <NuxtLink :to="getProductLink(product)">
                          {{ product.name }}
                        </NuxtLink>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <nav aria-label="Page navigation">
              Current Page: {{ currentPage }}
              <ul class="pagination justify-content-center">
                <li
                  v-for="page in productsData.links"
                  :key="page.label"
                  class="page-item"
                  :class="{ active: page.active }"
                >
                  <NuxtLink class="page-link" :to="createPageLink(page.url)">
                    <span v-html="page.label"></span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Filters Sidebar -->
          <aside class="col-lg-2 order-lg-first">
            <div class="sidebar sidebar-shop sidebar-shop-category">
              <div class="widget widget-clean">
                <label>Filters:</label>
                <button
                  class="btn btn-primary btn-sm sidebar-filter-clear"
                  @click="resetAllFilters"
                >
                  Clean All
                </button>
              </div>

              <!-- Category Filters -->
              <div
                v-if="productsData.categories.length"
                class="widget widget-collapsible"
              >
                <h3 class="widget-title">Category</h3>
                <div class="widget-body">
                  <div class="filter-items filter-items-count">
                    <div
                      v-for="category in productsData.categories"
                      :key="category.id"
                      class="filter-item"
                      :class="{ 'is-loading': isFilterLoading }"
                    >
                      <div class="custom-control custom-checkbox">
                        <input
                          :id="'cat-' + category.id"
                          type="checkbox"
                          class="custom-control-input"
                          :checked="isCategoryChecked(category.id)"
                          :disabled="isFilterLoading"
                          @change="toggleCategoryFilter(category.id)"
                        />
                        <label
                          class="custom-control-label"
                          :for="'cat-' + category.id"
                        >
                          {{ category.name }}
                        </label>
                        <span class="item-count">
                          {{ category.category_products_count }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Brand Filters -->
              <div class="widget widget-collapsible">
                <h3 class="widget-title">Brand</h3>
                <div class="widget-body">
                  <div class="filter-items">
                    <div
                      v-for="brand in productsData.brands"
                      :key="brand.id"
                      class="filter-item"
                    >
                      <div class="custom-control custom-checkbox">
                        <input
                          :id="'brand-' + brand.product_brand.id"
                          type="checkbox"
                          class="custom-control-input"
                          :checked="isBrandChecked(brand.product_brand.id)"
                          @change="toggleBrandFilter(brand.product_brand.id)"
                        />
                        <label
                          class="custom-control-label"
                          :for="'brand-' + brand.product_brand.id"
                        >
                          {{ brand.product_brand.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { SegmentInterface } from "~/types/meta-tags";

// Page Metadata
definePageMeta({
  validate: async (route) => {
    return getSegment(route.params.segment) !== undefined;
  },
});

// Composables and Stores
const route = useRoute();
const router = useRouter();
const { segment, id } = route.params;
const { api } = useAxios();
const {
  checkedCategories,
  checkedBrands,
  selectedSortOption,
  currentPage,
  perPage,
  isFilterLoading,
  addCategoryFilter,
  removeCategoryFilter,
  addBrandFilter,
  removeBrandFilter,
  resetFilters,
  setCurrentPage,
  setSortOption,
} = useProductFilters();

// Parse route params
const slug = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug];
const [category] = slug;

// State initialization
const categoryId = ref(id ? parseInt(id as string) : 1);
const pageSegment = computed(() => getSegment(segment));

// SEO and meta generation
const { generateSeoMeta, generateHeadInput } = useMetaGenerator();
const { metaTags, productListSchema, breadcrumbSchema, filterSchema } =
  useProductsPageSEO(
    computed(() => productsData.value),
    pageSegment.value as SegmentInterface
  );

// Fetch Products
const {
  data: productsData,
  refresh: refreshProducts,
  error,
  status,
} = await useAsyncData(
  `products-${categoryId.value}-${currentPage.value}`,
  async () => {
    try {
      const response = await api.get("/api/get-products", {
        params: {
          category_id: categoryId.value,
          page: currentPage.value,
          per_page: perPage.value,
          checkedCategories: checkedCategories.value,
          checkedBrands: checkedBrands.value,
          selectedSortOption: selectedSortOption.value,
        },
      });

      return {
        products: response.data.products.data,
        total: response.data.products.total,
        perPage: response.data.products.per_page,
        categories: response.data.categories,
        brands: response.data.brands,
        theCategory: response.data.the_category,
        totalPages: response.data.products.last_page,
        next_page_url: response.data.products.next_page_url,
        prev_page_url: response.data.products.prev_page_url,
        links: response.data.products.links,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  {
    server: true,
    immediate: true,
    watch: [
      () => currentPage.value,
      () => checkedCategories.value,
      () => checkedBrands.value,
      () => selectedSortOption.value,
    ],
  }
);

// Page Link Generator
const createPageLink = (page?: string) => {
  const label = page?.split("page=")[1];
  return page
    ? `/${segment}/${id}/${category}?page=${label}`
    : `/${segment}/${id}/${category}`;
};

// Filter Handling Methods
const isCategoryChecked = (categoryFilterId: number) => {
  const mainCategoryId = productsData.value?.theCategory?.id;
  return mainCategoryId
    ? checkedCategories.value[mainCategoryId]?.includes(categoryFilterId)
    : false;
};

const isBrandChecked = (brandId: number) => {
  const mainCategoryId = productsData.value?.theCategory?.id;
  return mainCategoryId
    ? checkedBrands.value[mainCategoryId]?.includes(brandId)
    : false;
};

const toggleCategoryFilter = async (categoryFilterId: number) => {
  const mainCategoryId = productsData.value?.theCategory?.id;
  if (!mainCategoryId) return;

  if (isCategoryChecked(categoryFilterId)) {
    removeCategoryFilter(mainCategoryId, categoryFilterId);
  } else {
    addCategoryFilter(mainCategoryId, categoryFilterId);
  }

  await applyAndRefresh();
};

const toggleBrandFilter = async (brandId: number) => {
  const mainCategoryId = productsData.value?.theCategory?.id;
  if (!mainCategoryId) return;

  if (isBrandChecked(brandId)) {
    removeBrandFilter(mainCategoryId, brandId);
  } else {
    addBrandFilter(mainCategoryId, brandId);
  }

  await applyAndRefresh();
};

const handleSortChange = async () => {
  await applyAndRefresh();
};

const resetAllFilters = async () => {
  resetFilters();
  await applyAndRefresh();
};

const applyAndRefresh = async () => {
  const mainCategoryId = productsData.value?.theCategory?.id;
  if (!mainCategoryId) return;

  try {
    setCurrentPage(1);
    await router.replace(createPageLink());
    await refreshProducts();
  } catch (error) {
    console.error("Error applying filters:", error);
  }
};

// SEO and Meta Setup
// SEO and Meta Setup
useHead(() => ({
  ...generateHeadInput(route, [
    productListSchema.value,
    breadcrumbSchema.value,
    filterSchema?.value,
  ]),
  title: productsData.value?.theCategory?.name
    ? `${productsData.value.theCategory.name} - ${pageSegment.value?.name} Products`
    : "Products",
  link: [
    ...(productsData.value?.prev_page_url
      ? [
          {
            rel: "prev",
            href: createPageLink(productsData.value.prev_page_url),
          },
        ]
      : []),
    ...(productsData.value?.next_page_url
      ? [
          {
            rel: "next",
            href: createPageLink(productsData.value.next_page_url),
          },
        ]
      : []),
  ],
}));

// Apply SEO Meta
useSeoMeta(generateSeoMeta(metaTags.value, route));

// Page Query Watcher
watch(
  () => route.query.page,
  (page) => {
    if (page) {
      setCurrentPage(parseInt(page as string));
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Add smooth transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Optimize existing shimmer animation */
.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
  will-change: background-position;
}

/* Add hardware acceleration for smoother animations */
.product,
.product-media,
.product-body {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}
.error-content {
  padding: unset !important;
  min-height: unset !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.filter-item.is-loading {
  opacity: 0.7;
  pointer-events: none;
}

.filter-item.is-loading .custom-control-label {
  color: #999;
}

.count-shimmer {
  display: inline-block;
  width: 20px;
  height: 16px;
  border-radius: 2px;
  vertical-align: middle;
}

/* Optional: Disabled checkbox styles */
.custom-control-input:disabled ~ .custom-control-label {
  cursor: not-allowed;
  opacity: 0.7;
}
/* Shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
}

.product-image-shimmer {
  /* height: 10px; */
  width: 100%;
  border-radius: 4px;
}

.brand-shimmer {
  height: 15px;
  width: 60%;
  margin: 8px auto;
}

.title-shimmer {
  height: 20px;
  width: 80%;
  margin: 8px auto;
}

/* Error styles */
.error-reasons {
  list-style: none;
  padding: 0;
}

.error-reasons li {
  padding: 8px 0;
  color: #666;
  border-bottom: 1px solid #eee;
}

.error-reasons li:before {
  content: "•";
  color: #dc3545;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.error-actions {
  margin: 2rem 0;
}

/* Existing styles */
.product-item {
  margin-bottom: 20px;
}

.custom-control-label {
  margin-right: 0rem;
}

.sidebar-shop-category .filter-items-count .filter-item {
  padding-right: 4rem !important;
}

.swal2-popup.swal2-toast .swal2-title {
  font-size: 1.5rem !important;
}

.swal2-container.swal2-bottom-end > .swal2-popup {
  background-color: #c02434;
}

.swal2-popup.swal2-toast .swal2-title {
  color: #ffffff;
}

@media (max-width: 768px) {
  .error-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .error-actions .btn {
    width: 100%;
  }
}
</style>
