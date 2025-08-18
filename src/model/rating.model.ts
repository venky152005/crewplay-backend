import mongoose from "mongoose";

export interface IRating extends mongoose.Document {
    userId: string;
    vendorId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const rating = new mongoose.Schema<IRating>({
    userId: { type: String },
    vendorId: { type: String },
    rating: { type: Number },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Rating = mongoose.model<IRating>("Rating", rating);
export default Rating;