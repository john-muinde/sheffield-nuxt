import { ref } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";

export default function useRequestQuotes() {
  const contacts = ref([]);
  const contactList = ref([]);
  const contact = ref({
    firstname: "",
    surname: "",
    email: "",
    company_name: "",
    country: "",
    location: "",
    code: "",
    phone_number: "",
    installation: "",
    shipping: "",
  });

  const router = useRouter();
  const validationErrors = ref({});
  const isLoading = ref(false);

  const getContacts = async (
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
        `/api/contacts?page=${page}&search_id=${search_id}&search_title=${search_title}&search_parent_id=${search_parent_id}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`
      );
      contacts.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const getContact = async (id) => {
    try {
      const response = await apiRequest("get", `/api/contacts/${id}`);
      contact.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  const storeContact = async (contactBody) => {
    if (isLoading.value) return;

    isLoading.value = true;
    validationErrors.value = {};

    let serializedPost = new FormData();

    for (let item in contactBody) {
      if (Object.prototype.hasOwnProperty.call(contactBody, item)) {
        serializedPost.append(item, contactBody[item]);
      }
    }

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      await apiRequest("post", "/api/request-quote", serializedPost, config);

      contact.value = {
        firstname: "",
        surname: "",
        email: "",
        company_name: "",
        country: "",
        location: "",
        code: "",
        phone_number: "",
        installation: "",
        shipping: "",
      };
      showToast("Request Quote sent successfully", "success");
    } catch (errors) {
      validationErrors.value = errors;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteContact = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "You won't be able to revert this action!",
      okText: "Yes, delete it!",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        await apiRequest("delete", `/api/contacts/${id}`);
        getContacts();
        router.push({ name: "contacts.index" });
        showToast("Contact deleted successfully", "success");
      },
    });
  };

  const getContactList = async () => {
    try {
      const response = await apiRequest("get", "/api/contact-list");
      contactList.value = response;
    } catch (errors) {
      validationErrors.value = errors;
    }
  };

  return {
    contactList,
    contacts,
    contact,
    getContacts,
    getContactList,
    getContact,
    storeContact,
    deleteContact,
    validationErrors,
    isLoading,
  };
}
