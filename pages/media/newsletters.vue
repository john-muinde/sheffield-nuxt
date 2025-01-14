// pages/media/newsletters.vue
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <h2 class="about-us-title">Newsletters</h2>

        <NuxtLink
          to="/media"
          class="btn btn-primary btn-round btn-shadow float-right"
        >
          <i class="icon-long-arrow-left"></i>
          <span>Back to Media Center</span>
        </NuxtLink>

        <p class="lead about-us-lead text-primary mb-1">
          Explore Our Newsletters
        </p>

        <p class="about-us-text mb-2">Click on the documents to view</p>

        <DocumentViewer
          type="newsletters"
          content-type="Newsletters"
          sorting="height"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { handleRouteLeave } = useMediaDocuments();
onBeforeRouteLeave(handleRouteLeave);

useHead({
  title: "Newsletters",
  meta: [
    {
      name: "description",
      content: "Explore our newsletters",
    },
    {
      property: "og:title",
      content: "Newsletters",
    },
    {
      property: "og:description",
      content: "Explore our newsletters",
    },
  ],
});
</script>
