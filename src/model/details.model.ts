import mongoose from "mongoose";

export interface IDetails extends mongoose.Document{
    vendorid: string;
    turfname: string;
    turfimage: string[];
    sport: string[];
    location: string;
    price: number;
    description: string;
    slots: string[];
    amenities: string[];
    numberofplayer: number;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const DetailsSchema = new mongoose.Schema<IDetails>({
    vendorid: { type: String,},
    turfname: { type: String },
    turfimage: { type: [String] },
    sport: { type: [String] },
    location: { type: String },
    price: { type: Number },
    description: { type: String },
    numberofplayer: { type: Number },
    slots: { type: [String] },
    amenities: { type: [String] },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Details = mongoose.model<IDetails>("Details", DetailsSchema);

export default Details;