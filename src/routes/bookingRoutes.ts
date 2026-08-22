import express from "express";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController";

import {
  authenticate,
  authorizeRoles,
} from "../middleware/auth.middleware";

import { validateBooking } from "../validators/booking.validator";

const router = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags:
 *       - Bookings
 *     summary: Create a new booking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             showtime: "65f987654321abcdef654321"
 *             selectedSeats:
 *               - "A1"
 *               - "A2"
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid booking data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied - Customer role required
 *       404:
 *         description: Showtime not found
 */
router.post(
  "/",
  authenticate,
  authorizeRoles("Customer"),
  validateBooking,
  createBooking
);

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get my bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied - Customer role required
 */
router.get(
  "/my",
  authenticate,
  authorizeRoles("Customer"),
  getMyBookings
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get booking by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking found
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied - Customer role required
 *       404:
 *         description: Booking not found
 */
router.get(
  "/:id",
  authenticate,
  authorizeRoles("Customer"),
  getBookingById
);

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Cancel a booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Booking is already cancelled
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied - Customer role required
 *       404:
 *         description: Booking not found
 */
router.patch(
  "/:id/cancel",
  authenticate,
  authorizeRoles("Customer"),
  cancelBooking
);

export default router;