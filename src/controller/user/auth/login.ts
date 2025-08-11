import { Request, Response } from "express";
import User from "../../../model/user.model";
import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";

export const login = async(req: Request, res:Response):Promise<any>=>{
    try {
        const { email, password } = req.body;

        if(!email){
            res.status(401).json({ message: "email is required" });
        }

        if(!password){
           res.status(401).json({ message: "password is required"});
        }

        const user = await User.findOne({ email });

        console.log("User found:", user);
        if(!user) {
            return res.status(404).json({ message: "User not found" }); 
        }

        console.log("User password:", user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15h' });

        res.status(200).json({ message: "Login successful", token, user: { id: user._id, email: user.email } });

    } catch (error) {
        res.status(501).json({ message: "Server Error", error });
    }
}