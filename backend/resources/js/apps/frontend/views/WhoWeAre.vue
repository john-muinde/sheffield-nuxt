<template>
  <main class="main">
    <div
      class="page-header text-center"
      style="background-image: url('assets/images/page-header-bg.jpg')"
    >
      <div class="container">
        <h1 class="page-title">
          About us<span>Pages</span>
        </h1>
      </div>
      <!-- End .container -->
    </div>
    <!-- End .page-header -->
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            About us
          </li>
        </ol>
      </div>
      <!-- End .container -->
    </nav>
    <!-- End .breadcrumb-nav -->

    <div class="page-content pb-3">
      <div class="container">
        <div class="row">
          <div class="col-10">
            <div class="headings">
              <h4 class="sub-heading">
                Sheffield Green Solutions
              </h4>
              <h3 class="heading text-primary">
                Who We Are
              </h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5 col-sm-12">
            <!-- End .title text-center mb-2 -->
            <p>
              Sheffield is an end to end Kitchen, Laundry and
              Cold-room solution provider, offering innovative
              products and services through concept development,
              designing, sourcing, fabrication and installation to
              after-sales service.
            </p>
            <p>
              Our solutions cater for multiple segments from
              hotels, restaurants, healthcare, retail, education
              institutions, corporates, government, real estate,
              community and religious centres with projects and
              spanning across the African continent.
            </p>
            <p>
              Sheffield Africa is the entrepreneurial brainchild
              of Dr. Suresh Kanotra, an engineer by profession,
              who envisioned the need for products and services
              that were customized for the African market.
            </p>
            <p>
              In 2003 the need for Commercial Kitchen and
              Restaurant solutions was served primarily by
              imported equipment that were not made for local
              conditions and often failed to work. And with the
              added issue of unavailability of local service and
              spares, Dr. Kanotra set up Sheffield Africa with a
              view to providing customized solutions.
            </p>
          </div>
          <!-- End .col-lg-5 -->

          <div class="col-md-5 col-sm-12">
            <div class="">
              <img
                src="../assets/images/about/img-1.jpg"
                alt=""
                class="about-img-front"
              />
            </div>
            <!-- End .about-images -->
          </div>
          <!-- End .col-lg-6 -->
        </div>
        <!-- End .row -->
      </div>
      <!-- End .container -->

      <div class="mb-2"></div>
      <!-- End .mb-2 -->

      <div
        class="icon-boxes-container"
        :style="{
          backgroundImage:
            'url(/assets/images/sheffield_stainless_steel_background.jpg)',
        }"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6 col-lg-3 offset-lg-1">
              <div class="icon-box icon-box-side">
                <div class="icon-box-content">
                  <div class="text-center">
                    <span class="icon-box-icon">
                      <i class="icon-rocket"></i>
                    </span>
                    <h3 class="text-primary">
                      Mission
                    </h3>
                  </div>
                  <!-- End .icon-box-title -->
                  <p>
                    To continuously design, develop,
                    manufacture, source, supply and install
                    the complete commercial food & beverage
                    service equipment that support the
                    hospitality industry, and all industries
                    we engage with, offering a wide range of
                    branded products as well as custom made
                    solutions to meet our clients’ needs. We
                    shall provide Support, requisite spares
                    and servicing while working in
                    partnership with our customers, vendors
                    and employees to the mutual benefit of
                    all.
                  </p>
                </div>
                <!-- End .icon-box-content -->
              </div>
              <!-- End .icon-box -->
            </div>
            <!-- End .col-sm-6 col-lg-4 -->

            <div class="col-sm-6 col-lg-3 offset-lg-1">
              <div class="icon-box icon-box-side">
                <div class="icon-box-content">
                  <div class="text-center">
                    <span class="icon-box-icon">
                      <i class="icon-rotate-left"></i>
                    </span>
                    <h3 class="text-primary">
                      Vision
                    </h3>
                  </div>
                  <!-- End .icon-box-title -->
                  <p>
                    To be the leading company in Africa, for
                    the design, supply, installation and
                    maintenance of commercial food service
                    and Laundry equipment and be a “one stop
                    shop” for providing solutions and
                    services for any commercial food related
                    business.
                  </p>
                </div>
                <!-- End .icon-box-content -->
              </div>
              <!-- End .icon-box -->
            </div>
            <!-- End .col-sm-6 col-lg-4 -->

            <div class="col-sm-6 col-lg-3 offset-lg-1">
              <div class="icon-box icon-box-side">
                <div class="icon-box-content">
                  <div class="text-center">
                    <span class="icon-box-icon">
                      <i class="icon-info-circle"></i>
                    </span>
                    <h3 class="text-primary">
                      Quality Policy
                    </h3>
                  </div>
                  <!-- End .icon-box-title -->
                  <p>
                    Sheffield is committed to total customer
                    satisfaction. This is achieved through
                    well instituted checks and measures for
                    all aspects of operations including
                    timely delivery and task processing.
                    These checks and measures are further
                    monitored for continuous improvement.
                  </p>
                </div>
                <!-- End .icon-box-content -->
              </div>
              <!-- End .icon-box -->
            </div>
            <!-- End .col-sm-6 col-lg-4 -->
          </div>
          <!-- End .row -->
        </div>
        <!-- End .container-fluid -->
      </div>
      <!-- End .icon-boxes-container -->

      <div class="mb-2"></div>
      <!-- End .mb-2 -->

      <div class="container-fluid container-fluid-max-width">
        <div class="row">
          <div class="col-12 border-with-company-colors">
            <div class="banner banner-big">
              <a href="#">
                <img
                  v-if="isDesktop"
                  src="../assets/images/sheffield-stainless-steel.jpg"
                  alt="Banner"
                />
                <img
                  v-if="!isDesktop"
                  src="../assets/images/sheffield_stainless_steel_background.jpg"
                  alt="Banner"
                />
              </a>

              <div class="banner-content">
                <h3 class="banner-title text-primary">
                  Company History
                </h3>
                <h4 class="banner-subtitle text-dark">
                  See Our Growth Trajectory
                </h4>
                <!-- End .banner-subtitle -->

                <!-- End .banner-title -->
                <p class="text-dark">
                  In 2003 the need for Commercial Kitchen and
                  Restaurant solutions was served primarily by
                  imported equipment that were not made for
                  local conditions and often failed to work.
                  And with the added issue of unavailability
                  of local service and spares, Dr. Kanotra set
                  up Sheffield Africa with a view to providing
                  customized solutions in the Kenyan and
                  ultimately African market, that had its own
                  special requirements of durability, ease of
                  operation, value and quality.
                </p>

                <router-link
                  to="/sheffield-history"
                  class="btn btn-primary btn-rounded"
                >
                  <span>Check Out Growth Trajectory</span><i class="icon-long-arrow-right"></i>
                </router-link>
              </div>
              <!-- End .banner-content -->
            </div>
            <!-- End .banner -->
          </div>
          <!-- End .col-12 -->
        </div>
      </div>
    </div>
    <!-- End .page-content -->
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

const getImage = (item) => {
    if (isDesktop.value) {
        return item.image;
    } else {
        return item.mobileImage;
    }
};
</script>

<style scoped></style>
