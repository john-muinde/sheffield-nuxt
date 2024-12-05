<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1 in-the-news-section">
              <h2 class="about-us-title">In the News</h2>
              <!-- End .title -->
              <NuxtLink
                to="/media"
                class="btn btn-primary btn-round btn-shadow float-right"
              >
                <i class="icon-long-arrow-left"></i
                ><span>Back to Media Center</span>
              </NuxtLink>
              <p class="lead about-us-lead text-primary mb-3">
                Media Spotlight: Sheffield Making Waves in the News
              </p>

              <ContentState
                v-if="loading"
                type="loading"
                content-type="Articles In The News"
              />
              <ContentState
                v-if="!displayedProducts.length && !loading"
                type="empty"
                content-type="Our articles In The News"
              />
              <ContentState
                v-if="!!error"
                type="error"
                content-type="Articles In The News"
              />

              <div
                v-if="displayedProducts.length"
                class="row justify-content-left"
              >
                <div
                  v-for="product in displayedProducts"
                  :key="product.id"
                  class="col-12 col-md-6 col-lg-4 mb-2 blog-item"
                >
                  <div class="p-6 border rounded">
                    <div class="position-relative mb-2" style="height: 216px">
                      <a
                        target="_blank"
                        class="float-center"
                        :href="product.url"
                      >
                        <img
                          class="w-100 h-100 rounded"
                          style="object-fit: cover"
                          :src="assets(product.main_image_path)"
                          :alt="product.name"
                        />
                      </a>
                    </div>

                    <!-- <h2 class="mb-1 h5 px-4 entry-title">
                                          <a target="_blank" class="" :href="product.url">
                                              {{ product.name }}
                                          </a>
                                        </h2> -->

                    <a
                      target="_blank"
                      class="btn btn-primary ml-5 pl-4 mt-2 mb-2 float-center"
                      style="color: white"
                      :href="product.url"
                    >
                      Read More
                      <i class="icon-long-arrow-right"></i>
                    </a>
                  </div>
                </div>

                <div class="col-lg-12 blogs mt-3">
                  <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                      <li
                        class="page-item"
                        :class="{
                          disabled: currentPage === 1,
                        }"
                      >
                        <NuxtLink
                          class="page-link page-link-prev"
                          :to="getBlogPageLink(currentPage - 1)"
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
                        :class="{
                          active: page === currentPage,
                        }"
                      >
                        <template v-if="isInteger(page)">
                          <NuxtLink
                            class="page-link"
                            :to="getBlogPageLink(page)"
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
                          :to="getBlogPageLink(currentPage + 1)"
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
import { ref, computed, watch, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";

useHead({
  title: "In The News",
  meta: [
    {
      name: "description",
      content: "Media Spotlight: Sheffield Making Waves in the News",
    },
  ],
});

const route = useRoute();

const currentPage = ref(route.params.page ? parseInt(route.params.page) : 1);
const perPage = ref(12);
const totalProducts = ref(0);
const products = ref([]);
const category_id = ref(route.params.id ? parseInt(route.params.id) : 1);
const other_blogs = ref([]);

const loading = ref(false);
const error = ref(null);

const { api } = useAxios();

// Fetch products based on the current page
const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await api.get("/api/get-in-the-news", {
      params: {
        page: currentPage.value,
        per_page: perPage.value,
        category_id: category_id.value,
      },
    });
    products.value = response.data.data;
    totalProducts.value = response.data.total;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    error.value = error;
    console.error(error);
  }
};

const fetchBlogSidebar = async () => {
  try {
    const response = await api.get("/api/get-blog-sidebar", {});
    //blog.value = response.data.blog;
    other_blogs.value = response.data.other_blogs;
  } catch (error) {
    console.error(error);
  }
};

const getBlogPageLink = (page) => {
  return `/media/in-the-news/page/${page}`;
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
  fetchProducts();
  fetchBlogSidebar();
});

// Watch for changes in the currentPage and fetch products accordingly
watch(currentPage, fetchProducts);

// Watch for changes in the products and update displayedProducts
watch(products, updateDisplayedProducts);

watchEffect(() => {
  const params = route.params; // Access the route parameters
  const query = route.query; // Access the query parameters

  if (params.id !== "" && category_id.value !== params.id) {
    currentPage.value = 1;

    category_id.value = params.id ? parseInt(params.id) : 1;

    if (params.page !== "" && currentPage.value !== params.page) {
      currentPage.value = params.page ? parseInt(params.page) : 1;
    }
    fetchProducts();
  }
});
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .blogs .entry-list .entry-media {
    max-height: 190px;
    overflow: hidden;
  }

  .blogs .entry-title {
    font-size: 2.3rem;
  }
}

.posts-list li {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}

.in-the-news-section .entry-title {
  font-size: 1.8rem !important;
}
</style>
