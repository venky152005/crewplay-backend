import {Request, Response} from "express";
import Vendor from "../../../model/vendor.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, vendor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        if(!process.env.JWT_SECRET_VENDOR) {   
            return res.status(500).json({ message: "JWT secret is not defined" });
        }

        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET_VENDOR!, { expiresIn: '15h' });

        res.status(200).json({ message: "Login successful", vendor: { id: vendor._id, email: vendor.email }, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}