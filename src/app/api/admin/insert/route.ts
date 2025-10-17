// src/app/api/admin/insert/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session?.isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { table, data } = body;

        if (!table || !data) {
            return NextResponse.json(
                { error: 'Missing table or data' },
                { status: 400 }
            );
        }

        // Insert directly into the specified table
        const { data: inserted, error } = await supabase
            .from(table)
            .insert(data)
            .select()
            .single();

        if (error) {
            console.error(`Error inserting into ${table}:`, error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: inserted
        });
    } catch (error) {
        console.error('Error in insert API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}