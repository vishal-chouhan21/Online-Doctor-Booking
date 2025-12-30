import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import adminAppointmentRouter from "./routes/adminAppointmentRoute.js"; 
import otpRouter from "./routes/otpRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// DB & Cloudinary
await connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true,
}));

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/appointments/admin", adminAppointmentRouter); 
app.use("/api/otp", otpRouter);

app.get("/", (req,res) => res.status(200).json({success:true,message:"API is working"}));

// 404 handler
app.use((req,res) => res.status(404).json({success:false,message:"Route not found"}));

// Global error handler
app.use((err,req,res,next) => {
  console.error(err);
  res.status(err?.status || 500).json({success:false,message:err?.message || "Internal server error"});
});

// Start server
app.listen(port,()=>console.log(`✅ Server running at http://localhost:${port}`));
