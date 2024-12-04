<template>
  <main class="main">
    <!-- <div
         class="page-header text-center"
         style="background-image: url('../../../../assets/images/sheffield_stainless_steel_background.jpg')"
         >
         <div class="container">
            <h1 class="page-title">{{ solutionCategories.name }}<span v-html="solutionCategories.description"></span></h1>
         </div>

      </div> -->
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container d-flex align-items-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">
              HOME
            </router-link>
          </li>

          <li class="breadcrumb-item">
            <router-link to="/laundry">
              LAUNDRY
            </router-link>
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
          <div class="col-lg-9">
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
                            {{
                              solutionCategories.name
                            }}
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
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-6 col-xl-6 image-container">
                  <div class="card-body middle-section">
                    <span
                      v-html="solutionCategories.description
                      "
                    ></span>
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 col-xl-4 image-container laundry-image">
                  <img
                    v-lazy:src="'/storage/' +
                      solutionCategories.main_image_path
                    "
                    :src="'/storage/' +
                      solutionCategories.main_image_path
                    "
                    alt="Product image"
                  />
                </div>

                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->
              </div>
              <!-- End .row -->
            </div>
            <!-- End .products -->
          </div>
          <!-- End .col-lg-9 -->

          <aside class="col-lg-3 order-lg-first mt-2">
            <div class="sidebar sidebar-shop sidebar-shop-solution">
              <!-- End .widget widget-clean -->

              <div class="widget widget-cats widget-categories">
                <h3 class="widget-title">
                  Relevant Products
                </h3>
                <!-- End .widget-title -->

                <hr />

                <ul v-for="category in solutionCategoriesList" :key="category.id">
                  <li
                    class=""
                    style="
                                            border-bottom: 1px solid #ccc;
                                            padding: 10px;
                                        "
                  >
                    <router-link
                      :to="getCategoryLink(
                        category.id,
                        category.name,
                        currentPage - 1
                      )
                      "
                    >
                      {{ category.name
                      }}<span>>></span>
                    </router-link>
                  </li>
                </ul>

                <div class="widget-body mt-5">
                  <router-link to="/contact-us" class="btn btn-secondary btn-block">
                    Need
                    Advise?
                  </router-link>
                </div>
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
import { ref, computed, watch, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { useMeta } from '../../admin/composables/use-meta';

const route = useRoute();
const currentRoute = ref(route);

const currentPage = ref(route.params.page ? parseInt(route.params.page) : 1);
const perPage = ref(12);
const totalProducts = ref(0);
const products = ref([]);
const totalCountperPage = ref(0);
const solution_id = ref(route.params.id ? parseInt(route.params.id) : 1);
const categories = ref([]);
const brands = ref([]);
const the_category = ref([]);
const solutionCategories = ref([]);
const solutionCategoriesList = ref([]);

import { useStore } from 'vuex'; // Import the store

const store = useStore();

const addToCart = (product) => {
    const toast = window.Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 4000,
        padding: '2em',
    });
    toast.fire({
        icon: 'success',
        title: 'Item added to cart',
        padding: '2em',
        customClass: {
            title: 'swal-title-class',
        },
    });
    store.dispatch('cart/addToCart', product);
};

const fetchSolutionCategories = async () => {
    try {
        const response = await axios.get('/api/get-solution-categories', {
            params: {
                solution_id: solution_id.value,
            },
        });
        solutionCategories.value = response.data.data;
        solutionCategoriesList.value =
            response.data.data.product_categories_json;

        //

        useMeta({
            title: solutionCategories.value.name + ' | Laundry Solution',
        });
    } catch (error) {
        console.error(error);
    }
};

const solutionCategoryProducts = ref([]);

const fetchSolutionCategoryProducts = async () => {
    try {
        const response = await axios.get(
            '/api/get-solution-category-products',
            {
                params: {
                    solution_id: solution_id.value,
                    checkedCategoriesSolutions:
                        checkedCategoriesSolutions.value,
                },
            },
        );
        solutionCategoryProducts.value = response.data.products.data;

        //
    } catch (error) {
        console.error(error);
    }
};

// Determine the total number of pages
const totalPages = computed(() => {
    return Math.ceil(totalProducts.value / perPage.value);
});

// Displayed products based on the current page
const displayedProducts = ref([]);

// Go to the previous page
const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Go to the next page
const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const goToThisPage = (page) => {
    currentPage.value = page;
};

const getProductLink = (id, name, model_number, main_second_parent_cat) => {
    // Replace spaces with dashes
    let transformedName = name.replace(/ /g, '-').replace(/\//g, '-');
    // Remove consecutive dashes
    transformedName = transformedName.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    // Convert to lowercase
    transformedName = transformedName.toLowerCase();

    let transformedModelNumber = model_number
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/\//g, '-');
    // Remove consecutive dashes
    transformedModelNumber = transformedModelNumber.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedModelNumber = transformedModelNumber.replace(/^-+|-+$/g, '');

    return `/laundry/product/${id}/${transformedName}-${transformedModelNumber}`;
};

const getCategoryLink = (id, name) => {
    //Replace spaces with dashes
    //
    //
    //
    let transformedName = name.replace(/ /g, '-').replace(/\//g, '-');
    // Remove consecutive dashes
    transformedName = transformedName.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    // Convert to lowercase
    transformedName = transformedName.toLowerCase();

    return `/laundry/${id}/${transformedName}`;
};

// Update displayedProducts based on the current page and products
const updateDisplayedProducts = () => {
    const startIndex = 0;
    displayedProducts.value = products.value.slice(
        startIndex,
        startIndex + perPage.value,
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
        pageLinks.push('Prev');
    }

    // Add current page and surrounding pages
    let startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxVisiblePages / 2),
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
        pageLinks.push('Next');
    }

    return pageLinks;
});

// Initial fetch of products
onMounted(() => {
    //fetchProducts();
    fetchSolutionCategories();
    fetchSolutionCategoryProducts();
});

// Watch for changes in the currentPage and fetch products accordingly
//watch(currentPage, fetchProducts);

// Watch for changes in the products and update displayedProducts
watch(products, updateDisplayedProducts);
</script>

<style>
.product-item {
    margin-bottom: 20px;
}

.product-title a {
    font-weight: 550 !important;
}

.middle-section p {
    font-size: 1.5rem;
}

.laundry-image img {
    box-shadow: 14px -9px 5px 0px rgba(0, 0, 0, 0.3);
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));
}

.sidebar-shop-solution .filter-items-count .filter-item {
    padding-right: 0rem !important;
}

.swal2-popup.swal2-toast .swal2-title {
    font-size: 1.5rem !important;
}

.swal2-container.swal2-bottom-end>.swal2-popup {
    background-color: #c02434;
}

.swal2-popup.swal2-toast .swal2-title {
    color: #ffffff;
}
</style>
