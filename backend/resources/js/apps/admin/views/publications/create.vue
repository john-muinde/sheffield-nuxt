<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Publication</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Create Publication</span>
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
                  <h3><b>Create Publication</b></h3>
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
                      v-model="publication.name"
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
                    <label for="post-category" class="form-label">Type</label>

                    <select
                      id="type"
                      v-model="publication.type"
                      class="form-select form-control"
                      name="type"
                    >
                      <option selected disabled value="">
                        Select Publication Type
                      </option>
                      <option value="Brochures">
                        Brochures
                      </option>
                      <option value="Newsletter">
                        Newsletter
                      </option>
                    </select>

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.type">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="post-content"> Description</label>

                    <quill-editor
                      v-model:value="publication.content"
                      placeholder="Enter Blog Content ..."
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.content">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="custom-file-container" data-upload-id="myFirstImage">
                    <label>Upload File (Must be pdf)
                      <a
                        href="javascript:void(0)"
                        class="custom-file-container__image-clear"
                        title="Clear File"
                      >x</a></label>
                    <label class="custom-file-container__custom-file" for="publication_file">
                      <input
                        id="publication_file"
                        type="file"
                        class="custom-file-container__custom-file__custom-file-input"
                        accept="application/pdf"
                        @change="
                          publication.publication_file =
                            $event.target.files[0]
                        "
                      />
                      <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                      <span
                        class="custom-file-container__custom-file__custom-file-control"
                      ></span>
                    </label>
                    <div class="mt-1 text-danger">
                      <div v-for="message in validationErrors?.publication_file">
                        {{ message }}
                      </div>
                    </div>
                    <div class="custom-file-container__image-preview"></div>
                  </div>



                  <div class="form-group col-md-4">
                    <label for="is_published" class="col-form-label">Publishing Status</label>
                    <div>
                      <select
                        id="is_published"
                        v-model="publication.is_published"
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
                <canvas ref="thumbnailCanvas" style="display: none"></canvas>

                <button :disabled="isLoading || isProcessing" class="btn btn-primary mt-3">
                  <span>{{ isLoading || isProcessing ? 'Processing...' : 'Save' }}</span>
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
import '../../assets/sass/forms/file-upload-with-preview.min.css';
import FileUploadWithPreview from 'file-upload-with-preview';
import { quillEditor } from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';
import { reactive, onMounted, ref } from 'vue';
import usePublications from '@/composables/publications';

const isProcessing = ref(false);

const {
    storePublication,
    validationErrors,
    isLoading,
    publication,
} = usePublications();



// Helper function to convert base64 to File object
const base64ToFile = (base64String, filename) => {
    // Extract the data part from base64 string
    const base64WithoutPrefix = base64String.split(',')[1];

    // Convert base64 to blob
    const byteString = atob(base64WithoutPrefix);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: 'image/jpeg' });

    // Create File object
    return new File([blob], filename, { type: 'image/jpeg' });
};

async function submitForm() {
    isProcessing.value = true;
    try {
        if (publication.value?.publication_file) {
            const file = publication.value.publication_file;
            const arrayBuffer = await file.arrayBuffer();

            const { thumbnailBase64, width, height } = await generateThumbnail(arrayBuffer);
            if (thumbnailBase64) {
                // Generate a filename for the thumbnail
                const originalName = file.name;
                const thumbnailName = `thumbnail-${originalName.replace('.pdf', '')}-${width}x${height}.jpg`;

                // Convert base64 to File object
                const thumbnailFile = base64ToFile(thumbnailBase64, thumbnailName);

                // Assign the File object to your publication
                publication.value.thumbnail_path = thumbnailFile;
            } else {
                console.error('Failed to generate thumbnail');
                return;
            }
        }
        storePublication(publication.value, true);
    } catch (error) {
        console.error('Error submitting form:', error);
    } finally {
        isProcessing.value = false;
    }
}

const thumbnailCanvas = ref(null);

const loadPdfJS = async () => {
    if (window.pdfjsLib) return window.pdfjsLib;

    await Promise.all([
        new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        }),
        new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        }),
    ]);

    await new Promise(resolve => setTimeout(resolve, 100));
    return window.pdfjsLib;
};

const generateThumbnail = async (pdfData, scale = 0.5) => {
    try {
        const pdfjsLib = await loadPdfJS();
        const typedArray = new Uint8Array(pdfData);

        const loadingTask = pdfjsLib.getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale });
        const canvas = thumbnailCanvas.value;
        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport: viewport,
        }).promise;

        // Get base64 string
        const thumbnailBase64 = canvas.toDataURL('image/jpeg', 0.8);

        // Return the base64 string along with width and height
        return { thumbnailBase64, width: viewport.width, height: viewport.height };
    } catch (error) {
        console.error('Error generating thumbnail:', error);
        return null;
    }
};

onMounted(() => {
    new FileUploadWithPreview('myFirstImage', {
        images: {
            baseImage: '/assets/images/file-preview-pdf.png',
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
