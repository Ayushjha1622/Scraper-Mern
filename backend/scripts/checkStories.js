import mongoose from "mongoose";
import Story from "../src/models/Story.js";
import dotenv from "dotenv";

dotenv.config();

const checkStories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Story.countDocuments();
    console.log(`Total stories in DB: ${count}`);
    if (count > 0) {
      const latest = await Story.find().sort({ createdAt: -1 }).limit(5);
      console.log("Latest 5 stories:", latest.map(s => s.title));
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkStories();
