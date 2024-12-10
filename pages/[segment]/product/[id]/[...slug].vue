<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container d-flex align-items-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/">HOME</NuxtLink>
          </li>

          <li
            v-if="
              product?.categories_json &&
              product?.categories_json.length > 0 &&
              product?.categories_json[0].parent_name_with_slashes
            "
            class="breadcrumb-item"
          >
            <NuxtLink :to="'/' + segment?.slug">
              {{ segment?.name.toUpperCase() }}
            </NuxtLink>
          </li>

          <li class="breadcrumb-item">
            <NuxtLink
              v-for="category in product?.categories_json"
              :key="category.id"
              :to="getCategoryLink(category.id, category.name)"
            >
              {{ category.name }}
            </NuxtLink>
          </li>

          <li class="breadcrumb-item active" aria-current="page">
            {{ product?.name }}
          </li>
        </ol>
      </div>
    </nav>

    <div class="page-content mt-0">
      <div class="container">
        <div v-if="error" class="product-error-state">
          <div class="row justify-content-center">
            <div class="col-md-8 text-center py-5">
              <div class="error-icon mb-4">
                <i
                  class="icon-exclamation-circle text-danger"
                  style="font-size: 3rem"
                ></i>
              </div>
              <h2 class="error-title mb-3">Unable to Load Product</h2>
              <p class="error-message text-muted mb-4">
                We're having trouble loading this product's information. This
                might be because:
              </p>
              <ul
                class="error-reasons text-left mb-4 mx-auto"
                style="max-width: 400px"
              >
                <li>The product may no longer be available</li>
                <li>There might be a temporary connection issue</li>
                <li>The product URL might be incorrect</li>
              </ul>
              <div class="error-actions">
                <button class="btn btn-primary me-3" @click="retryLoading">
                  Try Again
                </button>
                <NuxtLink
                  to="/"
                  class="btn btn-outline-primary whitespace-nowrap"
                >
                  Return to Homepage
                </NuxtLink>
              </div>
              <p class="mt-4 small text-muted">
                If this problem persists, please contact our support team
              </p>
            </div>
          </div>
        </div>
        <div v-else class="product-details-top">
          <div class="row">
            <div class="col-md-5">
              <ClientOnly>
                <template #default>
                  <div class="product-gallery">
                    <figure class="product-main-image">
                      <NuxtImg
                        id="product-zoom"
                        :src="assets(mainImage)"
                        :alt="product?.name"
                        style="
                          display: grid;
                          max-width: 100%;
                          max-height: 350px;
                          min-height: 350px;
                          height: auto;
                          margin-left: auto;
                          margin-right: auto;
                          width: auto;
                        "
                        @click="showMultiple"
                      />

                      <a
                        id="btn-product-gallery"
                        href="#"
                        class="btn-product-gallery"
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

                    <div
                      id="product-zoom-gallery"
                      class="product-image-gallery max-col-6"
                    >
                      <a
                        v-for="(image, index) in product?.product_images"
                        :key="image.id"
                        :class="[
                          'product-gallery-item',
                          { active: index === activeIndex },
                        ]"
                        href="#"
                        :data-image="assets(image.name)"
                        :data-zoom-image="assets(image.name)"
                        @click.prevent
                        @mouseover="changeMainImage(image.name, index)"
                      >
                        <img :src="assets(image.name)" :alt="product?.name" />
                      </a>
                    </div>
                  </div>
                </template>
                <template #fallback>
                  <div class="product-gallery-shimmer">
                    <div class="main-image-shimmer shimmer"></div>
                    <div class="thumbnail-container">
                      <div
                        class="thumbnail-shimmer shimmer"
                        v-for="n in 4"
                        :key="n"
                      ></div>
                    </div>
                  </div>
                </template>
              </ClientOnly>
            </div>

            <div class="col-md-7">
              <ClientOnly>
                <template #default>
                  <div class="product-details">
                    <h1 class="header text-primary">{{ product?.name }}</h1>
                    <div
                      class="short_description"
                      v-html="product?.short_description"
                    ></div>
                    <p>
                      <span>Brand : </span>
                      {{ product?.brand_name }}
                    </p>
                    <span>Category : </span>

                    <NuxtLink
                      v-for="category in product?.categories_json"
                      :key="category.id"
                      style="font-weight: 500"
                      :to="getCategoryLink(category.id, category.name)"
                    >
                      {{ category.name }}
                    </NuxtLink>

                    <div v-if="qrCodeDataUrl" class="qr_section">
                      <small class="mb-1">Product QR</small>
                      <img
                        style="width: 120px"
                        :src="qrCodeDataUrl"
                        alt="QR Code"
                      />
                    </div>

                    <div
                      class="product-details-action product-details-sheffield mt-2"
                    >
                      <button
                        type="button"
                        class="btn-product btn-cart"
                        :class="{ 'disabled cursor-not-allowed': !product?.id }"
                        :disabled="!product?.id"
                        @click="addToCart(product)"
                      >
                        <span>Add to Cart</span>
                      </button>
                    </div>

                    <div class="product-details-tab mt-2">
                      <ul
                        class="nav nav-pills justify-content-left mobile-description"
                        role="tablist"
                      >
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            :class="{ active: activeTab === 'description' }"
                            href="#"
                            @click.prevent="activeTab = 'description'"
                            >Description</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            :class="{ active: activeTab === 'specs' }"
                            href="#"
                            @click.prevent="activeTab = 'specs'"
                            >Technical Specifications</a
                          >
                        </li>
                      </ul>
                      <div class="tab-content">
                        <div
                          v-show="activeTab === 'description'"
                          class="tab-pane fade active show"
                        >
                          <div class="product-desc-content">
                            <div v-html="product?.description"></div>
                          </div>
                        </div>
                        <div
                          v-show="activeTab === 'specs'"
                          class="tab-pane fade"
                          :class="{ 'active show': activeTab === 'specs' }"
                        >
                          <div class="product-desc-content">
                            <div
                              v-html="product?.technical_specification"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template #fallback>
                  <div class="product-details-shimmer">
                    <div class="shimmer title-shimmer mb-4"></div>
                    <div
                      class="shimmer text-shimmer mb-3"
                      v-for="n in 3"
                      :key="n"
                    ></div>
                    <div class="shimmer button-shimmer mt-4"></div>
                    <div class="tabs-shimmer mt-4">
                      <div
                        class="shimmer tab-shimmer"
                        v-for="n in 2"
                        :key="n"
                      ></div>
                    </div>
                  </div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import QRCode from "qrcode-generator";

const route = useRoute();
const { api } = useAxios();

const { createProductSchema } = useSchemas();

const segment = computed(() =>
  getSegment(product.value?.categories_json[0].parent_name_with_slashes)
);

// State
const visible = ref(false);
const indexRef = ref(0);
const mainImage = ref("");
const activeIndex = ref(0);
const qrCodeDataUrl = ref(null);
const activeTab = ref("description");

// Fetch product data using useAsyncData
const {
  data: product,
  pending,
  error,
} = await useAsyncData(
  `product-${route.params.id}`,
  async () => {
    try {
      const response = await api.get("/api/get-product", {
        params: {
          product_id: route.params.id,
        },
      });
      return response.data.data;
    } catch (err) {
      throw new Error("Failed to load product data");
    }
  },
  {
    server: true,
    lazy: false,
    immediate: true,
  }
);

const retryLoading = async () => {
  try {
    await refreshNuxtData(`product-${route.params.id}`);
  } catch (err) {
    // Error will be handled by the error state display
  }
};

const { API_URL } = useAxios();

// SEO
useHead(() => {
  if (!product.value) return {};

  const schema = createProductSchema(product.value);
  return {
    title: product.value?.name,
    meta: [
      {
        name: "description",
        content:
          product.value?.short_description?.replace(/<[^>]*>/g, "") || "",
      },
      {
        property: "og:title",
        content: product.value?.name,
      },
      {
        property: "og:description",
        content:
          product.value?.short_description?.replace(/<[^>]*>/g, "") || "",
      },
      {
        property: "og:image",
        content: assets(product.value?.main_image_path),
      },
      {
        property: "og:url",
        content: API_URL + route.fullPath,
      },
      {
        property: "og:type",
        content: "product",
      },
      {
        property: "twitter:title",
        content: product.value?.name,
      },
      {
        property: "twitter:description",
        content:
          product.value?.short_description?.replace(/<[^>]*>/g, "") || "",
      },
      {
        property: "twitter:image",
        content: assets(product.value?.main_image_path),
      },
      {
        property: "twitter:url",
        content: API_URL + route.fullPath,
      },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(schema),
      },
    ],
  };
});

// Methods
const generateQRCode = () => {
  if (!import.meta.client) return;
  const qr = QRCode(0, "L");
  qr.addData(route.fullPath);
  qr.make();
  qrCodeDataUrl.value = qr.createDataURL();
};

const showMultiple = () => {
  if (!product.value?.product_images) return;
  imgs.value = product.value.product_images.map((item) => assets(item.name));
  indexRef.value = activeIndex.value;
  visible.value = true;
};

const handleHide = () => {
  visible.value = false;
};

const changeMainImage = (imageName, index) => {
  mainImage.value = imageName;
  activeIndex.value = index;
};

const getCategoryMainLinkTop = (name) => {
  const parts = name.split("/");
  return "/" + parts[0];
};

const getCategoryMainLinkTopName = (name) => {
  const parts = name.split("/");
  return parts[0].toUpperCase();
};

// Computed
const imgs = computed(
  () => product.value?.product_images?.map((item) => assets(item.name)) || []
);

// Watch route changes for navigation
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId !== oldId) {
      await refreshNuxtData(`product-${newId}`);
    }
  }
);

// Watch for product data changes
watch(
  () => product.value,
  (newProduct) => {
    if (newProduct?.product_images?.length > 0) {
      mainImage.value = newProduct.product_images[0].name;
    }
    if (import.meta.client) {
      generateQRCode();
    }
  },
  { immediate: true }
);

// Client-side only operations
onMounted(() => {
  if (import.meta.client) {
    generateQRCode();
  }
});
</script>

<style scoped>
.product-error-state {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.error-title {
  color: #333;
  font-weight: 600;
}

.error-message {
  font-size: 1.1rem;
}

.error-reasons {
  list-style: none;
  padding: 0;
}

.error-reasons li {
  padding: 8px 0;
  color: #666;
  border-bottom: 1px solid #eee;
}

.error-reasons li:last-child {
  border-bottom: none;
}

.error-reasons li:before {
  content: "•";
  color: #dc3545;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.error-actions {
  margin: 2rem 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #c02434;
  border-color: #c02434;
}

.btn-primary:hover {
  background-color: #304296;
  border-color: #304296;
}

.btn-outline-primary {
  color: #c02434;
  border-color: #c02434;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #304296;
  border-color: #304296;
}

@media (max-width: 768px) {
  .error-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .error-actions .btn {
    width: 100%;
  }

  .error-message {
    font-size: 1rem;
  }
}

/* Shimmer animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
}

/* Shimmer placeholders */
.product-gallery-shimmer {
  width: 100%;
}

.main-image-shimmer {
  width: 100%;
  height: 350px;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.thumbnail-container {
  display: flex;
  gap: 0.5rem;
}

.thumbnail-shimmer {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}

.product-details-shimmer {
  padding: 1rem;
}

.title-shimmer {
  height: 2rem;
  width: 80%;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.text-shimmer {
  height: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.button-shimmer {
  height: 3rem;
  width: 200px;
  border-radius: 4px;
}

.tabs-shimmer {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.tab-shimmer {
  height: 2rem;
  width: 120px;
  border-radius: 4px;
}
</style>

<style scoped>
.product-item {
  margin-bottom: 20px;
}
.short_description p strong {
  font-weight: 300 !important;
}

.qr_section {
  position: absolute;
  right: 30px;
  top: 40px;
}

.product-details .short_description {
  width: 80%;
}

.product-details-sheffield .btn-cart {
  color: #ffffff !important;
}

.product-details-sheffield .btn-cart:hover {
  color: #ffffff !important;
  background-color: #304296 !important;
  border-color: #304296 !important;
}

.product-details-sheffield .btn-cart:focus {
  color: #ffffff !important;
  background-color: #c02434 !important;
  border-color: #c02434 !important;
}

.product-details-sheffield .btn-cart:hover span,
.product-details-sheffield .btn-cart:focus span {
  color: #ffffff !important;
}

@media only screen and (max-width: 768px) {
  .header {
    font-size: 18px;
  }
  .mobile-description {
    display: block;
  }
  .nav-item {
    font-size: 68px;
  }
  .breadcrumb-item {
    font-size: 12px;
  }
  .nav-link {
    font-size: 1rem;
  }
  .product-details-tab .nav.nav-pills .nav-link {
    font-size: 1.3rem;
    font-weight: 500;
  }
}
</style>
