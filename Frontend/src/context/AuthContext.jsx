import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../Api/api.js";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const res = await api.post("/api/admin/login", { email, password });

      const adminData = {
        token: res.data.token.trim(),
        email: res.data.email,
        role: res.data.role,
      };

      localStorage.setItem("adminToken", JSON.stringify({ token: adminData.token }));
      setAdmin(adminData);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedAdmin = localStorage.getItem("adminToken");
        if (!storedAdmin) return setLoading(false);

        const { token } = JSON.parse(storedAdmin);
        if (!token) return setLoading(false);

        await api.get("/api/admin/verify"); // optional verify

        setAdmin({ token: token.trim() });
      } catch (err) {
        console.warn("Session restore failed", err);
        localStorage.removeItem("adminToken");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ admin, loading, isAuthenticated: !!admin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
