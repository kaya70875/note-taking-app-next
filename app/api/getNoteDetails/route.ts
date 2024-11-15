import Note from "@models/note";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    try {
        await connectToDB();

        const body = await request.json();
        const { noteId } = body;

        const relevantNotes = await Note.findById(noteId).select("content title tags updatedAt");

        return NextResponse.json({
            message: "Note fetched successfully",
            data: relevantNotes
        })
    }
    catch(e) {
        console.log(e);
        return NextResponse.json({
            message: "Error fetching note",
            status: 500
        })
    }
}