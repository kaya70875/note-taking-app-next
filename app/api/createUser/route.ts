import user from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcryptjs";

export async function POST(req : Request) {
    const { email, password } = await req.json();

    try {
        await connectToDB();

        const userExist = await user.findOne({ email });

        if(userExist) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const currentUser = await user.create({ name : 'user' , email, password: hashedPassword });

        const savedUser = await currentUser.save();
        console.log(savedUser);

        return new Response(
            JSON.stringify({ message: 'User created successfully' }),
            { status: 201 }
        )
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}