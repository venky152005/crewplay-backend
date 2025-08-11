import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface VendorRequest extends Request {    
    user?: any; 
}

export const vendorMiddleware = async (req: VendorRequest, res: Response, next: NextFunction):Promise<any> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!process.env.JWT_SECRET_VENDOR) {
        return res.status(500).json({ message: "Server configuration error" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_VENDOR!) as { id: string };
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden" });
        
    }
}