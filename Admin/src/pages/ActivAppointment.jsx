import React, { useEffect, useState } from "react";
import { useAdminAppointment } from "../context/AdminAppointmentContext.jsx";

const ActiveAppointmentList = () => {
  const {
    appointments = [],
    loading,
    error,
    deleting,
    handleDelete,
  } = useAdminAppointment();

  // 🔁 auto refresh current time every minute
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- Date Helpers ----------------
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(date, today)) return "Active Appointment";
    if (isSameDay(date, yesterday)) return "Yesterday";

    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  // ---------------- TIME HANDLING (FIXED) ----------------
  const getAppointmentDateTime = (date, time) => {
    const d = new Date(date);

    // ✅ Handle AM/PM format (e.g. "2:00 PM")
    if (
      typeof time === "string" &&
      (time.toLowerCase().includes("am") ||
        time.toLowerCase().includes("pm"))
    ) {
      const [timePart, modifier] = time.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);

      if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12;
      if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

      d.setHours(hours, minutes, 0, 0);
    }
    // ✅ Handle 24-hour format (e.g. "14:00")
    else {
      const [hours, minutes] = time.split(":").map(Number);
      d.setHours(hours, minutes, 0, 0);
    }

    return d;
  };

  const isActiveAppointment = (date, time) => {
    return getAppointmentDateTime(date, time) >= now;
  };

  const isOngoingAppointment = (date, time) => {
    const appTime = getAppointmentDateTime(date, time);
    return Math.abs(appTime - now) <= 5 * 60 * 1000; // ±5 minutes
  };

  const getStatusText = (date, time) => {
    const appTime = getAppointmentDateTime(date, time);
    const diff = appTime - now;

    if (Math.abs(diff) <= 5 * 60 * 1000) return "Ongoing";

    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);

    if (hrs > 0) return `Starts in ${hrs}h ${mins % 60}m`;
    return `Starts in ${mins} min`;
  };

  // ---------------- Filter Active Appointments ----------------
  const activeAppointments = appointments.filter((app) =>
    isActiveAppointment(app.appointmentDate, app.appointmentTime)
  );

  // ---------------- Group by Date ----------------
  const groupedAppointments = activeAppointments.reduce((groups, app) => {
    const label = getDateLabel(app.appointmentDate);
    if (!groups[label]) groups[label] = [];
    groups[label].push(app);
    return groups;
  }, {});

  // ---------------- Render ----------------
  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Active Appointments</h1>

      {activeAppointments.length === 0 ? (
        <p>No active appointments</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th>No.</th>
              <th>Patient</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {Object.entries(groupedAppointments).map(([label, apps]) => (
              <React.Fragment key={label}>
                <tr>
                  <td
                    colSpan="9"
                    className="bg-gray-100 font-semibold py-2 px-2"
                  >
                    {label}
                  </td>
                </tr>

                {apps.map((app, index) => (
                  <tr
                    key={app._id}
                    className={`border-b hover:bg-gray-50 ${
                      isOngoingAppointment(
                        app.appointmentDate,
                        app.appointmentTime
                      )
                        ? "bg-green-100 font-semibold"
                        : ""
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td>{app.name}</td>
                    <td>{app.phone}</td>
                    <td>{app.gender}</td>
                    <td>{app.doctor?.name}</td>
                    <td>
                      {new Date(app.appointmentDate).toLocaleDateString()}
                    </td>
                    <td>{app.appointmentTime}</td>
                    <td className="text-xs">
                      {getStatusText(
                        app.appointmentDate,
                        app.appointmentTime
                      )}
                    </td>
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

export default ActiveAppointmentList;
