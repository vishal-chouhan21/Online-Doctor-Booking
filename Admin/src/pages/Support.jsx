import React from "react";
import { Phone, Mail, MessageCircle, HelpCircle } from "lucide-react";

const Support = () => {
  return (
    <div className="p-6 pt-20">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Help & Support</h1>
        <p className="text-gray-500 text-sm">
          Get assistance or contact our support team
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call Support */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
          <Phone className="text-blue-600" size={28} />
          <div>
            <h2 className="font-semibold text-lg">Call Support</h2>
            <p className="text-gray-500 text-sm">+91 98765 43210</p>
          </div>
        </div>

        {/* Email Support */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
          <Mail className="text-blue-600" size={28} />
          <div>
            <h2 className="font-semibold text-lg">Email Support</h2>
            <p className="text-gray-500 text-sm">support@healthcare.com</p>
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
          <MessageCircle className="text-blue-600" size={28} />
          <div>
            <h2 className="font-semibold text-lg">Live Chat</h2>
            <p className="text-gray-500 text-sm">
              Chat with our support team in real-time
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
          <HelpCircle className="text-blue-600" size={28} />
          <div>
            <h2 className="font-semibold text-lg">FAQs</h2>
            <p className="text-gray-500 text-sm">
              Find answers to common questions
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl shadow p-6 mt-8 max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Send us a message</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full mt-4 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Support;
