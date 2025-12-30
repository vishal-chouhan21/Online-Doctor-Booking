import Appointment from "../models/appointmentModel.js";
import Otp from "../models/otpModel.js";
// import axios from "axios";

/* ---------------- SEND OTP ---------------- */
export const sendAppointmentOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
      { phone, purpose: "appointment" },
      { otp: otpCode, expiresAt: Date.now() + 5 * 60 * 1000 },
      { upsert: true, new: true }
    );

    console.log("OTP:", otpCode);

    // // Send SMS via FAST2SMS
    // await axios.post(
    //   "https://www.fast2sms.com/dev/bulkV2",
    //   {
    //     route: "otp",
    //     variables_values: otpCode,
    //     numbers: phone,
    //   },
    //   {
    //     headers: {
    //       authorization: process.env.FAST2SMS_API_KEY,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error.response?.data || error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* ---------------- VERIFY OTP & BOOK ---------------- */
export const verifyOtpAndBook = async (req, res) => {
  try {
    const {
      phone,
      otp,
      name,
      gender,
      doctorId,
      appointmentDate,
      appointmentTime,
    } = req.body;

    const record = await Otp.findOne({ phone, purpose: "appointment" });
    if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Try booking the appointment
    try {
      const appointment = await Appointment.create({
        doctor: doctorId,
        name,
        phone,
        gender,
        appointmentDate,
        appointmentTime,
        status: "Booked",
      });

      // Delete OTP after successful booking
      await Otp.deleteOne({ phone, purpose: "appointment" });

      return res.status(201).json({
        success: true,
        message: "Appointment confirmed",
        appointment,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ message: "Slot already booked" });
      }
      throw err;
    }
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
