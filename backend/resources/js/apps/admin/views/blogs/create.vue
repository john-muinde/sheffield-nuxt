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
                  <span>Create Blog</span>
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
                  <h3><b>Create Blog</b></h3>
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
                    <div class="custom-file-container__image-preview"></div>
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
useMeta({ title: 'Create Blog' });

import '../../assets/sass/scrollspyNav.scss';
import highlight from '../../components/plugins/highlight.vue';

import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';

import Multiselect from 'vue-multiselect';

import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

import { reactive, onMounted, ref } from 'vue';
import useBlogs from '@/composables/blogs';
import useBlogCategories from '@/composables/blogCategories';
import useBrands from '@/composables/brands';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';

defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
    name: 'required|min:3',
    content: 'required',
    is_published: 'required',
};

// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: content } = useField('content', null, {
    initialValue: '',
});
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const {
    storeBlog,
    validationErrors,
    isLoading,
    getBlogList,
    blogList,
} = useBlogs();
const { getBlogCategoryList, blogCategoryList } = useBlogCategories();
const blog = reactive({
    name,
    categories: '',
    content,
    is_published,
    main_image: '',
    blog_gallery: '',
    document: '',
});

// Define Quill editor options
const options1 = ref({
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'], // Only text formatting options
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List options
            ['link'], // Allow inserting links
        ],
        clipboard: {
            matchers: [
                ['img', () => { return false; }], // Prevent image pasting
            ],
        },
    },
});

function submitForm() {
    validate().then((form) => {
        if (form.valid) {
            const fileInput = document.getElementById('blog_gallery');
            const files = fileInput.files;
            storeBlog(blog, files);
        }
    });
}

onMounted(() => {
    getBlogCategoryList();

    //single file upload
    new FileUploadWithPreview('myFirstImage', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });

    new FileUploadWithPreview('myBlogGallery', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });

    // Prevent drag-and-drop image insertion
    const quillEditorElement = document.querySelector('.ql-editor');
    if (quillEditorElement) {
        quillEditorElement.addEventListener('drop', (e) => {
            e.preventDefault();
        });

        quillEditorElement.addEventListener('paste', (e) => {
            if (e.clipboardData && e.clipboardData.items) {
                const items = e.clipboardData.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        e.preventDefault();
                        return;
                    }
                }
            }
        });
    }
});
</script>

<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style>
.ql-container {
    min-height: 250px !important;
    height: 300px !important;
}

.custom-file-container__image-multi-preview {
    height: 200px !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
