<template>
  <div class="layout-px-spacing">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Videos</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>View Videos</span>
                </li>
              </ol>
            </nav>
          </div>
        </li>
      </ul>
    </teleport>

    <div class="row layout-top-spacing">
      <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
        <div class="panel br-6 p-0">
          <div class="panel-heading pb-0">
            <div class="row">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h3><b>View Videos</b></h3>
              </div>
            </div>
          </div>
          <div class="custom-table">
            <CustomDataTable :columns="columns" :data="videos" :options="tableOptions">
              <template #name="{ cellData }">
                <span>{{ cellData }}</span>
              </template>

              <template #file_path="{ rowData }">
                <a
                  v-if="rowData.type === 'Upload'"
                  class="btn btn-primary"
                  :href="'/storage/' + rowData.file_path"
                  target="_blank"
                >View file</a>
                <a
                  v-else
                  class="btn btn-primary"
                  :href="rowData.video_url"
                  target="_blank"
                >View
                  link</a>
              </template>

              <template #is_published="{ cellData }">
                <span v-if="cellData === 1" class="badge badge-success inv-status">Published</span>
                <span v-else class="badge badge-danger inv-status">Not
                  Published</span>
              </template>
              <template #actions="{ rowData }">
                <!-- v-if="can('category-edit')"  -->
                <button
                  class="badge bg-info"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  @click.prevent="navigateToEdit(rowData.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-edit-2"
                  >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </button>

                <!--  v-if="can('category-delete')" -->
                <button
                  class="ms-2 badge bg-danger"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  @click.prevent="deleteVideo(rowData.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-trash"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    />
                  </svg>
                </button>
              </template>
            </CustomDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'View Videos' });

import useVideos from '@/composables/videos';

import CustomDataTable from '@/Components/CustomDataTable.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToEdit = (id) => {
    router.push({ name: 'videos.edit', params: { id } });
};

const { videos, getVideos, deleteVideo } = useVideos();

onMounted(() => {
    getVideos();
});

const columns = [
    { data: 'name', title: 'Title' },
    { data: 'file_path', title: 'Media Link' },
    { data: 'type', title: 'Media Type' },
    { data: 'is_published', title: 'Status' },
    { data: 'created_at', title: 'Created Date' },
    { title: 'Actions' },
];

const tableOptions = ref({
    columnDefs: [
        { data: null, targets: -1, orderable: false, searchable: false, render: '#actions' },
        { data: 'file_path', targets: 1, render: '#file_path' },
        { data: 'is_published', targets: 3, render: '#is_published' },
    ],
});
</script>
