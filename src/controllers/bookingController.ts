import { Request, Response } from "express";
import Booking from "../models/Booking";
import Showtime from "../models/showtime.model";

interface BookingRequest extends Request {
  user?: {
    userId?: string;
    id?: string;
    role?: string;
  };
}

export const createBooking = async (
  req: BookingRequest,
  res: Response
) => {
  try {
    const { showtime, selectedSeats } = req.body;

    const customer = req.user?.userId;

    if (!customer) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (!showtime || !selectedSeats) {
      return res.status(400).json({
        message: "Showtime and selected seats are required",
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

    if (
      totalBookedSeats + requestedSeats >
      showtimeData.totalCapacity
    ) {
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

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create booking",
      error,
    });
  }
};

export const getMyBookings = async (
  req: BookingRequest,
  res: Response
) => {
  try {
    const customer = req.user?.userId;

    if (!customer) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const bookings = await Booking.find({
      customer,
    }).populate("showtime");

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get bookings",
      error,
    });
  }
};

export const getBookingById = async (
  req: BookingRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const customer = req.user?.userId;

    if (!customer) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const booking = await Booking.findOne({
      _id: id,
      customer,
    }).populate("showtime");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get booking",
      error,
    });
  }
};

export const cancelBooking = async (
  req: BookingRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const customer = req.user?.userId;

    if (!customer) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const booking = await Booking.findOne({
      _id: id,
      customer,
    });

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

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to cancel booking",
      error,
    });
  }
};