<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <h2 class="about-us-title">
                Newsletters
              </h2>
              <!-- End .title -->

              <router-link to="/media" class="btn btn-primary btn-round btn-shadow float-right">
                <i
                  class="icon-long-arrow-left"
                ></i><span>Back to Media Center</span>
              </router-link>

              <p class="lead about-us-lead text-primary mb-1">
                Explore Our Newsletters
              </p>

              <p class="about-us-text mb-2">
                Click on the documents to view
              </p>

              <!--Button Lightbox Usage-->
              <div class="_df_button" source="/example.pdf">
                Intro Book
              </div>

              <!--Thumbnail Lightbox Usage Images-->
              <div class="_df_thumb" source="/example.pdf" thumb="/thumbs/intro.jpg">
                Intro Book
              </div>

              <ContentState v-if="loading" type="loading" content-type="NewsLetters" />
              <ContentState
                v-if="!newsletters.length && !loading"
                type="empty"
                content-type="NewsLetters"
              />
              <ContentState v-if="!!error" type="error" content-type="NewsLetters" />

              <div v-if="newsletters.length" class="row media-center">
                <div class="col-lg-9">
                  <VuePdfApp style="height: 100vh" :pdf="currentDocument" />
                </div>

                <aside class="col-lg-3 aside-documents">
                  <div class="sidebar">
                    <div class="widget widget-cats">
                      <!--  <h3 class="widget-title"><b>Newsletters</b></h3> -->
                      <ul class="ul-pdf-view-documents">
                        <li
                          v-for="newsletter in newsletters"
                          :key="newsletter.id"
                          @click="
                            loadDocument(
                              '/storage/' +
                                newsletter.publication_file,
                              newsletter.id
                            )
                          "
                        >
                          <a
                            :class="{
                              'active-document':
                                isActive(
                                  newsletter.id
                                ),
                            }"
                            href="#"
                          >
                            <img src="/assets/images/pdf.png" />

                            <span>
                              {{ newsletter.name }}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <!-- End .widget -->
                  </div>
                </aside>
              </div>
            </div>
          </div>
          <!-- End .row -->
        </div>
        <!-- End .container -->
      </div>
      <!-- End .page-content -->
    </main>
    <!-- End .main -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ContentState from '@/Components/ContentState.vue';
import { useMeta } from '../../admin/composables/use-meta';

import VuePdfApp from 'vue3-pdf-app';
import 'vue3-pdf-app/dist/icons/main.css';

useMeta({ title: 'Newsletters | Media Center' });

const newsletters = ref([]);

const loading = ref(false);
const error = ref(null);

// Fetch products based on the current page
const fetchMediaCenter = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/get-media-center', {});
        newsletters.value = response.data.newsletters;
        loading.value = false;
    } catch (error) {
        loading.value = false;
        error.value = error;
        console.error(error);
    }
};

onMounted(() => {
    fetchMediaCenter();
});

const currentDocument = ref(null);

const selectedNewsletterId = ref(null);

const loadDocument = (documentPath, newsletterId) => {
    currentDocument.value = documentPath;
    selectedNewsletterId.value = newsletterId;
};

const isActive = (newsletterId) => {
    return selectedNewsletterId.value === newsletterId;
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
    .blogs .entry-list .entry-media {
        max-height: 190px;
        overflow: hidden;
    }

    .blogs .entry-title {
        font-size: 2.3rem;
    }
}

.posts-list li {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
}

.ul-pdf-view-documents li {
    display: flex;
    /*background-color: #555;*/
    /*margin-top: 1.4rem;*/
    /*padding: 0.8rem;*/
    /*border-radius: 10px;*/
    /*box-shadow: -3px 4px 9px 1px #4c4c4c;*/
}

.ul-pdf-view-documents li a {
    display: flex;
    font-size: 1.4rem;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
    color: #000000;
    font-weight: 450;
    width: 100%;
    height: 100%;
}

.ul-pdf-view-documents li .active-document {
    background-color: #000000 !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
}

.ul-pdf-view-documents li .active-document span {
    color: #ffffff !important;
}

.ul-pdf-view-documents li span {
    font-size: 1.4rem;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
    color: #000000;
    font-weight: 450;
    width: 100%;
    height: 100%;
}

.ul-pdf-view-documents li img {
    width: 30px !important;
    height: 30px !important;
}

.aside-documents {
    max-height: 100vh;
    overflow-y: auto;
    background-color: #f2efef;
    padding-top: 20px;
    padding-bottom: 20px;
}

.aside-documents::-webkit-scrollbar {
    width: 9px;
    /* Adjust the width as needed */
}

.aside-documents::-webkit-scrollbar-thumb {
    background-color: #888;
    /* Color of the scrollbar thumb */
}

.aside-documents::-webkit-scrollbar-track {
    background-color: #eee;
    /* Color of the scrollbar track */
}
</style>
