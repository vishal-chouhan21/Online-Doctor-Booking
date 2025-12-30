// src/context/AdminAppointmentContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAppointmentsAdmin, deleteAppointmentAdmin } from "../services/adminAppointmentService.js";

const AdminAppointmentContext = createContext(null);

export const AdminAppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  // Fetch all admin appointments
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAppointmentsAdmin();
      if (res.success) {
        setAppointments(res.data);
      } else {
        setError(res.message || "Failed to fetch appointments");
      }
    } catch (err) {
      console.error(err);
      setError("Server error while loading appointments");
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete appointment
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      setDeleting(id);
      const res = await deleteAppointmentAdmin(id);
      if (res.success) {
        fetchAppointments();
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert("Failed to delete appointment");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <AdminAppointmentContext.Provider
      value={{
        appointments,
        loading,
        error,
        deleting,
        fetchAppointments,
        handleDelete,
      }}
    >
      {children}
    </AdminAppointmentContext.Provider>
  );
};

// Custom hook
export const useAdminAppointment = () => {
  const context = useContext(AdminAppointmentContext);
  if (!context) throw new Error("useAdminAppointment must be used within AdminAppointmentProvider");
  return context;
};
