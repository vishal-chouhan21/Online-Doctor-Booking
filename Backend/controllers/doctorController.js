import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

// ➕ ADD DOCTOR
export const addDoctor = async (req, res) => {
  try {
    // 🔹 DEBUG LOGS
    console.log("REQ BODY:", req.body); // shows all form fields
    console.log("REQ FILE:", req.file); // shows uploaded image info

    const { name, email, degree, speciality, experience, fees, about, address } = req.body;

    // 🔴 Required field validation
    if (
      !name ||
      !email ||
      !degree ||
      !speciality ||
      !experience ||
      !fees ||
      !about ||
      !address?.line1
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists",
      });
    }

    // Create doctor
    const newDoctor = await doctorModel.create({
      name,
      email,
      degree,
      speciality,
      experience,
      fees,
      about,
      address: {
        line1: address.line1,
        line2: address.line2 || "",
      },
      image: req.file?.path || "",
    });

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.error("addDoctor error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✏ UPDATE DOCTOR
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const {
      name,
      email,
      password,
      degree,
      speciality,
      experience,
      fees,
      about,
      addressLine1,
      addressLine2,
    } = req.body;

    // 🔁 Email uniqueness check
    if (email && email !== doctor.email) {
      const emailExists = await doctorModel.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      doctor.email = email;
    }

    if (name) doctor.name = name;
    if (degree) doctor.degree = degree;
    if (speciality) doctor.speciality = speciality;
    if (experience) doctor.experience = experience;
    if (fees) doctor.fees = fees;
    if (about) doctor.about = about;

    if (addressLine1 || addressLine2) {
      doctor.address = {
        line1: addressLine1 || doctor.address?.line1,
        line2: addressLine2 || doctor.address?.line2,
      };
    }

    // 🔐 Hash password if updated
    if (password) {
      doctor.password = await bcrypt.hash(password, 10);
    }

    // 🧹 Delete old image if replaced
    if (req.file) {
      if (doctor.image) {
        const publicId = doctor.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`doctors/${publicId}`);
      }
      doctor.image = req.file.path;
    }

    await doctor.save();

    res.json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🗑 DELETE DOCTOR
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // 🧹 Remove image from Cloudinary
    if (doctor.image) {
      const publicId = doctor.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`doctors/${publicId}`);
    }

    await doctor.deleteOne();

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📋 GET ALL DOCTORS
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().select("-password");
    res.json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔍 GET SINGLE DOCTOR
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel
      .findById(req.params.id)
      .select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
