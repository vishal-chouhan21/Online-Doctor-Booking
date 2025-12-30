import express from "express";
import {
  sendAppointmentOtp,
  verifyOtpAndBook,
} from "../controllers/otpController.js";

const otpRouter = express.Router();

otpRouter.post("/send-otp", sendAppointmentOtp);
otpRouter.post("/verify-otp", verifyOtpAndBook);

export default otpRouter;
