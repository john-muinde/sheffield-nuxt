<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container d-flex align-items-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/">HOME</NuxtLink>
          </li>
          <li class="breadcrumb-item">
            <NuxtLink :to="`/${pageSegment?.slug}`">
              {{ pageSegment?.name?.toUpperCase() }}
            </NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ data?.categories?.name }}
          </li>
        </ol>
      </div>
    </nav>

    <div class="page-content">
      <div class="container">
        <LoadingData v-if="pending" />
        <NoSolutionData
          v-else-if="!data?.categories || !pageSegment?.active"
          :retry-function="() => refresh()"
        />

        <div v-else class="row">
          <!-- Main Content -->
          <div class="col-lg-10">
            <div class="products mb-3">
              <div class="row">
                <!-- Solution Description -->
                <div class="col-lg-12 col-md-12 mt-1">
                  <div class="card w-100 mb-1">
                    <div id="heading-2" class="card-header">
                      <h2 class="card-title">
                        <a> {{ data.categories.name }} - SOLUTION </a>
                      </h2>
                    </div>
                  </div>
                </div>

                <!-- Products Grid -->
                <div
                  v-for="product in data.products"
                  :key="product.id"
                  class="col-6 col-md-3 col-lg-2 col-xl-2 image-container"
                >
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink :to="getProductLink(product)">
                        <NuxtImg
                          :src="assetsSync(product.main_image_path)"
                          :alt="product.name"
                          format="webp"
                          quality="80"
                          loading="lazy"
                          class="w-full h-auto object-cover product-image"
                        />
                      </NuxtLink>
                      <div class="product-action">
                        <button
                          type="button"
                          class="btn-product btn-cart"
                          @click="addToCart(product)"
                        >
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </figure>
                    <div class="product-body">
                      <div class="product-cat">
                        <NuxtLink :to="getProductLink(product)">
                          {{ product.product_brand?.name }}
                        </NuxtLink>
                      </div>

                      <NuxtLink :to="getProductLink(product)">
                        {{ product.name }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="col-lg-2 order-lg-first mt-2">
            <div class="sidebar sidebar-shop sidebar-shop-solution">
              <!-- Categories Filter -->
              <div
                v-if="data.categories.product_categories_json?.length"
                class="widget widget-collapsible widget-categories"
              >
                <h3 class="widget-title">
                  <a data-toggle="collapse" href="#widget-1" role="button">
                    Product Categories
                  </a>
                </h3>
                <div id="widget-1" class="show">
                  <div class="widget-body">
                    <div class="filter-items filter-items-count">
                      <div
                        v-for="category in data.categories
                          .product_categories_json"
                        :key="category.id"
                        class="filter-item"
                      >
                        <div class="custom-control custom-checkbox">
                          <input
                            :id="'cat-' + category.id"
                            type="checkbox"
                            class="custom-control-input"
                            :value="category.id"
                            @change="handleCategoryFilter(category.id)"
                          />
                          <label
                            :for="'cat-' + category.id"
                            class="custom-control-label"
                          >
                            {{ category.name }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Category Image -->
              <div class="widget widget-collapsible">
                <div id="widget-4" class="show">
                  <div class="widget-body">
                    <NuxtImg
                      :src="assetsSync(data.categories.main_image_path)"
                      format="webp"
                      quality="80"
                      loading="lazy"
                      class="w-full h-auto object-cover product-image"
                      :alt="data.categories.name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// Validate page
definePageMeta({
  validate: (route) => {
    return getSegment(route.params.segment) !== undefined;
  },
});

import type { Ref } from "vue";

// Composables
const route = useRoute();
const { segment, id } = route.params;
const { api } = useAxios();
const { generateSeoMeta, generateHeadInput, generateContentMetaTags } =
  useMetaGenerator();

// State
const selectedCategories: Ref<Record<number, number[]>> = ref({});

// Get current segment
const pageSegment = computed(() => getSegment(segment));

// Fetch data using useAsyncData
const { data, pending, refresh } = await useAsyncData(
  `solution-category-${id}`,
  async () => {
    const [categoriesRes, productsRes] = await Promise.all([
      api.get("/api/get-solution-categories", {
        params: { solution_id: id },
      }),
      api.get("/api/get-solution-category-products", {
        params: {
          solution_id: id,
          checkedCategoriesSolutions:
            selectedCategories.value[Number(id)] || [],
        },
      }),
    ]);

    return {
      categories: categoriesRes.data.data,
      products: productsRes.data.products.data,
    };
  },
  {
    watch: [selectedCategories],
  }
);

// Generate meta tags
const metaTags = computed(() =>
  generateContentMetaTags({
    type: "category",
    content: {
      name: data.value?.categories.name,
      description:
        data.value?.categories.description?.replace(/<[^>]*>/g, "") || "",
      keywords: `${pageSegment.value?.keywords}, ${
        data.value?.categories.name
      }, 
                ${data.value?.products
                  .map((p: { name: any }) => p.name)
                  .join(", ")}`,
      main_image_path: data.value?.categories.main_image_path,
    },
  })
);

// Generate schema
const categorySchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${data.value?.categories.name} by Sheffield Steel Systems`,
  description:
    data.value?.categories.description?.replace(/<[^>]*>/g, "") || "",
  numberOfItems: data.value?.products.length || 0,
  itemListElement:
    data.value?.products.map(
      (
        product: {
          name: any;
          main_image_path: string | undefined;
          product_brand: { name: any };
          description: any;
        },
        index: number
      ) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          image: assetsSync(product.main_image_path),
          url: getProductLink(product),
          brand: {
            "@type": "Brand",
            name: product.product_brand?.name || "Sheffield Steel Systems",
          },
          description:
            product.description || `${product.name} by Sheffield Steel Systems`,
          category: data.value?.categories.name,
          manufacturer: {
            "@type": "Organization",
            name: "Sheffield Steel Systems",
          },
        },
      })
    ) || [],
}));

// Apply meta tags
useHead(() => ({
  ...generateHeadInput(route, categorySchema.value),
  title: `${data.value?.categories.name} - ${pageSegment.value?.name} Solutions`,
}));

useSeoMeta(generateSeoMeta(metaTags.value, route));

// Handle category filter
const handleCategoryFilter = (categoryId: number) => {
  const mainCategoryId = Number(id);

  if (!selectedCategories.value[mainCategoryId]) {
    selectedCategories.value[mainCategoryId] = [];
  }

  const categoryArray = selectedCategories.value[mainCategoryId];
  const index = categoryArray.indexOf(categoryId);

  if (index > -1) {
    categoryArray.splice(index, 1);
  } else {
    categoryArray.push(categoryId);
  }
};
</script>

<style scoped></style>
