<script></script>

<template>
  <header class="header header-6 header-transparent">
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
        <div class="row justify-content-center mt-2 home_page_category">
          <div class="col-md-6 col-lg-4 home-round-category home_kitchen">
            <div class="banner">
              <router-link to="/commercial-kitchen" title="Click to open Food Service Equipment">
                <img class="home-rounded-circle" src="assets/gif/food_service.gif" alt="Banner" />
              </router-link>
            </div><!-- End .banner -->
          </div><!-- End .col-md-6 -->

          <div class="col-md-6 col-lg-4 home-round-category home_laundry">
            <div class="banner">
              <router-link to="/laundry" title="Click to open Laundry & Floor Cleaning">
                <img class="home-rounded-circle" src="assets/gif/laundry.gif" alt="Banner" />
              </router-link>
            </div><!-- End .banner -->
          </div><!-- End .col-md-6 -->

          <div class="col-md-6 col-lg-4 home-round-category home_cold_room">
            <div class="banner">
              <router-link to="cold-storage" title="Click to open Cold Storage">
                <img class="home-rounded-circle" src="assets/gif/cold_storage.gif" alt="Laundry" />
              </router-link>
            </div><!-- End .banner -->
          </div><!-- End .col-md-6 -->
        </div>
      </div><!-- End .container -->


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


    });



    const query = ref('');
    const results = ref([]);
    const showResults = ref(false);

    const search = async () => {
      if (query.value.length >= 3) {
        try {
          const response = await axios.get('/api/product_search'+`/${query.value}`);
          results.value = response.data.data;
          //
          showResults.value = true;
          //
        } catch (error) {
          //console.error(error);
        }
      } else {
        results.value = [];
        showResults.value = false;
      }
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



  .home-round-category {

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


  .home_kitchen .banner:hover{
    border : 6.5px solid #4f5054 !important;
    box-shadow:
      inset 0.25px 0.25px 0.25px 0 white,
      inset 0 0 0 0.5px #4f5054,
      inset 0 0 0 0.625px black,
      inset -0.625px -0.625px 0.625px 0.375px white,
      inset 0 0 0 1.125px #6c6d70,
      inset 0 0 0 1.25px grey;
    z-index : 99 !important;
  }

  .home_laundry .banner:hover{
    border : 6.5px solid #4f5054 !important;
    box-shadow:
      inset 0.25px 0.25px 0.25px 0 white,
      inset 0 0 0 0.5px #4f5054,
      inset 0 0 0 0.625px black,
      inset -0.625px -0.625px 0.625px 0.375px white,
      inset 0 0 0 1.125px #6c6d70,
      inset 0 0 0 1.25px grey;
    z-index : 99 !important;
  }

  .home_cold_room .banner:hover{
    border : 6.5px solid #4f5054 !important;
    box-shadow:
      inset 0.25px 0.25px 0.25px 0 white,
      inset 0 0 0 0.5px #4f5054,
      inset 0 0 0 0.625px black,
      inset -0.625px -0.625px 0.625px 0.375px white,
      inset 0 0 0 1.125px #6c6d70,
      inset 0 0 0 1.25px grey;
    z-index : 99 !important;
  }


  .home-round-category .banner{
    border-radius: 50%;
  }

  .home_kitchen .banner {
      border : 3.5px solid #ec1f25 !important;
      box-shadow: inset 0.25px 0.25px 0.25px 0 #ec1f25,
      inset 0 0 0 0.5px #ec1f25,
      inset 0 0 0 0.625px #ec1f25,
      inset -0.625px -0.625px 0.625px 0.375px #ec1f25,
      inset 0 0 0 1.125px #ec1f25,
      inset 0 0 0 1.25px #ec1f25 !important;
  }

  .home_cold_room .banner {
      border : 3.5px solid #3a5eab !important;
      box-shadow: inset 0.25px 0.25px 0.25px 0 #3a5eab,
      inset 0 0 0 0.5px #3a5eab,
      inset 0 0 0 0.625px #3a5eab,
      inset -0.625px -0.625px 0.625px 0.375px #3a5eab,
      inset 0 0 0 1.125px #3a5eab,
      inset 0 0 0 1.25px #3a5eab;
  }

  .home_laundry .banner {
      border : 3.5px solid #72b535 !important;
      box-shadow: inset 0.25px 0.25px 0.25px 0 #72b535,
      inset 0 0 0 0.5px #72b535,
      inset 0 0 0 0.625px #72b535,
      inset -0.625px -0.625px 0.625px 0.375px #72b535,
      inset 0 0 0 1.125px #72b535,
      inset 0 0 0 1.25px #72b535;
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

</style>




