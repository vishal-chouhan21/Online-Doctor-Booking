import axios from "axios";
import { backendUrl } from "../config";

// Base API
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// 🔐 Attach JWT automatically for protected routes only
api.interceptors.request.use((config) => {
  // Do NOT attach token for public routes
  const publicRoutes = ["/login", "/register"];
  if (!publicRoutes.some((route) => config.url.includes(route))) {
    // Prefer user token
    const storedUser = localStorage.getItem("userToken");
    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Fallback to admin token
      const storedAdmin = localStorage.getItem("adminToken");
      if (storedAdmin) {
        const { token } = JSON.parse(storedAdmin);
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

// -------- USER APIs --------
export const registerUser = (data) =>
  api.post("/api/user/register", data); // public

export const loginUser = (data) =>
  api.post("/api/user/login", data); // public

export const getProfile = () =>
  api.get("/api/user/profile"); // protected

// -------- DOCTOR APIs --------
export const getDoctors = () =>
  api.get("/api/doctor"); // untouched

// -------- APPOINTMENT APIs --------
export const createAppointment = (data) =>
  api.post("/api/appointments", data); // untouched

export const getUserAppointments = () =>
  api.get("/api/appointments"); // untouched

export default api;
