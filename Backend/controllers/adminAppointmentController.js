import Appointment from "../models/appointmentModel.js";

// GET ALL APPOINTMENTS (ADMIN)
export const getAllAppointmentsAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name speciality")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE APPOINTMENT (ADMIN)
export const deleteAppointmentAdmin = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment)
      return res.status(404).json({ success: false, message: "Appointment not found" });

    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
