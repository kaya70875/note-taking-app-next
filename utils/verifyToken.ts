import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

async function verifyToken(token : string) {
    try {
        const {payload} = await jwtVerify(token , secret);
        return payload;// This contains the decoded information. ex. email
    } catch(error : any){
        console.error(error.message);
        throw new Error('Invalid or expired token');
    }
}

export default verifyToken;