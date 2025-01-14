<template>
  <main class="main">
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1 blog-page">
            <h2 class="about-us-title">Gallery</h2>
            <NuxtLink
              to="/media"
              class="btn btn-primary btn-round btn-shadow float-right"
            >
              <i class="icon-long-arrow-left"></i>
              <span>Back to Media Center</span>
            </NuxtLink>
            <p class="lead about-us-lead text-primary mb-3">
              Journey Through the Lens: Our Story in Pictures
            </p>

            <h2 class="text-primary text-2">
              {{ showroom?.name }}
            </h2>

            <p class="about-us-lead"></p>

            <div class="row">
              <div class="col-lg-12 gallery_items">
                <div class="entry-container max-col-3">
                  <div
                    v-for="(image, index) in showroom.gallery_images"
                    :key="index"
                    class="entry-item lifestyle shopping col-sm-4"
                  >
                    <article class="entry entry-grid text-center">
                      <figure class="entry-media">
                        <a href="#" @click="showMultiple(index)">
                          <NuxtImg
                            :src="assetsSync(image.name)"
                            :alt="showroom?.name"
                            format="webp"
                            quality="80"
                            loading="lazy"
                            class="w-full h-auto object-cover"
                          />
                        </a>
                      </figure>
                      <!-- End .entry-media -->
                    </article>
                    <!-- End .entry -->
                  </div>
                  <!-- End .entry-item -->

                  <!-- show images -->
                  <vue-easy-lightbox
                    esc-disabled
                    :visible="visible"
                    :imgs="imgs"
                    :index="indexRef"
                    @hide="handleHide"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// Define page meta
definePageMeta({
  validate: async (route) => {
    return !!route.params.id && !isNaN(parseInt(route.params.id as string));
  },
});

import { useMetaGenerator } from "~/utils/metaGenerator";
import VueEasyLightbox from "vue-easy-lightbox";

const route = useRoute();
const showroom_id = ref(
  route.params.id ? parseInt(route.params.id as string) : 1
);

const { api } = useAxios();

// Fetch blog details
const { data: showroom, refresh: fetchGallery } = await useAsyncData(
  `gallery-${showroom_id.value}`,
  async () => {
    const response = await api.get("/api/get-media-center-galleries-details", {
      params: {
        showroom_id: showroom_id.value,
      },
    });
    return response.data.showroom;
  }
);

// Generate SEO meta tags
const {
  generateContentMetaTags,
  generateHeadInput,
  generateSeoMeta,
  getDefaultMetaTags,
} = useMetaGenerator();

const metaTags = computed(() =>
  generateContentMetaTags({
    content: {
      ...showroom.value,
      keywords: `${showroom.value?.name}, ${getDefaultMetaTags().keywords}`,
    },
  })
);
// Apply meta tags
useHead(() => ({
  ...generateHeadInput(route, metaTags.value.jsonLdSchema),
  title: `${showroom.value?.name} - Gallery`,
}));

useSeoMeta(generateSeoMeta(metaTags.value, route));

const imgs = ref([]);

const showMultiple = async (index: number) => {
  imgs.value = showroom.value.gallery_images.map((item: any) =>
    assetsSync(item.name)
  );
  show(index);
};

const visible = ref(false);
const indexRef = ref(0);
const show = (index: number) => {
  indexRef.value = index;
  visible.value = true;
};

const handleHide = () => {
  visible.value = false;
};
</script>
<style>
.blog-page .about-us-lead {
  font-size: 2.2rem !important;
}

.blog-page .editor-content p {
  color: #555 !important;
  margin-bottom: 1.5rem !important;
  font-size: 1.5rem;
  font-weight: 400;
}

.blog-page .editor-content p em {
  color: #9b9b9b;
  font-size: 1.45rem;
}

.blog-page .editor-content ul li {
  position: relative;
  margin-bottom: 0.1rem;
  color: #555 !important;
  font-size: 1.5rem;
  font-weight: 400;
}

.posts-list li {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}
</style>
