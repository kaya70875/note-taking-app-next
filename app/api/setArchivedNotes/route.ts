import Note from "@models/note";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function PUT(request : Request) {
    try{
        await connectToDB();

        const body = await request.json();
        const {noteId , shouldArchive} = body;

        const updatedNote = await Note.findOneAndUpdate(
            {_id : noteId},
            {archived : shouldArchive},
            {new : true}
        )

        return NextResponse.json({
            message : 'Note archived successfully!',
            data : updatedNote,
        });

    } catch(e) {
        console.log('error connecting to db : ' , e);
        return NextResponse.json({
            message : 'Error archiving note',
            error : e,
        });
    }
}