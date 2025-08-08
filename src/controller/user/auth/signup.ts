import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../model/user.model";
import { sendEmail } from "../email";

export const Signup = async(req: Request, res: Response)=>{
    try {
        const { FirstName, LastName, Email, Password } = req.body;

        if(!FirstName){
            res.status(401).json({ message: "firstname is required"});
        }

        if(!LastName){
            res.status(401).json({ message: "lastname is required"});
        }

        if(!Email){
            res.status(401).json({ message: "email is required"});
        }

        if(!Password){
            res.status(401).json({ message: "password is required"});
        }

        const existingUser = await User.findOne({ Email });
        if(existingUser){
            res.status(500).json({ message: "User already exist"})
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await User.create({ FirstName, LastName, Email, Password: hashedPassword });

        await sendEmail(Email, `${FirstName} ${LastName} Successfully Registered`,`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to CrewPlay</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: "Segoe UI", sans-serif;
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
        margin-bottom: 30px;
      }
      .header img {
        width: 80px;
        margin-bottom: 10px;
      }
      .header h1 {
        color: #4e2cff;
        font-size: 24px;
        margin: 0;
      }
      .message {
        font-size: 16px;
        color: #333;
        line-height: 1.6;
      }
      .message strong {
        color: #4e2cff;
      }
      .button {
        display: inline-block;
        background-color: #4e2cff;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        margin-top: 30px;
        font-weight: bold;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #777;
        text-align: center;
      }
      @media (max-width: 600px) {
        .container {
          padding: 20px;
        }
        .header h1 {
          font-size: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://yourdomain.com/logo.png" alt="CrewPlay Logo" />
        <h1>Welcome to CrewPlay</h1>
      </div>

      <div class="message">
        <p>Hi <strong>${FirstName} ${LastName}</strong>,</p>
        <p>
          🎉 Your registration was successful! We're thrilled to have you join the CrewPlay community.
        </p>
        <p>
          You can now log in and explore exciting features, book sessions, participate in events, and more.
        </p>

        <a href="{login_link}" class="button">Go to Dashboard</a>

        <p style="margin-top: 30px;">
          If you have any questions or need help, feel free to reach us at
          <a href="mailto:support@crewplay.com">support@crewplay.com</a>.
        </p>
      </div>

      <div class="footer">
        © 2025 CrewPlay. All rights reserved.<br />
        This is an automated email, please do not reply.
      </div>
    </div>
  </body>
</html>
`)

        res.status(200).json({ message:"User successfully registered", success: true})

    } catch (error) {
        res.status(501).json({message: "Error", error})
    }
}