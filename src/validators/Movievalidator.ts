import { Request, Response, NextFunction } from "express";

export const validateMovie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genre, duration, description, rating, status } = req.body;

  if (!title || !genre || !duration || !description || !status) {
    return res.status(400).json({
      message: "Title, genre, duration, description and status are required",
    });
  }

  if (typeof duration !== "number" || duration <= 0) {
    return res.status(400).json({
      message: "Duration must be a positive number",
    });
  }

  if (rating !== undefined && (rating < 0 || rating > 10)) {
    return res.status(400).json({
      message: "Rating must be between 0 and 10",
    });
  }

  if (!["Now Showing", "Coming Soon"].includes(status)) {
    return res.status(400).json({
      message: "Status must be Now Showing or Coming Soon",
    });
  }

  next();
};