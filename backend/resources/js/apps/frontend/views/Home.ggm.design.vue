<script></script>

<template>
  <div class="page-wrapper">
    <main class="main">
      <!-- <div class="mb-lg-2"></div> -->
      <!-- End .mb-lg-2 -->
      <div class="container-fluid">
        <div class="row home-row">
          <div class="col-lg-12">
            <!-- start -->


            <carousel
              ref="scrollableContainerCarosel"
              class="carousel-wrapper"
              :per-page="1"
              :autoplay="5000"
              :wrap-around="true"
              :pause-autoplay-on-hover="true"
              @load="adjustTheClass1Height"
            >
              <slide v-for="(item, index) in items" :key="index">
                <img :src="getImage(item)" :alt="item.alt" />
                <!-- <div>{{ item.text }}</div> -->

                <!--  <div class="intro-content">
                      <h1 class="intro-title" v-html="item.intro.title">

                      </h1>

                      <h3 class="intro-subtitle">
                        {{ item.intro.subtitle }}
                      </h3>

                      <a href="{{ item.intro.url }}" class="btn btn-primary mt-3">
                        <span>View Solutions</span>
                        <i class="icon-long-arrow-right"></i>
                      </a>
                    </div> -->
              </slide>
              <template #addons>
                <Navigation />
                <Pagination />
              </template>
            </carousel>


            <!-- end -->
          </div>
          <!-- End .col-xl-9 col-xxl-10 -->
        </div>
        <!-- End .row -->
      </div>
      <!-- End .container-fluid -->

      <!-- <div class="container-fluid container-fluid-max-width pb-4">
        <div class="row">
          <div class="col-12 border-with-company-colors">
            <div class="banner banner-big">
              <a href="#">
                <img src="../assets/images/sheffield-stainless-steel.jpg" alt="Banner" v-if="isDesktop" />
                <img src="../assets/images/sheffield_stainless_steel_background.jpg" alt="Banner" v-if="!isDesktop" />
              </a>

              <div class="banner-content">
                <h3 class="banner-title text-primary">
                  About Sheffield Africa
                </h3>
                <h4 class="banner-subtitle text-dark">Who we are</h4>

                <p class="text-dark">
                  Sheffield is an end to end Kitchen, Laundry and Cold-room
                  solution provider, offering innovative products and services
                  through concept development, designing, sourcing, fabrication
                  and installation to after-sales service.
                </p>

                <router-link to="/about" class="btn btn-primary btn-rounded"
                  ><span>View More</span><i class="icon-long-arrow-right"></i
                ></router-link>
              </div>

            </div>

          </div>

        </div>
      </div> -->



      <div class="container-fluid pb-4 pt-5">
        <div class="headings">
          <h3 class="heading text-primary">
            DISCOVER SOLUTIONS
          </h3>
          <h4 class="sub-heading">
            Find Your Perfect Fit
          </h4>
        </div>

        <div class="row">
          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/backery-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Bakery</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/beer-trailer.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Beer Trailer</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/butchery-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Butchery</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/coffee-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Coffee</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/coffee-tuktuk-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Coffee Tuktuk</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/commercial-laundry-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Commercial Laundry</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->
          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/hospital-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Hospital</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/ice-cream-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Ice Scream</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->
        </div>

        <div class="row">
          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/juice-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Juice Solution</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/nyama-grill.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Nyama Grill</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/pharmacy-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Phamacy</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/pizza-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Pizza</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/restaurant-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Restaurant</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/backery-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Bakery</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->
          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/backery-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Bakery</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->

          <div class="col">
            <a href="category.html" class="cat-block">
              <figure>
                <span>
                  <img src="../assets/images/solutions/backery-solution.jpg" alt="Category image" />
                </span>
              </figure>

              <h3 class="cat-block-title">Bakery</h3><!-- End .cat-block-title -->
            </a>
          </div><!-- End .col-sm-4 col-lg-2 -->
        </div>
      </div>

      <div class="container">
        <div class="cta cta-border mb-5" style="background-image: url(/assets/images/sheffield_stainless_steel_background.jpg);">
          <img
            style="height:200px;"
            src="../assets/images/homepage_banner_product.png"
            alt="camera"
            class="cta-img"
          />

          <div class="row justify-content-center">
            <div class="col-md-12">
              <div class="cta-content">
                <div class="cta-text text-right text-dark">
                  <p class="text-dark">
                    Shop Today’s Deals <br /><strong>and Discover Exclusive Promotions!</strong>
                  </p>
                </div><!-- End .cta-text -->
                <a href="#" class="btn btn-primary btn-round text-dark"><span>Shop Now</span><i class="icon-long-arrow-right"></i></a>
              </div><!-- End .cta-content -->
            </div><!-- End .col-md-12 -->
          </div><!-- End .row -->
        </div><!-- End .cta -->
      </div><!-- End .container -->

      <div class="container">
        <div class="row cat-banner-row ">
          <div class="col-xl-2 col-xxl-3">
            <div class="cat-banner row no-gutters">
              <div class="cat-banner-list col-sm-6 d-xl-none d-xxl-flex" style="background-image: url(../assets/images/banner-bg-4.jpg);">
                <div class="banner-list-content">
                  <h2><a href="#">Cooking </a></h2>

                  <ul>
                    <li><a href="#">Cookware</a></li>
                    <li><a href="#">Dinnerware</a></li>
                    <li><a href="#">Cups</a></li>
                    <li><a href="#">Microwaves</a></li>
                    <li><a href="#">Toasters</a></li>
                    <li><a href="#">Coffee Makers</a></li>
                    <li class="list-all-link">
                      <a href="#">See All Departments</a>
                    </li>
                  </ul>
                </div><!-- End .banner-list-content -->
              </div><!-- End .col-sm-6 -->

              <div class="col-sm-6 col-xl-12 col-xxl-6">
                <div class="banner banner-overlay">
                  <a href="#">
                    <img src="../assets/images/demos/demo-14/banners/banner-10.jpg" alt="Banner img desc" />
                  </a>

                  <div class="banner-content">
                    <h4 class="banner-subtitle text-white">
                      <a href="#">Best Deals</a>
                    </h4><!-- End .banner-subtitle -->
                    <h4 class="banner-title text-white">
                      <a href="#">Commercial <br />Kitchen <!-- <br><span>Efficiency, Precision, and Flavor</span> --></a>
                    </h4><!-- End .banner-title -->
                    <a href="#" class="banner-link">Shop Now <i class="icon-long-arrow-right"></i></a>
                  </div><!-- End .banner-content -->
                </div><!-- End .banner -->
              </div><!-- End .col-sm-6 -->
            </div><!-- End .cat-banner -->
          </div><!-- End .col-xl-3 -->

          <div class="col-xl-10 col-xxl-9">
            <carousel
              ref="scrollableContainerCarosel"
              :breakpoints="breakpoints"
              class="carousel-wrapper owl-full carousel-equal-height carousel-with-shadow"
              :autoplay="5000"
              :wrap-around="true"
              :pause-autoplay-on-hover="true"
              @load="adjustTheClass1Height"
            >
              <slide v-for="(item, index) in productsKitchen" :key="index">
                <div class="product text-center">
                  <figure class="product-media">
                    <!-- <span class="product-label label-sale">Sale</span> -->
                    <router-link :to="getProductLink(item.id, item.name, item.model_number)">
                      <img
                        v-lazy:src="'/storage/' + item.main_image_path"
                        :src="'/storage/' + item.main_image_path"
                        alt="Product image"
                        class="product-image"
                      />
                    </router-link>

                    <div class="product-action-vertical">
                      <a href="#" class="btn-product-icon btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                      <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                    </div><!-- End .product-action-vertical -->

                    <div class="product-action">
                      <a href="#" class="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                    </div><!-- End .product-action -->
                  </figure><!-- End .product-media -->

                  <div class="product-body">
                    <div class="product-cat">
                      <a href="#">Cooking Appliances - </a>
                    </div><!-- End .product-cat -->
                    <h3 class="product-title">
                      <router-link :to="getProductLink(item.id, item.name, item.model_number)">
                        {{ item.name }}
                      </router-link>
                    </h3><!-- End .product-title -->
                    <div class="product-price">
                      <span class="new-price">$249.99</span>
                    </div><!-- End .product-price -->

                    <br />
                  </div><!-- End .product-body -->
                </div><!-- End .product -->
              </slide>

              <template #addons>
                <Navigation />
              </template>
            </carousel><!-- End .owl-carousel -->
          </div><!-- End .col-xl-9 -->
        </div><!-- End .row cat-banner-row -->

        <div class="row cat-banner-row ">
          <div class="col-xl-2 col-xxl-3">
            <div class="cat-banner row no-gutters">
              <div class="cat-banner-list col-sm-6 d-xl-none d-xxl-flex" style="background-image: url(../assets/images/banner-bg-4.jpg);">
                <div class="banner-list-content">
                  <h2><a href="#">Cooking </a></h2>

                  <ul>
                    <li><a href="#">Cookware</a></li>
                    <li><a href="#">Dinnerware</a></li>
                    <li><a href="#">Cups</a></li>
                    <li><a href="#">Microwaves</a></li>
                    <li><a href="#">Toasters</a></li>
                    <li><a href="#">Coffee Makers</a></li>
                    <li class="list-all-link">
                      <a href="#">See All Departments</a>
                    </li>
                  </ul>
                </div><!-- End .banner-list-content -->
              </div><!-- End .col-sm-6 -->

              <div class="col-sm-6 col-xl-12 col-xxl-6">
                <div class="banner banner-overlay">
                  <a href="#">
                    <img src="../assets/images/demos/demo-14/banners/banner-10.jpg" alt="Banner img desc" />
                  </a>

                  <div class="banner-content">
                    <h4 class="banner-subtitle text-white">
                      <a href="#">Best Deals</a>
                    </h4><!-- End .banner-subtitle -->
                    <h4 class="banner-title text-white">
                      <a href="#">Commercial <br />Kitchen <!-- <br><span>Efficiency, Precision, and Flavor</span> --></a>
                    </h4><!-- End .banner-title -->
                    <a href="#" class="banner-link">Shop Now <i class="icon-long-arrow-right"></i></a>
                  </div><!-- End .banner-content -->
                </div><!-- End .banner -->
              </div><!-- End .col-sm-6 -->
            </div><!-- End .cat-banner -->
          </div><!-- End .col-xl-3 -->

          <div class="col-xl-10 col-xxl-9">
            <carousel
              ref="scrollableContainerCarosel"
              :breakpoints="breakpoints"
              class="carousel-wrapper owl-full carousel-equal-height carousel-with-shadow"
              :autoplay="5000"
              :wrap-around="true"
              :pause-autoplay-on-hover="true"
              @load="adjustTheClass1Height"
            >
              <slide v-for="(item, index) in productsColdroom" :key="index">
                <div class="product text-center">
                  <figure class="product-media">
                    <!-- <span class="product-label label-sale">Sale</span> -->
                    <router-link :to="getProductLink(item.id, item.name, item.model_number)">
                      <img
                        v-lazy:src="'/storage/' + item.main_image_path"
                        :src="'/storage/' + item.main_image_path"
                        alt="Product image"
                        class="product-image"
                      />
                    </router-link>

                    <div class="product-action-vertical">
                      <a href="#" class="btn-product-icon btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                      <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                    </div><!-- End .product-action-vertical -->

                    <div class="product-action">
                      <a href="#" class="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                    </div><!-- End .product-action -->
                  </figure><!-- End .product-media -->

                  <div class="product-body">
                    <div class="product-cat">
                      <a href="#">Cooking Appliances - </a>
                    </div><!-- End .product-cat -->
                    <h3 class="product-title">
                      <router-link :to="getProductLink(item.id, item.name, item.model_number)">
                        {{ item.name }}
                      </router-link>
                    </h3><!-- End .product-title -->
                    <div class="product-price">
                      <span class="new-price">$249.99</span>
                    </div><!-- End .product-price -->

                    <br />
                  </div><!-- End .product-body -->
                </div><!-- End .product -->
              </slide>

              <template #addons>
                <Navigation />
              </template>
            </carousel><!-- End .owl-carousel -->
          </div><!-- End .col-xl-9 -->
        </div><!-- End .row cat-banner-row -->


        <div class="row cat-banner-row">
          <div class="col-xl-2 col-xxl-3">
            <div class="cat-banner row no-gutters">
              <div class="cat-banner-list col-sm-6 d-xl-none d-xxl-flex" style="background-image: url(../assets/images/banner-bg-4.jpg);">
                <div class="banner-list-content">
                  <h2><a href="#">Cooking </a></h2>

                  <ul>
                    <li><a href="#">Cookware</a></li>
                    <li><a href="#">Dinnerware</a></li>
                    <li><a href="#">Cups</a></li>
                    <li><a href="#">Microwaves</a></li>
                    <li><a href="#">Toasters</a></li>
                    <li><a href="#">Coffee Makers</a></li>
                    <li class="list-all-link">
                      <a href="#">See All Departments</a>
                    </li>
                  </ul>
                </div><!-- End .banner-list-content -->
              </div><!-- End .col-sm-6 -->

              <div class="col-sm-6 col-xl-12 col-xxl-6">
                <div class="banner banner-overlay">
                  <a href="#">
                    <img src="../assets/images/demos/demo-14/banners/banner-10.jpg" alt="Banner img desc" />
                  </a>

                  <div class="banner-content">
                    <h4 class="banner-subtitle text-white">
                      <a href="#">Best Deals</a>
                    </h4><!-- End .banner-subtitle -->
                    <h4 class="banner-title text-white">
                      <a href="#">Commercial <br />Kitchen <!-- <br><span>Efficiency, Precision, and Flavor</span> --></a>
                    </h4><!-- End .banner-title -->
                    <a href="#" class="banner-link">Shop Now <i class="icon-long-arrow-right"></i></a>
                  </div><!-- End .banner-content -->
                </div><!-- End .banner -->
              </div><!-- End .col-sm-6 -->
            </div><!-- End .cat-banner -->
          </div><!-- End .col-xl-3 -->

          <div class="col-xl-10 col-xxl-9">
            <carousel
              ref="scrollableContainerCarosel"
              :breakpoints="breakpoints"
              class="carousel-wrapper owl-full carousel-equal-height carousel-with-shadow"
              :autoplay="5000"
              :wrap-around="true"
              :pause-autoplay-on-hover="true"
              @load="adjustTheClass1Height"
            >
              <slide v-for="(item, index) in productsLaundry" :key="index">
                <div class="product text-center">
                  <figure class="product-media">
                    <!-- <span class="product-label label-sale">Sale</span> -->
                    <router-link :to="getProductLink(item.id, item.name, item.model_number)">
                      <img
                        v-lazy:src="'/storage/' + item.main_image_path"
                        :src="'/storage/' + item.main_image_path"
                        alt="Product image"
                        class="product-image"
                      />
                    </router-link>

                    <div class="product-action-vertical">
                      <a href="#" class="btn-product-icon btn-wishlist" title="Add to wishlist"><span>add to wishlist</span></a>
                      <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                    </div><!-- End .product-action-vertical -->

                    <div class="product-action">
                      <a href="#" class="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                    </div><!-- End .product-action -->
                  </figure><!-- End .product-media -->

                  <div class="product-body">
                    <div class="product-cat">
                      <a href="#">Cooking Appliances - </a>
                    </div><!-- End .product-cat -->
                    <h3 class="product-title">
                      <router-link :to="getProductLink(item.id, item.name, item.model_number)">
                        {{ item.name }}
                      </router-link>
                    </h3><!-- End .product-title -->
                    <div class="product-price">
                      <span class="new-price">$249.99</span>
                    </div><!-- End .product-price -->

                    <br />
                  </div><!-- End .product-body -->
                </div><!-- End .product -->
              </slide>

              <template #addons>
                <Navigation />
              </template>
            </carousel><!-- End .owl-carousel -->
          </div><!-- End .col-xl-9 -->
        </div><!-- End .row cat-banner-row -->
      </div><!-- End .container -->

      <div class="container-fluid pb-4 pt-5">
        <div class="headings">
          <h3 class="heading text-primary">
            Our Showrooms
          </h3>
          <h4 class="sub-heading">
            Welcome to Sheffield showrooms
          </h4>
        </div>

        <div class="row justify-content-left">
          <div v-for="showroom in showrooms" :key="showroom.id" class="col-sm-6 col-lg-3">
            <article class="entry entry-grid">
              <figure class="entry-media">
                <router-link :to="getShowroomLink(showroom.id, showroom.name)">
                  <img style="aspect-ratio: 3 / 2;" :src="'/storage/'+ showroom.main_image_path" alt="image desc" />
                </router-link>
              </figure><!-- End .entry-media -->

              <div class="entry-body text-center pt-1">
                <h2 class="entry-title">
                  <router-link :to="getShowroomLink(showroom.id, showroom.name)">
                    {{ showroom.name }}
                  </router-link>
                </h2><!-- End .entry-title -->

                <div class="entry-content">
                  <p>
                    <span>
                      <i style="color:rgb(223, 31, 49);" class="icon-phone "></i>
                      <b>

                        <a
                          style="color: #777; text-decoration: none;"
                          onmouseover="this.style.color='#c02434'"
                          onmouseout="this.style.color='#777'"
                          class="text-grey pl-3"
                          :href="'tel:' + showroom.phone_number1"
                        >{{ showroom.phone_number1 }}</a>,

                        <a
                          style="color: #777; text-decoration: none;"
                          onmouseover="this.style.color='#c02434'"
                          onmouseout="this.style.color='#777'"
                          class="text-grey"
                          :href="'tel:' + showroom.phone_number2"
                        >{{ showroom.phone_number2 }}</a>

                      </b>
                    </span><br />
                    <span>
                      <i style="color:rgb(223, 31, 49);" class="icon-envelope "></i>
                      <b>
                        <a
                          style="color: #777; text-decoration: none;"
                          onmouseover="this.style.color='#c02434'"
                          onmouseout="this.style.color='#777'"
                          class="text-grey pl-3"
                          :href="'mailto:'+showroom.email"
                        >{{ showroom.email }} </a>
                      </b>
                    </span><br />
                    {{ showroom.location }}
                  </p>

                  <router-link :to="getShowroomLink(showroom.id, showroom.name)" class="btn btn-outline-primary">
                    <span>View More</span><i class="icon-long-arrow-right"></i>
                  </router-link>
                </div><!-- End .entry-content -->
              </div><!-- End .entry-body -->
            </article><!-- End .entry -->
          </div><!-- End .col-lg-3 -->
        </div><!-- End .row -->
      </div>
      <!-- End .container-fluid -->

      <div class="container-fluid banner-blogs">
        <div class="row">
          <div class="col-xl-12">
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-md-6">
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

                  <div class="col-md-6">
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
            <!-- End .mb-5 -->

            <div class="container pb-4">
              <div class="headings">
                <h3 class="heading text-primary">
                  Testimonials
                </h3>
                <h4 class="sub-heading">
                  What clients say about us
                </h4>
              </div>

              <carousel
                :per-page="1"
                :autoplay="10000"
                :wrap-around="true"
                :pause-autoplay-on-hover="true"
              >
                <slide v-for="(item, index) in testimonials" :key="index">
                  <!-- <img :src="getImage(item)" :alt="item.alt"> -->
                  <!-- <div>{{ item.text }}</div> -->

                  <blockquote class="testimonial text-center">
                    <img
                      :src="item.image"
                      :alt="item.alt"
                    />
                    <p>
                      “ {{ item.message }} ”
                    </p>

                    <cite>
                      {{ item.name }}
                      <span>{{ item.job_title }}</span>
                    </cite>
                  </blockquote>
                </slide>
                <template #addons>
                  <Navigation />
                </template>
              </carousel>
            </div>
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
  <div
    id="newsletter-popup-form"
    class="container newsletter-popup-container mfp-hide"
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
                get <span>Best<light /></span> Deals
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
                    <button class="btn" type="submit">
                      <span>go</span>
                    </button>
                  </div>
                  <!-- .End .input-group-append -->
                </div>
                <!-- .End .input-group -->
              </form>
              <div class="custom-control custom-checkbox">
                <input
                  id="register-policy-2"
                  type="checkbox"
                  class="custom-control-input"
                  required
                />
                <label
                  class="custom-control-label"
                  for="register-policy-2"
                >Do not show this popup again</label>
              </div>
              <!-- End .custom-checkbox -->
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
  </div>
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

  .megamenu-container{

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

  .menu-vertical .megamenu {


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



</style>
