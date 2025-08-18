import mongoose from "mongoose";

export interface IDetails extends mongoose.Document{
    vendorid: string;
    turfname: string;
    turfimage: string[];
    location: string;
    price: number;
    description: string;
    slots: string[];
    amenities: string[];
    createdAt: Date;
    updatedAt: Date;
}

const DetailsSchema = new mongoose.Schema<IDetails>({
    vendorid: { type: String,},
    turfname: { type: String },
    turfimage: { type: [String] },
    location: { type: String },
    price: { type: Number },
    description: { type: String },
    slots: { type: [String] },
    amenities: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Details = mongoose.model<IDetails>("Details", DetailsSchema);

export default Details;