// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('cyber-game-session');
    const { pathname } = request.nextUrl;

    // Protect /game/* routes
    if (pathname.startsWith('/game')) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const session = JSON.parse(sessionCookie.value);

            // Admin trying to access game? Allow it
            if (session.isAdmin) {
                return NextResponse.next();
            }

            // Regular team user
            if (session.teamId) {
                return NextResponse.next();
            }
        } catch {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Protect /admin/* routes
    if (pathname.startsWith('/admin')) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const session = JSON.parse(sessionCookie.value);

            if (!session.isAdmin) {
                return NextResponse.redirect(new URL('/game', request.url));
            }
        } catch {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/game/:path*', '/admin/:path*'],
    runtime: 'nodejs',
};