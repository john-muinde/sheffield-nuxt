<template>
  <div class="form full-form auth-cover">
    <div class="form-container">
      <div class="form-form">
        <div class="form-form-wrap">
          <div class="form-container">
            <div class="form-content">
              <h1 class="">
                Get started with a <br />
                free account
              </h1>
              <p class="signup-link">
                Already have an account? <router-link to="/admin/login">
                  Log
                  in
                </router-link>
              </p>
              <form class="text-start" @submit.prevent="submitRegisterAdmin">
                <div class="form">
                  <div id="name-field" class="field-wrapper input">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      v-model="registerForm.name"
                      type="text"
                      class="form-control"
                      required
                      autofocus
                      autocomplete="username"
                      placeholder="Your Name"
                    />
                    <div v-if="validationErrors.name" class="text-danger">
                      {{ validationErrors.name[0] }}
                    </div>
                  </div>
                  <div id="email-field" class="field-wrapper input">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="singin-email-2"
                      v-model="registerForm.email"
                      type="email"
                      class="form-control"
                      required
                      autofocus
                      autocomplete="email"
                      placeholder="Email"
                    />
                    <div v-if="validationErrors.email" class="text-danger">
                      {{ validationErrors.email[0] }}
                    </div>
                  </div>

                  <div id="password-field" class="field-wrapper input mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-lock"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      id="singin-password-2"
                      v-model="registerForm.password"
                      type="password"
                      class="form-control"
                      required
                      autocomplete="confirm-password"
                      placeholder="Password"
                    />
                    <div v-if="validationErrors.password" class="text-danger">
                      {{ validationErrors.password[0] }}
                    </div>
                  </div>

                  <!-- confirm password -->
                  <div id="password-field" class="field-wrapper input mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-lock"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      v-model="registerForm.password_confirmation"
                      type="password"
                      class="form-control"
                      required
                      autocomplete="current-password"
                      placeholder="Confirm Password"
                    />
                    <div v-if="validationErrors.password_confirmation" class="text-danger">
                      {{ validationErrors.password_confirmation[0] }}
                    </div>
                  </div>

                  <div class="field-wrapper terms_condition">
                    <div class="checkbox-outline-primary custom-control custom-checkbox">
                      <input
                        id="chkTerms"
                        type="checkbox"
                        class="custom-control-input"
                        value="true"
                      />
                      <label class="custom-control-label" for="chkTerms">I agree to the <a
                        href="javascript:void(0);"
                      > terms and conditions </a></label>
                    </div>
                  </div>
                  <div class="d-sm-flex justify-content-between">
                    <div class="field-wrapper toggle-pass d-flex align-items-center">
                      <p class="d-inline-block">
                        Show Password
                      </p>
                      <label class="switch s-primary mx-2">
                        <input type="checkbox" class="custom-control-input" checked="" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="field-wrapper">
                      <button type="submit" class="btn btn-primary">
                        Get Started!
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p class="terms-conditions">
                © 2020 All Rights Reserved. <router-link to="/">
                  CORK
                </router-link> is a product of
                Arrangic Solutions LLP. <a href="javascript:void(0);">Cookie Preferences</a>, <a
                  href="javascript:void(0);"
                >Privacy</a>, and
                <a href="javascript:void(0);">Terms</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-image">
        <div class="l-image"></div>
      </div>
    </div>
  </div>
</template>


<script setup>
import '../../assets/sass/authentication/auth.scss';

import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'Register Cover' });

import useAuth from '@/composables/auth';

const { registerForm, validationErrors, processing, submitRegisterAdmin } = useAuth();

const year = new Date().getFullYear();

const getCsrfToken = async () => {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.content : null;
};
</script>

