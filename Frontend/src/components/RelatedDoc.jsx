import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const RelatedDoc = ({ speciality, docID }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docID
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docID]);

  return (
    <div className="text-center my-12 px-6 md:px-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-3">
        Related Doctors
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center mt-10">
        {relDoc.slice(0, 5).map((item) => {
          if (!item._id) return null;

          return (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center w-full sm:w-48 cursor-pointer"
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
          );
        })}
      </div>
    </div>
  );
};

export default RelatedDoc;
