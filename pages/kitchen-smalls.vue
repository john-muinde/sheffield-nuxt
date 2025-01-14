<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <!-- Hero Section -->
              <section id="heroing" class="">
                <main
                  class="relative w-[90%] mx-auto flex flex-col md:flex-row items-center gap-12"
                >
                  <div class="w-full md:w-1/2">
                    <span
                      class="uppercase tracking-wider text-[#717171] text-base"
                      >Discover</span
                    >
                    <h1
                      class="capitalize tracking-wide font-roboto font-black text-[clamp(2.5rem,3.25rem+0.75vw,4rem)] bg-gradient-to-r from-[#e82a3e] to-black bg-clip-text text-transparent leading-none"
                    >
                      Operating Supplies & Equipment
                    </h1>
                    <hr
                      class="block bg-[#e82a3e] h-1 w-24 border-0 my-6 mx-0"
                    />
                    <p class="text-[#999999] leading-relaxed">
                      Premium quality Operating Supplies & Equipment for hotels,
                      restaurants, and hospitality businesses. Discover our
                      extensive range of dinnerware, drinkware, cutlery, and
                      more.
                    </p>
                    <a
                      href="#"
                      class="inline-block uppercase text-[#717171] font-medium bg-white rounded-full border-2 border-[#c2c2c2] mt-8 px-7 py-2.5 transition-colors hover:border-[#e82a3e] hover:text-[#e82a3e]"
                    >
                      View All Products
                    </a>
                  </div>

                  <div class="w-full md:w-[55%]">
                    <swiper
                      :modules="[
                        SwiperEffectCoverflow,
                        SwiperKeyboard,
                        SwiperMousewheel,
                        SwiperPagination,
                        SwiperAutoplay,
                      ]"
                      :effect="'coverflow'"
                      :grab-cursor="true"
                      :centered-slides="true"
                      :loop="true"
                      :coverflow-effect="{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 3,
                        slideShadows: true,
                      }"
                      :keyboard="{ enabled: true }"
                      :mousewheel="false"
                      :autoplay="false"
                      :pagination="{ clickable: true }"
                      :breakpoints="{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                        1560: { slidesPerView: 3 },
                      }"
                      class="w-full h-[500px]"
                    >
                      <swiper-slide
                        v-for="(slide, index) in categories"
                        :key="index"
                        class="h-full rounded-lg overflow-hidden"
                      >
                        <div
                          class="relative h-full w-full flex flex-col justify-end pb-2"
                          :style="{
                            background: `linear-gradient(to top, #0f2027, #203a4300, #2c536400),
                    url('${slide.image}') no-repeat 50% 50%/cover`,
                          }"
                        >
                          <div
                            class="p-6 bg-gradient-to-t from-black/70 to-transparent"
                          >
                            <h2
                              class="text-white font-roboto font-normal text-2xl leading-relaxed mb-2.5 uppercase"
                            >
                              {{ slide.title }}
                            </h2>
                            <p
                              class="text-[#dadada] font-roboto font-light leading-relaxed text-xl line-clamp-4"
                            >
                              {{ slide.description }}
                            </p>
                            <a
                              href="#"
                              class="inline-block mt-5 py-1 px-7 text-md bg-white rounded-full transition-colors hover:text-[#e82a3e]"
                            >
                              View Products
                            </a>
                          </div>
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>

                  <img
                    src="/assets/images/ose/ose-background.webp"
                    alt=""
                    class="fixed -top-16 -left-48 -z-10 opacity-0 md:opacity-[0.06]"
                  />
                </main>
              </section>

              <!-- Categories Section -->
              <section class="py-16">
                <div class="container mx-auto px-4">
                  <div class="text-center mb-4">
                    <span class="uppercase tracking-wider text-gray-600"
                      >Browse</span
                    >
                    <h2
                      class="font-roboto font-black text-4xl bg-gradient-to-r from-[#e82a3e] to-black bg-clip-text text-transparent mt-2"
                    >
                      Our Categories
                    </h2>
                    <hr class="w-24 h-1 bg-[#e82a3e] border-0 mx-auto my-6" />
                  </div>

                  <div
                    class="grid max-[518px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-full mx-auto"
                  >
                    <div
                      v-for="category in categories"
                      :key="category.title"
                      class="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 ease-out"
                    >
                      <div class="aspect-[4/5] relative">
                        <!-- Background Image with Overlay -->
                        <img
                          :src="category.image"
                          :alt="category.title"
                          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div
                          class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                        ></div>

                        <!-- Content Container -->
                        <div
                          class="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500"
                        >
                          <!-- Category Title -->
                          <div
                            class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                          >
                            <h3
                              class="text-4xl font-bold text-white mb-2 flex items-center gap-2 cursor-pointer"
                            >
                              <span>{{ category.title }}</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-0 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </h3>
                          </div>

                          <!-- Subcategories -->
                          <div
                            class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100"
                          >
                            <ul class="space-y-2 mb-4">
                              <li
                                v-for="sub in category.subcategories.slice(
                                  0,
                                  3
                                )"
                                :key="sub"
                                class="flex items-center text-white/90 text-xl"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-8 w-8 mr-2 text-[#e82a3e]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {{ sub }}
                              </li>
                            </ul>
                          </div>

                          <!-- Button -->
                          <div
                            class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200"
                          >
                            <a
                              href="#"
                              class="inline-flex items-center gap-2 bg-white/95 hover:bg-[#e82a3e] text-[#e82a3e] hover:text-white px-5 py-2.5 rounded-full text-md font-medium transition-all duration-300 group-hover:shadow-lg"
                            >
                              Explore Collection
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Featured Products Section -->
              <section class="py-4 relative overflow-hidden">
                <div class="absolute inset-0 opacity-5">
                  <div class="absolute inset-0 bg-pattern-grid"></div>
                </div>

                <div class="container mx-auto px-4">
                  <!-- Section Header -->
                  <div class="text-center">
                    <span class="uppercase tracking-wider text-gray-600"
                      >Featured</span
                    >
                    <h2
                      class="font-roboto font-black text-4xl bg-gradient-to-r from-[#e82a3e] to-black bg-clip-text text-transparent mt-2"
                    >
                      Our Premium Collections
                    </h2>
                    <hr class="w-24 h-1 bg-[#e82a3e] border-0 mx-auto my-6" />
                  </div>

                  <!-- Products Swiper -->
                  <div class="w-full md:w-[100%]">
                    <swiper
                      :modules="[
                        SwiperEffectCoverflow,
                        SwiperKeyboard,
                        SwiperMousewheel,
                        SwiperPagination,
                        SwiperAutoplay,
                      ]"
                      :effect="'coverflow'"
                      :grab-cursor="true"
                      :centered-slides="true"
                      :loop="true"
                      :coverflow-effect="{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 3,
                        slideShadows: true,
                      }"
                      :keyboard="{ enabled: true }"
                      :mousewheel="false"
                      :autoplay="{ delay: 2000, disableOnInteraction: true }"
                      :pagination="{ clickable: true }"
                      :breakpoints="{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1560: { slidesPerView: 5 },
                      }"
                      class="w-full h-[500px]"
                    >
                      <swiper-slide
                        v-for="product in featuredProducts"
                        :key="product.id"
                      >
                        <div
                          class="group relative h-[500px] rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                          <!-- Image Container -->
                          <div
                            class="absolute inset-0 rounded-2xl overflow-hidden"
                          >
                            <img
                              :src="product.image"
                              :alt="product.name"
                              class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                            <!-- Gradient Overlay -->
                            <div
                              class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"
                            ></div>
                          </div>

                          <!-- Content Wrapper -->
                          <div
                            class="absolute inset-0 p-8 flex flex-col justify-end"
                          >
                            <!-- Category Tag -->
                            <span
                              class="inline-block px-4 py-1.5 bg-white/90 text-[#e82a3e] text-md font-medium rounded-full mb-4 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                            >
                              {{ product.category }}
                            </span>

                            <!-- Title -->
                            <h3
                              class="text-3xl font-bold text-white mb-4 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                            >
                              {{ product.name }}
                            </h3>

                            <!-- Features -->
                            <div
                              class="space-y-3 mb-6 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                            >
                              <div
                                v-for="feature in product.features"
                                :key="feature"
                                class="flex items-center gap-2"
                              >
                                <span
                                  class="flex-shrink-0 w-8 h-8 rounded-full bg-[#e82a3e] flex items-center justify-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </span>
                                <span class="text-white/90">{{ feature }}</span>
                              </div>
                            </div>

                            <!-- Action Buttons -->
                            <div
                              class="flex gap-4 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200"
                            >
                              <a
                                href="#"
                                class="flex-1 bg-white/95 hover:bg-[#e82a3e] text-[#e82a3e] hover:text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 group/btn"
                              >
                                View Details
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5 transform transition-transform group-hover/btn:translate-x-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </a>
                              <button
                                class="w-12 h-12 flex-shrink-0 rounded-full bg-white/20 hover:bg-white/95 text-white group flex items-center justify-center transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-6 w-6 group-hover:text-[#e82a3e] transition-colors"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
              </section>

              <!-- Brands Section -->
              <section
                class="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
              >
                <div class="container mx-auto px-4 flex flex-col brands">
                  <!-- Section Header -->
                  <div class="text-center mb-4">
                    <span class="uppercase tracking-wider text-gray-600"
                      >Partners</span
                    >
                    <h2
                      class="font-roboto font-black text-4xl bg-gradient-to-r from-[#e82a3e] to-black bg-clip-text text-transparent mt-2"
                    >
                      Premium Brands
                    </h2>
                    <hr class="w-24 h-1 bg-[#e82a3e] border-0 mx-auto my-6" />
                  </div>

                  <swiper
                    :modules="[
                      SwiperKeyboard,
                      SwiperMousewheel,
                      SwiperAutoplay,
                      SwiperFreeMode,
                    ]"
                    :slides-per-view="10"
                    :space-between="30"
                    :grab-cursor="true"
                    :centered-slides="true"
                    :free-mode="true"
                    :loop="true"
                    :speed="6000"
                    :coverflow-effect="{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 3,
                      slideShadows: true,
                    }"
                    :keyboard="{ enabled: true }"
                    :mousewheel="{ thresholdDelta: 70 }"
                    :autoplay="{
                      delay: 0,
                      disableOnInteraction: false,
                      reverseDirection: true,
                    }"
                  >
                    <swiper-slide
                      v-for="brand in duplicatedBrands"
                      :key="`${brand.name}-${brand.id}`"
                      class="!w-auto"
                    >
                      <div class="relative group cursor-pointer">
                        <div class="w-32 h-32 flex items-center justify-center">
                          <img
                            :src="brand.logo"
                            class="w-full h-full object-contain text-gray-400 group-hover:text-[#e82a3e] transition-colors duration-300"
                          />
                        </div>
                        <span
                          class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-2 transition-all duration-300"
                        >
                          {{ brand.name }}
                        </span>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  EffectCoverflow,
  Keyboard,
  Mousewheel,
  Pagination,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { computed } from "vue";
import { ref } from "vue";

useHead({
  title: "Operating Supplies & Equipment",
  meta: [
    {
      name: "description",
      content:
        "Premium quality Operating Supplies & Equipment for hotels, restaurants, and hospitality businesses. Discover our extensive range of dinnerware, drinkware, cutlery, and more.",
    },
  ],
});

const SwiperEffectCoverflow = EffectCoverflow;
const SwiperKeyboard = Keyboard;
const SwiperMousewheel = Mousewheel;
const SwiperPagination = Pagination;
const SwiperAutoplay = Autoplay;
const SwiperFreeMode = FreeMode;

// Categories data
const categories = [
  {
    title: "Dinnerware",
    subcategories: [
      "Dinner Plates",
      "Side Plates",
      "Bowls",
      "Serving Platters",
    ],
    description:
      "Elegant plates, bowls, chargers, and serving dishes. Premium quality dinnerware for sophisticated dining experiences.",
    image: "/assets/images/ose/dinnerware.webp",
  },
  {
    title: "Drinkware",
    subcategories: ["Coffee Mugs", "Tea Cups", "Wine Glasses", "Water Glasses"],
    description:
      "Premium mugs, cups, wine glasses, and pitchers. Complete beverage service solutions for every occasion.",
    image: "/assets/images/ose/drinkware.webp",
  },
  {
    title: "Cutlery",
    subcategories: [
      "Table Covers",
      "Dessert Covers",
      "Tea and Coffee",
      "Steak",
    ],
    description:
      "Professional-grade table covers, dessert covers, and specialized cutlery sets for fine dining establishments.",
    image: "/assets/images/ose/cutlery.webp",
  },
  {
    title: "Bakeware",
    subcategories: [
      "Casserole Dishes",
      "Pie Dishes",
      "Measuring Cups",
      "Teapots",
    ],
    description:
      "Durable casserole dishes, pie dishes, measuring cups, and teapots. High-quality bakeware for professional kitchens.",
    image: "/assets/images/ose/bakeware.webp",
  },
  {
    title: "Specialty Buffetware",
    subcategories: ["Serving Bowls", "Trays", "Soup Tureens", "Gravy Boats"],
    description:
      "Comprehensive buffet solutions including serving bowls, trays, soup tureens, and gravy boats for professional catering.",
    image: "/assets/images/ose/special-buffetware.webp",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Luxe Bone China Set",
    category: "Dinnerware",
    features: [
      "28-Piece Premium Set",
      "Microwave & Dishwasher Safe",
      "Chip-Resistant Design",
    ],
    image: "/assets/images/ose/luxe-bona-china-set.webp",
  },
  {
    id: 2,
    name: "Crystal Wine Collection",
    category: "Glassware",
    features: [
      "Lead-free Crystal Glass",
      "Set of 6 Each Type",
      "Break-Resistant Stems",
    ],
    image: "/assets/images/ose/crystal-wine-collection.webp",
  },
  {
    id: 3,
    name: "Professional Buffet System",
    category: "Buffetware",
    features: [
      "Temperature Control",
      "LED Display Panel",
      "Easy-Clean Surface",
    ],
    image: "/assets/images/ose/professional-buffet-system.webp",
  },
  {
    id: 4,
    name: "Elite Cutlery Set",
    category: "Flatware",
    features: [
      "18/10 Stainless Steel",
      "Mirror Polish Finish",
      "Ergonomic Design",
    ],
    image: "/assets/images/ose/elite-cutlery-set.webp",
  },
  {
    id: 5,
    name: "Modular Coffee Station",
    category: "Beverage Service",
    features: [
      "Built-in Water Filter",
      "Digital Controls",
      "Multiple Brew Options",
    ],
    image: "/assets/images/ose/modular-coffee-station.webp",
  },
  {
    id: 6,
    name: "Premium Chafer Set",
    category: "Buffetware",
    features: ["Roll-top Design", "Smart Fuel Gauge", "Stainless Construction"],
    image: "/assets/images/ose/premium-chafer-set.webp",
  },
  {
    id: 7,
    name: "Signature Bar Set",
    category: "Barware",
    features: [
      "Complete Mixology Kit",
      "Premium Steel Tools",
      "Presentation Case",
    ],
    image: "/assets/images/ose/signature-bar-set.webp",
  },
  {
    id: 8,
    name: "Banquet Table Collection",
    category: "Furniture",
    features: ["Quick-Fold Design", "Reinforced Frame", "Stain-Resistant Top"],
    image: "/assets/images/ose/banquet-table-collection.webp",
  },
  {
    id: 9,
    name: "Display Cooking Station",
    category: "Kitchen Equipment",
    features: ["Induction Technology", "Digital Controls", "Safety Features"],
    image: "/assets/images/ose/display-cooking-station.webp",
  },
  {
    id: 10,
    name: "Porcelain Serving Set",
    category: "Serveware",
    features: ["Heat Retention Design", "Stackable Pieces", "Chip-Resistant"],
    image: "/assets/images/ose/porcelain-serving-set.webp",
  },
];

const brands = ref([
  { name: "Continental", logo: "/assets/images/ose/brands/continental.png" },
  { name: "Sunnex", logo: "/assets/images/ose/brands/sunnex.webp" },
  { name: "Victorinox", logo: "/assets/images/ose/brands/victorinox.webp" },
  { name: "King Metal", logo: "/assets/images/ose/brands/king-metal.png" },
  { name: "Berjaya", logo: "/assets/images/ose/brands/berjaya.png" },
  { name: "Wanhui", logo: "/assets/images/ose/brands/wanhui.jpeg" },
  { name: "Bilge", logo: "/assets/images/ose/brands/bilge.webp" },
  { name: "H-Kitchen", logo: "/assets/images/ose/brands/h-kitchen.webp" },
]);

// Improved duplication logic
const duplicatedBrands = computed(() => {
  const minBrands = 30;
  const originalBrands = brands.value;
  let result = [];

  // Keep adding copies until we have at least minBrands
  while (result.length < minBrands) {
    const copy = originalBrands.map((brand, index) => ({
      ...brand,
      id: result.length + index, // Add unique id for key prop
    }));
    result = [...result, ...copy];
  }

  return result;
});
</script>

<style>
/* Only keeping styles that can't be handled by Tailwind */
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Roboto:wght@300;400;500;900&display=swap");
.swiper-slide-active .transform {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* This will specifically target all transform and opacity animations within the active slide */
.swiper-slide-active [class*="transform"],
.swiper-slide-active [class*="opacity"] {
  transform: translateY(0) !important;
  opacity: 1 !important;
}
.bg-pattern-grid {
  background-color: #e82a3e;
  opacity: 0.4;
  background-image: linear-gradient(#444 1px, transparent 1px),
    linear-gradient(to right, #444 1px, transparent 1px);
  background-size: 20px 20px;
}

:root {
  --swiper-pagination-bullet-inactive-color: #fff;
  --swiper-pagination-bottom: -0.5rem;
  --swiper-wrapper-transition-timing-function: linear !important;
}

.swiper-wrapper {
  transition-timing-function: linear !important;
}

/* Optional: Pause on hover */
.swiper:hover .swiper-wrapper {
  animation-play-state: paused;
}

.swiper-pagination-bullet {
  @apply bg-white;
}
</style>
