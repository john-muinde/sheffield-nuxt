<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Testimonials</a>
                </li>
                <li
                  class="breadcrumb-item active"
                  aria-current="page"
                >
                  <span>Edit Testimonial</span>
                </li>
              </ol>
            </nav>
          </div>
        </li>
      </ul>
    </teleport>

    <div class="container">
      <div class="row">
        <div id="" class="col-lg-12 layout-spacing layout-top-spacing">
          <div class="statbox panel box box-shadow">
            <div class="panel-heading pb-0">
              <div class="row">
                <div
                  class="col-xl-12 col-md-12 col-sm-12 col-12"
                >
                  <h3><b>Edit Testimonial</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-name">Company Name</label>
                    <input
                      id="post-name"
                      v-model="testimonial.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Testimonial Name ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.name }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.name"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="post-website">Company Website</label>
                    <input
                      id="post-website"
                      v-model="testimonial.website"
                      type="text"
                      class="form-control"
                      placeholder="Enter Company Website ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.website }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.website"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-person">Contact Person Name</label>
                    <input
                      id="post-person"
                      v-model="testimonial.person"
                      type="text"
                      class="form-control"
                      placeholder="Enter Contact Person Name ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.person }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.person"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="post-email">Contact Person Email</label>
                    <input
                      id="post-email"
                      v-model="testimonial.email"
                      type="text"
                      class="form-control"
                      placeholder="Enter Contact Person Email ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.email }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.email"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="post_description">Description</label>

                  <quill-editor
                    v-model:value="testimonial.description"
                    :options="options1"
                    placeholder="Enter Description..."
                  />
                </div>

                <div class="form-group">
                  <div
                    class="custom-file-container"
                    data-upload-id="myFirstImage"
                  >
                    <label>Upload Company Logo
                      <a
                        id="testimonial_image"
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label
                      class="custom-file-container__custom-file"
                    >
                      <input
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        @change="
                          testimonial.main_image =
                            $testimonial.target.files[0]
                        "
                      />
                      <input
                        type="hidden"
                        name="MAX_FILE_SIZE"
                        value="10485760"
                      />
                      <span
                        class="custom-file-container__custom-file__custom-file-control"
                      ></span>
                    </label>
                    <div
                      class="custom-file-container__image-preview"
                    ></div>
                  </div>
                </div>

                <div class="form-group">
                  <label
                    for="is_published"
                    class="col-form-label"
                  >Publishing Status</label>
                  <div>
                    <select
                      id="is_published"
                      v-model="testimonial.is_published"
                      class="form-select"
                    >
                      <option selected value="1">
                        Published
                      </option>
                      <option value="0">
                        Not Published
                      </option>
                    </select>
                  </div>

                  <div class="text-danger mt-1">
                    {{ errors.is_published }}
                  </div>
                  <div class="text-danger mt-1">
                    <div
                      v-for="message in validationErrors?.is_published"
                    >
                      {{ message }}
                    </div>
                  </div>
                </div>

                <button
                  :disabled="isLoading"
                  class="btn btn-primary mt-3"
                >
                  <div v-show="isLoading" class=""></div>
                  <span v-if="isLoading">Processing...</span>
                  <span v-else>Update</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, watchEffect } from 'vue';

import { useRoute } from 'vue-router';
import useTestimonials from '@/composables/testimonials';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';
import FileUploadWithPreview from 'file-upload-with-preview';
import '../../assets/sass/forms/file-upload-with-preview.min.css';

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import '../../assets/sass/forms/custom-flatpickr.css';



import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'Edit Testimonial' });

defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
    name: 'required|min:3',
    website: 'required|min:3',
    person: 'required',
    email: 'required',
    description: 'required|min:3',
    is_published: 'required',
};

// Create a form context with the validation schema
const { validate, errors, resetForm } = useForm({ validationSchema: schema });
// Define actual fields for validation

const {
    testimonial: postData,
    getTestimonial,
    updateTestimonial,
    validationErrors,
    isLoading,
    getTestimonialList,
} = useTestimonials();

const { value: name } = useField('name', null, { initialValue: '' });
const { value: website } = useField('website', null, { initialValue: '' });
const { value: person } = useField('person', null, {
    initialValue: new Date(),
});
const { value: email } = useField('email', null, {
    initialValue: new Date(),
});
const { value: description } = useField('description', null, {
    initialValue: '',
});
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const testimonial = reactive({
    name,
    website,
    person,
    email,
    description,
    is_published,
});
const route = useRoute();
function submitForm() {
    validate().then((form) => {

        if (form.valid) {
            updateTestimonial(testimonial);
        }
    });
}
onMounted(() => {
    getTestimonial(route.params.id);
    getTestimonialList();

    watchEffect(() => {
        if (postData.value && postData.value.main_image_path) {
            const mainImagePath = postData.value.main_image_path;

            // Define the variable
            const mainImage = '/storage/' + mainImagePath;

            // Create the configuration object with the variable value
            const fileUploadConfig = {
                images: {
                    baseImage: mainImage,
                    backgroundImage: '',
                },
            };

            // Pass the configuration object to FileUploadWithPreview
            new FileUploadWithPreview('myFirstImage', fileUploadConfig);
        }
    });
});
// https://vuejs.org/api/reactivity-core.html#watcheffect

watchEffect(() => {
    testimonial.id = postData.value.id;
    testimonial.name = postData.value.name;
    testimonial.website = postData.value.website;
    testimonial.person = postData.value.person;
    testimonial.email = postData.value.email;
    testimonial.description = postData.value.description;
    testimonial.is_published = postData.value.is_published;


});
</script>
