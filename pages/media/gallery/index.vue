<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1 gallery-main-page-section">
              <h2 class="about-us-title">Gallery</h2>
              <NuxtLink
                to="/media"
                class="btn btn-primary btn-round btn-shadow float-right"
              >
                <i class="icon-long-arrow-left"></i
                ><span>Back to Media Center</span>
              </NuxtLink>
              <p class="lead about-us-lead text-primary mb-3">
                Journey Through the Lens: Our Story in Pictures
              </p>

              <!-- Add the filter component -->
              <DynamicFilters
                :items="data?.data || []"
                filter-column="gallery_type"
                :filters="filters"
                @update:displayed-products="handleUpdateDisplayedProducts"
              />

              <!-- Empty State -->
              <ContentState
                v-if="!displayedProducts.length && !pending && !error"
                type="empty"
                @retry="refresh"
                content-type="gallery"
              />

              <!-- Error State -->
              <ContentState
                v-if="!!error"
                type="error"
                @retry="refresh"
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
                      <NuxtLink
                        :to="
                          getGenericLink(
                            product.id,
                            product.name,
                            'media/gallery'
                          )
                        "
                      >
                        <NuxtImg
                          :src="assetsSync(product.main_image_path)"
                          :alt="product.name"
                          format="webp"
                          quality="80"
                          loading="lazy"
                          class="w-full h-auto object-cover"
                        />
                      </NuxtLink>
                      <!-- Social Features -->
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
                            class="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors"
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            />
                          </svg>
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
                            class="w-4 h-4 text-gray-600 group-hover:text-green-500 transition-colors"
                          >
                            <path
                              d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
                            />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                          </svg>
                        </button>
                        <button
                          class="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-all duration-200 hover:scale-110 group"
                          title="Save"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            class="w-4 h-4 text-gray-600 group-hover:text-purple-500 transition-colors"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>
                    </figure>

                    <div class="entry-body">
                      <div class="entry-meta">
                        <span class="meta-separator">|</span>
                      </div>
                      <h2 class="entry-title">
                        <NuxtLink
                          :to="
                            getGenericLink(
                              product.id,
                              product.name,
                              'media/gallery'
                            )
                          "
                        >
                          {{ product.name }}
                        </NuxtLink>
                      </h2>
                      <div class="entry-cats mt-1">
                        <b style="background-color: #c02434; padding: 5px">
                          {{ product.gallery_type }}
                        </b>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { api } = useAxios();

const filters = ref(["CSR", "EVENT", "PROJECT"]);
const displayedProducts = ref([]);
const selectedFilters = ref([]);

// Fetch data using useAsyncData
const { data, pending, error, refresh } = await useAsyncData(
  "galleries",
  async () => {
    try {
      const response = await api.get("/api/get-media-center-galleries", {
        params: {
          gallery_type: selectedFilters.value,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching galleries:", err);
      throw err;
    }
  },
  {
    watch: [selectedFilters],
  }
);

const updateDisplayedProducts = (filteredProducts) => {
  displayedProducts.value = filteredProducts;
};

const handleUpdateDisplayedProducts = ({
  filteredData,
  selectedFilters: filters,
}) => {
  updateDisplayedProducts(filteredData);
  selectedFilters.value = filters;
};

// Watch for data changes and update displayed products
watch(
  () => data.value?.data,
  (newData) => {
    if (newData) {
      updateDisplayedProducts(newData);
    }
  },
  { immediate: true }
);

useHead({
  title: "Gallery | Media Center",
  meta: [
    {
      name: "description",
      content: "Journey through the lens: Our story in pictures.",
    },
  ],
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
</style>
