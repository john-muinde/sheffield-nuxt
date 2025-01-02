<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="border-0 mb-4">
      <div class="container flex items-center">
        <ol class="flex flex-wrap items-center gap-2 text-md md:text-base">
          <li class="flex items-center">
            <NuxtLink
              to="/"
              class="text-gray-600 hover:text-primary transition-colors"
              >HOME</NuxtLink
            >
            <span class="mx-2 text-gray-400"> > </span>
          </li>

          <li v-if="reversedCategories.length > 0" class="flex items-center">
            <NuxtLink
              :to="'/' + segment?.slug"
              class="text-gray-600 hover:text-primary transition-colors"
            >
              {{ segment?.name.toUpperCase() }}
            </NuxtLink>
            <span class="mx-2 text-gray-400"> > </span>
          </li>

          <li
            v-for="category in reversedCategories"
            :key="category.id"
            class="flex items-center"
          >
            <NuxtLink
              :to="
                getCategoryLink(category.id, category.name, undefined, segment)
              "
              class="text-gray-600 hover:text-primary transition-colors"
            >
              {{ category.name }}
            </NuxtLink>
            <span class="mx-2 text-gray-400"> > </span>
          </li>

          <li class="text-gray-400">
            {{ product?.name }}
          </li>
        </ol>
      </div>
    </nav>

    <div class="page-content mt-0">
      <div class="container">
        <div
          v-if="error"
          class="min-h-[60vh] flex items-center justify-center bg-white rounded-lg shadow-sm"
        >
          <div class="row justify-content-center">
            <div class="col-md-8 text-center py-5">
              <div class="mb-4">
                <i class="icon-exclamation-circle text-red-500 text-5xl"></i>
              </div>
              <h2 class="text-gray-800 font-semibold mb-3 text-2xl">
                Unable to Load Product
              </h2>
              <p class="text-gray-600 text-lg mb-4">
                We're having trouble loading this product's information. This
                might be because:
              </p>
              <ul class="text-left mb-4 mx-auto max-w-[400px] list-none">
                <li
                  class="py-2 text-gray-600 border-b border-gray-200 pl-4 relative before:content-['•'] before:text-red-500 before:font-bold before:inline-block before:w-4 before:ml-[-1em]"
                >
                  The product may no longer be available
                </li>
                <li
                  class="py-2 text-gray-600 border-b border-gray-200 pl-4 relative before:content-['•'] before:text-red-500 before:font-bold before:inline-block before:w-4 before:ml-[-1em]"
                >
                  There might be a temporary connection issue
                </li>
                <li
                  class="py-2 text-gray-600 pl-4 relative before:content-['•'] before:text-red-500 before:font-bold before:inline-block before:w-4 before:ml-[-1em]"
                >
                  The product URL might be incorrect
                </li>
              </ul>
              <div class="my-8 flex flex-col md:flex-row gap-4 justify-center">
                <button
                  class="px-6 py-3 bg-primary text-white font-medium transition-all duration-300 hover:bg-secondary rounded-sm"
                  @click="retryLoading"
                >
                  Try Again
                </button>
                <NuxtLink
                  to="/"
                  class="px-6 py-3 text-primary border-2 border-primary font-medium transition-all duration-300 hover:bg-secondary hover:text-white hover:border-secondary rounded-sm whitespace-nowrap"
                >
                  Return to Homepage
                </NuxtLink>
              </div>
              <p class="mt-4 text-sm text-gray-500">
                If this problem persists, please contact our support team
              </p>
            </div>
          </div>
        </div>
        <div v-else class="product-details-top">
          <div class="row">
            <div class="col-md-5">
              <!-- Loading State -->
              <div v-if="loading" class="space-y-4">
                <div
                  class="w-full h-[350px] bg-gray-200 animate-pulse rounded-lg"
                ></div>
                <div class="grid grid-cols-6 gap-2">
                  <div
                    v-for="n in 4"
                    :key="n"
                    class="h-16 bg-gray-200 animate-pulse rounded"
                  ></div>
                </div>
              </div>

              <!-- Main Product Section -->
              <div v-else class="product-gallery">
                <figure class="relative">
                  <NuxtImg
                    id="product-zoom"
                    :src="assetsSync(mainImage)"
                    :alt="product?.name"
                    class="grid max-w-full max-h-[350px] min-h-[350px] h-auto mx-auto w-auto"
                    @click="showMultiple"
                  />

                  <a
                    href="#"
                    class="absolute right-4 top-4 flex items-center justify-center w-10 h-10 bg-white bg-opacity-80 rounded-full shadow-lg transition-all duration-300 hover:bg-opacity-100"
                    @click.prevent="showMultiple"
                  >
                    <i class="icon-arrows"></i>
                  </a>
                </figure>

                <div>
                  <vue-easy-lightbox
                    esc-disabled
                    :visible="visible"
                    :imgs="imgs"
                    :index="indexRef"
                    @hide="handleHide"
                  />
                </div>

                <div class="grid grid-cols-6 gap-2 mt-4">
                  <a
                    v-for="(image, index) in product?.product_images"
                    :key="image.id"
                    :class="[
                      'cursor-pointer border-2 rounded overflow-hidden transition-all duration-300',
                      index === activeIndex
                        ? 'border-primary'
                        : 'border-transparent hover:border-gray-300',
                    ]"
                    href="#"
                    @click.prevent
                    @mouseover="changeMainImage(image.name, index)"
                  >
                    <img
                      :src="assetsSync(image.name)"
                      :alt="product?.name"
                      class="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div class="col-md-7">
              <!-- Loading State -->
              <div v-if="loading" class="space-y-6">
                <div class="h-8 bg-gray-200 w-3/4 animate-pulse rounded"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div
                    class="h-4 bg-gray-200 w-5/6 animate-pulse rounded"
                  ></div>
                  <div
                    class="h-4 bg-gray-200 w-4/6 animate-pulse rounded"
                  ></div>
                </div>
                <div class="h-12 bg-gray-200 w-48 animate-pulse rounded"></div>
              </div>

              <!-- Main Product Section -->
              <div v-else class="space-y-4">
                <h1 class="text-3xl md:text-4xl font-bold text-primary">
                  {{ product?.name }}
                </h1>

                <div
                  class="text-gray-700 w-4/5"
                  v-html="product?.short_description"
                ></div>

                <p class="flex gap-2">
                  <span class="font-medium">Brand:</span>
                  {{ product?.brand_name }}
                </p>

                <div class="flex gap-2">
                  <span class="font-medium">Categories:</span>
                  <NuxtLink
                    v-for="(category, index) in product?.categories_json"
                    :key="category.id"
                    class="font-medium hover:text-primary transition-colors"
                    :to="
                      getCategoryLink(
                        category.id,
                        category.name,
                        undefined,
                        segment
                      )
                    "
                  >
                    {{ category.name }}
                    {{
                      index < product?.categories_json.length - 1 ? ", " : ""
                    }}
                  </NuxtLink>
                </div>

                <div class="flex items-center gap-8 mt-6 rounded-md">
                  <div v-if="qrCodeDataUrl" class="text-center">
                    <small class="block mb-1 text-gray-600">Product QR</small>
                    <img class="w-[120px]" :src="qrCodeDataUrl" alt="QR Code" />
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary py-3"
                    :disabled="!product?.id"
                    @click="addToCart(product)"
                  >
                    <span>Add to Cart</span>
                    <i class="icon-shopping-cart text-4xl ml-1"></i>
                  </button>
                </div>

                <div class="mt-8">
                  <ul class="flex gap-4 border-b border-gray-200">
                    <li
                      v-for="tab in ['description', 'specs']"
                      :key="tab"
                      class="relative"
                    >
                      <a
                        href="#"
                        class="block px-4 py-2 text-2xl transition-colors hover:text-primary"
                        :class="
                          activeTab === tab
                            ? 'text-primary font-medium'
                            : 'text-gray-600'
                        "
                        @click.prevent="activeTab = tab"
                      >
                        {{
                          tab === "specs"
                            ? "Technical Specifications"
                            : "Description"
                        }}
                      </a>
                      <div
                        v-if="activeTab === tab"
                        class="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                      ></div>
                    </li>
                  </ul>

                  <div class="py-4">
                    <div
                      v-show="activeTab === 'description'"
                      class="product-desc-content"
                      v-html="product?.description"
                    ></div>
                    <div
                      v-show="activeTab === 'specs'"
                      class="product-desc-content"
                      v-html="product?.technical_specification"
                    ></div>
                  </div>
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
definePageMeta({
  middleware: "product", // middleware name only
});

import { ref, computed } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import QRCode from "qrcode-generator";
import type { SegmentInterface } from "~/types/meta-tags";

const route = useRoute();
const { BASE_URL } = useAxios();
const { $product } = useNuxtApp();

// State
const visible = ref(false);
const indexRef = ref(0);
const mainImage = ref("");
const activeIndex = ref(0);
const qrCodeDataUrl = ref(null as string | null);

const loading = computed(() => $product.isLoading());

const activeTab = ref("description");

const productId = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
);

// Get product data (will use cache from middleware)
const { data: product, error } = await useAsyncData(
  `product-${productId.value}`,
  () => $product.getCachedProduct(productId.value)
);

const segment = computed(() =>
  getSegment(product.value?.categories_json[0].parent_name_with_slashes)
);

const reversedCategories = computed(() =>
  product.value?.categories_json.slice().reverse()
);

// Retry loading function
const retryLoading = async () => {
  try {
    // Force fresh fetch
    const freshProduct = await $product.getProduct(productId.value, true);
    product.value = freshProduct;
  } catch (err) {
    console.error("Error retrying product load:", err);
  }
};

// SEO setup
const { metaTags, productSchema, breadcrumbSchema } = useProductsPageSEO(
  computed(() => product.value),
  segment.value as SegmentInterface,
  true
);

const { generateSeoMeta, generateHeadInput } = useMetaGenerator();

useHead(() => ({
  ...generateHeadInput(route, [productSchema.value, breadcrumbSchema.value]),
  title: product.value?.theCategory?.name
    ? `${product.value?.name} Details`
    : "Product Details",
}));

useSeoMeta(generateSeoMeta(metaTags.value, route));

// Methods
const generateQRCode = () => {
  const qr = QRCode(0, "L");
  qr.addData(BASE_URL + route.fullPath);
  qr.make();
  qrCodeDataUrl.value = qr.createDataURL();
};

const showMultiple = () => {
  if (!product.value?.product_images) return;
  indexRef.value = activeIndex.value;
  visible.value = true;
};

const handleHide = () => {
  visible.value = false;
};

const changeMainImage = (imageName: string, index: number) => {
  mainImage.value = imageName;
  activeIndex.value = index;
};

// Computed
const imgs = computed(
  () =>
    product.value?.product_images?.map((item: any) => assetsSync(item.name)) ||
    []
);

// Watch for navigation
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      await retryLoading();
    }
  }
);

// Watch for product changes
watch(
  () => product.value,
  (newProduct: any) => {
    if (newProduct?.product_images?.length > 0) {
      mainImage.value = newProduct.product_images[0].name;
    }

    generateQRCode();
  },
  { immediate: true }
);

// Client-side operations
onMounted(() => {
  generateQRCode();
});
</script>
