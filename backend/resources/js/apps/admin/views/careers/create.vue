<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Careers</a>
                </li>
                <li
                  class="breadcrumb-item active"
                  aria-current="page"
                >
                  <span>Create Career</span>
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
                  <h3><b>New Career</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-4">
                    <label for="post-title">Career Title</label>
                    <input
                      id="post-title"
                      v-model="career.title"
                      type="text"
                      class="form-control"
                      placeholder="Enter Career Name ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.title }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.title"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-department">Career Department</label>
                    <input
                      id="post-department"
                      v-model="career.department"
                      type="text"
                      class="form-control"
                      placeholder="Enter Career Department ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.department }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.department"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-location">Location</label>
                    <input
                      id="post-location"
                      v-model="career.location"
                      type="text"
                      class="form-control"
                      placeholder="Enter Location ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.location }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.location"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-4">
                    <label for="post-education">Education</label>
                    <input
                      id="post-education"
                      v-model="career.education"
                      type="text"
                      class="form-control"
                      placeholder="Enter Education ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.education }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.education"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-experience">Experience</label>
                    <input
                      id="post-experience"
                      v-model="career.experience"
                      type="text"
                      class="form-control"
                      placeholder="Enter Experience ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.experience }}
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.location"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-4">
                    <label for="post-deadline">Deadline</label>
                    <flat-pickr
                      v-model="career.deadline"
                      :config="config"
                      class="form-control flatpickr active"
                      placeholder="Select Application Deadline"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="post_description">Description</label>

                  <quill-editor
                    v-model:value="career.description"
                    :options="options1"
                    placeholder="Enter Description..."
                  />
                </div>

                <div class="form-group">
                  <label for="post_responsibilities">Responsibilities</label>

                  <quill-editor
                    v-model:value="career.responsibilities"
                    :options="options1"
                    placeholder="Enter Responsibilities..."
                  />
                </div>

                <div class="form-group">
                  <label for="post_requirements">Requirements</label>

                  <quill-editor
                    v-model:value="career.requirements"
                    :options="options1"
                    placeholder="Enter Requirements..."
                  />
                </div>

                <div
                  class="custom-file-container"
                  data-upload-id="myDocument"
                >
                  <label>Career Specification Document
                    <a
                      href="javascript:void(0)"
                      class="custom-file-container__image-clear"
                      title="Clear Image"
                    >x</a></label>
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
                        career.document =
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

                <div class="form-group">
                  <label
                    for="is_published"
                    class="col-form-label"
                  >Publishing Status</label>
                  <div>
                    <select
                      id="is_published"
                      v-model="career.is_published"
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
                    <div
                      v-for="message in validationErrors?.is_published"
                    >
                      {{ message }}
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
useMeta({ title: 'New Career' });

import '../../assets/sass/scrollspyNav.scss';
import highlight from '../../components/plugins/highlight.vue';
import '../../assets/sass/scrollspyNav.scss';

import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import '../../assets/sass/forms/custom-flatpickr.css';




import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

import { reactive, onMounted, ref } from 'vue';
import useCareers from '@/composables/careers';
import { useForm, useField, defineRule } from 'vee-validate';
import { required, min } from '@/validation/rules';

defineRule('required', required);
defineRule('min', min);

const config = ref({
    wrap: true, // set wrap to true only when using 'input-group'
    altFormat: 'M j, Y',
    altInput: true,
    dateFormat: 'Y-m-d',
});

// Define a validation schema
const schema = {
    title: 'required|min:3',
    department: 'required',
    location: 'required',
    education: 'required',
    experience: 'required',
    deadline: 'required',
    description: 'required',
    responsibilities: 'required',
    requirements: 'required',
    is_published: 'required',
};
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: title } = useField('title', null, { initialValue: '' });
const { value: department } = useField('department', null, {
    initialValue: '',
});
const { value: location } = useField('location', null, { initialValue: '' });
const { value: education } = useField('education', null, {
    initialValue: '',
});
const { value: experience } = useField('experience', null, {
    initialValue: '',
});
const { value: deadline } = useField('deadline', null, {
    initialValue: '',
});
const { value: description } = useField('description', null, {
    initialValue: '',
});
const { value: responsibilities } = useField('responsibilities', null, {
    initialValue: '',
});
const { value: requirements } = useField('requirements', null, {
    initialValue: '',
});
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const { storeCareer, validationErrors, isLoading, getCareerList } =
    useCareers();
const career = reactive({
    title,
    department,
    location,
    education,
    experience,
    deadline,
    description,
    responsibilities,
    requirements,
    document,
    is_published,
});

const options1 = ref({
    modules: {
        //toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], ["image", "code-block"]],
    },
});

function submitForm() {
    validate().then((form) => {
        if (form.valid) {
            storeCareer(career);
        }
    });
}

onMounted(() => {
    getCareerList();

    new FileUploadWithPreview('myDocument', {
        images: {
            baseImage: '/assets/images/file-preview-pdf.png',
            backgroundImage: '',
        },
    });
});

// alert(career.startDate);
</script>
