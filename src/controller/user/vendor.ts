import { Request, Response } from "express";
import Details from "../../model/details.model";

export const getvendordetails = async (req: Request, res: Response):Promise<any> => {
    try {
        const { vendorId } = req.body;

        let vendor;
        if (!vendorId) {
            vendor = await Details.find();
        } else {
            vendor = await Details.findOne({ _id: vendorId });
        }

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found", success: false });
        }

        return res.status(200).json({ vendor, success: true });
    } catch (error) {
        console.error("Error fetching vendor details:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};