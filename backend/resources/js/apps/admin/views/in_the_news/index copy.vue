<!-- NewsView.vue -->
<template>
    <div class="layout-px-spacing">
        <div class="row layout-top-spacing">
            <div class="col-12">
                <div class="page-header mb-4">
                    <h3 class="fw-bold">View In the News</h3>
                </div>

                <CustomDataTable :columns="columns" :data="tableData" :options="tableOptions">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>File</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </CustomDataTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { format } from 'date-fns';
import CustomDataTable from '@/Components/CustomDataTable.vue';
import useNews from "@/composables/news";

const { getNews, allNews, deleteNews } = useNews();
const tableData = ref([]);

const columns = [
    {
        data: 'name',
        title: 'Title',
    },
    {
        data: 'file_path',
        title: 'File',
        render: (data: string) => {
            return `<a href="/storage/${data}" target="_blank" class="text-primary">View File</a>`;
        }
    },
    {
        data: 'is_published',
        title: 'Status',
        render: (data: boolean) => {
            return data
                ? '<span class="badge bg-success">Published</span>'
                : '<span class="badge bg-danger">Draft</span>';
        }
    },
    {
        data: 'created_at',
        title: 'Created Date',
        render: (data: string) => {
            return format(new Date(data), 'MMM dd, yyyy');
        }
    },
    {
        data: 'id',
        title: 'Actions',
        orderable: false,
        searchable: false,
        render: (data: number) => {
            return `<button class="btn btn-sm btn-danger delete-btn" data-id="${data}">
                        <i class="fas fa-trash"></i>
                    </button>`;
        }
    }
];

const tableOptions = ref({
    drawCallback: function (settings: any) {
        const table = settings.oInstance.api();
        table.rows().nodes().each((row: HTMLElement) => {
            const deleteBtn = row.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', async (e: Event) => {
                    const id = (e.target as HTMLElement).getAttribute('data-id');
                    if (id && confirm('Are you sure you want to delete this news item?')) {
                        await handleDelete(parseInt(id));
                    }
                });
            }
        });
    }
});

const handleDelete = async (id: number) => {
    try {
        await deleteNews(id);
        await fetchData();
    } catch (error) {
        console.error('Failed to delete news item:', error);
    }
};

const fetchData = async () => {
    try {
        await getNews();
        tableData.value = Array.isArray(allNews.value) ? allNews.value : [];
    } catch (error) {
        console.error('Failed to fetch news:', error);
    }
};

onMounted(() => {
    fetchData();
});
</script>
