<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container d-flex align-items-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">
              HOME
            </router-link>
          </li>

          <li class="breadcrumb-item">
            <router-link to="/promotional-solutions">
              PROMOTIONS
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
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useMeta } from '../../admin/composables/use-meta';

const route = useRoute();

const currentPage = ref(route.params.page ? parseInt(route.params.page) : 1);
const perPage = ref(12);
const products = ref([]);
const solution_id = ref(route.params.id ? parseInt(route.params.id) : 1);
const solutionCategories = ref([]);
const solutionCategoriesList = ref([]);


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
            title: solutionCategories.value.name + ' | Promotions',
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


// Displayed products based on the current page
const displayedProducts = ref([]);

const getCategoryLink = (id, name) => {
    let transformedName = name.replace(/ /g, '-').replace(/\//g, '-');
    // Remove consecutive dashes
    transformedName = transformedName.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    // Convert to lowercase
    transformedName = transformedName.toLowerCase();

    return `/promotional-solutions/${id}/${transformedName}`;
};

// Update displayedProducts based on the current page and products
const updateDisplayedProducts = () => {
    const startIndex = 0;
    displayedProducts.value = products.value.slice(
        startIndex,
        startIndex + perPage.value,
    );
};


// Initial fetch of products
onMounted(() => {
    //fetchProducts();
    fetchSolutionCategories();
    fetchSolutionCategoryProducts();
});

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
