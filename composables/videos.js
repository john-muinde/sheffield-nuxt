import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiRequest } from "../utils/api";
import { Modal } from "ant-design-vue";

export default function useVideos() {
  const videos = ref([]);
  const videoList = ref([]);
  const video = ref({
    name: "",
    type: "",
    content: "",
    is_published: "",
    shown_in_about_us: "",
    video_url: null,
    main_image_path: null,
    file_path: null,
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);

  const getVideos = async (
    page = 1,
    search_id = "",
    search_title = "",
    search_parent_id = "",
    search_global = "",
    order_column = "created_at",
    order_direction = "desc"
  ) => {
    try {
      const response = await apiRequest(
        "get",
        `/api/videos?page=${page}&search_id=${search_id}&search_title=${search_title}&search_parent_id=${search_parent_id}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`
      );
      videos.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getVideo = async (id) => {
    try {
      const response = await apiRequest("get", `/api/videos/${id}`);
      video.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const storeVideo = async (video) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();

    for (let item in video) {
      if (
        Object.prototype.hasOwnProperty.call(video, item) &&
        video[item] != "null" &&
        video[item] != null
      ) {
        serializedPost.append(item, video[item]);
      }
    }

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      await apiRequest("post", "/api/videos", serializedPost, config);
      router.push({ name: "videos.index" });
      // Reset the form values
      video.name = null;
      video.content = null;
      video.type = null;
      video.is_published = null;
      video.shown_in_about_us = null;

      showToast("Video saved successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const updateVideo = async (video) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();

    for (let item in video) {
      if (
        Object.prototype.hasOwnProperty.call(video, item) &&
        video[item] != "null" &&
        video[item] != null
      ) {
        serializedPost.append(item, video[item]);
      }
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    serializedPost.append("_method", "put");

    try {
      await apiRequest(
        "post",
        `/api/videos/${video.id}`,
        serializedPost,
        config
      );
      router.push({ name: "videos.index" });
      showToast("Video updated successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteVideo = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        apiRequest("delete", `/api/videos/${id}`).then(() => {
          getVideos();
          router.push({ name: "videos.index" });
          showToast("Video deleted successfully", "success");
        });
      },
      onCancel() {},
    });
  };

  const getVideoList = async () => {
    try {
      const response = await apiRequest("get", "/api/video-list");
      videoList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  return {
    videoList,
    videos,
    video,
    getVideos,
    getVideoList,
    getVideo,
    storeVideo,
    updateVideo,
    deleteVideo,
    validationErrors,
    isLoading,
  };
}
