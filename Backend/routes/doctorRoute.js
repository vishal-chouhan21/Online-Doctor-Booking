import express from "express";
import upload from "../middlewares/upload.js";
import {
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
} from "../controllers/doctorController.js";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";

const doctorRouter = express.Router();

// ✅ Public routes
doctorRouter.get("/", getAllDoctors);
doctorRouter.get("/:id", getDoctorById);

// ✅ Admin protected routes
doctorRouter.post(
  "/add-doctor",
  adminAuth,
  upload.single("image"),
  addDoctor
);

doctorRouter.put(
  "/update-doctor/:id",
  adminAuth,
  upload.single("image"),
  updateDoctor
);

doctorRouter.delete(
  "/delete-doctor/:id",
  adminAuth,
  deleteDoctor
);

export default doctorRouter;
