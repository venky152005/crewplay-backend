import mongoose from "mongoose";

export interface IBooking extends mongoose.Document {
  userId: string;
  sport: string;
  venue: string;
  date: Date;
  timeslot: string;
  noOfPlayers: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

const bookingSchema = new mongoose.Schema<IBooking>({
  userId: { type: String },
  sport: { type: String },
  venue: { type: String },
  date: { type: Date },
  timeslot: { type: String },
  noOfPlayers: { type: Number },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  specialRequests: { type: String, default: '' }
}, {
  timestamps: true
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;