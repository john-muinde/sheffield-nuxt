<!-- CustomDataTable.vue -->
<template>
  <div class="custom-datatable">
    <div class="card">
      <div class="card-body">
        <table ref="tableRef" class="table table-striped nowrap w-100">
          <slot name="thead"></slot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, onUnmounted, defineComponent, createApp, h } from 'vue';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import DataTablesLib from 'datatables.net';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-responsive-bs5';
import router from '@/router/index';

import jszip from 'jszip';
import pdfmake from 'pdfmake';

DataTablesLib.Buttons.jszip(jszip);
DataTablesLib.Buttons.pdfMake(pdfmake);

export default defineComponent({
    name: 'CustomDataTable',

    props: {
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
    },

    emits: ['row-clicked'],

    setup(props, { emit, slots }) {
        const tableRef = ref(null);
        let dataTable = null;

        const defaultOptions = {
            responsive: true,
            dom: '<"row mb-3"<"col-sm-12 col-md-6"B><"col-sm-12 col-md-6 d-flex justify-content-end"f>>' +
                '<"row"<"col-sm-12"tr>>' +
                '<"row mt-3"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
            buttons: [
                {
                    extend: 'collection',
                    className: 'btn btn-secondary dropdown-toggle',
                    text: '<i class="fas fa-download"></i>',
                    buttons: [
                        {
                            extend: 'copy',
                            className: 'dropdown-item',
                            text: '<i class="fas fa-copy me-2"></i>Copy',
                            exportOptions: {
                                columns: ':not(:last-child)',
                            },
                        },
                        {
                            extend: 'csv',
                            className: 'dropdown-item',
                            text: '<i class="fas fa-file-csv me-2"></i>CSV',
                            exportOptions: {
                                columns: ':not(:last-child)',
                            },
                        },
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
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'All']],
            processing: true,
            language: {
                search: '',
                searchPlaceholder: 'Search...',
                zeroRecords: 'No matching records found',
                emptyTable: 'No data available in table',
                info: 'Showing _START_ to _END_ of _TOTAL_ entries',
                infoEmpty: 'Showing 0 to 0 of 0 entries',
                paginate: {
                    previous: '&lt;',
                    next: '&gt;',
                },
            },
        };

        const renderSlotContent = (slotName, data, columnData) => {
            const slot = slots[slotName];
            if (!slot) return columnData;

            const container = document.createElement('div');
            createApp({
                render() {
                    return slot({ rowData: data, cellData: columnData });
                },
            }).use(router)
                .mount(container);

            return container.innerHTML;
        };

        const initializeDataTable = () => {
            if (!tableRef.value) return;

            const processedColumns = props.columns.map(column => ({
                ...column,
                render: (data, type, row) => {
                    if (type === 'display') {
                        const slotName = `column-${column.data}`;
                        if (slots[slotName]) {
                            return renderSlotContent(slotName, row, data);
                        }
                    }
                    return data;
                },
            }));

            const mergedOptions = {
                ...defaultOptions,
                ...props.options,
                columns: processedColumns,
                data: props.data,
            };

            dataTable = $(tableRef.value).DataTable(mergedOptions);

            $(tableRef.value).on('click', 'td', function () {
                const rowData = dataTable.row($(this).closest('tr')).data();
                emit('row-clicked', rowData);
            });
        };

        watch(() => props.data, (newData) => {
            if (dataTable) {
                dataTable.clear();
                dataTable.rows.add(newData);
                dataTable.draw();
            }
        }, { deep: true });

        onMounted(() => {
            initializeDataTable();
        });

        onUnmounted(() => {
            if (dataTable) {
                dataTable.destroy();
                dataTable = null;
            }
        });

        return {
            tableRef,
        };
    },
});
</script>

<style>
@import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
@import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
@import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
@import '@fortawesome/fontawesome-free/css/all.css';

.custom-datatable .card {
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0 0.875rem 0 rgba(33, 37, 41, .05);
}

.custom-datatable .dataTables_wrapper {
    padding: 1rem;
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

.custom-datatable .table> :not(caption)>*>* {
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

.custom-datatable table.dataTable {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    width: 100% !important;
}

.custom-datatable .dataTables_empty {
    text-align: center;
    padding: 2rem !important;
    background-color: #f8f9fa;
    color: #6c757d;
}
</style>
