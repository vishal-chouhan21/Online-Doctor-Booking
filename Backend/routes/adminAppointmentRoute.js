import express from "express";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
import {
  getAllAppointmentsAdmin,
  deleteAppointmentAdmin,
} from "../controllers/adminAppointmentController.js";

const router = express.Router();

// 🔒 All appointments for admin
router.get("/", adminAuth, getAllAppointmentsAdmin);

// 🔒 Delete appointment (admin)
router.delete("/:id", adminAuth, deleteAppointmentAdmin);

export default router;
