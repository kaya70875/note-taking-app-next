import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const protectedRoutes = ['/settings', '/notes' , '/archived'];
    const nowAllowed = ['/'];
    const currentPath = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(currentPath);
    const notAllowed = nowAllowed.includes(currentPath);

    if(isProtectedRoute) {
        const sessionToken = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');

        if(!sessionToken) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    else if(notAllowed) {
        return NextResponse.redirect(new URL('/notes', req.url));
    }

    return NextResponse.next();
}