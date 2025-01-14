<template>
  <div class="page-wrapper">
    <main class="main">
      <div class="container">
        <LoadingData v-if="pending" />

        <div v-else class="row cat-banner-row">
          <!-- Banner Section -->
          <div class="col-xl-2 col-xxl-2 slide-from-right">
            <div class="cat-banner row no-gutters">
              <div class="col-sm-12 col-xl-12 col-xxl-12">
                <div class="banner banner-overlay solution-image">
                  <a href="#">
                    <NuxtImg
                      :src="assetsSync(segment?.image, { local: true })"
                      :alt="segment?.name"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Solutions Grid -->
          <div class="col-xl-10 col-xxl-10 mt-1 slide-from-left">
            <div class="row">
              <div
                v-for="solution in solutions"
                :key="solution.id"
                class="col-md-2 col-sm-4 slide-solutions"
              >
                <NuxtLink
                  class="cat-block"
                  :to="getGenericLink(solution.id, solution.name, segment)"
                >
                  <figure>
                    <span>
                      <img
                        :src="assetsSync(solution.main_image_path)"
                        :alt="solution.name"
                      />
                    </span>
                  </figure>

                  <h3 class="cat-block-title">{{ solution.name }}</h3>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <button id="scroll-top" title="Back to Top">
      <i class="icon-arrow-up"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocation, RouteLocationRaw } from "vue-router";

definePageMeta({
  middleware: "segment",
});

import type { SolutionInterface } from "~/types/meta-tags";

// Composables
const route = useRoute();
const { api } = useAxios();
const { generateSeoMeta, generateHeadInput, generateContentMetaTags } =
  useMetaGenerator();

// Get segment from route
const segment = computed(() => getSegment(route.params.segment));

// Fetch solutions data
const { data: solutions, pending } = await useAsyncData(
  `solutions-${segment.value?.id}`,
  async () => {
    if (!segment.value?.id) return [];

    try {
      const response = await api.get<{ data: SolutionInterface[] }>(
        `/api/get-solutions/${segment.value.id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching solutions:", error);
      return [];
    }
  },
  {
    server: true,
    lazy: true,
  }
);

// Generate meta tags
const metaTags = computed(() =>
  generateContentMetaTags({
    type: "category",
    content: {
      name: segment.value?.name || "Solutions",
      description: `Explore our ${
        segment.value?.name
      } solutions for your business needs. Sheffield Steel Systems offers professional ${segment.value?.name?.toLowerCase()} solutions in East Africa.`,
      keywords: segment.value?.keywords || "",
      main_image_path: assetsSync(segment.value?.image, {
        local: true,
        transform: { width: 1200, height: 630 },
      }),
    },
  })
);

// Generate solution-specific schema
const solutionSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${segment.value?.name} Solutions by Sheffield Steel Systems`,
  description: `Browse our comprehensive range of ${segment.value?.name} solutions for businesses in East Africa`,
  numberOfItems: solutions.value?.length || 0,
  itemListElement:
    solutions.value?.map((solution, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: solution.name,
        image: assetsSync(solution.main_image_path),
        url: assetsSync(
          getGenericLink(solution.id, solution.name, segment.value)
        ),
        description:
          solution.description ||
          `Professional ${solution.name} solutions by Sheffield Steel Systems`,
        brand: {
          "@type": "Brand",
          name: "Sheffield Steel Systems",
        },
        category: segment.value?.name,
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
        },
      },
    })) || [],
}));

// Apply meta tags
useHead(() => ({
  ...generateHeadInput(route, solutionSchema.value),
}));

useSeoMeta(generateSeoMeta(metaTags.value, route));
</script>

<style scoped>
/* Animations */
.slide-from-left .slide-solutions {
  list-style: none;
  opacity: 0;
  transform: translateX(-100%);
  animation: slideRight 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

.slide-from-right {
  opacity: 0;
  transform: translateX(100%);
  animation: slideRight 0.5s ease-in-out forwards;
}

@keyframes slideRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Add animation delay for items */
.slide-from-left .slide-solutions:nth-child(2n) {
  animation-delay: 2ms;
}

/* Solution hover effects */
.slide-solutions a:hover .cat-block-title {
  color: #c02435;
}

/* Responsive */
@media only screen and (max-width: 768px) {
  .solution-image {
    display: none;
  }
}
</style>
