import { Router } from "express";
import { Signup } from "../controller/user/auth/signup";
import { login } from "../controller/user/auth/login";
import { resetPassword } from "../controller/user/auth/forgot";
import { forgotPassword } from "../controller/user/auth/forgot";
import { bookings, getbookings } from "../controller/user/booking";
import { authmiddleware } from "../middleware/authMiddleware";
import { createRating, getRatings } from "../controller/user/ratings";
import { getvendordetails } from "../controller/user/vendor";

const router = Router();

router.post("/signup", Signup);
router.post("/login", login);
router.post("/bookings", authmiddleware, bookings);
router.post("/bookings-list",authmiddleware, getbookings);
router.post("/ratings", authmiddleware, createRating);
router.post("/ratings-list", authmiddleware, getRatings);
router.post("/vendor-details", getvendordetails);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

export default router