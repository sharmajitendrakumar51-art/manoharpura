import axios from "axios";

const api = axios.create({
  // baseURL: "https://manoharpura.onrender.com/api",
  baseURL: "http://localhost:3000/api"
});

// ==========================
// JWT Token Interceptor
// ==========================

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;