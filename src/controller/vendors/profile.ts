import { Request, Response } from "express";
import Vendor from "../../model/vendor.model";
import { VendorRequest } from "../../middleware/vendorMiddleware";

export const getVendorProfile = async (req: VendorRequest, res: Response):Promise<any> => {
    try {
        const vendorId = req.user.id;
        const vendor = await Vendor.findById(vendorId).select("-password");

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json({vendor, message: "Vendor profile fetched successfully"});
    } catch (error) {
        console.error("Error fetching vendor profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateVendorProfile = async (req: VendorRequest, res: Response):Promise<any> => {
    try {
        const vendorId = req.user.id;
        const { firstname, lastname, email, password } = req.body;

        if (!vendorId) {
            return res.status(400).json({ message: "Vendor ID is required" });
        }

        const updatedVendor = await Vendor.findByIdAndUpdate(
            vendorId,
            { firstname, lastname, email, password },
            { new: true }
        ).select("-password");

        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json({ updatedVendor, message: "Vendor profile updated successfully" });
    } catch (error) {
        console.error("Error updating vendor profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};