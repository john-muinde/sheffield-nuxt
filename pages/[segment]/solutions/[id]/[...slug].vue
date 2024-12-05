<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container d-flex align-items-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/"> HOME </NuxtLink>
          </li>

          <li class="breadcrumb-item">
            <NuxtLink :to="`/${pageSegment.slug}`">
              {{ pageSegment.name.toUpperCase() }}
            </NuxtLink>
          </li>

          <li class="breadcrumb-item active" aria-current="page">
            {{ solutionCategories.name }}
          </li>
        </ol>
      </div>
    </nav>
    <!-- End .page-header -->
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-10">
            <!-- End .toolbox -->
            <div class="products mb-3">
              <div class="row">
                <div class="col-lg-12 col-md-12 mt-1">
                  <div id="accordion-1" class="accordion" style="width: 100%">
                    <div class="card">
                      <div id="heading-2" class="card-header">
                        <h2 class="card-title">
                          <a
                            class="collapsed"
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-2"
                            aria-expanded="false"
                            aria-controls="collapse-2"
                          >
                            {{ solutionCategories.name }}
                            - SOLUTION
                          </a>
                        </h2>
                      </div>
                      <!-- End .card-header -->
                      <div
                        id="collapse-2"
                        class="collapse"
                        aria-labelledby="heading-2"
                        data-parent="#accordion-1"
                        style=""
                      >
                        <div class="card-body">
                          <span v-html="solutionCategories.description"></span>
                        </div>
                        <!-- End .card-body -->
                      </div>
                      <!-- End .collapse -->
                    </div>
                  </div>
                </div>

                <div
                  v-for="product in solutionCategoryProducts"
                  :key="product.id"
                  class="col-6 col-md-2 col-lg-2 col-xl-2 image-container"
                >
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <!-- <span class="product-label label-new">New</span>  -->
                      <NuxtLink
                        :to="
                          getProductLink(
                            product.id,
                            product.name,
                            product.model_number
                          )
                        "
                      >
                        <NuxtImg
                          :src="assets(product.main_image_path)"
                          :alt="product.name"
                          format="webp"
                          quality="80"
                          loading="lazy"
                          class="w-full h-auto object-cover product-image"
                        />
                      </NuxtLink>
                      <div class="product-action-vertical"></div>
                      <!-- End .product-action-vertical -->
                      <div class="product-action" :disabled="!product">
                        <button
                          type="button"
                          class="btn-product btn-cart"
                          @click="addToCart(product)"
                        >
                          <span>Add to Cart</span>
                        </button>
                      </div>
                      <!-- End .product-action -->
                    </figure>
                    <!-- End .product-media -->
                    <div class="product-body">
                      <div class="product-cat">
                        <NuxtLink
                          :to="
                            getProductLink(
                              product.id,
                              product.name,
                              product.model_number
                            )
                          "
                        >
                          {{ product.product_brand.name }}
                        </NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title">
                        <NuxtLink
                          :to="
                            getProductLink(
                              product.id,
                              product.name,
                              product.model_number
                            )
                          "
                        >
                          {{ product.name }}
                        </NuxtLink>
                      </h3>
                      <div class="ratings-container"></div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>

                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->
              </div>
              <!-- End .row -->
            </div>
            <!-- End .products -->
          </div>
          <!-- End .col-lg-9 -->

          <aside class="col-lg-2 order-lg-first mt-2">
            <div class="sidebar sidebar-shop sidebar-shop-solution">
              <!-- End .widget widget-clean -->
              <div
                v-if="solutionCategoriesList.length"
                class="widget widget-collapsible widget-categories"
              >
                <h3 class="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-1"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-1"
                  >
                    Product Categories
                  </a>
                </h3>
                <!-- End .widget-title -->
                <div id="widget-1" class="show">
                  <div class="widget-body">
                    <div class="filter-items filter-items-count">
                      <div
                        v-for="category in solutionCategoriesList"
                        :key="category.id"
                        class="filter-item"
                      >
                        <div class="custom-control custom-checkbox">
                          <input
                            :id="'cat-' + category.id"
                            type="checkbox"
                            class="custom-control-input"
                            :value="category.id"
                            @change="handleCheckboxChange(category.id)"
                          />
                          <label
                            class="custom-control-label"
                            :for="'cat-' + category.id"
                            >{{ category.name }}</label
                          >
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
                <div id="widget-4" class="show">
                  <div class="widget-body">
                    <NuxtImg
                      :src="assets(solutionCategories.main_image_path)"
                      format="webp"
                      quality="80"
                      loading="lazy"
                      class="w-full h-auto object-cover product-image"
                    />
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
        <!-- End .row -->
      </div>
      <!-- End .container -->
    </div>
    <!-- End .page-content -->
  </main>
</template>

<script setup>
definePageMeta({
  validate: async (route) => {
    return (
      APP_SEGMENTS.some((item) => item.slug === route.params.segment) &&
      route.params.id &&
      Number.isInteger(Number(route.params.id))
    );
  },
});

import { ref, computed, watch, onMounted, watchEffect } from "vue";

const pageSegment = computed(() => {
  return APP_SEGMENTS.find((item) => item.slug === route.params.segment);
});

const route = useRoute();
const { segment, id } = route.params;
const slug = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug];

const category = slug[0];
const page = slug[2];

const { api } = useAxios();

const title = ref(
  `${capitalizeMainWords(segment)} - ${capitalizeMainWords(category)}`
);

useHead({
  title: title,
  meta: [
    {
      name: "description",
      content:
        "We offer state of the art commercial cold room equipment at Sheffield africa Ltd",
    },
    {
      name: "keywords",
      content: "Cold room equipment",
    },
  ],
});

const currentPage = ref(page ? parseInt(page) : 1);
const perPage = ref(12);
const totalProducts = ref(0);
const products = ref([]);
const solution_id = ref(id ? parseInt(id) : 1);
const solutionCategories = ref([]);
const solutionCategoriesList = ref([]);

const checkedCategoriesSolutions = ref([]);

const fetchSolutionCategories = async () => {
  try {
    const response = await api.get("/api/get-solution-categories", {
      params: {
        solution_id: solution_id.value,
      },
    });
    solutionCategories.value = response.data.data;
    solutionCategoriesList.value = response.data.data.product_categories_json;

    //

    //useMeta({ title: solutionCategories.value.name + " | Cold Storage Solution" });
  } catch (error) {
    console.error(error);
  }
};

const solutionCategoryProducts = ref([]);

const fetchSolutionCategoryProducts = async () => {
  const newCheckedCategoriesSolutions = {
    [solution_id.value]:
      checkedCategoriesSolutions.value[solution_id.value] || [],
  };

  try {
    const response = await api.get("/api/get-solution-category-products", {
      params: {
        solution_id: solution_id.value,
        checkedCategoriesSolutions: checkedCategoriesSolutions.value,
      },
    });
    solutionCategoryProducts.value = response.data.products.data;

    //
  } catch (error) {
    console.error(error);
  }
};

function handleCheckboxChange(categoryId) {
  let mainCategoryId = solution_id.value;

  if (!(mainCategoryId in checkedCategoriesSolutions.value)) {
    checkedCategoriesSolutions.value[mainCategoryId] = [];
  }

  const categoryArray = checkedCategoriesSolutions.value[mainCategoryId];

  if (categoryArray.includes(categoryId)) {
    categoryArray.splice(categoryArray.indexOf(categoryId), 1);
  } else {
    categoryArray.push(categoryId);
  }
}

// Determine the total number of pages
const totalPages = computed(() => {
  return Math.ceil(totalProducts.value / perPage.value);
});

// Displayed products based on the current page
const displayedProducts = ref([]);

// Update displayedProducts based on the current page and products
const updateDisplayedProducts = () => {
  const startIndex = 0;
  displayedProducts.value = products.value.slice(
    startIndex,
    startIndex + perPage.value
  );
};

const isInteger = (value) => {
  return Number.isInteger(value);
};

// Generate the page links
const generatePageLinks = computed(() => {
  const pageLinks = [];
  const maxVisiblePages = 5; // Maximum number of visible page links

  // Add previous link
  if (currentPage.value > 1) {
    pageLinks.push("Prev");
  }

  // Add current page and surrounding pages
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

  // Add next link
  if (currentPage.value < totalPages.value) {
    pageLinks.push("Next");
  }

  return pageLinks;
});

// Initial fetch of products
onMounted(() => {
  //fetchProducts();
  fetchSolutionCategories();
  fetchSolutionCategoryProducts();
});

// Watch for changes in the products and update displayedProducts
watch(products, updateDisplayedProducts);

watchEffect(() => {
  const params = route.params; // Access the route parameters
  const query = route.query; // Access the query parameters

  if (id !== "" && solution_id.value !== id) {
    currentPage.value = 1;

    solution_id.value = id ? parseInt(id) : 1;

    if (page !== "" && currentPage.value !== page) {
      currentPage.value = page ? parseInt(page) : 1;
    }
    fetchSolutionCategoryProducts();
  }
});
</script>

<style>
.product-item {
  margin-bottom: 20px;
}

.product-title a {
  font-weight: 550 !important;
}

.sidebar-shop-solution .filter-items-count .filter-item {
  padding-right: 0rem !important;
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
</style>
