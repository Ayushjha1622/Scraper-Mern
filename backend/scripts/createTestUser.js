import mongoose from "mongoose";
import User from "../src/models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: "test@example.com" });
    if (!existing) {
      const user = await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });
      console.log("Test user created:", user);
    } else {
      console.log("Test user already exists.");
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createTestUser();
