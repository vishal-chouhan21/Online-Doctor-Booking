import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="text-center my-10 px-6 md:px-16">
      {/* ---- Heading ---- */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-3">
        Find by Speciality
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Simply choose your desired speciality to book an appointment with our expert doctors.
      </p>

      {/* ---- Responsive Centered Container ---- */}
      <div 
        className="
          flex flex-wrap justify-center items-center
          gap-6
          max-w-6xl mx-auto
        "
      >
        {specialityData.map((item, index) => (
          <Link 
            key={index}
            to={`/list-doc/${item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="
              flex flex-col items-center
              bg-white p-4 rounded-2xl shadow-md
              hover:shadow-lg hover:-translate-y-1
              transition-all duration-300
              w-[45%] sm:w-[30%] md:w-[18%]
              min-w-[120px] 
            "
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-20 h-20 object-contain mb-2"
            />
            <p className="text-blue-700 font-semibold text-sm md:text-base whitespace-nowrap">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
