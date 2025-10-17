// src/app/api/admin/channels/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getChannels } from '@/lib/db';

export async function GET() {
    try {
        const session = await getSession();

        if (!session?.isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const channels = await getChannels();

        return NextResponse.json({
            success: true,
            channels
        });
    } catch (error) {
        console.error('Error fetching channels:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}