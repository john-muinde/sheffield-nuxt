<template>
  <main class="main">
    <!-- <div
         class="page-header text-center"
         style="background-image: url('../../../../assets/images/sheffield_stainless_steel_background.jpg')"
         >
         <div class="container">
            <h1 class="page-title">{{ the_category.name }}<span>View our amazing products under this section</span></h1>
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
            <router-link to="/cold-storage">
              COLD STORAGE
            </router-link>
          </li>

          <li class="breadcrumb-item active" aria-current="page">
            {{ the_category.name }}
          </li>
        </ol>
      </div>
    </nav>
    <!-- End .page-header -->
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-10">
            <div class="toolbox">
              <div class="toolbox-left">
                <div class="toolbox-info">
                  Showing
                  <span>{{ totalCountperPage }} of
                    {{ totalProducts }}</span>
                  Products
                </div>
                <!-- End .toolbox-info -->
              </div>
              <!-- End .toolbox-left -->
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
                      <option value="">
                        Default
                      </option>
                      <option value="name_asc">
                        Name A - Z
                      </option>
                      <option value="name_desc">
                        Name Z - A
                      </option>
                      <option value="created_at_asc">
                        Latest First
                      </option>
                      <option value="created_at_desc">
                        Oldest First
                      </option>
                    </select>
                  </div>
                </div>
                <!-- End .toolbox-sort -->
                <!-- End .toolbox-layout -->
              </div>
              <!-- End .toolbox-right -->
            </div>
            <!-- End .toolbox -->
            <div class="products mb-3 products-section">
              <div class="row">
                <div
                  v-for="product in displayedProducts"
                  :key="product.id"
                  class="col-6 col-md-3 col-lg-2 col-xl-2"
                >
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <!-- <span class="product-label label-new">New</span>  -->
                      <router-link
                        :to="
                          getProductLink(
                            product.id,
                            product.name,
                            product.model_number,
                            the_category.name
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
                                       class="btn-product-icon btn-wishlist btn-expandable" ><span>add to wishlist</span></a
                                       > <a
                                       href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"
                                       ><span>Quick view</span></a>  <a
                                       href="#"
                                       class="btn-product-icon btn-compare" title="Compare" ><span>Compare</span></a
                                       > -->
                      </div>
                      <!-- End .product-action-vertical -->
                      <div class="product-action">
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
                              product.model_number,
                              the_category.name
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
                              product.model_number,
                              the_category.name
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

            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li
                  class="page-item"
                  :class="{ disabled: currentPage === 1 }"
                >
                  <router-link
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
                    <span aria-hidden="true"><i class="icon-long-arrow-left"></i></span>
                    Prev
                  </router-link>
                </li>
                <li
                  v-for="page in generatePageLinks"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                >
                  <template v-if="isInteger(page)">
                    <router-link
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
                    </router-link>
                  </template>
                </li>
                <li class="page-item-total">
                  of {{ totalPages }}
                </li>
                <li
                  class="page-item"
                  :class="{
                    disabled: currentPage === totalPages,
                  }"
                >
                  <router-link
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
                    <span aria-hidden="true"><i
                      class="icon-long-arrow-right"
                    ></i></span>
                  </router-link>
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
                    <div
                      class="filter-items filter-items-count"
                    >
                      <div
                        v-for="category in categories"
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
                        <!-- End .custom-checkbox -->
                        <span class="item-count">{{
                          category.category_products_count
                        }}</span>
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
                        <div
                          class="custom-control custom-checkbox"
                        >
                          <input
                            :id="
                              'brand-' +
                                brand.product_brand
                                  .id
                            "
                            type="checkbox"
                            class="custom-control-input"
                            :value="
                              brand.product_brand
                                .id
                            "
                            @change="
                              handleCheckboxBrandChange(
                                brand
                                  .product_brand
                                  .id
                              )
                            "
                          />
                          <label
                            class="custom-control-label"
                            :for="
                              'brand-' +
                                brand.product_brand
                                  .id
                            "
                          >{{
                            brand.product_brand
                              .name
                          }}</label>
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
              <!-- End .widget -->
              <!-- <div class="widget widget-collapsible">
                        <h3 class="widget-title">
                           <a data-toggle="collapse"
                              href="#widget-5" role="button" aria-expanded="true" aria-controls="widget-5"
                              > Price
                           </a>
                        </h3>

                        <div class="collapse show" id="widget-5">
                           <div class="widget-body">
                              <div class="filter-price">
                                 <div class="filter-price-text">
                                    Price Range:
                                    <span id="filter-price-range"></span>
                                 </div>

                                 <div id="price-slider"></div>

                              </div>

                           </div>

                        </div>

                     </div> -->
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
import { useMetaCold } from '../../admin/composables/use-meta';

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
const category_id = ref(route.params.id ? parseInt(route.params.id) : 1);
const categories = ref([]);
const brands = ref([]);
const the_category = ref([]);

const checkedCategories = ref([]);
const mainCategorySelected = ref([]);
const checkedBrands = ref([]);
const selectedSortOption = ref('');

// Fetch products based on the current page
const fetchProducts = async () => {
    try {
        const newCheckedCategories = {
            [category_id.value]:
                checkedCategories.value[category_id.value] || [],
        };
        checkedCategories.value = newCheckedCategories;

        const newCheckedBrands = {
            [category_id.value]: checkedBrands.value[category_id.value] || [],
        };
        checkedBrands.value = newCheckedBrands;

        const response = await axios.get('/api/get-products', {
            params: {
                page: currentPage.value,
                per_page: perPage.value,
                category_id: category_id.value,
                checkedCategories: checkedCategories.value,
                checkedBrands: checkedBrands.value,
                selectedSortOption: selectedSortOption.value,
            },
        });
        products.value = response.data.products.data;
        totalProducts.value = response.data.products.total;
        totalCountperPage.value = response.data.products.per_page;
        categories.value = response.data.categories;
        brands.value = response.data.brands;
        the_category.value = response.data.the_category;
    } catch (error) {
        console.error(error);
    }
};

function handleCheckboxChange(categoryId) {
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

    // const newCheckedCategories = {
    //   [mainCategoryId]: checkedCategories.value[mainCategoryId] || [],
    // };
    // checkedCategories.value = newCheckedCategories;
}

function handleCheckboxBrandChange(categoryId) {
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

    // const newCheckedBrands = {
    //   [mainCategoryId]: checkedBrands.value[mainCategoryId] || [],
    // };
    // checkedBrands.value = newCheckedBrands;
}

function resetSortValues() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    checkedCategories.value = [];
    checkedBrands.value = [];
    selectedSortOption.value = null;
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

const getProductLink = (id, name, model_number, parent_cat) => {
    let transformedName = name.replace(/ /g, '-').replace(/\//g, '-');
    transformedName = transformedName.replace(/-+/g, '-');
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    transformedName = transformedName.toLowerCase();

    let transformedName_cat = parent_cat.replace(/ /g, '-').replace(/\//g, '-');
    transformedName_cat = transformedName_cat.replace(/-+/g, '-');
    transformedName_cat = transformedName_cat.replace(/^-+|-+$/g, '');
    transformedName_cat = transformedName_cat.toLowerCase();

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

const getCategoryLink = (id, name, page) => {
    //Replace spaces with dashes

    if (name === undefined) {
        return '/cold-storage';
    } else {
        let transformedName = name.replace(/ /g, '-').replace(/\//g, '-');
        // Remove consecutive dashes
        transformedName = transformedName.replace(/-+/g, '-');
        // Remove leading and trailing dashes
        transformedName = transformedName.replace(/^-+|-+$/g, '');
        // Convert to lowercase
        transformedName = transformedName.toLowerCase();

        return `/cold-storage/${id}/${transformedName}/page/${page}`;
    }
};

// Update displayedProducts based on the current page and products
const updateDisplayedProducts = () => {
    const startIndex = 0;
    displayedProducts.value = products.value;
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
    fetchProducts();
});

// Watch for changes in the currentPage and fetch products accordingly
watch(currentPage, fetchProducts);

// Watch for changes in the products and update displayedProducts
watch(products, updateDisplayedProducts);

watchEffect(() => {
    const params = route.params; // Access the route parameters
    const query = route.query; // Access the query parameters

    if (params.id !== '' && category_id.value !== params.id) {
        currentPage.value = 1;

        category_id.value = params.id ? parseInt(params.id) : 1;

        if (params.page !== '' && currentPage.value !== params.page) {
            currentPage.value = params.page ? parseInt(params.page) : 1;
        }

        // Call a method or update component data based on the new route

        fetchProducts();
        //
    }
});

const title = ref('');

// Watch for changes in the_category.value.name
watch(
    () => the_category.value.name,
    (newName, oldName) => {


        if (newName !== oldName) {

            // Update the title when the_category.value.name changes
            title.value = newName;
        }
    },
);

useMetaCold({ title: title.value + 'Cold Storage' });
</script>

<style>
.custom-control-label {
    margin-right: 0rem;
}
.product-item {
    margin-bottom: 20px;
}

.products-section {
    /*border-right: 15px solid #304296;
    border-radius: 2px;
    padding-right: 15px;*/
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
</style>
