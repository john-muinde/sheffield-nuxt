<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Projects</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Create Project</span>
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
                  <h3><b>Create Project</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="post-name">Project Name</label>
                    <input
                      id="post-name"
                      v-model="project.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Project Name ..."
                    />
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.name">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="post-client" class="form-label">Select Client</label>

                    <multiselect
                      v-model="project.client"
                      :options="clientList"
                      :reduce="(client) => client.id"
                      :searchable="true"
                      :preselect-first="true"
                      track-by="id"
                      label="name"
                      placeholder="Choose Client ..."
                      selected-label=""
                      select-label=""
                      deselect-label=""
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.client">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="post-content">Project Description</label>

                    <quill-editor
                      v-model:value="project.content"
                      placeholder="Enter Project Description ..."
                    />

                    <div class="mt-1 text-danger">
                      <div v-for="message in validationErrors?.content">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="custom-file-container" data-upload-id="myFirstImage">
                    <label>Upload Main Project Image
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="main_image_path">
                      <input
                        id="main_image_path"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                        @change="
                          project.main_image_path =
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

                  <div class="custom-file-container" data-upload-id="myProjectGallery">
                    <label>Project Gallery (multiple images
                      allowed)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear Image"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="project_gallery">
                      <input
                        id="project_gallery"
                        ref="project_gallery"
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
                      <select
                        id="is_published"
                        v-model="project.is_published"
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
useMeta({ title: 'Create Project' });

import '../../assets/sass/scrollspyNav.scss';

import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';


import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';

import { onMounted } from 'vue';
import useProjects from '@/composables/projects';
import useClients from '@/composables/clients';

const { storeProject, validationErrors, isLoading, project } =
    useProjects();
const { getClientList, clientList } = useClients();


function submitForm() {
    const projectValue = project.value;
    const client = projectValue?.client;

    if (client && client.id) {
        project.value.client = client.id;
    } else {
        project.value.client = null;
    }

    const fileInput = document.getElementById('project_gallery');
    const files = fileInput.files;
    storeProject(project.value, files);
}

onMounted(() => {
    getClientList();

    //single file upload
    new FileUploadWithPreview('myFirstImage', {
        images: {
            baseImage: '/assets/images/file-preview.png',
            backgroundImage: '',
        },
    });

    new FileUploadWithPreview('myProjectGallery', {
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
