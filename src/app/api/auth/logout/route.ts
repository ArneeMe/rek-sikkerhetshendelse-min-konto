// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { clearSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    await clearSession();

    // Use 303 status to force GET method on redirect
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url, 303);
}