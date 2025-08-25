import { Request, Response } from "express";
import Booking from "../../model/booking.model";

export const getBookings = async (req: Request, res: Response):Promise<any> => {
    try {
        const { bookingId } = req.body;

        if (bookingId) {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json({ booking, message: "Booking fetched successfully" });
        } else {
            const bookings = await Booking.find();
            res.status(200).json({ bookings, message: "Bookings fetched successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
};

export const declineBooking = async (req: Request, res: Response):Promise<any> => {
    try {
        const { bookingId } = req.body;

        if(!bookingId){
            return res.status(400).json({ message: "Booking ID is required" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.isDeclined = true;
        await booking.save();

        res.status(200).json({ booking, message: "Booking declined successfully" });
    } catch (error) {
        
    }
}

export const approveBooking = async (req: Request, res: Response):Promise<any> => {
    try {
        const { bookingId } = req.body;

        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.isApproved = true;
        await booking.save();

        res.status(200).json({ booking, message: "Booking approved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error approving booking", error });
    }
};

export const deleteBooking = async (req: Request, res: Response):Promise<any> => {
    try {
        const { bookingId } = req.body;
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ booking: deletedBooking, message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting booking", error });
    }
};