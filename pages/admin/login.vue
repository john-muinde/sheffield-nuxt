<template>
  <div class="form full-form auth-cover">
    <div class="form-container">
      <div class="form-form">
        <div class="form-form-wrap">
          <div class="form-container">
            <div class="form-content">
              <h1 class="">
                Log in<router-link to="/admin/login">
                  <span class="brand-name"></span>
                </router-link>
              </h1>

              <form class="text-start" @submit.prevent="submitLoginAdmin">
                <div class="form">
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
                      v-model="loginForm.email"
                      type="email"
                      class="form-control"
                      required
                      autofocus
                      autocomplete="email"
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
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      id="singin-password-2"
                      v-model="loginForm.password"
                      type="password"
                      class="form-control"
                      required
                      autocomplete="current-password"
                    />
                    <div v-if="validationErrors.password" class="text-danger">
                      {{ validationErrors.password[0] }}
                    </div>
                  </div>
                  <div class="d-sm-flex justify-content-between">
                    <div
                      class="field-wrapper toggle-pass d-flex align-items-center"
                    >
                      <p class="d-inline-block">Show Password</p>
                      <label class="switch s-primary mx-2">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          checked=""
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="field-wrapper">
                      <button type="submit" class="btn btn-primary">
                        <span v-if="processing">Processing...</span>
                        <span v-else>Log in</span>
                      </button>
                    </div>
                  </div>

                  <div class="field-wrapper text-center keep-logged-in">
                    <div
                      class="checkbox-outline-primary custom-control custom-checkbox"
                    >
                      <input
                        id="chkRemember"
                        type="checkbox"
                        class="custom-control-input"
                        value="true"
                      />
                      <label class="custom-control-label" for="chkRemember"
                        >Keep me logged in</label
                      >
                    </div>
                  </div>

                  <div class="field-wrapper">
                    <router-link
                      to="/admin/pass-recovery"
                      class="forgot-pass-link"
                    >
                      Forgot Password?
                    </router-link>
                  </div>
                </div>
              </form>
              <p class="terms-conditions">
                © {{ year }} All Rights Reserved.
                <router-link to="/"> Sheffield Africa </router-link>. <br /><a
                  href="javascript:void(0);"
                  >Cookie Preferences</a
                >, <a href="javascript:void(0);">Privacy</a>, and
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
import "~/assets/admin/sass/authentication/auth.scss";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Admin Login",
  meta: [
    {
      name: "description",
      content: "Admin login page",
    },
  ],
});

const { loginForm, validationErrors, processing, submitLoginAdmin } = useAuth();

const year = new Date().getFullYear();
</script>
