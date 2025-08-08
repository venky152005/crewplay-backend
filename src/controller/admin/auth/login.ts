import { Request, Response } from "express";
import Admin from "../../../model/admin.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async(req: Request, res: Response):Promise<any>=>{
    try {
        const{ email, password } = req.body;

        if(!email){
            return res.status(401).json({message:"email is required"});
        }

        if(!password){
            return res.status(401).json({message:"password is required"})
        }

        const admin = await Admin.findOne({ email });

        if(!admin){
           return res.status(404).json({message:"Admin not found"})
        }

        const passwordcompare = await bcrypt.compare(password, admin.password);
        if(!passwordcompare){
            res.status(400).json({message:"Invalid Password"});
        }

        if(!process.env.JWT_SECRET_ADMIN) {
            return res.status(500).json({ message: "JWT secret is not defined" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_ADMIN!, { expiresIn: '15h' });

        res.status(200).json({ message: "Login successful", token, admin: { id: admin._id, email: admin.email }, success: true });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
}