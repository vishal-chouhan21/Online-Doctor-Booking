import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-20">
      {/* ---------- Header ---------- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Contact <span className="text-gray-800">Us</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Have a question, feedback, or need assistance? We’re here to help!  
          Reach out and our team will get back to you as soon as possible.
        </p>
      </div>

      {/* ---------- Contact Info ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Phone className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
          <p className="text-gray-600 text-sm">+91 98765 43210</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Mail className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
          <p className="text-gray-600 text-sm">support@healthconnect.com</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <MapPin className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
          <p className="text-gray-600 text-sm">
            123 Wellness Street, New Delhi, India
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Clock className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Working Hours</h3>
          <p className="text-gray-600 text-sm">Mon–Sat: 9 AM – 7 PM</p>
        </div>
      </div>

      {/* ---------- Contact Form ---------- */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Send Us a Message
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition md:col-span-2"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* ---------- Map Section ---------- */}
      <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-md">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14017.290707766362!2d77.2090214!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd2931b0b0b3%3A0x4f9b6a87bb6d0b2f!2sNew%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
