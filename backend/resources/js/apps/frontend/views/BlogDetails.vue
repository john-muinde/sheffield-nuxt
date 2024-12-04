<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1 blog-page">
              <h2 class="about-us-title">
                <router-link to="/media/blogs">
                  Blogs
                </router-link>
              </h2>
              <!-- End .title -->
              <p
                class="lead about-us-lead text-primary mb-3 mt-2"
              >
                {{ blog.name }}
              </p>

              <div class="row">
                <div class="col-lg-9">
                  <article class="entry single-entry">
                    <figure class="entry-media">
                      <img
                        :src="
                          '/storage/' +
                            blog.main_image_path
                        "
                        :alt="blog.name"
                      />
                    </figure>
                    <div class="entry-body">
                      <div
                        class="entry-content editor-content"
                        v-html="blog.content"
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
                        style="
                                                    color: #fff;
                                                    font-weight: 500;
                                                    font-size: 2rem;
                                                "
                        class="btn btn-primary"
                        to="/media/blogs"
                      >
                        Go to Blogs
                      </router-link>
                    </div>

                    <div class="widget">
                      <h3 class="widget-title">
                        Popular Posts
                      </h3>

                      <ul class="posts-list">
                        <li
                          v-for="blog in other_blogs"
                          :key="blog.id"
                        >
                          <figure>
                            <router-link
                              :to="
                                getBlogLink(
                                  blog.id,
                                  blog.name
                                )
                              "
                            >
                              <img
                                :src="
                                  '/storage/' +
                                    blog.main_image_path
                                "
                                :alt="blog.name"
                              />
                            </router-link>
                          </figure>

                          <div>
                            <h4>
                              <router-link
                                :to="
                                  getBlogLink(
                                    blog.id,
                                    blog.name
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
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, watchEffect } from 'vue';

import { useRoute } from 'vue-router';

import { useMeta } from '../../admin/composables/use-meta';
useMeta({ title: 'Blog Details' });

const route = useRoute();
const currentRoute = ref(route);

const blog = ref([]);
const other_blogs = ref([]);
const blog_id = ref(route.params.id ? parseInt(route.params.id) : 1);

// Fetch showrooms based on the current page
const fetchBlog = async () => {
    try {
        const response = await axios.get('/api/get-blog-details', {
            params: {
                blog_id: blog_id.value,
            },
        });
        blog.value = response.data.blog;
        other_blogs.value = response.data.other_blogs;
        useMeta({ title: blog.value.name + ' | Blog' });
    } catch (error) {
        console.error(error);
    }
};

const getBlogLink = (id, name) => {
    let transformedName = name.replace(/ /g, '-').replace(/\//g, '-');
    transformedName = transformedName.replace(/-+/g, '-');
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    transformedName = transformedName.toLowerCase();

    return `/media/blogs/${id}/${transformedName}`;
};

// Initial fetch of showrooms
onMounted(() => {
    fetchBlog();
});

watchEffect(() => {
    const params = route.params;
    const query = route.query;

    if (params.id !== '' && blog_id.value !== params.id) {
        blog_id.value = params.id ? parseInt(params.id) : 1;

        fetchBlog();
    }
});
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
