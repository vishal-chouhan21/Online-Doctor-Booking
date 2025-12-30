import { createContext, useState, useEffect } from "react";
import { getDoctors } from "../api/Api";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const CurrencySymbol = '$';

  const fetchDoctors = async () => {
    try {
      const { data } = await getDoctors();
      console.log("Doctors API Response:", data); // Debug log
      setDoctors(data?.data || []);     // IMPORTANT
    } catch (error) {
      console.log("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const value = {
    doctors,
    CurrencySymbol,
    loading           // <-- YOU FORGOT THIS EARLIER
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
