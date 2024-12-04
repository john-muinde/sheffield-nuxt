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
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Create Product</span>
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
                  <h3><b>Create Solution</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-4">
                    <label for="post-name">Solution Category</label>

                    <multiselect
                      v-model="solution.solution_category"
                      :options="categoryMainList"
                      :reduce="category => category.id"
                      :searchable="true"
                      :preselect-first="true"
                      track-by="name"
                      label="name"
                      placeholder="Choose Solution Category ..."
                      selected-label=""
                      select-label=""
                      deselect-label=""
                      @input="onSolutionCategoryChange"
                    />

                    <div class="text-danger mt-1">
                      {{ errors.solution_category }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.brand">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-8">
                    <label for="post-name">Solution Name</label>
                    <input
                      id="post-name"
                      v-model="solution.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Solution Name ..."
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
                    <label for="post-category" class="form-label">Select Product Category</label>

                    <multiselect
                      v-model="solution.categories"
                      :options="categoryList"
                      :reduce="category => category.id"
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
                      <div v-for="message in validationErrors?.categories">
                        {{ message }}
                      </div>
                    </div>
                  </div>



                  <div class="form-group">
                    <label for="post_description">Solution Description</label>

                    <quill-editor v-model:value="solution.description" :options="options1" placeholder="Enter Description ..." />
                  </div>





                  <div class="custom-file-container" data-upload-id="myFirstImage">
                    <label>Solution Image <small>(image should be 1:1)</small> <a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image">x</a></label>
                    <label class="custom-file-container__custom-file" for="main_image">
                      <input
                        id="main_image"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        @change="solution.main_image = $event.target.files[0]"
                      />
                      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                      <span class="custom-file-container__custom-file__custom-file-control"></span>
                    </label>
                    <div class="custom-file-container__image-preview"></div>
                  </div>




                  <div class="form-group col-md-4">
                    <label for="is_published" class="col-form-label">Publishing Status</label>
                    <div>
                      <select id="is_published" v-model="solution.is_published" class="form-select">
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
    useMeta({ title: 'Create Product' });

    import '../../assets/sass/scrollspyNav.scss';
    import highlight from '../../components/plugins/highlight.vue';

    import '../../assets/sass/forms/file-upload-with-preview.min.css';
    import FileUploadWithPreview from 'file-upload-with-preview';




    import { quillEditor } from 'vue3-quill';
    import 'vue3-quill/lib/vue3-quill.css';




    import { reactive, onMounted, ref, watch } from 'vue';
    import useSolutions from '@/composables/solutions';
    import useCategories from '@/composables/categories';
    import { useForm, useField, defineRule } from 'vee-validate';
    import { required, min } from '@/validation/rules';


    defineRule('required', required);
    defineRule('min', min);


    // Define a validation schema
    const schema = {
        name: 'required|min:3',
        solution_category: 'required',
        description: 'required|min:3',
        is_published: 'required',
    };


    // Create a form context with the validation schema
    const { validate, errors } = useForm({ validationSchema: schema });
    // Define actual fields for validation
    const { value: name } = useField('name', null, { initialValue: '' });
    const { value: solution_category } = useField('solution_category', null, { initialValue: '' });
    const { value: description } = useField('description', null, { initialValue: '' });
    const { value: is_published } = useField('is_published', null, { initialValue: '' });

    const { storeSolution, validationErrors, isLoading, getProductList, solutionList } = useSolutions();
    const { getCategoryList, categoryList, getMainCategoryList, categoryMainList, getSelectedCategoryList } = useCategories();
    const solution = reactive({
        name,
        solution_category,
        description,
        is_published,
        main_image: '',

    });

    const options1 = ref({
        modules: {
            //toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], ["image", "code-block"]],
        },
    });

    watch(solution, (newValue) => {
      //
     if (newValue.solution_category) {
        const selectedCategoryId = newValue.solution_category.id;

        if (newValue.solution_category) {

            const selectedCategoryList = getSelectedCategoryList(selectedCategoryId);
            //solution.categories = selectedCategoryList; //
        }
      }
    });


    function submitForm() {
        validate().then(form => {
            if (form.valid) {

                const files = '';
                if (solution.solution_category && solution.solution_category.id) {
                  solution.solution_category = solution.solution_category.id;
                }else{
                      solution.solution_category = null;
                }
                storeSolution(solution, files);

            }
        });
    }

    onMounted(() => {
        //getCategoryList();
        getMainCategoryList();

        //single file upload
        new FileUploadWithPreview('myFirstImage', {
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
