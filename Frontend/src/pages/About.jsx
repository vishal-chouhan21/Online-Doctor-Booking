import React from "react";
import { Heart, Users, Stethoscope, Shield } from "lucide-react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-20">
      
      {/* ---------- Hero Section ---------- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          About <span className="text-gray-800">Us</span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
          We are dedicated to connecting patients with trusted doctors to make
          healthcare simple, accessible, and reliable for everyone.
        </p>
      </div>

      {/* ---------- Image + Mission Section Side by Side ---------- */}
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* ------ Left: Image ------ */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src={assets.about_image} 
              alt="About Us" 
              className="shadow-md w-full h-50 md:w-[60%] object-cover"
            />
          </div>

          {/* ------ Right: Mission Content ------ */}
          <div className="w-full md:w-1/2">
           <p className="text-gray-600 leading-relaxed text-lg">
            Welcome to <span className="font-semibold text-blue-600">Prescripto</span>, 
            your trusted partner in managing your healthcare needs conveniently and efficiently.
            We understand the challenges individuals face when it comes to scheduling doctor 
            appointments and managing their health records.
          </p>
          <br />
          <br />
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              Our mission is to simplify healthcare access by bridging the gap
              between patients and medical professionals. We believe that finding
              the right doctor should be quick, transparent, and stress-free.
              With our platform, users can browse specialists, view credentials,
              and book appointments instantly — all in one place.
            </p>
          </div>

        </div>
      </div>

      {/* ---------- Values Section ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Heart className="h-10 w-10 text-red-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">Compassion</h3>
          <p className="text-gray-600 text-sm">
            We care deeply about every patient’s well-being and provide a human touch in digital healthcare.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Users className="h-10 w-10 text-blue-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
          <p className="text-gray-600 text-sm">
            We build trust through strong relationships among doctors, patients,
            and healthcare providers.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Stethoscope className="h-10 w-10 text-green-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">Excellence</h3>
          <p className="text-gray-600 text-sm">
            Only verified, highly qualified doctors committed to providing the best care.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Shield className="h-10 w-10 text-yellow-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">Trust & Security</h3>
          <p className="text-gray-600 text-sm">
            Your privacy and safety come first. All interactions are secure and confidential.
          </p>
        </div>
      </div>

      {/* ---------- Team Section ---------- */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Meet Our Team
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Our passionate team of developers, healthcare experts, and designers
          work together to make online healthcare booking effortless and
          trustworthy.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Dr. Neha Sharma", role: "Founder & CEO" },
            { name: "Rahul Mehta", role: "Tech Lead" },
            { name: "Priya Singh", role: "UX Designer" },
            { name: "Dr. Aarav Patel", role: "Medical Advisor" },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-md p-6 w-64 hover:shadow-lg transition"
            >
              <div className="h-24 w-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold mb-4">
                {member.name.charAt(0)}
              </div>
              <h4 className="font-semibold text-gray-800">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;
