import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export async function POST(req : Request) {
    const body = await req.json();
    const { email } = body;

    // Validate email format
    if(!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Generate a JWT token
    const token = jwt.sign({email} , process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '1h' });

    // Create a reset link with the token
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    try {
        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from : process.env.EMAIL_USER,
            to : email,
            subject : 'Password Reset Request',
            html : `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });

        return NextResponse.json({message : 'Reset email sent successfully.'}, { status: 200 });
    } catch (error) {
        console.error('Error sending reset email:', error);
        return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 });
    }
}