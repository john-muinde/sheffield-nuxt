<template>
  <div id="app">
    <main class="main1">
      <div id="breadcrumb"></div>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const config = {
  appName: "Sheffield Steel Systems",
  locale: "en",
  locales: ["en"],
};

// Reactive title that can be updated
const title = ref("Home | Admin Sheffield Steel Systems");

// Set up meta tags and other head elements
useHead({
  title,
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "We offer commercial kitchen, laundry, cold room & stainless steel fabricated solutions from design, manufacturing, supply, installation & aftersales.",
    },
    {
      name: "google-site-verification",
      content: "MDV6HhOKIgKRjiLA7URFOhZc0eOmt5-pZiZ7zvtKyGQ",
    },
  ],
  link: [
    { rel: "shortcut icon", href: "/favicon.png" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Nunito:400,600,700",
    },
    {
      rel: "stylesheet",
      href: "https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.min.css",
    },
  ],
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-X8VZ318QX0",
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-X8VZ318QX0');
      `,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js",
    },
  ],
});
</script>

<style>
@import "~/assets/admin/sass/components/custom-modal.scss";
@import "~/assets/admin/sass/app.scss";
</style>
