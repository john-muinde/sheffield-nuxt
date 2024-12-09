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
              {{ pageSegment.name.toUpperCase() }}
            </NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ the_category.name }}
          </li>
        </ol>
      </div>
    </nav>
    <div class="page-content">
      <div class="container">
        <ClientOnly>
          <template #default>
            <div class="row">
              <div class="col-lg-10">
                <div v-if="error" class="error-content">
                  <i
                    class="icon-exclamation-circle text-danger mb-4"
                    style="font-size: 3rem"
                  ></i>
                  <h2 class="error-title mb-3">No Products Found</h2>
                  <p class="error-message text-muted mb-4">
                    We couldn't find any products in this category. This might
                    be because:
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
                    <button class="btn btn-primary me-3" @click="fetchProducts">
                      Try Again
                    </button>
                    <NuxtLink to="/" class="btn btn-outline-primary">
                      Browse All Products
                    </NuxtLink>
                  </div>
                </div>
                <!-- Toolbar -->
                <div class="toolbox">
                  <div class="toolbox-left">
                    <div class="toolbox-info">
                      Showing
                      <span
                        >{{ totalCountperPage }} of {{ totalProducts }}</span
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
                          v-model="selectedSortOption"
                          name="sortby"
                          class="form-control"
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
                      v-for="product in displayedProducts"
                      :key="product.id"
                      class="col-6 col-md-3 col-lg-2 col-xl-2"
                    >
                      <div class="product product-7 text-center">
                        <figure class="product-media">
                          <NuxtLink :to="getProductLink(product)">
                            <NuxtImg
                              :src="assets(product.main_image_path)"
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

                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-center">
                    <li
                      class="page-item"
                      :class="{ disabled: currentPage === 1 }"
                    >
                      <NuxtLink
                        class="page-link page-link-prev"
                        :to="
                          getCategoryLink(
                            the_category.id,
                            the_category.name,
                            currentPage - 1
                          )
                        "
                        aria-label="Previous"
                        tabindex="-1"
                        aria-disabled="true"
                        @click="goToPreviousPage"
                      >
                        <span aria-hidden="true"
                          ><i class="icon-long-arrow-left"></i
                        ></span>
                        Prev
                      </NuxtLink>
                    </li>
                    <li
                      v-for="page in generatePageLinks"
                      :key="page"
                      class="page-item"
                      :class="{ active: page === currentPage }"
                    >
                      <template v-if="isInteger(page)">
                        <NuxtLink
                          class="page-link"
                          :to="
                            getCategoryLink(
                              the_category.id,
                              the_category.name,
                              page
                            )
                          "
                          @click="goToThisPage(page)"
                        >
                          {{ page }}
                        </NuxtLink>
                      </template>
                    </li>
                    <li class="page-item-total">of {{ totalPages }}</li>
                    <li
                      class="page-item"
                      :class="{
                        disabled: currentPage === totalPages,
                      }"
                    >
                      <NuxtLink
                        class="page-link page-link-next"
                        :to="
                          getCategoryLink(
                            the_category.id,
                            the_category.name,
                            currentPage + 1
                          )
                        "
                        aria-label="Next"
                        @click="goToNextPage"
                      >
                        Next
                        <span aria-hidden="true"
                          ><i class="icon-long-arrow-right"></i
                        ></span>
                      </NuxtLink>
                    </li>
                  </ul>
                </nav>
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
                    v-if="categories.length"
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
                            v-for="category in categories"
                            :key="category.id"
                            class="filter-item"
                            :class="{ 'is-loading': isFilterLoading }"
                          >
                            <div class="custom-control custom-checkbox">
                              <input
                                :id="'cat-' + category.id"
                                type="checkbox"
                                class="custom-control-input"
                                :value="category.id"
                                :disabled="isFilterLoading"
                                @change="handleCheckboxChange(category.id)"
                              />
                              <label
                                class="custom-control-label"
                                :for="'cat-' + category.id"
                                >{{ category.name }}</label
                              >
                              <span class="item-count">
                                <template v-if="!isFilterLoading">
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
                            v-for="brand in brands"
                            :key="brand.id"
                            class="filter-item"
                          >
                            <div class="custom-control custom-checkbox">
                              <input
                                :id="'brand-' + brand.product_brand.id"
                                type="checkbox"
                                class="custom-control-input"
                                :value="brand.product_brand.id"
                                @change="
                                  handleCheckboxBrandChange(
                                    brand.product_brand.id
                                  )
                                "
                              />
                              <label
                                class="custom-control-label"
                                :for="'brand-' + brand.product_brand.id"
                                >{{ brand.product_brand.name }}</label
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
import { ref, computed, watch, onMounted, watchEffect } from "vue";

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

// State
const isFilterLoading = ref(false);
const title = ref(
  `${capitalizeMainWords(segment)} - ${capitalizeMainWords(category)}`
);
const currentPage = ref(page ? parseInt(page) : 1);
const perPage = ref(12);
const totalProducts = ref(0);
const products = ref([]);
const totalCountperPage = ref(0);
const category_id = ref(id ? parseInt(id) : 1);
const categories = ref([]);
const brands = ref([]);
const the_category = ref([]);
const checkedCategories = ref({});
const checkedBrands = ref({});
const selectedSortOption = ref("");
const displayedProducts = ref([]);

const pageSegment = computed(() => {
  return getSegment(segment);
});

// Main data fetching using useAsyncData
const {
  data: productsData,
  refresh: refreshProducts,
  error,
} = await useAsyncData(
  `products-${category_id.value}-${currentPage.value}-${JSON.stringify(
    checkedCategories.value
  )}-${JSON.stringify(checkedBrands.value)}-${selectedSortOption.value}`,
  async () => {
    const newCheckedCategories = {
      [category_id.value]: checkedCategories.value[category_id.value] || [],
    };
    checkedCategories.value = newCheckedCategories;

    const newCheckedBrands = {
      [category_id.value]: checkedBrands.value[category_id.value] || [],
    };
    checkedBrands.value = newCheckedBrands;

    const response = await api.get("/api/get-products", {
      params: {
        page: currentPage.value,
        per_page: perPage.value,
        category_id: category_id.value,
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
    };
  },
  {
    server: true,
    lazy: false,
    watch: [checkedCategories, checkedBrands, selectedSortOption, currentPage],
  }
);

// Watch for data changes
watch(productsData, (newData) => {
  if (newData) {
    products.value = newData.products;
    totalProducts.value = newData.total;
    totalCountperPage.value = newData.perPage;
    categories.value = newData.categories;
    brands.value = newData.brands;
    the_category.value = newData.theCategory;
    displayedProducts.value = newData.products;
  }
});

// Filter handlers
async function handleCheckboxChange(categoryId) {
  isFilterLoading.value = true;
  let mainCategoryId = the_category.value.id;

  if (!(mainCategoryId in checkedCategories.value)) {
    checkedCategories.value[mainCategoryId] = [];
  }

  const categoryArray = checkedCategories.value[mainCategoryId];

  if (categoryArray.includes(categoryId)) {
    categoryArray.splice(categoryArray.indexOf(categoryId), 1);
  } else {
    categoryArray.push(categoryId);
  }

  try {
    await refreshProducts();
  } finally {
    isFilterLoading.value = false;
  }
}

async function handleCheckboxBrandChange(categoryId) {
  isFilterLoading.value = true;
  let mainCategoryId = the_category.value.id;

  if (!(mainCategoryId in checkedBrands.value)) {
    checkedBrands.value[mainCategoryId] = [];
  }

  const brandArray = checkedBrands.value[mainCategoryId];

  if (brandArray.includes(categoryId)) {
    brandArray.splice(brandArray.indexOf(categoryId), 1);
  } else {
    brandArray.push(categoryId);
  }

  try {
    await refreshProducts();
  } finally {
    isFilterLoading.value = false;
  }
}

async function resetSortValues() {
  isFilterLoading.value = true;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  checkedCategories.value = {};
  checkedBrands.value = {};
  selectedSortOption.value = "";

  try {
    await refreshProducts();
  } finally {
    isFilterLoading.value = false;
  }
}

// Pagination methods
const totalPages = computed(() => {
  return Math.ceil(totalProducts.value / perPage.value);
});

const generatePageLinks = computed(() => {
  const pageLinks = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxVisiblePages / 2)
  );
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let page = startPage; page <= endPage; page++) {
    pageLinks.push(page);
  }

  return pageLinks;
});

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToThisPage = (page) => {
  currentPage.value = page;
};

const isInteger = (value) => {
  return Number.isInteger(value);
};

// Route change handler
watchEffect(() => {
  if (id !== "" && category_id.value !== id) {
    currentPage.value = 1;
    category_id.value = id ? parseInt(id) : 1;
    if (page !== "" && currentPage.value !== page) {
      currentPage.value = page ? parseInt(page) : 1;
    }
    refreshProducts();
  }
});

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
</script>

<style>
.error-content {
  min-height: 60vh;
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
