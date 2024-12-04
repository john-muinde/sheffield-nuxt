<script></script>

<template>
  <div class="page-wrapper">
    <main class="main">
      <div class="container" style="margin-top: 1px">
        <div class="row cat-banner-row">
          <div class="col-xl-2 col-xxl-2 slide-from-right">
            <div class="cat-banner row no-gutters">
              <div class="col-sm-12 col-xl-12 col-xxl-12">
                <div class="banner banner-overlay solution-image">
                  <a href="#">
                    <img
                      src="/assets/images/homepage/cold_storage_page.jpg"
                      alt="Banner img desc"
                    />
                  </a>

                  <!-- <div class="banner-content">
                                <h4 class="banner-subtitle text-white"><a href="#">Best Deals</a></h4>

                                <h4 class="banner-title text-white"><a href="#">Commercial <br>Laundry
                                </a></h4>
                                <a href="#" class="banner-link">Shop Now <i class="icon-long-arrow-right"></i></a>
                            </div> -->
                </div>
                <!-- End .banner -->
              </div>
              <!-- End .col-sm-6 -->
            </div>
            <!-- End .cat-banner -->
          </div>
          <!-- End .col-xl-3 -->

          <div class="col-xl-10 col-xxl-10 mt-1 slide-from-left">
            <div class="row">
              <div
                v-for="solution in mainSolutions"
                :key="solution.id"
                class="col-md-2 col-sm-4 slide-solutions"
              >
                <router-link
                  class="cat-block"
                  :to="getSolutionLink(solution.id, solution.name)"
                >
                  <figure>
                    <span>
                      <img
                        :src="assets(solution.main_image_path)"
                        alt="Category image"
                      />
                    </span>
                  </figure>

                  <h3 class="cat-block-title">
                    {{ solution.name }}
                  </h3>
                  <!-- End .cat-block-title -->
                </router-link>
              </div>
            </div>
          </div>
          <!-- End .col-xl-9 -->
        </div>
        <!-- End .row cat-banner-row -->
      </div>
      <!-- End .container -->

      <!-- End .container-fluid -->

      <!-- End .container-fluid -->
    </main>
    <!-- End .main -->
  </div>
  <!-- End .page-wrapper -->
  <button id="scroll-top" title="Back to Top">
    <i class="icon-arrow-up"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, nextTick, watch } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";

useHead({
  title: "Cold Room",
  meta: [
    {
      name: "description",
      content:
        "We offer cold storage rooms in Kenya for sale. Get in touch with us today",
    },
    {
      name: "keywords",
      content:
        "Cold storage warehouse,commercial cold room,cold room panels,cold rooms for sale,cold room price,cold rooms in kenya",
    },
  ],
});

const name = "ExamplePagination";

const { api, API_URL } = useAxios();
const categories = reactive([]);

const fetchCategories = () => {
  api
    .get("/api/get-sidebar-categories")
    .then((response) => {
      categories.splice(
        0,
        categories.length,
        ...response.data.map((category) => {
          return {
            id: category.id,
            name: `${category.name}`,
            columns: 3,
            slug: category.name.toLowerCase().replace(/\s+/g, "-"),
            subcategories: [
              {
                id: 1, // You can assign any unique ID for the subcategory

                items: category.children.map((child) => {
                  return {
                    id: child.id,
                    name: child.name,
                    slug: child.name.toLowerCase().replace(/\s+/g, "-"),
                  };
                }),
              },
            ],
          };
        })
      );
    })
    .catch((error) => {
      console.error("Failed to fetch categories:", error);
    });
};

/////////////

//showrooms

const showrooms = ref([]);

// Fetch products based on the current page
const fetchShowrooms = async () => {
  try {
    const response = await api.get("/api/get-showrooms", {});
    showrooms.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const mainCategories = ref([]);
const mainSolutions = ref([]);

const fetchMainSolutions = async () => {
  try {
    const response = await api.get("/api/get-solutions/301", {});
    mainSolutions.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getShowroomLink = (id, name) => {
  let transformedName = name.replace(/ /g, "-");
  transformedName = transformedName.replace(/-+/g, "-");
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  transformedName = transformedName.toLowerCase();

  return `/showroom/${id}/${transformedName}`;
};

const productsColdroom = ref([]);
const productsKitchen = ref([]);
const productsLaundry = ref([]);

const fetchFeaturedProducts = async () => {
  try {
    const response = await api.get("/api/get-featured-products", {});

    productsColdroom.value = response.data.products_coldroom;
    productsKitchen.value = response.data.products_kitchen;
    productsLaundry.value = response.data.products_laundry;
  } catch (error) {
    console.error(error);
  }
};

const getProductLink = (id, name, model_number) => {
  // Replace spaces with dashes
  let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
  // Remove consecutive dashes
  transformedName = transformedName.replace(/-+/g, "-");
  // Remove leading and trailing dashes
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  // Convert to lowercase
  transformedName = transformedName.toLowerCase();

  let transformedModelNumber = model_number
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/\//g, "-");
  // Remove consecutive dashes
  transformedModelNumber = transformedModelNumber.replace(/-+/g, "-");
  // Remove leading and trailing dashes
  transformedModelNumber = transformedModelNumber.replace(/^-+|-+$/g, "");

  return `/product/${id}/${transformedName}-${transformedModelNumber}`;
};

const getCategoryLink = (id, name, page) => {
  //Replace spaces with dashes
  //
  //
  //
  let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
  // Remove consecutive dashes
  transformedName = transformedName.replace(/-+/g, "-");
  // Remove leading and trailing dashes
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  // Convert to lowercase
  transformedName = transformedName.toLowerCase();

  return `/cold-storage/${id}/${transformedName}`;
};

const getSolutionLink = (id, name) => {
  let transformedName = name.replace(/ /g, "-").replace(/\//g, "-");
  transformedName = transformedName.replace(/-+/g, "-");
  transformedName = transformedName.replace(/^-+|-+$/g, "");
  transformedName = transformedName.toLowerCase();

  return `/cold-storage/solutions/${id}/${transformedName}`;
};

onMounted(async () => {
  //fetchShowrooms();
  fetchMainSolutions();
  await nextTick();
});
</script>

<style></style>

<style>
.cat-banner-row .carousel__prev {
  height: 92% !important;
  color: #8a8a8a !important;
  background-color: #ffffff !important;
  border: 0.3px solid !important;
  border-radius: 0 !important;
  top: 49% !important;
}

.cat-banner-row .carousel__next {
  height: 92% !important;
  color: #8a8a8a !important;
  background-color: #ffffff !important;
  border: 0.3px solid !important;
  border-radius: 0 !important;
  top: 49% !important;
}
</style>

<style scoped>
.header-left > .category-dropdown {
  pointer-events: none;
}

.theClass1 {
  position: absolute;
  width: 94.8% !important;
}

.megamenu-scrollable {
  overflow-y: auto;
  direction: rtl;
}

.megamenu-container {
  direction: ltr;
}

.megamenu-scrollable::-webkit-scrollbar {
  width: 8px;
}

.megamenu-scrollable::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.megamenu-scrollable::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.scroll-track {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 16px;
  background-color: #f0f0f0;
}

.scroll-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  cursor: pointer;
  font-size: 16px;
}

.up-arrow {
  border-bottom: 1px solid #ccc;
}

.down-arrow {
  border-top: 1px solid #ccc;
}

.scroll-arrow:hover {
  background-color: #ccc;
  color: #fff;
}

.container {
  margin-top: 20px;
}

.box {
  height: 33px;
  background: #d9d6d6;
  border-radius: 5px;
  margin-bottom: 5px;
  /* max-width: 330px; */
  border: 1px solid #9d9d9d;
}

.box p {
  font-size: 1.1rem;
  color: #012e66;
}

.elements {
  position: relative;
  /*background-image: url(/assets/images/sheffield_stainless_steel_background.jpg);*/
  background-size: cover;
  overflow: hidden;
  margin-bottom: 15px;
}

.slide-solutions a:hover .cat-block-title {
  color: #3d62ad;
}

@media only screen and (max-width: 768px) {
  .solution-image {
    display: none;
  }
}

.slide-from-left .slide-solutions {
  list-style: none;
  opacity: 0;
  transform: translateX(-100%);
  animation: slideRight 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

.slide-from-right {
  opacity: 0;
  transform: translateX(100%);
  animation: slideRight 0.5s ease-in-out forwards;
}

@keyframes slideLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Add a delay for every "n" item */
.slide-from-left .slide-solutions:nth-child(2n) {
  animation-delay: 2ms;
}
</style>
