<template>
  <div class="layout-px-spacing">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Categories</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>View Categories</span>
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
                <h3><b>View Categories</b></h3>
              </div>
            </div>
          </div>

          <div class="panel-body">
            <div class="row d-flex align-items-center justify-content-between">
              <div class="form-group col-md-1">
                <label for="post-category" class="form-label">Per Page</label>
                <select id="perpage" v-model="category.perPage" class="form-control form-select select">
                  <option selected value="20">
                    20
                  </option>
                  <option value="60">
                    60
                  </option>
                  <option value="100">
                    100
                  </option>
                  <option value="500">
                    500
                  </option>
                  <option value="1000">
                    1000
                  </option>
                  <option value="10000">
                    10000
                  </option>
                </select>
              </div>

              <div class="form-group col-md-3">
                <label for="post-category" class="form-label">Segment</label>
                <multiselect
                  v-model="category.main_category"
                  :options="categoryMainList"
                  :reduce="(category) => category.id"
                  :searchable="true"
                  :preselect-first="true"
                  track-by="name"
                  label="name"
                  placeholder="Choose Segment ..."
                  selected-label=""
                  select-label=""
                  deselect-label=""
                />
              </div>

              <div class="form-group col-md-3">
                <label for="post-category" class="form-label">Main Category</label>
                <multiselect
                  v-model="category.filter_category_id"
                  :options="categoryList"
                  :reduce="(category) => category.id"
                  :searchable="true"
                  :preselect-first="true"
                  track-by="id"
                  label="name"
                  placeholder="Choose Category (Optional) ..."
                  selected-label=""
                  select-label=""
                  deselect-label=""
                />
              </div>

              <div class="form-group col-md-4">
                <label for="post-name">Search</label>
                <input
                  id="post-name"
                  v-model="category.search"
                  type="text"
                  class="form-control"
                  placeholder="Search ..."
                />

                <!-- <div class="text-danger mt-1">
                                    {{ errors.name }}
                                </div>
                                <div class="text-danger mt-1">
                                    <div v-for="message in validationErrors?.name">
                                        {{ message }}
                                    </div>
                                </div> -->
              </div>
            </div>

            <div class="table-responsive">
              <table
                id="__BVID__415"
                role="table"
                aria-busy="false"
                aria-colcount="5"
                class="table table-striped table-bordered"
              >
                <thead role="rowgroup">
                  <tr role="row">
                    <th
                      v-if="category.main_category !== ''"
                      role="columnheader"
                      scope="col"
                      aria-colindex="0"
                    >
                      <div></div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="1">
                      <div>Name</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="2">
                      <div>Description</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="3">
                      <div>Parent Category</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="4">
                      <div>Status</div>
                    </th>
                    <th role="columnheader" scope="col" aria-colindex="5">
                      <div>Created At</div>
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="6"
                      aria-label="Action"
                      class="text-center"
                    >
                      <div>action</div>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  <draggable
                    id="left-lovehandles"
                    v-model="displayedProducts"
                    class="drag-drop"
                    group="drag_handle"
                    handle=".handle"
                    ghost-class="gu-transit"
                    drag-class="el-drag-ex-5"
                    :animation="200"
                    @start="onDragStart"
                    @end="onDragEnd"
                  >
                    <tr
                      v-for="the_category in displayedProducts"
                      :key="the_category.id"
                      role="row"
                      class=""
                    >
                      <td
                        v-if="
                          category.main_category !==
                            ''
                        "
                        aria-colindex="0"
                        class="handle"
                      >
                        <div>
                          <span><i class="far fa-clone"></i></span>
                        </div>
                      </td>

                      <td aria-colindex="1" role="cell">
                        {{ the_category.name }}
                      </td>
                      <td aria-colindex="2" role="cell">
                        {{ the_category.description }}
                      </td>
                      <td aria-colindex="3" role="cell">
                        {{
                          the_category.parent
                            ? the_category.parent
                              .name
                            : "----"
                        }}
                      </td>
                      <td aria-colindex="4" role="cell">
                        <span
                          v-if="
                            the_category.is_published ===
                              1
                          "
                          class="badge badge-success inv-status"
                        >Published</span>

                        <span
                          v-if="
                            the_category.is_published !==
                              1
                          "
                          class="badge badge-danger inv-status"
                        >Not Published</span>
                      </td>
                      <td aria-colindex="5" role="cell">
                        {{ formatDate(the_category.created_at) }}
                      </td>

                      <td aria-colindex="6" role="cell" class="text-center">
                        <router-link
                          :to="{
                            name: 'categories.edit',
                            params: {
                              id: the_category.id,
                            },
                          }"
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
                            <path
                              d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                            />
                          </svg>
                        </router-link>

                        <!--  v-if="can('category-delete')" -->

                        <a
                          href="javascript:;"
                          class="ms-2 badge bg-danger"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          @click.prevent="
                            deleteCategory(
                              the_category.id
                            )
                          "
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
                      </td>
                    </tr>
                  </draggable>
                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation" style="margin-top: 20px">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <router-link
                    class="page-link page-link-prev"
                    :to="getCategoryLink(the_category.id, 1)
                    "
                    aria-label="Previous"
                    tabindex="-1"
                    aria-disabled="true"
                    @click="goToPreviousPage"
                  >
                    <span aria-hidden="true"><i class="icon-long-arrow-left"></i></span>
                    Prev
                  </router-link>
                </li>

                <li
                  v-for="page in generatePageLinks"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                >
                  <template v-if="isInteger(page)">
                    <router-link
                      class="page-link"
                      :to="getCategoryLink(
                        the_category.id,
                        page
                      )
                      "
                      @click="goToThisPage(page)"
                    >
                      {{ page }}
                    </router-link>
                  </template>
                </li>

                <li
                  class="page-item"
                  :class="{
                    disabled: currentPage === totalPages,
                  }"
                >
                  <router-link
                    class="page-link page-link-next"
                    :to="getCategoryLink(
                      the_category.id,
                      totalPages
                    )
                    "
                    aria-label="Next"
                    @click="goToNextPage"
                  >
                    Last
                    <span aria-hidden="true"><i class="icon-long-arrow-right"></i></span>
                  </router-link>
                </li>

                <li
                  class="page-item"
                  :class="{
                    disabled: currentPage === totalPages,
                  }"
                >
                  <router-link
                    class="page-link page-link-next"
                    :to="getCategoryLink(
                      the_category.id,
                      currentPage + 1
                    )
                    "
                    aria-label="Next"
                    @click="goToNextPage"
                  >
                    Next
                    <span aria-hidden="true"><i class="icon-long-arrow-right"></i></span>
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, watchEffect } from 'vue';

import '../../assets/sass/scrollspyNav.scss';
import '../../assets/sass/drag-drop/drag-drop.css';
import '../../assets/sass/font-icons/fontawesome/css/regular.css';
import '../../assets/sass/font-icons/fontawesome/css/fontawesome.css';
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import { formatDate } from '@/utils';
import { useRoute } from 'vue-router';


import { useMeta } from '../../composables/use-meta';
useMeta({ title: 'View Categories' });


import { useField } from 'vee-validate';

import useCategories from '@/composables/categories';


import axiosInstance from '../../../../axiosInstance';

const {
    getCategoryList,
    categoryList,
    getMainCategoryList,
    categoryMainList,
    getSelectedCategoryList,
    deleteCategory,
    updateDatabaseOrder,
} = useCategories();

const route = useRoute();

const currentPage = ref(route.params.page ? convertToNumberOrNull(route.params.page) : 1);
//const perPage = ref(20);
const totalProducts = ref(0);
const totalCountperPage = ref(0);
const category_id = ref(route.params.id ? convertToNumberOrNull(route.params.id) : 1);
const categories = ref([]);
const the_category = ref([]);

const { value: perPage } = useField('perPage', null, { initialValue: '20' });
const { value: filter_category_id } = useField('filter_category_id', null, {
    initialValue: '',
});
const { value: main_category } = useField('main_category', null, {
    initialValue: '',
});
const { value: search } = useField('search', null, { initialValue: '' });

const category = reactive({
    perPage,
    filter_category_id,
    main_category,
    search,
});

// Fetch products based on the current page
const fetchCategories = async () => {
    try {
        if (category.main_category != '' && category.search == '') {
            category.perPage = 10000;
        }

        const response = await axiosInstance.get('/api/get-categories', {
            params: {
                page: currentPage.value,
                per_page: category.perPage,
                category_id: category_id.value,
                mainCategory: category.main_category.id,
                search: category.search,
                filter_category_id: category.filter_category_id?.id || null,
            },
        });

        totalProducts.value = response.data.categories.total;
        totalCountperPage.value = response.data.categories.data.length;
        categories.value = response.data.categories.data;
    } catch (error) {
        console.error(error);
    }
};

// Determine the total number of pages
const totalPages = computed(() => {
    return Math.ceil(totalProducts.value / perPage.value);
});

// Displayed products based on the current page
const displayedProducts = ref([]);

// Go to the previous page
const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Go to the next page
const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const goToThisPage = (page) => {
    currentPage.value = page;
};

// Update displayedProducts based on the current page and products
const updateDisplayedProducts = () => {
    const startIndex = 0;
    displayedProducts.value = categories.value.slice(
        startIndex,
        startIndex + perPage.value,
    );
};

const isInteger = (value) => {
    return Number.isInteger(value);
};

// Generate the page links
const generatePageLinks = computed(() => {
    const pageLinks = [];
    const maxVisiblePages = 5; // Maximum number of visible page links

    // Add previous link
    if (currentPage.value > 1) {
        pageLinks.push('Prev');
    }

    // Add current page and surrounding pages
    let startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxVisiblePages / 2),
    );
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
        pageLinks.push(page);
    }

    // Add next link
    if (currentPage.value < totalPages.value) {
        pageLinks.push('Next');
    }

    return pageLinks;
});

const getCategoryLink = (id, page) => {
    return `/admin/categories/page/${page}`;
};

// Initial fetch of products
onMounted(() => {
    fetchCategories();
    getMainCategoryList();
});

// Watch for changes in the currentPage and fetch products accordingly
watch([currentPage, category], fetchCategories);

watch(main_category, (newValue) => {
    //
    if (main_category) {
        const selectedCategoryId = category.main_category.id;

        category.filter_category_id = null;

        const selectedCategoryList =
            getSelectedCategoryList(selectedCategoryId);
        //solution.categories = selectedCategoryList; //
    }
});

watch([category, main_category, filter_category_id, categories], updateDisplayedProducts);

const convertToNumberOrNull = (value) => {
    const val = value === '' ? null : parseInt(value);
    return isNaN(val) ? null : val;
};

watchEffect(() => {
    const params = route.params;
    if (params.id !== '' && category_id.value !== convertToNumberOrNull(params.id)) {
        currentPage.value = 1;
        category_id.value = convertToNumberOrNull(params.id);
        fetchCategories();
    }
});

const onDragStart = () => {
    displayedProducts.value.forEach((category) => {
        category.order = null;
    });
};

const onDragEnd = (event) => {
    const newOrder = displayedProducts.value.map((category) => category.id);
    updateDatabaseOrder(newOrder);
    displayedProducts.value.forEach((category) => {
        const index = newOrder.indexOf(category.id);
        category.order = index + 1;
    });
};
</script>

<style>
#left-lovehandles {
    display: contents !important;
}

#left-lovehandles td {
    padding-left: 5px;
}

#left-lovehandles td i {
    color: #c02434;
}
</style>
