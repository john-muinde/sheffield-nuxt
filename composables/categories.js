import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiRequest } from "../utils/api";
import { Modal } from "ant-design-vue";

export default function useCategories() {
  const categories = ref([]);
  const categoryList = ref([]);
  const categoryMainList = ref([]);
  const category = ref({
    name: "",
    description: "",
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);

  const getCategories = async ({
    page = 1,
    per_page = 20,
    category_id = null,
    mainCategory = null,
    search = null,
    filter_category_id = "",
  } = {}) => {
    try {
      const url = `/api/get-categories?page=${page}&per_page=${per_page}&category_id=${category_id}&mainCategory=${mainCategory}&search=${search}&filter_category_id=${filter_category_id}`;
      const response = await apiRequest("get", url);
      categories.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const updateDatabaseOrder = async (formData) => {
    try {
      // Make a POST request using Axios
      await apiRequest("post", "/api/categories-update-order", {
        data: formData,
      });
      showToast("Category order updated successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getCategory = async (id) => {
    try {
      const response = await apiRequest("get", `/api/categories/${id}`);
      console.log(response);
      category.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const storeCategory = async (category) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    try {
      await apiRequest("post", "/api/categories", category);
      router.push({ name: "categories.index" });
      showToast("Category saved successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCategory = async (category) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    try {
      await apiRequest("put", `/api/categories/${category.id}`, category);
      router.push({ name: "categories.index" });
      showToast("Category updated successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCategory = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        apiRequest("delete", `/api/categories/${id}`).then(() => {
          getCategories();
          router.push({ name: "categories.index" });
          showToast("Category deleted successfully", "success");
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getCategoryList = async (id = "") => {
    try {
      const response = await apiRequest(
        "get",
        "/api/category-list?exclude_id=" + id
      );
      categoryList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getMainCategoryList = async () => {
    try {
      const response = await apiRequest("get", "/api/category-main");
      categoryMainList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getSelectedCategoryList = async (id) => {
    try {
      const response = await apiRequest("get", `/api/category-list/${id}`);
      categoryList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  return {
    categoryList,
    categoryMainList,
    categories,
    category,
    updateDatabaseOrder,
    getCategories,
    getMainCategoryList,
    getSelectedCategoryList,
    getCategoryList,
    getCategory,
    storeCategory,
    updateCategory,
    deleteCategory,
    validationErrors,
    isLoading,
  };
}
