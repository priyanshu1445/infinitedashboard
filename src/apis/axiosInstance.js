// src/apis/axiosInstance.js
import axios from "axios";

// ✅ Create axios instance
const axiosInstance = axios.create({
  baseURL: "https://grocery-backend-7tut.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor to automatically attach token (supports multiple key names)
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // Check for token in multiple possible keys
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken") ||
        localStorage.getItem("accessToken");

      // Attach token if found
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No authorization token found in localStorage");
      }
    } catch (error) {
      console.error("Error accessing token from localStorage:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Response interceptor (for debugging or global error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⛔ Unauthorized – Token might be expired or invalid");
      // Optionally redirect to login page here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
