import connectDB from "./db";
import dotenv from "dotenv";
import express from "express";
import bookingRoutes from "./routes/bookingRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

dotenv.config();

connectDB();
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});