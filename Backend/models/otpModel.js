import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  purpose: {
    type: String,
    default: "appointment",
  },

  attempts: {
    type: Number,
    default: 0,
  },

  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // 🔥 auto-delete
  },
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", otpSchema);

export default Otp;
