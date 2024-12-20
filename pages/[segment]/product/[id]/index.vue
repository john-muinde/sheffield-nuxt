<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-center bg-white">
    <!-- Primary Spinner -->
    <div class="relative">
      <div
        class="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"
      ></div>
      <div
        class="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-ping opacity-20"
      ></div>
    </div>

    <!-- Loading Text -->
    <div class="mt-3 text-center">
      <h2 class="text-lg font-semibold text-gray-800">Loading Product</h2>
      <p class="mt-2 text-sm text-gray-500">
        Please wait while we redirect you...
      </p>
    </div>

    <!-- Progress Bar -->
    <div class="mt-4 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
      <div class="h-full bg-primary animate-progress rounded-full"></div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { api } = useAxios();

const { data: product } = await useAsyncData(
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
  }
);

watch(
  () => product.value,
  (newProduct) => {
    if (newProduct?.name) {
      const correctSlug = transformName(newProduct.name);
      const correctPath = `/${route.params.segment}/product/${route.params.id}/${correctSlug}`;

      if (route.path !== correctPath) {
        router.replace(correctPath);
      }
    }
  },
  { immediate: true }
);
</script>

<style>
@keyframes progress {
  0% {
    width: 0%;
    opacity: 1;
  }
  50% {
    width: 100%;
    opacity: 0.5;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}
</style>
