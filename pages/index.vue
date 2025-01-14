<template>
  <main class="main1">
    <!-- Desktop Header -->
    <header class="bg-transparent hidden md:block">
      <div class="mt-2">
        <div class="container mx-auto">
          <div class="flex justify-between items-center">
            <!-- Search Section -->
            <div class="hidden lg:block flex-1">
              <div class="relative min-w-[40%] mx-4">
                <form class="relative">
                  <div class="flex">
                    <button class="btn text-gray-700 p-2" type="submit">
                      <i class="icon-search text-4xl"></i>
                    </button>
                    <input
                      v-model="query"
                      type="search"
                      class="form-input flex-1 rounded-r border-gray-300 focus:border-b-2 focus:outline-none"
                      placeholder="Search product ..."
                      @input="search"
                    />
                  </div>

                  <!-- Search Results -->
                  <ul
                    v-if="showResults"
                    class="absolute w-[370px] mt-2 bg-white shadow-sm border border-white rounded-lg max-h-60 overflow-y-auto top-8 z-50 divide-y divide-gray-200"
                  >
                    <div v-if="searchLoading" class="p-5">Loading...</div>
                    <div v-if="!results.length && !searchLoading" class="p-5">
                      No results found
                    </div>
                    <li
                      v-for="result in results"
                      :key="result.id"
                      class="p-5 text-sm font-medium leading-5 border-b border-gray-200 last:border-0 hover:bg-gray-50 cursor-pointer"
                    >
                      <NuxtLink
                        :to="getProductLink(result)"
                        class="flex items-center gap-2"
                      >
                        <img
                          :src="assetsSync(result.main_image_path)"
                          class="w-7 inline rounded"
                          alt=""
                        />
                        <span>{{ result.name }}</span>
                      </NuxtLink>
                    </li>
                  </ul>
                </form>
              </div>
            </div>

            <!-- Logo -->
            <div class="flex-1 text-center">
              <NuxtLink to="/" class="inline-block">
                <img
                  src="/assets/images/logo.png"
                  alt="Sheffield Logo"
                  class="w-[245px] h-auto"
                />
              </NuxtLink>
            </div>

            <!-- Cart -->
            <div class="flex-1 flex justify-end">
              <CartComponent />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Header -->
    <header
      class="md:hidden bg-[url('/assets/images/sheffield_stainless_steel_background.jpg')]"
    >
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <div class="flex-1">
            <!-- Mobile search similar to desktop -->
          </div>

          <div class="flex-1 text-center">
            <NuxtLink to="/" class="inline-block">
              <img
                src="/assets/images/logo.png"
                alt="Sheffield Logo"
                class="w-[245px] h-auto"
              />
            </NuxtLink>
          </div>

          <div class="flex-1 flex justify-end">
            <button
              class="ml-8 text-[3.5rem] text-gray-700"
              @click="addClassToBody"
            >
              <span class="sr-only">Toggle mobile menu</span>
              <i class="icon-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="page-wrapper">
      <main class="container mx-auto">
        <!-- Desktop Design -->
        <div class="flex justify-center mt-4 home-design">
          <NuxtLink
            class="home-first home-section home-section-cat"
            to="/about-us/sheffield-advantage"
          >
            <div class="home-section-white">
              <img
                src="/assets/images/homepage/sheffield_engineer.jpg"
                alt="Sheffield Engineer"
                class="w-full h-full object-cover rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
          </NuxtLink>

          <NuxtLink
            class="home-cold-storage home-section home-section-cat"
            to="cold-storage"
          >
            <div class="home-section-white">
              <img
                src="/assets/images/homepage/cold_storage_home.jpg"
                alt="Commercial Cold Storage"
                class="w-full h-full object-cover rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
          </NuxtLink>

          <NuxtLink
            class="home-kitchen home-section home-section-cat"
            to="/commercial-kitchen"
          >
            <div class="home-section-white">
              <img
                src="/assets/images/homepage/food_service_equipment.jpg"
                alt="Commercial Food Service Equipment"
                class="w-full h-full object-cover rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
          </NuxtLink>

          <NuxtLink
            class="home-laundry home-section home-section-cat"
            to="/laundry"
          >
            <div class="home-section-white">
              <img
                src="/assets/images/homepage/laundry_and_cleaning.jpg"
                alt="Commercial Laundry and Cleaning"
                class="w-full h-full object-cover rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
          </NuxtLink>

          <NuxtLink
            class="home-last home-section home-section-cat"
            to="/projects"
          >
            <div class="home-section-white">
              <img
                src="/assets/images/homepage/female_worker.jpg"
                alt="Sheffield Female Worker"
                class="w-full h-full object-cover rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
          </NuxtLink>
        </div>

        <!-- Mobile Design -->
        <div class="hidden flex-wrap w-full mt-0 home-design-mobile">
          <NuxtLink
            class="home-kitchen home-section home-section-cat"
            to="/commercial-kitchen"
          >
            <div class="home-section-white">
              <img
                src="/assets/images/homepage/food_service_equipment.jpg"
                alt="Commercial Food Service Equipment"
                class="w-full h-full object-cover rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
          </NuxtLink>

          <NuxtLink
            class="home-cold-storage home-section home-section-cat"
            to="cold-storage"
          >
            <div class="home-section-white">
              <img
                src="/assets/images/homepage/cold_storage_home.jpg"
                alt="Commercial Cold Storage"
                class="w-full h-full object-cover rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
          </NuxtLink>

          <NuxtLink
            class="home-laundry home-section home-section-cat"
            to="/laundry"
          >
            <div class="home-section-white">
              <img
                src="/assets/images/homepage/laundry_and_cleaning.jpg"
                alt="Commercial Laundry and Cleaning"
                class="w-full h-full object-cover rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              />
            </div>
          </NuxtLink>
        </div>
      </main>
    </div>

    <PromotionalProducts :show-products="false" />

    <!-- Popup with responsive height -->
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-lg shadow-lg text-center max-w-[500px] w-[90%] max-h-[80vh] flex flex-col"
      >
        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto p-4">
          <NuxtImg
            :src="
              assetsSync('/assets/images/events/december-promo.jpg', {
                local: true,
              })
            "
            alt="December Promos"
            class="w-full max-h-[80vh] rounded-lg object-cover"
            format="webp"
          />
        </div>

        <!-- Fixed Button Group at Bottom -->
        <div class="border-t p-4">
          <div class="flex justify-between gap-32">
            <button
              class="flex-1 bg-primary hover:bg-secondary text-white px-4 py-3 rounded transition-colors"
              @click="dismissPopup"
            >
              Cancel
            </button>
            <button
              class="flex-1 !bg-secondary hover:!bg-primary text-white px-4 py-3 rounded transition-colors"
              @click="
                viewProduct(
                  '/promotional-solutions/373/nov-16-2024-jan-15-2024-promotions'
                )
              "
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

const router = useRouter();
const query = ref("");
const results = ref([]);
const showResults = ref(false);
const searchLoading = ref(false);
const showPopup = ref(false);
const { api } = useAxios();

const search = async () => {
  if (query.value.trim().length) {
    showResults.value = true;
    searchLoading.value = true;
    try {
      const response = await api.get(`/api/product_search/${query.value}`);
      results.value = response.data.data;
      showResults.value = true;
    } catch (error) {
      console.error(error);
    } finally {
      searchLoading.value = false;
    }
  } else {
    results.value = [];
    showResults.value = false;
  }
};

const addClassToBody = () => {
  const targetElement = document.querySelector(".the_main_div");
  targetElement.classList.add("mmenu-active");
};

const dismissPopup = () => {
  showPopup.value = false;
};

onMounted(async () => {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.toggle("mmenu-active1", true);
  });
  const popupDismissed = false;
  if (!popupDismissed) {
    showPopup.value = true;
  }
});

const viewProduct = (route = null) => {
  if (route) {
    router.push(route);
    return;
  }
  window.open("https://forms.gle/Z36CZ1AnM6PVzNqv7", "_blank");
};
</script>

<style scoped>
/* Animations */
@keyframes slideFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFromBottom {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFromTop {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFromRight {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Base section styles */
.home-section {
  opacity: 0;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
}

.home-last {
  animation-name: slideFromLeft;
}
.home-laundry {
  animation-name: slideFromBottom;
}
.home-cold-storage {
  animation-name: slideFromBottom;
}
.home-first {
  animation-name: slideFromRight;
}
.home-kitchen {
  animation-name: slideFromTop;
}

/* Layout styles */
.home-design {
  @apply flex w-[140%] ml-[-20%];
}

.home-section-white {
  @apply m-[0.8%] border-[15px] border-white rounded-full bg-white;
}

/* Section-specific styles */
.home-kitchen {
  @apply z-[10] relative w-[23%] h-[23%] p-[1.3%] rounded-full;
  background: linear-gradient(172deg, #c02434 13.87%, transparent 22.27%),
    linear-gradient(349deg, #c02434 11.34%, transparent 23.95%);
}

.home-laundry {
  @apply z-[9] ml-[-6%] mt-[-2%] relative w-[20%] h-[20%] p-[1.3%] rounded-full;
  background: linear-gradient(187deg, #72b433 22.71%, transparent 30.89%),
    linear-gradient(358deg, #72b433 7.34%, transparent 12.02%);
}

.home-cold-storage {
  @apply mr-[-6%] mt-[4%] relative w-[22%] h-[22%] p-[1.3%] rounded-full;
  background: linear-gradient(185deg, #304296 5.36%, transparent 12.61%),
    linear-gradient(21deg, #304296 27.73%, transparent 39.5%);
}

.home-first {
  @apply mr-[-6%] relative w-[14%] h-[14%] p-[0.6%] rounded-full;
  background: linear-gradient(172deg, #656565 25.21%, transparent 45.8%),
    linear-gradient(71deg, #656565 11.34%, transparent 42.02%);
}

.home-last {
  @apply mt-[6%] ml-[-6%] relative w-[14%] h-[14%] p-[0.6%] rounded-full;
  background: linear-gradient(234deg, #656565 26.71%, transparent 36.89%),
    linear-gradient(330deg, #656565 29.34%, transparent 42.02%);
}

/* Responsive styles */
@media only screen and (max-width: 768px) {
  .home-design {
    @apply hidden;
  }
  .home-design-mobile {
    @apply flex w-full ml-0;
  }

  .home-kitchen {
    @apply w-[90%] h-[90%] p-[3.3%] mt-[4%];
    background: linear-gradient(147deg, #c02434 36.97%, transparent 54.62%),
      linear-gradient(261deg, #c02434 11.34%, transparent 23.95%);
  }

  .home-cold-storage {
    @apply z-[11] w-[90%] h-[90%] p-[3.3%] mt-[-30%];
    background: linear-gradient(269deg, #3b5dac 5.36%, transparent 15.13%),
      linear-gradient(92deg, #3b5dac 7.14%, transparent 15.97%);
  }

  .home-laundry {
    @apply z-[12] w-[90%] h-[90%] p-[3.3%] mt-[-30%];
    background: linear-gradient(71deg, #72b433 22.71%, transparent 30.89%),
      linear-gradient(316deg, #72b433 36.55%, transparent 50%);
  }

  .home-first,
  .home-last {
    @apply hidden;
  }
}

/* Tablet styles */
@media only screen and (min-width: 769px) and (max-width: 1025px) {
  .home-design {
    @apply mt-[1px] !important;
  }

  .home-first,
  .home-last {
    @apply hidden;
  }

  .home-kitchen {
    @apply mt-[4%] w-[32%] h-[32%];
    background: linear-gradient(181deg, #c02434 7.14%, transparent 15.55%),
      linear-gradient(358deg, #c02434 10.5%, transparent 21.01%);
  }

  .home-laundry {
    @apply ml-[-9%] mt-[4%] w-[29%] h-[29%];
    background: linear-gradient(215deg, #72b433 25.21%, transparent 42.44%),
      linear-gradient(320deg, #72b433 27.31%, transparent 42.86%);
  }

  .home-cold-storage {
    @apply mr-[-9%] mt-[4%] w-[29%] h-[29%];
    background: linear-gradient(134deg, #3b5dac 28.15%, transparent 50%),
      linear-gradient(29deg, #3b5dac 27.73%, transparent 39.5%);
  }
}

/* Hover effects */
.home-section-cat img:hover {
  @apply shadow-2xl z-[11];
}

.home-section-cat:hover {
  @apply z-[11];
}

.home-section-cat .home-section-white:hover {
  @apply m-[0.1%] border-[8px] border-white;
}

/* Search results scrollbar styling */
.searchListMainDiv ul::-webkit-scrollbar {
  @apply w-[5px];
}

.searchListMainDiv ul::-webkit-scrollbar-track {
  @apply rounded-lg shadow-inner;
}

.searchListMainDiv ul::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded-lg hover:bg-gray-500;
}
</style>
