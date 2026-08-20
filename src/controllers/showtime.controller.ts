import { Request, Response } from 'express';
import { Showtime } from '../models/showtime.model';

let showtimes: Showtime[] = [
  { id: "101", movieId: "1", cinemaHall: "Hall A", startTime: "06:00 PM", availableSeats: 30 },
  { id: "102", movieId: "2", cinemaHall: "Hall B", startTime: "09:00 PM", availableSeats: 15 }
];

export const getAllShowtimes = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ success: true, data: showtimes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createShowtime = async (req: Request, res: Response) => {
  try {
    const { movieId, cinemaHall, startTime, availableSeats } = req.body;

    if (!movieId || !cinemaHall || !startTime) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const newShowtime: Showtime = {
      id: (showtimes.length + 101).toString(),
      movieId,
      cinemaHall,
      startTime,
      availableSeats: Number(availableSeats) || 20
    };

    showtimes.push(newShowtime);
    res.status(201).json({ success: true, data: newShowtime });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};