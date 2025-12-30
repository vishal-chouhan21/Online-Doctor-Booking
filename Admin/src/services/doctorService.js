import api from "../Api/api";

/**
 * Get all doctors
 */
export const getAllDoctors = async () => {
  try {
    const res = await api.get("/api/doctor");
    return res.data;
  } catch (err) {
    console.error("getAllDoctors error:", err);

    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch doctors",
    };
  }
};

/**
 * Get doctor by ID
 */
export const getDoctorById = async (id) => {
  try {
    const res = await api.get(`/api/doctor/${id}`);
    return res.data;
  } catch (err) {
    console.error("getDoctorById error:", err);

    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch doctor",
    };
  }
};

/**
 * Add new doctor (multipart/form-data)
 */
export const addDoctor = async (doctorData) => {
  try {
    const res = await api.post(
      "/api/doctor/add-doctor",
      doctorData,
    );

    return res.data;
  } catch (err) {
    console.error("addDoctor error:", err);

    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Failed to add doctor",
    };
  }
};

/**
 * Update doctor
 */
export const updateDoctor = async (id, doctorData) => {
  try {
    const res = await api.put(
      `/api/doctor/update-doctor/${id}`,
      doctorData
    );

    return res.data;
  } catch (err) {
    console.error("updateDoctor error:", err);

    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Failed to update doctor",
    };
  }
};

/**
 * Delete doctor
 */
export const deleteDoctor = async (id) => {
  try {
    const res = await api.delete(
      `/api/doctor/delete-doctor/${id}`
    );

    return res.data;
  } catch (err) {
    console.error("deleteDoctor error:", err);

    return {
      success: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Failed to delete doctor",
    };
  }
};
