import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  customer: mongoose.Types.ObjectId;
  showtime: mongoose.Types.ObjectId;
  selectedSeats: string[];
  totalPrice: number;
  bookingStatus: "pending" | "confirmed" | "cancelled";
}

const bookingSchema = new Schema<IBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    showtime: {
      type: Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },

    selectedSeats: {
      type: [String],
      required: true,
      validate: {
        validator: (seats: string[]) => seats.length > 0,
        message: "At least one seat must be selected",
      },
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;