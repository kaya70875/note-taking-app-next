import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextApiResponse } from "next";
import bcrypt from 'bcrypt';

export async function POST(req: Request , res : NextApiResponse) {
    try {
          await connectToDB();

          const body = await req.json();
          const {email , newPassword} = body;

          console.log(email , newPassword);

          if (!email || !newPassword) {
            return res.status(400).json({ error: "Email and new password are required" });
            }
        
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedPassword = await user.updateOne({ password: hashedPassword });

        return res.status(200).json({ message: "Password updated successfully" , data : updatedPassword });

    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }   
}