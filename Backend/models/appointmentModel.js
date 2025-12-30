import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    name: String,
    phone: String,
    gender: String,
    appointmentDate: Date,
    appointmentTime: String,
    status: { type: String, default: "Booked" },
  },
  { timestamps: true }
);

// Prevent double booking
appointmentSchema.index(
  { doctor: 1, appointmentDate: 1, appointmentTime: 1 },
  { unique: true }
);

export default mongoose.model("Appointment", appointmentSchema);
