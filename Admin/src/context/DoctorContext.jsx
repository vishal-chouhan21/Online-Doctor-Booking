import { createContext, useContext, useEffect, useCallback, useState } from "react";
import { getAllDoctors } from "../services/doctorService";

const DoctorContext = createContext(null);

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch doctors (memoized)
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getAllDoctors();
      if (res?.success) {
        setDoctors(res.data);
      } else {
        setError(res?.message || "Failed to load doctors");
      }
    } catch (err) {
      console.error("Failed to fetch doctors", err);
      setError("Server error while loading doctors");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch once when provider mounts
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        loading,
        error,
        fetchDoctors,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

// Custom hook (safe)
export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("useDoctors must be used within DoctorProvider");
  }
  return context;
};
