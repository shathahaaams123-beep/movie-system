import mongoose, { Schema, Document } from "mongoose";
export interface IMovie extends Document {
  title: string;
  genre: string;
  duration: number;
  description: string;
  posterUrl?: string;
  rating?: number;
  status: "Now Showing" | "Coming Soon";
}

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  genre: {
    type: String,
    required: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: true,
    min: 1,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  posterUrl: {
    type: String,
    trim: true,
  },

  rating: {
    type: Number,
    min: 0,
    max: 10,
  },

  status: {
    type: String,
    required: true,
    enum: ["Now Showing", "Coming Soon"],
  },
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;