import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

import bookingRoutes from "./routes/bookingRoutes";
import userRoutes from "./routes/user.routes";
import movieRoutes from "./routes/Movieroute";
import showtimeRoutes from "./routes/showtime.routes";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/showtimes", showtimeRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Movie System API is running" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});