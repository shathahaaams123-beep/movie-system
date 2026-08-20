import express from "express";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController";

import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticate, createBooking);

router.get("/my", authenticate, getMyBookings);

router.get("/:id", authenticate, getBookingById);

router.patch("/:id/cancel", authenticate, cancelBooking);

export default router;