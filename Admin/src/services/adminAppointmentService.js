// src/services/adminAppointmentService.js
import api from "../Api/api";

// GET all appointments (admin)
export const getAppointmentsAdmin = async () => {
  try {
    const res = await api.get("/api/appointments");
    return res.data; // { success: true, data: [...] }
  } catch (err) {
    console.error("getAppointmentsAdmin error:", err);
    throw err;
  }
};

// DELETE an appointment (admin)
export const deleteAppointmentAdmin = async (id) => {
  try {
    const res = await api.delete(`/api/appointments/${id}`);
    return res.data; // { success: true, message: "Appointment deleted" }
  } catch (err) {
    console.error("deleteAppointmentAdmin error:", err);
    throw err;
  }
};
