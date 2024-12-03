import { ref } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";

export default function useCareers() {
  const careers = ref([]);
  const careerList = ref([]);
  const career = ref({
    title: "",
    department: "",
    location: "",
    education: "",
    experience: "",
    deadline: "",
    description: "",
    responsibilities: "",
    requirements: "",
    is_published: "",
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);

  const getCareers = async (
    page = 1,
    search_id = "",
    search_title = "",
    search_global = "",
    order_column = "created_at",
    order_direction = "desc"
  ) => {
    try {
      const response = await apiRequest(
        "get",
        `/api/careers?page=${page}&search_id=${search_id}&search_title=${search_title}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`
      );
      careers.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getCareer = async (id) => {
    try {
      const response = await apiRequest("get", `/api/careers/${id}`);
      career.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const storeCareer = async (career) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();
    for (let item in career) {
      if (career.hasOwnProperty(item)) {
        serializedPost.append(item, career[item]);
      }
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      await apiRequest("post", "/api/careers", serializedPost, config);
      router.push({ name: "careers.create" });
      // Reset the form values
      Object.keys(career).forEach((key) => (career[key] = ""));
      showToast("success", "Career saved successfully");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCareer = async (career) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();
    for (let item in career) {
      if (career.hasOwnProperty(item)) {
        serializedPost.append(item, career[item]);
      }
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      await apiRequest(
        "put",
        `/api/careers/${career.id}`,
        serializedPost,
        config
      );
      router.push({ name: "careers.index" });
      showToast("success", "Career updated successfully");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCareer = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        try {
          await apiRequest("delete", `/api/careers/${id}`);
          getCareers();
          router.push({ name: "careers.index" });
          showToast("success", "Career deleted successfully");
        } catch (errors) {
          showToast("error", "Something went wrong");
        }
      },
    });
  };

  const getCareerList = async () => {
    try {
      const response = await apiRequest("get", "/api/career-list");
      careerList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  return {
    careerList,
    careers,
    career,
    getCareers,
    getCareerList,
    getCareer,
    storeCareer,
    updateCareer,
    deleteCareer,
    validationErrors,
    isLoading,
  };
}
