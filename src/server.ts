import express from "express";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(express.json());

app.use("/api/bookings", bookingRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});