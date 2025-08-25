import { Request, Response } from "express";
import Details from "../../model/details.model";

export const getvendors = async (req: Request, res: Response) => {
    try {
        const { vendorid } = req.body;

        let vendors;
        if (vendorid) {
            vendors = await Details.find({ vendorid });
        } else {
            vendors = await Details.find();
        }
        res.status(200).json({vendors, message: "Vendors fetched successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendors", error });
    }
};

export const verifyVendor = async (req: Request, res: Response):Promise<any> => {
    try {
        const { vendorid } = req.body;

        const vendor = await Details.findById(vendorid);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        vendor.isVerified = true;
        await vendor.save();

        res.status(200).json({ vendor, message: "Vendor verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying vendor", error });
    }
};

export const blockVendor = async (req: Request, res: Response):Promise<any> => {
    try {
        const { vendorid } = req.body;

        const vendor = await Details.findById(vendorid);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        vendor.isBlocked = true;
        await vendor.save();

        res.status(200).json({ vendor, message: "Vendor blocked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error blocking vendor", error });
    }
};