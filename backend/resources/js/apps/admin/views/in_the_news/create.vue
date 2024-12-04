<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">News</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Create News</span>
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
                  <h3><b>Create News</b></h3>
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
                      v-model="news.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Title ..."
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.name">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="post-content">
                      Description</label>
                    <quill-editor
                      v-model:value="news.description"
                      placeholder="Enter News Content ..."
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.description">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="custom-file-container" data-upload-id="mySecondImage">
                    <label>Brand Logo (Must be image)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear File"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="main_image_path">
                      <input
                        id="main_image_path"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/jpeg, image/png"
                        @change="
                          news.main_image_path =
                            $event.target.files[0]
                        "
                      />
                      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                      <span
                        class="custom-file-container__custom-file__custom-file-control"
                      ></span>
                    </label>
                    <div class="custom-file-container__image-preview"></div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.main_image_path">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="post-category" class="form-label">Type</label>

                    <select
                      id="type"
                      v-model="news.type"
                      class="form-select form-control"
                      name="type"
                      @change="handleTypeChange"
                    >
                      <option value="">
                        Select Type
                      </option>
                      <option value="Image">
                        Image
                      </option>
                      <option value="Video">
                        Video
                      </option>
                    </select>

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.type">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="news.type == 'Image'"
                    ref="uploadContainer"
                    class="custom-file-container"
                    data-upload-id="myFirstImage"
                  >
                    <label>Upload Image
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear File"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="file_path">
                      <input
                        id="file_path"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/png, image/jpeg"
                        @change="
                          news.file_path =
                            $event.target.files[0]
                        "
                      />
                      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                      <span
                        class="custom-file-container__custom-file__custom-file-control"
                      ></span>
                    </label>
                    <div class="custom-file-container__image-preview"></div>
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.file_path">
                        {{ message }}
                      </div>
                    </div>
                  </div>


                  <div v-if="news.type == 'Image'" class="form-group col-md-12">
                    <label for="post-name">Link Url</label>
                    <input
                      id="post-name"
                      v-model="news.url"
                      type="text"
                      class="form-control"
                      placeholder="Enter Media Url ..."
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.url">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div v-if="news.type == 'Video'" class="form-group col-md-12">
                    <label for="post-name">Youtube Video Url</label>
                    <input
                      id="post-name"
                      v-model="news.file_path"
                      type="text"
                      class="form-control"
                      placeholder="Enter Youtube Video Url ..."
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.video_url">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <label for="is_published" class="col-form-label">Publishing Status</label>
                    <div>
                      <select id="is_published" v-model="news.is_published" class="form-select">
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
useMeta({ title: 'Create News' });

import '../../assets/sass/scrollspyNav.scss';

import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';

import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

import { reactive, onMounted, ref } from 'vue';
import useNews from '@/composables/news';

const { storeNews, validationErrors, isLoading, getPublictionList, newsList, news } = useNews();

const handleTypeChange = () => {
    if (news.type === 'Image') {

        const fileUploadContainer = new FileUploadWithPreview('myFirstImage', {
            images: {
                baseImage: '/assets/images/file-preview.png',
                backgroundImage: '',
            },
        });
    }
};

function submitForm() {
    storeNews(news.value);
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
