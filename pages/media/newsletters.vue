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

                            <router-link to="/media" class="btn btn-primary btn-round btn-shadow float-right">
                                <i class="icon-long-arrow-left"></i>
                                <span>Back to Media Center</span>
                            </router-link>

                            <p class="lead about-us-lead text-primary mb-1">
                                Explore Our Newsletters
                            </p>

                            <p class="about-us-text mb-2">
                                Click on the documents to view
                            </p>

                            <ContentState v-if="loading" type="loading" content-type="NewsLetters" />
                            <ContentState v-if="!newsletters.length && !loading && error == null" type="empty"
                                content-type="NewsLetters" />
                            <ContentState v-if="!!error && !loading" type="error" :error-sub-message="error.message"
                                content-type="NewsLetters" @retry="fetchMediaCenter" />

                            <div v-show="newsletters.length" id="dflip-books" ref="bookContainer"
                                class="dflip-books row media-center">
                                <a v-for="newsletter in newsletters" :id="`df_${newsletter.id}`" :key="newsletter.id"
                                    :href="`/media/newsletters#${newsletter.slug}/`" class="_df_thumb"
                                    :data-slug="newsletter.slug" :data-title="newsletter.name"
                                    :data-df-option="`df_option_${newsletter.id}`" :thumb="newsletter.thumb">
                                    {{ newsletter.name }}
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
import { onBeforeRouteLeave } from 'vue-router';
const { api } = useAxios();

// Initialize with custom options
const {
    processDocuments,
    initializeDflip,
    documents: newsletters,
    loading,
    error,
    handleRouteLeave,
} = useMediaDocuments({
    thumbnailScale: 0.4,
    enableDflip: true,
});

// Fetch function for media center
const fetchMediaCenter = async () => {
    const response = await api.get('/api/get-media-center');
    return response.data.newsletters;
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