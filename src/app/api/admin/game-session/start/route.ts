// src/app/api/admin/game-session/start/route.ts
import { NextResponse } from 'next/server';
import { startGameSession } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST() {
    try {
        const session = await getSession();

        // Only admins can start games
        if (!session?.isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const gameSession = await startGameSession();

        if (!gameSession) {
            return NextResponse.json(
                { error: 'Failed to start game session' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            session: gameSession
        });
    } catch (error) {
        console.error('Error in start game API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}