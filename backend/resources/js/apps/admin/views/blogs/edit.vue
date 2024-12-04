<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Blogs</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Edit Blog</span>
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
                  <h3><b>Edit Blog</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="post-name">Blog Name</label>
                    <input
                      id="post-name"
                      v-model="blog.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Blog Name ..."
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
                    <label for="post-category" class="form-label">Select Blog Category</label>

                    <multiselect
                      v-model="blog.categories"
                      :options="blogCategoryList"
                      :reduce="(category) => category.id"
                      :multiple="true"
                      :taggable="true"
                      :searchable="true"
                      :preselect-first="true"
                      track-by="id"
                      label="name"
                      placeholder="Choose Blog Category ..."
                      selected-label=""
                      select-label=""
                      deselect-label=""
                    />

                    <div class="text-danger mt-1">
                      {{ errors.categories }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.categories">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="post-content">Blog Content</label>

                    <quill-editor
                      v-model:value="blog.content"
                      :options="options1"
                      placeholder="Enter Blog Content ..."
                    />
                  </div>

                  <div class="custom-file-container" data-upload-id="myFirstImage">
                    <label>Upload Main Blog Image
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="main_image">
                      <input
                        id="main_image"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        @change="
                          blog.main_image =
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

                  <div class="custom-file-container" data-upload-id="myBlogGallery">
                    <label>Blog Gallery (multiple images
                      allowed)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="blog_gallery">
                      <input
                        id="blog_gallery"
                        ref="blog_gallery"
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
                        v-for="item in blog.blog_images"
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
                            deleteBlogImage(item.id)
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
                      <select id="is_published" v-model="blog.is_published" class="form-select">
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
useMeta({ title: 'Edit Blog' });

import { useRoute } from 'vue-router';
import useBlogs from '@/composables/blogs';
import useBlogCategories from '@/composables/blogCategories';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';

import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';

import Multiselect from 'vue-multiselect';

import 'vue-multiselect/dist/vue-multiselect.min.css';

import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
    name: 'required|min:3',
    content: 'required',
    is_published: 'required',
};

// Create a form context with the validation schema
const { validate, errors, resetForm } = useForm({ validationSchema: schema });
// Define actual fields for validation

const {
    blog: postData,
    getBlog,
    updateBlog,
    validationErrors,
    isLoading,
    getBlogList,
    blogList,
    deleteBlogImage,
} = useBlogs();
const { getBlogCategoryList, blogCategoryList } = useBlogCategories();

// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: content } = useField('content', null, {
    initialValue: '',
});
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const blog = reactive({
    name,
    content,
    categories: '',
    is_published,
    main_image: '',
    blog_gallery: '',
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

            const fileInput = document.getElementById('blog_gallery');
            const files = fileInput.files;

            if (files.length > 0) {
                updateBlog(blog, files);
            } else {
                updateBlog(blog, []);
            }
        }
    });
}

function deleteImage(imageId) {
    deleteBlogImage(imageId);
}

const initializeFileUpload = async () => { };

onMounted(() => {
    getBlogCategoryList();
    getBlog(route.params.id);

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


    new FileUploadWithPreview('myBlogGallery', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });
});
// https://vuejs.org/api/reactivity-core.html#watcheffect

watchEffect(() => {
    blog.id = postData.value.id;
    blog.name = postData.value.name;
    blog.content = postData.value.content;
    blog.categories = postData.value.categories_json;
    blog.is_published = postData.value.is_published;

    //blog_images

    blog.blog_images = postData.value.blog_images;

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
