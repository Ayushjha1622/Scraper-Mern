import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

/*
========================================
MIDDLEWARE
========================================
*/

app.use(cors());

app.use(express.json());

/*
========================================
HEALTH CHECK ROUTE
========================================
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});

export default app;
