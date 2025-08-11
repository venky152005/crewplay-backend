import mongoose from "mongoose";

export interface IUser extends mongoose.Document{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    otp: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const user = new mongoose.Schema<IUser>({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    otp: { type: String },
    isVerified: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});

const User = mongoose.model<IUser>("User", user);
export default User;

