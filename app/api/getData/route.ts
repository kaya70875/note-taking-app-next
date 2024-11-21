import { authOptions } from "@lib/auth";
import Note from "@models/note";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    await connectToDB();

    if(!session || !session.user.id) {
      return NextResponse.json({
        message: "Unauthorized",
        status: 401
      });
    }

    const userId = session.user.id;

    const notes = await Note.find({ userId }).lean();

    return NextResponse.json({
      notes,
    });
  } catch(e) {
    console.error(e);
    return NextResponse.json({
      message: "Error fetching notes",
      status : 500
    });
    
  }
}