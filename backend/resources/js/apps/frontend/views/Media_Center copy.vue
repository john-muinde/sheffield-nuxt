<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1 mb-5">
              <h2 class="about-us-title">
                Media Center
              </h2><!-- End .title -->
              <p class="lead about-us-lead text-primary mb-1">
                Immerse Yourself in our Media Showcase
              </p>

              <p>Welcome to Our Media Center, a hub of captivating multimedia content regularly updated with new and exciting news so there's always something to discover About Sheffield. Check back often to stay updated.</p>
            </div>
          </div>
        </div>

        <div class="container bg-my-grey">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <div class="row media-center">
                <div class="col-lg-12 mt-4">
                  <p class="lead about-us-lead text-primary mb-2">
                    <router-link to="/media/blogs">
                      Blogs
                    </router-link>

                    <router-link style="right: 0; position: absolute;" class="btn btn-primary pull-right" to="/media/blogs">
                      View More Blogs
                    </router-link>
                  </p>

                  <section class="position-relative overflow-hidden py-20">
                    <div class="container">
                      <div class="row mb-10">
                        <div v-for="blog in blogs" :key="blog.id" class="col-12 col-md-6 col-lg-3 mb-2 blog-item">
                          <div class="p-6 border rounded">
                            <div class="position-relative mb-2" style="height: 216px;">
                              <router-link :to="getBlogLink(blog.id, blog.name)">
                                <img
                                  class="w-100 h-100 rounded"
                                  style="object-fit: cover;"
                                  :src="'/storage/' + blog.main_image_path"
                                  :alt="blog.name"
                                />
                              </router-link>
                            </div>


                                             
                            <h2 class="mb-1 h5 px-4"> 
                              <router-link :to="getBlogLink(blog.id, blog.name)">
                                {{ blog.name }} 
                              </router-link>
                            </h2>
                            <p class="mb-1 text-muted px-4 entry-content">
                              {{ getFirstParagraph(blog.content) }}
                            </p>


                            <router-link class="btn btn-primary ml-4 mt-2 mb-2" :to="getBlogLink(blog.id, blog.name)">
                              Read More <i class="icon-long-arrow-right"></i>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <div class="row media-center">
                <div id="brochures-and-newsletters" class="col-lg-12 mt-2">
                  <p class="lead about-us-lead text-primary mb-0">
                    <router-link to="/media#brochures-and-newsletters">
                      Brochures & Newsletters
                    </router-link>
                  </p>

                  <div class="row">
                    <div class="col-lg-5">
                      <div class="mt-2">
                        <h4>Brochures</h4>

                        <ul class="ul-pdf-view">
                          <li v-for="brochure in brochures" :key="brochure.id">
                            <img src="/assets/images/pdf.png" />
                            <a target="_blank" :href="'/storage/' + brochure.publication_file">
                              {{ brochure.name }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="col-lg-5 offset-lg-2">
                      <div class="mt-2">
                        <h4>Newsletters</h4>

                        <ul class="ul-pdf-view">
                          <li v-for="brochure in newsletters" :key="brochure.id">
                            <img src="/assets/images/pdf.png" />
                            <a target="_blank" :href="'/storage/' + brochure.publication_file">
                              {{ brochure.name }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>


                <div id="videos" class="col-lg-12 mt-2">
                  <p class="lead about-us-lead text-primary mb-0">
                    <router-link to="/media#videos">
                      Videos
                    </router-link>
                  </p>

                  <div class="row">
                    <div v-for="video in videos" :key="video.id" class="col-lg-4 mt-2">
                      <div style="background-color: #000; height: 100%">
                        <video
                          style="width:100%; height: 100%;"
                          controls
                          :src="'/storage/' + video.file_path"
                          type="video/mp4"
                        >
                                                
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
    import { ref, computed, watch, onMounted, watchEffect } from 'vue';
    // import axios from "axios";
    import { useRoute } from 'vue-router';
    import { useMeta } from '../../admin/composables/use-meta';

    useMeta({ title: 'Media Center' });

    const blogs = ref([]);
    const brochures = ref([]);
    const newsletters = ref([]);
    const videos = ref([]);

    const fetchMediaCenter = async () => {

        try {
          const response = await axios.get('/api/get-media-center', {
           
          });
         
          blogs.value = response.data.blogs;
          videos.value = response.data.videos;
          newsletters.value = response.data.newsletters;
          brochures.value = response.data.brochures;
          
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

    const getFirstParagraph = (content) => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = content;

      const paragraphs = tempElement.querySelectorAll('p');

      for (const paragraph of paragraphs) {
        const textContent = paragraph.textContent.trim();
        if (textContent.length > 50) {

            if (textContent.length > 150) {
              return textContent.slice(0, 150) + '...';
            } else {
              return textContent;
            }
        }
      }

      return '';
    };

    onMounted(() => {
        fetchMediaCenter();
    });





</script>

<style type="text/css">
    .media-center .about-us-lead {
        font-size: 3.0rem !important;
        font-weight: 550;
    }

    .entry-content p {
        font-size: 1.4rem;
        color: #666;
    }

    .ul-pdf-view li {
        display: flex;
        background-color: #555;
        margin-top: 1.4rem;
        padding: 0.8rem;
        border-radius: 10px;
        box-shadow: -3px 4px 9px 1px #4c4c4c;
    }
    .ul-pdf-view li a {
        font-size: 1.4rem;
        padding-left: 0.9rem;
        padding-right: 0.9rem;
        color: #ffffff;
        font-weight: 450;
        width: 100%;
        height: 100%;
    }

    .ul-pdf-view li img {
        width: 25px;
        height: auto;
    }

    .rounded {

        height: 100%;
    }

    .blog-item p {
        font-size: 1.5rem;
    }

    .bg-my-grey {
        background-color: #eeeeee;
        max-width: 100% !important;
    }
    

    .bg-my-grey .rounded {
        background-color: #ffffff;
    }

</style>