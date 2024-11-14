import Note from "@models/note";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();
    const { title, content, tags, userId, archived, createdAt, updatedAt } =
      body;

    const newNote = await Note.create({
      title,
      content,
      tags,
      userId,
      archived,
      createdAt,
      updatedAt,
    });

    return NextResponse.json({
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error creating note",
    });
  }
}
