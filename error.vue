// error.vue
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

      <div
        class="error-content text-center"
        style="background-image: url('/assets/images/backgrounds/error-bg.jpg')"
      >
        <div class="container">
          <h1 class="error-title">Error {{ error?.statusCode }}</h1>
          <p>We are sorry, the page you've requested is not available.</p>
          <NuxtLink
            to="/"
            class="btn btn-outline-primary-2 btn-minwidth-lg mt-4"
          >
            <span>BACK TO HOMEPAGE</span>
            <i class="icon-long-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

useHead({
  title: "404 Error",
  meta: [
    {
      name: "description",
      content: "404 Error Page",
    },
  ],
});

onUnmounted(() => {
  clearError();
});
</script>
