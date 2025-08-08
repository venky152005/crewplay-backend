import mongoose from "mongoose";

export interface IUser extends mongoose.Document{
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    Otp: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const user = new mongoose.Schema<IUser>({
    FirstName: { type: String },
    LastName: { type: String },
    Email: { type: String },
    Password: { type: String },
    Otp: { type: String },
    isVerified: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});

const User = mongoose.model<IUser>("User", user);
export default User;

