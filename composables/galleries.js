import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiRequest } from "../utils/api";
import { Modal } from "ant-design-vue";

export default function useGallery() {
  const galleries = ref([]);
  const galleryList = ref([]);

  const gallery = ref({
    name: "",
    gallery_introduction: "",
    gallery_type: "",
    main_image_path: "",
    is_published: "",
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);

  const getGalleries = async (
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
        `/api/galleries?page=${page}&search_id=${search_id}&search_title=${search_title}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`
      );
      galleries.value = response;
      console.log(response);
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getGallery = async (id) => {
    try {
      const response = await apiRequest("get", `/api/galleries/${id}`);
      gallery.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const storeGallery = async (gallery, files) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();

    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      serializedPost.append("gallery_gallery[" + i + "]", file);
    }

    for (let item in gallery) {
      if (gallery.hasOwnProperty(item)) {
        serializedPost.append(item, gallery[item]);
      }
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      await apiRequest("post", "/api/galleries", serializedPost, config);
      router.push({ name: "gallery.index" });
      // Reset the form values
      gallery.name = null;
      gallery.gallery_introduction = null;
      gallery.company_involvement = null;
      gallery.collaborations_and_partnership = null;
      gallery.main_image_path = null;
      gallery.gallery_gallery = null;

      showToast("Gallery saved successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const updateGallery = async (gallery, files) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();

    if (files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        serializedPost.append("gallery_gallery[" + i + "]", file);
      }
    }

    for (let item in gallery) {
      if (gallery.hasOwnProperty(item) && item !== "categories") {
        let value = gallery[item];
        if (
          value === null &&
          (item === "weight" ||
            item === "length" ||
            item === "height" ||
            item === "width" ||
            item === "quantity" ||
            item === "cost_price" ||
            item === "retail_price")
        ) {
          value = 0;
        }
        serializedPost.append(item, value);
      }
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      await apiRequest(
        "put",
        `/api/galleries/${gallery.id}`,
        serializedPost,
        config
      );
      router.push({ name: "gallery.index" });
      showToast("Gallery updated successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteGallery = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        apiRequest("delete", `/api/galleries/${id}`).then(() => {
          getGalleries();
          router.push({ name: "gallery.index" });
          showToast("Gallery deleted successfully", "success");
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteGalleryImage = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        apiRequest("delete", `/api/gallery-images/${id}`)
          .then(() => {
            getGalleries();
            router.go(0);
            showToast("Image deleted successfully", "success");
          })
          .catch(() => {
            showToast("Something went wrong", "error");
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getGalleryList = async () => {
    try {
      const response = await apiRequest("get", "/api/gallery-list");
      galleryList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  return {
    galleryList,
    galleries,
    gallery,
    getGalleries,
    getGalleryList,
    getGallery,
    storeGallery,
    updateGallery,
    deleteGallery,
    deleteGalleryImage,
    validationErrors,
    isLoading,
  };
}
