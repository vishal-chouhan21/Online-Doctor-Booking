import React, { use } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {

  const navigate = useNavigate();
  return (
    <div className="relative m-6 md:m-12 rounded-3xl overflow-hidden">
      {/* ------- Gradient Background ------- */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400"></div>

      {/* ------- Main Content ------- */}
      <div className="relative flex flex-col md:flex-row items-center justify-between text-white p-6 md:p-10">
        {/* ------- Left Side ------- */}
        <div className="flex-1 text-center md:text-left space-y-4 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            <span className="text-yellow-300">Book</span>{" "}
            <span className="text-white">Appointment</span>
          </h2>

          <h1 className="text-2xl md:text-3xl font-semibold leading-snug drop-shadow-sm">
            With <span className="text-yellow-200 font-bold">100+ Expert Doctors</span>
          </h1>

          <p className="text-blue-100 text-base md:w-3/4 mx-auto md:mx-0">
            Get quality healthcare anytime, anywhere. Connect with top specialists
            and book your appointment instantly.
          </p>

          <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="mt-4 px-6 py-2.5 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:scale-105 hover:bg-blue-50 transition-transform duration-300">
            Create Account
          </button>
        </div>

        {/* ------- Right Side ------- */}
        <div className="flex-1 mt-8 md:mt-0 flex justify-center relative">
          <img
            src={assets.appointment_img}
            alt="Doctor appointment"
            className="w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl -mt-8 md:-mt-10 hover:-translate-y-2 transition-transform duration-500"
          />

          {/* Soft Glow Behind Image */}
          <div className="absolute inset-0 blur-3xl opacity-30 bg-blue-300 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
