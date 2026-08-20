import express from "express";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController";

import { authenticate } from "../middleware/auth.middleware";
import { validateBooking } from "../validators/booking.validator";

const router = express.Router();

router.post("/", authenticate, validateBooking, createBooking);

router.get("/my", authenticate, getMyBookings);

router.get("/:id", authenticate, getBookingById);

router.patch("/:id/cancel", authenticate, cancelBooking);

export default router;