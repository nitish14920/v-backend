import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export async function connectDB() {
  try {
    console.log(process.env.MONGODB_URI);
    const databaseConnectionReference = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST : ${databaseConnectionReference.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
}
