import { Router } from "express";

import {
  getAllShowtimes,
  createShowtime,
} from "../controllers/showtime.controller";

const router = Router();

/**
 * @swagger
 * /api/showtimes:
 *   get:
 *     tags:
 *       - Showtimes
 *     summary: Get all showtimes
 *     description: Get all available movie showtimes
 *     responses:
 *       200:
 *         description: Showtimes retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", getAllShowtimes);

/**
 * @swagger
 * /api/showtimes:
 *   post:
 *     tags:
 *       - Showtimes
 *     summary: Create a new showtime
 *     description: Create a new movie showtime
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - cinemaHall
 *               - date
 *               - startTime
 *               - totalCapacity
 *               - ticketPrice
 *             properties:
 *               movieId:
 *                 type: string
 *                 example: "65f987654321abcdef123456"
 *               cinemaHall:
 *                 type: string
 *                 example: "Hall A"
 *               date:
 *                 type: string
 *                 example: "2026-08-25"
 *               startTime:
 *                 type: string
 *                 example: "18:00"
 *               totalCapacity:
 *                 type: number
 *                 example: 100
 *               ticketPrice:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Showtime created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/", createShowtime);

export default router;