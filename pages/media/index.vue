<template>
  <div>
    <main class="main">
      <div class="page-content">
        <!-- Header Section -->
        <div class="container mx-auto mb-12 px-4">
          <h2 class="!text-5xl font-bold text-primary mb-4">{{ title }}</h2>
          <p class="!text-2xl md:text-2xl text-primary font-medium mb-4">
            {{ subtitle }}
          </p>
          <p class="!text-2xl md:text-lg text-gray-600 mb-8">
            {{ description }}
          </p>
        </div>

        <!-- Media Cards Grid -->
        <div class="container mx-auto px-4">
          <div class="flex flex-row gap-8 flex-wrap justify-center">
            <NuxtLink
              v-for="item in mediaItems"
              :key="item.path"
              :to="item.path"
              class="block group"
            >
              <div class="relative w-[200px] transition-all duration-300">
                <!-- Image Container with Gradient -->
                <div
                  class="relative overflow-hidden rounded-full p-[4.2%] bg-gradient-to-br from-primary via-primary/20 to-transparent"
                >
                  <!-- Image Wrapper -->
                  <div
                    class="m-[0.8%] rounded-full border-[15px] border-white bg-white"
                  >
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-full object-cover rounded-full grayscale shadow-xl transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                </div>
                <!-- Card Content -->
                <div
                  class="relative mt-2 mx-auto w-[96%] group-hover:bg-primary rounded-lg border border-gray-200 py-2 px-4 text-center shadow-md transition-all duration-300"
                >
                  <h3
                    class="text-black group-hover:text-white text-xl font-semibold"
                  >
                    {{ item.title }}
                  </h3>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const title = "Media Center";
const subtitle = "Immerse Yourself in our Media Showcase";
const description =
  "Welcome to Our Media Center, a hub of captivating multimedia content regularly updated with new and exciting news so there's always something to discover About Sheffield. Check back often to stay updated.";

const mediaItems = [
  {
    title: "Blogs",
    path: "/media/blogs",
    image: "/assets/images/media/media_blogs.jpg",
  },
  {
    title: "In The News",
    path: "/media/in-the-news",
    image: "/assets/images/media/media_in_the_news.jpg",
  },
  {
    title: "Videos",
    path: "/media/videos",
    image: "/assets/images/media/media_video.jpg",
  },
  {
    title: "Newsletters",
    path: "/media/newsletters",
    image: "/assets/images/media/media_newsletters.jpg",
  },
  {
    title: "Brochures & Catalogs",
    path: "/media/brochures-and-catalogs",
    image: "/assets/images/media/media_documents.jpg",
  },
  {
    title: "Gallery",
    path: "/media/gallery",
    image: "/assets/images/media/media_gallery.jpg",
  },
];

// SEO Configuration
useHead({
  title: "Media Center",
  meta: [
    {
      name: "description",
      content: description,
    },
    {
      name: "keywords",
      content:
        mediaItems.map((item) => item.title).join(", ") + ", Media Center",
    },
  ],
});
</script>

<!-- No need for <style> section as we're using Tailwind utility classes directly -->
