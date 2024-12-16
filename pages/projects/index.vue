<template>
  <main class="main">
    <!-- style="background-image: url(/assets/images/projects_sheffield.jpg)" -->
    <div class="my-projects-banner bg-image text-center">
      <div class="container justify-content-center mt-2 mb-1">
        <div class="row">
          <div class="col-lg-12 mb-2">
            <div class="my-page-header">
              <span>Project References</span>
            </div>
          </div>

          <div class="col-lg-12 my-projects-section justify-content-center">
            <div class="my-projects-carousel">
              <carousel
                ref="scrollableContainerCarosel"
                v-model="currentSlide"
                class="carousel-wrapper"
                :per-page="1"
                :breakpoints="breakpoints"
                :wrap-around="true"
                :pause-autoplay-on-hover="true"
              >
                <slide
                  v-for="(item, index) in projectsMenu"
                  :key="index"
                  data-toggle="tab"
                  :href="'#' + item.title"
                  role="tab"
                  :aria-controls="item.title"
                  aria-selected="false"
                >
                  <div class="carousel-div-image" @click="slideTo(index)">
                    <img :src="item.image" :alt="item.alt" />

                    <div class="project-section-header">
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                </slide>
                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </carousel>
            </div>
          </div>

          <div class="col-lg-12 tab-content mt-5 mb-5 pb-5">
            <!-- <div v-for="(item, index) in projects" :key="index" class="tab-pane p-0 fade" id="top-fur-tab" role="tabpanel" aria-labelledby="top-fur-link">
  
                          </div> -->

            <div
              v-for="(segment, segmentIndex) in segmentsData"
              :id="segment.name"
              :key="segmentIndex"
              class="tab-pane p-0 fade"
              :class="{ 'show active': segment.name === 'Hotels' }"
              role="tabpanel"
              :aria-labelledby="segment.name"
            >
              <div class="main-clients">
                <div class="clients-container mb-5 row">
                  <div class="col-md-10 offset-lg-1">
                    <div class="row justify-content-center projects-row">
                      <div
                        v-for="(project, projectIndex) in segment.projects"
                        :key="projectIndex"
                        class="col-md-2"
                      >
                        <article class="">
                          <figure class="">
                            <img
                              :src="assetsSync(project.main_image_path)"
                              alt="image desc"
                            />
                          </figure>
                          <!-- End .entry-media -->
                        </article>
                        <!-- End .entry -->
                      </div>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, nextTick, watch } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";

useHead({
  title: "Projects",
  meta: [
    { name: "description", content: "Find out more about our projects" },
    { name: "keywords", content: "Projects" },
    { property: "og:title", content: "Projects" },
    { property: "og:description", content: "Find out more about our projects" },
    { property: "og:image", content: "/assets/images/projects_sheffield.jpg" },
    { property: "og:url", content: "/projects" },
  ],
  link: [{ rel: "canonical", href: "/projects" }],
});

const breakpoints = {
  0: {
    itemsToShow: 2,
    snapAlign: "start",
  },
  480: {
    itemsToShow: 2,
    snapAlign: "start",
  },
  768: {
    itemsToShow: 3.5,
    snapAlign: "start",
  },
  992: {
    itemsToShow: 3.5,
    snapAlign: "start",
  },
  1200: {
    itemsToShow: 5,
    snapAlign: "start",
  },
};

const getProjectLink = (id, name) => {
  let transformedName = name.replace(/ /g, "-");
  transformedName = transformedName.replace(/-+/g, "-");
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  transformedName = transformedName.toLowerCase();

  return `/project/${id}/${transformedName}`;
};

//projects

const projects = ref([]);
const segmentsData = ref([]);

const { api, API_URL } = useAxios();

// Fetch products based on the current page
const fetchProjects = async () => {
  try {
    const response = await api.get("/api/get-clients", {});
    projects.value = response.data;

    segmentsData.value = segmentedProjects();
  } catch (error) {
    console.error(error);
  }
};

const segmentedProjects = () => {
  const segments = {};

  // Group projects by segment
  projects.value.forEach((project) => {
    const segmentName = project.segment;

    if (!segments[segmentName]) {
      segments[segmentName] = {
        name: segmentName,
        projects: [],
      };
    }

    segments[segmentName].projects.push(project);
  });

  // Convert the segments object into an array
  return Object.values(segments);
};

const projectsMenu = [
  {
    image: "/assets/images/projects/hotel.png",
    title: "Hotels",
  },
  {
    image: "/assets/images/projects/restaurant.png",
    title: "Restaurants",
  },
  {
    image: "/assets/images/projects/coffee-shop.png",
    title: "Coffee Shops",
  },
  {
    image: "/assets/images/projects/retail.png",
    title: "Retail",
  },
  {
    image: "/assets/images/projects/corporate.png",
    title: "Corporates",
  },
  {
    image: "/assets/images/projects/institutions.png",
    title: "Institutions",
  },
  {
    image: "/assets/images/projects/hospital.png",
    title: "Healthcare",
  },
];

const currentSlide = ref(0);

const slideTo = (val) => {
  currentSlide.value = val;
};

watch(currentSlide, (newIndex, oldIndex) => {
  const selectedItem = projectsMenu[newIndex];
  const selectedTitle = selectedItem.title;

  const tabPanes = document.querySelectorAll(".tab-pane");
  tabPanes.forEach((pane) => {
    pane.classList.remove("active");
    pane.classList.remove("show");
  });

  const selectedElement = document.getElementById(selectedTitle);
  if (selectedElement) {
    selectedElement.classList.add("active");
    selectedElement.classList.add("show");
  }
});

onMounted(async () => {
  fetchProjects();
});
</script>

<style lang="scss">
.entry-container {
  column-count: 3;
  column-gap: 20px 20px;
  width: 100%;
  /* Adjust the gap between items as needed */
}

.entry-item {
  float: none;
  padding: 0 2px;
}

/* Style for the .masonry-item elements */
.entry-grid {
  margin: 0;
  display: inline-block;
  margin-bottom: 0px;
}

.entry-grid .entry-title {
  font-size: 1.5rem;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  color: #012e66;
}

:root {
  --delay-increment: 1s;
}

.entry-item {
  opacity: 0;
  transform: translateX(100%);
  animation: slideFromRight 0.5s ease forwards;
}

@keyframes slideFromRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

$delay-increment: 0.1s;

@for $i from 1 through 10 {
  // Adjust the range as needed
  .entry-item:nth-child(#{$i}) {
    animation-delay: calc(#{$delay-increment} * (#{$i} - 1));
  }
}

.entry-item:hover {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.entry-item {
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.entry-item {
  background-color: #fefefe;
  padding: 15px;
}

.entry-media img {
  transition: transform 2.3s;
  /* Add a smooth transition effect */
}

.entry-media img:hover {
  transform: scale(1.2);
  /* Zoom in the image by 20% on hover */
}

.entry-content img {
  max-width: 20%;
}

.entry-body {
  z-index: 999;
}

.entry-media {
  overflow: hidden;
}

.my-projects-banner {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  overflow: hidden;
}

.my-projects-carousel .carousel-div-image img {
  filter: invert(67%) sepia(1%) saturate(0%) hue-rotate(17deg) brightness(89%)
    contrast(85%);
  padding-left: 25px;
  padding-right: 25px;
}

.my-projects-carousel .carousel__slide {
}

.my-projects-carousel .carousel__slide--active {
}

.carousel__prev,
.carousel__next {
  background: white !important;
  width: 50px;
  height: 50px;
}

.carousel__icon {
  width: 35px;
  height: 35px;
}

.my-projects-carousel .carousel__slide--active img {
  filter: brightness(0.9) invert(1) sepia(0) hue-rotate(0deg) saturate(0);
  padding-left: 25px;
  padding-right: 25px;
}

.my-projects-carousel .carousel__slide span:after {
  content: "";
  position: absolute;
  left: 20%;
  right: 20%;
  top: 80%;
  margin-top: 10px;
  margin-left: 4px;
  width: 56%;
  height: 2px;
  background: #949494;
}

.my-projects-carousel .carousel__slide--active span:after {
  content: "";
  position: absolute;
  left: 20%;
  right: 20%;
  top: 80%;
  margin-top: 10px;
  margin-left: 4px;
  width: 56%;
  height: 2px;
  background: #ffffff;
}

.my-projects-carousel .carousel__slide--active span {
  color: #ffffff;
}

.project-section-header {
  padding-top: 15px;
}

.project-section-header span {
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 30px;
}

.my-projects-section {
  display: flex;
}

.my-projects-carousel {
  width: 60%;
}

.my-projects-carousel .carousel-div-image {
  height: auto;
  background-color: #ffffff;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 25px;
  margin-left: 7.5px;
  margin-right: 7.5px;
}

.my-projects-carousel .carousel__slide--active .carousel-div-image {
  background-color: #c02435;
  margin-top: -10px;
  margin-bottom: -10px;
}

.carousel__slide {
}

.carousel__slide--active {
}

.carousel__pagination {
  margin-bottom: -25px;
}

.main-clients {
  /*display:flex;*/
  /*--s: 186px; */
  /*--m: 5px;  */
  /*--r: calc(var(--s) + 4*var(--m) - 2px);*/
}

.clients-container {
  /*font-size: 0;  */
}

.clients-container div {
  /*width: var(--s);*/
  /*margin: var(--m);*/
  /*height: var(--s);*/
  /*display: inline-block;*/
  /*font-size:initial;*/
  /*clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);*/
  /*background: #ffffff;*/
  /*margin-bottom: calc(var(--m) - var(--s)*0.5);*/
  /*border-left: 1px solid black;*/
  /*justify-content: center; */
  /*    align-items: center;*/
}

.clients-container::before {
  /*content: "";*/
  /*width: calc(var(--s)/2 + var(--m));*/
  /*float: left;*/
  /*height: 140%;*/
  /*shape-outside: repeating-linear-gradient(
                     #0000 0 calc(var(--r) - 3px),
                     #000  0 var(--r));*/
}

.clients-container div img {
  max-width: 100%;
  width: 100%;
}

@media (max-width: 767px) {
  .main-clients {
    --s: 359px;
  }

  .clients-container div {
    margin-bottom: 20px;
  }
}

.my-page-header span {
  font-weight: 500;
  font-size: 3.5rem !important;
  margin-top: 2rem;
  color: #ffffff !important;
  background-color: #c02434 !important;
  /* background: linear-gradient(56deg, #c02434 23.87%, transparent 62.27%); */
  padding: 5px;
  margin-bottom: 6.6rem !important;
  margin-top: -4rem !important;
  padding-left: 20px;
  padding-right: 20px;
}

.projects-row img {
  border-radius: 30px;
}
</style>
