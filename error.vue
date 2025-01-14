<template>
  <NuxtLayout name="default">
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <!-- <li class="breadcrumb-item">
              <a href="#">Pages</a>
            </li> -->
            <li class="breadcrumb-item active" aria-current="page">404</li>
          </ol>
        </div>
      </nav>

      <!-- Error Content -->
      <div
        class="relative error-content text-center bg-[url('/assets/images/backgrounds/error-bg.jpg')] bg-cover bg-center bg-no-repeat"
        ref="errorContainer"
      >
        <!-- Error Status -->
        <h1
          ref="errorTitle"
          class="text-8xl font-bold mb-8 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent"
        >
          {{ error?.statusCode || "404" }}
        </h1>

        <!-- Error Message -->
        <div ref="errorMessage" class="space-y-4 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900">
            {{ getErrorMessage(error?.statusCode) }}
          </h2>
          <p class="text-gray-600 text-2xl">
            {{
              error?.message ||
              "We're sorry, but we can't find the page you're looking for."
            }}
          </p>
        </div>

        <!-- Stack Trace (Development Only) -->
        <div
          v-if="error?.stack && process.dev"
          class="mt-6 p-4 bg-gray-100 rounded-lg text-left overflow-auto"
        >
          <pre class="text-2xl text-gray-700">{{ error.stack }}</pre>
        </div>

        <!-- Action Buttons -->
        <div
          ref="errorActions"
          class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
        >
          <NuxtLink
            to="/"
            class="px-8 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>Return Home</span>
            <ArrowRight class="w-5 h-5" />
          </NuxtLink>

          <button
            @click="refreshPage"
            class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
          >
            <RefreshCcw class="w-5 h-5" />
            <span>Refresh Page</span>
          </button>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import type { NuxtError } from "#app";
import { RefreshCcw, ArrowRight } from "lucide-vue-next";

const props = defineProps({
  error: Object as () => NuxtError,
});

const process = {
  dev: import.meta.env.MODE === "development",
};

// Error message mapping
const getErrorMessage = (statusCode: number | undefined) => {
  switch (statusCode) {
    case 404:
      return "Page Not Found";
    case 500:
      return "Server Error";
    case 403:
      return "Access Denied";
    default:
      return "An Error Occurred";
  }
};

// Page refresh function
const refreshPage = () => {
  window.location.reload();
};

// Animation references
const errorContainer = ref(null);
const errorTitle = ref(null);
const errorMessage = ref(null);
const errorActions = ref(null);

// GSAP Animations
onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(errorContainer.value, {
    y: 100,
    opacity: 0,
    duration: 0.6,
  })
    .from(errorTitle.value, {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
    })
    .from(errorMessage.value, {
      y: 20,
      opacity: 0,
      duration: 0.4,
    })
    .from(errorActions.value, {
      y: 20,
      opacity: 0,
      duration: 0.4,
    });
});

// Meta tags
useHead({
  title: `Error ${props.error?.statusCode || "404"} | Your Site Name`,
  meta: [
    {
      name: "description",
      content: `Error ${props.error?.statusCode || "404"} - ${getErrorMessage(
        props.error?.statusCode
      )}`,
    },
  ],
});

// Cleanup
onUnmounted(() => {
  clearError();
});
</script>
