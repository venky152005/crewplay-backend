import { Router } from "express";
import { Login } from "../controller/vendors/auth/login";
import { Signup } from "../controller/vendors/auth/signup";
import { forgotPassword, resetPassword } from "../controller/vendors/auth/forgot";
import { vendorMiddleware } from "../middleware/vendorMiddleware";
import { getVendorProfile, updateVendorProfile } from "../controller/vendors/profile";

const vendor = Router()

vendor.post("/login",Login);
vendor.post("/signup",Signup);
vendor.get("/profile", vendorMiddleware, getVendorProfile);
vendor.put("/profile/update", vendorMiddleware, updateVendorProfile);
vendor.post("/forgot/password",forgotPassword);
vendor.post("/reset/password",resetPassword);

export default vendor;