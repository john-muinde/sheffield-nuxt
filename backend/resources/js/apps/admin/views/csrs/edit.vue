<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">CSRs</a>
                </li>
                <li
                  class="breadcrumb-item active"
                  aria-current="page"
                >
                  <span>Edit CSR</span>
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
                  <h3><b>Edit CSR</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="post-name">CSR Name</label>
                    <input
                      id="post-name"
                      v-model="csr.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter CSR Name ..."
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

                  <div class="form-group">
                    <label for="csr_introduction">CSR Introduction</label>

                    <quill-editor
                      id="csr_introduction"
                      v-model:value="csr.csr_introduction"
                      :options="options1"
                      placeholder="Enter Short Description ..."
                    />
                  </div>

                  <div class="form-group">
                    <label for="post_description">Company company_involvement</label>

                    <quill-editor
                      v-model:value="
                        csr.company_involvement
                      "
                      :options="options1"
                      placeholder="Enter Description ..."
                    />
                  </div>

                  <div class="form-group">
                    <label for="post_description">Collaborations and
                      collaborations_and_partnerships</label>

                    <quill-editor
                      v-model:value="
                        csr.collaborations_and_partnership
                      "
                      :options="options1"
                      placeholder="Enter Technical Specification ..."
                    />
                  </div>

                  <div
                    class="custom-file-container"
                    data-upload-id="myFirstImage"
                  >
                    <label>Upload Main CSR Image
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label
                      class="custom-file-container__custom-file"
                      for="main_image"
                    >
                      <input
                        id="main_image"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        @change="
                          csr.main_image =
                            $event.target.files[0]
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

                  <div
                    class="custom-file-container"
                    data-upload-id="myCsrGallery"
                  >
                    <label>CSR Gallery (multiple images
                      allowed)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label
                      class="custom-file-container__custom-file"
                      for="csr_gallery"
                    >
                      <input
                        id="csr_gallery"
                        ref="csr_gallery"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        multiple
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
                    >
                      <div
                        v-for="item in csr.csr_images"
                        :key="item.id"
                        class="custom-file-container__image-multi-preview"
                        :style="
                          'background-image: url(/storage/' +
                            item.name +
                            ')'
                        "
                      >
                        <span
                          class="custom-file-container__image-multi-preview__single-image-clear"
                          @click="
                            deleteCsrImage(item.id)
                          "
                        >
                          <span
                            class="custom-file-container__image-multi-preview__single-image-clear__icon"
                            data-upload-token=""
                          >×</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label
                      for="is_published"
                      class="col-form-label"
                    >Publishing Status</label>
                    <div>
                      <select
                        id="is_published"
                        v-model="csr.is_published"
                        class="form-select"
                      >
                        <option value="">
                          Select Publishing Status ...
                        </option>
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
import { onMounted, reactive, watchEffect, ref } from 'vue';

import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'Edit CSR' });

import { useRoute } from 'vue-router';
import useCsrs from '@/composables/csrs';

import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';

import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';




import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
    name: 'required|min:3',
    csr_introduction: 'required',
    company_involvement: 'required',
    collaborations_and_partnership: 'required|min:3',
    is_published: 'required',
};

// Create a form context with the validation schema
const { validate, errors, resetForm } = useForm({ validationSchema: schema });
// Define actual fields for validation

const {
    csr: postData,
    getCsr,
    updateCsr,
    validationErrors,
    isLoading,
    getCsrList,
    csrList,
    deleteCsrImage,
} = useCsrs();

// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: csr_introduction } = useField('csr_introduction', null, {
    initialValue: '',
});
const { value: company_involvement } = useField('company_involvement', null, {
    initialValue: '',
});
const { value: collaborations_and_partnership } = useField(
    'collaborations_and_partnership',
    null,
    { initialValue: '' },
);
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const csr = reactive({
    name,
    csr_introduction,
    company_involvement,
    collaborations_and_partnership,
    is_published,
    main_image: '',
    csr_gallery: '',
});

const options1 = ref({
    modules: {
        //toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], ["image", "code-block"]],
    },
});

const route = useRoute();
function submitForm() {
    validate().then((form) => {
        if (form.valid) {
            const fileInput = document.getElementById('csr_gallery');
            const files = fileInput.files;

            if (files.length > 0) {
                updateCsr(csr, files);
            } else {
                updateCsr(csr, []);
            }
        }
    });
}

function deleteImage(imageId) {
    deleteCsrImage(imageId);
}

const initializeFileUpload = async () => {};

onMounted(() => {
    getCsr(route.params.id);

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
        } else {
            new FileUploadWithPreview('myFirstImage', {
                images: {
                    baseImage: '/assets/images/file-preview.png',
                    backgroundImage: '',
                },
            });
        }
    });

    new FileUploadWithPreview('myCsrGallery', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });
});
// https://vuejs.org/api/reactivity-core.html#watcheffect

watchEffect(() => {
    csr.id = postData.value.id;
    csr.name = postData.value.name;
    csr.csr_introduction = postData.value.csr_introduction;
    csr.company_involvement = postData.value.company_involvement;
    csr.collaborations_and_partnership =
        postData.value.collaborations_and_partnership;
    csr.is_published = postData.value.is_published;

    //csr_images

    csr.csr_images = postData.value.csr_images;


});
</script>
<style>
.ql-container {
    min-height: 250px !important;
    height: 300px !important;
}

.custom-file-container__image-multi-preview {
    height: 200px !important;
}
</style>
