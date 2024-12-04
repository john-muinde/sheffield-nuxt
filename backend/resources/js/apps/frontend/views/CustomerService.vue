<template>
  <div>
    <main class="main">
      <div
        class="video-banner video-banner-bg bg-image text-center overlayed-div"
        style="background-image: url(/assets/images/about_us.jpeg)"
      >
        <div class="container">
          <h3 class="video-banner-title h1 text-white">
            <strong>Customer Service</strong><span>Your Premier Solution and Service Provider for
              Commercial Kitchen, Laundry, and Cold Storage
              Solutions in East Africa and Beyond.
            </span>
          </h3>
          <div class="container container-video-button" style="cursor: pointer;">
            <a
              class="btn-video btn-iframe"
              @click="showVideoPopup
              "
            ><i class="icon-play"></i></a>

            <VideoPopup
              :show-popup="isVideoPopupVisible
              "
              :video-url="videoUrl
              "
              @close="hideVideoPopup
              "
            />
          </div>
        </div>
      </div>

      <div class="page-content pb-0 pt-3">
        <div class="container terms_page">
          <div class="row">
            <div class="col-md-4 customer-service color-1">
              <div class="number">
                <span>01.</span>
              </div>

              <div class="title">
                <span>SOURCING AND IMPORTS</span>
              </div>

              <div class="text">
                <span>We have established and invested in
                  partnerships with world-class equipment
                  manufacturers. The manufacturers enable us
                  to supply our clients with varieties of
                  high-quality equipment.</span>
              </div>

              <span class="arrow_icon"><i class="icon-arrow-right"></i></span>
            </div>

            <div class="col-md-4 customer-service color-2">
              <div class="number">
                <span>02.</span>
              </div>

              <div class="title">
                <span>DESIGN & DEVELOPMENT</span>
              </div>

              <div class="text">
                <span>During the pre-sales process, upon inquiry,
                  a site survey is conducted by a technical
                  sales engineer to determine the
                  specifications of your requirement and
                  recommend the appropriate equipment. Design
                  work on a layout of the equipment, which is
                  submitted to the client as a BOQ for their
                  approval.
                </span>
              </div>

              <span class="arrow_icon"><i class="icon-arrow-right"></i></span>
            </div>

            <div class="col-md-4 customer-service color-1">
              <div class="number">
                <span>03.</span>
              </div>

              <div class="title">
                <span>CUSTOMIZATION</span>
              </div>

              <div class="text">
                <span>Customization is our forte and with our
                  stainless steel fabrication plant and cold
                  room manufacturing factory, we produce
                  flexible, unique, and specific solutions
                  tailored to our client’s requirements.</span>
              </div>

              <span class="arrow_icon"><i class="icon-arrow-right"></i></span>
            </div>

            <div class="col-md-4 customer-service color-2">
              <div class="number">
                <span>04.</span>
              </div>

              <div class="title">
                <span>SUPPLY & INSTALLATION</span>
              </div>

              <div class="text">
                <span>The installation process is done against
                  the layout drawings and the project
                  managers’ supervision. Upon completion, the
                  customer alongside the project manager
                  conducts an inspection and commissioning of
                  the equipment. The customer then signs off
                  an installation note and commissioning
                  certificate as approval of works done.
                </span>
              </div>

              <span class="arrow_icon"><i class="icon-arrow-right"></i></span>
            </div>

            <div class="col-md-4 customer-service color-1">
              <div class="number">
                <span>05.</span>
              </div>

              <div class="title">
                <span>TRAINING</span>
              </div>

              <div class="text">
                <span>During commissioning the users of our
                  solutions will be trained on how to use the
                  equipment. The entire staff of Sheffield
                  Steel Systems undergoes continuous
                  improvement training programs to bring
                  further efficiency to all our processes. We
                  also offer training sessions and events for
                  our Customers to Demo our solutions and
                  impact with Business Ideas.
                </span>
              </div>

              <span class="arrow_icon"><i class="icon-arrow-right"></i></span>
            </div>

            <div class="col-md-4 customer-service color-2">
              <div class="number">
                <span>06.</span>
              </div>

              <div class="title">
                <span>AFTER-SALES SUPPORT</span>
              </div>

              <div class="text">
                <span>A Free maintenance contract is extended to
                  the client for one year to support
                  operations and an Annual Maintenance
                  Contract is recommended for continuous
                  servicing and support. We similarly stock
                  original equipment. We arrange for spares
                  and replace the equipment quickly to avoid a
                  long downtime for our customers’ businesses,
                  after which we advise the equipment
                  operators on the corrective action required.
                  .</span>
              </div>

              <span class="arrow_icon"><i class="icon-arrow-right"></i></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { useMeta } from '../../admin/composables/use-meta';
useMeta({ title: 'Customer Service' });
import VideoPopup from '@/Components/VideoPopup.vue';

const isVideoPopupVisible = ref(false);
const videoUrl = 'https://www.youtube.com/embed/YvhZ9lOAnSc';

const showVideoPopup = () => {
    isVideoPopupVisible.value = true;
};

const hideVideoPopup = () => {
    isVideoPopupVisible.value = false;
};
</script>

<style scoped>
.overlayed-div {
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 10%;
    padding-bottom: 10%;
    height: unset;
}

.color-1 {
    background-color: #162d60;
}

.color-2 {
    background-color: #4177b6;
}

.customer-service {
    color: #ebebeb;
    padding-left: 20px;
    padding-right: 20px;
}

.customer-service .number {
    margin-top: 2.2rem;
    font-size: 4.9rem;
    font-weight: 650;
}

.customer-service .title {
    font-size: 1.8rem;
}

.customer-service .text {
    font-size: 1.4rem;
    padding-top: 1rem;
    padding-bottom: 20vh;
}

.customer-service .arrow_icon {
    position: absolute;
    margin-top: 50px;
    margin-bottom: 30px;
    bottom: 0;
    background-color: #ffffff;
    font-size: 4rem;
    font-weight: 800;
    color: #000;
    border-radius: 50%;
    width: 10%;
    display: none;
}


.container-video-button {
    display: flex;
    justify-content: center;
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
</style>
