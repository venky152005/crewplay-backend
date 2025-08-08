import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
}

const adminSchema = new mongoose.Schema<IAdmin>({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;