import { Request, Response } from "express";
import Movie from "../models/Movie";
export const createMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      message: "Movie created successfully",
      movie,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to create movie",
      error: error.message,
    });
  }
};
export const getMovies = async (req: Request, res: Response) => {
  try {
    const { title, genre, status } = req.query;

    const filter: any = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (genre) {
      filter.genre = { $regex: genre, $options: "i" };
    }

    if (status) {
      if (status !== "Now Showing" && status !== "Coming Soon") {
        return res.status(400).json({
          message: "Status must be Now Showing or Coming Soon",
        });
      }

      filter.status = status;
    }

    const movies = await Movie.find(filter);

    res.status(200).json(movies);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to get movies",
      error: error.message,
    });
  }
};
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get movie",
      error,
    });
  }
};
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      movie,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to update movie",
      error: error.message,
    });
  }
};
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete movie",
      error,
    });
  }
};