<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <h2 class="about-us-title">Blogs</h2>
              <!-- End .title -->
              <router-link
                to="/media"
                class="btn btn-primary btn-round btn-shadow float-right"
              >
                <i class="icon-long-arrow-left"></i
                ><span>Back to Media Center</span>
              </router-link>
              <p class="lead about-us-lead text-primary mb-3">
                In-Depth Insights
              </p>
              <ContentState
                v-if="loading"
                type="loading"
                content-type="Blog Posts"
              />
              <ContentState
                v-if="!displayedPosts.length && !loading"
                type="empty"
                content-type="Blog Posts"
              />
              <ContentState
                v-if="!!error"
                type="error"
                content-type="Blog Posts"
              />

              <div
                v-if="displayedPosts.length"
                class="row blogs-main-page-section"
              >
                <div
                  v-for="post in displayedPosts"
                  :key="post.id"
                  class="entry-item col-sm-6 col-lg-4"
                >
                  <article class="entry entry-grid">
                    <figure class="entry-media entry-gallery">
                      <router-link :to="getBlogLink(post.id, post.name)">
                        <NuxtImg
                          :src="assets(post.main_image_path)"
                          :alt="product.name"
                          preset="cover"
                          format="webp"
                          quality="80"
                          loading="lazy"
                          class="w-full h-auto object-cover"
                        />
                      </router-link>
                    </figure>
                    <!-- End .entry-media -->

                    <div class="entry-body">
                      <h2 class="entry-title">
                        <router-link
                          class="text-primary"
                          :to="getBlogLink(post.id, post.name)"
                        >
                          {{ getBlogParagraph(post.name) }}
                        </router-link>
                      </h2>
                      <!-- End .entry-title -->

                      <div class="entry-content">
                        <div class="mb-2">
                          {{ getFirstParagraph(post.excerpt) }}
                        </div>
                        <router-link
                          class="btn btn-primary"
                          :to="getBlogLink(post.id, post.name)"
                        >
                          Read More
                          <i class="icon-long-arrow-right"></i>
                        </router-link>
                      </div>
                    </div>
                    <!-- End .entry-body -->
                  </article>
                  <!-- End .entry -->
                </div>
              </div>

              <div v-if="displayedPosts.length" class="row">
                <div class="col-md-12">
                  <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                      <li
                        class="page-item"
                        :class="{
                          disabled: currentPage === 1,
                        }"
                      >
                        <router-link
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
                        </router-link>
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
                          <router-link
                            class="page-link"
                            :to="getBlogPageLink(page)"
                            @click="goToThisPage(page)"
                          >
                            {{ page }}
                          </router-link>
                        </template>
                      </li>
                      <li class="page-item-total">of {{ totalPages }}</li>
                      <li
                        class="page-item"
                        :class="{
                          disabled: currentPage === totalPages,
                        }"
                      >
                        <router-link
                          class="page-link page-link-next"
                          :to="getBlogPageLink(currentPage + 1)"
                          aria-label="Next"
                          @click="goToNextPage"
                        >
                          Next
                          <span aria-hidden="true"
                            ><i class="icon-long-arrow-right"></i
                          ></span>
                        </router-link>
                      </li>
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
import { ref, computed, watch, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";

useHead({
  title: "Blogs | Media Center",
  meta: [
    {
      name: "description",
      content: "In-depth insights on various topics.",
    },
  ],
});

const route = useRoute();

const currentPage = ref(route.params.page ? parseInt(route.params.page) : 1);
const perPage = ref(9);
const totalPosts = ref(0);
const posts = ref([]);
const category_id = ref(route.params.id ? parseInt(route.params.id) : 1);
const other_blogs = ref([]);

const loading = ref(false);
const error = ref(null);

const { api } = useAxios();

const fetchBlogPosts = async () => {
  loading.value = true;
  try {
    const response = await api.get("/api/get-blogs", {
      params: {
        page: currentPage.value,
        per_page: perPage.value,
        category_id: category_id.value,
      },
    });
    posts.value = response.data.data;
    totalPosts.value = response.data.total;
  } catch (error) {
    error.value = error;
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const fetchBlogSidebar = async () => {
  try {
    const response = await api.get("/api/get-blog-sidebar", {});
    other_blogs.value = response.data.other_blogs;
  } catch (error) {
    console.error(error);
  }
};

const getBlogLink = (id, name) => {
  let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
  transformedName = transformedName.replace(/-+/g, "-");
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  transformedName = transformedName.toLowerCase();

  return `/media/blogs/${id}/${transformedName}`;
};

const getBlogPageLink = (page) => {
  return `/media/blogs/page/${page}`;
};

// Determine the total number of pages
const totalPages = computed(() => {
  return Math.ceil(totalPosts.value / perPage.value);
});

// Displayed products based on the current page
const displayedPosts = ref([]);

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

const updateDisplayedPosts = () => {
  const startIndex = 0;
  displayedPosts.value = posts.value;
};

const isInteger = (value) => {
  return Number.isInteger(value);
};

const generatePageLinks = computed(() => {
  const pageLinks = [];
  const maxVisiblePages = 5;

  if (currentPage.value > 1) {
    pageLinks.push("Prev");
  }
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

  if (currentPage.value < totalPages.value) {
    pageLinks.push("Next");
  }

  return pageLinks;
});

const getFirstParagraph = (content) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = content;

  const paragraphs = tempElement.querySelectorAll("p");

  for (const paragraph of paragraphs) {
    const textContent = paragraph.textContent.trim();
    if (textContent.length > 50) {
      if (textContent.length > 140) {
        return textContent.slice(0, 144) + "...";
      } else {
        return textContent;
      }
    }
  }

  return "";
};

const getBlogParagraph = (content) => {
  if (content.length > 5) {
    if (content.length > 35) {
      return content.slice(0, 35) + "...";
    } else {
      return content;
    }
  }

  return "";
};

onMounted(() => {
  fetchBlogPosts();
  fetchBlogSidebar();
});

watch(currentPage, fetchBlogPosts);

watch(posts, updateDisplayedPosts);

watchEffect(() => {
  const params = route.params;
  const query = route.query;

  if (params.id !== "" && category_id.value !== params.id) {
    currentPage.value = 1;

    category_id.value = params.id ? parseInt(params.id) : 1;

    if (params.page !== "" && currentPage.value !== params.page) {
      currentPage.value = params.page ? parseInt(params.page) : 1;
    }

    fetchBlogPosts();
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

.blogs-main-page-section .entry-gallery a {
  padding-bottom: 70.67%;
  overflow: hidden;
}

.blogs-main-page-section .entry-media img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.blogs-main-page-section .entry-grid .entry-media {
  margin-bottom: 1.4rem;
  box-shadow: 0px -2px 8px 2px #646060;
}
</style>
