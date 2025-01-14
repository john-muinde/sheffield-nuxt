<template>
  <main class="main">
    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1 blog-page">
            <h2 class="about-us-title">
              <router-link to="/media/blogs"> Blogs </router-link>
            </h2>
            <!-- End .name -->
            <p class="lead about-us-lead text-primary mb-3 mt-2">
              {{ blogData.blog.name }}
            </p>

            <div class="row">
              <div class="col-lg-9">
                <article class="entry single-entry">
                  <figure class="entry-media">
                    <NuxtImg
                      :src="assetsSync(blogData.blog.main_image_path)"
                      :alt="blogData.blog.name"
                      width="870"
                      height="580"
                    />
                  </figure>
                  <div class="entry-body">
                    <div
                      class="entry-content editor-content"
                      v-html="blogData.blog.content"
                    ></div>
                    <!-- End .entry-content -->

                    <div
                      class="entry-footer row no-gutters flex-column flex-md-row"
                    ></div>
                    <!-- End .entry-footer row no-gutters -->
                  </div>
                  <!-- End .entry-body -->
                </article>
                <!-- End .entry -->
              </div>
              <!-- End .col-lg-9 -->

              <aside class="col-lg-3">
                <div class="sidebar ml-2">
                  <div class="widget widget-cats">
                    <router-link
                      style="color: #fff; font-weight: 500; font-size: 2rem"
                      class="btn btn-primary"
                      to="/media/blogs"
                    >
                      Go to Blogs
                    </router-link>
                  </div>

                  <div class="widget">
                    <h3 class="widget-title">Popular Posts</h3>

                    <ul class="posts-list">
                      <li v-for="blog in blogData.other_blogs" :key="blog.id">
                        <figure>
                          <router-link
                            :to="
                              getGenericLink(blog.id, blog.name, 'media/blogs')
                            "
                          >
                            <NuxtImg
                              :src="assetsSync(blog.main_image_path)"
                              :alt="blog.name"
                              width="100"
                              height="100"
                            />
                          </router-link>
                        </figure>

                        <div>
                          <h4>
                            <router-link
                              :to="
                                getGenericLink(
                                  blog.id,
                                  blog.name,
                                  'media/blogs'
                                )
                              "
                            >
                              {{ blog.name }}
                            </router-link>
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// Define page meta
definePageMeta({
  validate: async (route) => {
    return !!route.params.id && !isNaN(parseInt(route.params.id));
  },
});

import { useMetaGenerator } from "~/utils/metaGenerator";

const route = useRoute();
const blog_id = ref(route.params.id ? parseInt(route.params.id) : 1);

const { api } = useAxios();

// Fetch blog details
const { data: blogData, refresh: fetchBlog } = await useAsyncData(
  `blog-${blog_id.value}`,
  async () => {
    const response = await api.get("/api/get-blog-details", {
      params: {
        blog_id: blog_id.value,
      },
    });
    return response.data;
  }
);

// Generate SEO meta tags
const {
  generateContentMetaTags,
  generateHeadInput,
  generateSeoMeta,
  getDefaultMetaTags,
} = useMetaGenerator();

const metaTags = computed(() =>
  generateContentMetaTags({
    type: "blogs",
    content: {
      ...blogData.value.blog,
      keywords: `${blogData.value.blog.name}, ${getDefaultMetaTags().keywords}`,
    },
  })
);
// Apply meta tags
useHead(() => ({
  ...generateHeadInput(route, metaTags.value.jsonLdSchema),
  title: `${blogData.value.blog.name} - Blog`,
}));

useSeoMeta(generateSeoMeta(metaTags.value, route));
</script>
<style>
.blog-page .about-us-lead {
  font-size: 2.2rem !important;
}

.blog-page .editor-content p {
  color: #555 !important;
  margin-bottom: 1.5rem !important;
  font-size: 1.5rem;
  font-weight: 400;
}

.blog-page .editor-content p em {
  color: #9b9b9b;
  font-size: 1.45rem;
}

.blog-page .editor-content ul li {
  position: relative;
  margin-bottom: 0.1rem;
  color: #555 !important;
  font-size: 1.5rem;
  font-weight: 400;
}

.posts-list li {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}
</style>
