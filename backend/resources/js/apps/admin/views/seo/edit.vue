<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">SEO</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Edit SEO</span>
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
                  <h3><b>Edit SEO</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-page"> Page</label>
                    <input
                      id="post-page"
                      v-model="seo.page"
                      type="text"
                      class="form-control"
                      placeholder="Enter Page ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.page }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.page">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="post-title">Page Title</label>
                    <input
                      id="post-title"
                      v-model="seo.title"
                      type="text"
                      class="form-control"
                      placeholder="Enter Page Title ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.title }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.title">
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-description">Page Description</label>
                    <input
                      id="post-description"
                      v-model="seo.description"
                      type="text"
                      class="form-control"
                      placeholder="Enter Page Description ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.description }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.description">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="post-keywords">Page Keywords</label>
                    <input
                      id="post-keywords"
                      v-model="seo.keywords"
                      type="text"
                      class="form-control"
                      placeholder="Enter comma separated Keywords ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.keywords }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.keywords">
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-canonical">Canonical URL</label>
                    <input
                      id="post-canonical"
                      v-model="seo.canonical"
                      type="text"
                      class="form-control"
                      placeholder="Enter Canonical URL here or leave blank to autogenerate ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.canonical }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.canonical">
                        {{ message }}
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="post-type">SEO Type</label>
                    <div>
                      <select
                        id="post-type"
                        v-model="seo.type"
                        class="form-select"
                      >
                        <option selected value="article">
                          Article
                        </option>
                        <option selected value="page">
                          Page
                        </option>
                        <option selected value="product">
                          Product
                        </option>
                      </select>
                    </div>

                    <div class="text-danger mt-1">
                      {{ errors.type }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.type">
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
import '../../assets/sass/scrollspyNav.scss';
import '../../assets/sass/scrollspyNav.scss';
import '../../assets/sass/forms/file-upload-with-preview.min.css';

import { reactive, onMounted, ref, watchEffect } from 'vue';
import useSeo from '@/composables/seo';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';
import { useRoute } from 'vue-router';

defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
  page: 'required|min:1',
  title: 'required|min:3',
  description: 'required',
  keywords: 'required|min:3',
  canonical: '',
  type:'required',
};
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: page } = useField('page', null, { initialValue: '' });
const { value: title } = useField('title', null, { initialValue: '' });
const { value: description } = useField('description', null, { initialValue: '' });
const { value: keywords } = useField('keywords', null, {
  initialValue: '',
});
const { value: canonical } = useField('canonical', null, {
  initialValue: '',
});
const { value: type } = useField('type', null, {
  initialValue: '',
});

const route = useRoute();


const { seo: postData, getSeo,
  updateSeo, validationErrors, isLoading, getSeoList, seoList } =
  useSeo();

const seo = reactive({
  page,
  title,
  description,
  keywords,
  canonical,
  type,
});

function submitForm() {
  validate().then((form) => {
    if (form.valid) {
      updateSeo(seo);
    }
  });
}

onMounted(() => {
  getSeo(route.params.id);

});

watchEffect(() => {
  seo.id = postData.value.id;
  seo.page = postData.value.page;
  seo.title = postData.value.title;
  seo.description = postData.value.description;
  seo.keywords = postData.value.keywords;
  seo.canonical = postData.value.canonical;
  seo.type = postData.value.type;
});
</script>
