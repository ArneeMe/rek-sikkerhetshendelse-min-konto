// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { clearSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    await clearSession();

    // Use the request origin to build the redirect URL
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
}