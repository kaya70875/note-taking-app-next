import user from "@models/user";
import { connectToDB } from "@utils/database";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions : NextAuthOptions = {
    providers : [
        Credentials({
            name : 'Credentials',
            id : 'credentials',
            credentials : {
                email : { label : 'Email', type : 'text' },
                password : { label : 'Password', type : 'password' }
            },

            async authorize(credentials, req) {
                await connectToDB();

                const currentUser = await user.findOne({
                    email : credentials?.email,
                }).select('+password');

                if(!currentUser) throw new Error('Wrong Email');

                const passwordMatch = await bcrypt.compare(
                    credentials?.password!,
                    currentUser.password
                )

                if(!passwordMatch) throw new Error('Wrong Password');

                console.log('Current User : ', currentUser);

                return {
                    id : currentUser._id.toString(),
                    name : currentUser.name,
                    email : currentUser.email,
                }
            }
        })
    ],
    session : {
        strategy : 'jwt',
    },
    callbacks : {
        async jwt({user , token}) {
            if(user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session , token}){
            session.user.id = token.id;
            return session;
        }
    }
}