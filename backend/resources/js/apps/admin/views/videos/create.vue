<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Video</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Create Video</span>
                </li>
              </ol>
            </nav>
          </div>
        </li>
      </ul>
    </teleport>

    <div class="container">
      <div class="row">
        <div id class="col-lg-12 layout-spacing layout-top-spacing">
          <div class="statbox panel box box-shadow">
            <div class="panel-heading pb-0">
              <div class="row">
                <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                  <h3>
                    <b>Create Video</b>
                  </h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="post-name">Title</label>
                    <input
                      id="post-name"
                      v-model="video.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Title ..."
                    />
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.name" :key="message">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="post-content">Description</label>

                    <quill-editor
                      v-model:value="video.content"
                      placeholder="Enter video Content ..."
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.content" :key="message">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="custom-file-container" data-upload-id="mySecondImage">
                    <label>
                      Main Image (Must be image)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear File"
                      >x</a>
                    </label>
                    <label class="custom-file-container__custom-file" for="main_image_path">
                      <input
                        id="main_image_path"
                        class="custom-file-container__custom-file__custom-file-input"
                        type="file"
                        accept="image/jpeg, image/png"
                        @change="video.main_image_path = $event.target.files[0]"
                      />
                      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                      <span class="custom-file-container__custom-file__custom-file-control"></span>
                    </label>
                    <div class="custom-file-container__image-preview"></div>
                  </div>

                  <div class="form-group">
                    <label for="post-category" class="form-label">Type</label>

                    <select
                      id="type"
                      v-model="video.type"
                      class="form-select form-control"
                      name="type"
                      @change="handleTypeChange"
                    >
                      <option value>
                        Select Type
                      </option>
                      <option value="Upload">
                        Upload
                      </option>
                      <option value="Youtube Url">
                        Youtube Url
                      </option>
                    </select>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.type" :key="message">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="video.type == 'Upload'"
                    ref="uploadContainer"
                    class="custom-file-container"
                    data-upload-id="myFirstImage"
                  >
                    <label>
                      Upload Video (Must be mp4)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear File"
                      >x</a>
                    </label>
                    <label class="custom-file-container__custom-file" for="file_path">
                      <input
                        id="file_path"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="video/mp4"
                        @change="video.file_path = $event.target.files[0]"
                      />
                      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                      <span class="custom-file-container__custom-file__custom-file-control"></span>
                    </label>
                    <div class="custom-file-container__image-preview"></div>
                  </div>

                  <div v-if="video.type == 'Youtube Url'" class="form-group col-md-12">
                    <label for="post-name">Youtube Video Url</label>
                    <input
                      id="post-name"
                      v-model="video.video_url"
                      type="text"
                      class="form-control"
                      placeholder="Enter Youtube Video Url ..."
                    />
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.video_url" :key="message">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <label for="is_published" class="col-form-label">Shown in About Us</label>
                    <div>
                      <select
                        id="shown_in_about_us"
                        v-model="video.shown_in_about_us"
                        class="form-select"
                      >
                        <option value>
                          Select Shown Status ...
                        </option>
                        <option selected value="1">
                          Shown
                        </option>
                        <option value="0">
                          Not Shown
                        </option>
                      </select>
                    </div>
                    <div class="text-danger mt-1">
                      <div
                        v-for="message in validationErrors?.shown_in_about_us"
                        :key="message"
                      >
                        {{ message }}
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="is_published" class="col-form-label">Publishing Status</label>
                    <div>
                      <select id="is_published" v-model="video.is_published" class="form-select">
                        <option value>
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
                      <div v-for="message in validationErrors?.is_published" :key="message">
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <button :disabled="isLoading" class="btn btn-primary mt-3">
                  <div v-show="isLoading" class></div>
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
useMeta({ title: 'Create Video' });

import '../../assets/sass/scrollspyNav.scss';

import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';

import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

import { onMounted } from 'vue';
import useVideo from '@/composables/videos';

const { storeVideo, video, validationErrors, isLoading } = useVideo();

const handleTypeChange = () => {
  if (video.type === 'Upload') {
    const fileUploadContainer = new FileUploadWithPreview('myFirstImage', {
      images: {
        baseImage: '/assets/images/video_preview.jpg',
        backgroundImage: '',
      },
    });

    // Append the file upload container to the specified ref element
    fileUploadContainer.appendTo(document.getElementById('uploadContainer'));
  }
};

function submitForm() {
  storeVideo(video.value);
}

onMounted(() => {
  //single file upload
  new FileUploadWithPreview('mySecondImage', {
    images: {
      baseImage: '/assets/images/file-preview.png',
      backgroundImage: '',
    },
  });
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
