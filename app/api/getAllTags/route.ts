import { authOptions } from "@lib/auth";
import Note from "@models/note";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request : Request) {
    try {
        const session = await getServerSession(authOptions);
        await connectToDB();

        const userId = session?.user.id;

        const tagsArray = await Note.find({ userId } , {tags : 1 , _id : 0}).lean();
        
        const tags = [...new Set(tagsArray.flatMap((note) => note.tags))];

        return NextResponse.json({
            message : 'Notes fetched successfully!',
            data : tags,
        });
    }
    catch(e) {
        console.log('error connecting to db : ' , e);
        return NextResponse.json({
            message : 'Error fetching notes',
            error : e,
        });
    }
} 