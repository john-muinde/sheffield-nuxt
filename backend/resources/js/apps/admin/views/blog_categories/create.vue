<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Blog Categories</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Create Blog Category</span>
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
                  <h3><b>New Blog Category</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="post-name">Blog Category Name</label>
                  <input
                    id="post-name"
                    v-model="blogCategory.name"
                    type="text"
                    class="form-control"
                    placeholder="Enter Blog Category Name ..."
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
                    v-model="blogCategory.description"
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
                  <label for="is_published" class="col-form-label">Publishing Status</label>
                  <div>
                    <select
                      id="is_published"
                      v-model="blogCategory.is_published"
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

<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<script setup>
import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'New Blog Category' });

import '../../assets/sass/scrollspyNav.scss';
import '../../assets/sass/scrollspyNav.scss';
import '../../assets/sass/forms/file-upload-with-preview.min.css';

import { reactive, onMounted, ref } from 'vue';
import useBlogCategories from '@/composables/blogCategories';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';

import Multiselect from 'vue-multiselect';

defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
    name: 'required|min:3',
    description: 'required|min:3',
    is_published: 'required',
};
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: description } = useField('description', null, {
    initialValue: '',
});
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const { storeBlogCategory, validationErrors, isLoading, getBlogCategoryList, blogCategoryList } =
    useBlogCategories();
const blogCategory = reactive({
    name,
    description,
    is_published,
});

function submitForm() {
    validate().then((form) => {

        if (form.valid) {
            storeBlogCategory(blogCategory);
        }

    });
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
