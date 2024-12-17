<template>
  <div class="page-wrapper">
    <main class="main">
      <div class="page-content">
        <div class="cart">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 offset-lg-1">
                <h2 class="about-us-title">Request Quote</h2>
                <!-- End .title -->
                <p class="lead about-us-lead text-primary mb-1">
                  Submit the form below to request for quote
                </p>
              </div>

              <form class="row" @submit.prevent="submitForm">
                <div
                  class="offset-lg-1 col-lg-6 mb-3 mr-2 mb-lg-0 contact-form-div request-quote-contact-div"
                >
                  <div class="row">
                    <div class="col-sm-12">
                      <label for="cname" class="label-contact"
                        >First Name *</label
                      >
                      <input
                        id="firstname"
                        v-model="contact.firstname"
                        type="text"
                        class="form-control"
                        name="firstname"
                        placeholder="Please enter your first name"
                      />
                      <div class="mt-1 text-danger">
                        <div
                          v-for="message in validationErrors.firstname"
                          :key="message"
                        >
                          {{ message }}
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <label for="cname" class="label-contact">Surname *</label>
                      <input
                        id="surname"
                        v-model="contact.surname"
                        type="text"
                        class="form-control"
                        name="surname"
                        placeholder="Please enter your surname"
                      />
                      <div class="mt-1 text-danger">
                        <div
                          v-for="message in validationErrors?.surname"
                          :key="message"
                        >
                          {{ message }}
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <label for="cname" class="label-contact"
                        >Phone Number *</label
                      >
                      <div class="input-group">
                        <vue-tel-input
                          v-model="contact.phone_number"
                          mode="international"
                          default-country="KE"
                          :valid-characters-only="true"
                          class="w-full"
                        />
                        <div class="mt-1 text-danger">
                          <div
                            v-for="message in validationErrors?.phone_number"
                            :key="message"
                          >
                            {{ message }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <label for="email" class="label-contact">Email *</label>
                      <input
                        id="email"
                        v-model="contact.email"
                        type="email"
                        class="form-control"
                        name="email"
                        placeholder="Please enter your email"
                      />
                      <div class="mt-1 text-danger">
                        <div
                          v-for="message in validationErrors?.email"
                          :key="message"
                        >
                          {{ message }}
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <label for="company_name" class="label-contact"
                        >Company Name *</label
                      >
                      <input
                        id="company_name"
                        v-model="contact.company_name"
                        type="company_name"
                        class="form-control"
                        name="company_name"
                        placeholder="Please enter your company name"
                      />
                      <div class="mt-1 text-danger">
                        <div
                          v-for="message in validationErrors?.company_name"
                          :key="message"
                        >
                          {{ message }}
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <label for="country" class="label-contact"
                        >Country *</label
                      >

                      <multiselect
                        v-model="contact.country"
                        :options="countryOptions"
                        :searchable="true"
                        placeholder="Select country"
                        label="name"
                        track-by="name"
                        selected-label=""
                        select-label=""
                        deselect-label=""
                      >
                        <template #singleLabel="{ option }">
                          <span class="flex items-center">
                            <img
                              :src="option.flag"
                              :alt="option.name"
                              class="w-6 h-4 mr-2"
                            />
                            {{ option.name }}
                          </span>
                        </template>
                        <template #option="{ option }">
                          <span class="flex items-center">
                            <img
                              :src="option.flag"
                              :alt="option.name"
                              class="w-6 h-4 mr-2"
                            />
                            {{ option.name }}
                          </span>
                        </template>
                      </multiselect>
                      <div class="mt-1 text-danger">
                        <div
                          v-for="message in validationErrors?.country"
                          :key="message"
                        >
                          {{ message }}
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12">
                      <label for="request" class="label-contact"
                        >Location*</label
                      >
                      <textarea
                        id="request"
                        v-model="contact.location"
                        class="form-control"
                        cols="30"
                        rows="4"
                        name="request"
                        placeholder="Enter your location ..."
                      ></textarea>
                      <div class="mt-1 text-danger">
                        <div
                          v-for="message in validationErrors?.location"
                          :key="message"
                        >
                          {{ message }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End .row -->
                </div>
                <!-- End .col-lg-9 -->
                <aside class="col-lg-4">
                  <div class="summary summary-cart">
                    <!-- End .summary-title -->

                    <table class="table table-summary">
                      <tbody>
                        <tr class="summary-shipping">
                          <td colspan="2">
                            <h3 class="summary-title text-left">
                              Selected Products
                            </h3>
                          </td>
                        </tr>
                        <!-- Cart content from previous example -->
                        <div
                          v-if="!cartItems.length"
                          class="flex flex-col items-center justify-center min-h-[200px] bg-gray-50 rounded-lg p-8 text-center space-y-6 animate-fade-in"
                        >
                          <div class="bg-primary/10 rounded-full p-2">
                            <ShoppingCartIcon
                              class="w-16 h-16 text-primary animate-bounce"
                            />
                          </div>
                          <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-2">
                              Your Cart Feels a Little Empty
                            </h3>
                            <p class="text-gray-600 mb-4">
                              Explore our commercial kitchen solutions and find
                              the perfect equipment for your business.
                            </p>
                            <NuxtLink
                              to="/commercial-kitchen"
                              class="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-all duration-300 ease-in-out transform hover:scale-105 group"
                            >
                              Start Shopping
                              <svg
                                class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </NuxtLink>
                          </div>
                        </div>

                        <div v-else class="space-y-4">
                          <div class="max-h-[400px] overflow-y-auto">
                            <transition-group
                              name="cart-item"
                              tag="div"
                              class="space-y-3"
                            >
                              <div
                                v-for="(item, index) in cartItems"
                                :key="item.id"
                                class="flex items-center justify-between bg-white shadow-sm border border-gray-100 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                              >
                                <div class="flex items-center space-x-4">
                                  <img
                                    :src="assetsSync(item.main_image_path)"
                                    :alt="item.name"
                                    class="w-16 h-16 object-cover rounded-md border"
                                  />
                                  <div>
                                    <span class="font-semibold text-gray-800">{{
                                      item.name
                                    }}</span>
                                    <p class="text-sm text-gray-500">
                                      {{ item.category }}
                                    </p>
                                    <!-- quantity -->
                                    <span class="text-gray-500"
                                      >Qty: {{ item.quantity }}</span
                                    >
                                  </div>
                                </div>
                                <button
                                  class="text-red-500 hover:bg-red-100 p-2 rounded-full transition-all duration-300 group"
                                  @click="removeFromCart(index)"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 group-hover:scale-110"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </transition-group>
                          </div>
                        </div>
                      </tbody>
                    </table>

                    <table v-if="cartItems.length" class="table table-summary">
                      <tbody>
                        <!-- End .summary-subtotal -->
                        <tr class="summary-shipping">
                          <td colspan="2">
                            <h3 class="summary-title text-left mt-2">
                              Shipping
                            </h3>
                          </td>
                        </tr>

                        <tr class="summary-shipping">
                          <td width="100%" style="min-width: 100%; width: 100%">
                            <div class="custom-control custom-radio">
                              <input
                                id="deliver"
                                v-model="contact.shipping"
                                type="radio"
                                name="shipping"
                                class="custom-control-input"
                                value="Deliver to my location"
                              />
                              <label
                                style="font-size: 1.4rem; font-weight: 450"
                                class="custom-control-label float-left text-dark"
                                for="deliver"
                                >Deliver to my location</label
                              >
                            </div>
                            <!-- End .custom-control -->
                          </td>
                        </tr>

                        <tr class="">
                          <td style="min-width: 100%; width: 100%">
                            <div class="custom-control custom-radio">
                              <input
                                id="collect_from_sheffield"
                                v-model="contact.shipping"
                                type="radio"
                                name="shipping"
                                class="custom-control-input"
                                value="Collect from Sheffield"
                              />
                              <label
                                style="font-size: 1.4rem; font-weight: 450"
                                class="custom-control-label float-left text-dark"
                                for="collect_from_sheffield"
                                >Collect from Sheffield
                              </label>
                            </div>
                            <div
                              v-if="validationErrors?.shipping"
                              class="text-danger text-left w-full flex"
                            >
                              <div
                                v-for="message in validationErrors?.shipping"
                                :key="message"
                              >
                                {{ message }}
                              </div>
                            </div>
                            <!-- End .custom-control -->
                          </td>
                        </tr>
                        <!-- End .summary-shipping-row -->

                        <tr class="summary-shipping">
                          <td colspan="2">
                            <h3 class="summary-title text-left mt-2">
                              Installation
                            </h3>
                          </td>
                        </tr>

                        <tr class="summary-shipping">
                          <td width="100%" style="min-width: 100%; width: 100%">
                            <div class="custom-control custom-radio">
                              <input
                                id="installation_yes"
                                v-model="contact.installation"
                                type="radio"
                                name="installation"
                                class="custom-control-input"
                                value="Yes"
                              />
                              <label
                                style="font-size: 1.4rem; font-weight: 450"
                                class="custom-control-label float-left text-dark"
                                for="installation_yes"
                                >Yes</label
                              >
                            </div>
                            <!-- End .custom-control -->
                          </td>
                        </tr>
                        <!-- End .summary-shipping-row -->

                        <tr class="">
                          <td class="min-w-full w-full">
                            <div class="custom-control custom-radio">
                              <input
                                id="installation_no"
                                v-model="contact.installation"
                                type="radio"
                                name="installation"
                                class="custom-control-input"
                                value="No"
                              />
                              <label
                                style="font-size: 1.4rem; font-weight: 450"
                                class="custom-control-label float-left text-dark"
                                for="installation_no"
                                >No</label
                              >
                            </div>
                            <div
                              v-if="validationErrors?.installation"
                              class="text-danger text-left w-full flex"
                            >
                              <div
                                v-for="message in validationErrors?.installation"
                                :key="message"
                              >
                                {{ message }}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- End .table table-summary -->

                    <button
                      type="submit"
                      :disabled="isLoading || !cartItems.length"
                      :class="[
                        !cartItems.length
                          ? 'hidden'
                          : 'btn btn-primary btn-block mt-2',
                      ]"
                    >
                      <div v-show="isLoading" class=""></div>
                      <span v-if="isLoading">Processing...</span>
                      <span v-else>SUBMIT</span>
                      <i class="icon-long-arrow-right"></i>
                    </button>
                  </div>
                  <!-- End .summary -->
                </aside>
                <!-- End .col-lg-3 -->
              </form>
            </div>
            <!-- End .row -->
          </div>
          <!-- End .container -->
        </div>
        <!-- End .cart -->
      </div>
      <!-- End .page-content -->
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ShoppingCartIcon } from "lucide-vue-next";
import { VueTelInput } from "vue-tel-input";
import { countries } from "countries-list";
import Multiselect from "vue-multiselect";

import "vue-tel-input/vue-tel-input.css";
import "vue-multiselect/dist/vue-multiselect.min.css";

const store = useCartStore();
const cartItems = store.cartItems;
const { executeRecaptcha } = useVueRecaptcha();
const { storeContact, isLoading, validationErrors, contact } =
  useRequestQuotes();

const countryOptions = computed(() =>
  Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
    flag: `https://flagcdn.com/w20/${code.toLowerCase()}.png`,
  }))
);

const removeFromCart = (index) => {
  store.dispatch("cart/removeFromCart", index);
};

const submitForm = async () => {
  try {
    const recaptchaToken = await executeRecaptcha("request_quote_form");
    contact.value.recaptchaToken = recaptchaToken;
    contact.value.cartItems = JSON.stringify(cartItems);
    contact.value.country = contact.value.country?.name || "";
    storeContact(contact.value);
  } catch (error) {
    console.error("Validation error:", error);
  }
};
</script>

<style scoped>
.my-header-image {
  margin-top: 0px !important;
  margin-bottom: -100px;
  width: 100%;
}

.label-contact {
  color: #666666;
  font-weight: 300;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 0.1rem;
  margin: 0 0 1.1rem;
}

.form-control {
  margin-bottom: 1rem;
}

.contact-form-div {
  background-color: #ffffff;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 30px;
  padding-right: 30px;
}

.my_form_contact_us {
  background-color: #cccccc;
  padding: 30px;
  /*border-radius: 30px;*/
}

.my_form_contact_us label {
  color: #666666;
}

.about-image-front {
  position: relative;
  z-index: 2;
  border: 15px solid #df2030;
  border-radius: 20px;
  margin-top: 5rem;
}

.contact-us-block {
  background-color: #304296;
  padding: 30px;
  border-radius: 30px;
}

.contact-list li {
  color: #ffffff;
}

.contact-info span {
  color: #ffffff;
}

.table.table-summary .summary-shipping td {
  padding-bottom: 0px;
  font-weight: 600;
}

.btn-remove:hover {
  color: red;
}

.request-quote-contact-div {
  background-color: #e9e9e9;
}

/* .the_main_div {
      margin-top: 0px !important;
  } */
</style>
