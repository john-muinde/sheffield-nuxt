<template>
  <div class="bg-gray-50">
    <main class="py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <h2 class="about-us-title">Blogs</h2>
        <!-- End .title -->
        <NuxtLink
          to="/media"
          class="btn btn-primary btn-round btn-shadow float-right rounded-md"
        >
          <i class="icon-long-arrow-left"></i><span>Back to Media Center</span>
        </NuxtLink>
        <p class="lead about-us-lead text-primary mb-3">In-Depth Insights</p>
        <div class="p-3"></div>
        <ContentState v-if="loading" type="loading" content-type="Blog Posts" />
        <!-- <ContentState
          v-if="!data?.data.length && !loading && !error"
          type="empty"
          @retry="refresh"
          content-type="Blog Posts"
        /> -->
        <ContentState
          v-if="!!error"
          @retry="refresh"
          type="error"
          content-type="Blog Posts"
        />

        <!-- Blog Grid -->
        <TransitionGroup
          appear
          name="blog-list"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <article
            v-for="(post, index) in blogs"
            :key="post.id"
            class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <!-- Image Container -->
            <div class="relative aspect-[16/9] overflow-hidden">
              <NuxtLink :to="getGenericLink(post.id, post.name, 'media/blogs')">
                <NuxtImg
                  :src="assetsSync(post.main_image_path)"
                  :alt="post.name"
                  format="webp"
                  quality="80"
                  loading="lazy"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
              </NuxtLink>
              <!-- Future Social Features -->
              <div class="absolute bottom-4 right-4 flex gap-2">
                <button
                  class="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-all duration-200 hover:scale-110 group"
                  title="Like"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-8 h-8 text-gray-600 group-hover:text-red-500 transition-colors"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                  <span class="sr-only">Like post</span>
                </button>
                <button
                  class="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-all duration-200 hover:scale-110 group"
                  title="Comment"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-8 h-8 text-gray-600 group-hover:text-blue-500 transition-colors"
                  >
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    />
                  </svg>
                  <span class="sr-only">Comment on post</span>
                </button>
                <button
                  class="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-all duration-200 hover:scale-110 group"
                  title="Share"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-8 h-8 text-gray-600 group-hover:text-green-500 transition-colors"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  <span class="sr-only">Share post</span>
                </button>
                <!-- <button
                  class="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-all duration-200 hover:scale-110 group"
                  title="Save"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-8 h-8 text-gray-600 group-hover:text-purple-500 transition-colors"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span class="sr-only">Save post</span>
                </button> -->
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h2
                class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition"
              >
                <NuxtLink
                  :to="getGenericLink(post.id, post.name, 'media/blogs')"
                >
                  {{ post.name }}
                </NuxtLink>
              </h2>
              <p class="text-gray-600 line-clamp-3 mb-4">
                {{ stripHtml(post.excerpt) }}
              </p>
              <div class="flex justify-between items-center">
                <NuxtLink
                  :to="getGenericLink(post.id, post.name, 'media/blogs')"
                  class="inline-flex items-center gap-1 text-red-600 hover:text-red-700 transition"
                >
                  Read more
                  <ArrowRight as="span" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { api } = useAxios();

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-vue-next";

// Current page from route params
const currentPage = computed(() =>
  route.query.page ? parseInt(route.query.page as string) : 1
);

const loading = computed(() => status.value === "pending");

// Fetch blogs with useAsyncData
const {
  data: blogs,
  status,
  error,
  refresh,
} = await useAsyncData(
  `blogs`,
  async () => {
    try {
      const response = await api.get("/api/get-blogs", {});
      return response.data;
    } catch (err) {
      console.error("Error fetching blogs:", err);
      throw err;
    }
  },
  {
    watch: [currentPage],
  }
);

// Meta tags
useHead({
  title: "Blog & Insights | Sheffield Africa",
  meta: [
    {
      name: "description",
      content:
        "Stay updated with our latest industry insights and expert knowledge.",
    },
  ],
});
</script>
