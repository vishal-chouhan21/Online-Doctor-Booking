import Appointment from "../models/appointmentModel.js";

/**
 * GET all appointments (ADMIN)
 */
export const getAllAppointmentsAdmin = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name speciality") // populate doctor info
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ADD new appointment (ADMIN)
 */
export const addAppointmentAdmin = async (req, res) => {
  try {
    const { name, phone, gender, doctorId, appointmentDate, appointmentTime } = req.body;

    // ❌ prevent double booking
    const alreadyBooked = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Slot already booked",
      });
    }

    const newAppointment = await Appointment.create({
      name,
      phone,
      gender,
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
    });

    res.status(201).json({
      success: true,
      message: "Appointment added successfully",
      data: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE appointment (ADMIN)
 */
export const deleteAppointmentAdmin = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};