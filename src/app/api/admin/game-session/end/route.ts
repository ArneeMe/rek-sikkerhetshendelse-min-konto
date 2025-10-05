// src/app/api/admin/game-session/end/route.ts
import { NextResponse } from 'next/server';
import { endGameSession } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST() {
    try {
        const session = await getSession();

        // Only admins can end games
        if (!session?.isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const gameSession = await endGameSession();

        if (!gameSession) {
            return NextResponse.json(
                { error: 'No active game session to end' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            session: gameSession
        });
    } catch (error) {
        console.error('Error in end game API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
