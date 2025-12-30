import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * ============================
 * ADMIN LOGIN
 * ============================
 */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find admin
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // 4️⃣ Ensure JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // 5️⃣ Generate token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role || "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // 6️⃣ Send response
    return res.status(200).json({
      success: true,
      token,
      email: admin.email,
      role: admin.role || "admin",
      message: "Login successful",
    });
  } catch (error) {
    console.error("adminLogin error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ➕ Add new admin
export const addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      {
        id: newAdmin._id,
        email: newAdmin.email,
        role: newAdmin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ SEND TOKEN (even if frontend doesn't use it)
    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
    });
  } catch (error) {
    console.error("addAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};