import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctors } from "../context/DoctorContext";
import { useAdminAppointment } from "../context/AdminAppointmentContext.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  // Doctors
  const { doctors, loading: loadingDoctors, fetchDoctors } = useDoctors();

  // Admin appointments
  const {
    appointments,
    loading: loadingAppointments,
    error: appointmentsError,
  } = useAdminAppointment();

  const [error, setError] = useState("");

  // Dummy chart data
  const activityData = [
    { month: "Jan", consultation: 40, patients: 30 },
    { month: "Feb", consultation: 45, patients: 35 },
    { month: "Mar", consultation: 60, patients: 50 },
    { month: "Apr", consultation: 55, patients: 32 },
    { month: "May", consultation: 65, patients: 45 },
    { month: "Jun", consultation: 52, patients: 40 },
  ];

  const stats = [
    { title: "Anesthetics", value: 8 },
    { title: "Gynecology", value: 9 },
    { title: "Neurology", value: 9 },
    { title: "Oncology", value: 8 },
    { title: "Orthopedics", value: 9 },
    { title: "Physiotherapy", value: 4 },
  ];

  // Fetch doctors on load
  useEffect(() => {
    if (doctors.length === 0) {
      fetchDoctors().catch(() => setError("Failed to load doctors"));
    }
  }, [doctors.length, fetchDoctors]);

  // ---------------- Sort appointments by newest first ----------------
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="p-6 space-y-8 mt-14">

      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-400 to-blue-400 rounded-2xl p-8 text-white shadow">
        <h2 className="text-3xl font-semibold mb-2">Hello Admin!</h2>
        <p className="text-white/90">
          Here are your important tasks, updates, and alerts.
        </p>
      </div>

      {/* Activity & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Activity Chart */}
        <div className="bg-white p-6 rounded-2xl shadow lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={activityData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consultation" stroke="#1E90FF" strokeWidth={3} />
              <Line type="monotone" dataKey="patients" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Success Stats */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Success Stats</h3>
          <div className="space-y-4">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm">
                  <span>{s.title}</span>
                  <span>{s.value}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="h-2 rounded-full bg-teal-500"
                    style={{ width: `${s.value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Doctors & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Doctors Table */}
        <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Doctors</h3>
            <button
              onClick={() => navigate("/doctors")}
              className="text-sm text-blue-500 hover:underline"
            >
              View All
            </button>
          </div>

          {loadingDoctors ? (
            <p className="text-gray-500">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="text-gray-500">No doctors found</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2"></th>
                  <th className="py-2">Name</th>
                  <th>Speciality</th>
                  <th>Experience</th>
                  <th>Fees</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {doctors.slice(0, 5).map((doc) => (
                  <tr key={doc._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{doc.image && (
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                    </td>
                    <td className="py-3 font-medium">{doc.name}</td>
                    <td>{doc.speciality}</td>
                    <td>{doc.experience} yrs</td>
                    <td>{doc.fees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Admin Appointments */}
        <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Online Appointments</h3>
            <button
              onClick={() => navigate("/active-appointment")}
              className="text-sm text-blue-500 hover:underline"
            >
              View All
            </button>
          </div>

          {loadingAppointments ? (
            <p className="text-gray-500">Loading appointments...</p>
          ) : appointmentsError ? (
            <p className="text-red-600">{appointmentsError}</p>
          ) : appointments.length === 0 ? (
            <p>No appointments found</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">No.</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>For Doctor</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {sortedAppointments.slice(0, 5).map((app, index) => (
                  <tr key={app._id} className="border-b hover:bg-gray-50">
                    <td>{index + 1}</td>
                    <td>{app.name}</td>
                    <td>{app.appointmentTime}</td>
                    <td>{app.gender}</td>
                    <td>{app.phone}</td>
                    <td>{app.doctor?.name || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
}
