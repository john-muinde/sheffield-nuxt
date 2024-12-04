// src/utils/api.js
export const apiRequest = async (method, url, data = null, config = {}) => {
  const { logoutAdmin } = useAuth();
  try {
    if (method === "put") {
      method = "post";
      url += "?_method=PUT";
    }
    const response = api[method](url, data, config);

    return response.data?.data || response.data;
  } catch (error) {
    const validationErrors = error.response?.data?.errors || {};
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    validationErrors.message = message;
    showToast(message, "error");

    // if 401 and admin use logoutadmin othwerwise logout
    if (error.response.status === 401) {
      if (window.location.pathname.includes("admin")) {
        logoutAdmin();
      }
    }
    throw validationErrors;
  }
};

export const APP_SEGMENTS = [
  {
    id: 301,
    name: "Cold Storage",
    slug: "cold-storage",
    color: "#3d62ad",
    image: "/assets/images/homepage/cold_storage_page.jpg",
  },
  {
    id: 247,
    name: "Laundry",
    slug: "laundry",
    color: "#7ab337",
    image: "/assets/images/homepage/laundry_page.jpg",
  },
  {
    id: 21,
    name: "Commercial Kitchen",
    slug: "commercial-kitchen",
    color: "#c02434",
    image: "/assets/images/homepage/commercial_kitchen.jpg",
  },
  {
    id: 370,
    name: "Promotional Solutions",
    slug: "promotional-solutions",
    color: "#f4a261",
    image: "/assets/images/homepage/promotional_solutions.jpg",
  },
];
