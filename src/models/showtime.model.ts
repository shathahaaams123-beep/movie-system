import mongoose, { Schema, Document } from "mongoose";

export interface Showtime extends Document {
  movieId: mongoose.Types.ObjectId;
  cinemaHall: string;
  date: string;
  startTime: string;
  totalCapacity: number;
  ticketPrice: number;
}

const showtimeSchema = new Schema<Showtime>({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  cinemaHall: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
});

const ShowtimeModel = mongoose.model<Showtime>("Showtime", showtimeSchema);

export default ShowtimeModel;