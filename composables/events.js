import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiRequest } from "../utils/api";
import { Modal } from "ant-design-vue";

export default function useEvents() {
  const events = ref([]);
  const eventList = ref([]);
  const event = ref({
    name: "",
    location: "",
    start_date: "",
    end_date: "",
    main_image_path: "",
    url: "",
    is_published: "",
    description: "",
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);

  const getEvents = async (
    page = 1,
    search_id = "",
    search_title = "",
    search_global = "",
    order_column = "created_at",
    order_direction = "desc"
  ) => {
    isLoading.value = true;
    try {
      const response = await apiRequest(
        "get",
        `/api/events?page=${page}
                &search_id=${search_id}
                &search_title=${search_title}
                &search_global=${search_global}
                &order_column=${order_column}
                &order_direction=${order_direction}`
      );
      events.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const getEvent = async (id) => {
    isLoading.value = true;
    try {
      const response = await apiRequest("get", `/api/events/${id}`);
      event.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const storeEvent = async (event) => {
    console.log(event);
    console.log("updating events");
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();

    for (let item in event) {
      if (event.hasOwnProperty(item)) {
        serializedPost.append(item, event[item]);
      }
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      await apiRequest("post", "/api/events", serializedPost, config);
      router.push({ name: "events.index" });
      // Reset the form values
      event.name = null;
      event.location = null;
      event.startDate = null;
      event.endDate = null;
      event.description = null;
      event.main_image_path = null;
      event.is_published = null;
      showToast("Event saved successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const updateEvent = async (event) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();

    for (let item in event) {
      if (event.hasOwnProperty(item)) {
        console.log(`Appending ${item}:`, event[item]);
        serializedPost.append(item, event[item]);
      }
    }

    // Log the FormData object
    for (let pair of serializedPost.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      await apiRequest(
        "put",
        `/api/events/${event.id}`,
        serializedPost,
        config
      );
      router.push({ name: "events.index" });
      showToast("Event updated successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteEvent = async (id) => {
    isLoading.value = true;
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        apiRequest("delete", `/api/events/${id}`).then(() => {
          getEvents();
          router.push({ name: "events.index" });
          showToast("Event deleted successfully", "success");
        });
      },
      onCancel() {},
    });
  };

  const getEventList = async () => {
    try {
      const response = await apiRequest("get", "/api/event-list");
      eventList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  return {
    eventList,
    events,
    event,
    getEvents,
    getEventList,
    getEvent,
    storeEvent,
    updateEvent,
    deleteEvent,
    validationErrors,
    isLoading,
  };
}
