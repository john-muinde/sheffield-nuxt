<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Products</a>
                </li>
                <li
                  class="breadcrumb-item active"
                  aria-current="page"
                >
                  <span>Edit Product</span>
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
                  <h3><b>Edit Product</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-8">
                    <label for="post-name">Product Name</label>
                    <input
                      id="post-name"
                      v-model="product.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Product Name ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.name }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.name"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">Make</label>
                    <!-- <input v-model="product.brand" id="post-brand" type="text" class="form-control" placeholder="Enter Make ..." /> -->

                    <multiselect
                      v-model="product.brand"
                      :options="brandList"
                      :reduce="(brand) => brand.id"
                      :searchable="true"
                      :preselect-first="true"
                      track-by="name"
                      label="name"
                      placeholder="Choose Brand ..."
                      selected-label=""
                      select-label=""
                      deselect-label=""
                    />

                    <div class="text-danger mt-1">
                      {{ errors.brand }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.brand"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">Model Number</label>
                    <input
                      id="post-brand"
                      v-model="product.model_number"
                      type="text"
                      class="form-control"
                      placeholder="Enter Model Number ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.model_number }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.model_number"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">SKU</label>
                    <input
                      id="post-sku"
                      v-model="product.sku"
                      type="text"
                      class="form-control"
                      placeholder="Enter SKU ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.sku }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.sku"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">Quantity</label>
                    <input
                      id="post-quantity"
                      v-model="product.quantity"
                      type="text"
                      class="form-control"
                      placeholder="Enter Quantity ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.quantity }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.quantity"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">Cost Price (USD KES ?)</label>
                    <input
                      id="post-cost_price"
                      v-model="product.cost_price"
                      type="text"
                      class="form-control"
                      placeholder="Enter Cost Price ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.cost_price }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.cost_price"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">Retail Price (USD KES ?)</label>
                    <input
                      id="post-retail_price"
                      v-model="product.retail_price"
                      type="text"
                      class="form-control"
                      placeholder="Enter Retail Price ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.retail_price }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.retail_price"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">Weight (KGs)</label>
                    <input
                      id="post-weight"
                      v-model="product.weight"
                      type="text"
                      class="form-control"
                      placeholder="Enter Weight ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.weight }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.weight"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label
                      for="post-category"
                      class="form-label"
                    >Select Product Category</label>

                    <multiselect
                      v-model="product.categories"
                      :options="categoryList"
                      :reduce="(category) => category.id"
                      :multiple="true"
                      :taggable="true"
                      :searchable="true"
                      :preselect-first="true"
                      track-by="id"
                      label="parent_name_with_dashes"
                      placeholder="Choose Product Category ..."
                      selected-label=""
                      select-label=""
                      deselect-label=""
                    />

                    <div class="text-danger mt-1">
                      {{ errors.categories }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.categories"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <h4>Dimensions</h4>
                  <hr class="bg-dark" />

                  <div class="form-group col-md-4">
                    <label for="post-name">Length (mm)</label>
                    <input
                      id="post-length"
                      v-model="product.length"
                      type="text"
                      class="form-control"
                      placeholder="Enter Length (mm) ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.length }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.length"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">Height (mm)</label>
                    <input
                      id="post-height"
                      v-model="product.height"
                      type="text"
                      class="form-control"
                      placeholder="Enter Height (mm) ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.height }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.height"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-name">Width (mm)</label>
                    <input
                      id="post-width"
                      v-model="product.width"
                      type="text"
                      class="form-control"
                      placeholder="Enter Width (mm) ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.width }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.width"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="short_description">Short Product Description</label>

                    <quill-editor
                      id="short_description"
                      v-model:value="
                        product.short_description
                      "
                      :options="options1"
                      placeholder="Enter Short Description ..."
                    />
                  </div>

                  <div class="form-group">
                    <label for="post_description">Product Description</label>

                    <quill-editor
                      v-model:value="product.description"
                      :options="options1"
                      placeholder="Enter Description ..."
                    />
                  </div>

                  <div class="form-group">
                    <label for="post_description">Technical Specification</label>

                    <quill-editor
                      v-model:value="
                        product.technical_specification
                      "
                      :options="options1"
                      placeholder="Enter Technical Specification ..."
                    />
                  </div>

                  <div class="form-group">
                    <label for="post_description">Terms of Operation</label>

                    <quill-editor
                      v-model:value="
                        product.terms_of_operation
                      "
                      :options="options1"
                      placeholder="Enter Terms of Operation ..."
                    />
                  </div>

                  <div
                    class="custom-file-container"
                    data-upload-id="myFirstImage"
                  >
                    <label>Upload Main Product Image
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
                          product.main_image =
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
                    data-upload-id="myProductGallery"
                  >
                    <label>Product Gallery (multiple images
                      allowed)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label
                      class="custom-file-container__custom-file"
                      for="product_gallery"
                    >
                      <input
                        id="product_gallery"
                        ref="product_gallery"
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
                        v-for="item in product.product_images"
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
                            deleteProductImage(
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

                  <div
                    class="custom-file-container"
                    data-upload-id="myDocument"
                  >
                    <label>Technical Specification Document
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>

                    <div class="align-right">
                      <a
                        href=""
                        class="btn btn-info pull-right"
                      >View Uploaded File</a>
                      <a
                        href=""
                        class="btn btn-primary pull-right"
                      >Delete Uploaded File</a>
                    </div>
                    <label
                      class="custom-file-container__custom-file"
                      for="document"
                    >
                      <input
                        id="document"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept=".pdf,.doc,.docx"
                        @change="
                          product.document =
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

                  <div class="form-group col-md-4">
                    <label
                      for="is_published"
                      class="col-form-label"
                    >Publishing Status</label>
                    <div>
                      <select
                        id="is_published"
                        v-model="product.is_published"
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
                        :key="message"
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
useMeta({ title: 'Edit Product' });

import { useRoute } from 'vue-router';
import useProducts from '@/composables/products';
import useCategories from '@/composables/categories';
import useBrands from '@/composables/brands';
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
    brand: 'required',
    short_description: 'required',
    description: 'required|min:3',
    is_published: 'required',
};

// Create a form context with the validation schema
const { validate, errors, resetForm } = useForm({ validationSchema: schema });
// Define actual fields for validation

const {
    product: postData,
    getProduct,
    updateProduct,
    validationErrors,
    isLoading,
    getProductList,
    productList,
    deleteProductImage,
} = useProducts();
const { getCategoryList, categoryList } = useCategories();
const { getBrandList, brandList } = useBrands();

// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: brand } = useField('brand', null, {
    initialValue: postData.value.brand_json,
});
const { value: model_number } = useField('model_number', null, {
    initialValue: '',
});
const { value: sku } = useField('sku', null, { initialValue: '' });
const { value: quantity } = useField('quantity', null, { initialValue: '' });
const { value: cost_price } = useField('cost_price', null, {
    initialValue: '',
});
const { value: retail_price } = useField('retail_price', null, {
    initialValue: '',
});
const { value: weight } = useField('weight', null, { initialValue: '' });
//categories
const { value: length } = useField('length', null, { initialValue: '' });
const { value: width } = useField('width', null, { initialValue: '' });
const { value: height } = useField('height', null, { initialValue: '' });
const { value: short_description } = useField('short_description', null, {
    initialValue: '',
});
const { value: description } = useField('description', null, {
    initialValue: '',
});
const { value: technical_specification } = useField(
    'technical_specification',
    null,
    { initialValue: '' },
);
const { value: terms_of_operation } = useField('terms_of_operation', null, {
    initialValue: '',
});
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const product = reactive({
    name,
    brand,
    model_number,
    sku,
    quantity,
    cost_price,
    retail_price,
    weight,
    categories: '',
    length,
    width,
    height,
    short_description,
    description,
    technical_specification,
    terms_of_operation,
    is_published,
    main_image: '',
    product_gallery: '',
    document: '',
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
            if (product.brand && product.brand.id) {
                product.brand = product.brand.id;
            } else {
                product.brand = null;
            }

            const fileInput = document.getElementById('product_gallery');
            const files = fileInput.files;

            if (files.length > 0) {
                updateProduct(product, files);
            } else {
                updateProduct(product, []);
            }
        }
    });
}

function deleteImage(imageId) {
    deleteProductImage(imageId);
}

const initializeFileUpload = async () => {};

onMounted(() => {
    getCategoryList();
    getBrandList();
    getProduct(route.params.id);

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

    //single file upload
    new FileUploadWithPreview('myDocument', {
        images: {
            baseImage: '/assets/images/file-preview-pdf.png',
            backgroundImage: '',
        },
    });

    new FileUploadWithPreview('myProductGallery', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });
});
// https://vuejs.org/api/reactivity-core.html#watcheffect

watchEffect(() => {
    product.id = postData.value.id;
    product.name = postData.value.name;
    product.brand = postData.value.brand_json;
    product.model_number = postData.value.model_number;
    product.sku = postData.value.sku;
    product.quantity = postData.value.quantity;
    product.cost_price = postData.value.cost_price;
    product.retail_price = postData.value.retail_price;
    product.weight = postData.value.weight;
    product.categories = postData.value.categories_json;
    product.length = postData.value.length;
    product.width = postData.value.width;
    product.height = postData.value.height;
    product.short_description = postData.value.short_description;
    product.description = postData.value.description;
    product.technical_specification = postData.value.technical_specification;
    product.terms_of_operation = postData.value.terms_of_operation;
    product.is_published = postData.value.is_published;

    //product_images

    product.product_images = postData.value.product_images;


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
