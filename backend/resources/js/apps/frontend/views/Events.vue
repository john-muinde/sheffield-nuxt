<template>
  <main class="main">
    <div class="page-content pg-white who-we-are-section pb-1">
      <div class="overlay"></div>

      <div class="pt-1 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <h2 class="about-us-title">
                Events
              </h2>
              <!-- End .title -->
              <p class="lead about-us-lead text-primary mb-1">
                Elevate Skills, Amplify Visibility
              </p>
            </div>
            <div class="col-lg-10 offset-lg-1">
              <p style="about-us-p" class="text-5 about-us-p">
                Sheffield hosts events at the Sheffield Academy and Our Facility based on
                the theme of experiential sessions so that you can interact with our
                solutions and network with like-minded industry players.<br />
                Some of the events include:
              </p>
            </div>

            <div class="col-lg-10 offset-lg-1">
              <div class="row justify-content-left links-container mt-3">
                <div class="event-item">
                  <div class="event-image">
                    <img src="/assets/images/events/training.png" />
                  </div>

                  <div class="event-text mt-2">
                    <p>Product and Solutions Focus Business Training</p>
                  </div>
                </div>

                <div class="event-item">
                  <div class="event-image">
                    <img src="/assets/images/events/client_demos.png" />
                  </div>

                  <div class="event-text mt-2">
                    <p>Client Dedicated Demos</p>
                  </div>
                </div>

                <div class="event-item">
                  <div class="event-image">
                    <img src="/assets/images/events/product_launch.png" />
                  </div>

                  <div class="event-text mt-2">
                    <p>New Product Launches</p>
                  </div>
                </div>

                <div class="event-item">
                  <div class="event-image">
                    <img src="/assets/images/events/live_cooking.png" />
                  </div>

                  <div class="event-text mt-2">
                    <p>
                      The Rational Live Cooking sessions that take place twice a month
                    </p>
                  </div>
                </div>

                <div class="event-item">
                  <div class="event-image">
                    <img src="/assets/images/events/chef_competitions.png" />
                  </div>

                  <div class="event-text mt-2">
                    <p>Chefs Competitions</p>
                  </div>
                </div>

                <div class="event-item">
                  <div class="event-image">
                    <img src="/assets/images/events/partner_training.png" />
                  </div>

                  <div class="event-text mt-2">
                    <p>Partner training and Demos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content pg-white">
      <div class="mb-lg-8 pb-4">
        <div class="container-fluid pb-4 pt-4 mb-5">
          <div class="row">
            <div class="col-md-10 offset-lg-1">
              <h2 class="about-us-title mb-5">
                Upcoming Events
              </h2>

              <div class="row justify-content-left">
                <div>
                  <!--  <button @click="showSingle">Show single picture.</button> -->
                  <!--  <button @click="showMultiple">Show a group of pictures.</button> -->

                  <!-- all props & events -->
                  <vue-easy-lightbox
                    esc-disabled
                    :visible="visible"
                    :imgs="imgs"
                    :index="indexRef"
                    @hide="handleHide"
                  />
                </div>

                <div v-for="event in events" :key="event.id" class="col-sm-6 col-lg-4">
                  <article class="entry entry-grid">
                    <figure class="entry-media">
                      <!-- <router-link
                                            :to="
                                                getEventLink(
                                                    event.id,
                                                    event.name
                                                )
                                            "
                                        > -->
                      <img
                        style=""
                        :src="'/storage/' + event.main_image_path"
                        alt="image desc"
                        @click="showSingle(event.main_image_path)"
                      />
                      <!--  </router-link> -->
                    </figure>
                    <!-- End .entry-media -->

                    <div class="entry-body pt-1">
                      <h2 class="entry-title">
                        <!-- <router-link
                                                :to="
                                                    getEventLink(
                                                        event.id,
                                                        event.name
                                                    )
                                                "
                                                > -->
                        {{ event.name }}
                        <!-- </router-link
                                            > -->
                      </h2>
                      <!-- End .entry-title -->

                      <div class="entry-content text-left">
                        <p>
                          <i class="icon-map-marker"></i>

                          <span class="ml-3"> {{ event.location }}</span>
                          <br />
                          <i class="icon-calendar"></i>

                          <span class="ml-3"> {{ event.start_date }}</span>
                        </p>

                        <a
                          class="btn btn-primary btn-round mt-2"
                          :href="event.url"
                          target="_blank"
                          style="bottom: 0px;"
                        >
                          Register
                        </a>

                        <!-- <router-link
                                                :to="
                                                    getEventLink(
                                                        event.id,
                                                        event.name
                                                    )
                                                "
                                                class="btn btn-outline-primary"
                                                ><span>View More</span
                                                ><i class="icon-long-arrow-right"></i
                                            ></router-link> -->
                      </div>
                      <!-- End .entry-content -->
                    </div>
                    <!-- End .entry-body -->
                  </article>
                  <!-- End .entry -->
                </div>
                <!-- End .col-lg-3 -->
              </div>
              <!-- End .row -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, nextTick, watch } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import { useMeta } from '../../admin/composables/use-meta';
useMeta({ title: 'Events' });

const rootUrl = window.location.protocol + '//' + window.location.host;
const imgs = ref([]);

const showSingle = (image) => {
    imgs.value = rootUrl + '/storage/' + image;
    show();
};

const visible = ref(false);
const indexRef = ref(0);
const show = () => {
    indexRef.value = 0;
    visible.value = true;
};

const handleHide = () => {
    visible.value = false;
};

const getEventLink = (id, name) => {
    let transformedName = name.replace(/ /g, '-');
    transformedName = transformedName.replace(/-+/g, '-');
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    transformedName = transformedName.toLowerCase();

    return `/events/${id}/${transformedName}`;
};

//events

const events = ref([]);

// Fetch products based on the current page
const fetchEvents = async () => {
    try {
        const response = await axios.get('/api/get-events', {});
        events.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    fetchEvents();
});
</script>

<style>
.who-we-are-section {
    /* background-image: url("/assets/images/events_page1.jpg"); */
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    width: 100%;
    /*height: 100vh;*/
    z-index: 0;
}

.overlay {
    position: absolute !important;
    background-color: rgb(255 255 255 / 92%) !important;
}

.headings .heading {
    color: #ffffff !important;
    background: linear-gradient(56deg, #c02434 23.87%, transparent 62.27%);
    padding: 5px;
}

:root {
    --bg: #fdfdfd;
    --highlight1: #162d60;
    --highlight2: #162d60;
    --color: #1a1e24;
}

.list {
    list-style: none;
    width: 600px;
    max-width: 90%;
}

.about-us-title {
    position: relative;
    display: inline-block;
    color: #c02434;
    font-size: 3.9rem;
    font-weight: 600;
}

.about-us-title:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    margin-top: 10px;
    margin-left: 4px;
    width: 70%;
    height: 2px;
    background: #c02434;
}

.about-us-lead {
    font-size: 1.6rem !important;
    color: #304296 !important;
}

.about-us-p {
    font-size: 1.5rem !important;
    font-weight: 450;
    color: #555;
}

.item {
    display: block;
    clear: both;
    counter-increment: list;
    /*padding-bottom: 4rem;*/
    font-size: 1.6rem;
    line-height: 1.375;
    position: relative;
}

.item:before {
    font-size: 2rem;
    content: counter(list);
    width: 3.1rem;
    height: 3.1rem;
    float: left;
    margin: 0 1.5rem 0.75rem 0;
    color: var(--bg);
    background: var(--highlight1) linear-gradient(to bottom right, var(--highlight1) 25%, var(--highlight2));
    text-shadow: 0 0 2px var(--highlight1);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    shape-outside: ellipse();
}

.item:after {
    width: 1.7rem;
    height: 1.7rem;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background: var(--highlight1);
    z-index: -1;
    border-top-left-radius: 3px;
}

.graduate-trainee-program {
    margin-left: 30px;
}

.graduate-trainee-program i {
    padding-right: 10px;
    color: #c02434;
}

/* Demo styles */

.event-item {
    width: 31.2%;
    border: 2px solid #c02434;
    margin: 0.5%;
    padding: 15px;
    border-radius: 40px;
    border-bottom: 6px solid #c02434;
}

.event-description {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    color: #304296;
    font-size: 1.8rem;
    font-weight: 550;
}

.event-text p {
    padding-bottom: 30px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.55rem !important;
    font-weight: 450;
}

.event-image img {
    width: 25%;
    padding: 5px;
    filter: invert(20%) sepia(63%) saturate(3227%) hue-rotate(337deg) brightness(88%) contrast(94%);
}

.event-image {
    display: flex;
    justify-content: center;
}

.event-description {
    display: flex;
    justify-content: center;
}

.start-event-item {
    padding: 0px;
    overflow: hidden;
}

.event-text {
    display: flex;
    justify-content: center;
    text-align: center;
}

.last-event-item {
    padding: 0px;
    overflow: hidden;
}

@media (max-width: 767px) {
    .event-item {
        width: 100%;
        margin-bottom: 15px;
    }
}
</style>
