import { Router } from "express";
import { Signup } from "../controller/user/auth/signup";
import { login } from "../controller/user/auth/login";
import { resetPassword } from "../controller/user/auth/forgot";
import { forgotPassword } from "../controller/user/auth/forgot";

const router = Router();

router.post("/signup", Signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

export default router