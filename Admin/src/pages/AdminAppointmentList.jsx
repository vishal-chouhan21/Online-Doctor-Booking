import React from "react";
import { useAdminAppointment } from "../context/AdminAppointmentContext.jsx";

const AdminAppointmentList = () => {
  // ✅ Use safe defaults from context
  const {
    appointments = [],
    loading,
    error,
    deleting,
    handleDelete,
  } = useAdminAppointment();

  // ---------------- Helper Functions ----------------
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(date, today)) return "Today";
    if (isSameDay(date, yesterday)) return "Yesterday";

    const diffDays = Math.floor(
      (today.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays < 7) {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    }

    return date.toLocaleDateString();
  };

  // ---------------- Group and Sort Appointments ----------------
  const groupedAppointments = appointments.reduce((groups, app) => {
    const label = getDateLabel(app.appointmentDate);
    if (!groups[label]) groups[label] = [];
    groups[label].push(app);
    return groups;
  }, {});

  // Sort labels: Today > Yesterday > rest
  const sortedLabels = Object.keys(groupedAppointments).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Yesterday") return -1;
    if (b === "Yesterday") return 1;
    return new Date(groupedAppointments[b][0].appointmentDate) -
           new Date(groupedAppointments[a][0].appointmentDate);
  });

  // ---------------- Render ----------------
  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">All Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">No.</th>
              <th>Patient</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {sortedLabels.map((label) => (
              <React.Fragment key={label}>
                {/* Date Group Header */}
                <tr>
                  <td
                    colSpan="8"
                    className="bg-gray-100 font-semibold py-2 px-2"
                  >
                    {label}
                  </td>
                </tr>

                {/* Appointments for this label */}
                {groupedAppointments[label].map((app, index) => (
                  <tr key={app._id} className="border-b hover:bg-gray-50">
                    <td>{index + 1}</td>
                    <td>{app.name}</td>
                    <td>{app.phone}</td>
                    <td>{app.gender}</td>
                    <td>{app.doctor?.name}</td>
                    <td>{new Date(app.appointmentDate).toLocaleDateString()}</td>
                    <td>{app.appointmentTime}</td>
                    <td>
                      <button
                        disabled={deleting === app._id}
                        onClick={() => handleDelete(app._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        {deleting === app._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAppointmentList;
