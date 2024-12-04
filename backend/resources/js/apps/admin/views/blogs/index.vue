<template>
  <div class="layout-px-spacing">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Blogs</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>View Blogs</span>
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
                <h3><b>View Blogs</b></h3>
              </div>
            </div>
          </div>
          <div class="custom-table">
            <v-client-table :data="getTableData()" :columns="columns" :options="table_option">
              <template #category="props">
                {{ props.row.category }}
              </template>

              <template #image="props">
                <img :src="'/storage/' + props.row.main_image_path" class="rounded profile-img" alt="avatar" />
              </template>

              <template #is_published="props">
                <span v-if="props.row.is_published === 1" class="badge badge-success inv-status">Published</span>

                <span v-if="props.row.is_published !== 1" class="badge badge-danger inv-status">Not Published</span>
              </template>


              <template #actions="props">
                <!-- v-if="can('category-edit')"  -->

                <router-link
                  :to="{ name: 'blogs.edit', params: { id: props.row.id } }"
                  class="badge bg-info"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
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
                </router-link>

                <!--  v-if="can('category-delete')" -->

                <a
                  href="javascript:;"
                  class="ms-2 badge bg-danger"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  @click.prevent="deleteBlog(props.row.id)"
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
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </a>
              </template>
            </v-client-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

    import {ref, onMounted} from 'vue';

    import { useMeta } from '../../composables/use-meta';
    useMeta({ title: 'View Blogs' });

    import useBlogs from '@/composables/blogs';

    const {blogs, getBlogs, deleteBlog} = useBlogs();


    onMounted(() => {
        getBlogs();
    });

    const getTableData = () => {
      return blogs.value && Array.isArray(blogs.value.data)
        ? blogs.value.data
        : [];
    };



    const columns = ref(['image', 'name', 'is_published', 'created_at', 'actions']);

    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50, 100, 500, 1000],
        skin: 'table table-hover table-striped',
        columnsClasses: { actions: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:',
        },
        sortable: ['name', 'is_published'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: false,
    });



    const view_row = (item) => {
        alert('ID: ' + item.id + ', Name: ' + item.name);
    };


</script>


