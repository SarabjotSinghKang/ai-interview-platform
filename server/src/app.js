import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to AI Interview Platform API 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);

export default app;