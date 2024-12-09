<template>
  <!-- Error State -->
  <div v-if="error" class="container mx-auto px-4">
    <div class="flex items-center justify-center p-4 bg-red-50 rounded-lg">
      <div class="text-center">
        <p class="text-red-600 mb-2">Unable to load categories</p>
        <button
          class="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
          @click="refresh"
        >
          Retry
        </button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <ClientOnly>
    <!-- Loading Fallback -->
    <template #fallback>
      <div class="container mx-auto px-4 mt-5">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="n in 6"
            :key="n"
            class="h-[33px] bg-gray-200 rounded animate-pulse"
          >
            <div class="flex items-center h-full px-2">
              <div class="w-[15%] h-5 bg-gray-300 rounded mr-2"></div>
              <div class="flex-1 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Default Content -->
    <div class="container mx-auto px-4 mt-5">
      <!-- Desktop Menu -->
      <div class="hidden md:block">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="(category, index) in mainCategories" :key="index">
            <NuxtLink
              :to="getCategoryLink(category.id, category.name)"
              class="block"
            >
              <div
                class="rounded-lg px-2 py-1 border transition-colors"
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
                <p class="flex items-center h-full px-2 text-sm">
                  <img
                    :src="`/assets/images/menu-icons/${formattedName(
                      category.name
                    )}.png`"
                    :alt="category.name"
                    class="h-9 w-9 mr-2"
                    :class="[
                      isActive(category.id)
                        ? 'filter-primary'
                        : 'brightness-90 invert sepia-0 hue-rotate-0 saturate-0',
                    ]"
                  />
                  <span
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
      </div>

      <!-- Mobile Menu -->
      <div class="md:hidden">
        <button
          type="button"
          class="w-full px-4 py-2 text-white rounded text-left flex justify-between items-center"
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
              :to="getCategoryLink(category.id, category.name, 1)"
              class="block px-4 py-2 hover:bg-white/10 transition-colors"
            >
              <div class="flex items-center">
                <img
                  :src="`/assets/images/menu-icons/${formattedName(
                    category.name
                  )}.png`"
                  :alt="category.name"
                  class="w-8 mr-3 brightness-90 invert sepia-0 hue-rotate-0 saturate-0"
                />
                <span class="text-white text-sm">{{ category.name }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  segment: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const { api } = useAxios();
const isMobileMenuOpen = ref(false);
const arr = ref([
  {
    id: 0,
    name: "Consultancy & Design",
  },
]);
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

    arr.value.unshift(...data.data);
    return arr.value;
  },
  {
    server: true,
    lazy: false,
  }
);

const formattedName = (name) => name?.toLowerCase().replace(/\s/g, "-");

const isActive = (categoryId) => {
  return route.params.id === categoryId?.toString();
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

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

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
