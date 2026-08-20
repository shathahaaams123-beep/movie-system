import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/Movieroute";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Movie System API is running",
  });
});

connectDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});