<template>
  <div class="pb-12 md:pt-0">
    <div class="container mx-auto px-4">
      <!-- Desktop Menu -->
      <div class="hidden md:block relative w-full">
        <div class="grid grid-cols-8 gap-1">
          <div
            v-for="(category, index) in mainCategories"
            :key="index"
            @mouseenter="hoveredCategory = category.id"
          >
            <NuxtLink
              :to="category?.url || getCategoryLink(category.id, category.name)"
              class="block"
            >
              <div
                class="rounded-lg px-2 py-1 border transition-all duration-200 hover:scale-105"
                :class="[
                  isActive(category.id)
                    ? 'bg-white border-2 border-dashed'
                    : 'text-white',
                ]"
                :style="{
                  backgroundColor: !isActive(category.id)
                    ? segment.color
                    : 'white',
                  borderColor: segment.color,
                }"
              >
                <p class="flex items-center h-full px-2 text-lg">
                  <img
                    :src="getMenuIcon(category.name)"
                    :alt="category.name"
                    class="h-9 w-9 flex-shrink-0 mr-2"
                    :class="[
                      isActive(category.id)
                        ? 'filter-primary'
                        : 'brightness-90 invert sepia-0 hue-rotate-0 saturate-0',
                    ]"
                    @error="handleImageError"
                  />
                  <span
                    class="truncate"
                    :class="[
                      isActive(category.id) ? 'text-primary' : 'text-white',
                    ]"
                    :style="{
                      color: isActive(category.id) ? segment.color : 'white',
                    }"
                  >
                    {{ category.name }}
                  </span>
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <!-- Mega Menu Popup -->
        <div
          class="absolute z-50 max-h-[60vh] md:t-48 left-0 right-0 w-full mx-auto bg-white shadow-xl border-t transition-all duration-300 ease-in-out overflow-y-auto"
          :class="[
            hoveredCategory
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none',
          ]"
          ref="mainModalContainer"
          @mouseleave="hoveredCategory = null"
        >
          <div class="container mx-auto px-4 py-8 slide-solutions">
            <div class="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
              <div
                v-for="subCategory in mainCategories"
                :key="subCategory.id"
                class="transform transition-transform duration-200 hover:-translate-y-1"
              >
                <NuxtLink
                  class="cat-block"
                  :to="
                    subCategory?.url ||
                    getCategoryLink(subCategory.id, subCategory.name)
                  "
                >
                  <figure>
                    <span>
                      <img
                        :src="getMenuIcon(subCategory.name)"
                        :alt="subCategory.name"
                        @error="handleImageError"
                      />
                    </span>
                  </figure>

                  <h3 class="cat-block-title">{{ subCategory.name }}</h3>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden">
      <button
        type="button"
        class="w-3/4 mx-auto px-4 py-2 text-white rounded text-left flex justify-between items-center"
        :style="{ backgroundColor: segment.color }"
        @click="toggleMobileMenu"
      >
        <span class="font-semibold">BROWSE CATEGORIES</span>
        <span
          class="transition-transform"
          :class="{ 'rotate-180': isMobileMenuOpen }"
          >▼</span
        >
      </button>

      <div
        v-show="isMobileMenuOpen"
        class="mt-2 rounded shadow-lg"
        :style="{ backgroundColor: segment.color }"
      >
        <div class="py-2">
          <NuxtLink
            v-for="category in mainCategories"
            :key="category.id"
            :to="getCategoryLink(category.id, category.name)"
            class="block px-4 py-2 hover:bg-white/10 transition-colors"
            @click="toggleMobileMenu"
          >
            <div class="flex items-center">
              <img
                :src="getMenuIcon(category.name)"
                :alt="category.name"
                class="w-8 mr-3 brightness-90 invert sepia-0 hue-rotate-0 saturate-0"
                @error="handleImageError"
              />
              <span class="text-white text-sm">{{ category.name }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  segment: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const { api } = useAxios();
const isMobileMenuOpen = ref(false);
const hoveredCategory = ref(null);
const mainModalContainer = ref(null);

// Fetch categories
const {
  data: mainCategories,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `categories-${props.segment.id}`,
  async () => {
    if (!props.segment.id) {
      return [];
    }

    const { data } = await api.get(
      `/api/get-main-categories/${props.segment.id}`
    );

    return [
      ...data.data,
      {
        id: 1,
        name: "Consultancy & Design",
        url: "/consultancy-and-design",
      },
    ];
  },
  {
    server: true,
    lazy: true,
  }
);

// Image handling functions
const getMenuIcon = (categoryName) => {
  if (!categoryName) return "";

  const transformedName = transformName(categoryName);
  const isPromotional = categoryName.toLowerCase().includes("promotions");

  // Handle promotions specially
  if (isPromotional) {
    return "/assets/images/menu-icons/promotions.webp";
  }

  // Return standard path
  return `/assets/images/menu-icons/${transformedName}.png`;
};

const handleImageError = (event) => {
  const src = event.target.src;
  // If top-menu image fails, try regular menu-icons directory
  if (src.includes("/")) {
    const fileName = src.split("/").pop();
    event.target.src = `/assets/images/menu-icons/${fileName}`;
  } else {
    // If all else fails, use default icon
    event.target.src = "/assets/images/menu-icons/default.png";
  }
};

// Other functions
onClickOutside(mainModalContainer, () => {
  hoveredCategory.value = null;
});

const isActive = (categoryId) => {
  return route.params.id === categoryId?.toString();
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Watch for segment changes
watch(
  () => props.segment,
  () => {
    refresh();
  }
);
</script>

<style scoped>
.filter-primary {
  filter: invert(20%) sepia(63%) saturate(3227%) hue-rotate(337deg)
    brightness(88%) contrast(94%);
}
</style>
