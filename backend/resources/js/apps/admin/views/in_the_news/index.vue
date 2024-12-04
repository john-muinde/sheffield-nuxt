<template>
  <div class="layout-px-spacing">
    <div class="row layout-top-spacing">
      <div class="col-12">
        <div class="page-header mb-4">
          <h3 class="fw-bold">
            View In the News
          </h3>
        </div>

        <CustomDataTable :columns="columns" :data="allNews" :options="tableOptions">
          <template #file_path="{ cellData }">
            <a :href="`/storage/${cellData}`" target="_blank" class="text-primary">
              View File
            </a>
          </template>

          <template #is_published="{ cellData }">
            <span :class="['badge', cellData ? 'bg-success' : 'bg-danger']">
              {{ cellData ? 'Published' : 'Draft' }}
            </span>
          </template>

          <template #created_at="{ cellData }">
            {{ format(new Date(cellData), 'MMM dd, yyyy') }}
          </template>

          <template #actions="{ rowData }">
            <div class="d-flex gap-2">
              <a href="#" class="badge bg-info" @click.prevent="navigateToEdit(rowData.id)">
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
              </a>

              <button class="btn btn-sm btn-danger" @click="deleteNews(rowData.id)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </template>
        </CustomDataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { format } from 'date-fns';
import CustomDataTable from '@/Components/CustomDataTable.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToEdit = (id) => {
    router.push({ name: 'events.edit', params: { id } });
};

import useNews from '@/composables/news';

const { getNews, allNews, deleteNews } = useNews();

const columns = [
    { data: 'name', title: 'Title' },
    { data: 'file_path', title: 'File' },
    { data: 'is_published', title: 'Status' },
    { data: 'created_at', title: 'Created Date' },
    { title: 'Actions' },
];

const tableOptions = ref({
    columnDefs: [
        { data: null, targets: -1, orderable: false, searchable: false, render: '#actions' },
        { data: 'file_path', targets: 1, render: '#file_path' },
        { data: 'is_published', targets: 2, render: '#is_published' },
        { data: 'created_at', targets: 3, render: '#created_at' },
    ],
});

onMounted(() => {
    getNews();
});
</script>
