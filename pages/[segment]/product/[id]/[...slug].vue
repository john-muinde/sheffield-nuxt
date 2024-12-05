<!-- eslint-disable no-console -->
<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container d-flex align-items-center">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/"> HOME </router-link>
          </li>

          <li
            v-if="
              product.categories_json &&
              product.categories_json.length > 0 &&
              product.categories_json[0].parent_name_with_slashes
            "
            class="breadcrumb-item"
          >
            <router-link
              :to="
                getCategoryMainLinkTop(
                  product.categories_json[0].parent_name_with_slashes
                )
              "
            >
              {{
                getCategoryMainLinkTopName(
                  product.categories_json[0].parent_name_with_slashes
                )
              }}
            </router-link>
          </li>

          <li class="breadcrumb-item">
            <router-link
              v-for="category in product.categories_json"
              :key="category.id"
              :to="
                getCategoryLink(
                  category.id,
                  category.name,
                  1,
                  product.categories_json[0].parent_name_with_slashes
                )
              "
            >
              {{ category.name }}
            </router-link>
          </li>

          <li class="breadcrumb-item active" aria-current="page">
            {{ product.name }}
          </li>
        </ol>
      </div>
    </nav>
    <div class="page-content mt-0">
      <div class="container">
        <div class="product-details-top">
          <div class="row">
            <div class="col-md-5">
              <div class="product-gallery">
                <figure class="product-main-image">
                  <NuxtImg
                    id="product-zoom"
                    :src="assets(mainImage)"
                    :alt="product.name"
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
                    @click="showMultiple"
                  >
                    <i class="icon-arrows"></i>
                  </a>
                </figure>
                <!-- End .product-main-image -->

                <div>
                  <!--  <button @click="showSingle">Show single picture.</button> -->
                  <!--  <button @click="showMultiple">Show a group of pictures.</button> -->

                  <!-- all props & events -->
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
                    v-for="(image, index) in product.product_images"
                    :key="image.id"
                    :class="[
                      'product-gallery-item',
                      { active: index === activeIndex },
                    ]"
                    :data-image="assets(image.name)"
                    :data-zoom-image="assets(image.name)"
                    @mouseover="changeMainImage(image.name, index)"
                  >
                    <img :src="assets(image.name)" :alt="product.name" />
                  </a>
                </div>
                <!-- End .product-image-gallery -->
              </div>
              <!-- End .product-gallery -->
            </div>
            <!-- End .col-lg-7 -->

            <div class="col-md-7">
              <div class="product-details">
                <h3 class="header text-primary" style="">
                  {{ product.name }}
                </h3>
                <div
                  class="short_description"
                  v-html="product.short_description"
                ></div>
                <p class="">
                  <span>Brand : </span>

                  {{ product.brand_name }}
                </p>
                <span>Category : </span>

                <router-link
                  v-for="category in product.categories_json"
                  :key="category.id"
                  style="font-weight: 500"
                  :to="
                    getCategoryLink(
                      category.id,
                      category.name,
                      1,
                      product.categories_json[0].parent_name_with_slashes
                    )
                  "
                >
                  {{ category.name }}
                </router-link>

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
                    :class="{ 'disabled cursor-not-allowed': !product.id }"
                    :disabled="!product.id"
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
                        id="product-desc-link"
                        class="nav-link active"
                        data-toggle="tab"
                        href="#product-desc-tab"
                        role="tab"
                        aria-controls="product-desc-tab"
                        aria-selected="false"
                        >Description</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        id="product-info-link"
                        class="nav-link"
                        data-toggle="tab"
                        href="#product-info-tab"
                        role="tab"
                        aria-controls="product-info-tab"
                        aria-selected="false"
                        >Technical Specifications</a
                      >
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div
                      id="product-desc-tab"
                      class="tab-pane fade active show"
                      role="tabpanel"
                      aria-labelledby="product-desc-link"
                    >
                      <div class="product-desc-content">
                        <div v-html="product.description"></div>
                      </div>
                      <!-- End .product-desc-content -->
                    </div>
                    <!-- .End .tab-pane -->
                    <div
                      id="product-info-tab"
                      class="tab-pane fade"
                      role="tabpanel"
                      aria-labelledby="product-info-link"
                    >
                      <div class="product-desc-content">
                        <div v-html="product.technical_specification"></div>
                      </div>
                      <!-- End .product-desc-content -->
                    </div>
                    <!-- .End .tab-pane -->
                    <!-- .End .tab-pane -->
                  </div>
                  <!-- End .tab-content -->
                </div>
                <!-- End .product-details-footer -->
              </div>
              <!-- End .product-details -->
            </div>
            <!-- End .col-md-6 -->
          </div>
          <!-- End .row -->
        </div>
        <!-- End .product-details-top -->
      </div>
      <!-- End .container -->
    </div>
    <!-- End .page-content -->
  </main>
</template>

<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import QRCode from "qrcode-generator";

const route = useRoute();
const { api } = useAxios();
const title = ref("");

const product = ref([]);
const product_id = ref(route.params.id ? parseInt(route.params.id) : 1);

const formatTextHeader = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

useHead({
  title: title,
  meta: [
    {
      name: "description",
      content: "Product details",
    },
  ],
});

// Fetch products based on the current page
const fetchProduct = async () => {
  try {
    const response = await api.get("/api/get-product", {
      params: {
        product_id: product_id.value,
      },
    });
    product.value = response.data.data;

    title.value = formatTextHeader(product.value.name);
  } catch (error) {
    console.error(error);
  }
};

const imgs = ref([]);

const showMultiple = async () => {
  imgs.value = product.value.product_images.map((item) => assets(item.name));
  show();
};

const visible = ref(false);
const indexRef = ref(0);
const show = () => {
  indexRef.value = 2;
  visible.value = true;
};

const handleHide = () => {
  visible.value = false;
};

const getCategoryMainLinkTop = (name) => {
  let parts = name.split("/");
  parts = parts[0];
  return "/" + parts;
};

const getCategoryMainLinkTopName = (name) => {
  let parts = name.split("/");
  parts = parts[0];
  parts = parts.toUpperCase();
  return parts;
};

const qrCodeDataUrl = ref(null);
const currentUrl = ref("");

const generateQRCode = (currentUrl) => {
  // Clear previous QR code
  qrCodeDataUrl.value = null;

  // Generate new QR code
  const typeNumber = 0;
  const errorCorrectionLevel = "L";
  const qr = QRCode(typeNumber, errorCorrectionLevel);
  qr.addData(currentUrl.value);
  qr.make();

  // Set QR code data URL
  qrCodeDataUrl.value = qr.createDataURL();
};

// Initial fetch of products
onMounted(() => {
  fetchProduct();
  currentUrl.value = window.location.href;
  generateQRCode(currentUrl);
});

const mainImage = ref("");
const activeIndex = ref(0);

const changeMainImage = (imageName, index) => {
  mainImage.value = imageName;
  activeIndex.value = index;
};

watch(product, () => {
  if (product.value.product_images.length > 0) {
    mainImage.value = product.value.product_images[0].name;
  }
});

watchEffect(() => {
  const params = route.params; // Access the route parameters

  if (params.id !== "" && product_id.value !== params.id) {
    product_id.value = params.id ? parseInt(params.id) : 1;

    fetchProduct();
    generateQRCode(currentUrl);
  }
});
</script>

<style>
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

.swal2-popup.swal2-toast .swal2-title {
  font-size: 1.5rem !important;
}

.swal2-container.swal2-bottom-end > .swal2-popup {
  background-color: #c02434;
}

.swal2-popup.swal2-toast .swal2-title {
  color: #ffffff;
}

@media only screen and (max-width: 768px) {
  .header {
    font-size: 18px;
  }
  .mobile-description {
    display: block;
  }
  a.nav-item {
    font-size: 68px;
  }

  .breadcrumb-item {
    font-size: 12px;
  }
  .nav-link > a {
    font-size: 1rem;
  }

  .product-details-tab .nav.nav-pills .nav-link {
    font-size: 1.3rem;
    font-weight: 500;
  }
}
</style>
