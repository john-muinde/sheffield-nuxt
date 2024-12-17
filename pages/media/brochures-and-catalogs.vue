// pages/media/brochures.vue
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <h2 class="about-us-title">Brochures & Catalogs</h2>

        <NuxtLink
          to="/media"
          class="btn btn-primary btn-round btn-shadow float-right"
        >
          <i class="icon-long-arrow-left"></i>
          <span>Back to Media Center</span>
        </NuxtLink>

        <p class="lead about-us-lead text-primary mb-1">
          Explore Our Brochures & Catalogs
        </p>

        <p class="about-us-text mb-2">Click on the documents to view</p>

        <DocumentViewer
          type="brochures"
          content-type="Brochures & Catalogs"
          sorting="height"
          @retry="handleRetry"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const handleRetry = () => {
  console.log("Retrying brochures load...");
};

useHead({
  title: "Brochures & Catalogs",
  meta: [
    {
      name: "description",
      content: "Explore our Brochures & Catalogs",
    },
    {
      property: "og:title",
      content: "Brochures & Catalogs",
    },
    {
      property: "og:description",
      content: "Explore our Brochures & Catalogs",
    },
  ],
});
</script>
