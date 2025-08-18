import { Request, Response } from "express";
import Booking from "../../model/booking.model";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { sendEmail } from "./email";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

export const bookings = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    try {
        const userId = req.user.id;
        const { sport, venue, date, timeslot, noOfPlayers, name, email, phone, specialRequests } = req.body;

        if(!userId){
            return res.status(400).json({ message: "User is required", success: false})
        }

        if(!sport) {
            return res.status(400).json({ message: "Sport is required", success: false });
        }

        if(!venue) {
            return res.status(400).json({ message: "Venue is required", success: false });
        }

        if(!date) {
            return res.status(400).json({ message: "Date is required", success: false });
        }

        if(!timeslot) {
            return res.status(400).json({ message: "Timeslot is required", success: false });
        }

        if(!noOfPlayers || noOfPlayers <= 0) {
            return res.status(400).json({ message: "Number of players must be greater than 0", success: false });
        }

        if(!name) {
            return res.status(400).json({ message: "Name is required", success: false });
        }

        if(!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        if(!phone) {
            return res.status(400).json({ message: "Phone number is required", success: false });
        }

        // const option = await razorpay.orders.create({
        //   amount: amount * 100,
        //   currency: "INR",
        //   receipt: `receipt_${Date.now()}`
        // });

        const bookingExists = await Booking.findOne({
            userId,
            name,
            sport,
            venue,
            date,
            timeslot
        });

        if (timeslot == bookingExists?.timeslot || date == bookingExists?.date || venue == bookingExists?.venue) {
            return res.status(400).json({ message: "Booking already exists for this slot", success: false });
        }

        const newBooking = new Booking({
            userId,
            sport,
            venue,
            date,
            timeslot,
            noOfPlayers,
            name,
            email,
            phone,
            specialRequests
        });

        await newBooking.save();

        const formattedDate = new Date(newBooking.date).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

        await sendEmail(email,"Successfully turf booked",`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>CrewPlay — Booking Confirmed</title>
  <style>
    /* Basic inline-friendly styles */
    body { margin:0; padding:0; background:#f4f6f8; font-family: Arial, Helvetica, sans-serif; color:#111; }
    .email-wrap { width:100%; background:#f4f6f8; padding:24px 0; }
    .container { max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 20px rgba(16,24,40,0.08); }
    .header { background:#0ea5a3; color:#fff; padding:20px 24px; text-align:center; }
    .logo { font-weight:700; letter-spacing:0.4px; font-size:20px; }
    .content { padding:24px; }
    h1 { margin:0 0 12px 0; font-size:22px; color:#0f172a; }
    p { margin:8px 0 16px 0; line-height:1.5; color:#334155; }
    .booking-card { border:1px solid #e6eef0; border-radius:8px; padding:16px; background:#fbfeff; }
    .row { display:flex; justify-content:space-between; gap:12px; margin-bottom:8px; }
    .label { color:#64748b; font-size:13px; }
    .value { color:#0f172a; font-weight:600; font-size:14px; }
    .btn { display:inline-block; background:#0ea5a3; color:#ffffff; padding:12px 18px; border-radius:8px; text-decoration:none; font-weight:600; }
    .muted { color:#64748b; font-size:13px; }
    .footer { padding:18px 24px; text-align:center; font-size:13px; color:#94a3b8; }
    @media (max-width:480px) {
      .row { flex-direction:column; align-items:flex-start; }
    }
  </style>
</head>
<body>
  <div class="email-wrap">
    <div class="container">
      <div class="header">
        <div class="logo">CrewPlay</div>
        <div style="font-size:13px; opacity:0.95; margin-top:6px;">Booking Confirmed</div>
      </div>

      <div class="content">
        <h1>Hi ${name}, your booking is confirmed 🎉</h1>
        <p>
          Thanks for booking with CrewPlay. We've successfully reserved the turf for your match. Below are the booking details — please keep them handy.
        </p>

        <div class="booking-card" role="article" aria-label="Booking details">
          <div class="row">
            <div>
              <div class="label">Booking ID</div>
              <div class="value">${newBooking._id}</div>
            </div>
            <div>
              <div class="label">Status</div>
              <div class="value" style="color:#059669;">Confirmed</div>
            </div>
          </div>

          <div class="row">
            <div>
              <div class="label">Turf</div>
              <div class="value">{{turfName}}</div>
            </div>
            <div>
              <div class="label">Venue</div>
              <div class="value">${newBooking.venue}</div>
            </div>
          </div>

          <div class="row">
            <div>
              <div class="label">Date</div>
              <div class="value">${formattedDate}</div>
            </div>
            <div>
              <div class="label">Time</div>
              <div class="value">${newBooking.timeslot}</div>
            </div>
          </div>

          <div class="row">
            <div>
              <div class="label">Players</div>
              <div class="value">${newBooking.noOfPlayers}</div>
            </div>
            <div>
              <div class="label">Amount Paid</div>
              <div class="value">₹ {{amountPaid}}</div>
            </div>
          </div>

          <div style="margin-top:12px;">
            <div class="label">Address</div>
            <div class="muted">${newBooking.venue}</div>
          </div>
        </div>

        <div style="margin:18px 0; text-align:center;">
          <a href="{{viewBookingUrl}}" class="btn" target="_blank" rel="noopener">View Booking</a>
          <!-- optional calendar link -->
          <a href="{{addToCalendarUrl}}" style="margin-left:10px; text-decoration:none; padding:12px 16px; border-radius:8px; display:inline-block; border:1px solid #e6eef0; background:#fff; color:#0f172a; font-weight:600;">Add to Calendar</a>
        </div>

        <p class="muted" style="font-size:13px;">
          Need to make changes? You can cancel or reschedule up to <strong>{{cancellationWindow}}</strong> before the start time. For support, contact us at <a href="mailto:support@crewplay.in">support@crewplay.in</a> or <a href="tel:{{supportPhone}}">{{supportPhone}}</a>.
        </p>

        <hr style="border:none; border-top:1px solid #eef2f6; margin:18px 0;" />

        <p style="font-size:13px; color:#475569;">
          <strong>Important:</strong> Please arrive 10–15 minutes before your slot to warm up and to avoid conflicts. Bring any booking confirmation (Booking ID) when you arrive.
        </p>
      </div>

      <div class="footer">
        © 2025 CrewPlay • <a href="{{privacyUrl}}" style="color:#94a3b8; text-decoration:underline;">Privacy Policy</a> • <a href="{{termsUrl}}" style="color:#94a3b8; text-decoration:underline;">Terms</a>
      </div>
    </div>
  </div>
</body>
</html>
`)
        res.status(201).json({newBooking, message: "Booking created successfully", success: true});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getbookings = async(req: AuthenticatedRequest, res: Response):Promise<any>=>{
  try {
    const userId = req.user.id;
    console.log(userId)

    if(!userId){
        return res.status(400).json({message:"User is not found"});
    }

    const bookings = await Booking.find({userId});

    if(!bookings){
        return res.status(401).json({message:"Records not found"});
    }

    res.status(200).json({ bookings, success: true });
  } catch (error) {
    res.status(500).json({message:"An Error Occured",error});
  }
}