<template>
  <div class="page-wrapper">
    <main class="main">
      <!-- <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
                <div class="container">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Pages</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Login</li>
                    </ol>
                </div>
            </nav> -->



      <div class="login-page bg-image pt-8 pb-8 pt-md-5 pb-md-5 pt-lg-6 pb-lg-6" style="background-image: url('/assets/images/login-background.jpg')">
        <div class="container">
          <div class="form-box">
            <div class="form-tab">
              <ul class="nav nav-pills nav-fill" role="tablist">
                <li class="nav-item">
                  <!-- <a class="nav-link" id="signin-tab-2" data-toggle="tab" href="#signin-2" role="tab" aria-controls="signin-2" aria-selected="false">Sign In</a> -->
                  <router-link class="nav-link" to="/login">
                    Log in
                  </router-link>
                </li>
                <li class="nav-item">
                  <a
                    id="register-tab-2"
                    class="nav-link active"
                    data-toggle="tab"
                    href="#register-2"
                    role="tab"
                    aria-controls="register-2"
                    aria-selected="true"
                  >Register</a>
                </li>
              </ul>
              <div class="tab-content">
                <div
                  id="register-2"
                  class="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="register-tab-2"
                >
                  <form action="#">
                    <div class="form-group">
                      <label for="register-email-2">Your email address *</label>
                      <input
                        id="register-email-2"
                        type="email"
                        class="form-control"
                        name="register-email"
                        required=""
                      />
                    </div><!-- End .form-group -->

                    <div class="form-group">
                      <label for="register-password-2">Password *</label>
                      <input
                        id="register-password-2"
                        type="password"
                        class="form-control"
                        name="register-password"
                        required=""
                      />
                    </div><!-- End .form-group -->

                    <div class="form-footer">
                      <button type="submit" class="btn btn-outline-primary-2">
                        <span>SIGN UP</span>
                        <i class="icon-long-arrow-right"></i>
                      </button>

                      <div class="custom-control custom-checkbox">
                        <input
                          id="register-policy-2"
                          type="checkbox"
                          class="custom-control-input"
                          required=""
                        />
                        <label class="custom-control-label" for="register-policy-2">I agree to the <a href="#">privacy policy</a> *</label>
                      </div><!-- End .custom-checkbox -->
                    </div><!-- End .form-footer -->
                  </form>
                  <!-- <div class="form-choice">
								    	<p class="text-center">or sign in with</p>
								    	<div class="row">
								    		<div class="col-sm-6">
								    			<a href="#" class="btn btn-login btn-g">
								    				<i class="icon-google"></i>
								    				Login With Google
								    			</a>
								    		</div>
								    		<div class="col-sm-6">
								    			<a href="#" class="btn btn-login  btn-f">
								    				<i class="icon-facebook-f"></i>
								    				Login With Facebook
								    			</a>
								    		</div>
								    	</div>
							    	</div> -->
                </div><!-- .End .tab-pane -->
              </div><!-- End .tab-content -->
            </div><!-- End .form-tab -->
          </div><!-- End .form-box -->
        </div><!-- End .container -->
      </div><!-- End .login-page section-bg -->
    </main><!-- End .main -->
  </div>
</template>

<script setup>

import useAuth from '@/composables/auth';

const { loginForm, validationErrors, processing, submitLogin } = useAuth();

</script>