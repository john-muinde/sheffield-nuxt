<template>
  <div class="page-wrapper">
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">
                Home
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <a href="#">Enquire Product</a>
            </li>
          </ol>
        </div>
      </nav>

      <div class="page-content pb-0">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <h3 class="header text-primary" style="">
                Enquire about this product
              </h3>
              <p class="mb-2">
                Learn more about this product <b>`{{ product.name }}`</b>
              </p>

              <form action="#" method="POST" class="contact-form mb-3">
                <div class="row">
                  <div class="col-sm-6">
                    <input v-model="enquiry.product_id" type="hidden" name="product_id" />
                    <label for="cname" class="sr-only">Name</label>
                    <input
                      id="name"
                      v-model="enquiry.name"
                      type="text"
                      class="form-control"
                      name="Form[name]"
                      placeholder="Enter your name *"
                      required
                    />
                  </div><!-- End .col-sm-6 -->

                  <div class="col-sm-6">
                    <label for="cemail" class="sr-only">Email</label>
                    <input
                      id="email"
                      v-model="enquiry.email"
                      type="email"
                      class="form-control"
                      name="Form[email]"
                      placeholder="Enter your email *"
                      required
                    />
                  </div><!-- End .col-sm-6 -->
                </div><!-- End .row -->

                <div class="row">
                  <div class="col-sm-6">
                    <label for="cphone" class="sr-only">Phone</label>
                    <input
                      id="phone"
                      v-model="enquiry.phone"
                      type="tel"
                      class="form-control"
                      name="Form[phone]"
                      placeholder="Enter your phone"
                    />
                  </div><!-- End .col-sm-6 -->

                  <div class="col-sm-6">
                    <label for="csubject" class="sr-only">Company</label>
                    <input
                      id="company"
                      v-model="enquiry.company"
                      type="text"
                      class="form-control"
                      name="Form[company]"
                      placeholder="Enter your company"
                    />
                  </div><!-- End .col-sm-6 -->
                </div><!-- End .row -->

                <label for="cmessage" class="sr-only">Your Query</label>
                <textarea
                  id="query"
                  v-model="enquiry.query"
                  class="form-control"
                  cols="30"
                  rows="4"
                  required
                  placeholder="Write your query here *"
                  name="Form[query]"
                ></textarea>
 

                <button type="button" class="btn btn-outline-primary-2 btn-minwidth-sm" @click="submitForm">
                  <span>Send your enquiry</span>
                  <i class="icon-long-arrow-right"></i>
                </button>
              </form><!-- End .contact-form -->
            </div><!-- End .col-lg-6 -->

            <div class="col-lg-4 mb-2 mb-lg-0">
              <h2 class="title mb-1 text">
                Product Information
              </h2><!-- End .title mb-2 -->
              <img :src="'/storage/' + product.main_image_path" style="width:80%" />
              <h5 class="header text-primary">
                {{ product.name }}
              </h5>
              <div class="short_description" v-html="product.short_description"></div>
            </div><!-- End .col-lg-6 -->
          </div><!-- End .row -->
        </div>
      </div>
    </main><!-- End .main -->
  </div>
</template>

<script setup>

	import { reactive, ref, computed, watch, onMounted, watchEffect } from 'vue';
  	import { useRoute } from 'vue-router';

  	import { useMeta } from '../../admin/composables/use-meta';
  	import { useForm, useField, defineRule } from 'vee-validate';
  	import { required, min } from '@/validation/rules';

  	defineRule('required', required);
	defineRule('min', min);

	// Define a validation schema
	const schema = {
	    name: 'required|min:3',
	    email: 'required',
	    phone: 'required',
	    company: 'required',
	    query: 'required',
	};

	const { validate, errors } = useForm({ validationSchema: schema });

	const route = useRoute();
	const currentRoute = ref(route);

	const product = ref([]);
    const product_id = ref(route.params.id ? parseInt(route.params.id) : 1);
	
	const { value: name } = useField('name', null, { initialValue: '' });
	const { value: email } = useField('email', null, { initialValue: '' });
	const { value: phone } = useField('phone', null, { initialValue: '' });
	const { value: company } = useField('company', null, { initialValue: '' });
	const { value: query } = useField('query', null, { initialValue: '' });

	const enquiry = reactive({
		product_id,
	    name,
	    email,
	    phone,
	    company,
	    query,
	});


  	useMeta({ title: 'Enquire Product' });
  

	

    const submitForm = async () => {
     
      // const recaptchaToken = await VueReCaptcha.getToken();
      // if (!recaptchaToken) {

      //   return;
      // }else{


      // }

      axios
      .post('/api/product-enquiry', enquiry)
      .then((response) => {
      	
        // Reset the form values
        //enquiry.product_id = null;
        enquiry.name = null;
        enquiry.email = null;
        enquiry.phone = null;
        enquiry.company = null;
        enquiry.query = null;

        swal({
          icon: 'success',
          title: 'Sent query successfully',
        });

        router.push({ name: 'frontend.enquiry.product' });
      })
      .catch((error) => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors;
        }
      });



      
    };

	const fetchProduct = async () => {

	    try {
	      const response = await axios.get('/api/get-product', {
	        params: {
	          product_id: product_id.value,
	        },
	      });
	      product.value = response.data.data;

	      

	    } catch (error) {
	      console.error(error);
	    }
	};

	const getProductLink = (id, name, model_number) => {
	    // Replace spaces with dashes
	    let transformedName = name.replace(/ /g, '-');
	    // Remove consecutive dashes
	    transformedName = transformedName.replace(/-+/g, '-');
	    // Remove leading and trailing dashes
	    transformedName = transformedName.replace(/^-+|-+$/g, '');
	    // Convert to lowercase
	    transformedName = transformedName.toLowerCase();

	    let transformedModelNumber = model_number.toLowerCase();

	    return `/product/${id}/${transformedName}-${transformedModelNumber}`;
	};

	onMounted(() => {
	    fetchProduct();

	});



</script>