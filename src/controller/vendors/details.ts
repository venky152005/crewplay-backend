import { Request, Response } from "express";
import Details from "../../model/details.model";
import dotenv from "dotenv";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ObjectCannedACL, S3Client } from "@aws-sdk/client-s3";
dotenv.config();

if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS credentials are not set in environment variables");
}

const s3 = new S3Client({
    region: process.env.AWS_REGION, 
    credentials: { 
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
    } 
});


export const vendorDetails = async(req: Request, res: Response):Promise<any> => {
    try {
        const { vendorid, turfname, location, price, description, slots, amenities } = req.body;
        const turfimage = req.files as Express.Multer.File[];

        if(!vendorid) {
            return res.status(400).json({ message: "Vendor ID is required" });
        }

        if(!turfimage) {
            return res.status(400).json({ message: "Turf image is required" });
        }

        if(!location) {
            return res.status(400).json({ message: "Location is required" });
        }

        if(!price) {
            return res.status(400).json({ message: "Price is required" });
        }

        if(!description) {
            return res.status(400).json({ message: "Description is required" });
        }

        if(!slots || slots.length === 0) {
            return res.status(400).json({ message: "At least one slot is required" });
        }

        if(!amenities || amenities.length === 0) {
            return res.status(400).json({ message: "At least one amenity is required" });
        }

        const existingDetails = await Details.findOne({ vendorid, turfname, location });
        console.log("Existing Details:", existingDetails);

        if(existingDetails) {
            return res.status(400).json({ message: "Details for this vendor and turf already exist" });
        }

        const turfimages: string[] = [];

        for(const image of turfimage) {
            const uploadParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `turf-images/${vendorid}/${Date.now()}_${image.originalname}`,
                Body: image.buffer,
                ACL: "public-read" as ObjectCannedACL,
                ContentType: image.mimetype
            };

            console.log("Upload Params:", uploadParams);

        // const uploadParams = {
        //     Bucket: process.env.S3_BUCKET_NAME,
        //     Key: `turf-images/${vendorid}/${Date.now()}_${turfimage[0].originalname}`,
        //     Body: turfimage[0].buffer,
        //     ACL: "public-read" as ObjectCannedACL,
        //     ContentType: turfimage[0].mimetype
        // };


        const uploadResult = await s3.send(new PutObjectCommand(uploadParams));

        console.log("Upload Result:", uploadResult);
            
        const turfimageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
        turfimages.push(turfimageUrl);
    }

        const newDetails = new Details({
            vendorid,
            turfname,
            turfimage: turfimages, 
            location,
            price,
            description,
            slots,
            amenities
        });

        await newDetails.save();
        return res.status(201).json({ message: "Vendor details added successfully", success: true, data: newDetails });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching vendor details",error });
    }
};


export const getVendorProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const { vendorid } = req.body;

        if (!vendorid) {
            return res.status(400).json({ message: "Vendor ID is required" });
        }

        const vendorDetails = await Details.findOne({ vendorid });

        if (!vendorDetails) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        return res.status(200).json({ message: "Vendor details fetched successfully", success: true, data: vendorDetails });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching vendor profile", error });
    }
};