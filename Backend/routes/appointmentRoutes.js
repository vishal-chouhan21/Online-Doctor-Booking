import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
  getAppointmentsByDoctor,
  getBookedSlots,
} from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.post(
  "/",
  createAppointment
);

appointmentRouter.get("/", getAppointments);

// 🔒 SPECIFIC ROUTES FIRST
appointmentRouter.get(
  "/doctor/:doctorId/booked-slots",
  getBookedSlots
);

appointmentRouter.get(
  "/doctor/:doctorId",
  getAppointmentsByDoctor
);

// ⚠️ GENERIC ROUTES LAST
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.delete("/:id", deleteAppointment);

export default appointmentRouter;
