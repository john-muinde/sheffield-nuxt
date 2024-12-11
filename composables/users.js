import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiRequest } from "../utils/api";
import { Modal } from "ant-design-vue";

export default function useUsers() {
  const users = ref([]);
  const user = ref({
    id: "",
    name: "",
    email: "",
    role: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);

  const getUsers = async ({
    page = 1,
    search_id = "",
    search_title = "",
    search_global = "",
    order_column = "created_at",
    order_direction = "desc",
  } = {}) => {
    try {
      const response = await apiRequest(
        "get",
        `/api/users?page=${page}&search_id=${search_id}&search_title=${search_title}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`
      );
      users.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getUser = async (id) => {
    try {
      const response = await apiRequest("get", `/api/users/${id}`);
      user.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const storeUser = async (user) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();
    for (let item in user) {
      if (user.hasOwnProperty(item)) {
        serializedPost.append(item, user[item]);
      }
    }

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      await apiRequest("post", "/api/users", serializedPost, config);
      router.push({ name: "users.index" });
      showToast("User saved successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const updateUser = async (user) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    try {
      await apiRequest("put", `/api/users/${user.id}`, user);
      router.push({ name: "users.index" });
      showToast("User updated successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteUser = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        apiRequest("delete", `/api/users/${id}`).then(() => {
          getUsers();
          router.push({ name: "users.index" });
          showToast("User deleted successfully", "success");
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return {
    users,
    user,
    getUsers,
    getUser,
    storeUser,
    updateUser,
    deleteUser,
    validationErrors,
    isLoading,
  };
}
