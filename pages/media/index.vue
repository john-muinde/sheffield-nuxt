<template>
    <div>
        <main class="main">
            <div class="page-content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 offset-lg-1 mb-3">
                            <h2 class="about-us-title">
                                Media Center
                            </h2>
                            <!-- End .title -->
                            <p class="lead about-us-lead text-primary mb-1">
                                Immerse Yourself in our Media Showcase
                            </p>

                            <p>
                                Welcome to Our Media Center, a hub of
                                captivating multimedia content regularly updated
                                with new and exciting news so there's always
                                something to discover About Sheffield. Check
                                back often to stay updated.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-md-10 offset-lg-1 justify-content-center media-center-section">
                            <div class="row about-team-container about-team-container1 justify-content-center">
                                <div class="col-md-4 mt-2 mb-2">
                                    <router-link to="/media/blogs">
                                        <div class="about-team">
                                            <div class="about-team-white">
                                                <img src="/assets/images/media/media_blogs.jpg" />
                                            </div>
                                            <div class="details">
                                                <div class="name">
                                                    Blogs
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>

                                <div class="col-md-4 mt-2 mb-2">
                                    <router-link to="/media/in-the-news">
                                        <div class="about-team">
                                            <div class="about-team-white">
                                                <img src="/assets/images/media/media_in_the_news.jpg" />
                                            </div>
                                            <div class="details">
                                                <div class="name">
                                                    In The News
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>

                                <div class="col-md-4 mt-2 mb-2">
                                    <router-link to="/media/videos">
                                        <div class="about-team">
                                            <div class="about-team-white">
                                                <img src="/assets/images/media/media_video.jpg" />
                                            </div>
                                            <div class="details">
                                                <div class="name">
                                                    Videos
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>

                                <div class="col-md-4 mt-2 mb-2">
                                    <router-link to="/media/newsletters">
                                        <div class="about-team">
                                            <div class="about-team-white">
                                                <img src="/assets/images/media/media_newsletters.jpg" />
                                            </div>
                                            <div class="details">
                                                <div class="name">
                                                    Newsletters
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>

                                <div class="col-md-4 mt-2 mb-2">
                                    <router-link to="/media/brochures-and-catalogs">
                                        <div class="about-team">
                                            <div class="about-team-white">
                                                <img src="/assets/images/media/media_documents.jpg" />
                                            </div>
                                            <div class="details">
                                                <div class="name">
                                                    Brochures & Catalogs
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>

                                <div class="col-md-4 mt-2 mb-2">
                                    <router-link to="/media/gallery">
                                        <div class="about-team">
                                            <div class="about-team-white">
                                                <img src="/assets/images/media/media_gallery.jpg" />
                                            </div>
                                            <div class="details">
                                                <div class="name">
                                                    Gallery
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
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

useHead({
    title: 'Media Center',
    meta: [
        {
            name: 'description',
            content: 'Welcome to Our Media Center, a hub of captivating multimedia content regularly updated with new and exciting news so there\'s always something to discover About Sheffield. Check back often to stay updated.'
        },
        {
            name: 'keywords',
            content: 'Media Center, Blogs, In The News, Videos, Newsletters, Brochures & Catalogs, Gallery'
        }
    ]
});

const blogs = ref([]);
const brochures = ref([]);
const newsletters = ref([]);
const videos = ref([]);

const fetchMediaCenter = async () => {
    try {
        const response = await axios.get('/api/get-media-center', {});

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
    //fetchMediaCenter();
});
</script>

<style type="text/css">
.media-center .about-us-lead {
    font-size: 3rem !important;
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

/* start */

.about-team {
    position: relative;
    width: 100%;
    padding: 4.2%;
    border-radius: 50%;
    background: linear-gradient(256deg, #c02434 14.71%, transparent 36.89%),
        linear-gradient(106deg, #c02434 11.34%, transparent 42.02%);
}

.about-team-white {
    margin: 0.8%;
    border: 15px solid #ffffff;
    border-radius: 50%;
    background-color: #ffffff;
}

.about-team img {
    filter: grayscale(100%);
    background: transparent;
    display: block;
    box-shadow: 0 0 20px 1px #000;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.details {
    position: absolute;
    margin-top: -15%;
    background-color: #ffffff;
    padding-left: 15px;
    padding-top: 8px;
    min-height: 80px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 10px;
    width: 87%;
    line-height: 1.8rem;
    margin-left: 10%;
}

.details .name {
    font-weight: 550;
    color: #c02434;
    font-size: 1.7rem;
}

.details .job-title {
    padding-top: 5px;
    font-weight: 500;
    color: #162d60;
    font-size: 1.5rem;
    font-style: italic;
}

.details .job-title {
    font-size: 1.3rem;
}

.description {
    display: none;
    position: absolute;
    background-color: #fff;
    padding: 15px;
    top: 0;
    z-index: 10;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.about-team-container .description-text-right {
    margin-right: -160%;
    margin-left: 95% !important;
    margin-top: 30% !important;
}

.about-team-container2 .description-text-right {
    margin-right: -250% !important;
    margin-left: 95% !important;
    margin-top: 30% !important;
}

.about-team-container .description-text-left {
    margin-right: 95%;
    margin-left: -160%;
    margin-top: 30%;
}

.about-team-container2 .description-text-left {
    margin-right: 95%;
    margin-left: -250% !important;
    margin-top: 30%;
}

.about-team:hover img {
    filter: none;
    /* Remove the grayscale filter on hover */
    position: relative;
    z-index: 17;
}

.about-team:hover .description {
    display: block;
    z-index: 19;
}

.about-team:hover .details {
    z-index: 18;
    background-color: #c02434;
}

.about-team:hover .name {
    color: #ffffff;
}

.media-center-section .details {
    text-align: center !important;
    padding-left: 0px !important;
    min-height: 0px !important;
    margin-top: 0% !important;
    border: 0.5px solid #cccccc !important;
    margin-left: 2% !important;
}

/* end */

@media only screen and (min-width: 769px) {
    .media-center-section .about-team-container1 {
        width: 85%;
        margin-left: 7.5%;
    }
}
</style>