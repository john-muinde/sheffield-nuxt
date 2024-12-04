<script></script>

<template>
  <header class="header header-6">
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
              <div class="header-search-wrapper search-wrapper-wide">
                <label for="q" class="sr-only">Search</label>
                <button class="btn btn-primary" type="submit">
                  <i class="icon-search"></i>
                </button>
                <input
                  id="q"
                  type="search"
                  class="form-control"
                  name="q"
                  placeholder="Search product ..."
                  required=""
                />
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
              alt="Molla Logo"
              width="285"
              height="auto"
            />
          </router-link>
        </div><!-- End .header-left -->

        <div class="header-right">
          <a href="wishlist.html" class="wishlist-link">
            <i class="icon-heart-o"></i>
            <span class="wishlist-count">3</span>
            <span class="wishlist-txt">My Wishlist</span>
          </a>

          <div class="dropdown cart-dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <i class="icon-shopping-cart"></i>
              <span class="cart-count">2</span>
              <span class="cart-txt">$ 164,00</span>
            </a>

            <div class="dropdown-menu dropdown-menu-right">
              <div class="dropdown-cart-products">
              </div><!-- End .cart-product -->

              <div class="dropdown-cart-total">
                <span>Total</span>

                <span class="cart-total-price">2 Items</span>
              </div><!-- End .dropdown-cart-total -->

              <div class="dropdown-cart-action">
                <a href="cart.html" class="btn btn-primary">View Cart</a>
                <a href="checkout.html" class="btn btn-outline-primary-2"><span>Checkout</span><i class="icon-long-arrow-right"></i></a>
              </div><!-- End .dropdown-cart-total -->
            </div><!-- End .dropdown-menu -->
          </div><!-- End .cart-dropdown -->
        </div>
      </div><!-- End .container -->
    </div><!-- End .header-middle -->
  </header>

  <div class="page-wrapper">
    <main class="main">
      <div class="container">
        <div class="row justify-content-center mt-1">
          <div class="col-md-6 col-lg-4">
            <div class="banner">
              <a href="/commercial-kitchen">
                <img class="home_image" src="assets/images/homepage/commercial_kitchen.jpg" alt="Banner" />
              </a>

              <!-- <div class="banner-content">
                          <h4 class="banner-subtitle">Quisque a lectus</h4>
                          <h3 class="banner-title">Praesent elementum <br>hendrerit tortor.</h3>
                          <a href="#" class="banner-link">Click here</a>
                        </div> -->
            </div><!-- End .banner -->
          </div><!-- End .col-md-6 -->

          <div class="col-md-6 col-lg-4">
            <div class="banner">
              <a href="/laundry">
                <img class="home_image" src="assets/images/homepage/laundry.jpg" alt="Banner" />
              </a>

              <!-- <div class="banner-content">
                          <h4 class="banner-subtitle">Quisque a lectus</h4>
                          <h3 class="banner-title">Praesent elementum <br>hendrerit tortor.</h3>
                          <a href="#" class="banner-link">Click here</a>
                        </div> -->
            </div><!-- End .banner -->
          </div><!-- End .col-md-6 -->

          <div class="col-md-6 col-lg-4">
            <div class="banner">
              <a href="cold-room">
                <img class="home_image" src="assets/images/homepage/cold_storage.jpg" alt="Laundry" />
              </a>

              <!-- <div class="banner-content">
                          <h4 class="banner-subtitle">Quisque a lectus</h4>
                          <h3 class="banner-title">Praesent elementum <br>hendrerit tortor.</h3>
                          <a href="#" class="banner-link">Click here</a>
                        </div> -->
            </div><!-- End .banner -->
          </div><!-- End .col-md-6 -->
        </div>
      </div><!-- End .container -->


      <!-- End .container-fluid -->

      <div class="container-fluid banner-blogs">
        <div class="row">
          <div class="col-xl-12">
            <!-- End .row -->

            <!-- End .mb-5 -->

            <div
              class="icon-boxes-container"
              :style="{ backgroundImage: 'url(/assets/images/sheffield_stainless_steel_background.jpg)' }"
            >
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-6 col-lg-3">
                    <div class="icon-box icon-box-side">
                      <span class="icon-box-icon text-dark">
                        <i class="icon-rocket"></i>
                      </span>
                      <div class="icon-box-content">
                        <h3 class="icon-box-title">
                          Shipping
                        </h3>
                        <!-- End .icon-box-title -->
                        <p>Choose your prefferd shipping method</p>
                      </div>
                      <!-- End .icon-box-content -->
                    </div>
                    <!-- End .icon-box -->
                  </div>
                  <!-- End .col-sm-6 col-lg-3 -->

                  <div class="col-sm-6 col-lg-3">
                    <div class="icon-box icon-box-side">
                      <span class="icon-box-icon text-dark">
                        <i class="icon-rotate-left"></i>
                      </span>

                      <div class="icon-box-content">
                        <h3 class="icon-box-title">
                          30 Days Return
                        </h3>
                        <!-- End .icon-box-title -->
                        <p>Simply return it within 30 days for an exchange</p>
                      </div>
                      <!-- End .icon-box-content -->
                    </div>
                    <!-- End .icon-box -->
                  </div>
                  <!-- End .col-sm-6 col-lg-3 -->

                  <div class="col-sm-6 col-lg-3">
                    <div class="icon-box icon-box-side">
                      <span class="icon-box-icon text-dark">
                        <i class="icon-info-circle"></i>
                      </span>

                      <div class="icon-box-content">
                        <h3 class="icon-box-title">
                          Payment Secure
                        </h3>
                        <!-- End .icon-box-title -->
                        <p>Contact us 24 hours a day, 7 days a week</p>
                      </div>
                      <!-- End .icon-box-content -->
                    </div>
                    <!-- End .icon-box -->
                  </div>
                  <!-- End .col-sm-6 col-lg-3 -->

                  <div class="col-sm-6 col-lg-3">
                    <div class="icon-box icon-box-side">
                      <span class="icon-box-icon text-dark">
                        <i class="icon-life-ring"></i>
                      </span>

                      <div class="icon-box-content">
                        <h3 class="icon-box-title">
                          24X7 Support
                        </h3>
                        <!-- End .icon-box-title -->
                        <p>Contact us 24 hours a day, 7 days a week</p>
                      </div>
                      <!-- End .icon-box-content -->
                    </div>
                    <!-- End .icon-box -->
                  </div>
                  <!-- End .col-sm-6 col-lg-3 -->
                </div>
                <!-- End .row -->
              </div>
              <!-- End .container-fluid -->
            </div>
            <!-- End .icon-boxes-container -->

            <div class="mb-5"></div>

            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-md-3">
                    <div class="banner banner-overlay">
                      <a href="#">
                        <img
                          src="../assets/images/banners/copy_2.jpg"
                          alt="Banner img desc"
                        />
                      </a>

                      <div class="banner-content">
                        <h4 class="banner-subtitle text-dark d-none d-sm-block">
                          <a href="#">Whats New</a>
                        </h4>
                        <!-- End .banner-subtitle -->
                        <h2 class="banner-title text-dark">
                          <a href="#">We are Innovative </a>
                        </h2>
                        <!-- End .banner-title -->
                        <a
                          href="#"
                          class="banner-link"
                        >View More <i class="icon-long-arrow-right"></i></a>
                      </div>
                      <!-- End .banner-content -->
                    </div>
                    <!-- End .banner -->
                  </div>
                  <!-- End .col-md-6 -->

                  <div class="col-md-3">
                    <div class="banner banner-overlay">
                      <a href="#">
                        <img
                          src="../assets/images/banners/copy_2.jpg"
                          alt="Banner img desc"
                        />
                      </a>

                      <div class="banner-content">
                        <h4 class="banner-subtitle text-dark d-none d-sm-block">
                          <a href="#">Whats New</a>
                        </h4>
                        <!-- End .banner-subtitle -->
                        <h2 class="banner-title text-dark">
                          <a href="#">We are Innovative </a>
                        </h2>
                        <!-- End .banner-title -->
                        <a
                          href="#"
                          class="banner-link"
                        >View More <i class="icon-long-arrow-right"></i></a>
                      </div>
                      <!-- End .banner-content -->
                    </div>
                    <!-- End .banner -->
                  </div>
                  <!-- End .col-md-6 -->

                  <div class="col-md-3">
                    <div class="banner banner-overlay">
                      <a href="#">
                        <img
                          src="../assets/images/banners/copy_3.jpg"
                          alt="Banner img desc"
                        />
                      </a>

                      <div class="banner-content">
                        <h4 class="banner-subtitle text-dark d-none d-sm-block">
                          <a href="#">CSR</a>
                        </h4>
                        <!-- End .banner-subtitle -->
                        <h2 class="banner-title text-dark">
                          <a href="#">Sheffield's CSR</a>
                        </h2>
                        <!-- End .banner-title -->
                        <a
                          href="#"
                          class="banner-link"
                        >View More<i class="icon-long-arrow-right"></i></a>
                      </div>
                      <!-- End .banner-content -->
                    </div>
                    <!-- End .banner banner-overlay -->
                  </div>

                  <div class="col-md-3">
                    <div class="banner banner-overlay">
                      <a href="#">
                        <img
                          src="../assets/images/banners/copy_3.jpg"
                          alt="Banner img desc"
                        />
                      </a>

                      <div class="banner-content">
                        <h4 class="banner-subtitle text-dark d-none d-sm-block">
                          <a href="#">CSR</a>
                        </h4>
                        <!-- End .banner-subtitle -->
                        <h2 class="banner-title text-dark">
                          <a href="#">Sheffield's CSR</a>
                        </h2>
                        <!-- End .banner-title -->
                        <a
                          href="#"
                          class="banner-link"
                        >View More<i class="icon-long-arrow-right"></i></a>
                      </div>
                      <!-- End .banner-content -->
                    </div>
                    <!-- End .banner banner-overlay -->
                  </div>
                  <!-- End .col-md-6 -->
                </div>
                <!-- End .row -->
              </div>
              <!-- End .col-lg-3 col-xxl-4-5col -->

              <!-- End .col-lg-3 col-xxl-2 -->
            </div>
            <!-- End .mb-5 -->
          </div>
          <!-- End .col-lg-9 col-xxl-10 -->
        </div>
        <!-- End .row -->
      </div>
      <!-- End .container-fluid -->
    </main>
    <!-- End .main -->
  </div>
  <!-- End .page-wrapper -->
  <button id="scroll-top" title="Back to Top">
    <i class="icon-arrow-up"></i>
  </button>
  <!-- <div
    class="container newsletter-popup-container mfp-hide"
    id="newsletter-popup-form"
  >
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="row no-gutters bg-white newsletter-popup-content">
          <div class="col-xl-3-5col col-lg-7 banner-content-wrap">
            <div class="banner-content text-center">
              <img
                src="../assets/images/logo.png"
                class="logo"
                alt="logo"
                width="180"
                height="auto"
              />
              <h2 class="banner-title">
                get <span>Best<light> </light></span> Deals
              </h2>
              <p>
                Subscribe to the Sheffield newsletter to receive timely updates
                from your favorite products.
              </p>
              <form action="#">
                <div class="input-group input-group-round">
                  <input
                    type="email"
                    class="form-control form-control-white"
                    placeholder="Your Email Address"
                    aria-label="Email Adress"
                    required
                  />
                  <div class="input-group-append">
                    <button class="btn" type="submit"><span>go</span></button>
                  </div>

                </div>

              </form>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="register-policy-2"
                  required
                />
                <label class="custom-control-label" for="register-policy-2"
                  >Do not show this popup again</label
                >
              </div>

            </div>
          </div>
          <div class="col-xl-2-5col col-lg-5">
            <img
              src="../assets/images/popup/newsletter/sheffield-popup.jpg"
              class="newsletter-img"
              alt="newsletter"
            />
          </div>
        </div>
      </div>
    </div>
  </div> -->
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


  const breakpoints = {
      0: {
          itemsToShow:1,
          snapAlign: 'start',
      },
      480: {
          itemsToShow:1,
          snapAlign: 'start',
      },
      768: {
          itemsToShow:3,
          snapAlign: 'start',
      },
      992: {
          itemsToShow:4,
          snapAlign: 'start',
      },
      1200: {
          itemsToShow:4,
          snapAlign: 'start',
      },
      1360: {
          itemsToShow:5,
          snapAlign: 'start',
      },
      1600: {
          itemsToShow:5,
          snapAlign: 'start',
      },
  };



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
    items,
    testimonials,
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

const handleCarouselLoad = () => {
  carouselLoaded.value = true;
  updateUlHeight();
};
onMounted(() => {
  carouselRef.value = document.querySelector('.carousel-wrapper');

  carouselRef.value.addEventListener('load', handleCarouselLoad);
});

onUnmounted(() => {
  if (carouselRef.value) {
    carouselRef.value.removeEventListener('load', handleCarouselLoad);
  }
});

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

//showrooms

const showrooms = ref([]);

// Fetch products based on the current page
const fetchShowrooms = async () => {

  try {
    const response = await axios.get('/api/get-showrooms', {

    });
    showrooms.value = response.data;

  } catch (error) {
    console.error(error);
  }
};



const getShowroomLink = (id, name ) => {

  let transformedName = name.replace(/ /g, '-');
  transformedName = transformedName.replace(/-+/g, '-');
  transformedName = transformedName.replace(/^-+|-+$/g, '');
  transformedName = transformedName.toLowerCase();

  return `/showroom/${id}/${transformedName}`;
};

const productsColdroom = ref([]);
const productsKitchen = ref([]);
const productsLaundry = ref([]);

const fetchFeaturedProducts = async () => {

  try {
    const response = await axios.get('/api/get-featured-products', {
    });

    productsColdroom.value = response.data.products_coldroom;
    productsKitchen.value = response.data.products_kitchen;
    productsLaundry.value = response.data.products_laundry;



  } catch (error) {
    console.error(error);
  }


};

const getProductLink = (id, name, model_number) => {
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

  return `/product/${id}/${transformedName}-${transformedModelNumber}`;
};


onMounted(async () => {

  fetchFeaturedProducts();
  fetchShowrooms();
  await nextTick();
  window.addEventListener('resize', handleResize);

});



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

  .home_image{
    border: 1px solid #c9c3c3;
  }

</style>




