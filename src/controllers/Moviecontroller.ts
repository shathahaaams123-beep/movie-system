import { Request, Response } from 'express';
import { Movie } from '../models/Movie';

let movies: Movie[] = [
  { id: "1", title: "Lupin", genre: "Crime", duration: 45, status: "Now Showing" },
  { id: "2", title: "Waqfet Reggala", genre: "Comedy", duration: 110, status: "Now Showing" }
];

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = movies.find((m) => m.id === id);

    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, genre, duration, status } = req.body;

    if (!title || !genre || !duration) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newMovie: Movie = {
      id: (movies.length + 1).toString(),
      title,
      genre,
      duration: Number(duration),
      status: status || "Now Showing"
    };

    movies.push(newMovie);
    res.status(201).json({ success: true, data: newMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};