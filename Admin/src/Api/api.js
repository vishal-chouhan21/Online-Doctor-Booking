import axios from "axios";
import { backendUrl } from "../config";

const api = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
});

// 🚨 BULLETPROOF INTERCEPTOR
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("adminToken");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});


export default api;
