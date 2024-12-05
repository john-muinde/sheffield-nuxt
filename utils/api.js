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
    active: true,
    name: "Cold Storage",
    slug: "cold-storage",
    color: "#3d62ad",
    image: "/assets/images/homepage/cold_storage_page.jpg",
    icon: "/assets/images/menu-icons/top-menu/cold-room.png",
  },
  {
    id: 247,
    active: true,
    name: "Laundry",
    slug: "laundry",
    color: "#7ab337",
    image: "/assets/images/homepage/laundry_page.jpg",
    icon: "/assets/images/menu-icons/top-menu/laundry.png",
  },
  {
    id: 21,
    active: true,
    name: "Commercial Kitchen",
    slug: "commercial-kitchen",
    color: "#c02434",
    image: "/assets/images/homepage/commercial_kitchen.jpg",
    icon: "/assets/images/menu-icons/top-menu/kitchen.png",
  },
  {
    id: 370,
    active:
      import.meta.browser &&
      window.localStorage.getItem("promotionActive") === "true",
    name: "Promotional Solutions",
    slug: "promotional-solutions",
    color: "#f4a261",
    image: "/assets/images/events/november-promo.png",
    icon: "/assets/images/menu-icons/top-menu/kitchen.png",
  },
];
