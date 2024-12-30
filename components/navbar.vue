<template>
  <div class="">
    <header
      :class="['fixed w-full top-0 z-40', { 'bg-white shadow-md': isScrolled }]"
    >
      <!-- Top Bar -->
      <div class="bg-primary sm:block">
        <div class="container mx-auto px-4">
          <div
            class="flex flex-wrap lg:flex-nowrap justify-between items-center py-3"
          >
            <!-- Contact Info - Always visible on tablet and up -->

            <div
              class="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 max-[346px]:text-sm sm:text-base md:text-base lg:text-base"
            >
              <a
                href="tel:+254713777111"
                class="flex items-center text-white hover:text-secondary whitespace-nowrap"
              >
                <i class="icon-phone mr-2 text-lg"></i>
                +254 713 777 111
              </a>
              <a
                href="mailto:info@sheffieldafrica.com"
                class="flex items-center text-white hover:text-secondary whitespace-nowrap"
              >
                <i class="icon-envelope mr-2 text-lg"></i>
                info@sheffieldafrica.com
              </a>
            </div>

            <!-- Navigation - Hidden on mobile/tablet, visible on desktop -->
            <nav class="hidden xl:block">
              <ul class="flex flex-wrap gap-2">
                <li
                  v-for="segment in filteredSegments"
                  :key="segment.slug"
                  :class="[
                    'px-3 py-1.5 rounded-md transition-colors text-medium xl:text-base',
                    isActiveSegment(segment.slug)
                      ? 'bg-white text-primary'
                      : 'text-white hover:bg-white/10',
                  ]"
                >
                  <NuxtLink :to="`/${segment.slug}`" class="flex items-center">
                    <img
                      :src="segment.icon"
                      :alt="segment.name"
                      class="w-5 h-5 mr-2"
                      :class="[
                        isActiveSegment(segment.slug) ? '' : 'filter invert',
                      ]"
                    />
                    <span class="font-medium whitespace-nowrap">{{
                      segment.name
                    }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <div class="bg-white shadow-lg">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-20">
            <!-- Logo -->
            <div class="w-32 md:w-48 flex-shrink-0">
              <NuxtLink to="/" class="block">
                <img
                  src="/assets/images/logo.png"
                  alt="Sheffield Logo"
                  class="w-full h-auto"
                />
              </NuxtLink>
            </div>

            <!-- Search Bar - Hidden on mobile -->
            <div class="hidden md:flex flex-1 max-w-2xl mx-8">
              <div class="relative w-full">
                <form @submit.prevent="handleSearch" class="relative">
                  <input
                    type="search"
                    v-model="searchQuery"
                    @input="handleSearch"
                    class="w-full px-4 py-2 border rounded-lg text-medium lg:text-base outline-none focus:border-primary"
                    placeholder="Search products..."
                  />
                  <button
                    v-if="searchQuery?.length <= 0"
                    type="submit"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                  >
                    <i class="icon-search text-2xl"></i>
                  </button>
                </form>

                <div
                  v-if="showSearchResults"
                  ref="searchResultsContainer"
                  class="absolute w-full mt-2 bg-white border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
                >
                  <div v-if="!searchResults?.length" class="p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-12 h-12 mx-auto text-gray-300"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2v-2zm0-6h2v4h-2V8z"
                      />
                    </svg>
                    <p class="text-base text-gray-700 text-center mt-1">
                      {{
                        searchQuery?.length < 3
                          ? "Type at least 3 characters to search"
                          : "No results found"
                      }}
                    </p>
                  </div>
                  <div
                    v-for="result in searchResults"
                    :key="result.id"
                    class="border-b last:border-b-0"
                  >
                    <NuxtLink
                      :to="getProductLink(result)"
                      class="flex items-center p-4 hover:bg-gray-50 transition-colors"
                      @click="hideSearchResults"
                    >
                      <img
                        :src="assetsSync(result.main_image_path)"
                        :alt="result.name"
                        class="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <span class="text-base text-gray-700">{{
                        result.name
                      }}</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center gap-4 md:gap-6">
              <!-- Account - Hidden on mobile -->
              <div class="hidden md:block relative group">
                <button
                  class="flex items-center text-gray-600 hover:text-primary text-medium lg:text-base"
                >
                  <i class="icon-user text-xl mr-2"></i>
                  <span>Account</span>
                </button>

                <div
                  class="absolute right-0 top-full hidden group-hover:block bg-white shadow-xl rounded-lg py-3 w-56 z-50"
                >
                  <template v-if="!user?.name">
                    <NuxtLink
                      to="/login"
                      class="flex items-center px-5 py-3 text-base hover:bg-gray-50"
                    >
                      Log In
                      <i class="icon-arrow-right ml-auto"></i>
                    </NuxtLink>
                    <NuxtLink
                      to="/register"
                      class="flex items-center px-5 py-3 text-base hover:bg-gray-50"
                    >
                      Register
                      <i class="icon-arrow-right ml-auto"></i>
                    </NuxtLink>
                  </template>
                  <div v-else class="px-4 py-2">
                    <button
                      @click="handleLogout"
                      class="w-full flex items-center justify-center px-5 py-3 text-base border border-primary text-primary rounded-lg hover:bg-primary/5"
                    >
                      Logout
                      <i class="icon-long-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </div>

              <CartComponent />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-50 lg:hidden">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50" @click="toggleMobileMenu"></div>

        <!-- Menu Content -->
        <div class="fixed inset-y-0 right-0 w-[280px] bg-white shadow-xl">
          <div class="h-full flex flex-col">
            <div class="p-4 border-b">
              <button
                @click="toggleMobileMenu"
                class="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
              >
                <i class="icon-close text-2xl"></i>
              </button>

              <!-- Mobile Search -->
              <div class="mt-8">
                <form @submit.prevent="handleMobileSearch" class="relative">
                  <input
                    type="search"
                    v-model="mobileSearchQuery"
                    @input="handleMobileSearch"
                    class="w-full px-4 py-3 text-base border rounded-lg"
                    placeholder="Search products..."
                  />
                  <button
                    v-if="mobileSearchQuery?.length <= 0"
                    type="submit"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <i class="icon-search text-xl"></i>
                  </button>
                </form>
              </div>
            </div>

            <!-- Mobile Navigation -->
            <nav class="flex-1 overflow-y-auto p-4">
              <ul class="space-y-0">
                <li v-for="segment in filteredSegments" :key="segment.slug">
                  <NuxtLink
                    :to="`/${segment.slug}`"
                    class="flex items-center p-4 rounded-lg text-base hover:bg-gray-50 hover:!text-primary"
                    :class="{
                      'bg-primary/5 text-primary': isActiveSegment(
                        segment.slug
                      ),
                    }"
                    @click="toggleMobileMenu"
                  >
                    <img
                      :src="segment.icon"
                      :alt="segment.name"
                      class="w-6 h-6"
                      :class="[
                        isActiveSegment(segment.slug) ? '' : 'filter grayscale',
                      ]"
                    />
                    <span>{{ segment.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>

            <!-- Mobile Menu Footer -->
            <div class="p-4 border-t">
              <div class="space-y-3 mb-6">
                <a
                  href="tel:+254713777111"
                  class="flex items-center text-gray-600 text-base"
                >
                  <i class="icon-phone mr-3 text-lg"></i>
                  +254 713 777 111
                </a>
                <a
                  href="mailto:info@sheffieldafrica.com"
                  class="flex items-center text-gray-600 text-base"
                >
                  <i class="icon-envelope mr-3 text-lg"></i>
                  info@sheffieldafrica.com
                </a>
              </div>

              <div class="flex space-x-6">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener"
                  :class="['text-gray-400 hover:text-' + social.color]"
                >
                  <i :class="[social.icon, 'text-xl']"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRoute } from "vue-router";

const route = useRoute();
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const searchQuery = ref("");
const mobileSearchQuery = ref("");
const showSearchResults = ref(false);
const searchResults = ref([]);
const searchResultsContainer = ref(null);

const userStore = useAuthStore();

const user = computed(() => userStore.user);
const { api } = useAxios();

// Filter active segments
const filteredSegments = computed(() => {
  return [
    ...APP_SEGMENTS,
    {
      name: "Consultancy and Design",
      active: true,
      slug: "consultancy-and-design",
      icon: "/assets/images/menu-icons/consultancy-&-design.png",
    },
  ].filter((segment) => segment.active);
});

// Social media links
const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/SheffieldAfricaFacilitySolutions",
    icon: "icon-facebook-f",
    color: "blue-600",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/sheffield_afric/",
    icon: "icon-twitter",
    color: "blue-400",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/sheffieldafrica/",
    icon: "icon-instagram",
    color: "pink-600",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCK-oWPdQazenIHndl4zABew",
    icon: "icon-youtube",
    color: "red-600",
  },
];

// Check if segment is active
const isActiveSegment = (slug) => {
  return route.params.segment === slug;
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

onClickOutside(searchResultsContainer, () => {
  hideSearchResults();
});

// Handle scroll effect
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };
  window.addEventListener("scroll", handleScroll);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    document.body.style.overflow = "";
  });
});

// Handle search functionality
const handleSearch = async () => {
  showSearchResults.value = true;
  if (searchQuery.value?.length >= 3) {
    try {
      const response = await api.get(
        `/api/product_search/${searchQuery.value}`
      );
      const data = await response.data;
      searchResults.value = data.data;
      showSearchResults.value = true;
    } catch (error) {
      console.error("Search error:", error);
    }
  }
};

const handleMobileSearch = async () => {
  showSearchResults.value = true;
  if (mobileSearchQuery.value?.length >= 3) {
    await handleSearch();
    toggleMobileMenu();
  }
};

const hideSearchResults = () => {
  showSearchResults.value = false;
};
</script>

<style scoped>
@screen md {
  .container {
    @apply px-6;
  }
}

@screen lg {
  .container {
    @apply px-8;
  }
}
</style>
