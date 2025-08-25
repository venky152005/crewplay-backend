import { Router } from "express";
import { login } from "../controller/admin/auth/login";
import { Signup } from "../controller/admin/auth/signup";
import { forgotPassword } from "../controller/admin/auth/forgot";
import { resetPassword } from "../controller/user/auth/forgot";
import { blockUser, getUsers } from "../controller/admin/user";
import { approveBooking, declineBooking, deleteBooking, getBookings } from "../controller/admin/bookings";
import { blockVendor, getvendors, verifyVendor } from "../controller/admin/vendor";

const adminRouter = Router();

adminRouter.post("/login", login);
adminRouter.post("/signup", Signup);
adminRouter.post("/forgot-password", forgotPassword);
adminRouter.post("/reset-password", resetPassword);
adminRouter.get("/get-users", getUsers);
adminRouter.get("/get-bookings", getBookings);
adminRouter.post("/approve-booking", approveBooking);
adminRouter.post("/decline-booking", declineBooking);
adminRouter.delete("/delete-booking", deleteBooking);
adminRouter.post("/block-user", blockUser);
adminRouter.post("/get-vendors", getvendors);
adminRouter.post("/verify-vendor", verifyVendor);
adminRouter.post("/block-vendor", blockVendor);

export default adminRouter;