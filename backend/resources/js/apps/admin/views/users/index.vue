<template>
  <div class="layout-px-spacing">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Users</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>View Users</span>
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
                <h3><b>View Users</b></h3>
              </div>
            </div>
          </div>

          <div class="custom-table">
            <CustomDataTable :columns="columns" :data="users" :options="tableOptions">
              <template #role="{ cellData }">
                <span :class="['badge', cellData === 1 ? 'bg-primary' : 'bg-secondary']">
                  {{ cellData === 1 ? 'Admin' : 'User' }}
                </span>
              </template>
              <template #actions="{ rowData }">
                <a
                  href="#"
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
                </a>

                <a
                  href="javascript:;"
                  class="ms-2 badge bg-danger"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  @click.prevent="deleteUser(rowData.id)"
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
                </a>
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
import CustomDataTable from '@/Components/CustomDataTable.vue';
import useUsers from '@/composables/users';
import { useMeta } from '../../composables/use-meta';
import { useRouter } from 'vue-router';

useMeta({ title: 'View User' });

const router = useRouter();

const navigateToEdit = (id) => {
    router.push({ name: 'users.edit', params: { id } });
};

const { users, getUsers, deleteUser } = useUsers();

onMounted(() => {
    getUsers();
});


const columns = ref([
    { data: 'name', title: 'Name' },
    { data: 'email', title: 'Email' },
    { data: 'role', title: 'Role' },
    { data: 'created_at', title: 'Created Date' },
    { title: 'Actions' },
]);

const tableOptions = ref({
    columnDefs: [
        { data: null, targets: -1, orderable: false, searchable: false, render: '#actions' },
        { data: 'role', targets: 2, render: '#role' },
    ],
});
</script>
