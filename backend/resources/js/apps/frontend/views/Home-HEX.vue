<script></script>

<template>
  <header class="header header-6 header-transparent">
    <!-- <div class="header-top">
                <div class="container">
                    <div class="header-left">
                        <ul class="top-menu top-link-menu d-none d-md-block">
                            <li>
                                <a href="#">Links</a>
                                <ul>
                                    <li><a href="tel:#"><i class="icon-phone"></i>Call: +0123 456 789</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div class="header-right">
                        <div class="social-icons social-icons-color">
                            <a href="#" class="social-icon social-facebook" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                            <a href="#" class="social-icon social-twitter" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                            <a href="#" class="social-icon social-pinterest" title="Instagram" target="_blank"><i class="icon-pinterest-p"></i></a>
                            <a href="#" class="social-icon social-instagram" title="Pinterest" target="_blank"><i class="icon-instagram"></i></a>
                        </div>
                        <ul class="top-menu top-link-menu">
                            <li>
                                <a href="#">Links</a>
                                <ul>
                                    <li><a href="#signin-modal" data-toggle="modal"><i class="icon-user"></i>Login</a></li>
                                </ul>
                            </li>
                        </ul>

                        <div class="header-dropdown">
                            <a href="#">USD</a>
                            <div class="header-menu">
                                <ul>
                                    <li><a href="#">Eur</a></li>
                                    <li><a href="#">Usd</a></li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>
            </div> -->
    <div class="header-middle mt-2">
      <div class="container">
        <div class="header-left">
          <div class="header-search header-search-extended header-search-visible d-none d-lg-block">
            <a href="#" class="search-toggle" role="button"><i class="icon-search"></i></a>
            <form action="#" method="get">
              <div class="header-search-wrapper search-wrapper-wide searchListMainDiv">
                <label for="q" class="sr-only">Search</label>
                <button class="btn btn-primary" type="submit">
                  <i class="icon-search"></i>
                </button>
                <input
                  id="q"
                  v-model="query"
                  type="search"
                  class="form-control"
                  name="q"
                  autocomplete="off"
                  placeholder="Search product ..."
                  required=""
                  @input="search"
                />
                <ul v-if="showResults" class="">
                  <li v-for="result in results" :key="result.id">
                    <router-link :to="getProductLink(result.id, result.name, result.model_number, result.categories_json[0].parent_name_with_slashes)">
                      <img
                        style="display:inline;"
                        width="28"
                        :src="'/storage/' + result.main_image_path"
                        class="rounded profile-img"
                        alt=""
                      />
                      {{ result.name }}
                    </router-link>
                  </li>
                </ul>
              </div><!-- End .header-search-wrapper -->
            </form>
          </div><!-- End .header-search -->
        </div>
        <div class="header-center">
          <router-link
            to="/"
            class="logo"
          >
            <img
              src="../assets/images/logo.png"
              alt="Sheffield Logo"
              width="285"
              height="auto"
            />
          </router-link>
        </div><!-- End .header-left -->

        <div class="header-right">
          <!-- <a class="header_phone" href="tel:+254713777111">+254 713 777 111</a> -->
          <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="icon-telegram-plane" style="font-size: 40px;"></i> Contact Us</a>
        </div>
      </div><!-- End .container -->
    </div><!-- End .header-middle -->
  </header>


  <!-- <div class="video-container">
  <video autoplay="" muted="" loop="" id="myVideo">
      <source src="/assets/videos/sheffield_website_video.mp4" type="video/mp4">
    </video>
  <div class="overlay"></div>
</div> -->

  <div class="page-wrapper">
    <main class="main">
      <div class="container">
        <div class="row justify-content-center mt-2">
          <div class="hex-container">
            <!-- Small hexagons -->
            <div class="small-hex">
              <img
                v-if="showOverlay"
                class=""
                src="assets/images/tree.jpg"
                alt="Clean Energy"
              />
              <video
                id="myVideo"
                autoplay
                muted
                loop
                class="my-video"
                @play="hideOverlay"
              >
                <source src="/assets/videos/tree.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="small-hex">
              <img class="" src="assets/images/welding.jpg" alt="Sheffield Workshop" />
            </div>
            <div class="small-hex">
              <img class="" src="assets/images/workshop_sheffield.jpg" alt="Sheffield Workshop" />
            </div>
            <div class="small-hex">
              <img
                v-if="showOverlay"
                class=""
                src="assets/images/oceans.jpg"
                alt="Clean Energy"
              />
              <video
                id="myVideo"
                autoplay
                muted
                loop
                class="my-video"
                @play="hideOverlay"
              >
                <source src="/assets/videos/oceans.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="small-hex">
              <img class="" src="assets/images/chef.jpg" alt="Commercial Kitchen" />
            </div>
            <div class="small-hex hex-3">
              <img
                v-if="showOverlay"
                class=""
                src="assets/images/wind_energy.jpg"
                alt="Clean Energy"
              />
              <video
                id="myVideo"
                autoplay
                muted
                loop
                class="my-video"
                @play="hideOverlay"
              >
                <source src="/assets/videos/wind_energy.mp4" type="video/mp4" />
              </video>

              <!-- <video autoplay="" muted="" loop="" id="myVideo">
                    <source src="/assets/videos/wind_energy.mp4" type="video/mp4">
                  </video> -->
            </div>

            <div class="hexagon hex-kitchen">
              <router-link to="/commercial-kitchen">
                <img class="" src="assets/images/homepage/commercial_kitchen.jpg" alt="Commercial Kitchen" />
              </router-link>
            </div>
            <div class="hexagon hex-laundry">
              <router-link to="/laundry">
                <img class="" src="assets/images/homepage/laundry.jpg" alt="Commercial Laundry" />
              </router-link>
            </div>
            <div class="hexagon hex-cold-storage">
              <router-link to="/cold-storage">
                <img class="" src="assets/images/homepage/cold_storage.jpg" alt="Commercial Cold Room" />
              </router-link>
            </div>
          </div>
        </div>
      </div>



      <!-- <div class="container">
        <div class="row justify-content-center mt-2 home_page_category">

          <div class="col-md-6 col-lg-4 round-category home_image_kitchen">
            <div class="banner">
              <a href="/commercial-kitchen">
                <img class="rounded-circle" src="assets/images/homepage/commercial_kitchen.jpg" alt="Banner">
              </a>

            </div>
          </div>

          <div class="col-md-6 col-lg-4 round-category home_image_laundry">
            <div class="banner">
              <a href="/laundry">
                <img class="rounded-circle" src="assets/images/homepage/laundry.jpg" alt="Banner">
              </a>
            </div>
          </div>

          <div class="col-md-6 col-lg-4 round-category home_image_cold_room">
            <div class="banner">
              <a href="cold-storage">
                <img class="rounded-circle" src="assets/images/homepage/cold_storage.jpg" alt="Laundry">
              </a>
            </div>
          </div>

        </div>
      </div> -->


      <!-- End .container-fluid -->
    </main>
    <!-- End .main -->
  </div>
  <!-- End .page-wrapper -->
  <button id="scroll-top" title="Back to Top">
    <i class="icon-arrow-up"></i>
  </button>


  <!-- Modal -->
  <div
    id="exampleModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title"></h5>
          <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          <button class="btn btn-primary" data-bs-dismiss="modal">
            <i style="font-size:20px;" class="icon-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row vertical-divider align-left ml-4 mr-4" style="margin-top: 10px;margin-bottom: 10px">
            <div class="col-md-6">
              <h3 class="text-dark">
                Need assistance? talk to us
              </h3>

              <form
                id="contact-form"
                class="mr-5 popup-form"
                name="contact-form"
                action="mail.php"
                method="POST"
              >
                <!--Grid row-->
                <div class="row">
                  <!--Grid column-->
                  <div class="col-md-6">
                    <div class="md-form mb-0">
                      <label for="name" class="">Your name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Enter your name here ..."
                      />
                    </div>
                  </div>
                  <!--Grid column-->

                  <!--Grid column-->
                  <div class="col-md-6">
                    <div class="md-form mb-0">
                      <label for="email" class="">Your email</label>
                      <input
                        id="email"
                        type="text"
                        name="email"
                        class="form-control"
                        placeholder="Enter your email here ..."
                      />
                    </div>
                  </div>
                  <!--Grid column-->
                </div>
                <!--Grid row-->

                <!--Grid row-->
                <div class="row">
                  <div class="col-md-12">
                    <div class="md-form mb-0">
                      <label for="subject" class="">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        class="form-control"
                        placeholder="Enter your subject here ..."
                      />
                    </div>
                  </div>
                </div>
                <!--Grid row-->

                <!--Grid row-->
                <div class="row">
                  <!--Grid column-->
                  <div class="col-md-12">
                    <div class="md-form">
                      <label for="message">Your message</label>
                      <textarea
                        id="message"
                        type="text"
                        name="message"
                        rows="2"
                        class="form-control md-textarea"
                        placeholder="Enter your message here ..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <!--Grid row-->


                <!--Grid row-->
                <div class="row">
                  <!--Grid column-->
                  <div class="col-md-12">
                    <div class="md-form">
                      <button class="btn btn-primary">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
                <!--Grid row-->
              </form>
            </div>
            <div class="col-md-6">
              <div class="canvas-contact ml-5">
                <div class="canvas-map mb-30">
                  <iframe
                    width="90%"
                    height="200"
                    src="https://maps.google.com/maps?q=sheffield-steel-limited-mombasa-rd&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
                <ul class="contact-section mt-2">
                  <li style="font-size:20px; font-weight:500;" class="mb-3 text-dark">
                    <i class="flaticon-pin"></i><span>
                      Off Mombasa Road before Standard gauge railway<br />
                      P. O. Box 29 – 00606, Nairobi Kenya
                    </span>
                  </li>
                  <li class="">
                    <i class="icon-phone" style="font-size: 35px; padding-right:15px; color: #000;"></i>
                    <a class="text-dark" style="font-size:25px; font-weight:550;" href="tel:+254713777111">+254 713 777 111</a>
                  </li>
                  <li class="mb-3">
                    <i class="icon-envelope" style="font-size: 35px; padding-right:15px; color: #000;"></i>
                    <a class="text-dark" style="font-size:25px; font-weight:550; color:#000;" href="mailto:info@sheffieldafrica.com">info@sheffieldafrica.com</a>
                  </li>
                </ul>
                <ul class="social-icon">
                  <li><a href="index.html#"><i class="fa fa-facebook"></i></a></li>
                  <li><a href="index.html#"><i class="fa fa-twitter"></i></a></li>
                  <li><a href="index.html#"><i class="fa fa-pinterest-p"></i></a></li>
                  <li><a href="index.html#"><i class="fa fa-linkedin"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
</template>

<script setup>

    import { ref, onMounted, onUnmounted, reactive, nextTick, watch } from 'vue';
    import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel';



    const name = 'ExamplePagination';

    const scriptUrl = import.meta.url;
    const basePathVite = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1); //vite base path
    const basePath = window.location.origin + window.location.pathname; //laravel base path


    const categories = reactive([]);


    const fetchCategories = () => {
      axios.get('/api/get-sidebar-categories')
        .then(response => {
          categories.splice(0, categories.length, ...response.data.map(category => {
            return {
              id: category.id,
              name: `${category.name}`,
              columns: 3,
              slug: category.name.toLowerCase().replace(/\s+/g, '-'),
              subcategories: [
                {
                  id: 1, // You can assign any unique ID for the subcategory

                  items: category.children.map(child => {
                    return {
                      id: child.id,
                      name: child.name,
                      slug: child.name.toLowerCase().replace(/\s+/g, '-'),
                    };
                  }),
                },
              ],
            };

          }));
        })
        .catch(error => {
          console.error('Failed to fetch categories:', error);
        });
    };

    onMounted(() => {
      fetchCategories();
    });




  const items = [
    {
      image: basePath + 'frontend/images/slider/slider1.webp',
      mobileImage: basePath + 'frontend/images/slider/slider1-mobile.jpg',
      alt: 'Commercial Kitchen Solutions',
      intro : {
        title : 'Commercial <span>Kitchen</span> <br />Solutions',
        subtitle : 'We offer the best kitchen solutions',
        url : '#',
      },
    },
    {
      image: basePath + 'frontend/images/slider/slider2.webp',
      mobileImage: basePath + 'frontend/images/slider/slider2-mobile.jpg',
      alt: 'Commercial Cold Room Solutions',
      intro : {
        title : ' Commercial <span>Cold  <br />Room</span> Solutions',
        subtitle : 'We offer the best cold room solutions',
        url : '#',
      },
    },
    {
      image: basePath + 'frontend/images/slider/slider1.webp',
      mobileImage: basePath + 'frontend/images/slider/slider3-mobile.jpg',
      alt: 'Commercial Laundry Solutions',
      intro : {
        title : 'Commercial <span>Laundry</span> <br /> Solutions',
        subtitle : 'We offer the best laundry solutions',
        url : '#',
      },
    },
    {
      image: basePath + 'frontend/images/slider/slider2.webp',
      mobileImage: basePath + 'frontend/images/slider/slider4-mobile.jpg',
      alt: 'Commercial Health Care Solutions',
      intro : {
        title : 'Commercial <span>Health <br /> Care</span> Solutions',
        subtitle : 'We offer the best health care solutions',
        url : '#',
      },
    },
];




const testimonials = [

     {
      image: basePath + 'frontend/images/testimonials/user-2.jpg',
      message: 'As a professional chef, I understand the importance of having a reliable commercial kitchen. Sheffield\'s commercial kitchen solutions have exceeded my expectations. The equipment is durable and has improved the efficiency of my kitchen. I highly recommend Sheffield to anyone in need of commercial kitchen solutions.',
      name: 'Dan Njoroge',
      company: 'Company X',
      job_title: 'Customer',
    },

    {
      image: basePath + 'frontend/images/testimonials/user-1.jpg',
      message: 'I was extremely impressed with Sheffield\'s commercial cold room solutions. As a restaurant owner, having reliable refrigeration is crucial to the success of my business. Sheffield\'s team delivered and installed the cold room in a timely manner and it has been working perfectly ever since.',
      name: 'Dan Njoroge',
      company: 'Company X',
      job_title: 'Customer',
    },

    {
      image: basePath + 'frontend/images/testimonials/user-2.jpg',
      message: 'Sheffield\'s commercial healthcare solutions have been a game changer for our facility. Their team helped us design and install the perfect healthcare solution that is both efficient and reliable. We can now focus on providing quality care to our patients without worrying about equipment malfunctions.',
      name: 'Dan Njoroge',
      company: 'Company X',
      job_title: 'Customer',
    },

    {
      image: basePath + 'frontend/images/testimonials/user-1.jpg',
      message: 'I recently purchased a commercial laundry solution from Sheffield and I couldn\'t be happier with the results. The laundry solution is energy-efficient and has dramatically reduced our utility bills. The team at Sheffield were knowledgeable and professional throughout the entire process.',
      name: 'Dan Njoroge',
      company: 'Company X',
      job_title: 'Customer',
    },
];

const data = () => {
  return {
    //isDesktop: window.innerWidth >= 768
  };
};

const isDesktop = ref(window.innerWidth >= 768);

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768;
};


const scrollableContainer = ref(null);
const ulHeight = ref('');

// Function to update the ul height
const updateUlHeight = () => {
  if (scrollableContainer.value) {
    const containerHeight = scrollableContainer.value.clientHeight;

    if(containerHeight == 0){

      ulHeight.value = '417px';

    }else{

      ulHeight.value = `${containerHeight}px`;

    }

  }
};

// Watch for changes in the scrollable container's height
watch(scrollableContainer, updateUlHeight);

// Listen to the load event of the carousel
const carouselLoaded = ref(false);
const carouselRef = ref(null);



window.onload = () => {
  updateUlHeight();
};

onMounted(async () => {

  await nextTick();
  window.addEventListener('resize', handleResize);

});

const getImage = (item) => {
  if (isDesktop.value) {
    return item.image;
  } else {
    return item.mobileImage;
  }
};


const getSubset = (items, columnIndex, totalColumns) => {
  const subsetSize = Math.ceil(items.length / totalColumns);
  const startIndex = (columnIndex - 1) * subsetSize;
  const endIndex = startIndex + subsetSize;
  return items.slice(startIndex, endIndex);
};


const adjustTheClass1Height = () => {
  const carouselHeight = this.$refs.carousel.$el.offsetHeight;
  this.$refs.carousel.$el.closest('.theClass1-wrapper').style.height = carouselHeight + 'px';
};

/////////////

 const getProductLink = (id, name, model_number, main_second_parent_cat) => {
    // Replace spaces with dashes
    let transformedName = name.replace(/ /g, '-').replace(/\//g, '-');
    // Remove consecutive dashes
    transformedName = transformedName.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    // Convert to lowercase
    transformedName = transformedName.toLowerCase();

    let transformedModelNumber = model_number.toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
    // Remove consecutive dashes
    transformedModelNumber = transformedModelNumber.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedModelNumber = transformedModelNumber.replace(/^-+|-+$/g, '');

    return `/${main_second_parent_cat}/product/${id}/${transformedName}-${transformedModelNumber}`;
  };


onMounted(async () => {
  await nextTick();
  window.addEventListener('resize', handleResize);

});


const projectsCount = ref(0);
const conceptsCount = ref(0);
const trainingdemosCount = ref(0);
const yearsCount = ref(0);
const stopCount = ref(0);


const dataCounter = [
  { count: 10000, ref: projectsCount },
  { count: 2000, ref: conceptsCount },
  { count: 1500, ref: trainingdemosCount },
  { count: 20, ref: yearsCount },
  { count: 1, ref: stopCount },
];

const duration = 3000;

onMounted(() => {
  animateCounters();
});

const animateCounters = () => {
  const interval = 50;

  dataCounter.forEach((counter) => {
    const { count, ref } = counter;
    const step = Math.ceil(count / (duration / interval));
    let current = 0;

    const intervalId = setInterval(() => {
      current += step;
      if (current >= count) {
        current = count;
        clearInterval(intervalId);
      }
      ref.value = current;
    }, interval);
  });
};

const query = ref('');
const results = ref([]);
const showResults = ref(false);

const search = async () => {
  if (query.value.length >= 3) {
    try {
      const response = await axios.get('/api/product_search'+`/${query.value}`);
      results.value = response.data.data;

      showResults.value = true;

    } catch (error) {
      console.error(error);
    }
  } else {
    results.value = [];
    showResults.value = false;
  }
};


// homepage hex videos

const showOverlay = ref(true);

const hideOverlay = () => {
  showOverlay.value = false;
};



</script>

<style></style>

<style>

  .cat-banner-row .carousel__prev{
    height: 92% !important;
    color: #8a8a8a !important;
    background-color: #ffffff !important;
    border: 0.3px solid !important;
    border-radius:0 !important;
    top: 49% !important;
  }

  .cat-banner-row .carousel__next{
    height: 92% !important;
    color: #8a8a8a !important;
    background-color: #ffffff !important;
    border: 0.3px solid !important;
    border-radius:0 !important;
    top: 49% !important;
  }



  .round-category {

    margin-right:-60px;
  }

  .banner {

    background-color: transparent !important;
  }

  .home_page_category{

    margin-left: -70px;

  }


  .banner img:hover {

  }


  .home_image_kitchen .banner:hover{
    border : 3.5px solid #ec1f25 !important;
    z-index : 99 !important;
  }

  .home_image_laundry .banner:hover{
    border : 3.5px solid #72b535 !important;
    z-index : 99 !important;
  }

  .home_image_cold_room .banner:hover{
    border : 3.5px solid #3a5eab !important;
    z-index : 99 !important;
  }

  .count-to {

    font-weight:650;
  }


  @media (min-width: 992px){
    .home_page_category .col-lg-4 {
        -ms-flex: 0 0 30.333333%;
        flex: 0 0 30.333333%;
        max-width: 30.333333%;
    }
  }

  .header_phone{

    font-size: 20px !important;
    font-weight: 700 !important;
    color:#3e5cac !important;
  }

  .product-image{
    height:auto !important;
  }



  #myVideo {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -15;
  }


  .video-container {
    position: relative;
    display: inline-block;
  }

  .overlay {
    position: fixed;
    z-index: -12;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    pointer-events: none;
  }



  .app{
    position: fixed;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #f1f1f1;
    width: 100%;
    padding: 20px;
  }

  .banner img {
    position: relative;
    z-index: -10;
  }


  .round-category .banner{
    border-radius: 50%;
    box-shadow:
      inset 0.25px 0.25px 0.25px 0 white,
      inset 0 0 0 0.5px #4f5054,
      inset 0 0 0 0.625px black,
      inset -0.625px -0.625px 0.625px 0.375px white,
      inset 0 0 0 1.125px #6c6d70,
      inset 0 0 0 1.25px grey;
    }

    .cta-border{
      margin-left: 0px !important;
      background-color: transparent;
    }


    .header-transparent{
      background-color: transparent;
    }

    /*My home modal*/
    .row.vertical-divider {
      overflow: hidden;
    }
    .row.vertical-divider > div[class^="col-"] {

      padding-bottom: 100px;
      margin-bottom: -100px;
      border-left: 2px solid #ec1f25;
      border-right: 2px solid #ec1f25;
    }
    .row.vertical-divider div[class^="col-"]:first-child {
      border-left: none;
    }
    .row.vertical-divider div[class^="col-"]:last-child {
      border-right: none;
    }

    .modal-dialog{
      max-width: 95%;
    }

    .modal-content {

      background-color: #ffffffe8;
    }

    .modal-header {

      border-bottom:transparent;
    }

    .popup-form label {

      font-weight:550;
      color:#000;
    }



    .searchListMainDiv {
      min-width: 40%;
      margin: 0 1rem;
    }
    .searchListMainDiv h1 {
      margin-bottom: 1rem;
    }
    .searchListMainDiv ul {
      list-style: none;
      padding: 0;
      margin: 0;
      margin-top: 0.5rem;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
      border: 1px solid rgb(255, 255, 255);
      max-height: 250px;
      overflow-y: auto;
      position: absolute;
      top: 30px;
      z-index: 1200;
      background-color: #fff;
      width: 100%;
    }



    .searchListMainDiv ul::-webkit-scrollbar {
      width: 5px;
    }
    .searchListMainDiv ul::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #ddd;
      border-radius: 10px;
    }
    .searchListMainDiv ul::-webkit-scrollbar-thumb {
      background: rgb(183, 183, 183);
      border-radius: 10px;
    }
    .searchListMainDiv ul::-webkit-scrollbar-thumb:hover {
      background: #a2a2a2;
    }

    .searchListMainDiv ul li {
      padding: 1.2rem 10px;
      font-size: 13.5px;
      font-weight: 500;
      line-height: 1.3rem;
      border-bottom: 1px solid #ddd;
      color: #333;
      cursor: pointer;
      overflow-wrap: break-word;
    }
    .searchListMainDiv ul li:last-child {
      border: none;
    }


    /*Hex home*/

    .hex-container {
      position: relative;
      width: 70.5%; /* Adjust the size of the container as needed */
      /*max-width: 600px; */
    }

    .hexagon {
      width: 30.333%;
      padding-bottom: 34.483%;
      margin-top: 10.9%;
      position: relative;
      margin-left: 1.9%;
      margin-bottom: 10%;
      float: left;
      background-color: #ffffff; /* Hexagon color */
      -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }

    .hexagon:before {
        /*content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);*/

        content: "";
        position: absolute;
        top: -3px; /* Adjust for border width */
        left: -3px; /* Adjust for border width */
        width: calc(100% + 6px); /* Adjust for border width */
        height: calc(100% + 6px); /* Adjust for border width */
        -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        border: 3px solid #000; /* Add a 3px border */
    }




    .hex-kitchen::after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      content: '';
      background: #ec1f20;
      clip-path: polygon(
          /* We first go around the pseudo element to recreate the hexagon */
          50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%,
          /* We make sure to close the hexagon and go back to the start */
          50% 0%,
          /* We then go down inside the hexagon (feel free to change the border size, here it is of 10px)*/
          50% 10px,
          /* We finally go around the pseudo element in reverse to carve a smaller hexagon inside */
          /* 0.49999999999999994 is sin(30deg) as it's only supported in Safari for now */
          10px calc(25% + 10px * 0.49999999999999994), 10px calc(75% + 10px * -0.49999999999999994), 50% calc(100% - 10px), calc(100% - 10px) calc(75% + 10px * -0.49999999999999994), calc(100% - 10px) calc(25% + 10px * 0.49999999999999994), 50% 10px
      );

    }

    .hex-laundry::after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      content: '';
      background: #71b432;
      clip-path: polygon(
          /* We first go around the pseudo element to recreate the hexagon */
          50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%,
          /* We make sure to close the hexagon and go back to the start */
          50% 0%,
          /* We then go down inside the hexagon (feel free to change the border size, here it is of 10px)*/
          50% 10px,
          /* We finally go around the pseudo element in reverse to carve a smaller hexagon inside */
          /* 0.49999999999999994 is sin(30deg) as it's only supported in Safari for now */
          10px calc(25% + 10px * 0.49999999999999994), 10px calc(75% + 10px * -0.49999999999999994), 50% calc(100% - 10px), calc(100% - 10px) calc(75% + 10px * -0.49999999999999994), calc(100% - 10px) calc(25% + 10px * 0.49999999999999994), 50% 10px
      );

    }

    .hex-cold-storage::after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      content: '';
      background: #3c5caa;
      clip-path: polygon(
          /* We first go around the pseudo element to recreate the hexagon */
          50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%,
          /* We make sure to close the hexagon and go back to the start */
          50% 0%,
          /* We then go down inside the hexagon (feel free to change the border size, here it is of 10px)*/
          50% 10px,
          /* We finally go around the pseudo element in reverse to carve a smaller hexagon inside */
          /* 0.49999999999999994 is sin(30deg) as it's only supported in Safari for now */
          10px calc(25% + 10px * 0.49999999999999994), 10px calc(75% + 10px * -0.49999999999999994), 50% calc(100% - 10px), calc(100% - 10px) calc(75% + 10px * -0.49999999999999994), calc(100% - 10px) calc(25% + 10px * 0.49999999999999994), 50% 10px
      );

    }



    .hex-container img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        position: absolute;
    }

    .hexagon:nth-child(2):before {
        border: 2px solid #000;
    }

    .hexagon:nth-child(3):before {
        background-color: #27ae60; /* Change the color for the third hexagon */
    }

    .small-hex {
      background-color: #ec1e2500; /* Hexagon color */
       clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }

    .small-hex::after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      content: '';
      background: #9f9f9f;
      clip-path: polygon(
          /* We first go around the pseudo element to recreate the hexagon */
          50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%,
          /* We make sure to close the hexagon and go back to the start */
          50% 0%,
          /* We then go down inside the hexagon (feel free to change the border size, here it is of 10px)*/
          50% 10px,
          /* We finally go around the pseudo element in reverse to carve a smaller hexagon inside */
          /* 0.49999999999999994 is sin(30deg) as it's only supported in Safari for now */
          10px calc(25% + 10px * 0.49999999999999994), 10px calc(75% + 10px * -0.49999999999999994), 50% calc(100% - 10px), calc(100% - 10px) calc(75% + 10px * -0.49999999999999994), calc(100% - 10px) calc(25% + 10px * 0.49999999999999994), 50% 10px
      );

    }

    /* Small hexagons positioned around the main hexagons */
    .small-hex {
        width: 15%;
        padding-bottom: 16.094%; /* Adjust the size of small hexagons */
        position: absolute;
    }

    .small-hex:nth-child(1) {
        margin-top: 2%;
        left: 25.7%;
    }

    .small-hex:nth-child(2) {
        margin-top: 2%;
        left: 58%;
    }

    .small-hex:nth-child(3) {
        margin-top: 38.3%; /* Position below the second main hexagon */
        left: 58%;
    }

    .small-hex:nth-child(4) {
        margin-top: 38.3%;
        left: 25.7%;
    }

    .small-hex:nth-child(5) {
        margin-top: 38.3%; /* Position below the third main hexagon */
        left: -6.5%;
    }

    .small-hex:nth-child(6) {
        margin-top: 2%;
        left: 90.25%;
    }

    .small-hex video{
      width: 100%;
      object-fit: cover;
      position: absolute !important;
      z-index: 0;
    }

    .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('/assets/images/wind_energy.jpg'); /* Replace with your image URL */
      background-size: cover;
      z-index: 1;
    }


</style>




