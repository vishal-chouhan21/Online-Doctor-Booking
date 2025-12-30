import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("☁️ Cloudinary ENV:", {
    name: process.env.CLOUDINARY_NAME || "MISSING",
    key: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
    secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
  });
};

export default connectCloudinary;
