<template>
  <main class="main">
    <div
      class="page-header text-center"
      style="
                background-image: url('../assets/images/sheffield_stainless_steel_background.jpg');
            "
    >
      <div class="container">
        <h1 class="page-title">
          Refrigeration<span>some description</span>
        </h1>
      </div>
      <!-- End .container -->
    </div>
    <!-- End .page-header -->
    <div class="page-content mt-4">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <div class="toolbox">
              <div class="toolbox-left">
                <div class="toolbox-info">
                  Showing <span>9 of 56</span> Products
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
                      name="sortby"
                      class="form-control"
                    >
                      <!-- <option value="popularity" selected="selected">Most Popular</option> -->
                      <option value="rating">
                        Most Rated
                      </option>
                      <option value="date">
                        Date
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
            <div class="products mb-3">
              <div class="row">
                <div
                  v-for="product in displayedProducts"
                  :key="product.id"
                  class="col-6 col-md-3 col-lg-3 col-xl-3"
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
                        <a
                          href="#"
                          class="btn-product-icon btn-wishlist btn-expandable"
                        ><span>add to wishlist</span></a>
                        <!-- <a
                                       href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"
                                       ><span>Quick view</span></a> -->
                        <a
                          href="#"
                          class="btn-product-icon btn-compare"
                          title="Compare"
                        ><span>Compare</span></a>
                      </div>
                      <!-- End .product-action-vertical -->
                      <div class="product-action">
                        <a
                          href="#"
                          class="btn-product btn-cart"
                        ><span>Inquire about
                          Item</span></a>
                      </div>
                      <!-- End .product-action -->
                    </figure>
                    <!-- End .product-media -->
                    <div class="product-body">
                      <div class="product-cat">
                        <a href="#">Kitchen</a>
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

                <div v-if="totalPages > 1">
                  <button
                    :disabled="currentPage === 1"
                    @click="goToPreviousPage"
                  >
                    Previous
                  </button>
                  <span>{{ currentPage }} /
                    {{ totalPages }}</span>
                  <button
                    :disabled="currentPage === totalPages"
                    @click="goToNextPage"
                  >
                    Next
                  </button>
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->
              </div>
              <!-- End .row -->
            </div>
            <!-- End .products -->
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a
                    class="page-link page-link-prev"
                    href="#"
                    aria-label="Previous"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    <span aria-hidden="true"><i
                      class="icon-long-arrow-left"
                    ></i></span>Prev
                  </a>
                </li>
                <li
                  class="page-item active"
                  aria-current="page"
                >
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">3</a>
                </li>
                <li class="page-item-total">
                  of 6
                </li>
                <li class="page-item">
                  <a
                    class="page-link page-link-next"
                    href="#"
                    aria-label="Next"
                  >
                    Next
                    <span aria-hidden="true"><i
                      class="icon-long-arrow-right"
                    ></i></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <!-- End .col-lg-9 -->
          <aside class="col-lg-3 order-lg-first">
            <div class="sidebar sidebar-shop">
              <div class="widget widget-clean">
                <label>Filters:</label>
                <a
                  href="#"
                  class="sidebar-filter-clear"
                >Clean All</a>
              </div>
              <!-- End .widget widget-clean -->
              <div class="widget widget-collapsible">
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
                      <div class="filter-item">
                        <div
                          class="custom-control custom-checkbox"
                        >
                          <input
                            id="cat-1"
                            type="checkbox"
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label"
                            for="cat-1"
                          >Kitchen</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">3</span>
                      </div>
                      <!-- End .filter-item -->
                      <div class="filter-item">
                        <div
                          class="custom-control custom-checkbox"
                        >
                          <input
                            id="cat-2"
                            type="checkbox"
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label"
                            for="cat-2"
                          >Cold Room</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">0</span>
                      </div>
                      <!-- End .filter-item -->
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
                      <div class="filter-item">
                        <div
                          class="custom-control custom-checkbox"
                        >
                          <input
                            id="brand-1"
                            type="checkbox"
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label"
                            for="brand-1"
                          >Rational</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->
                      <div class="filter-item">
                        <div
                          class="custom-control custom-checkbox"
                        >
                          <input
                            id="brand-2"
                            type="checkbox"
                            class="custom-control-input"
                          />
                          <label
                            class="custom-control-label"
                            for="brand-2"
                          >Other Brand</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->
                    </div>
                    <!-- End .filter-items -->
                  </div>
                  <!-- End .widget-body -->
                </div>
                <!-- End .collapse -->
              </div>
              <!-- End .widget -->
              <div class="widget widget-collapsible">
                <h3 class="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-5"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-5"
                  >
                    Price
                  </a>
                </h3>
                <!-- End .widget-title -->
                <div id="widget-5" class="show">
                  <div class="widget-body">
                    <div class="filter-price">
                      <div class="filter-price-text">
                        Price Range:
                        <span
                          id="filter-price-range"
                        ></span>
                      </div>
                      <!-- End .filter-price-text -->
                      <div id="price-slider"></div>
                      <!-- End #price-slider -->
                    </div>
                    <!-- End .filter-price -->
                  </div>
                  <!-- End .widget-body -->
                </div>
                <!-- End .collapse -->
              </div>
              <!-- End .widget -->
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
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

getProduct(route.params.id);

const currentPage = ref(1);
const perPage = ref(2);
const totalProducts = ref(0);
const products = ref([]);

// Fetch products based on the current page
const fetchProducts = async () => {
    try {
        const response = await axios.get('/api/get-products', {
            params: {
                page: currentPage.value,
                per_page: perPage.value,
            },
        });
        products.value = response.data.data;
        totalProducts.value = response.data.total;
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

const getProductLink = (id, name, model_number) => {
    // Replace spaces with dashes
    let transformedName = name.replace(/ /g, '-');
    // Remove consecutive dashes
    transformedName = transformedName.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    // Convert to lowercase
    transformedName = transformedName.toLowerCase();

    let transformedModelNumber = model_number.toLowerCase();

    return `/products/${id}/${transformedName}-${transformedModelNumber}`;
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
    fetchProducts();
});

// Watch for changes in the currentPage and fetch products accordingly
watch(currentPage, fetchProducts);

// Watch for changes in the products and update displayedProducts
watch(products, updateDisplayedProducts);
</script>

<style>
.product-item {
    margin-bottom: 20px;
}
</style>
