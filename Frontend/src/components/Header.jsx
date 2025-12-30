import React from "react";
import { assets } from "../assets/assets"; // adjust import path if needed

const Header = () => {
  return (
    <div className="m-4 md:m-10 p-6 md:p-12 bg-blue-600 rounded-3xl flex flex-col md:flex-row items-center justify-between text-white">
      
      {/* -------- Left Side -------- */}
      <div className="md:w-1/2 flex flex-col items-start text-center md:text-left space-y-6">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          Book Appointment <br /> With Our Doctors
        </h1>

        <div className="flex items-center justify-center md:justify-start space-x-4">
          <img
            src={assets.group_profiles}
            alt="Group profiles"
            className="w-20 md:w-28"
          />
          <p className="text-blue-100 text-sm md:text-base">
            Trusted by{" "}
            <span className="font-semibold text-white">thousands</span> of patients
          </p>
        </div>

        <a
          href="#speciality" onClick={()=>scrollTo(0,0)}
          className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          Book Appointment
          <img
            src={assets.arrow_icon}
            alt="Arrow icon"
            className="ml-2 w-5 h-5"
          />
        </a>
      </div>

      {/* -------- Right Side -------- */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={assets.header_img}
          alt="Doctor header"
          className="w-72 md:w-[450px] drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Header;
