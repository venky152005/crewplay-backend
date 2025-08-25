import { Request, Response } from "express";
import User from "../../model/user.model";

export const getUsers = async (req: Request, res: Response):Promise<any> => {
    try {
        const { userid } = req.body;

        if (userid) {
            const user = await User.findById(userid);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ user, message: "User fetched successfully" });
        } else {
            const users = await User.find();
            res.status(200).json({ users, message: "Users fetched successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// export const verifyUser = async (req: Request, res: Response) => {
//     try {
//         const { userid } = req.body;

//         const user = await User.findById(userid);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user.isVerified = true;
//         await user.save();

//         res.status(200).json({ user, message: "User verified successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error verifying user", error });
//     }
// };

export const blockUser = async (req: Request, res: Response):Promise<any> => {
    try {
        const { userid } = req.body;

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isBlocked = true;
        await user.save();

        res.status(200).json({ user, message: "User blocked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error blocking user", error });
    }
};