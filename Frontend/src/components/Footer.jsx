import React, { use } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800 mt-16 px-6 md:px-20 py-10 rounded-t-3xl shadow-md">
      {/* ------- main footer content ------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* ------- left section ------- */}
        <div>
          <img src={assets.logo} alt="Precripto Logo" className="h-12 mb-4" />
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong>Precripto</strong> helps you connect with trusted healthcare professionals instantly. 
            Book doctor appointments, consult online, and manage your health with ease — 
            all in one secure platform designed to make healthcare simple, fast, and accessible for everyone.
          </p>
        </div>

        {/* ------- center section ------- */}
        <div>
          <p className="text-lg font-semibold mb-3 text-blue-600">Company</p>
          <ul className="space-y-2 text-gray-600">
            <li onClick={()=> {navigate('/'); scrollTo(0,0)}} className="hover:text-blue-600 cursor-pointer transition-colors">Home</li>

            <li onClick={()=> {navigate('/about'); scrollTo(0,0)}}  className="hover:text-blue-600 cursor-pointer transition-colors">About Us</li>

            <li onClick={()=> {navigate('/contact'); scrollTo(0,0)}} className="hover:text-blue-600 cursor-pointer transition-colors">Contact Us</li>

            <li onClick={()=> {navigate('/privacy-policy'); scrollTo(0,0)}} className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* ------- right section ------- */}
        <div>
          <p className="text-lg font-semibold mb-3 text-blue-600">Get In Touch</p>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>123 Health St, Wellness City, HC 45678</li>
            <li>Email: contact@precripto.com</li>
            <li>Phone: +1 (234) 567-8901</li>
          </ul>
        </div>
      </div>

      {/* ------- copyright text ------- */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
        © 2024 Precripto — All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
