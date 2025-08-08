import { Router } from "express";
import { login } from "../controller/admin/auth/login";
import { Signup } from "../controller/admin/auth/signup";
import { forgotPassword } from "../controller/admin/auth/forgot";
import { resetPassword } from "../controller/user/auth/forgot";

const adminRouter = Router();

adminRouter.post("/login", login);
adminRouter.post("/signup", Signup);
adminRouter.post("/forgot-password", forgotPassword);
adminRouter.post("/reset-password", resetPassword);


export default adminRouter;