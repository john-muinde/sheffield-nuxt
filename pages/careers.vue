<template>
  <main class="main">
    <div class="page-content pg-white">
      <div class="container">
        <div class="pg-white">
          <div class="mb-lg-5">
            <div class="container">
              <div class="row no-margin">
                <div class="col-lg-12 justify-content-center mt-1">
                  <h2 class="about-us-title">Careers at Sheffield</h2>
                  <!-- End .title -->
                  <!-- <p class="lead about-us-lead text-primary mb-1">We are searching for talents in the following fields</p> -->

                  <div class="row mt-3 graduate-intake hex-section-career">
                    <div class="col-lg-12 mb-3">
                      <p class="who-we-are-p">
                        Sheffield Africa is an equal opportunity employer with
                        opportunities to guide your career. We are always
                        sourcing for problem solvers and creative thinkers from
                        engineers to sales and marketing personnel. Put your
                        talents to use where opportunities are limitless and
                        every day makes a difference. Whether you’re an
                        experienced professional or a recent graduate, working
                        with Sheffield Africa will be a rewarding experience
                        that will grow your career.
                      </p>
                    </div>

                    <div class="col-lg-12">
                      <div class="grid">
                        <ul id="hexGrid">
                          <li class="hex">
                            <div class="hexIn">
                              <div class="hexLink">
                                <div
                                  class="img"
                                  style="
                                    background-image: url(assets/images/welding.jpg);
                                  "
                                ></div>

                                <span id="demo2">Technical</span>
                              </div>
                            </div>
                          </li>

                          <li class="hex">
                            <div class="hexIn">
                              <div class="hexLink">
                                <div
                                  class="img"
                                  style="
                                    background-image: url(/assets/images/human_resource.jpg);
                                  "
                                ></div>
                                <span id="demo2">Admin</span>
                              </div>
                            </div>
                          </li>

                          <li class="hex">
                            <div class="hexIn">
                              <div class="hexLink">
                                <div
                                  class="img"
                                  style="
                                    background-image: url(assets/images/our_staff.jpg);
                                  "
                                ></div>
                                <span id="demo2">Engineering</span>
                              </div>
                            </div>
                          </li>
                          <li class="hex">
                            <div class="hexIn">
                              <div class="hexLink">
                                <div
                                  class="img"
                                  style="
                                    background-image: url(assets/images/homepage/sheffield_engineer.jpg);
                                  "
                                ></div>
                                <span id="demo2">Design</span>
                              </div>
                            </div>
                          </li>

                          <li class="hex">
                            <div class="hexIn">
                              <div class="hexLink">
                                <div
                                  class="img"
                                  style="
                                    background-image: url(/assets/images/sales_and_marketing.jpg);
                                  "
                                ></div>
                                <span id="demo2">Sales & Marketing</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pg-white who-we-are-section">
          <div class="overlay"></div>
          <div class="pt-5 pb-2">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <!--  <div class="col-lg-10 offset-lg-1">
  
                                              <p class="who-we-are-p">Sheffield Africa is an equal opportunity employer with opportunities to guide your career. We are always sourcing for problem solvers and creative thinkers from engineers to sales and marketing personnel.
                                              Put your talents to use where opportunities are limitless and every day makes a difference. Whether you’re an experienced professional or a recent graduate, working with Sheffield Africa will be a rewarding experience that will grow your career.
                                              </p>
  
                                          </div> -->

                    <div class="col-lg-8 offset-lg-1 who-we-are">
                      <h5 class="mt-2">Benefits</h5>

                      <ul class="graduate-trainee-program">
                        <li>
                          <i class="icon-check"></i> Transformative experience
                          throughout the career journey
                        </li>
                        <li>
                          <i class="icon-check"></i> Diverse & inclusive working
                          environment
                        </li>
                        <li>
                          <i class="icon-check"></i> Opportunity to impact on
                          client experience through innovative solutions
                        </li>
                        <li>
                          <i class="icon-check"></i> We support your growth &
                          learning opportunities
                        </li>
                        <li>
                          <i class="icon-check"></i> Strong mentorship under
                          experienced industry leaders
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End .row -->
            </div>
            <!-- End .container -->
          </div>
        </div>

        <div>
          <!-- all props & events -->
          <vue-easy-lightbox
            esc-disabled
            :visible="visible"
            :imgs="imgs"
            :index="indexRef"
            @hide="handleHide"
          />
        </div>

        <div class="pg-white who-we-are-section">
          <div class="overlay"></div>

          <div class="pt-5 pb-2">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div
                      id="fill_fomr"
                      class="col-lg-10 offset-lg-1 who-we-are"
                    >
                      <h2 class="about-us-title mb-4">
                        Interested in joining us
                      </h2>

                      <p class="about-us-text">
                        Fill the form below with your details and click submit.
                      </p>

                      <div class="row">
                        <div class="offset-lg-1 col-md-10 register-right mt-2">
                          <div id="myTabContent" class="">
                            <div
                              id="home"
                              class=""
                              role="tabpanel"
                              aria-labelledby="home-tab"
                            >
                              <form @submit.prevent="submitForm">
                                <div class="row register-form">
                                  <div class="form-group col-md-6">
                                    <label for="" class="label"
                                      ><b>Name</b></label
                                    >
                                    <input
                                      v-model="career.name"
                                      required
                                      type="text"
                                      class="form-control"
                                      placeholder="Name *"
                                    />
                                  </div>
                                  <div class="form-group col-md-6">
                                    <label for="" class="label"
                                      ><b>Phone Number</b></label
                                    >
                                    <input
                                      v-model="career.phone_number"
                                      required
                                      type="text"
                                      class="form-control"
                                      placeholder="Phone Number *"
                                    />
                                  </div>
                                  <div class="form-group col-md-6">
                                    <label for="" class="label"
                                      ><b>Email</b></label
                                    >
                                    <input
                                      v-model="career.email"
                                      required
                                      type="email"
                                      class="form-control"
                                      placeholder="Email *"
                                    />
                                  </div>
                                  <div class="form-group col-md-6">
                                    <label for="" class="label"
                                      ><b>Job Title/Position</b></label
                                    >
                                    <input
                                      v-model="career.job_title"
                                      required
                                      type="text"
                                      class="form-control"
                                      placeholder="Job Title *"
                                    />
                                  </div>

                                  <div class="form-group col-md-12">
                                    <label for="" class="label"
                                      ><b>Message</b></label
                                    >
                                    <textarea
                                      v-model="career.message"
                                      required
                                      placeholder="Write your message here ..."
                                      class="form-control"
                                    ></textarea>
                                  </div>

                                  <div class="form-group col-md-6">
                                    <label for="" class="label"
                                      ><b>Attach CV</b></label
                                    >
                                    <input
                                      required
                                      type="file"
                                      class="form-control"
                                      placeholder="Attach CV *"
                                      @change="
                                        career.cv = $event.target.files[0]
                                      "
                                    />
                                  </div>

                                  <div class="form-group col-md-6">
                                    <label for="" class="label"
                                      ><b>Supporting Document</b></label
                                    >
                                    <input
                                      required
                                      type="file"
                                      class="form-control"
                                      placeholder="Supporting Document *"
                                      @change="
                                        career.supporting_document =
                                          $event.target.files[0]
                                      "
                                    />
                                  </div>

                                  <div class="col-md-12 form-group mt-2">
                                    <button
                                      type="submit"
                                      :disabled="isLoading"
                                      class="btn btn-primary btn-minwidth-sm"
                                    >
                                      <div v-show="isLoading" class=""></div>
                                      <span v-if="isLoading"
                                        >Processing...</span
                                      >
                                      <span v-else>SUBMIT YOUR CV</span>
                                      <i class="icon-long-arrow-right"></i>
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
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
  </main>
</template>

<script setup>
import { ref, reactive } from "vue";

useHead({
  title: "Careers",
  meta: [
    {
      name: "description",
      content:
        "Sheffield Africa is an equal opportunity employer with opportunities to guide your career. We are always sourcing for problem solvers and creative thinkers from engineers to sales and marketing personnel. Put your talents to use where opportunities are limitless and every day makes a difference. Whether you’re an experienced professional or a recent graduate, working with Sheffield Africa will be a rewarding experience that will grow your career.",
    },
  ],
});
import VueEasyLightbox from "vue-easy-lightbox";

import { useForm, useField, defineRule } from "vee-validate";

const { executeRecaptcha } = useVueRecaptcha();

defineRule("required", required);
defineRule("min", min);

// Define a validation schema
const schema = {
  name: "required|min:3",
  phone_number: "required",
  email: "required|min:3",
  message: "required",
  job_title: "required",
};

// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });

const { value: name } = useField("name", null, { initialValue: "" });
const { value: phone_number } = useField("phone_number", null, {
  initialValue: "",
});
const { value: email } = useField("email", null, { initialValue: "" });
const { value: message } = useField("message", null, { initialValue: "" });
const { value: job_title } = useField("job_title", null, { initialValue: "" });
const { value: cv } = useField("cv", null, { initialValue: "" });
const { value: supporting_document } = useField("supporting_document", null, {
  initialValue: "",
});

const { storeCareer, validationErrors, isLoading } = useCareers();

const career = reactive({
  name,
  phone_number,
  email,
  message,
  job_title,
  cv: "",
  supporting_document: "",
});

const onRecaptchaVerify = async (token) => {
  await submitForm();
};

const submitForm = async () => {
  try {
    const form = await validate();

    if (form.valid) {
      const recaptchaToken = await executeRecaptcha("career_form");
      career.recaptchaToken = recaptchaToken;
      storeCareer(career);
    }
  } catch (error) {
    console.error("Validation error:", error);
  }
};
const { API_URL } = useAxios();

const imgs = ref([]);

const showSingle = (image) => {
  imgs.value = API_URL + image;
  show();
};

const visible = ref(false);
const indexRef = ref(0);
const show = () => {
  indexRef.value = 0;
  visible.value = true;
};

const handleHide = () => {
  visible.value = false;
};
</script>

<style scoped>
.hex-section-career .hex1 {
  background: red;
  -webkit-clip-path: polygon(
    25% 5%,
    75% 5%,
    100% 50%,
    75% 95%,
    25% 95%,
    0% 50%
  );
  clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
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

.who-we-are-section {
  background-image: url("/assets/images/about-us/who-we-are/who-we-are-background.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  width: 100%;
  /*height: 100vh;*/
  z-index: 0;
}

.overlay {
  position: absolute !important;
  background-color: rgb(255 255 255 / 92%) !important;
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

.about-us-lead {
  font-size: 1.6rem !important;
  color: #304296 !important;
}

.about-us-p {
  font-size: 1.5rem !important;
  font-weight: 450;
}

.cuture-image {
  width: 100%;
}

.cuture-image img {
  width: 100%;
}

.our-culture {
  border-top: 6px solid #323030;
  border-bottom: 6px solid #323030;
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
  max-width: 45%;
  z-index: 1;
  border-radius: 6%;
}

.our-culture-p {
  font-size: 1.5rem !important;
  font-weight: 450;
}

.graduate-trainee-program {
  margin-left: 30px;
}

.graduate-trainee-program i {
  color: #c02434;
  padding-right: 10px;
}

.graduate-intake .text {
  background-color: #c02434;
  justify-content: center;
  display: grid;
}

.graduate-intake span {
  color: #ffffff;
  font-weight: 450;
  font-size: 1.5rem;
  padding-top: 5px;
  padding-bottom: 5px;
}

.graduate-intake .image {
  border-radius: 15px;
}

.graduate-intake .image {
  border-radius: 15px;
  overflow: hidden;
}

.graduate-trainee-program-section {
  padding-bottom: 5px;
}

@media (max-width: 1200px) {
  .cuture-image > img {
    display: none;
  }

  .culture-text-box {
    position: relative;
    top: 20%;
    right: 7%;
    background: rgba(255, 255, 255, 0.93);
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 30px;
    padding-left: 30px;
    max-width: 35%;
    z-index: 1;
    border-radius: 6%;
  }

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
    max-width: 90%;
    z-index: 1;
    margin-top: 60px;
    margin-bottom: 60px;
    border-radius: 30px;
  }

  .graduate-trainee-program-section {
    background-image: url(/assets/images/about-us/our-culture.jpg);
  }
}

@media (max-width: 767px) {
  .cuture-image > img {
    display: none;
  }

  .culture-text-box {
    position: relative;
    top: 20%;
    right: 7%;
    background: rgba(255, 255, 255, 0.93);
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 30px;
    padding-left: 30px;
    max-width: 35%;
    z-index: 1;
    border-radius: 6%;
  }

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
    max-width: 90%;
    z-index: 1;
    margin-top: 60px;
    margin-bottom: 60px;
    border-radius: 30px;
  }

  .graduate-trainee-program-section {
    background-image: url(/assets/images/about-us/our-culture.jpg);
  }

  .col {
    flex-basis: max-content !important;
  }
}

#hexGrid {
  display: flex;
  flex-wrap: wrap;
  width: 70%;
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
.hex span {
  width: 100%;
  /*padding: 5%;*/
  box-sizing: border-box;
  font-weight: 300;
  opacity: 1;
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
  top: 75%;
  text-align: center;
  text-transform: uppercase;
  background-color: #c02434cc;
  font-weight: 550;
  font-size: 1.5rem;
  left: 0;
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
  /* <- 3-2  hexagons per row */
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

  .hex:nth-child(3n + 3) {
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

.graduate-trainee-program li {
  display: flex;
}

.register {
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  margin-top: 3%;
  padding: 3%;
}

.register-left {
  text-align: center;
  color: #fff;
  margin-top: 4%;
}

.register-left input {
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  width: 60%;
  background: #f8f9fa;
  font-weight: bold;
  color: #383d41;
  margin-top: 30%;
  margin-bottom: 3%;
  cursor: pointer;
}

.register-right {
  background: #f8f9fa;
  border-top-left-radius: 10% 50%;
  border-bottom-left-radius: 10% 50%;
}

.register-left img {
  margin-top: 15%;
  margin-bottom: 5%;
  width: 25%;
  -webkit-animation: mover 2s infinite alternate;
  animation: mover 1s infinite alternate;
}

@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-20px);
  }
}

@keyframes mover {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-20px);
  }
}

.register-left p {
  font-weight: lighter;
  padding: 12%;
  margin-top: -9%;
}

.register .register-form {
  padding: 10%;
  margin-top: 10%;
}

.btnRegister {
  float: right;
  margin-top: 10%;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  background: #0062cc;
  color: #fff;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
}

.register .nav-tabs {
  margin-top: 3%;
  border: none;
  background: #0062cc;
  border-radius: 1.5rem;
  width: 28%;
  float: right;
}

.register .nav-tabs .nav-link {
  padding: 2%;
  height: 34px;
  font-weight: 600;
  color: #fff;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}

.register .nav-tabs .nav-link:hover {
  border: none;
}

.register .nav-tabs .nav-link.active {
  width: 100px;
  color: #0062cc;
  border: 2px solid #0062cc;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}

.register-heading {
  text-align: center;
  margin-top: 8%;
  margin-bottom: -15%;
  color: #495057;
}
</style>
