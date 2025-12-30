import Appointment from "../models/appointmentModel.js";

/* ================= CREATE ================= */
export const createAppointment = async (req, res) => {
  try {
    const {
      name,
      phone,
      gender,
      doctorId,
      appointmentDate,
      appointmentTime,
    } = req.body;

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

    const appointment = await Appointment.create({
      doctor: doctorId,
      name,
      phone,
      gender,
      appointmentDate,
      appointmentTime,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: console.log(error),
    });
  }
};



/* ================= READ ================= */
export const getAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate("doctor", "name");
  res.json({ success: true, data: appointments });
};



export const getAppointmentById = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  res.json({ success: true, data: appointment });
};



export const getAppointmentsByDoctor = async (req, res) => {
  const appointments = await Appointment.find({
    doctor: req.params.doctorId,
  }).populate("doctor", "name");
  res.json({ success: true, data: appointments });
};



export const getBookedSlots = async (req, res) => {
  const { date } = req.query;

  const appointments = await Appointment.find({
    doctor: req.params.doctorId,
    appointmentDate: date,
  });

  const bookedSlots = appointments.map((a) => a.appointmentTime);

  res.json({ success: true, data: bookedSlots });
};



export const deleteAppointment = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Appointment deleted" });
};
