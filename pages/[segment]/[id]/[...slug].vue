<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container d-flex align-items-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/">HOME</NuxtLink>
          </li>
          <li class="breadcrumb-item">
            <NuxtLink :to="`/${pageSegment.slug}`">
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
        <div v-if="status == 'pending'" class="products mb-3 products-section">
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
        <ClientOnly>
          <template #default>
            <div v-if="error || !pageSegment?.active" class="error-content">
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
            <div v-else class="row">
              <div class="col-lg-10">
                <div>
                  <!-- Toolbar -->
                  <div class="toolbox">
                    <div class="toolbox-left">
                      <div class="toolbox-info">
                        Showing
                        <span
                          >{{ productsData?.perPage }} of
                          {{ productsData?.total }}</span
                        >
                        Products
                      </div>
                    </div>
                    <div class="toolbox-right">
                      <div class="toolbox-sort">
                        <label for="sortby">Sort by:</label>
                        <div class="select-custom">
                          <select
                            id="sortby"
                            v-model="store.selectedSortOption"
                            name="sortby"
                            class="form-control"
                          >
                            <option value="">Default</option>
                            <option value="name_asc">Name A - Z</option>
                            <option value="name_desc">Name Z - A</option>
                            <option value="created_at_asc">Latest First</option>
                            <option value="created_at_desc">
                              Oldest First
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Products Grid -->
                  <div class="products mb-3 products-section">
                    <div class="row">
                      <div
                        v-for="product in productsData?.products"
                        :key="product.id"
                        class="col-6 col-md-3 col-lg-2 col-xl-2"
                      >
                        <div class="product product-7 text-center">
                          <figure class="product-media">
                            <NuxtLink :to="getProductLink(product)">
                              <NuxtImg
                                :src="assets(product.main_image_path)"
                                :alt="product?.name"
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
                                {{ product?.name }}
                              </NuxtLink>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                      <li
                        v-for="page in productsData?.links"
                        :key="page"
                        class="page-item"
                        :class="{ active: page?.active }"
                      >
                        <NuxtLink
                          class="page-link"
                          :to="createPageLink(page?.url)"
                        >
                          <span v-html="page?.label"></span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <!-- End .col-lg-9 -->
              <aside class="col-lg-2 order-lg-first">
                <div class="sidebar sidebar-shop sidebar-shop-category">
                  <div class="widget widget-clean">
                    <label>Filters:</label>
                    <button
                      class="btn btn-primary btn-sm sidebar-filter-clear"
                      @click="resetSortValues"
                    >
                      Clean All
                    </button>
                  </div>

                  <!-- End .widget widget-clean -->
                  <div
                    v-if="productsData?.categories.length"
                    class="widget widget-collapsible"
                  >
                    <h3 class="widget-title">
                      <a
                        data-toggle="collapse"
                        href="#widget-1"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-1"
                      >
                        Category
                      </a>
                    </h3>
                    <!-- End .widget-title -->
                    <div id="widget-1" class="show">
                      <div class="widget-body">
                        <!-- Filter items with loading state -->
                        <div class="filter-items filter-items-count">
                          <div
                            v-for="category in productsData?.categories"
                            :key="category.id"
                            class="filter-item"
                            :class="{ 'is-loading': store.isFilterLoading }"
                          >
                            <div class="custom-control custom-checkbox">
                              <input
                                :id="'cat-' + category.id"
                                type="checkbox"
                                class="custom-control-input"
                                :checked="
                                  store.checkedCategories[
                                    category_id
                                  ]?.includes(category.id)
                                "
                                :value="category.id"
                                :disabled="store.isFilterLoading"
                                @change="handleCheckboxChange(category.id)"
                              />
                              <label
                                class="custom-control-label"
                                :for="'cat-' + category.id"
                                >{{ category?.name }}</label
                              >
                              <span class="item-count">
                                <template v-if="!store.isFilterLoading">
                                  {{ category.category_products_count }}
                                </template>
                                <span
                                  v-else
                                  class="count-shimmer shimmer"
                                ></span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <!-- End .filter-items -->
                      </div>
                      <!-- End .widget-body -->
                    </div>
                    <!-- End .collapse -->
                  </div>
                  <div class="widget widget-collapsible">
                    <h3 class="widget-title">
                      <a
                        href="#widget-4"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-4"
                      >
                        Brand
                      </a>
                    </h3>

                    <!-- End .widget-title -->
                    <div id="widget-4" class="show">
                      <div class="widget-body">
                        <div class="filter-items">
                          <div
                            v-for="brand in productsData?.brands"
                            :key="brand.id"
                            class="filter-item"
                          >
                            <div class="custom-control custom-checkbox">
                              <input
                                :id="'brand-' + brand.product_brand.id"
                                type="checkbox"
                                class="custom-control-input"
                                :checked="
                                  store.checkedBrands[category_id]?.includes(
                                    brand.product_brand.id
                                  )
                                "
                                :value="brand.product_brand.id"
                                @change="
                                  handleCheckboxBrandChange(
                                    brand.product_brand.id
                                  )
                                "
                              />
                              <label
                                class="custom-control-label"
                                :for="'brand-' + brand.product_brand?.id"
                                >{{ brand.product_brand?.name }}</label
                              >
                            </div>
                            <!-- End .custom-checkbox -->
                          </div>
                        </div>
                        <!-- End .filter-items -->
                      </div>
                      <!-- End .widget-body -->
                    </div>
                    <!-- End .collapse -->
                  </div>
                </div>
                <!-- End .sidebar sidebar-shop -->
              </aside>
              <!-- End .col-lg-3 -->
            </div>
          </template>
          <template #fallback>
            <div class="products mb-3 products-section">
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
          </template>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  validate: async (route) => {
    return (
      APP_SEGMENTS.some((item) => item.slug === route.params.segment) &&
      route.params.id &&
      Number.isInteger(Number(route.params.id))
    );
  },
});

const route = useRoute();
const { segment, id } = route.params;
const { api } = useAxios();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug];

const category = slug[0];
const page = slug[2];

const productsFetched = ref(false);

const store = useProductsStore();

const createPageLink = (page) => {
  const label = page?.split("page=")[1];
  return page
    ? `/${segment}/${id}/${category}/page/${label}`
    : `/${segment}/${id}/${category}`;
};

// State
const title = ref(
  `${capitalizeMainWords(segment)} - ${capitalizeMainWords(category)}`
);
const category_id = ref(id ? parseInt(id) : 1);

// Initialize currentPage from URL if exists
if (page) {
  store.setCurrentPage(parseInt(page));
}

const pageSegment = computed(() => {
  return getSegment(segment);
});

// Main data fetching using useAsyncData
const {
  data: productsData,
  refresh: refreshProducts,
  status,
  error,
} = await useAsyncData(
  `products-${category_id.value}-${store.currentPage}-${JSON.stringify(
    store.checkedCategories
  )}-${JSON.stringify(store.checkedBrands)}-${store.selectedSortOption}`,
  async () => {
    const newCheckedCategories = {
      [category_id.value]: store.checkedCategories[category_id.value] || [],
    };
    store.setCheckedCategories(newCheckedCategories);

    const newCheckedBrands = {
      [category_id.value]: store.checkedBrands[category_id.value] || [],
    };
    store.setCheckedBrands(newCheckedBrands);

    const response = await api.get("/api/get-products", {
      params: {
        category_id: category_id.value,
        page: store.currentPage,
        per_page: store.perPage,
        checkedCategories: store.checkedCategories,
        checkedBrands: store.checkedBrands,
        selectedSortOption: store.selectedSortOption,
      },
    });

    productsFetched.value = true;

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
  },
  {
    server: true,
    lazy: false,
    watch: [() => store.currentPage],
  }
);

// SEO
useHead({
  title: title,
  meta: [
    {
      name: "description",
      content: title,
    },
  ],
});

// Filter handlers
async function handleCheckboxChange(categoryId) {
  store.setIsFilterLoading(true);
  let mainCategoryId = productsData.value?.theCategory.id;

  if (!(mainCategoryId in store.checkedCategories)) {
    const newCategories = { ...store.checkedCategories };
    newCategories[mainCategoryId] = [];
    store.setCheckedCategories(newCategories);
  }

  const categoryArray = [...(store.checkedCategories[mainCategoryId] || [])];

  if (categoryArray.includes(categoryId)) {
    const index = categoryArray.indexOf(categoryId);
    categoryArray.splice(index, 1);
  } else {
    categoryArray.push(categoryId);
  }

  const newCategories = { ...store.checkedCategories };
  newCategories[mainCategoryId] = categoryArray;
  store.setCheckedCategories(newCategories);

  try {
    useRouter().push(createPageLink("page=1"));
    await refreshProducts();
  } finally {
    store.setIsFilterLoading(false);
  }
}

async function handleCheckboxBrandChange(categoryId) {
  store.setIsFilterLoading(true);
  let mainCategoryId = productsData.value?.theCategory.id;

  if (!(mainCategoryId in store.checkedBrands)) {
    const newBrands = { ...store.checkedBrands };
    newBrands[mainCategoryId] = [];
    store.setCheckedBrands(newBrands);
  }

  const brandArray = [...(store.checkedBrands[mainCategoryId] || [])];

  if (brandArray.includes(categoryId)) {
    const index = brandArray.indexOf(categoryId);
    brandArray.splice(index, 1);
  } else {
    brandArray.push(categoryId);
  }

  const newBrands = { ...store.checkedBrands };
  newBrands[mainCategoryId] = brandArray;
  store.setCheckedBrands(newBrands);

  try {
    useRouter().push(createPageLink("page=1"));
    await refreshProducts();
  } finally {
    store.setIsFilterLoading(false);
  }
}

async function resetSortValues() {
  store.setIsFilterLoading(true);

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  store.resetFilters();

  try {
    useRouter().push(createPageLink("page=1"));
    await refreshProducts();
  } finally {
    store.setIsFilterLoading(false);
  }
}
</script>

<style>
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
