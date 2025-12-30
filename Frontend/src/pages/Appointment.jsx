import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import RelatedDoc from "../components/RelatedDoc.jsx";
import axios from "axios";
import jsPDF from "jspdf";

const Appointment = () => {
  const { docID } = useParams();
  const { doctors, CurrencySymbol } = useContext(AppContext);
  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [docSlots, setDocSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [patientForm, setPatientForm] = useState({
    name: "",
    phone: "",
    gender: "",
  });

  // OTP states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // PDF
  const [showDownload, setShowDownload] = useState(false);
  const [pdfData, setPdfData] = useState(null);

  /* ---------------- LOAD DOCTOR ---------------- */
  useEffect(() => {
    if (doctors && docID) {
      const found = doctors.find((doc) => doc._id === docID);
      setDocInfo(found || null);
    }
  }, [doctors, docID]);

  /* ---------------- GENERATE SLOTS ---------------- */
  const generateSlots = () => {
    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const current = new Date(today);
      current.setDate(today.getDate() + i);

      let start = new Date(current);
      let end = new Date(current);
      end.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        const minutes = now.getMinutes() > 30 ? 0 : 30;
        start.setHours(
          now.getHours() + (now.getMinutes() > 30 ? 1 : 0),
          minutes,
          0,
          0
        );
      } else {
        start.setHours(10, 0, 0, 0);
      }

      const daySlots = [];
      while (start < end) {
        daySlots.push({
          datetime: new Date(start),
          time: start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        start = new Date(start.getTime() + 30 * 60000);
      }

      allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    if (docInfo) generateSlots();
  }, [docInfo]);

  /* ---------------- FETCH BOOKED SLOTS ---------------- */
  const fetchBookedSlots = async () => {
    const selectedDate = docSlots[slotIndex]?.[0]?.datetime
      ?.toISOString()
      .split("T")[0];
    if (!selectedDate || !docInfo) return;

    try {
      const res = await axios.get(
        `http://localhost:4000/api/appointments/doctor/${docInfo._id}/booked-slots`,
        { params: { date: selectedDate } }
      );
      setBookedSlots(res.data?.data || []);
      setSlotTime("");
    } catch (err) {
      console.error("Booked slot fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBookedSlots();
  }, [slotIndex, docSlots, docInfo]);

  /* ---------------- SEND OTP ---------------- */
  const handleBooking = async () => {
    if (!slotTime) return;

    try {
      await axios.post("http://localhost:4000/api/otp/send-otp", {
        phone: patientForm.phone,
      });
      setShowOtpModal(true);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };
  /* ---------------- VERIFY OTP & BOOK ---------------- */
  const verifyOtpAndBook = async () => {
    const selectedSlot = docSlots[slotIndex].find((s) => s.time === slotTime);
    if (!selectedSlot) return;

    try {
      setLoading(true);

      await axios.post("http://localhost:4000/api/otp/verify-otp", {
        otp,
        ...patientForm,
        doctorId: docInfo._id,
        appointmentDate: selectedSlot.datetime,
        appointmentTime: slotTime,
      });

      alert("✅ Appointment Confirmed");
      setShowOtpModal(false);

      setPdfData({
        patient: patientForm,
        doctor: docInfo,
        date: selectedSlot.datetime.toDateString(),
        time: slotTime,
      });

      setShowDownload(true);
    } catch (err) {
      alert(err.response?.data?.message || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DOWNLOAD PDF ---------------- */
  const downloadPdf = () => {
    if (!pdfData) return;

    const pdf = new jsPDF();

    // ===== HEADER =====
    pdf.setFillColor(0, 102, 204);
    pdf.rect(0, 0, 210, 30, "F");

    pdf.setTextColor(255);
    pdf.setFontSize(18);
    pdf.text("City Hospital", 20, 20);

    pdf.setFontSize(11);
    pdf.text("Appointment Confirmation", 150, 20);

    // Reset text color
    pdf.setTextColor(0);

    // ===== BODY BOX =====
    pdf.setDrawColor(200);
    pdf.rect(15, 40, 180, 140);

    pdf.setFontSize(14);
    pdf.text("Patient Details", 20, 55);
    pdf.line(20, 58, 90, 58);

    pdf.setFontSize(11);
    pdf.text(`Name: ${pdfData.patient.name}`, 20, 70);
    pdf.text(`Phone: ${pdfData.patient.phone}`, 20, 80);
    pdf.text(`Gender: ${pdfData.patient.gender}`, 20, 90);

    pdf.text("Doctor Details", 110, 55);
    pdf.line(110, 58, 180, 58);

    pdf.text(`Doctor: ${pdfData.doctor.name}`, 110, 70);
    pdf.text(`Speciality: ${pdfData.doctor.speciality}`, 110, 80);

    // ===== APPOINTMENT INFO =====
    pdf.setFontSize(13);
    pdf.text("Appointment Information", 20, 115);
    pdf.line(20, 118, 120, 118);

    pdf.setFontSize(11);
    pdf.text(`Appointment ID: ${pdfData.appointmentId}`, 20, 130);
    pdf.text(`Date: ${pdfData.date}`, 20, 140);
    pdf.text(`Time: ${pdfData.time}`, 20, 150);
    pdf.text(
      `Consultation Fee: ${CurrencySymbol}${pdfData.doctor.fees}`,
      20,
      160
    );

    // ===== FOOTER =====
    pdf.setFontSize(10);
    pdf.text(
      "Please arrive 10 minutes early. Carry this PDF during visit.",
      20,
      190
    );
    pdf.text("📞 +91 98765 43210", 20, 198);
    pdf.text("✉ support@cityhospital.com", 120, 198);

    pdf.save(`Appointment_${pdfData.appointmentId}.pdf`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      {/* DOCTOR CARD */}
      <div className="w-full md:w-3/4 bg-white rounded-2xl shadow-md flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6 flex justify-center bg-blue-500">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-60 h-60 rounded-full object-cover border"
          />
        </div>
        <div className="md:w-1/2 p-6 space-y-2">
          <h2 className="text-2xl font-bold">{docInfo.name}</h2>
          <p>
            {docInfo.degree} • {docInfo.speciality}
          </p>
          <p className="text-sm text-gray-600">{docInfo.about}</p>
          <p className="font-semibold">
            Fee: {CurrencySymbol}
            {docInfo.fees}
          </p>
        </div>
      </div>

      {/* DATE SLOTS */}
      <div className="w-full md:w-3/4 bg-white mt-6 p-6 rounded-2xl shadow">
        <p className="font-semibold mb-3">Select Date</p>
        <div className="flex gap-4 overflow-x-auto">
          {docSlots.map((day, index) => {
            if (!day.length) return null;
            const d = day[0].datetime;
            return (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-[70px] text-center p-3 rounded-full cursor-pointer ${
                  slotIndex === index ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                <p>{daysOfWeek[d.getDay()]}</p>
                <p className="font-bold">{d.getDate()}</p>
              </div>
            );
          })}
        </div>

        {/* TIME SLOTS */}
        <p className="font-semibold mt-6 mb-3">Available Time</p>
        <div className="flex flex-wrap gap-3">
          {docSlots[slotIndex]?.map((slot, i) => {
            const isBooked = bookedSlots.includes(slot.time);
            return (
              <button
                key={i}
                disabled={isBooked}
                onClick={() => setSlotTime(slot.time)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  isBooked
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : slotTime === slot.time
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {slot.time}
              </button>
            );
          })}
        </div>

        {/* PATIENT FORM */}
        {slotTime && (
          <div className="mt-6 space-y-3">
            <input
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={patientForm.name}
              onChange={(e) => {
                let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");

                value = value
                  .split(" ")
                  .map((word) =>
                    word
                      ? word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                      : ""
                  )
                  .join(" ");

                setPatientForm({ ...patientForm, name: value });
              }}
            />

            <input
              type="tel"
              placeholder="Phone"
              className="w-full border p-2 rounded"
              value={patientForm.phone}
              maxLength={10}
              onChange={(e) =>
                setPatientForm({
                  ...patientForm,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
            />
            <select
              className="w-full border p-2 rounded"
              value={patientForm.gender}
              onChange={(e) =>
                setPatientForm({ ...patientForm, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        {/* BOOK BUTTON */}
        <div className="text-center mt-6">
          <button
            onClick={handleBooking}
            disabled={
              patientForm.phone.length !== 10 ||
              !slotTime ||
              !patientForm.name ||
              !patientForm.gender
            }
            className="bg-blue-600 text-white px-8 py-3 rounded-xl disabled:bg-gray-300"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      {showDownload && (
        <div className="mt-6">
          <button
            onClick={downloadPdf}
            className="bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            ⬇ Download Appointment PDF
          </button>
        </div>
      )}

      <RelatedDoc speciality={docInfo.speciality} docID={docInfo._id} />

      {/* OTP POPUP */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow">
            <h2 className="text-lg font-bold mb-2">Verify OTP</h2>
            <p className="text-sm text-gray-600 mb-4">
              OTP sent to <b>{patientForm.phone}</b>
            </p>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="border p-2 w-full rounded text-center tracking-widest text-lg"
              placeholder="Enter OTP"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={verifyOtpAndBook}
                disabled={otp.length !== 6 || loading}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:bg-gray-300"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
              <button
                onClick={() => setShowOtpModal(false)}
                className="border px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
