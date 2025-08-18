import { Request, Response } from "express";
import Rating from "../../model/rating.model";

export const createRating = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, vendorId, rating, comment } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!vendorId) {
            return res.status(400).json({ message: "Vendor ID is required" });
        }

        if (!rating) {
            return res.status(400).json({ message: "Rating is required" });
        }

        const newRating = new Rating({
            userId,
            vendorId,
            rating,
            comment
        });

        await newRating.save();
        return res.status(201).json({ message: "Rating created successfully", data: newRating });
    } catch (error) {
        return res.status(500).json({ message: "Error creating rating", error });
    }
};

export const getRatings = async (req: Request, res: Response): Promise<any> => {
    try {
        const { vendorId } = req.body;

        const ratings = await Rating.find({ vendorId });
        return res.status(200).json({ message: "Ratings fetched successfully", data: ratings });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching ratings", error });
    }
};