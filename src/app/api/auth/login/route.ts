// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateCompanyCode } from '@/lib/constants';
import { setSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        const { code, division } = await request.json();

        if (!code) {
            return NextResponse.json(
                { error: 'Company code is required' },
                { status: 400 }
            );
        }

        if (!division) {
            return NextResponse.json(
                { error: 'Division is required' },
                { status: 400 }
            );
        }

        const company = validateCompanyCode(code);

        if (!company) {
            return NextResponse.json(
                { error: 'Invalid company code' },
                { status: 401 }
            );
        }

        // Set session cookie with division
        await setSession({
            companyId: company.id,
            companyName: company.name,
            division: division,
            isAdmin: company.isAdmin || false,
        });

        return NextResponse.json({ success: true, company, division });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}