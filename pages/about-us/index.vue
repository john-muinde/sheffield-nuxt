<template>
  <main class="main">
    <div class="page-content pg-white">
      <div class="container">
        <div class="page-content pg-white who-we-are-section">
          <div class="overlay"></div>

          <div class="pt-5 pb-2">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="col-lg-6 who-we-are"
                      style="background-color: #ffffff73; padding: 20px"
                    >
                      <h2 class="our-history-title">Who We Are</h2>
                      <p class="lead about-us-lead text-primary mb-1">
                        Transforming Ideas into Sustainable Realities
                      </p>
                      <p class="who-we-are-p">
                        Sheffield Steel Systems Limited was founded in 2003 and
                        has since expanded to become East Africa’s leading
                        solution and service provider for Commercial Kitchen,
                        Laundry, and Cold Storage Solutions, with a distinct
                        specialization in Stainless Steel Fabrication and
                        Customization. We are a Kenyan company headquartered in
                        Nairobi, with additional offices in Uganda and Rwanda.
                        Our project executions span the continent, reaching from
                        Ethiopia, Burundi, South Sudan, and Nigeria to Congo, as
                        we explore new territories and business lines. We are a
                        Pan-African company dedicated to providing solutions
                        built to last in Africa.
                      </p>
                    </div>
                    <!-- End .col-lg-5 -->

                    <div class="col-lg-6">
                      <div
                        class="banner video-banner-about"
                        style="background-color: unset !important"
                      >
                        <div
                          class="video-banner video-banner-bg bg-image text-center"
                          style=""
                        >
                          <div
                            class="container container-video-button"
                            style="cursor: pointer"
                          >
                            <a
                              class="btn-video btn-iframe"
                              @click="showVideoPopup"
                              ><i class="icon-play"></i
                            ></a>

                            <VideoPopup
                              :show-popup="isVideoPopupVisible"
                              :video-url="videoUrl"
                              @close="hideVideoPopup"
                            />
                          </div>

                          <span class="view-sheffield" style="cursor: pointer"
                            ><a class="" @click="showVideoPopup"
                              >View Sheffield</a
                            ></span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End .row -->
            </div>
            <!-- End .container -->
          </div>
        </div>
      </div>
    </div>

    <div class="page-content pg-white">
      <div class="container pt-3">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 class="our-history-title">Our History</h2>
              <!--                             <p class="lead about-us-lead text-primary mb-1">Transforming Ideas into Sustainable Realities</p> -->
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
                </slide>
                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </carousel>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content bg-image-breaker bg-image-breaker2"></div>

    <div
      id="our-methodology-section"
      class="page-content pt-5 our-methodology-section"
      :style="{
        backgroundImage: 'url(/assets/images/methodology-gray.jpg)',
      }"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="container">
              <h2 class="our-history-title mt-3">Sheffield Methodology</h2>
              <p class="lead about-us-lead text-primary mb-1">
                At Sheffield, our differentiating factor is you- Our Customer
              </p>
              <p class="about-us-p">
                We are 100% focused & committed to creating and implementing
                solutions for you and your business. Sheffield is flexible to
                your evolving needs and we will work hard to ensure they are
                continuously met. <br />Our main service touch points and
                processes for Customer Satisfaction include:
              </p>
              <div class="row">
                <div class="col-md-12 justify-content-center">
                  <div
                    class="row justify-content-left links-container mt-3 mb-3"
                  >
                    <div
                      v-for="(item, index) in MethodologyResults"
                      :key="index"
                      class="methodology-item"
                      :class="{
                        'left-class': item.direction === 'left',
                        'right-class': item.direction === 'right',
                        'down-class': item.direction === 'down',
                      }"
                    >
                      <div class="methodology-item-internal">
                        <div class="met-image">
                          <img :src="item.image" />
                        </div>

                        <div class="met-description">
                          <span>{{ item.title }}</span>
                        </div>

                        <div class="met-text">
                          <span>{{ item.text }}</span>
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
    </div>

    <div
      class="page-content pb-0 page-content-counter"
      :style="{
        backgroundImage:
          'url(/assets/images/sheffield_stainless_steel_background.jpg)',
      }"
    >
      <div
        ref="counterSection"
        class="container mt-0 counter-section"
        :class="{ visible: state.isSectionInView }"
      >
        <div class="row text-center icon-boxes-container">
          <div class="col counter_col">
            <i class="fa fa-user text-primary" style="font-size: 3.5rem"></i>
            <h3 class="count-to text-primary mb-0">{{ projectsCount }}+</h3>
            <p>Projects</p>
          </div>
          <div class="col counter_col">
            <i class="fa fa-star text-primary" style="font-size: 3.5rem"></i>
            <h3 class="count-to text-primary mb-0">{{ conceptsCount }}+</h3>
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
            <i
              class="far fa-chart-bar text-primary"
              style="font-size: 3.5rem"
            ></i>
            <h3 class="count-to text-primary mb-0">{{ yearsCount }}+</h3>
            <p>Years’ Experience</p>
          </div>

          <div class="col counter_col">
            <i
              class="far fa-chart-bar text-primary"
              style="font-size: 3.5rem"
            ></i>
            <h3 class="count-to text-primary mb-0">
              {{ stopCount }}
            </h3>
            <p>Stop Shop Solution</p>
          </div>
        </div>
      </div>
    </div>
    <!-- End .page-content -->

    <div class="page-content pg-white our-people-section">
      <div class="pt-6">
        <div class="container">
          <div class="container">
            <div class="row pt-5 pb-5">
              <div class="col-md-6 people-text">
                <h2 class="about-us-title">Our People</h2>
                <!-- End .title -->
                <p class="lead about-us-lead text-primary mb-1">
                  Meet Our Exceptional Team
                </p>

                <p class="about-us-p">
                  Sheffield proudly introduces our team of highly qualified
                  professionals, each possessing expertise in engineering,
                  project management, and technical skills. They are integral to
                  the process of innovation and the implementation of
                  <a href="#our-methodology-section"
                    >The Sheffield Methodology</a
                  >.
                </p>
              </div>

              <div
                ref="counterSection_people"
                class="col-md-6"
                :class="{ visible: state.isSectionInView }"
              >
                <img src="/assets/images/about-us/sheffield_in_numbers.png" />

                <div class="people-numbers staff">
                  <span class="number">{{ staffCount }}+</span>
                  <span class="number-title">Staff</span>
                </div>

                <div class="people-numbers engineering-crew">
                  <span class="number">{{ engineersCount }}+</span>
                  <span class="number-title"
                    >Engineering & Technical Skilled Crew</span
                  >
                </div>

                <div class="people-numbers leaders">
                  <span class="number">{{ executiveCount }}+</span>
                  <span class="number-title">Executive Leaders</span>
                </div>

                <div class="people-numbers design">
                  <span class="number">{{ designCount }}+</span>
                  <span class="number-title">Design Engineers</span>
                </div>

                <div class="people-numbers in-house">
                  <span class="number">{{ inhouseCount }}+</span>
                  <span class="number-title">In-house Chefs & Baristas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content bg-image-breaker bg-image-breaker3"></div>

    <div class="page-content pg-my-grey pt-5 leadership-section">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-lg-1">
            <div class="row">
              <div class="col-md-12 pt-5">
                <h2 class="about-us-title">Leadership</h2>
                <!-- End .title -->
                <p class="lead about-us-lead text-primary mb-1">
                  Meet the Minds Behind Our Success
                </p>

                <p class="about-us-p">
                  Our leadership team is made up of dedicated, focused, and
                  experienced executives working with each other and their teams
                  to implement Sheffield’s strategy and vision, their knowledge
                  and experience come together to make a difference for all our
                  stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10 offset-lg-1 justify-content-center">
            <div
              class="row about-team-container about-team-container1 justify-content-center"
            >
              <div class="col-md-3 mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img
                      src="/assets/images/team/MD - Suresh Kanotra website.jpg"
                    />
                  </div>
                  <div class="details">
                    <div class="name">Dr. Suresh Kanotra</div>
                    <div class="job-title">Managing Director</div>
                  </div>
                  <div class="description description-text-right">
                    Dr. Suresh Kanotra, the founder of Sheffield Africa,
                    envisioned the need in the African market for solutions &
                    services in the food and beverage industry. With an
                    engineering background, he started Sheffield Steel Systems
                    Limited and continuously seeks to innovate & tailor-make
                    durable, efficient, and smart solutions.
                  </div>
                </div>
              </div>

              <div class="col-md-3 mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="/assets/images/team/Saveer-Singh-Vohra.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">Saveer Vohra</div>
                    <div class="job-title">Financial Director</div>
                  </div>
                  <div class="description description-text-right">
                    Mr. Saveer Vohra has a Bachelor’s degree in Civil
                    Engineering and a Master’s in Finance from the University of
                    Warwick in the UK. As the Financial Director, he ensures the
                    Company is aligned with financial growth, strategy, and a
                    profitable vision.
                  </div>
                </div>
              </div>

              <div class="col-md-3 mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="/assets/images/team/samman.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">Samman Vohra</div>
                    <div class="job-title">
                      Business Development & Strategy Director
                    </div>
                  </div>
                  <div class="description description-text-left">
                    Samman is a distinguished graduate from the CASS Business
                    School, City University of London, with a strong background
                    in business, economics, finance, and marketing. Leveraging
                    international exposure and academic expertise, Samman works
                    on special projects, drives revenue growth, identifies new
                    opportunities, and strengthens the Sheffield brand whilst
                    managing partnerships, aligning business goals, and
                    providing cross-functional leadership, contributing
                    significantly to our company's success and vision for the
                    future.
                  </div>
                </div>
              </div>
            </div>

            <div class="row about-team-container about-team-container2 mb-3">
              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="/assets/images/team/Vikas-removebg-preview.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">Vikas Sharma</div>
                    <div class="job-title">Business Development Head</div>
                  </div>
                  <div class="description description-text-right">
                    As the Business Development Head, Vikas drives the
                    organization's business growth strategies and enhances the
                    current portfolio to explore new business opportunities.
                    With a rich experience ranging from Strategic Management,
                    Marketing, and Brand Management that has had a positive
                    impact on Sheffield’s operations, he efficiently executes
                    business strategies that are in line with the organizational
                    objectives.
                  </div>
                </div>
              </div>

              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="/assets/images/team/Simon.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">Simon Mbugua</div>
                    <div class="job-title">Head of Design & Development</div>
                  </div>
                  <div class="description description-text-right">
                    A Mechanical Engineer by profession, Simon specializes in
                    product design 3D & 2D, plant maintenance, lean Six Sigma
                    manufacturing, workshop practices, and structural design and
                    integrity. He leads the team of 2D & 3D design engineers,
                    research & development, and project planning.
                  </div>
                </div>
              </div>

              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="/assets/images/team/Ann Ajode Pic.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">Ann Ajode</div>
                    <div class="job-title">Customer Relations Manager</div>
                  </div>
                  <div class="description description-text-right">
                    Ann is a proactive & efficient and customer relations
                    professional with over 12 years of experience in business
                    development, sales, marketing, and operations coordination
                    with a background in International Relations. She
                    facilitates smooth workflow processes, communication, and
                    integration to enhance customer satisfaction through quality
                    management systems. The customer is the top most priority
                    for her and her team who ensure communication and support
                    through the contact points from enquiries, job processing,
                    execution and after sales support.
                  </div>
                </div>
              </div>

              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="/assets/images/team/Mwangi_2.jpg" />
                  </div>
                  <div class="details">
                    <div class="name">Joseph Mwangi</div>
                    <div class="job-title">Service & Installations Manager</div>
                  </div>
                  <div class="description description-text-left">
                    Mwangi supervises all the installation and service
                    technicians to ensure the successful execution of all
                    Sheffield projects by managing all the resources at the site
                    and on the ground including project managers, the technical
                    team, equipment, machinery, materials, and time. With a
                    technical and engineering background, he ensures accurate
                    and effective operations of all projects.
                  </div>
                </div>
              </div>

              <div class="col mt-4">
                <div class="about-team">
                  <div class="about-team-white">
                    <img src="/assets/images/team/Hari G.JPG" />
                  </div>
                  <div class="details">
                    <div class="name">Hari Singh</div>
                    <div class="job-title">Sales Head</div>
                  </div>
                  <div class="description description-text-left">
                    Hari has over 20 Years of experience in Business
                    Development, Distribution, Market Expansion, Penetration and
                    Product Development. He drives the Sheffield sales team to
                    realize the organization's sales goals by leading from the
                    front as the Sales Head to a team that covers the East
                    African Region and Segments. He is responsible for the
                    successful prospecting, planning, execution, monitoring, and
                    closure of sales projects.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="page-content our-culture"
      :style="{
        backgroundImage: 'url(/assets/images/about-us/our-culture.jpg)',
      }"
    >
      <div class="row no-margin">
        <div class="col-md-12">
          <div class="cuture-image">
            <img class="" src="/assets/images/about-us/our-culture.jpg" />

            <div class="culture-text-box">
              <h2 class="about-us-title">Culture</h2>
              <!-- End .title -->
              <p class="lead about-us-lead text-primary mb-1">
                Fostering Innovation
              </p>

              <p class="our-culture-p">
                At Sheffield, we cultivate a collaborative work culture with an
                open-door policy that fosters interaction and underscores our
                commitment to collective teamwork dynamics. This cultural
                synergy is nurtured by inspirational leaders who are unafraid to
                take calculated risks for the betterment of the organization. As
                a company that thrives on fresh ideas in both product and
                concept design, Sheffield's environment promotes
                open-mindedness, innovation, and a sense of purpose among our
                dedicated and driven employees.
              </p>

              <NuxtLink class="btn btn-primary btn-round mt-4" to="/careers">
                <b>View Sheffield Careers</b>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content pg-white csr-section">
      <div class="pt-6">
        <div class="container">
          <div class="row pt-5 pb-5">
            <div class="col-lg-10 offset-lg-1">
              <div class="row">
                <div class="col-md-6 csr-image">
                  <img src="/assets/images/about-us/csr.png" />
                </div>

                <div class="col-md-6 csr-text">
                  <h2 class="about-us-title">CSR</h2>
                  <!-- End .title -->
                  <p class="lead about-us-lead text-primary mb-1">
                    Making a Difference Through Commitment
                  </p>

                  <p class="about-us-p">
                    Sheffield Africa has been dedicated to corporate social
                    responsibility from its inception. Our commitment to making
                    a positive impact is driven by a policy that guides
                    initiatives in Environment & Social Impact.
                  </p>
                </div>

                <div class="col-md-6 csr_image_impact">
                  <img src="/assets/images/about-us/csr/csr_2.jpg" />
                  <div class="text-block">
                    <div class="csr-icon-text">
                      <span>ENVIRONMENT</span>
                    </div>

                    <div class="csr-icon-image">
                      <img src="/assets/images/about-us/csr/environment.png" />
                    </div>
                  </div>
                </div>

                <div class="col-md-6 csr_image_impact">
                  <img src="/assets/images/about-us/csr/csr_1.jpg" />

                  <div class="text-block">
                    <div class="csr-icon-text">
                      <span>SOCIAL IMPACT</span>
                    </div>

                    <div class="csr-icon-image">
                      <img
                        src="/assets/images/about-us/csr/social-impact.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content bg-image-breaker bg-image-breaker4"></div>

    <div class="page-content bg-about-white div-after-bg-image-breaker">
      <div class="pt-6 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-lg-1">
              <div class="row">
                <div class="col-lg-12 mb-lg-0 pt-4">
                  <h2 class="about-us-title">Partners</h2>
                  <!-- End .title -->
                  <p class="lead about-us-lead text-primary mb-1">
                    Nurturing Innovation, Embracing Unity
                  </p>
                </div>
              </div>

              <div class="row partners-logos">
                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img
                    width="100%"
                    src="/assets/images/partners/partners1.jpg"
                  />
                </div>
                <!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img
                    width="100%"
                    src="/assets/images/partners/partners2.jpg"
                  />
                </div>
                <!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img
                    width="100%"
                    src="/assets/images/partners/partners3.jpg"
                  />
                </div>
                <!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img
                    width="100%"
                    src="/assets/images/partners/partners4.jpg"
                  />
                </div>
                <!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img
                    width="100%"
                    src="/assets/images/partners/partners5.jpg"
                  />
                </div>
                <!-- End .col-lg-6 -->

                <div class="col-lg-2 col-sm-6 col-xs-6">
                  <img
                    width="100%"
                    src="/assets/images/partners/partners6.jpg"
                  />
                </div>
                <!-- End .col-lg-6 -->
              </div>
            </div>
          </div>
          <!-- End .row -->
        </div>
        <!-- End .container -->
      </div>
    </div>

    <div class="page-content pg-my-grey">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1 mb-5 mt-5">
            <div class="row">
              <div class="col-md-12 mb-3 mb-lg-0 pt-4">
                <h2 class="about-us-title">Clients</h2>
                <!-- End .title -->
                <p class="lead about-us-lead text-primary mb-1">
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
                      <img
                        :src="assetsSync(client.main_image_path)"
                        alt="image desc"
                      />
                      <!--  </a> -->
                    </figure>
                    <!-- End .entry-media -->
                  </article>
                  <!-- End .entry -->
                </div>
                <!-- End .entry-item -->
              </div>
              <!-- End .entry-container -->
            </div>
          </div>
        </div>
      </div>
      <!-- End .container -->
    </div>
    <!-- End .page-content -->

    <div class="page-content bg-about-white div-after-bg-image-breaker">
      <div class="pt-6 mb-lg-8">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-lg-1">
              <div class="row">
                <div class="col-lg-12 mb-3 mb-lg-0 pt-4 mobile-header">
                  <h2 class="about-us-title">Partners</h2>
                  <!-- End .title -->
                  <p class="lead about-us-lead text-primary mb-1">
                    Nurturing Innovation, Embracing Unity
                  </p>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-md-5 video-section">
                  <div class="video-player">
                    <video
                      ref="videoPlayer"
                      controls
                      src="/assets/images/about-us/video/iCombi.mp4"
                      loop
                    ></video>
                    <!-- i removed controls attribute in the above to remove the play pause buttons -->
                  </div>
                </div>

                <div class="col-md-6 offset-md-1">
                  <div class="desktop-header-partners">
                    <h2 class="about-us-title">
                      <NuxtLink to="/media"> Media </NuxtLink>
                    </h2>
                    <!-- End .title -->
                    <p class="lead about-us-lead text-primary mb-1">
                      Explore Insights from the Media gallery of Sheffield
                    </p>
                  </div>

                  <p class="about-us-p mb-4 ml-2 mr-2">
                    Embark on a dynamic exploration through our MEDIA section,
                    revealing a curated collection of blogs, partner videos,
                    company insights, and essential technical resources. Uncover
                    a world of knowledge that empowers and inspires, seamlessly
                    tailored to fuel your curiosity and drive innovation.
                  </p>

                  <div class="my-carosel-section">
                    <carousel
                      ref="scrollableContainerCarosel"
                      :items-to-show="4"
                      class="carousel-wrapper"
                      :per-page="1"
                      :wrap-around="true"
                      :pause-autoplay-on-hover="true"
                      @load="adjustTheClass1Height"
                    >
                      <slide
                        v-for="(item, index) in partnersSlider"
                        :key="index"
                      >
                        <div class="carousel-div-image">
                          <img :src="getImage(item)" :alt="item.alt" />

                          <div class="play-button">
                            <label
                              :for="'checkbox' + index"
                              class="label-play"
                              @click="playVideo(item.url, 'checkbox' + index)"
                            >
                              <div class="play_pause_icon play"></div>
                            </label>
                            <input
                              :id="'checkbox' + index"
                              class="checkbox-play"
                              type="checkbox"
                            />
                          </div>
                        </div>
                      </slide>
                      <template #addons>
                        <Navigation />
                        <Pagination />
                      </template>
                    </carousel>
                  </div>

                  <NuxtLink to="/media" class="btn btn-primary mt-5">
                    GO TO MEDIA
                    <i class="icon-long-arrow-right"></i>
                  </NuxtLink>
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
import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  reactive,
  nextTick,
  watch,
} from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";

const { api } = useAxios();

useHead({
  title: "About Us",
  meta: [
    {
      name: "description",
      content:
        "Sheffield Steel Systems Limited was founded in 2003 and has since expanded to become East Africa’s leading solution and service provider for Commercial Kitchen, Laundry, and Cold Storage Solutions, with a distinct specialization in Stainless Steel Fabrication and Customization.",
    },
  ],
});

const isVideoPopupVisible = ref(false);
const videoUrl = "/assets/images/about-us/sheffiled_tour.mov";

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
  { count: 10981, ref: projectsCount },
  { count: 2058, ref: conceptsCount },
  { count: 1805, ref: trainingdemosCount },
  { count: 20, ref: yearsCount },
  { count: 1, ref: stopCount },
  { count: 221, ref: staffCount },
  { count: 105, ref: engineersCount },
  { count: 45, ref: executiveCount },
  { count: 12, ref: designCount },
  { count: 6, ref: inhouseCount },
];

const duration = 3000;

const state = reactive({
  isSectionInView: false,
  observer: null,
});

const animateCounters = () => {
  const interval = 290;

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

const counterSectionRef = ref(null);

const startIntersectionObserver = () => {
  state.observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      state.isSectionInView = entry.isIntersecting;
      if (state.isSectionInView) {
        animateCounters();
      }
    },
    { threshold: 0.5 } // Adjust the threshold based on your needs
  );
  state.observer.observe(counterSectionRef.value);
};

const stopIntersectionObserver = () => {
  if (state.observer) {
    state.observer.disconnect();
  }
};

const checkIfElementInViewport = () => {
  const element = counterSectionRef.value;
  if (element) {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    state.isSectionInView = isVisible;
  }
};

onMounted(() => {
  counterSectionRef.value = document.querySelector(".counter-section");
  startIntersectionObserver();
  checkIfElementInViewport();
  window.addEventListener("scroll", checkIfElementInViewport);
});

onUnmounted(() => {
  stopIntersectionObserver();
  window.removeEventListener("scroll", checkIfElementInViewport);
});

watch(
  () => state.isSectionInView,
  (newValue) => {
    if (newValue) {
      animateCounters();
    }
  }
);

const breakpoints = {
  0: {
    itemsToShow: 1,
    snapAlign: "start",
  },
  480: {
    itemsToShow: 1,
    snapAlign: "start",
  },
  768: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  992: {
    itemsToShow: 6,
    snapAlign: "start",
  },
  1200: {
    itemsToShow: 6,
    snapAlign: "start",
  },
  1360: {
    itemsToShow: 8,
    snapAlign: "start",
  },
  1600: {
    itemsToShow: 8,
    snapAlign: "start",
  },
};

const clientList = ref([]);
const fetchClientList = async () => {
  try {
    const response = await api.get("/api/get-clients-home", {});

    clientList.value = response.data.data;
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

onMounted(async () => {
  fetchClientList();
  fetchShowrooms();
});

//// start methodology

const methodology = [
  {
    image: "/assets/images/methodology/methodology01.png",
    title: "CUSTOMER BRIEF",
    text: "Sheffield Staff conducts a site visit for a scope of work brief to understand the client's requirements, space, and concept.",
  },
  {
    image: "/assets/images/methodology/methodology02.png",
    title: "DESIGN & DEVELOPMENT",
    text: "A site survey is conducted by a technical sales engineer and our design team develops an equipment layout.",
  },
  {
    image: "/assets/images/methodology/methodology03.png",
    title: "PLANNING",
    text: "Our planning team ensures efficient and effective execution through project management.",
  },
  {
    image: "/assets/images/methodology/methodology05.png",
    title: "MANUFACTURING & IMPORTS",
    text: "We have partnerships with international suppliers. Sheffield has an in-house stainless steel and cold room manufacturing plant for custom solutions.",
  },
  {
    image: "/assets/images/methodology/methodology06.png",
    title: "TESTING",
    text: "Each step of manufacturing is checked by our Quality Control Team and upon completion, testing is done.",
  },
  {
    image: "/assets/images/methodology/methodology07.png",
    title: "DELIVERY",
    text: "Delivery is scheduled after testing and inspection by the Sheffield logistics team in liaison with the client based on the terms agreed upon.",
  },
  {
    image: "/assets/images/methodology/methodology08.png",
    title: "INSTALLATION",
    text: "The installation process is done against the layout drawings and the project manager’s supervision with his installation technical team.",
  },
  {
    image: "/assets/images/methodology/methodology09.png",
    title: "TRAINING",
    text: "Sheffield ensures that users at the client’s site are properly trained to operate the installed equipment.",
  },
  {
    image: "/assets/images/methodology/methodology10.png",
    title: "COMMISSIONING",
    text: "Commissioning and handover is conducted to ascertain the completion of works and operations of the equipment.",
  },
  {
    image: "/assets/images/methodology/methodology11.png",
    title: "AFTER-SALES SERVICES",
    text: "A Service Contract is extended to the client to support the maintenance and warranty terms. Sheffield stocks original spares for the equipment supplied.",
  },
];

function chunkAndReorder(originalArray, chunkSize) {
  let resultArray = [];

  for (let i = 0; i < originalArray.length; i += chunkSize) {
    // Slice the array into chunks of the specified size
    let chunk = originalArray.slice(i, i + chunkSize);

    // Reorder every other chunk
    if ((i / chunkSize) % 2 === 1) {
      chunk.reverse();
    }

    // Add the chunk to the result array
    resultArray = resultArray.concat(chunk);
  }

  return resultArray;
}

function chunkAndReorderWithDirection(originalArray, chunkSize) {
  let resultArray = [];

  for (let i = 0; i < originalArray.length; i += chunkSize) {
    // Slice the array into chunks of the specified size
    let chunk = originalArray.slice(i, i + chunkSize);

    // Reorder every other chunk
    if ((i / chunkSize) % 2 === 1) {
      chunk.reverse();
      // For reversed sets, set direction 'down' for the first item and 'left' for the rest
      chunk[0].direction = "down";
      for (let j = 1; j < chunk.length; j++) {
        chunk[j].direction = "left";
      }
    } else {
      // For non-reversed sets, set direction 'right' for all items except the last one which is 'down'
      for (let j = 0; j < chunk.length - 1; j++) {
        chunk[j].direction = "right";
      }
      chunk[chunk.length - 1].direction = "down";
    }

    // Add the chunk to the result array
    resultArray = resultArray.concat(chunk);
  }

  return resultArray;
}

const MethodologyResults = ref([]);

//const MethodologyResults = chunkAndReorderWithDirection(methodology, 3);

const updateMethodologyResults = () => {
  const screenWidth = window.innerWidth;

  // Adjust the chunk size based on your screen size logic
  const chunkSize = screenWidth < 768 ? 1 : 4;

  // Run the function with the updated chunk size
  MethodologyResults.value = chunkAndReorderWithDirection(
    methodology,
    chunkSize
  );
};

// Lifecycle hook equivalent to mounted
onMounted(() => {
  // Initial run on component mount
  updateMethodologyResults();

  // Add a listener for window resize events
  window.addEventListener("resize", updateMethodologyResults);
});

// Lifecycle hook equivalent to beforeUnmount
onBeforeUnmount(() => {
  // Remove the window resize event listener when the component is about to be destroyed
  window.removeEventListener("resize", updateMethodologyResults);
});

//// end methodology

const partnersSlider = [
  {
    image: "/assets/images/about-us/video/logos/rational.png",
    mobileImage: "/assets/images/about-us/video/logos/rational.png",
    url: "/assets/images/about-us/video/iCombi.mp4",
  },
  {
    image: "/assets/images/about-us/video/logos/Prisma Food.jpg",
    mobileImage: "/assets/images/about-us/video/logos/Prisma Food.jpg",
    url: "/assets/images/about-us/video/Prismafood.mp4",
  },
  {
    image: "/assets/images/about-us/video/logos/broaster.jpg",
    mobileImage: "/assets/images/about-us/video/logos/broaster.jpg",
    url: "/assets/images/about-us/video/PressureFryers.mp4",
  },
  {
    image: "/assets/images/about-us/video/logos/f4e.jpg",
    mobileImage: "/assets/images/about-us/video/logos/f4e.jpg",
    url: "/assets/images/about-us/video/FOOD_FOR_EDUCATION_GIGA_KITCHEN.mp4",
  },
  {
    image: "/assets/images/about-us/video/logos/mambo_safi_.jpg",
    mobileImage: "/assets/images/about-us/video/logos/mambo_safi_.jpg",
    url: "/assets/images/about-us/video/Mambo_Safi_Laundromat.mp4",
  },
  {
    image: "/assets/images/about-us/video/logos/sheffield.jpg",
    mobileImage: "/assets/images/about-us/video/logos/sheffield.jpg",
    url: "/assets/images/about-us/video/Sheffield_Africa_Suresh_Kanotra.mp4",
  },
];

const data = () => {
  return {
    // items,
    //isDesktop: window.innerWidth >= 768
  };
};

const isDesktop = ref(true);

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768;
};

const items1 = [
  {
    image: "/assets/images/about-us/slider/history1.jpg",
    mobileImage: "/assets/images/about-us/slider/history1.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/history2.jpg",
    mobileImage: "/assets/images/about-us/slider/history3.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/history3.jpg",
    mobileImage: "/assets/images/about-us/slider/history3.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
];

const items2 = [
  {
    image: "/assets/images/about-us/slider/mob-slider1.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider1.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/mob-slider2.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider2.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/mob-slider3.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider3.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/mob-slider4.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider4.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/mob-slider5.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider5.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/mob-slider6.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider6.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/mob-slider7.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider7.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/mob-slider8.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider8.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
  {
    image: "/assets/images/about-us/slider/mob-slider9.jpg",
    mobileImage: "/assets/images/about-us/slider/mob-slider9.jpg",
    alt: "Our History at Sheffield first slide",
    intro: {
      title: "Our History at Sheffield first slide",
    },
  },
];

const items = isDesktop.value ? items1 : items2;

const scrollableContainer = ref(null);
const ulHeight = ref("");

// Function to update the ul height
const updateUlHeight = () => {
  if (scrollableContainer.value) {
    const containerHeight = scrollableContainer.value.clientHeight;

    if (containerHeight == 0) {
      ulHeight.value = "417px";
    } else {
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
  window.onload = () => {
    updateUlHeight();
  };
  isDesktop.value = window.innerWidth >= 768;
  carouselRef.value = document.querySelector(".carousel-wrapper");
  carouselRef.value.addEventListener("load", handleCarouselLoad);
});

onUnmounted(() => {
  if (carouselRef.value) {
    carouselRef.value.removeEventListener("load", handleCarouselLoad);
  }
});

onMounted(async () => {
  await nextTick();
  window.addEventListener("resize", handleResize);
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
  this.$refs.carousel.$el.closest(".theClass1-wrapper").style.height =
    carouselHeight + "px";
};

////////////////

const selectedVideoUrl = ref("");
const videoPlayer = ref(null);

const isVideoPaused = (videoUrl) => {
  return videoPlayer.value.src !== videoUrl || videoPlayer.value.paused;
};

const playVideo = (videoUrl, checkboxId) => {
  //
  const videoBasePath = window?.location.origin; //laravel base path

  const videoButtons = document.querySelectorAll(".play-button");

  // Loop through each 'video-button' element
  videoButtons.forEach((videoButton) => {
    // Find the checkbox within each 'video-button' element
    const checkbox = videoButton.querySelector(".checkbox-play");

    // Disable the checkbox
    if (checkbox) {
      checkbox.checked = false;
    }
  });

  const fullNewVideoURL = videoBasePath + videoUrl;

  if (videoPlayer.value.src === fullNewVideoURL) {
    if (!isVideoPaused(fullNewVideoURL)) {
      videoPlayer.value.pause();

      const checkbox = document.getElementById(checkboxId);
      if (checkbox) {
        checkbox.checked = true;
      }
    } else {
      videoPlayer.value.play();

      const checkbox = document.getElementById(checkboxId);
      if (checkbox) {
        checkbox.checked = false;
      }
    }
  } else {
    videoPlayer.value.src = videoUrl;
    videoPlayer.value.play();

    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
      checkbox.checked = false;
    }
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 0.5rem;
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
  border-top: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
}

/*bg-image-breaker bg-image-breaker1*/

.bg-image-breaker::before {
  background-color: #000;
}

.bg-image-breaker {
  position: relative;
  width: 100%;
  height: 85vh;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  transition: transform 0.5s ease-in-out;
}

.bg-image-breaker1 {
  background-image: url("/assets/images/about-us/image-breaker1.jpg");
}

.bg-image-breaker2 {
  background-image: url("/assets/images/about-us/image-breaker2.jpg");
}

.bg-image-breaker3 {
  background-image: url("/assets/images/our_people_about_us.jpg");
}

.bg-image-breaker4 {
  background-image: url("/assets/images/csr_image_breaker.jpg");
}

.pg-white {
  background-color: #ffffff;
}

.pg-my-blue {
  background-color: #304296;
}

.pg-my-black {
  background-color: #000000;
}

.pg-my-grey {
  background-color: #ececec;
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
  content: "";
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
  color: #f5ce95;
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
  content: "";
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
  -webkit-clip-path: polygon(
    50% 0%,
    100% 25%,
    100% 75%,
    50% 100%,
    0% 75%,
    0% 25%
  );
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
  content: "";
  opacity: 0;
  transition: opacity 0.5s;
}

#hexGrid .img:before {
  background: rgba(22, 103, 137, 0.3);
}

#hexGrid .img:after {
  background: linear-gradient(
    to top,
    transparent,
    rgba(0, 0, 0, 0.5),
    transparent
  );
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
@media (min-width: 1201px) {
  /* <- 5-4  hexagons per row */
  #hexGrid {
    padding-bottom: 7.4%;
    font-size: 14px;
  }

  .hex {
    width: 33.333%;
    /* = 100 / 3 */
  }

  .hex:nth-child(5n + 4) {
    /* first hexagon of even rows */
    margin-left: 16.666%;
    /* = width of .hex / 2  to indent even rows */
  }
}

@media (max-width: 1200px) and (min-width: 901px) {
  /* <- 4-3  hexagons per row */
  #hexGrid {
    padding-bottom: 5.5%;
    font-size: 13px;
  }

  .hex {
    width: 25%;
    /* = 100 / 4 */
  }

  .hex:nth-child(7n + 5) {
    /* first hexagon of even rows */
    margin-left: 12.5%;
    /* = width of .hex / 2  to indent even rows */
  }
}

@media (max-width: 900px) and (min-width: 601px) {
  #hexGrid {
    padding-bottom: 7.4%;
    font-size: 14px;
  }

  .hex {
    width: 33.333%;
    /* = 100 / 3 */
  }

  .hex:nth-child(5n + 4) {
    margin-left: 16.666%;
  }
}

@media (max-width: 600px) {
  #hexGrid {
    padding-bottom: 11.2%;
    font-size: 12px;
  }

  .hex {
    width: 50%;
    /* = 100 / 3 */
  }

  .hex:nth-child(3n + 3) {
    margin-left: 25%;
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
  background: linear-gradient(251deg, #c02434 14.71%, transparent 26.89%),
    linear-gradient(106deg, #c02434 11.34%, transparent 42.02%);
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
  border-radius: 50%;
}

.details {
  position: absolute;
  margin-top: -15%;
  background-color: #ffffff;
  padding-left: 15px;
  padding-top: 8px;
  min-height: 80px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 10px;
  width: 87%;
  line-height: 1.8rem;
  margin-left: 10%;
}

.details .name {
  font-weight: 550;
  color: #c02434;
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

.csr-image img {
  width: 50%;
  margin-left: 20%;
  right: 0;
}

/* Masonry layout using CSS Grid */

.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
  grid-gap: 10px;
}

.masonry-item {
  margin-bottom: 20px;
}

@media (max-width: 576px) {
  .masonry {
    grid-gap: 10px;
  }
}

@media (max-width: 768px) {
  .masonry {
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  }
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
}

.main-clients {
  display: flex;
  --s: 136px;
  /* size  */
  --m: 4px;
  /* space */
  --r: calc(var(--s) + 4 * var(--m) - 2px);
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
  margin-bottom: calc(var(--m) - var(--s) * 0.5);
  justify-content: center;
  /* Center horizontally */
  align-items: center;
}

.clients-container::before {
  content: "";
  width: calc(var(--s) / 2 + var(--m));
  float: left;
  height: 140%;
  shape-outside: repeating-linear-gradient(
    #0000 0 calc(var(--r) - 3px),
    #000 0 var(--r)
  );
}

.clients-container div img {
  max-width: 100%;
  width: 100%;
}

.methodology-item {
  width: 20.9%;
  border: 2.5px solid #c02434;
  /*cccccc*/
  margin: 0.3%;
  padding: 15px;
  border-radius: 40px;
  background-color: transparent;
}

.methodology-item {
  position: relative;
  float: left;
  margin: 20px;
}

.methodology-item.up-class {
  margin-top: 40px;
}

.methodology-item-internal {
  padding: 10px;
  border: 2px solid #c02434;
  border-radius: 40px;
  height: 100%;
  box-shadow: 0px 3px 13px 2px #c02434;
  background-color: white;
}

.methodology-item.up-class:after {
  content: " ";
  position: absolute;
  right: 30px;
  top: 50%;
  border-top: none;
  border-right: 35px solid transparent;
  border-left: 35px solid transparent;
  border-bottom: 35px solid #c02434;
}

.methodology-item.right-class:after {
  content: " ";
  position: absolute;
  right: -35px;
  bottom: 50px;
  border-top: 35px solid transparent;
  border-right: none;
  border-left: 35px solid #c02434;
  border-bottom: 35px solid transparent;
}

.methodology-item.right-class:before {
  content: " ";
  position: absolute;
  right: -28px;
  bottom: 60px;
  border-top: 25px solid transparent;
  border-right: none;
  /*border-left: 28px solid #ffffff;*/
  border-bottom: 25px solid transparent;
  z-index: 1;
}

.methodology-item.down-class:after {
  content: " ";
  position: absolute;
  right: 50px;
  bottom: -35px;
  border-top: 35px solid #c02434;
  border-right: 35px solid transparent;
  border-left: 35px solid transparent;
  border-bottom: none;
}

.methodology-item.down-class:before {
  content: " ";
  position: absolute;
  right: 60px;
  bottom: -28px;
  /*border-top: 28px solid #ffffff;*/
  border-right: 25px solid transparent;
  border-left: 25px solid transparent;
  border-bottom: none;
  z-index: 1;
}

.methodology-item.left-class:after {
  content: " ";
  position: absolute;
  left: -35px;
  bottom: 50px;
  border-top: 35px solid transparent;
  border-right: 35px solid #c02434;
  border-left: none;
  border-bottom: 35px solid transparent;
}

.methodology-item.left-class:before {
  content: " ";
  position: absolute;
  left: -28px;
  bottom: 60px;
  border-top: 25px solid transparent;
  /*border-right: 28px solid #ffffff;*/
  border-left: none;
  border-bottom: 25px solid transparent;
  z-index: 1;
}

.methodology-item:last-child {
  /*border-right: 10px solid #c02434; */
  border-top: 4px solid #c02434;
}

.methodology-item:last-child:before {
  content: " ";
  position: absolute;
  left: 0px;
  bottom: 0px;
  border-top: 0px solid transparent;
  border-right: 0px solid #000;
  border-left: none;
  border-bottom: 0px solid transparent;
  z-index: -1;
}

.methodology-item:last-child:after {
  content: " ";
  position: absolute;
  left: 0px;
  bottom: 0px;
  border-top: 0px solid transparent;
  border-right: 0px solid #000;
  border-left: none;
  border-bottom: 0px solid transparent;
  z-index: -1;
}

.met-item {
  background-color: #ffffff;
  border-radius: 60px;
  max-width: 60%;
  max-height: 60px;
}

.met-text {
  display: flex;
  justify-content: center;
}

.met-text span {
  text-align: center;
}

.met-image {
  display: flex;
  /*box-shadow: -3px 0px 2px #d0c4c4;*/

  margin-top: 0px;
  align-items: center;
  justify-content: center;
}

.met-image img {
  max-height: 92px;
  /*background-color: #000;*/
  /*background-image: linear-gradient(to right, #ffffff, #d9d7d7);*/
  /*border-radius: 50%;*/
  /*box-shadow: -7px 1px 2px #c0bfbf;*/
}

.met-description {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: -12px;
  padding-bottom: 10px;
}

.met-description span {
  color: #304296;
  font-size: 1.4rem;
  font-weight: 550;
}

.met-text {
  padding-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
}

.justify-content-right {
  justify-content: right !important;
}

.justify-content-left {
  justify-content: left !important;
}

.links-container .link {
  background-color: #f0efef;
  border-radius: 60px;
  border-bottom: 4px solid #c02434;
  border-top: 1px solid #bdbcbc;
}

.link:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  margin: 44px auto 0;
  width: 0;
  height: 0;
  border-top: 8px solid #c02434;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.link2:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  margin: 44px 23% 0;
  width: 0;
  height: 0;
  border-top: 8px solid #c02434;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.link2:before {
  content: "";
  position: absolute;
  /*transform: rotate(180deg);*/
  left: 0;
  right: 0;
  margin: 44px 75% 0;
  /* Adjust margin to position the second arrow below */
  width: 0;
  height: 0;
  border-top: 8px solid #c02434;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.link-half-1:after {
  margin: 44px 48% 0;
}

.link-half-2:after {
  margin: 44px 48% 0;
}

.two-columns {
  flex-basis: calc(50% - 10px);
  /* Each div takes up 50% of the container width with a little spacing in between */
  padding: 10px;
  /* Add some spacing for readability */
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
  max-height: 45px;
  margin-bottom: 8px;
  padding-left: 0px;
  padding-right: 0px;
}

.link-half {
  max-width: 48%;
}

.link-half-1 {
  margin-right: 2%;
}

.link-half-2 {
  margin-left: 2%;
}

.link span {
  font-size: 1.7rem;
  font-weight: 400;
  color: #eb1e25;
  z-index: 1;
}

.link-last:after,
.link-header:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  margin: 44px 23% 0;
  width: 0;
  height: 0;
  border-top: 0px solid #c02434;
  border-left: 0px solid transparent;
  border-right: 0px solid transparent;
}

.links-container .link-header {
  margin-bottom: 20px;
  background-color: #c02434;
}

.links-container .link-header .met-description {
  width: 100%;
}

.links-container .link-header span {
  font-size: 3rem;
  color: #ffffff;
  font-weight: 550;
}

.our-history-title {
  position: relative;
  display: inline-block;
  color: #c02434;
  font-size: 3.9rem;
  font-weight: 600;
}

.our-history-title:after {
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

.who-we-are-p {
  font-size: 1.5rem !important;
  font-weight: 450;
}

.who-we-are .icon {
  max-width: 35%;
  padding-bottom: 5px;
}

.bottom-title {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c02434;
}

.bottom-title span {
  font-size: 2.3rem;
  font-weight: 550;
  color: #ffffff;
  transform: scaleY(1.4);
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.who-we-are-segments .item {
  border: 1px solid #c02434;
}

.who-we-are-section {
  background-image: url("/assets/images/about-us/who-we-are/who_we_are_sheffield_steel_systems.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  width: 100%;
  /*height: 100vh;*/
  z-index: 0 !important;
}

.overlay {
  position: absolute !important;
  background-color: rgb(255 255 255 / 78%) !important;
}

.our-methodology-section {
  border-top: 1px solid #b7b6b6;
}

.cuture-image {
  width: 100%;
}

.cuture-image img {
  width: 100%;
}

.our-culture {
  border-top: 0px solid #323030;
  border-bottom: 0px solid #323030;
  padding-bottom: 0rem;
}

.culture-text-box {
  position: absolute;
  top: 14%;
  right: 7%;
  background: rgba(255, 255, 255, 0.93);
  padding-top: 50px;
  padding-bottom: 50px;
  padding-right: 30px;
  padding-left: 30px;
  max-width: 35%;
  z-index: 0;
  border-radius: 6%;
}

.our-culture-p {
  font-size: 1.5rem !important;
  font-weight: 450;
}

.our-people-section img {
  margin-top: -110px;
}

.people-numbers {
  position: absolute;
  width: 15%;
}

.people-numbers .number {
  color: #eb1e25;
  display: block;
  font-size: 2rem;
  font-weight: 650;
  margin-bottom: -6px;
}

.people-numbers .number-title {
  display: block;
  line-height: 1.1;
  font-weight: 550;
  font-size: 1.2rem;
  color: #464646;
  right: 0;
}

.our-people-section .staff {
  top: 3%;
  left: 4%;
}

.our-people-section .engineering-crew {
  top: 56%;
  left: 11%;
}

.our-people-section .leaders {
  top: 79%;
  left: 46.5%;
}

.our-people-section .design {
  top: 56%;
  left: 75%;
}

.our-people-section .in-house {
  top: 3%;
  left: 87%;
}

.play-button {
  position: relative;
}

.checkbox-play {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}

.label-play {
  display: grid;
  border: none;
  background-color: #c02434;
  --w: 38px;
  width: var(--w);
  height: var(--w);
  border-radius: 50%;
  place-items: center;
  cursor: pointer;
}

.play_pause_icon {
  --w: 50%;
  width: var(--w);
  height: var(--w);
  background: white;
  translate: 0 0;
  transition: all 0.2s ease-in-out;
}

.play {
  clip-path: polygon(
    20% 0,
    20% 100%,
    90% 50%,
    90% 50%,
    90% 50%,
    90% 50%,
    90% 50%,
    90% 50%,
    90% 50%
  );
  translate: 6% 0;
}

/*
  .play-button:has(input:checked) .play_pause_icon,
  .pause {
    clip-path: polygon(
      0 0,
      0 100%,
      33.33% 100%,
      33.33% 0,
      66.66% 0,
      100% 0,
      100% 100%,
      66.66% 100%,
      66.66% 0
    );
    translate: 0 0;
  }
  
  .play-2 {
    clip-path: polygon(
      20% 0,
      20% 100%,
      35% 90%,
      35% 90%,
      35% 90%,
      90% 50%,
      35% 10%,
      35% 10%,
      35% 10%
    );
    translate: 6% 0;
  }
  */

/* Play button styles */
.play-button:has(input:checked) .play_pause_icon,
.pause {
  clip-path: polygon(
    0 0,
    0 100%,
    33.33% 100%,
    33.33% 0,
    66.66% 0,
    100% 0,
    100% 100%,
    66.66% 100%,
    66.66% 0
  );
  transform: translate(0, 0);
}

.play-button:not(:has(input:checked)) .play_pause_icon {
  clip-path: polygon(
    20% 0,
    20% 100%,
    35% 90%,
    35% 90%,
    35% 90%,
    90% 50%,
    35% 10%,
    35% 10%,
    35% 10%
  );
  transform: translate(6%, 0);
}

.play-button:has(input:checked) .label-play {
  background-color: #304296;
  box-shadow: 4px 4px 14px #525252 !important;
  border: 2px solid #fff;
}

.video-button {
  border: 1.9px solid #eeeeee;
  margin-bottom: 1.8rem;
  box-shadow: 1px 2px 11px #a9a9a9;
  background-color: #ffffff;
  margin-left: 20px;
  margin-right: 20px;
}

.play-button {
  width: 20%;
  display: inline-block;
  position: absolute;
  margin-top: 7%;
  margin-left: 3%;
}

.video-logo {
  width: 65%;
  display: inline-block;
  margin-left: 20%;
}

.video-player video {
  width: 100%;
}

.video-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 2rem;
}

.who-we-are-image-video {
  overflow: hidden;
}

.who-we-are-image-video video {
  width: 100%;
  margin-top: -10%;
  margin-bottom: -6.5%;
}

a:not([href]):not([tabindex]) {
  color: #c02434;
}

a:not([href]):not([tabindex]):focus,
a:not([href]):not([tabindex]):hover {
  color: #ffffff;
}

.btn-video:hover,
.btn-video:focus {
  background-color: #c02434;
}

.btn-video {
  background-color: #ffffffc4;
  border: 3px solid #c02435;
  border-radius: 50%;
  box-shadow: 0 0 0 1.5rem rgb(14 14 14 / 20%);
}

.video-banner-about {
  border-radius: 6%;
  /* box-shadow: 4px 2px 16px #606060;*/
}

.bg-image {
  background-color: transparent !important;
}

.view-sheffield {
  position: absolute;
  background-color: #c02435;
  border-radius: 30px;
  padding: 5px;
  display: block;
  bottom: 10px;
  left: 7%;
}

.view-sheffield a {
  color: #ffffff !important;
  padding: 10px;
  font-size: 2rem;
  font-weight: 550;
}

.carousel-div-image {
  height: 200px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}

.carousel-div-image img {
  height: auto;
  background-color: #ffffff;
  padding-top: 30px;
  padding-bottom: 80px;
  border-radius: 25px;
}

.carousel-wrapper {
  background-color: #949494;
}

.carousel__track {
  background-color: #000;
}

.carousel__icon {
  width: 3px !important;
}

.carousel-div-image .play-button {
  margin-top: 67%;
  margin-left: 35%;
}

.counter-section {
  opacity: 1;
  /* Initially hide the counters */
  transition: opacity 0.5s;
}

.counter-section.visible {
  opacity: 1;
  /* Show the counters when the section is in view */
}

.csr_image_impact {
  padding-top: 15px;
  padding-right: 0px;
  padding-left: 0px;
}

.csr_image_impact .text-block {
  position: absolute;
  bottom: 10px;
  background-color: #304296e6;
  width: 30%;
  margin-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.csr_image_impact .text-block span {
  font-size: 1.5rem;
  font-weight: 650;
  padding-bottom: 10px;
  color: #ffffff;
}

.csr_image_impact .csr-icon-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.csr_image_impact .csr-icon-image img {
  width: 50%;
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
    brightness(102%) contrast(102%);
}

.csr_image_impact .csr-icon-text {
  display: flex;
  justify-content: center;
}

.container-video-button {
  display: flex;
}

.container-video-button .btn-video {
  margin-left: 10%;
}

@media (min-width: 768px) {
  .link {
    width: 100%;
  }

  .btn-video {
    width: 9rem;
    height: 9rem;
    font-size: 2.8rem;
  }
}

@media (max-width: 767px) {
  .bg-image-breaker {
    position: relative;
    width: 100%;
    height: 20vh;
    background-size: contain;
  }

  .csr_image_impact .text-block {
    width: 50%;
  }

  .partners-logos .col-sm-6 {
    width: 50%;
  }

  .links-container {
    max-width: 100%;
    margin-left: 0%;
  }

  .links-container .link-header span {
    font-size: 2.4rem;
  }

  .link span {
    font-size: 1.4rem;
  }

  .view-sheffield {
    bottom: 0;
    position: absolute;
    display: block;
    background-color: #c02435;
    border-radius: 30px;
    padding: 10px;
    margin-left: 15%;
    margin-bottom: 10px;
    left: 0;
  }

  .view-sheffield a {
    font-size: 1.7rem;
  }

  .video-banner-bg {
    padding-top: 19.5rem;
    padding-bottom: 19.5rem;
  }

  .about-team-container2 .col {
    flex-basis: auto;
  }

  .our-people-section img {
    margin-top: 20px;
  }

  .our-people-section .staff {
    top: 48%;
  }

  .our-people-section .engineering-crew {
    top: 86%;
  }

  .our-people-section .leaders {
    top: 89%;
  }

  .our-people-section .design {
    top: 86%;
  }

  .our-people-section .in-house {
    top: 48%;
  }

  .csr-image img {
    width: 70%;
    margin-left: 12%;
  }

  .main-clients {
    --s: 129px;
  }

  .cuture-image > img {
    display: none;
  }

  /*.culture-text-box {*/
  /*    position: relative;*/
  /*    top: 20%;*/
  /*    right: 7%;*/
  /*    background: rgba(255, 255, 255, 0.93);*/
  /*    padding-top: 50px;*/
  /*    padding-bottom: 50px;*/
  /*    padding-right: 30px;*/
  /*    padding-left: 30px;*/
  /*    max-width: 35%;*/
  /*    z-index: 1;*/
  /*    border-radius: 6%;*/
  /*}*/

  .culture-text-box {
    position: relative;
    /* top: 20%; */
    right: 5%;
    left: 5%;
    background: rgba(255, 255, 255, 0.79);
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 30px;
    padding-left: 30px;
    max-width: 90% !important;
    z-index: 1;
    margin-top: 60px;
    margin-bottom: 60px;
    border-radius: 30px;
  }

  .methodology-item {
    width: 100%;
  }

  .leadership-section {
    display: none;
  }

  .csr-section {
    display: none;
  }

  .carousel__prev,
  .carousel__next {
    margin: 15px;
    background: #eb1e24;
    width: 70px;
    height: 70px;
    color: white;
  }
}

@media (max-width: 1367px) {
  .culture-text-box {
    top: 5%;
    right: 3%;
    max-width: 44%;
  }
}
</style>
