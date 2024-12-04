<template>
  <div v-if="loading" class="promotion-skeleton">
    <div class="skeleton-loader">
      <div class="skeleton-image"></div>
      <div class="skeleton-products">
        <div
          v-for="n in 4"
          :key="n"
          class="skeleton-product-card"
        ></div>
      </div>
    </div>
  </div>

  <div v-else-if="!promotionProducts.length" class="container-fluid">
    <div class="alert alert-info text-center">
      No promotion products available
    </div>
    </div>

  <div
    v-else-if="promotionProducts.length"
    class="container-fluid promotion-section"
  >
    <div class="row align-items-center">
      <!-- Promo Image -->
      <div class="col-xl-3 col-lg-4 col-md-12 mb-md-4">
        <div class="promo-image-wrapper">
          <img
            src="/assets/images/events/november-promo.png"
            alt="Promotion Banner"
            class="img-fluid promo-image"
          />
        </div>
      </div>

      <!-- Products Section -->
      <div class="col-xl-9 col-lg-8 col-md-12">
        <!-- Promo Header -->
        <div class="promo-header d-flex justify-content-between align-items-center">
          <div class="promo-details">
            <h2 class="promo-title">
              Pizzeria November Promotions
            </h2>
            <p class="promo-date text-muted">
              Valid 1st - 30th November, 2024
            </p>
          </div>

          <router-link
            to="/promotional-solutions/371/nov-1-nov-31-2024-promotions"
            class="btn btn-outline-primary d-none d-lg-block"
          >
            View All Products
            <i class="icon-arrow-right ml-2"></i>
          </router-link>
        </div>

        <!-- Products Carousel -->
        <swiper
          :slides-per-view="swiperConfig.slidesPerView"
          :space-between="swiperConfig.spaceBetween"
          :navigation="swiperConfig.navigation"
          :modules="swiperConfig.modules"
          :pagination="swiperConfig.pagination"
          :autoplay="swiperConfig.autoplay"
        >
          <swiper-slide
            v-for="product in promotionProducts"
            :key="product.id"
          >
            <ProductCard
              :product="product"
              @click="handleProductClick(product)"
            />
          </swiper-slide>
        </swiper>

        <!-- Mobile View All Button -->
        <div class="d-md-none text-center mt-4">
          <router-link
            to="/promotional-solutions/371/nov-1-nov-31-2024-promotions"
            class="btn btn-block btn-primary"
          >
            View All Products
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// PromotionSection.vue
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from 'axios';

// Performance and error handling utility
const createCancelToken = () => {
  const CancelToken = axios.CancelToken;
  return CancelToken.source();
};

export default {
  name: 'PromotionSection',
  components: {
    Swiper,
    SwiperSlide,
    ProductCard: () => import('@/Components/ProductCard.vue'),
  },
  props: {
    initialCategoryId: {
      type: Number,
      default: 371,
    },
  },
  setup(props) {
    // Reactive state management
    const promotionProducts = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const cancelTokenSource = ref(null);

    // Responsive slides calculation
    const calculateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width < 576) return 1;
      if (width < 768) return 2;
      if (width < 992) return 2;
      if (width < 1200) return 3;
      return 4;
    };

    const slidesPerView = ref(calculateSlidesPerView());

    // Resize handling
    const handleResize = () => {
      slidesPerView.value = calculateSlidesPerView();
    };

    // Product fetching logic with advanced error handling
    const fetchPromotionProducts = async (categoryId) => {
      // Cancel any existing request
      if (cancelTokenSource.value) {
        cancelTokenSource.value.cancel('New request initiated');
      }

      // Create new cancel token
      cancelTokenSource.value = createCancelToken();

      loading.value = true;
      error.value = null;

      try {
        const response = await axios.get('/api/get-products', {
          params: {
            category_id: categoryId,
            per_page: 30,
            with: ['images', 'category'],
          },
          cancelToken: cancelTokenSource.value.token,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });

        // Advanced product filtering and transformation
        promotionProducts.value = (response.data.products?.data || [])
          .map(transformProduct)
          .filter(product => isValidProduct(product))
          .slice(0, 20); // Limit to 20 products for performance
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          error.value = {
            message: err.response?.data?.message || 'Failed to fetch products',
            code: err.response?.status,
          };
          console.error('Promotion fetch error:', err);
        }
      } finally {
        loading.value = false;
      }
    };

    // Product transformation utility
    const transformProduct = (product) => {
      const defaultImage = '/assets/images/default-product.png';

      return {
        ...product,
        displayPrice: calculateDisplayPrice(product),
        discountPercentage: calculateDiscount(product),
        mainImage: product.main_image_path
          ? `/storage/${product.main_image_path}`
          : defaultImage,
      };
    };

    // Price calculation utilities
    const calculateDisplayPrice = (product) => {
      const retailPrice = parseFloat(product.retail_price) || 0;
      const costPrice = parseFloat(product.cost_price) || retailPrice;
      return retailPrice > 0 ? retailPrice : costPrice;
    };

    const calculateDiscount = (product) => {
      const retailPrice = parseFloat(product.retail_price) || 0;
      const costPrice = parseFloat(product.cost_price) || 0;

      if (retailPrice > 0 && costPrice > 0) {
        return Math.round(((costPrice - retailPrice) / costPrice) * 100);
      }
      return 0;
    };

    // Product validation
    const isValidProduct = (product) => {
      const displayPrice = calculateDisplayPrice(product);
      return displayPrice > 0 && product.name && product.main_image_path;
    };

    // Lifecycle hooks
    onMounted(() => {
      window.addEventListener('resize', handleResize);
      fetchPromotionProducts(props.initialCategoryId);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);

      // Cancel any ongoing requests
      if (cancelTokenSource.value) {
        cancelTokenSource.value.cancel('Component unmounted');
      }
    });

    // Performance optimization: Memoized computed properties
    const swiperConfig = computed(() => ({
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: slidesPerView.value,
      spaceBetween: 20,
      navigation: true,
      pagination: {
        clickable: true,
        dynamicBullets: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    }));

    return {
      promotionProducts,
      loading,
      error,
      swiperConfig,
      slidesPerView,
    };
  },
  methods: {
    // Additional methods like handling product clicks, tracking, etc.
    handleProductClick(product) {
      this.$emit('product-selected', product);
      // Optional: Track product view
      this.trackProductView(product);
    },

    trackProductView(product) {
      // Implement analytics or tracking logic
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'promotion_product_view',
          product_id: product.id,
          product_name: product.name,
          product_category: product.category_name,
        });
      } catch (error) {
        console.error('Tracking error:', error);
      }
    },
  },
};
</script>

<style scoped>
.promotion-skeleton {
  background-color: #f4f4f4;
  animation: pulse 1.5s infinite;
}

.skeleton-loader {
  display: flex;
  padding: 20px;
}

.skeleton-image, .skeleton-product-card {
  background-color: #e0e0e0;
  border-radius: 8px;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>

