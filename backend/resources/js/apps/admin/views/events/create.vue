<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Events</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Create Event</span>
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
                  <h3><b>New Event</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-name">Event Name</label>
                    <input
                      id="post-name"
                      v-model="event.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Event Name ..."
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

                  <div class="form-group col-md-6">
                    <label for="post-location">Event Location</label>
                    <input
                      id="post-location"
                      v-model="event.location"
                      type="text"
                      class="form-control"
                      placeholder="Enter Event location ..."
                    />

                    <div class="text-danger mt-1">
                      {{ errors.location }}
                    </div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.location" :key="message">
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-start_date">Start Date</label>
                    <flat-pickr
                      v-model="event.start_date"
                      :config="config"
                      class="form-control flatpickr active"
                      placeholder="Select Start Date"
                    />
                    <div class="text-danger mt-1">
                      {{ errors.end_date }}
                    </div>

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.end_date" :key="message">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="post-end_date">End Date</label>
                    <flat-pickr
                      v-model="event.end_date"
                      :config="config"
                      class="form-control flatpickr active"
                      placeholder="Select End Date"
                    />

                    <div class="text-danger mt-1">
                      {{ errors.end_date }}
                    </div>

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.end_date" :key="message">
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label for="post-url">URL</label>
                  <input
                    id="post-url"
                    v-model="event.url"
                    type="text"
                    class="form-control"
                    placeholder="Enter Event url ..."
                  />

                  <div class="text-danger mt-1">
                    {{ errors.url }}
                  </div>
                  <div class="text-danger mt-1">
                    <div v-for="message in validationErrors?.url" :key="message">
                      {{ message }}
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="post_description">Description</label>

                  <quill-editor
                    v-model:value="event.description"
                    placeholder="Enter Description..."
                  />

                  <div class="text-danger mt-1">
                    {{ errors.description }}
                  </div>

                  <div class="text-danger mt-1">
                    <div v-for="message in validationErrors?.description" :key="message">
                      {{ message }}
                    </div>
                  </div>
                </div>


                <div class="form-group">
                  <div class="custom-file-container" data-upload-id="myFirstImage">
                    <label>Upload Event Image
                      <a
                        id="event_image"
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label class="custom-file-container__custom-file">
                      <input
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        @change="
                          event.main_image_path =
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
                </div>

                <div class="form-group">
                  <label for="is_published" class="col-form-label">Publishing Status</label>
                  <div>
                    <select id="is_published" v-model="event.is_published" class="form-select">
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
                    <div v-for="message in validationErrors?.is_published" :key="message">
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

<script setup>
import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'New Event' });

import '../../assets/sass/scrollspyNav.scss';
import highlight from '../../components/plugins/highlight.vue';
import FileUploadWithPreview from 'file-upload-with-preview';
import '../../assets/sass/scrollspyNav.scss';
import '../../assets/sass/forms/file-upload-with-preview.min.css';


import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

import '../../assets/sass/forms/custom-flatpickr.css';

import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

import { onMounted, ref } from 'vue';
import useEvents from '@/composables/events';
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
    name: 'required|min:3',
    location: 'required|min:3',
    url: 'required',
    start_date: 'required',
    end_date: 'required',
    description: 'required|min:3',
    is_published: 'required',
};
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
// Define actual fields for validation
const { value: name } = useField('name', null, { initialValue: '' });
const { value: location } = useField('location', null, { initialValue: '' });
const { value: url } = useField('url', null, { initialValue: '' });
const { value: start_date } = useField('start_date', null, {
    initialValue: '',
});
const { value: end_date } = useField('end_date', null, {
    initialValue: '',
});
const { value: description } = useField('description', null, {
    initialValue: '',
});
const { value: is_published } = useField('is_published', null, {
    initialValue: '',
});

const { storeEvent, validationErrors, isLoading, getEventList } =
    useEvents();

const event = ref({
    name,
    location,
    url,
    start_date,
    end_date,
    description,
    main_image_path: '',
    is_published,
});

function submitForm() {

    validate().then((form) => {
        if (form.valid) {
            storeEvent(event.value);
        } else {
            let errors = form.errors;

            showToast('Please fill all fields to proceed', 'error');
        }
    });
}

onMounted(() => {
    getEventList();

    new FileUploadWithPreview('myFirstImage', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });
});

// alert(event.start_date);
</script>
