import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  const statusList = ["Upcoming", "Completed", "Cancelled"];

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">My Appointments</h1>

      <div className="flex flex-col gap-6">
        {doctors.slice(0, 3).map((item, index) => {
          const status = statusList[index];

          return (
            <div
              key={index}
              className="
                bg-white rounded-xl shadow-md border 
                p-5 flex flex-col sm:flex-row justify-between items-center
                hover:shadow-lg transition duration-300 relative
              "
            >
              {/* LEFT SIDE — Doctor Info */}
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                
                {/* SQUARE IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-blue-500"
                />

                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600 text-sm">
                    Speciality: {item.speciality}
                  </p>

                  {/* Status Badge */}
                  <span
                    className={`
                      inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full 
                      ${status === "Upcoming" && "bg-blue-100 text-blue-700"}
                      ${status === "Completed" && "bg-green-100 text-green-700"}
                      ${status === "Cancelled" && "bg-red-100 text-red-700"}
                    `}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* RIGHT SIDE — Buttons */}
              <div className="flex gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                
                {status === "Upcoming" && (
                  <>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Pay Online
                    </button>

                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      Cancel
                    </button>
                  </>
                )}

                {status === "Completed" && (
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed">
                    Completed
                  </button>
                )}

                {status === "Cancelled" && (
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg cursor-not-allowed">
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointment;
