import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://tricitymate-backend-g6gc.onrender.com/api", // your backend API base URL
});

// Axios interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set token in headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
