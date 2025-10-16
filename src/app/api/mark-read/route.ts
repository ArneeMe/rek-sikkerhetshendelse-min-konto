// src/app/api/mark-read/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { markEventAsRead } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { eventId } = await request.json();

        if (!eventId) {
            return NextResponse.json(
                { error: 'Missing eventId' },
                { status: 400 }
            );
        }

        // Pass both eventId and teamId from session
        const success = await markEventAsRead(eventId, session.teamId);

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to mark event as read' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in mark-read API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}