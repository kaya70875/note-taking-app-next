import { authOptions } from "@lib/auth";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    await connectToDB();

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!newPassword) {
      return NextResponse.json("Missing new password", { status: 400 });
    }

    const user = await User.findOne({ userId });

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return NextResponse.json("Incorrect password", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassword = await user?.updateOne({
      password: hashedPassword,
      new: true,
    });

    return NextResponse.json({
      message: "Password updated successfully",
      status: 200,
      data: updatedPassword,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
