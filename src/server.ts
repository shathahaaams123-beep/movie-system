import connectDB from "./config/db";
import dotenv from "dotenv";
import express from "express";
import bookingRoutes from "./routes/bookingRoutes";
import userRoutes from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});