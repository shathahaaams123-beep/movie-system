import { Request, Response } from "express";
import Showtime from "../models/showtime.model";

export const getAllShowtimes = async (
  req: Request,
  res: Response
) => {
  try {
    const showtimes = await Showtime.find().populate("movieId");

    return res.status(200).json({
      success: true,
      data: showtimes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

export const createShowtime = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      movieId,
      cinemaHall,
      date,
      startTime,
      totalCapacity,
      ticketPrice,
    } = req.body;

    if (
      !movieId ||
      !cinemaHall ||
      !date ||
      !startTime ||
      totalCapacity === undefined ||
      ticketPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newShowtime = await Showtime.create({
      movieId,
      cinemaHall,
      date,
      startTime,
      totalCapacity,
      ticketPrice,
    });

    return res.status(201).json({
      success: true,
      data: newShowtime,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};