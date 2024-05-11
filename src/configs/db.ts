import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
