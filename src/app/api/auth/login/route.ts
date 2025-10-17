// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateTeamCode } from '@/lib/constants';
import { setSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json(
                { error: 'Team code is required' },
                { status: 400 }
            );
        }

        const team = validateTeamCode(code);

        if (!team) {
            return NextResponse.json(
                { error: 'Invalid team code' },
                { status: 401 }
            );
        }

        // Set session cookie
        await setSession({
            teamId: team.id,
            teamName: team.name,
            isAdmin: team.isAdmin || false,
        });

        return NextResponse.json({ success: true, team });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}