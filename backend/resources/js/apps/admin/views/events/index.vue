<template>
  <div class="layout-px-spacing">
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
                  <span>View Events</span>
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
                <h3><b>View Events</b></h3>
              </div>
            </div>
          </div>

          <div class="custom-table">
            <CustomDataTable :columns="columns" :data="events" :options="tableOptions">
              <template #event_image="{ cellData }">
                <img
                  :src="'/storage/' + cellData
                  "
                  class="rounded profile-img"
                  alt="avatar"
                />
              </template>
              <template #is_published="{ cellData }">
                <span v-if="cellData === 1" class="badge badge-success inv-status">Published</span>

                <span v-else class="badge badge-danger inv-status">Not
                  Published</span>
              </template>
              <template #actions="{ rowData }">
                <!-- v-if="can('event-edit')"  -->
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

                <!--  v-if="can('event-delete')" -->
                <button
                  class="ms-2 badge bg-danger"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  @click.prevent="deleteEvent(rowData.id)"
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

import { useRouter } from 'vue-router';

import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'View Events' });

import useEvents from '@/composables/events';
import CustomDataTable from '@/Components/CustomDataTable.vue';

const router = useRouter();

const { events, getEvents, deleteEvent } = useEvents();

const columns = [
    { data: 'name', title: 'Title' },
    { data: 'main_image_path', title: 'Image' },
    { data: 'is_published', title: 'Status' },
    { data: 'created_at', title: 'Created Date' },
    { title: 'Actions' },
];

const tableOptions = ref({
    columnDefs: [
        { data: null, targets: -1, orderable: false, searchable: false, render: '#actions' },
        { data: 'main_image_path', targets: 1, render: '#event_image' },
        { data: 'is_published', targets: 2, render: '#is_published' },
    ],
});

const navigateToEdit = (id) => {
    router.push({ name: 'events.edit', params: { id } });
};

onMounted(() => {
    getEvents();
});
</script>
