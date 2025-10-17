// src/lib/session.ts
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'cyber-game-session';

export interface Session {
    teamId: number;
    teamName: string;
    isAdmin: boolean;
}

export async function setSession(session: Session) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
    });
}

export async function getSession(): Promise<Session | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
        return null;
    }

    try {
        return JSON.parse(sessionCookie.value);
    } catch {
        return null;
    }
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}