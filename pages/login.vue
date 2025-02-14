<template>
  <div class="page-wrapper">
    <main class="main">
      <div
        class="login-page bg-image pt-8 pb-8 pt-md-5 pb-md-5 pt-lg-6 pb-lg-6"
        style="background-image: url('/assets/images/login-background.jpg')"
      >
        <div class="container">
          <div class="form-box">
            <div class="form-tab">
              <ul class="nav nav-pills nav-fill" role="tablist">
                <li class="nav-item">
                  <a
                    id="signin-tab-2"
                    class="nav-link active"
                    data-toggle="tab"
                    href="#signin-2"
                    role="tab"
                    aria-controls="signin-2"
                    aria-selected="false"
                    >Log In</a
                  >
                </li>
                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/register">
                    Register
                  </NuxtLink>
                </li>
              </ul>
              <div class="tab-content">
                <div
                  id="signin-2"
                  class="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="signin-tab-2"
                >
                  <form @submit.prevent="() => submitLogin(true)">
                    <div class="form-group">
                      <label for="signin-email-2">Email address *</label>
                      <input
                        id="signin-email-2"
                        v-model="loginForm.email"
                        type="email"
                        class="form-control"
                        required
                        autofocus
                        autocomplete="username"
                      />
                    </div>
                    <!-- End .form-group -->

                    <div class="form-group">
                      <label for="signin-password-2">Password *</label>
                      <input
                        id="signin-password-2"
                        v-model="loginForm.password"
                        type="password"
                        class="form-control"
                        required
                        autocomplete="current-password"
                      />
                    </div>
                    <!-- End .form-group -->

                    <div class="form-footer">
                      <button type="submit" class="btn btn-outline-primary-2">
                        <span>LOG IN</span>
                        <span
                          v-if="processing"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        <i class="icon-long-arrow-right"></i>
                      </button>

                      <div class="custom-control custom-checkbox">
                        <input
                          id="signin-remember-2"
                          type="checkbox"
                          class="custom-control-input"
                        />
                        <label
                          class="custom-control-label"
                          for="signin-remember-2"
                          >Remember Me</label
                        >
                      </div>
                      <!-- End .custom-checkbox -->

                      <a href="#" class="forgot-link">Forgot Your Password?</a>
                    </div>
                    <!-- End .form-footer -->
                  </form>
                </div>
                <!-- .End .tab-pane -->
              </div>
              <!-- End .tab-content -->
            </div>
            <!-- End .form-tab -->
          </div>
          <!-- End .form-box -->
        </div>
        <!-- End .container -->
      </div>
      <!-- End .login-page section-bg -->
    </main>
    <!-- End .main -->
  </div>
</template>

<script setup lang="ts">
const { loginForm, validationErrors, processing, submitLogin } = useAuth();
</script>
