import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api/v1" : "/api/v1"),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Ignore if there's no request config
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Never try to refresh the refresh endpoint itself
    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    //  Access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          await api.post("/auth/refresh");

          isRefreshing = false;
        }

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        toast.error("Your session has expired. Please log in again.");

        // Prevent endless redirects if we're already on the login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    //  Permission denied
    if (error.response?.status === 403) {
      toast.error(
        error.response?.data?.message ||
          "You don't have permission to perform this action."
      );
    }

    //  Server error
    if (error.response?.status >= 500) {
      toast.error("Internal server error. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default api;