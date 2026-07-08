import mongoose from "mongoose";
import { DB_URI } from "./dotenv.js";

const connectDB = async () => {
  try {
    if (!DB_URI) {
      throw new Error("MongoURI is not defined in .env");
    }
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
