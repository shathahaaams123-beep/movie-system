import { Request, Response, NextFunction } from "express";

export const validateBooking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { showtime, selectedSeats } = req.body;

  if (!showtime) {
    return res.status(400).json({
      message: "Showtime is required",
    });
  }

  if (!selectedSeats) {
    return res.status(400).json({
      message: "Selected seats are required",
    });
  }

  if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
    return res.status(400).json({
      message: "At least one seat must be selected",
    });
  }

  const uniqueSeats = new Set(selectedSeats);

  if (uniqueSeats.size !== selectedSeats.length) {
    return res.status(400).json({
      message: "Duplicate seats are not allowed",
    });
  }

  const validSeatFormat = /^[A-Z]+[0-9]+$/;

  const invalidSeats = selectedSeats.filter(
    (seat: unknown) =>
      typeof seat !== "string" || !validSeatFormat.test(seat)
  );

  if (invalidSeats.length > 0) {
    return res.status(400).json({
      message: "Invalid seat number format",
      seats: invalidSeats,
    });
  }

  next();
};