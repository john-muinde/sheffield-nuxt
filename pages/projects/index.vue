<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Hero Banner -->
    <div
      class="relative py-12 bg-cover bg-center bg-no-repeat"
      style="background-image: url(/assets/images/projects_sheffield.jpg)"
    >
      <div class="container mx-auto px-4 max-w-full">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1
            class="inline-block px-8 py-3 text-4xl md:text-5xl font-medium text-white bg-red-600 rounded-md"
          >
            Project References
          </h1>
        </div>

        <!-- Project Categories Carousel -->
        <div class="max-w-full mx-auto">
          <Carousel
            ref="myCarousel"
            v-model="currentSlide"
            :items-to-show="7"
            :items-to-scroll="1"
            :wrap-around="false"
            :disable-on-click="true"
            :gap="5"
            :mouse-drag="true"
            :touch-drag="true"
            snap-align="start"
            :transition="500"
            :breakpoints="{
              320: {
                itemsToShow: 1,
                itemsToScroll: 1,
                snapAlign: 'start',
              },
              480: {
                itemsToShow: 3,
                itemsToScroll: 1,
                snapAlign: 'start',
              },
              768: {
                itemsToShow: 4,
                itemsToScroll: 1,
                snapAlign: 'start',
              },
              1024: {
                itemsToShow: 5,
                itemsToScroll: 1,
                snapAlign: 'start',
              },
              1280: {
                itemsToShow: 7,
                itemsToScroll: 1,
                snapAlign: 'start',
              },
            }"
            @next="onNext"
            @prev="onPrev"
          >
            <ClientOnly>
              <Slide
                v-for="(item, index) in projectsMenu"
                :key="index"
                class="px-2"
              >
                <div
                  class="carousel__item transition-all duration-300 rounded-xl h-60 w-52 hover:shadow-lg cursor-pointer p-6 transform hover:-translate-y-1"
                  :class="[
                    currentSlide === index
                      ? '!bg-red-600 shadow-xl'
                      : 'bg-white hover:bg-gray-50',
                  ]"
                  @click="slideTo(index)"
                >
                  <div class="flex flex-col items-center space-y-4">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-16 h-16 object-contain transition-all duration-300"
                      :class="[
                        currentSlide === index
                          ? 'brightness-0 invert'
                          : 'filter-gray-scale',
                      ]"
                    />
                    <div class="relative">
                      <span
                        class="text-lg font-semibold uppercase"
                        :class="[
                          currentSlide === index
                            ? 'text-white'
                            : 'text-gray-700',
                        ]"
                      >
                        {{ item.title }}
                      </span>
                      <div
                        class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 mt-2"
                        :class="[
                          currentSlide === index ? 'bg-white' : 'bg-gray-400',
                        ]"
                      ></div>
                    </div>
                  </div>
                </div>
              </Slide>
            </ClientOnly>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="container mx-auto py-8">
      <div class="max-w-full mx-auto">
        <div
          v-for="(segment, segmentIndex) in segmentsData"
          :id="segment.name"
          :key="segmentIndex"
          class="tab-pane transition-opacity duration-300"
          :class="{
            'opacity-100': segment.name === currentSegment,
            'opacity-0 hidden': segment.name !== currentSegment,
          }"
        >
          <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4">
            <div
              v-for="(project, projectIndex) in segment.projects"
              :key="projectIndex"
              class="transform transition-all duration-300 hover:scale-105"
            >
              <div
                class="rounded-2xl overflow-hidden shadow-md hover:shadow-xl"
              >
                <div class="relative overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    :src="assetsSync(project.main_image_path)"
                    :alt="project.name"
                    class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
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
import { ref, computed, onMounted } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";

useHead({
  title: "Projects",
  meta: [
    {
      name: "description",
      content: "Explore our projects",
    },
    {
      property: "og:title",
      content: "Projects",
    },
    {
      property: "og:description",
      content: "Explore our projects",
    },
  ],
});

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
const currentSegment = computed(() => projectsMenu[currentSlide.value]?.title);
const projects = ref([]);
const segmentsData = ref([]);
const myCarousel = ref(null);

const onNext = (e) => {
  e.preventDefault();
  if (currentSlide.value < projectsMenu.length - 1) {
    currentSlide.value++;
  }
};

const onPrev = (e) => {
  e.preventDefault();
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const slideTo = (index) => {
  currentSlide.value = index;
};

const { api } = useAxios();

const fetchProjects = async () => {
  try {
    const response = await api.get("/api/get-clients");
    projects.value = response.data;
    segmentsData.value = segmentedProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
};

const segmentedProjects = () => {
  const segments = {};

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

  return Object.values(segments);
};

onMounted(() => {
  fetchProjects();
  document.querySelector(".carousel__next").addEventListener("click", (e) => {
    e.preventDefault();
  });

  document.querySelector(".carousel__prev").addEventListener("click", () => {
    myCarousel.value.prev();
  });
});
</script>

<style scoped>
/* Custom filter for grayscale images */
.filter-gray-scale {
  filter: invert(67%) sepia(1%) saturate(0%) hue-rotate(17deg) brightness(89%)
    contrast(85%);
}

/* Custom styles for carousel navigation */
:deep(.carousel__prev),
:deep(.carousel__next) {
  @apply bg-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center;
}

:deep(.carousel__icon) {
  @apply w-6 h-6 text-gray-700;
}

:deep(.carousel__pagination) {
  @apply mt-8;
}

:deep(.carousel__pagination-button) {
  @apply w-2 h-2 rounded-full bg-white mx-1 transition-all duration-300;
}

:deep(.carousel__pagination-button--active) {
  @apply w-4 bg-red-600;
}

:deep(.carousel__track) {
  padding: 0;
  margin: 0;
}

:deep(.carousel__viewport) {
  padding: 0;
}

:deep(.carousel__slide) {
  padding: 0 5px;
}
</style>
