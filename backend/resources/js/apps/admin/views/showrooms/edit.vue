<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Showrooms</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Edit Showroom</span>
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
                <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                  <h3><b>Edit Showroom</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="post-name">Showroom Name</label>
                  <input
                    id="post-name"
                    v-model="showroom.name"
                    type="text"
                    class="form-control"
                    placeholder="Enter Showroom Name ..."
                  />

                  <div class="text-danger mt-1">
                    {{ errors.name }}
                  </div>
                  <div class="text-danger mt-1">
                    <div v-for="message in validationErrors?.name">
                      {{ message }}
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="post_description">Description</label>
                  <textarea
                    id="post_description"
                    v-model="showroom.description"
                    class="form-control"
                    placeholder="Enter Description ..."
                  ></textarea>

                  <div class="text-danger mt-1">
                    {{ errors.description }}
                  </div>
                  <div class="text-danger mt-1">
                    <div v-for="message in validationErrors?.description">
                      {{ message }}
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div
                    class="custom-file-container"
                    data-upload-id="myFirstImage"
                  >
                    {{ showroom.showroom_image }}
                    <label>Upload Showroom Logo
                      <a
                        id="showroom_image"
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label class="custom-file-container__custom-file">
                      <input
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        @change="showroom.main_image = $event.target.files[0]"
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
                    <div class="custom-file-container__image-preview"></div>
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
                      v-model="showroom.is_published"
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
                    <div v-for="message in validationErrors?.is_published">
                      {{ message }}
                    </div>
                  </div>
                </div>

                <button :disabled="isLoading" class="btn btn-primary mt-3">
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

import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'Edit Showroom' });

import { useRoute } from 'vue-router';
import useShowrooms from '@/composables/showrooms';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';
import FileUploadWithPreview from 'file-upload-with-preview';
import '../../assets/sass/forms/file-upload-with-preview.min.css';




defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
  name: 'required|min:3',
  description: 'required|min:3',
  is_published: 'required',
};

// Create a form context with the validation schema
const { validate, errors, resetForm } = useForm({ validationSchema: schema });
// Define actual fields for validation

const {
  showroom: postData,
  getShowroom,
  updateShowroom,
  validationErrors,
  isLoading,
  getShowroomList,
  showroomList,
} = useShowrooms();

const { value: name } = useField('name', null, { initialValue: '' });
const { value: description } = useField('description', null, {
  initialValue: '',
});
const { value: is_published } = useField('is_published', null, {
  initialValue: '',
});

const showroom = reactive({
  name,
  description,
  is_published,
});
const route = useRoute();
function submitForm() {
  validate().then((form) => {
    if (form.valid) {
      updateShowroom(showroom);
    }
  });
}
onMounted(() => {
  getShowroom(route.params.id);
  getShowroomList();

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
  showroom.id = postData.value.id;
  showroom.name = postData.value.name;
  showroom.description = postData.value.description;
  showroom.is_published = postData.value.is_published;


});
</script>
