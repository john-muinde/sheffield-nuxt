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
          <!-- Forward all slots -->
          <template
            v-for="(slotContent, slotName) in $slots"
            :key="slotName"
            #[slotName]="scope"
          >
            <slot :name="slotName" v-bind="scope"></slot>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import {  computed } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-responsive-bs5';

import jszip from 'jszip';
import pdfmake from 'pdfmake';

DataTablesLib.Buttons.jszip(jszip);
DataTablesLib.Buttons.pdfMake(pdfmake);

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
  responsive: {
    details: {
      renderer: DataTablesCore.Responsive.renderer.listHiddenNodes(),
    },
  },
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
            format: {
              body: function (data, row, column, node) {
                if (node && node.querySelector('a')) {
                  const link = node.querySelector('a');
                  const text = link.textContent || link.innerText;
                  const href = link.href;
                  return `<a href="${href}" height="100" width="100">${text}</a>`;
                }

                // HANDLE IMAGES
                if (node && node.querySelector('img')) {
                  const img = node.querySelector('img');
                  const src = img.src;
                  const alt = img.alt || 'image';
                  return `<img src="${src}" height="100" width="100" alt="${alt}" />`;
                }

                if (node && typeof data === 'object' && data !== null) {
                  return node.textContent || node.innerText || '';
                }

                if (
                  !node &&
                  (typeof data === 'string' || typeof data === 'object')
                ) {
                  const parser = new DOMParser();
                  const doc =
                    typeof data === 'object'
                      ? data
                      : parser.parseFromString(data, 'text/html');
                  const link = doc.querySelector('a');
                  const img = doc.querySelector('img');
                  if (link) {
                    const text = link.textContent || link.innerText;
                    const href = link.href;
                    return `<a href="${href}" height="100" width="100">${text}</a>`;
                  }
                  if (img) {
                    const src = img.src;
                    const alt = img.alt || 'image';
                    return `<img src="${src}" height="100" width="100" alt="${alt}" />`;
                  }
                  return doc.textContent || doc.innerText || '';
                }

                return data;
              },
            },
          },
        },
        {
          extend: 'pdfHtml5',
          className: 'dropdown-item',
          text: '<i class="fas fa-file-pdf me-2"></i>PDF',
          exportOptions: {
            columns: ':not(:last-child)',
            format: {
              body: function (data, row, column, node) {
                if (node && node.querySelector('a')) {
                  const link = node.querySelector('a');
                  const text = link.textContent || link.innerText;
                  const href = link.href;
                  return `<a href="${href}" height="100" width="100">${text}</a>`;
                }

                // HANDLE IMAGES
                if (node && node.querySelector('img')) {
                  const img = node.querySelector('img');
                  const src = img.src;
                  const alt = img.alt || 'image';
                  return `<img src="${src}" height="100" width="100" alt="${alt}" />`;
                }

                if (node && typeof data === 'object' && data !== null) {
                  return node.textContent || node.innerText || '';
                }

                if (
                  !node &&
                  (typeof data === 'string' || typeof data === 'object')
                ) {
                  const parser = new DOMParser();
                  const doc =
                    typeof data === 'object'
                      ? data
                      : parser.parseFromString(data, 'text/html');
                  const link = doc.querySelector('a');
                  const img = doc.querySelector('img');
                  if (link) {
                    const text = link.textContent || link.innerText;
                    const href = link.href;
                    return `<a href="${href}" height="100" width="100">${text}</a>`;
                  }
                  if (img) {
                    const src = img.src;
                    const alt = img.alt || 'image';
                    return `<img src="${src}" height="100" width="100" alt="${alt}" />`;
                  }
                  return doc.textContent || doc.innerText || '';
                }

                return data;
              },
            },
          },
        },
        {
          extend: 'print',
          className: 'dropdown-item',
          text: '<i class="fas fa-print me-2"></i>Print',
          exportOptions: {
            columns: ':not(:last-child)',
            format: {
              body: function (data, row, column, node) {
                if (node && node.querySelector('a')) {
                  const link = node.querySelector('a');
                  const text = link.textContent || link.innerText;
                  const href = link.href;
                  return `<a href="${href}" height="100" width="100">${text}</a>`;
                }

                // HANDLE IMAGES
                if (node && node.querySelector('img')) {
                  const img = node.querySelector('img');
                  const src = img.src;
                  const alt = img.alt || 'image';
                  return `<img src="${src}" height="100" width="100" alt="${alt}" />`;
                }

                if (node && typeof data === 'object' && data !== null) {
                  return node.textContent || node.innerText || '';
                }

                if (
                  !node &&
                  (typeof data === 'string' || typeof data === 'object')
                ) {
                  const parser = new DOMParser();
                  const doc =
                    typeof data === 'object'
                      ? data
                      : parser.parseFromString(data, 'text/html');
                  const link = doc.querySelector('a');
                  const img = doc.querySelector('img');
                  if (link) {
                    const text = link.textContent || link.innerText;
                    const href = link.href;
                    return `<a href="${href}" height="100" width="100">${text}</a>`;
                  }
                  if (img) {
                    const src = img.src;
                    const alt = img.alt || 'image';
                    return `<img src="${src}" height="100" width="100" alt="${alt}" />`;
                  }
                  return doc.textContent || doc.innerText || '';
                }

                return data;
              },
            },
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
  ordering: false,
  language: {
    search: '',
    searchPlaceholder: 'Search...',
    paginate: {
      previous: '&lt;',
      next: '&gt;',
    },
  },
};

const mergedOptions = computed(() => {
  return {
    ...defaultOptions,
    ...props.options,
  };
});
</script>

<style>
@import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
@import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
@import "@fortawesome/fontawesome-free/css/all.css";

table.dataTable.dtr-inline.collapsed > tbody > tr > td:first-child,
table.dataTable.dtr-inline.collapsed > tbody > tr > th:first-child {
  padding-left: unset;
}

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

table.dataTable.nowrap th,
table.dataTable.nowrap td {
  white-space: unset;
}

table.dataTable.nowrap th,
table.dataTable.nowrap td:nth-last-child(1) {
  white-space: nowrap;
}

.custom-datatable .table td {
  max-width: 200px;
  /* Adjust this value as needed */
}
</style>
