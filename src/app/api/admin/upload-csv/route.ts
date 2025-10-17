// src/app/api/admin/upload-csv/route.ts
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

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const table = formData.get('table') as string;

        if (!file || !table) {
            return NextResponse.json(
                { error: 'Missing file or table' },
                { status: 400 }
            );
        }

        // Read CSV file
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
            return NextResponse.json(
                { error: 'CSV must have headers and at least one data row' },
                { status: 400 }
            );
        }

        // Parse CSV
        const headers = lines[0].split(',').map(h => h.trim());
        const rows = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const row: Record<string, string> = {};

            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });

            // Map CSV headers to database columns
            const mappedRow = mapCsvToDatabase(row, table);
            if (mappedRow) {
                rows.push(mappedRow);
            }
        }

        // Bulk insert
        const { data, error } = await supabase
            .from(table)
            .insert(rows)
            .select();

        if (error) {
            console.error(`Error inserting into ${table}:`, error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            inserted: data?.length || 0,
            message: `Successfully inserted ${data?.length || 0} rows into ${table}`
        });
    } catch (error) {
        console.error('Error in CSV upload:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}

function mapCsvToDatabase(row: Record<string, string>, table: string): Record<string, unknown> | null {
    switch (table) {
        case 'app_logs':
            return {
                timestamp: row.Timestamp,
                event_type: row.EventType,
                user_name: row.User,
                source_ip: row.SourceIP,
                target_resource: row.TargetResource,
                action: row.Action,
                details: row.Details,
                result: row.Result,
            };

        case 'db_logs':
            return {
                timestamp: row.Timestamp,
                event_type: row.EventType,
                user_name: row.User,
                source_ip: row.SourceIP,
                database_name: row.Database,
                query: row.Query,
                rows_affected: row.RowsAffected,
                details: row.Details,
                result: row.Result,
            };

        case 'azure_audit_logs':
            return {
                timestamp: row.Timestamp,
                actor: row.Actor,
                action: row.Action,
                target: row.Target,
                target_type: row.TargetType,
                details: row.Details,
                source_ip: row.SourceIP,
                result: row.Result,
            };

        case 'azure_signin_logs':
            return {
                timestamp: row.Timestamp,
                user_name: row.User,
                source_ip: row.SourceIP,
                location: row.Location,
                application: row.Application,
                status: row.Status,
                failure_reason: row.FailureReason || null,
                device_info: row.DeviceInfo,
            };

        default:
            return null;
    }
}