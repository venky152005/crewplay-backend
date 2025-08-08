import { Request, Response } from "express";
import Admin from "../../../model/admin.model";
import { sendEmail } from "../email";

export const forgotPassword = async (req: Request, res: Response):Promise<any>=> {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        await sendEmail(email,"Password Reset",`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset - CrewPlay</title>
    <style>
      body {
        font-family: "Segoe UI", sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        margin: 50px auto;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 30px;
      }
      .header h1 {
        color: #4e2cff;
        margin-bottom: 5px;
      }
      .header p {
        font-size: 16px;
        color: #555;
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        background-color: #4e2cff;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin: 30px 0;
      }
      .footer {
        font-size: 12px;
        color: #888;
        text-align: center;
        margin-top: 30px;
      }
      @media (max-width: 600px) {
        .container {
          padding: 20px;
        }
        .btn {
          display: block;
          width: 100%;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://yourdomain.com/logo.png" alt="CrewPlay Logo" width="80" />
        <h1>CrewPlay</h1>
        <p>Reset Your Password</p>
      </div>

      <p>Hello <strong>${admin.firstname} ${admin.lastname}</strong>,</p>
      <p>
        We received a request to reset your password. If this was you, please click the button below to reset it:
      </p>

      <a href="{reset_link}" class="btn">Reset Password</a>

      <p>If you did not request a password reset, you can safely ignore this email.</p>

      <p class="footer">
        This link will expire in 15 minutes. If you need help, contact our support team at
        <a href="mailto:support@crewplay.com">support@crewplay.com</a>.
      </p>
    </div>
  </body>
</html>`);

        return res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};


export const resetPassword = async(req: Request, res: Response): Promise<any> => {
    try {
        const{email, newPassword} = req.body;

        if(!email){
            return res.status(401).json({message: "Email is required"});
        }

        if(!newPassword){
            return res.status(401).json({message: "New password is required"});
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        admin.password = newPassword;
        await admin.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
}