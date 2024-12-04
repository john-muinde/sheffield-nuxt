<!-- DataTable.vue -->
<template>
  <div class="custom-datatable">
    <div class="card">
      <div class="card-body">
        <DataTable
          :options="mergedOptions"
          :columns="columns"
          :data="data"
          class="table table-striped nowrap w-100"
        >
          <slot></slot>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  computed } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-responsive-bs5';

DataTable.use(DataTablesCore);

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const defaultOptions = {
  responsive: true,
  dom:
    '<"row mb-3"<"col-sm-12 col-md-6"B><"col-sm-12 col-md-6 d-flex justify-content-end"f>>' +
    '<"row"<"col-sm-12"tr>>' +
    '<"row mt-3"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
  buttons: [
    {
      extend: 'collection',
      className: 'btn btn-secondary dropdown-toggle',
      text: '<i class="fas fa-download"></i>',
      buttons: [
        {
          extend: 'excel',
          className: 'dropdown-item',
          text: '<i class="fas fa-file-excel me-2"></i>Excel',
          exportOptions: {
            columns: ':not(:last-child)',
          },
        },
        {
          extend: 'pdf',
          className: 'dropdown-item',
          text: '<i class="fas fa-file-pdf me-2"></i>PDF',
          exportOptions: {
            columns: ':not(:last-child)',
          },
        },
        {
          extend: 'print',
          className: 'dropdown-item',
          text: '<i class="fas fa-print me-2"></i>Print',
          exportOptions: {
            columns: ':not(:last-child)',
          },
        },
      ],
    },
  ],
  pageLength: 10,
  lengthMenu: [
    [5, 10, 25, 50, -1],
    [5, 10, 25, 50, 'All'],
  ],
  processing: true,
  language: {
    search: '',
    searchPlaceholder: 'Search...',
    paginate: {
      previous: '&lt;',
      next: '&gt;',
    },
  },
};

const mergedOptions = computed(() => ({
  ...defaultOptions,
  ...props.options,
}));
</script>

<style>
@import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
@import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
@import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
@import "@fortawesome/fontawesome-free/css/all.css";

.custom-datatable .card {
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, 0.05);
}

.custom-datatable .dataTables_filter {
  margin-bottom: 0.5rem;
}

.custom-datatable .dataTables_filter input {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  margin-left: 0.5rem;
}

.custom-datatable .btn-secondary {
  margin-right: 0.5rem;
}

.custom-datatable .dt-buttons .dropdown-menu {
  padding: 0.5rem 0;
}

.custom-datatable .dt-buttons .dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.custom-datatable .dt-buttons .dropdown-item:hover {
  background-color: #f8f9fa;
}

.custom-datatable .table > :not(caption) > * > * {
  padding: 1rem 1rem;
}

.custom-datatable .dataTables_paginate {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.custom-datatable .page-link {
  padding: 0.375rem 0.75rem;
}

.custom-datatable .dataTables_info {
  padding-top: 0.85rem;
}

/* Responsive table styles */
.custom-datatable
  table.dataTable.dtr-inline.collapsed
  > tbody
  > tr
  > td.dtr-control:before,
.custom-datatable
  table.dataTable.dtr-inline.collapsed
  > tbody
  > tr
  > th.dtr-control:before {
  top: 50%;
  transform: translateY(-50%);
  background-color: #6c757d;
}

/* Fix dropdown button appearance */
.custom-datatable .dt-button-collection {
  width: auto !important;
}

.custom-datatable .dt-button-collection .dropdown-item {
  padding: 0.5rem 1rem;
  margin: 0;
  border-radius: 0;
}

.custom-datatable .buttons-collection {
  border-radius: 0.25rem;
}

.custom-datatable table.dataTable {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
