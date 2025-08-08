import { Request, Response } from "express";
import Vendor from "../../../model/vendor.model";
import bcrypt from "bcrypt";
import { sendEmail } from "../email";

export const Signup = async (req: Request, res: Response):Promise<any> => {
    try {
        const{ firstname, lastname, email, password } = req.body;

        if (!firstname) {
            return res.status(400).json({ message: "First name is required" });
        }
        if (!lastname) {
            return res.status(400).json({ message: "Last name is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {   
            return res.status(409).json({ message: "Vendor already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const vendor = await Vendor.create({ firstname, lastname, email, password: hashedPassword });

        await sendEmail(email, `${firstname} ${lastname} your Registration Completed Successfully`,`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Vendor Registration Successful | CrewPlay</title>
  <style>
    body {
      margin: 0;
      background-color: #f4f6f8;
      font-family: "Segoe UI", sans-serif;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    }
    .header {
      text-align: center;
    }
    .header img {
      width: 80px;
      margin-bottom: 10px;
    }
    .header h1 {
      font-size: 24px;
      color: #4e2cff;
      margin: 0;
    }
    .content {
      margin-top: 30px;
      font-size: 16px;
      line-height: 1.6;
    }
    .content p {
      margin-bottom: 15px;
    }
    .button {
      display: inline-block;
      background-color: #4e2cff;
      color: #fff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: bold;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://yourdomain.com/logo.png" alt="CrewPlay Logo" />
      <h1>Welcome to CrewPlay, Partner!</h1>
    </div>

    <div class="content">
      <p>Hi <strong>${firstname} ${lastname}</strong>,</p>

      <p>
        🎉 We're excited to let you know that your <strong>vendor registration</strong> was successful on CrewPlay!
      </p>

      <p>
        You can now access your vendor dashboard, manage your services, accept bookings, and connect with thousands of users.
      </p>

      <a href="{vendor_dashboard_link}" class="button">Go to Vendor Dashboard</a>

      <p>
        If you need any help getting started, don’t hesitate to contact our support team at
        <a href="mailto:support@crewplay.com">support@crewplay.com</a>.
      </p>
    </div>

    <div class="footer">
      © 2025 CrewPlay. All rights reserved. <br />
      This is an automated email, please do not reply.
    </div>
  </div>
</body>
</html>
`)

        res.status(201).json({ message: "Vendor successfully registered", vendor: { id: vendor._id, email: vendor.email } });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}