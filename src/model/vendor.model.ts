import mongoose from "mongoose";

export interface IVendor extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const vendorSchema = new mongoose.Schema<IVendor>({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String }
}, {
    timestamps: true
});

const Vendor = mongoose.model<IVendor>("Vendor", vendorSchema);
export default Vendor;
