import mongoose from "mongoose";

export interface IUser extends mongoose.Document{
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    password: string;
    otp: string;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const user = new mongoose.Schema<IUser>({
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String, enum:["male","female"] },
    email: { type: String },
    password: { type: String },
    otp: { type: String },
    isVerified: { type: Boolean },
    isBlocked: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});

const User = mongoose.model<IUser>("User", user);
export default User;

