import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    speciality: { type: String, required: true, trim: true },

    degree: { type: String, required: true, trim: true },

    experience: { type: String, required: true, trim: true },

    about: { type: String, required: true },

    available: { type: Boolean, default: true },

    fees: { type: Number, required: true },

    address: {
      line1: { type: String, required: true },
      line2: { type: String },
    },

    slots_booked: { type: Object, default: {} },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export default mongoose.models.Doctor ||
  mongoose.model("Doctor", doctorSchema);
