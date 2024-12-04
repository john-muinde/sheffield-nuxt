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
            <router-link to="/cold-storage">
              COLD STORAGE
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
          <div class="col-lg-10">
            <!-- End .toolbox -->
            <div class="products mb-3">
              <div class="row">
                <div class="col-lg-12 col-md-12 mt-1">
                  <div
                    id="accordion-1"
                    class="accordion"
                    style="width: 100%"
                  >
                    <div class="card">
                      <div
                        id="heading-2"
                        class="card-header"
                      >
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
                      >
                        <div class="card-body">
                          <span
                            v-html="
                              solutionCategories.description
                            "
                          ></span>
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
                      <router-link
                        :to="
                          getProductLink(
                            product.id,
                            product.name,
                            product.model_number
                          )
                        "
                      >
                        <img
                          v-lazy:src="
                            '/storage/' +
                              product.main_image_path
                          "
                          :src="
                            '/storage/' +
                              product.main_image_path
                          "
                          alt="Product image"
                          class="product-image"
                        />
                      </router-link>
                      <div
                        class="product-action-vertical"
                      >
                        <!-- <a
                                       href="#"
                                       class="btn-product-icon btn-wishlist btn-expandable" ><span>add to wishlist</span></a>  -->
                        <!-- <a
                                       href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"
                                       ><span>Quick view</span></a> -->
                        <!-- <a
                                       href="#"
                                       class="btn-product-icon btn-compare" title="Compare" ><span>Compare</span></a> -->
                      </div>
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
                        <router-link
                          :to="
                            getProductLink(
                              product.id,
                              product.name,
                              product.model_number
                            )
                          "
                        >
                          {{
                            product.product_brand
                              .name
                          }}
                        </router-link>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title">
                        <router-link
                          :to="
                            getProductLink(
                              product.id,
                              product.name,
                              product.model_number
                            )
                          "
                        >
                          {{
                            product.name
                          }}
                        </router-link>
                      </h3>
                      <!-- End .product-title -->
                      <!-- <div class="product-price">$ {{ product.retail_price }}.00</div> -->
                      <!-- End .product-price -->
                      <div class="ratings-container">
                        <!-- <div class="ratings">
                                       <div class="ratings-val" style="width: 20%"></div>
                                    </div> -->
                        <!-- End .ratings -->
                        <!--  <span class="ratings-text">( 2 Reviews )</span> -->
                      </div>
                      <!-- End .rating-container -->
                      <!-- <div class="product-nav product-nav-thumbs"> <a href="#" class="active">
                                    <img src="../assets/images/products/product6.webp" alt="product desc"
                                       /> </a>
                                    <a href="#"> <img
                                       src="../assets/images/products/product4.webp"
                                       alt="product desc" />
                                    </a>
                                    <a href="#"> <img
                                       src="../assets/images/products/product1.webp"
                                       alt="product desc" />
                                    </a>
                                 </div> -->
                      <!-- End .product-nav -->
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
                    <div
                      class="filter-items filter-items-count"
                    >
                      <div
                        v-for="category in solutionCategoriesList"
                        :key="category.id"
                        class="filter-item"
                      >
                        <div
                          class="custom-control custom-checkbox"
                        >
                          <input
                            :id="
                              'cat-' + category.id
                            "
                            type="checkbox"
                            class="custom-control-input"
                            :value="category.id"
                            @change="
                              handleCheckboxChange(
                                category.id
                              )
                            "
                          />
                          <label
                            class="custom-control-label"
                            :for="
                              'cat-' + category.id
                            "
                          >{{
                            category.name
                          }}</label>
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
                    <img
                      v-lazy:src="
                        '/storage/' +
                          solutionCategories.main_image_path
                      "
                      :src="
                        '/storage/' +
                          solutionCategories.main_image_path
                      "
                      alt="Product image"
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
import { ref, computed, watch, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import { useMeta } from '../../admin/composables/use-meta';
useMeta({
    title: 'Cold Room Solutions',
    description:
        'We offer state of the art commercial cold room equipment at Sheffield africa Ltd',
    keywords: 'Cold room equipment',
});

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

const checkedCategoriesSolutions = ref([]);
const mainCategorySelectedSolutions = ref([]);

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

    // const newCheckedCategories = {
    //   [mainCategoryId]: checkedCategories.value[mainCategoryId] || [],
    // };
    // checkedCategories.value = newCheckedCategories;
}

function resetSortValues() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    checkedCategoriesSolutions.value = [];
}

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

    return `/cold-storage/product/${id}/${transformedName}-${transformedModelNumber}`;
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

    return `/cold-storage/${id}/${transformedName}`;
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

watchEffect(() => {
    const params = route.params; // Access the route parameters
    const query = route.query; // Access the query parameters

    if (params.id !== '' && solution_id.value !== params.id) {
        currentPage.value = 1;

        solution_id.value = params.id ? parseInt(params.id) : 1;

        if (params.page !== '' && currentPage.value !== params.page) {
            currentPage.value = params.page ? parseInt(params.page) : 1;
        }

        // Call a method or update component data based on the new route

        fetchSolutionCategoryProducts();
        //
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
