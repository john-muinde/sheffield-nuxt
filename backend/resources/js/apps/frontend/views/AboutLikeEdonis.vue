<template>
  <main class="main">
    <div class="row ">
      <div class="col-lg-3">
        <div class="banner banner-big" style="overflow: hidden;">
          <a href="#">
            <img
              style="height: 580px;
    width: auto;"
              src="/assets/images/about_us.jpeg"
              alt="Banner"
            />
          </a>

          <div class="banner-content">
            <h4 class="banner-subtitle text-primary">
              Green Solutions
            </h4><!-- End .banner-subtitle -->
            <h3 class="banner-title text-white">
              Learn More <br />about us.
            </h3><!-- End .banner-title -->
            <!-- <p class="d-none d-lg-block">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, posuere a, pede.</p>  -->

            <a href="/contact-us" class="btn btn-primary btn-rounded"><span>Contact Us</span><i
              class="icon-long-arrow-right"
            ></i></a>
          </div><!-- End .banner-content -->
        </div>
      </div>
      <div class="col-lg-5">
        <div class="banner banner-big">
          <iframe
            width="100%"
            height="580"
            src="https://my.matterport.com/show/?m=JoKVFg4gceE&autoplay=1"
            frameborder="0"
            allowfullscreen
            allow="xr-spatial-tracking"
          ></iframe>

          <!-- <div class="banner-content">
                                    <h4 class="banner-subtitle">Quisque a lectus</h4>
                                    <h3 class="banner-title">Morbi in sem <br>placerat.</h3>
                                    <a href="#" class="btn btn-primary btn-rounded"><span>Click Here</span><i class="icon-long-arrow-right"></i></a>
                                </div> -->
          <!-- End .banner-content -->
        </div><!-- End .banner -->
      </div><!-- End .col-lg-8 -->

      <div class="col-lg-4">
        <div class="row">
          <div class="col-sm-6 col-lg-12">
            <div class="banner">
              <div
                class="video-banner video-banner-bg bg-image text-center overlayed-div"
                style="background-image: url(/assets/images/about_us.jpeg); height:200px;"
              >
                <div class="container">
                  <!-- <h3 class="video-banner-title h1 text-white"><strong>About Us</strong><span>Your Premier Solution and Service Provider for Commercial Kitchen, Laundry, and Cold Storage Solutions in East Africa and Beyond. </span></h3> --><!-- End .video-banner-title -->
                  <!-- <a href="https://www.youtube.com/watch?v=YvhZ9lOAnSc" class="btn-video btn-iframe"><i class="icon-play"></i></a> -->
                  <a class="btn-video btn-iframe" @click="showVideoPopup"><i
                    class="icon-play"
                  ></i></a>

                  <video-popup
                    :show-popup="isVideoPopupVisible"
                    :video-url="videoUrl"
                    @close="hideVideoPopup"
                  />
                </div>
              </div>

              <!-- <div class="banner-content">
                                            <h4 class="banner-subtitle">Quisque a lectus</h4>
                                            <h3 class="banner-title text-white">Donec consectetuer <br>ligula vulputate.</h3>
                                            <a href="#" class="banner-link">Click here</a>
                                        </div> -->
            </div><!-- End .banner -->
          </div><!-- End .col-sm-6 col-lg-12 -->

          <div class="col-sm-6 col-lg-12">
            <div class="banner">
              <div
                class="video-banner video-banner-bg bg-image text-center overlayed-div"
                style="background-image: url(/assets/images/about_us.jpeg); height:20px;"
              >
                <div class="container">
                  <!-- <h3 class="video-banner-title h1 text-white"><strong>About Us</strong><span>Your Premier Solution and Service Provider for Commercial Kitchen, Laundry, and Cold Storage Solutions in East Africa and Beyond. </span></h3> --><!-- End .video-banner-title -->
                  <!-- <a href="https://www.youtube.com/watch?v=YvhZ9lOAnSc" class="btn-video btn-iframe"><i class="icon-play"></i></a> -->
                  <a class="btn-video btn-iframe" @click="showVideoPopup"><i
                    class="icon-play"
                  ></i></a>

                  <video-popup
                    :show-popup="isVideoPopupVisible"
                    :video-url="videoUrl"
                    @close="hideVideoPopup"
                  />
                </div>
              </div>
            </div><!-- End .banner -->
          </div><!-- End .col-sm-6 col-lg-12 -->
        </div><!-- End .row -->
      </div><!-- End .col-lg-4 -->
    </div><!-- End .row -->

    <div class="page-content pg-white">
      <div class="pt-6 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-lg-1">
              <div class="row">
                <div class="col-lg-5 mb-3 mb-lg-0 pt-4">
                  <h2 class="title ">
                    WHO WE ARE
                  </h2><!-- End .title -->
                  <p class="lead text-primary mb-3">
                    Transforming Ideas into Sustainable Realities
                  </p>
                  <!-- End .lead text-primary -->
                  <p class="mb-2">
                    Sheffield Steel Systems Limited was founded in 2003 and has expanded
                    over the years to become East Africa’s leading solution and service provider for
                    Commercial Kitchen, Laundry, and Cold Storage Solutions with a niche in
                    Stainless Steel Fabrication and Customization.
                    A Kenyan company Headquartered in Nairobi, with country offices in Uganda and
                    Rwanda and project executions across the continent from Ethiopia, Burundi, South
                    Sudan, Nigeria to Congo with ventures into more territories and new business
                    lines.
                    A Pan African company focused on providing solutions built to last in Africa.
                  </p>

                  <router-link
                    to="/about-us/sheffield-advantage"
                    class="btn btn-sm btn-minwidth btn-outline-primary-2"
                  >
                    <span>VIEW SHEFFIELD ADVANTAGES</span>
                    <i class="icon-long-arrow-right"></i>
                  </router-link>
                </div><!-- End .col-lg-5 -->

                <div class="col-lg-6 offset-lg-1">
                  <div class="about-images">
                    <img
                      style="margin-left: -10%; margin-top: 10%;"
                      src="/assets/images/sheffield_building_about.jpg"
                      alt=""
                      class="about-img-front"
                    />
                    <img
                      style="margin-top: 0%; margin-right:-15%"
                      src="/assets/images/about_us_back.jpg"
                      alt=""
                      class="about-img-back"
                    />
                  </div><!-- End .about-images -->
                </div><!-- End .col-lg-6 -->
              </div>
            </div>
          </div><!-- End .row -->
        </div><!-- End .container -->
      </div>
    </div>



    <div class="page-content pg-my-blue pt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-lg-1">
            <div class="row">
              <div class="col-md-5 pt-4">
                <h2 class="title">
                  METHODOLOGY
                </h2><!-- End .title -->
                <p class="lead text-primary mb-3">
                  The process at Sheffield Steel Systems
                </p>
                <!-- End .lead text-primary -->
              </div>

              <div class="col-md-12">
                <p>
                  Understanding our clients’ concepts and space requirements is key to us. We will
                  conduct a site assessment and our in-house team of AutoCAD engineers will design the
                  equipment layout which includes 2D, 3D, Elevations, Isometrics, and Service layouts
                  for a model view of your end solution and product.
                </p>
                <p>
                  We will then customize all your stainless steel requirements in-house at our
                  fabrication plant and our installation team will install the equipment and train the
                  users.
                  Our service continues with our after-sales support and with our team of technicians
                  who are available on call.
                </p>
              </div>

              <div class="col-md-12 ">
                <!-- <ol class="disc-list mt-5 pb-4">

                                  <li>
                                    <span>IMPORTATION</span>
                                    <svg class="pointer">
                                      <path d="M6.25,1.25L11.25,11.25L1.25,11.25L6.25,1.25Z" />
                                    </svg>
                                  </li>
                                  <li>
                                    <span>CHOICE OF EQUIPMENT</span>
                                    <svg class="pointer">
                                      <path d="M6.25,1.25L11.25,11.25L1.25,11.25L6.25,1.25Z" />
                                    </svg>
                                  </li>
                                  <li>
                                    <span>STAINLESS STEEL MANUFACTURING</span>
                                    <svg class="pointer">
                                      <path d="M6.25,1.25L11.25,11.25L1.25,11.25L6.25,1.25Z" />
                                    </svg>
                                  </li>
                                  <li>
                                    <span>SITE INSTALLATION</span>
                                    <svg class="pointer">
                                      <path d="M6.25,1.25L11.25,11.25L1.25,11.25L6.25,1.25Z"/>
                                    </svg>
                                  </li>
                                  <li>
                                    <span>QUALITY CONTROL & TESTING</span>
                                    <svg class="pointer">
                                      <path d="M6.25,1.25L11.25,11.25L1.25,11.25L6.25,1.25Z"/>
                                    </svg>
                                  </li>
                                  <li>
                                    <span>TRAINING</span>
                                    <svg class="pointer">
                                      <path d="M6.25,1.25L11.25,11.25L1.25,11.25L6.25,1.25Z"/>
                                    </svg>
                                  </li>
                                  <li>
                                    <span>SPARE PARTS AND MAINTENANCE CONTRACTS</span>
                                    <svg class="pointer">
                                      <path d="M6.25,1.25L11.25,11.25L1.25,11.25L6.25,1.25Z"/>
                                    </svg>
                                  </li>


                                </ol> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="page-content pt-5" :style="{ backgroundImage: 'url(/assets/images/methodology-gray.jpg)' }">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-lg-1">
            <div class="row">
              <div class="col-md-5 pt-4">
                <h2 class="title">
                  METHODOLOGY
                </h2><!-- End .title -->
                <p class="lead text-primary mb-3">
                  The process at Sheffield Steel Systems
                </p>
                <!-- End .lead text-primary -->
              </div>

              <div class="col-md-12 justify-content-center">
                <div class="links-container">
                  <a
                    href="#"
                    class="w3-button w3-round-xlarge w3-theme-l1 w3-border link"
                    target="_blank"
                  >

                    <div class="met-image">
                      <img src="/assets/images/methodology/methodology01.png" />
                    </div>

                    <div class="met-description">
                      <span class="pull-center">CUSTOMER BRIEF</span>
                    </div>
                  </a>



                  <a
                    href="#"
                    class="w3-button w3-round-xlarge w3-theme-l1 w3-border link"
                    target="_blank"
                  >

                    <div class="met-image">
                      <img src="/assets/images/methodology/methodology02.png" />
                    </div>

                    <div class="met-description">
                      <span class="pull-center">CUSTOMER BRIEF</span>
                    </div>
                  </a>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="page-content bg-image-breaker bg-image-breaker1">
      <!--  <img class="image1" src="/assets/images/about_workshop.jpeg"> -->
    </div>

    <div
      class="page-content pb-0 page-content-counter"
      :style="{ backgroundImage: 'url(/assets/images/sheffield_stainless_steel_background.jpg)', }"
    >
      <div class="container mt-0">
        <div class="row text-center icon-boxes-container">
          <div class="col counter_col">
            <i class="fa fa-user text-primary" style="font-size: 3.5rem"></i>
            <h3 class="count-to text-primary mb-0">
              {{ projectsCount }}+
            </h3>
            <p>Projects</p>
          </div>
          <div class="col counter_col">
            <i class="fa fa-star text-primary" style="font-size: 3.5rem"></i>
            <h3 class="count-to text-primary mb-0">
              {{ conceptsCount }}+
            </h3>
            <p>Innovative Concepts</p>
          </div>
          <div class="col counter_col">
            <i class="fa fa-coffee text-primary" style="font-size: 3.5rem"></i>
            <h3 class="count-to text-primary mb-0">
              {{ trainingdemosCount }}+
            </h3>
            <p>Training Demos</p>
          </div>
          <div class="col counter_col">
            <i class="far fa-chart-bar text-primary" style="font-size: 3.5rem"></i>
            <h3 class="count-to text-primary mb-0">
              {{ yearsCount }}+
            </h3>
            <p>Years’ Experience</p>
          </div>

          <div class="col counter_col">
            <i class="far fa-chart-bar text-primary" style="font-size: 3.5rem"></i>
            <h3 class="count-to text-primary mb-0">
              {{ stopCount }}
            </h3>
            <p>Stop Shop Solution</p>
          </div>
        </div>
      </div>
    </div>
    <!-- End .page-content -->

    <div class="page-content bg-about-black div-after-bg-image-breaker">
      <div class="pt-6 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-lg-1">
              <div class="row">
                <div class="col-lg-5 mb-3 mb-lg-0 pt-4">
                  <h2 class="title">
                    CULTURE
                  </h2><!-- End .title -->
                  <p class="lead text-primary mb-3">
                    Nurturing Innovation, Embracing Unity
                  </p>
                  <!-- End .lead text-primary -->
                  <p class="mb-2">
                    At Sheffield, we work in a collaborative work culture with an
                    open-door policy that encourages interaction and emphasizes our value for
                    collective teamwork dynamics. The culture blend comes in through inspirational
                    leaders who are always willing to take risks that will benefit the organization.
                    Being a company that thrives on new ideas in both product and concept design,
                    Sheffield’s environment encourages open-minded, innovative, and driven
                    employees.
                  </p>

                  <!-- <router-link to="/about-us/sheffield-advantage" class="btn btn-sm btn-minwidth btn-outline-primary-2">
                                        <span>VIEW SHEFFIELD ADVANTAGES</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </router-link> -->
                </div><!-- End .col-lg-5 -->

                <div class="col-lg-6 offset-lg-1">
                  <div class="grid">
                    <ul id="hexGrid">
                      <li class="hex">
                        <div class="hexIn">
                          <div class="hexLink">
                            <div
                              class="img"
                              style="background-image:url(assets/images/homepage/sheffield_engineer.jpg);"
                            >
                            </div>
                            <!-- <h1 id="demo1">This is a title</h1>
                                                <p id="demo2">Some sample text about the article this hexagon leads to</p> -->
                          </div>
                        </div>
                      </li>

                      <li class="hex">
                        <div class="hexIn">
                          <div class="hexLink">
                            <div
                              class="img"
                              style="background-image: url(assets/images/oceans.jpg);"
                            >
                              <video
                                id="myVideo"
                                autoplay
                                muted
                                loop
                                class="my-video"
                                @play="hideOverlay"
                              >
                                <source
                                  src="/assets/videos/oceans.mp4"
                                  type="video/mp4"
                                />
                              </video>
                            </div>
                            <!-- <h1 id="demo1">This is a title</h1>
                                                <p id="demo2">Some sample text about the article this hexagon leads to</p> -->
                          </div>
                        </div>
                      </li>
                      <li class="hex">
                        <div class="hexIn">
                          <div class="hexLink">
                            <div
                              class="img"
                              style="background-image: url(assets/images/workshop_sheffield.jpg);"
                            >
                            </div>
                            <!-- <h1 id="demo1">This is a title</h1>
                                                <p id="demo2">Some sample text about the article this hexagon leads to</p> -->
                          </div>
                        </div>
                      </li>
                      <li class="hex">
                        <div class="hexIn">
                          <div class="hexLink">
                            <div
                              class="img"
                              style="background-image: url(assets/images/tree.jpg);"
                            >
                              <video
                                id="myVideo"
                                autoplay
                                muted
                                loop
                                class="my-video"
                                @play="hideOverlay"
                              >
                                <source
                                  src="/assets/videos/wind_energy.mp4"
                                  type="video/mp4"
                                />
                              </video>
                            </div>
                            <!-- <h1 id="demo1">This is a title</h1>
                                                <p id="demo2">Some sample text about the article this hexagon leads to</p> -->
                          </div>
                        </div>
                      </li>
                      <li class="hex">
                        <div class="hexIn">
                          <div class="hexLink">
                            <div
                              class="img"
                              style="background-image: url(assets/images/welding.jpg);"
                            >
                            </div>
                            <!-- <h1 id="demo1">This is a title</h1>
                                                <p id="demo2">Some sample text about the article this hexagon leads to</p> -->
                          </div>
                        </div>
                      </li>
                      <li class="hex">
                        <div class="hexIn">
                          <div class="hexLink">
                            <div
                              class="img"
                              style="background-image: url(assets/images/chef.jpg);"
                            >
                            </div>
                            <!-- <h1 id="demo1">This is a title</h1>
                                                <p id="demo2">Some sample text about the article this hexagon leads to</p> -->
                          </div>
                        </div>
                      </li>

                      <li class="hex">
                        <div class="hexIn">
                          <div class="hexLink">
                            <div
                              class="img"
                              style="background-image: url(assets/images/tree.jpg);"
                            >
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
                            <!-- <h1 id="demo1">This is a title</h1>
                                                <p id="demo2">Some sample text about the article this hexagon leads to</p> -->
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div><!-- End .col-lg-6 -->
              </div>
            </div>
          </div><!-- End .row -->
        </div><!-- End .container -->
      </div>
    </div>

    <div class="page-content bg-about-light-blue">
      <div class="pt-6 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-lg-1">
              <div class="row">
                <div class="col-lg-5 mb-3 mb-lg-0 pt-4">
                  <h2 class="title">
                    PEOPLE
                  </h2><!-- End .title -->
                  <p class="lead text-primary mb-3">
                    Meet our amazing team
                  </p>
                  <!-- End .lead text-primary -->
                  <p class="mb-2">
                    Sheffield boasts of a team of qualified professionals with expertise
                    in Engineering, Project Management, and Technical Skills that contribute to the
                    process of Innovation and The Sheffield Methodology.
                  </p>

                  <!-- <router-link to="/about-us/sheffield-advantage" class="btn btn-sm btn-minwidth btn-outline-primary-2">
                                        <span>VIEW SHEFFIELD ADVANTAGES</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </router-link> -->
                </div><!-- End .col-lg-5 -->

                <div class="col-md-6 offset-md-1">
                  <div class="colored-card  mt-5">
                    <h5 class="text-4 pt-3 pl-2">
                      Sheffield Team In Numbers
                    </h5>


                    <div class="row icon-boxes-container pl-2">
                      <div class="col counter_col">
                        <h3 class="count-to text-primary mb-0">
                          {{ staffCount }}+ <span> Staff</span>
                        </h3>

                        <h3 class="count-to text-primary mb-0">
                          {{ engineersCount }}+&nbsp; <span> Engineering & Technical Skilled
                            Crew</span>
                        </h3>

                        <h3 class="count-to text-primary mb-0">
                          {{ executiveCount }}+&nbsp;&nbsp;&nbsp; <span> Executive
                            Leaders</span>
                        </h3>

                        <h3 class="count-to text-primary mb-0">
                          {{ designCount }}+&nbsp;&nbsp;&nbsp; &nbsp;<span> Design
                            Engineers</span>
                        </h3>

                        <h3 class="count-to text-primary mb-0">
                          {{ inhouseCount }}+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>
                            In-house Chefs & Baristas</span>
                        </h3>
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

    <div class="page-content bg-image-breaker  bg-image-breaker2">
      <!-- <img class="image2" src="/assets/images/about_image.jpeg"> -->
    </div>

    <div class="page-content pg-my-black  pt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-lg-1">
            <div class="row">
              <div class="col-md-5 pt-4">
                <h2 class="title">
                  LEADERSHIP
                </h2><!-- End .title -->
                <p class="lead text-primary mb-3">
                  Meet the Minds Behind Our Success
                </p>
                <!-- End .lead text-primary -->
              </div>

              <div class="col-md-12">
                <p>
                  Our leadership team is made up of dedicated, focused, and experienced executives
                  working with each other and their teams to implement Sheffield’s strategy and
                  vision, their knowledge and experience come together to make a difference for all
                  our stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10 offset-lg-1 justify-content-center">
            <div class="row about-team-container about-team-container1 justify-content-center">
              <div class="col-md-3 mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="assets/images/team/MD - Suresh Kanotra website.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">
                      Dr. Suresh Kanotra
                    </div>
                    <div class="job-title">
                      Managing Director
                    </div>
                  </div>
                  <div class="description description-text-right">
                    Dr. Suresh Kanotra, the founder of Sheffield Africa, envisioned the need in the
                    African market for solutions & services in the food and beverage industry. With
                    an engineering background, he started Sheffield Steel Systems Limited and
                    continuously seeks to innovate & tailor-make durable, efficient, and smart
                    solutions.
                  </div>
                </div>
              </div>

              <div class="col-md-3 mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="assets/images/team/Saveer-Singh-Vohra.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">
                      Saveer Vohra
                    </div>
                    <div class="job-title">
                      Financial Director
                    </div>
                  </div>
                  <div class="description description-text-right">
                    Mr. Saveer Vohra has a Bachelor’s degree in Civil Engineering and a Master’s in
                    Finance from the University of Warwick in the UK.
                    As the Financial Director, he ensures the Company is aligned with financial
                    growth, strategy, and a profitable vision.
                  </div>
                </div>
              </div>

              <div class="col-md-3 mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="assets/images/team/samman.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">
                      Samman Vohra
                    </div>
                    <div class="job-title">
                      Business Development & Strategy Director
                    </div>
                  </div>
                  <div class="description description-text-left">
                    Samman is a distinguished graduate from the CASS Business School, City
                    University of London, with a strong background in business, economics, finance,
                    and marketing. Leveraging international exposure and academic expertise, Samman
                    works on special projects, drives revenue growth, identifies new opportunities,
                    and strengthens the Sheffield brand whilst managing partnerships, aligning
                    business goals, and providing cross-functional leadership, contributing
                    significantly to our company's success and vision for the future.
                  </div>
                </div>
              </div>
            </div>


            <div class="row about-team-container about-team-container2 mb-3">
              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="assets/images/team/Vikas-removebg-preview.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">
                      Vikas Sharma
                    </div>
                    <div class="job-title">
                      Business Development Head
                    </div>
                  </div>
                  <div class="description description-text-right">
                    As the Business Development Head, Vikas drives the organization's business
                    growth strategies and enhances the current portfolio to explore new business
                    opportunities. With a rich experience ranging from Strategic Management,
                    Marketing, and Brand Management that has had a positive impact on Sheffield’s
                    operations, he efficiently executes business strategies that are in line with
                    the organizational objectives.
                  </div>
                </div>
              </div>

              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="assets/images/team/Simon.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">
                      Simon Mbugua
                    </div>
                    <div class="job-title">
                      Head of Design & Development
                    </div>
                  </div>
                  <div class="description description-text-right">
                    A Mechanical Engineer by profession, Simon specializes in product design 3D &
                    2D, plant maintenance, lean Six Sigma manufacturing, workshop practices, and
                    structural design and integrity. He leads the team of 2D & 3D design engineers,
                    research & development, and project planning.
                  </div>
                </div>
              </div>

              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="assets/images/team/Ann Ajode Pic.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">
                      Ann Ajode
                    </div>
                    <div class="job-title">
                      Customer Relations Manager
                    </div>
                  </div>
                  <div class="description description-text-right">
                    Ann is a proactive & efficient and customer relations professional with over 12
                    years of experience in business development, sales, marketing, and operations
                    coordination with a background in International Relations.
                    She facilitates smooth workflow processes, communication, and integration to
                    enhance customer satisfaction through quality management systems. The customer
                    is the top most priority for her and her team who ensure communication and
                    support through the contact points from enquiries, job processing, execution and
                    after sales support.
                  </div>
                </div>
              </div>

              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="assets/images/team/Mwangi_2.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">
                      Joseph Mwangi
                    </div>
                    <div class="job-title">
                      Service & Installations Manager
                    </div>
                  </div>
                  <div class="description description-text-left">
                    Mwangi supervises all the installation and service technicians to ensure the
                    successful execution of all Sheffield projects by managing all the resources at
                    the site and on the ground including project managers, the technical team,
                    equipment, machinery, materials, and time.
                    With a technical and engineering background, he ensures accurate and effective
                    operations of all projects.
                  </div>
                </div>
              </div>



              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="assets/images/team/Hari G.JPG" />
                  </div>
                  <div class="details">
                    <div class="name">
                      Hari Singh
                    </div>
                    <div class="job-title">
                      Sales Head
                    </div>
                  </div>
                  <div class="description description-text-left">
                    Hari has over 20 Years of experience in Business Development, Distribution,
                    Market Expansion, Penetration and Product Development. He drives the Sheffield
                    sales team to realize the organization's sales goals by leading from the front
                    as the Sales Head to a team that covers the East African Region and Segments. He
                    is responsible for the successful prospecting, planning, execution, monitoring,
                    and closure of sales projects.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="page-content csr-container">
      <div class="pt-6 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-lg-1">
              <div class="row">
                <div class="col-lg-5 mb-3 mb-lg-0 pt-4">
                  <h2 class="title">
                    CSR
                  </h2><!-- End .title -->
                  <p class="lead text-primary mb-3">
                    Making a Difference: Our Commitment to CSR
                  </p>
                  <!-- End .lead text-primary -->
                  <p class="mb-2">
                    Since its inception, Sheffield Africa has been at the forefront of
                    commitment to achieve corporate social responsibility. To underline our deep
                    commitment to making a difference in people’s lives, we are guided by an
                    existing policy that drives initiatives focusing on Education, Employment,
                    Health, Community Development, and Environmental Sustainability.
                  </p>

                  <!-- <router-link to="/about-us/sheffield-advantage" class="btn btn-sm btn-minwidth btn-outline-primary-2">
                                        <span>VIEW SHEFFIELD ADVANTAGES</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </router-link> -->
                </div><!-- End .col-lg-5 -->


                <div class="col-lg-6 offset-lg-1">
                  <div class="csr-image">
                    <img src="/assets/images/sheffield csr.jpg" class="img" alt="" />
                  </div>
                </div><!-- End .col-lg-6 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content bg-about-black div-after-bg-image-breaker">
      <div class="pt-6 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-lg-1">
              <div class="row">
                <div class="col-lg-12 mb-3 mb-lg-0 pt-4">
                  <h2 class="title">
                    PARTNERS
                  </h2><!-- End .title -->
                  <p class="lead text-primary mb-3">
                    Nurturing Innovation, Embracing Unity
                  </p>
                  <!-- End .lead text-primary -->
                  <p class="mb-2">
                    Sheffield partners with world leaders in its product brands and
                    technology. Our partners are like-minded visionary companies continuously
                    innovating to offer the best in the industry
                  </p>

                  <!-- <router-link to="/about-us/sheffield-advantage" class="btn btn-sm btn-minwidth btn-outline-primary-2">
                                        <span>VIEW SHEFFIELD ADVANTAGES</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </router-link> -->
                </div><!-- End .col-lg-5 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img width="100%" src="/assets/images/partners/partners1.png" />
                </div><!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img width="100%" src="/assets/images/partners/partners2.png" />
                </div><!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img width="100%" src="/assets/images/partners/partners3.png" />
                </div><!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img width="100%" src="/assets/images/partners/partners4.png" />
                </div><!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img width="100%" src="/assets/images/partners/partners5.png" />
                </div><!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img width="100%" src="/assets/images/partners/partners6.png" />
                </div><!-- End .col-lg-6 -->
              </div>
            </div>
          </div><!-- End .row -->
        </div><!-- End .container -->
      </div>
    </div>

    <div class="page-content bg-image-breaker   bg-image-breaker3">
      <!-- <img class="image2" src="/assets/images/about_image.jpeg"> -->
    </div>

    <div class="page-content pg-my-blue">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1 mb-5 mt-5">
            <div class="row">
              <div class="col-md-12  mb-3 mb-lg-0 pt-4">
                <h2 class="title">
                  Clients
                </h2><!-- End .title -->
                <p class="lead text-primary mb-3">
                  Partnering with Industry Leaders
                </p>
              </div>
            </div>

            <div class="row main-clients">
              <div class="clients-container mt-3 mb-5">
                <div v-for="client in clientList" :key="client.id" class="">
                  <article class="">
                    <figure class="">
                      <!-- <a href=""> -->
                      <img :src="'/storage/' + client.main_image_path" alt="image desc" />
                      <!--  </a> -->
                    </figure><!-- End .entry-media -->
                  </article><!-- End .entry -->
                </div><!-- End .entry-item -->
              </div><!-- End .entry-container -->
            </div>
          </div>
        </div>
      </div><!-- End .container -->
    </div><!-- End .page-content -->
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, nextTick, watch } from 'vue';
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel';

import { useMeta } from '../../admin/composables/use-meta';
useMeta({ title: 'About Us' });

import VideoPopup from '../components/layout/VideoPopup.vue';

const isVideoPopupVisible = ref(false);
const videoUrl = 'https://www.youtube.com/embed/YvhZ9lOAnSc';

const showVideoPopup = () => {
    isVideoPopupVisible.value = true;
};

const hideVideoPopup = () => {
    isVideoPopupVisible.value = false;
};

const projectsCount = ref(0);
const conceptsCount = ref(0);
const trainingdemosCount = ref(0);
const yearsCount = ref(0);
const stopCount = ref(0);
const staffCount = ref(0);
const engineersCount = ref(0);
const executiveCount = ref(0);
const designCount = ref(0);
const inhouseCount = ref(0);



const dataCounter = [
    { count: 10000, ref: projectsCount },
    { count: 2000, ref: conceptsCount },
    { count: 1500, ref: trainingdemosCount },
    { count: 20, ref: yearsCount },
    { count: 1, ref: stopCount },
    { count: 200, ref: staffCount },
    { count: 100, ref: engineersCount },
    { count: 30, ref: executiveCount },
    { count: 10, ref: designCount },
    { count: 5, ref: inhouseCount },
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

const breakpoints = {
    0: {
        itemsToShow: 1,
        snapAlign: 'start',
    },
    480: {
        itemsToShow: 1,
        snapAlign: 'start',
    },
    768: {
        itemsToShow: 3,
        snapAlign: 'start',
    },
    992: {
        itemsToShow: 6,
        snapAlign: 'start',
    },
    1200: {
        itemsToShow: 6,
        snapAlign: 'start',
    },
    1360: {
        itemsToShow: 8,
        snapAlign: 'start',
    },
    1600: {
        itemsToShow: 8,
        snapAlign: 'start',
    },
};

const clientList = ref([]);
const fetchClientList = async () => {
    try {
        const response = await axios.get('/api/get-clients-home', {});

        clientList.value = response.data.data;


    } catch (error) {
        console.error(error);
    }
};

const getShowroomLink = (id, name) => {
    let transformedName = name.replace(/ /g, '-');
    transformedName = transformedName.replace(/-+/g, '-');
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    transformedName = transformedName.toLowerCase();

    return `/showroom/${id}/${transformedName}`;
};

//showrooms

const showrooms = ref([]);

// Fetch products based on the current page
const fetchShowrooms = async () => {
    try {
        const response = await axios.get('/api/get-showrooms', {});
        showrooms.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    fetchClientList();
    fetchShowrooms();
});
</script>

<style scoped>
h3 {
    margin-bottom: 0.5rem;
}

.disc-list {
    counter-reset: step;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.disc-list li {
    counter-increment: step;
    position: relative;
    width: 20rem;
    height: 20rem;
    text-align: center;
    border-radius: 50%;
    background: #888;
    color: #888;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1.5rem 1.25rem 1.5rem 1.5rem;
    overflow: visible;
}

/* Setup the rainbow colours on the discs
  - #00AFC0
  - #00A3E1
  - #27579C
  - #934FC0
  - #C04F8E
  - #C04F5D
  - #C07E4F
  - #C0B54F
*/

.disc-list li:nth-child(1) {
    background: #00AFC0;
    color: #00AFC0;
}

.disc-list li:nth-child(2) {
    background: #00A3E1;
    color: #00A3E1;
}

.disc-list li:nth-child(3) {
    background: #27579C;
    color: #27579C;
}

.disc-list li:nth-child(4) {
    background: #934FC0;
    color: #934FC0;
}

.disc-list li:nth-child(5) {
    background: #C04F8E;
    color: #C04F8E;
}

.disc-list li:nth-child(6) {
    background: #C04F5D;
    color: #C04F5D;
}

.disc-list li:nth-child(7) {
    background: #C07E4F;
    color: #C07E4F;
}

.disc-list li:nth-child(8) {
    background: #C0B54F;
    color: #C0B54F;
}

/* The text inside the disc */
.disc-list li span {
    color: #FFF;
    display: block;
    font-weight: bold;
    font-size: 1.1rem;
    max-width: 5rem;
    margin-left: auto;
    margin-right: auto;
}

/* The step number */
.disc-list li span::before {
    content: counter(step);
    display: block;
    font-size: 1.65rem;
    margin-bottom: 0.1rem;
    font-weight: 200;
}

/* The pointer container */
.disc-list li .pointer {
    position: absolute;
    right: -1.6rem;
    width: 1rem;
    height: 1rem;
}

/* The arrow-head itself */
.disc-list li .pointer path {
    fill: none;
    stroke-linejoin: round;
    stroke-width: 3px;
    stroke: currentcolor;
    /* This allows the outline to inherit the text color automatically */
}

/* Move the arrow head into position depending if it's an odd/even disc */
.disc-list li:nth-child(even) .pointer {
    bottom: 20%;
    transform: rotate(22.5deg);
}

.disc-list li:nth-child(odd) .pointer {
    top: 20%;
    transform: rotate(22.5deg);
}

.disc-list li::before,
.disc-list li::after {
    content: '';
    position: absolute;
    border: 0.25rem solid;
    left: -1.5rem;
    /* Same as the disc-list li margin */
    right: -1.5rem;
}

/* The dotted elements */
.disc-list li:nth-child(even)::before {
    border-top-style: dotted;
    border-left-style: dotted;
    border-radius: 50%/100% 100% 0 0;
    border-bottom-color: transparent;
    top: -1.5rem;
    bottom: 50%;
}

.disc-list li:nth-child(odd)::before {
    border-bottom-style: dotted;
    border-right-style: dotted;
    border-top-color: transparent;
    border-radius: 50%/0 0 100% 100%;
    bottom: -1.5rem;
    top: 50%;
}

/* The solid line elements */
.disc-list li:nth-child(odd)::after {
    transform-origin: bottom center;
    transform: rotate(22.5deg);
    border-width: 0.2rem;
    border-style: solid;
    border-color: transparent;
    border-top-color: inherit;
    border-left-color: inherit;
    border-radius: 50%/100% 100% 0 0;
    border-bottom-color: transparent;
    top: -1.5rem;
    bottom: 50%;
}

.disc-list li:nth-child(even)::after {
    transform-origin: top center;
    transform: rotate(22.5deg);
    border-style: solid;
    border-width: 0.2rem;
    border-color: transparent;
    border-bottom-color: inherit;
    border-right-color: inherit;
    border-radius: 50%/0 0 100% 100%;
    bottom: -1.5rem;
    top: 50%;
}


.counter_col h3 {
    font-size: 4rem;
}

.counter_col p {
    color: #0e0f10;
    font-weight: 400;
    font-size: 1.5rem;
}

.bg-about-black {
    background-color: #c02434;
}

.bg-about-light-blue {
    background-color: #ffffff;
}

.bg-about-light-blue p {
    color: #393939;
}



.icon-boxes-container {
    background-color: transparent;
}

.bg-about-light-blue .title,
.pg-my-blue .title,
.bg-about-black .title {
    color: #cccccc;
}

.pg-my-blue p,
.bg-about-black p {
    color: #ececec;
}

.page-content-counter {
    border-top: 1px solid #a9a9a9;
}

/*bg-image-breaker bg-image-breaker1*/

.bg-image-breaker::before {
    background-color: #000;
}

.bg-image-breaker {
    position: relative;
    width: 100%;
    height: 55vh;
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    transition: transform 0.5s ease-in-out;

}

.bg-image-breaker1 {
    background-image: url("/assets/images/about_back_1.jpg");
}

.bg-image-breaker2 {
    background-image: url("/assets/images/about_back_2.jpg");
}

.bg-image-breaker3 {
    background-image: url("/assets/images/about_back_3.jpg");
}




.div-after-bg-image-breaker {}

.pg-white {

    background-color: #ffffff;
}

.pg-my-blue {
    background-color: #304296;
}

.pg-my-black {
    background-color: #000000;
}

.colored-card {
    padding: 15px;
    background-color: #2d2d2d82;
}

.colored-card h5 {
    color: #fff;
    font-weight: 550;
}

.colored-card .count-to {
    color: #ffffff !important;
}

.colored-card .counter_col h3 {
    font-size: 2.5rem;
    padding-left: 20px;
}

.colored-card .counter_col h3 span {
    font-size: 1.8rem;
    margin-left: 30px;
    color: #162d60;
}

p {
    font-size: 1.6rem;
}


#hexGrid {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    font-family: sans-serif;
    list-style-type: none;
}

.hex {
    position: relative;
    visibility: hidden;
    outline: 1px solid transparent;
    /* fix for jagged edges in FF on hover transition */
    transition: all 0.5s;
    backface-visibility: hidden;
    will-change: transform;
    transition: all 0.5s;
}

.hex::after {
    content: '';
    display: block;
    padding-bottom: 86.602%;
    /* =  100 / tan(60) * 1.5 */
}

.hexIn {
    position: absolute;
    width: 96%;
    padding-bottom: 110.851%;
    /* =  width / sin(60) */
    margin: 2%;
    overflow: hidden;
    visibility: hidden;
    outline: 1px solid transparent;
    /* fix for jagged edges in FF on hover transition */
    -webkit-transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
    -ms-transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
    transform: rotate3d(0, 0, 1, -60deg) skewY(30deg);
    transition: all 0.5s;
}

.hexIn * {
    position: absolute;
    visibility: visible;
    outline: 1px solid transparent;
    /* fix for jagged edges in FF on hover transition */
}

.hexLink {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    overflow: hidden;
    -webkit-transform: skewY(-30deg) rotate3d(0, 0, 1, 60deg);
    -ms-transform: skewY(-30deg) rotate3d(0, 0, 1, 60deg);
    transform: skewY(-30deg) rotate3d(0, 0, 1, 60deg);
}




/*** HEX CONTENT **********************************************************************/
#hexGrid .hex img {
    left: -100%;
    right: -100%;
    width: auto;
    height: 100%;
    margin: 0 auto;
}

#hexGrid .hex h1,
.hex p {
    width: 100%;
    padding: 5%;
    box-sizing: border-box;
    font-weight: 300;
    opacity: 0;
}

#hexGrid #demo1 {
    color: #F5CE95;
    text-transform: capitalize;
    text-align: center;
    bottom: 50%;
    padding-top: 50%;
    font-size: 1.5em;
    z-index: 1;
}

#hexGrid .hex h1:before,
#hexGrid .hex h1:after {
    display: inline-block;
    margin: 0 0.5em;
    width: 0.25em;
    height: 0.03em;
    background: #ffffff;
    content: '';
    vertical-align: middle;
    transition: all 0.3s;
    text-align: center;
}

#hexGrid #demo2 {
    top: 50%;
    text-align: center;
    text-transform: uppercase;

}

#hexGrid .img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-position: center center;
    background-size: cover;
    overflow: hidden;
    -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

#hexGrid .hex video {
    width: 100%;
    object-fit: cover;
    position: absolute !important;
    z-index: 0;
}

#hexGrid .img:before,
#hexGrid .img:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    opacity: 0;
    transition: opacity 0.5s;
}

#hexGrid .img:before {
    background: rgba(22, 103, 137, 0.3)
}

#hexGrid .img:after {
    background: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.5), transparent);
}

/*** HOVER EFFECT  **********************************************************************/



#hexGrid .hexLink:hover h1,
#hexGrid .hexLink:focus h1,
#hexGrid .hexLink:hover p,
#hexGrid .hexLink:focus p {
    opacity: 1;
    transition: 0.8s;
}


.hexIn:hover .img:before,
.hexIn:hover .img:after,
.hexIn:hover .hexLink {
    opacity: 1;
}


/*** HEXAGON SIZING AND EVEN ROW INDENTATION *****************************************************************/
@media (min-width:1201px) {

    /* <- 5-4  hexagons per row */
    #hexGrid {
        padding-bottom: 7.4%;
        font-size: 14px;
    }

    .hex {
        width: 33.333%;
        /* = 100 / 3 */
    }

    .hex:nth-child(5n+4) {
        /* first hexagon of even rows */
        margin-left: 16.666%;
        /* = width of .hex / 2  to indent even rows */
    }
}

@media (max-width: 1200px) and (min-width:901px) {

    /* <- 4-3  hexagons per row */
    #hexGrid {
        padding-bottom: 5.5%;
        font-size: 13px;
    }

    .hex {
        width: 25%;
        /* = 100 / 4 */
    }

    .hex:nth-child(7n+5) {
        /* first hexagon of even rows */
        margin-left: 12.5%;
        /* = width of .hex / 2  to indent even rows */
    }
}

@media (max-width: 900px) and (min-width:601px) {

    /* <- 3-2  hexagons per row */
    #hexGrid {
        padding-bottom: 7.4%;
        font-size: 14px;
    }

    .hex {
        width: 33.333%;
        /* = 100 / 3 */
    }

    .hex:nth-child(5n+4) {
        /* first hexagon of even rows */
        margin-left: 16.666%;
        /* = width of .hex / 2  to indent even rows */
    }
}

@media (max-width: 600px) {

    /* <- 2-1  hexagons per row */
    #hexGrid {
        padding-bottom: 11.2%;
        font-size: 12px;
    }

    .hex {
        width: 50%;
        /* = 100 / 3 */
    }

    .hex:nth-child(3n+3) {
        /* first hexagon of even rows */
        margin-left: 25%;
        /* = width of .hex / 2  to indent even rows */
    }
}

@media (max-width: 400px) {
    #hexGrid {
        font-size: 8px;
    }




}


@media only screen and (max-width: 768px) {
    .icon-boxes-container {
        display: flex;
        flex-direction: column;
    }

    .counter_col {
        margin-top: 4rem;
    }

    .counter_col h3 {
        font-size: 3.5rem;
    }

    .counter_col p {
        font-size: 1.5rem;
    }
}


.title {
    color: #ffffff !important;
    background: linear-gradient(56deg, #c02434 43.87%, transparent 62.27%);
    padding: 10px;
}

.lead {
    font-size: 1.8rem !important;
    font-weight: 600;
}

.about-team {
    position: relative;
    width: 100%;
    padding: 4.2%;
    border-radius: 50%;
    background: linear-gradient(251deg, red 14.71%, transparent 26.89%), linear-gradient(106deg, red 11.34%, transparent 42.02%);

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
    /* Maintain aspect ratio and cover the round div */
    border-radius: 50%;
    /* Make the image round */
}

.details {
    position: absolute;
    margin-top: -15%;
    background-color: #ffffff;
    padding-left: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 10px;
    width: 87%;
    line-height: 1.8rem;
    margin-left: 10%;
}

.details .name {
    font-weight: 550;
    color: #ec2024;
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
}

.csr-image {
    perspective: 3000px;
    width: 100%;
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
}

.csr-image img {
    transform: rotateX(61deg) rotateZ(46deg) translate3d(-120px, 0px, 70px);
    box-shadow: -80px 60px 15px 5px rgba(0, 0, 0, 0.4);
    transition: all .4s;
    transform-style: preserve-3d;
}

.csr-container:hover img {
    transform: rotateX(0deg) rotateZ(0deg) translate3d(0px, 0px, 0px);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.0);
}

/* Masonry layout using CSS Grid */

/* Masonry layout for the .masonry container */
.masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
    grid-gap: 10px;
    /* Adjust the gap between items as needed */
}

/* Style for the .masonry-item elements */
.masonry-item {
    margin-bottom: 20px;
    /* Add some vertical spacing */
}

/* Additional styles for responsiveness */
@media (max-width: 576px) {
    .masonry {
        grid-gap: 10px;
        /* Adjust gap for smaller screens */
    }
}

@media (max-width: 768px) {
    .masonry {
        grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
        /* Adjust column width */
    }
}

.main-clients {
    display: flex;
    --s: 116px;
    /* size  */
    --m: 4px;
    /* space */
    --r: calc(var(--s) + 4*var(--m) - 2px);
}

.clients-container {
    font-size: 0;
    /*disable white space between inline block element */
}

.clients-container div {
    width: var(--s);
    margin: var(--m);
    height: var(--s);
    display: inline-block;
    font-size: initial;
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    background: #ffffff;
    margin-bottom: calc(var(--m) - var(--s)*0.5);
    border-left: 1px solid black;
    justify-content: center;
    /* Center horizontally */
    align-items: center;
    padding-top: 20px;
    padding-left: 20px;
}

.clients-container div:nth-child(odd) {
    /*background:green;*/
}

.clients-container::before {
    content: "";
    width: calc(var(--s)/2 + var(--m));
    float: left;
    height: 140%;
    shape-outside: repeating-linear-gradient(#0000 0 calc(var(--r) - 3px),
            #000 0 var(--r));

}


.clients-container div img {

    max-width: 75%;
    width: 75%;
    padding-top: 5px;
    padding-left: 3px;
}

.met-item {
    background-color: #ffffff;
    border-radius: 60px;
    max-width: 60%;
    max-height: 60px;
}


.met-image {

    display: inline-block;
    box-shadow: -4px -2px 1px #d0c4c4;
    border-radius: 50%;
}

.met-image img {
    max-height: 50px;
    /*background-color: #000;*/
    background-image: linear-gradient(to right, #ffffff, #d9d7d7);
    border-radius: 50%;
    box-shadow: 3px 1px 2px #fff;
}



.met-description {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
}


.links-container {
    display: flex;
    flex-direction: column;
    jusify-content: center;
    align-items: center;
}

.links-container a {
    width: 60%;
    background-color: #d3cfcf;
    border-radius: 60px;
}

.w3-theme-l1:hover {
    background-color: #f279a1 !important;
}

.margin-top-2 {
    margin-top: 32px;
}

.bottom {
    width: 100%;
    text-align: center;
    width: auto;
    font-weight: bolder;
}

.bottom span {
    color: #ed4d82;
}

.bottom svg {
    stroke: #ed4d82;
    fill: #ed4d82;
}

.link {
    display: flex;
    max-height: 50px;
    margin-bottom: 15px;
}

.link span {
    font-size: 2.1rem;
    font-weight: 400;
}

@media (min-width: 768px) {
    .link {
        width: 100%;
    }
}

@media (min-width: 576px) {
    .container {
        /* max-width: 540px; */
    }
}
</style>
