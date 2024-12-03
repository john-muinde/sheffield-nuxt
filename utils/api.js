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
