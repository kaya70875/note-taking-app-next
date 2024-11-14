import Note from "@models/note";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectToDB();

    const notes = await Note.find({}).lean();

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