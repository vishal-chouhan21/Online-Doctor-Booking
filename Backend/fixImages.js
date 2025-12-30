// Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Doctor from "./models/doctorModel.js";

async function fixImages() {
  try {
    // Debug: check if MONGO_URI is loaded
    console.log("MONGO_URL:", process.env.MONGODB_URL);
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGO_URI is undefined. Check your .env file!");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Doctor.updateMany(
      { image: { $in: ["doc1.jpg", "https://example.com/images/doc2.jpg"] } },
      { $set: { image: "" } }
    );

    console.log("Images cleaned successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixImages();
