// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateCompanyCode } from '@/lib/constants';
import { setSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json(
                { error: 'Company code is required' },
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

        // Set session cookie
        await setSession({
            companyId: company.id,
            companyName: company.name,
            isAdmin: company.isAdmin || false,
        });

        return NextResponse.json({ success: true, company });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}