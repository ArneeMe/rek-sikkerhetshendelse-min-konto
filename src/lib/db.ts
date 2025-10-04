// src/lib/db.ts
import { supabase } from './supabase';
import { Event, LogEntry } from '@/types';

// Fetch events for a specific company (or all if companyId is null)
export async function getEvents(companyId: number) {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .or(`company_id.eq.${companyId},company_id.is.null`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching events:', error);
        return [];
    }

    return (data || []).map((event) => ({
        id: event.id,
        type: event.type,
        title: event.title,
        content: event.content,
        severity: event.severity,
        from: event.from_sender,
        read: event.read,
        timestamp: new Date(event.created_at),
    })) as Event[];
}

// Fetch logs for a specific company (or all if companyId is null)
export async function getLogs(companyId: number, source?: string) {
    let query = supabase
        .from('logs')
        .select('*')
        .or(`company_id.eq.${companyId},company_id.is.null`)
        .order('timestamp', { ascending: false });

    // Filter by server source if provided
    if (source) {
        query = query.eq('source', source);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching logs:', error);
        return [];
    }

    return (data || []).map((log) => ({
        id: log.id,
        timestamp: new Date(log.timestamp),
        level: log.level,
        source: log.source,
        message: log.message,
    })) as LogEntry[];
}

// Admin: Create new event
export async function createEvent(event: {
    companyId: number | null;
    type: string;
    title: string;
    content: string;
    severity: string;
    from?: string;
}) {
    const { data, error } = await supabase.from('events').insert({
        company_id: event.companyId,
        type: event.type,
        title: event.title,
        content: event.content,
        severity: event.severity,
        from_sender: event.from,
    }).select();

    if (error) {
        console.error('Error creating event:', error);
        return null;
    }

    return data?.[0];
}

// Admin: Create new log
export async function createLog(log: {
    companyId: number | null;
    level: string;
    source: string;
    message: string;
}) {
    const { data, error } = await supabase.from('logs').insert({
        company_id: log.companyId,
        level: log.level,
        source: log.source,
        message: log.message,
    }).select();

    if (error) {
        console.error('Error creating log:', error);
        return null;
    }

    return data?.[0];
}