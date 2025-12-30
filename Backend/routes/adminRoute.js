import express from "express";
import { addAdmin, adminLogin } from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";



const adminRouter = express.Router();

// 🔓 PUBLIC
adminRouter.post("/login", adminLogin);
adminRouter.post("/register-admin", addAdmin);

// 🔐 PROTECTED
adminRouter.get("/verify", adminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

adminRouter.get("/dashboard", adminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to admin dashboard",
  });
});


export default adminRouter;
