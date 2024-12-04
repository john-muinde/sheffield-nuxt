<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1 gallery-main-page-section">
              <h2 class="about-us-title">Gallery</h2>
              <!-- End .title -->
              <router-link
                to="/media"
                class="btn btn-primary btn-round btn-shadow float-right"
              >
                <i class="icon-long-arrow-left"></i
                ><span>Back to Media Center</span>
              </router-link>
              <p class="lead about-us-lead text-primary mb-3">
                Journey Through the Lens: Our Story in Pictures
              </p>
              <!-- Add the filter component -->
              <DynamicFilters
                :items="products"
                filter-column="gallery_type"
                :filters="filters"
                @update:displayed-products="handleUpdateDisplayedProducts"
              />

              <ContentState
                v-if="loading"
                type="loading"
                content-type="gallery"
              />
              <ContentState
                v-if="!displayedProducts.length && !loading"
                type="empty"
                content-type="gallery"
              />
              <ContentState
                v-if="!!error"
                type="error"
                content-type="gallery"
              />

              <div v-if="displayedProducts.length" class="row mt-2">
                <div
                  v-for="product in displayedProducts"
                  :key="product.id"
                  class="entry-item col-sm-6 col-lg-4"
                >
                  <article class="entry entry-mask">
                    <figure class="entry-media entry-gallery">
                      <router-link :to="getBlogLink(product.id, product.name)">
                        <NuxtImg
                          :src="assets(product.main_image_path)"
                          :alt="product.name"
                          preset="cover"
                          format="webp"
                          quality="80"
                          loading="lazy"
                          class="w-full h-auto object-cover"
                        />
                      </router-link>
                    </figure>

                    <div class="entry-body">
                      <div class="entry-meta">
                        <!-- <a href="#">Nov 18, 2018</a> -->
                        <span class="meta-separator">|</span>
                      </div>
                      <!-- End .entry-meta -->
                      <h2 class="entry-title">
                        <router-link
                          :to="getBlogLink(product.id, product.name)"
                        >
                          {{ product.name }}
                        </router-link>
                      </h2>
                      <!-- End .entry-title -->
                      <div class="entry-cats mt-1">
                        <b style="background-color: #c02434; padding: 5px">{{
                          product.gallery_type
                        }}</b>
                      </div>
                      <!-- End .entry-cats -->
                    </div>
                    <!-- End .entry-body -->
                  </article>
                  <!-- End .entry -->
                </div>

                <div class="col-lg-12 mt-3">
                  <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                      <!-- <li class="page-item" :class="{ disabled: !pagination?.prev_page_url }">
                                                  <a class="page-link page-link-prev"
                                                      @click.prevent="goToPage(pagination?.prev_page_url)"
                                                      aria-label="Previous" tabindex="-1" aria-disabled="true">
                                                      <span aria-hidden="true"><i class="icon-long-arrow-left"></i></span>
                                                      Prev
                                                  </a>
                                              </li> -->
                      <li
                        v-for="(page, index) in pagination?.links"
                        :key="page.label"
                        class="page-item"
                        :class="{ active: page.active }"
                      >
                        <a
                          v-if="
                            page.url && Number.isInteger(Number(page.label))
                          "
                          class="page-link"
                          @click.prevent="goToPage(page.url)"
                        >
                          {{ page.label }}
                        </a>
                      </li>
                      <!-- <li class="page-item" :class="{ disabled: !pagination?.next_page_url }">
                                                  <a class="page-link page-link-next"
                                                      @click.prevent="goToPage(pagination?.next_page_url)"
                                                      aria-label="Next">
                                                      Next
                                                      <span aria-hidden="true"><i
                                                              class="icon-long-arrow-right"></i></span>
                                                  </a>
                                              </li> -->
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <!-- End .row -->
        </div>
        <!-- End .container -->
      </div>
      <!-- End .page-content -->
    </main>
    <!-- End .main -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

useHead({
  title: "Gallery | Media Center",
  meta: [
    {
      name: "description",
      content: "Journey through the lens: Our story in pictures.",
    },
  ],
});

const { api } = useAxios();

const route = useRoute();
const router = useRouter();

const currentPage = ref(route.params.page ? parseInt(route.params.page) : 1);
const perPage = ref(12);
const totalProducts = ref(0);
const products = ref([]);
const category_id = ref(route.params.id ? parseInt(route.params.id) : 1);
const displayedProducts = ref([]);
const selectedFilters = ref([]);
const pagination = ref({});
const filters = ref(["CSR", "EVENT", "PROJECT"]);

const loading = ref(false);
const error = ref(null);

// Fetch products based on the current page
const fetchProducts = async (url = null) => {
  loading.value = true;
  if (typeof url == "string" && url.includes("http")) {
    url = url.split("/api/").pop();
  }
  try {
    const response = await api.get(url || "/api/get-media-center-galleries", {
      params: {
        page: currentPage.value,
        // per_page: perPage.value,
        category_id: category_id.value,
        gallery_type: selectedFilters.value,
      },
    });
    const data = response.data;
    products.value = data.data;
    totalProducts.value = data.total;
    pagination.value = {
      next_page_url: data.next_page_url,
      prev_page_url: data.prev_page_url,
      links: data.links,
    };
    loading.value = false;
    updateDisplayedProducts(products.value);
  } catch (error) {
    error.value = error;
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const getBlogLink = (id, name) => {
  let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
  transformedName = transformedName.replace(/-+/g, "-");
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  transformedName = transformedName.toLowerCase();
  return `/media/gallery/${id}/${transformedName}`;
};

// Go to the specified page
const goToPage = (url) => {
  if (url) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const page = urlParams.get("page");
    if (page) {
      currentPage.value = parseInt(page);
      router.push(`/media/gallery/page/${currentPage.value}`);
    }
  }
};

const updateDisplayedProducts = (filteredProducts) => {
  displayedProducts.value = filteredProducts;
};

const handleUpdateDisplayedProducts = ({ filteredData, selectedFilters }) => {
  updateDisplayedProducts(filteredData);
  selectedFilters.value = selectedFilters;
};

// Initial fetch of products
onMounted(() => {
  fetchProducts();
});

// Watch for changes in the products and update displayedProducts
watch(products, updateDisplayedProducts);

watchEffect(() => {
  const params = route.params;

  const newCategoryId = params.id ? parseInt(params.id) : 1;
  const newPage = params.page ? parseInt(params.page) : 1;

  if (category_id.value !== newCategoryId || currentPage.value !== newPage) {
    category_id.value = newCategoryId;
    currentPage.value = newPage;
    fetchProducts();
  }
});
</script>

<style scoped>
.gallery-main-page-section .entry-gallery a {
  padding-bottom: 70.67%;
  overflow: hidden;
}

.gallery-main-page-section .entry-media img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.page-link {
  cursor: pointer;
}
</style>
