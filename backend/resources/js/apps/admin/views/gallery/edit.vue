<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Galleries</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Edit Gallery</span>
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
                  <h3><b>Edit Gallery</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="post-name">Gallery Name</label>
                    <input
                      id="post-name"
                      v-model="gallery.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Gallery Name ..."
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

                  <div class="form-group col-md-12">
                    <label for="gallery_type" class="col-form-label">Gallery Type </label>
                    <div>
                      <select
                        id="gallery_type"
                        v-model="gallery.gallery_type"
                        class="form-select"
                        required
                      >
                        <option value="">
                          Select Gallery Type ...
                        </option>
                        <option value="CSR">
                          CSR
                        </option>
                        <option value="EVENT">
                          EVENT
                        </option>

                        <option value="PROJECT">
                          PROJECT
                        </option>
                      </select>
                    </div>

                    <div class="text-danger mt-1">
                      {{ errors.gallery_type }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.gallery_type">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="gallery_introduction">Gallery Introduction</label>

                    <quill-editor
                      id="gallery_introduction"
                      v-model:value="gallery.gallery_introduction
                      "
                      :options="options1"
                      placeholder="Enter Short Description ..."
                    />
                  </div>

                  <div class="custom-file-container" data-upload-id="myFirstImage">
                    <label>Upload Main Gallery Image
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="main_image_path">
                      <input
                        id="main_image_path"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        @change="
                          gallery.main_image_path =
                            $event.target.files[0]
                        "
                      />
                      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                      <span
                        class="custom-file-container__custom-file__custom-file-control"
                      ></span>
                    </label>
                    <div class="custom-file-container__image-preview"></div>
                  </div>

                  <div class="custom-file-container" data-upload-id="myGallery">
                    <label>Gallery Gallery (multiple images
                      allowed)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="gallery_gallery">
                      <input
                        id="gallery_gallery"
                        ref="gallery_gallery"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        multiple
                      />
                      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                      <span
                        class="custom-file-container__custom-file__custom-file-control"
                      ></span>
                    </label>
                    <div class="custom-file-container__image-preview">
                      <div
                        v-for="item in gallery.gallery_images"
                        :key="item.id"
                        class="custom-file-container__image-multi-preview"
                        :style="'background-image: url(/storage/' +
                          item.name +
                          ')'
                        "
                      >
                        <span
                          class="custom-file-container__image-multi-preview__single-image-clear"
                          @click="
                            deleteGalleryImage(
                              item.id
                            )
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
                    <label for="is_published" class="col-form-label">Publishing Status</label>
                    <div>
                      <select
                        id="is_published"
                        v-model="gallery.is_published"
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
                      <div v-for="message in validationErrors?.is_published">
                        {{ message }}
                      </div>
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
import { onMounted, reactive, watchEffect, ref } from 'vue';

import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'Edit Gallery' });

import { useRoute } from 'vue-router';
import useGalleries from '@/composables/galleries';

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
    gallery_type: 'required',
    is_published: 'required',
};

// Create a form context with the validation schema
const { validate, errors, resetForm } = useForm({ validationSchema: schema });
// Define actual fields for validation

const {
    gallery: postData,
    getGallery,
    updateGallery,
    validationErrors,
    isLoading,
    getGalleryList,
    galleryList,
    deleteGalleryImage,
} = useGalleries();

// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: gallery_introduction } = useField('gallery_introduction', null, {
    initialValue: '',
});
const { value: gallery_type } = useField('gallery_type', null, {
    initialValue: '',
});

const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const gallery = reactive({
    name,
    gallery_introduction,
    is_published,
    gallery_type,
    main_image_path: '',
    gallery_gallery: '',
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
            const fileInput = document.getElementById('gallery_gallery');
            const files = fileInput.files;

            if (files.length > 0) {
                updateGallery(gallery, files);
            } else {
                updateGallery(gallery, []);
            }
        }
    });
}

function deleteImage(imageId) {
    deleteGalleryImage(imageId);
}

const initializeFileUpload = async () => { };

onMounted(() => {
    getGallery(route.params.id);

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

    new FileUploadWithPreview('myGallery', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });
});
// https://vuejs.org/api/reactivity-core.html#watcheffect

watchEffect(() => {
    gallery.id = postData.value.id;
    gallery.name = postData.value.name;
    gallery.gallery_introduction = postData.value.gallery_introduction;
    gallery.gallery_type = postData.value.gallery_type;

    gallery.is_published = postData.value.is_published;

    //gallery_images

    gallery.gallery_images = postData.value.gallery_images;


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
