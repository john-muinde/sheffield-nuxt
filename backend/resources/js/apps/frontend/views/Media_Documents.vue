<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <h2 class="about-us-title">
                Brochures & Catalogs
              </h2>

              <router-link to="/media" class="btn btn-primary btn-round btn-shadow float-right">
                <i class="icon-long-arrow-left"></i>
                <span>Back to Media Center</span>
              </router-link>

              <p class="lead about-us-lead text-primary mb-1">
                Explore Our Brochures & Catalogs
              </p>

              <p class="about-us-text mb-2">
                Click on the documents to view
              </p>

              <ContentState v-if="loading" type="loading" content-type="Brochures & Catalogs" />
              <ContentState
                v-if="!brochures.length && !loading && error == null"
                type="empty"
                content-type="Brochures & Catalogs"
              />
              <ContentState
                v-if="!!error && !loading"
                type="error"
                :error-sub-message="error.message"
                content-type="Brochures & Catalogs"
                @retry="fetchMediaCenter"
              />

              <div
                v-show="brochures.length"
                id="dflip-books"
                ref="bookContainer"
                class="dflip-books row media-center"
              >
                <a
                  v-for="brochure in brochures"
                  :id="`df_${brochure.id}`"
                  :key="brochure.id"
                  :href="`/media/brochures#${brochure.slug}/`"
                  class="_df_thumb"
                  :data-slug="brochure.slug"
                  :data-title="brochure.name"
                  :data-df-option="`df_option_${brochure.id}`"
                  :thumb="brochure.thumb"
                >
                  {{ brochure.name }}
                </a>
              </div>
              <canvas ref="thumbnailCanvas" style="display: none"></canvas>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMediaDocuments } from '@/composables/documents';
import ContentState from '@/Components/ContentState.vue';
import { onBeforeRouteLeave } from 'vue-router';

// Initialize with custom options
const {
    processDocuments,
    initializeDflip,
    documents: brochures,
    loading,
    error,
    handleRouteLeave,
} = useMediaDocuments({
    thumbnailScale: 0.4,
    enableDflip: true,
});

// Fetch function for media center
const fetchMediaCenter = async () => {
    const response = await axios.get('/api/get-media-center');
    return response.data.brochures;
};

// Fetch and process documents
onMounted(async () => {
    await processDocuments(fetchMediaCenter);
    initializeDflip();
});

onBeforeRouteLeave(handleRouteLeave);
</script>

<style>
/* Styles remain unchanged */
._df_thumb {
    width: 240px;
    height: 360px;
}

.df-sheet .df-page:before {
    opacity: 0.5;
}

section.linkAnnotation a,
a.linkAnnotation,
.buttonWidgetAnnotation a,
a.customLinkAnnotation,
.customHtmlAnnotation,
.customVideoAnnotation,
a.df-autolink {
    background-color: #ff0;
    opacity: 0.2;
}

section.linkAnnotation a:hover,
a.linkAnnotation:hover,
.buttonWidgetAnnotation a:hover,
a.customLinkAnnotation:hover,
.customHtmlAnnotation:hover,
.customVideoAnnotation:hover,
a.df-autolink:hover {
    background-color: #2196f3;
    opacity: 0.5;
}

.df-icon-play-popup:before {
    background-color: rgb(51, 133, 209);
}

.df-icon-play-popup:before {
    color: #fff;
}

.df-lightbox-bg {
    opacity: 0.8;
}

.df-lightbox-wrapper .df-bg {
    background-color: transparent;
}

.df-container.df-transparent.df-fullscreen {
    background-color: #eee;
}
</style>
