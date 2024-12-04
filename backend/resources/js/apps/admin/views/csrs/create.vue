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
                  <span>Create CSR</span>
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
                  <h3><b>Create CSR</b></h3>
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
                      v-model:value="
                        csr.csr_introduction
                      "
                      :options="options1"
                      placeholder="Enter Short Description ..."
                    />
                  </div>

                  <div class="form-group">
                    <label for="post_company_involvement">Company Involvement</label>

                    <quill-editor
                      v-model:value="csr.company_involvement"
                      :options="options1"
                      placeholder="Enter Company Involvement ..."
                    />
                  </div>

                  <div class="form-group">
                    <label for="post_collaborations_and_partnership">Collaborations & Partnerships</label>

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
                    ></div>
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
                  <span v-else>Save</span>
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
import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'Create CSR' });

import '../../assets/sass/scrollspyNav.scss';
import highlight from '../../components/plugins/highlight.vue';

import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';




import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

import { reactive, onMounted, ref } from 'vue';
import useCsrs from '@/composables/csrs';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';

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
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: csr_introduction } = useField('csr_introduction', null, { initialValue: '' });
const { value: company_involvement } = useField('company_involvement', null, {
    initialValue: '',
});
const { value: collaborations_and_partnership } = useField('collaborations_and_partnership', null, { initialValue: '' });
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const {
    storeCsr,
    validationErrors,
    isLoading,
    getCsrList,
    csrList,
} = useCsrs();

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

function submitForm() {
    validate().then((form) => {
        if (form.valid) {
            const fileInput = document.getElementById('csr_gallery');
            const files = fileInput.files;
            storeCsr(csr, files);
        }
    });
}

onMounted(() => {

    //single file upload
    new FileUploadWithPreview('myFirstImage', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });

    new FileUploadWithPreview('myCsrGallery', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });
});

//
//

//
//
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
