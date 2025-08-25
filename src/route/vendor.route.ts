import { Router } from "express";
import { Login } from "../controller/vendors/auth/login";
import { Signup } from "../controller/vendors/auth/signup";
import { forgotPassword, resetPassword } from "../controller/vendors/auth/forgot";
import { vendorMiddleware } from "../middleware/vendorMiddleware";
import { getVendorProfile, updateVendorProfile } from "../controller/vendors/profile";
import multer from "multer";
import { vendorDetails } from "../controller/vendors/details";
import { approveBooking, declineBooking, getBookings } from "../controller/vendors/bookings";

const upload = multer({ storage: multer.memoryStorage() });

const vendor = Router()

vendor.post("/login",Login);
vendor.post("/signup",Signup);
vendor.get("/profile", vendorMiddleware, getVendorProfile);
vendor.put("/profile/update", vendorMiddleware, updateVendorProfile);
vendor.post("/forgot/password",forgotPassword);
vendor.post("/reset/password",resetPassword);
vendor.post("/details", vendorMiddleware, upload.array("turfimage"), vendorDetails);
vendor.post("/booking/list", vendorMiddleware, getBookings);
vendor.post("/booking/accept", vendorMiddleware, approveBooking);
vendor.post("/booking/decline", vendorMiddleware, declineBooking);

export default vendor;