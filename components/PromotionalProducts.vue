<template>
  <div
    v-if="promotionData?.products?.length && props.showProducts"
    class="container-fluid"
  >
    <div
      class="d-flex align-items-center mt-1 row"
      style="min-height: 500px !important"
    >
      <div
        class="image-container col-xl-3 col-lg-4 col-md-12 mb-md-4"
        style="height: 100%"
      >
        <div class="promo-image-wrapper">
          <img
            src="/assets/images/events/december-promo.jpg"
            alt="Promotion Banner"
            class="img img-fluid contain promo-image"
            style="height: 100%; width: 90%"
          />
        </div>
      </div>

      <!-- Products Section -->
      <div class="col-xl-9 col-lg-8 col-md-12" style="height: 100%">
        <!-- Animated Date Banner -->
        <div class="row d-flex justify-content-between">
          <div
            class="bg-danger d-flex justify-content-between text-uppercase fw-bold p-1 col-xl-9 pr-2"
            style="
              color: white;
              border-radius: 4px;
              position: relative;
              overflow: hidden;
              font-weight: bold;
            "
          >
            <span> Pizzeria NOVEMBER PROMOTIONS </span>
            <span> VALID 1ST - 30TH NOVEMBER, 2024 </span>
          </div>
          <div
            class="view-all-slide align-items-center justify-content-center h-100 d-none d-lg-flex col-3"
          >
            <NuxtLink
              to="/promotional-solutions/373/nov-1-nov-31-2024-promotions"
              class="btn btn-dark btn-md view-all-button"
            >
              View All Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="ms-2"
                width="16"
                height="16"
              >
                <path
                  d="M12 2L10.59 3.41 17.17 10H2v2h15.17l-6.58 6.59L12 22l10-10z"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <hr class="divider" />

        <h3 class="text-start mb-4" style="font-style: italic">
          Pizzeria Solutions
        </h3>

        <!-- Enhanced Swiper Carousel -->
        <swiper
          :slides-per-view="slidesPerView"
          :space-between="20"
          :navigation="true"
          :modules="[Navigation, Pagination, Autoplay]"
          :pagination="{
            clickable: true,
            dynamicBullets: true,
          }"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          :slides-per-group="slidesPerView"
          class="products-container"
          @swiper="onSwiper"
        >
          <swiper-slide
            v-for="product in promotionData.products"
            :key="product.id"
          >
            <ProductCard :product="product" />
          </swiper-slide>
        </swiper>
        <!-- Mobile View All Button -->
        <div class="d-md-none text-center mt-4">
          <NuxtLink
            to="/promotional-solutions/371/nov-1-nov-31-2024-promotions"
            class="btn btn-dark btn-block"
          >
            View All Products
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { globalState } from "~/utils/globalState"; // Assuming you're using the global state approach
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const props = defineProps({
  showProducts: {
    type: Boolean,
    default: true,
  },
});

const swiperInstance = ref(null);
const promotionId = ref(373);

const convertToNumber = (value) => {
  let num = Number(value);
  return isNaN(num) ? 0 : num;
};
const { api } = useAxios();
const { data: promotionData } = await useAsyncData(
  "promotion-products",
  async () => {
    const { data } = await api.get("/api/get-products", {
      params: {
        category_id: promotionId.value,
        per_page: 30,
      },
    });

    if (!data.products) {
      return { products: [] };
    }

    const processedProducts = data.products.data
      ?.map((product) => {
        if (convertToNumber(product.cost_price) <= 0) {
          product.cost_price = convertToNumber(product.retail_price);
        }

        if (convertToNumber(product.cost_price) <= 0) {
          return null;
        }

        return {
          ...product,
          cost_price: convertToNumber(product.cost_price),
          retail_price: convertToNumber(product.retail_price),
        };
      })
      .filter((product) => product !== null);

    globalState.promotions = processedProducts;

    return {
      products: processedProducts,
    };
  },
  {
    default: () => ({ products: [] }),
  }
);

const slidesPerView = computed(() => {
  const width = window.innerWidth;
  if (width < 576) return 1;
  if (width < 768) return 2;
  if (width < 992) return 2;
  if (width < 1200) return 3;
  return 4;
});

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const handleResize = () => {
  if (swiperInstance.value) {
    swiperInstance.value.params.slidesPerView = slidesPerView.value;
    swiperInstance.value.update();
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
