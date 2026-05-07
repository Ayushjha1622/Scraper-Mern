import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

import storyRoutes from "./routes/storyRoutes.js";

import notFound from "./middleware/notFoundMiddlesware.js";

import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/stories", storyRoutes);


app.use(notFound);

app.use(errorHandler);

export default app;