import React, { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  if(!doctors || doctors.length ===0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading top doctors....
      </div>
    )
  }

  return (
    <div className="text-center my-12 px-6 md:px-16">
      {/* --- Heading --- */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-3">
        Top Doctors
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Meet our highly skilled and experienced doctors who are dedicated to
        providing the best healthcare services.
      </p>

      {/* --- Doctors Grid --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
        {(doctors || []).slice(0, 10).map((item, index) => (
          <div 
            onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0, 0)}}
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center w-full sm:w-48"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-100"
            />

            <div className="text-center">
              <p className="text-blue-600 font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>

            <div className="mt-3">
              <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                Available
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --- More Button --- */}
      <button onClick={()=>{navigate('/list-doc/all'); scrollTo(0, 0)}} className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
        More
      </button>
    </div>
  );
};

export default TopDoctors;
