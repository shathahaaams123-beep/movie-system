import { Request, Response } from "express";
import Booking from "../models/Booking";
import Showtime from "../models/Showtime";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { customer, showtime, selectedSeats } = req.body;

    if (!customer || !showtime || !selectedSeats) {
      return res.status(400).json({
        message: "Customer, showtime and selected seats are required",
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

    const showtimeData = await Showtime.findById(showtime);

    if (!showtimeData) {
      return res.status(404).json({
        message: "Showtime not found",
      });
    }

    const showtimeDateTime = new Date(
      `${showtimeData.date}T${showtimeData.startTime}`
    );

    if (showtimeDateTime <= new Date()) {
      return res.status(400).json({
        message: "You can only book upcoming showtimes",
      });
    }

    const existingBookings = await Booking.find({
      showtime,
      bookingStatus: { $in: ["pending", "confirmed"] },
    });

    const bookedSeats = existingBookings.flatMap(
      (booking) => booking.selectedSeats
    );

    const alreadyBooked = selectedSeats.filter((seat: string) =>
      bookedSeats.includes(seat)
    );

    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        message: "Some seats are already booked",
        seats: alreadyBooked,
      });
    }

    const totalBookedSeats = bookedSeats.length;
    const requestedSeats = selectedSeats.length;

    if (totalBookedSeats + requestedSeats > showtimeData.totalCapacity) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    const totalPrice =
      showtimeData.ticketPrice * selectedSeats.length;

    const booking = await Booking.create({
      customer,
      showtime,
      selectedSeats,
      totalPrice,
      bookingStatus: "confirmed",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error,
    });
  }
};
export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const { customer } = req.params;

    if (!customer) {
      return res.status(400).json({
        message: "Customer is required",
      });
    }

    const bookings = await Booking.find({
      customer,
    }).populate("showtime");

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get bookings",
      error,
    });
  }
};
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id).populate("showtime");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get booking",
      error,
    });
  }
};
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel booking",
      error,
    });
  }
};