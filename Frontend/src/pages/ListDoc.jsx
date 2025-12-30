import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ListDoc = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (speciality && speciality !== "all" && doctors) {
      const normalized = speciality.toLowerCase().replace(/-/g, " ");
      const filtered = doctors.filter((doc) =>
        doc.speciality.toLowerCase().includes(normalized)
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors || []);
    }
  }, [speciality, doctors]);

  const handleSpecialityClick = (item) => {
    const formatted =
      item.toLowerCase() === "all"
        ? "all"
        : item.toLowerCase().replace(/\s+/g, "-");
    navigate(`/list-doc/${formatted}`);
  };

  const specialities = [
    "All",
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="px-6 md:px-20 py-10 bg-gray-50 min-h-screen">
      <p className="text-gray-700 text-lg mb-8">
        Browse through our trusted doctors specializing in{" "}
        <span className="font-semibold text-blue-600 capitalize">
          {speciality && speciality !== "all"
            ? speciality.replace("-", " ")
            : "various fields"}
        </span>.
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ---------- Sidebar ---------- */}
        <div className="bg-white p-6 rounded-xl shadow-md md:w-1/4">
          <p className="font-semibold text-blue-600 mb-4">Specialities</p>
          <ul className="space-y-2 text-gray-700">
            {specialities.map((item) => {
              const formatted =
                item.toLowerCase() === "all"
                  ? "all"
                  : item.toLowerCase().replace(/\s+/g, "-");
              return (
                <li
                  key={item}
                  onClick={() => handleSpecialityClick(item)}
                  className={`cursor-pointer p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    speciality === formatted || (!speciality && item === "All")
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : ""
                  }`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- Doctors List ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative h-52 w-full mb-4 overflow-hidden rounded-lg">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {doctor.name}
                </h3>
                <p className="text-sm text-blue-600">{doctor.speciality}</p>
                <p className="text-gray-600 text-sm mt-2">{doctor.hospital}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering navigate twice
                    navigate(`/appointment/${doctor._id}`);
                  }}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No doctors found for this speciality.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListDoc;
