// src/lib/db.ts
import { supabase } from './supabase';
import { Event, LogEntry, Server } from '@/types';
import { applyStandardFilters } from './db-helpers';
import type {
    DatabaseEvent,
    DatabaseLog,
    DatabaseServer,
    DatabaseEmailLog,
    DatabaseUserActivity,
    DatabaseNetworkConnection,
    DatabaseScheduledEvent,
    DatabaseGameSession,
} from '@/types/database';

// ===== GAME SESSION MANAGEMENT =====

export async function startGameSession() {
    const { data, error } = await supabase
        .from('game_sessions')
        .insert({
            started_at: new Date().toISOString(),
            duration_minutes: 120,
            status: 'active',
        })
        .select()
        .single();

    if (error) {
        console.error('Error starting game session:', error);
        return null;
    }

    return data as DatabaseGameSession;
}

export async function getActiveGameSession() {
    const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('status', 'active')
        .order('started_at', { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching game session:', error);
        return null;
    }

    return data as DatabaseGameSession | null;
}

export async function endGameSession() {
    const activeSession = await getActiveGameSession();
    if (!activeSession) return null;

    const { data, error } = await supabase
        .from('game_sessions')
        .update({ status: 'ended' })
        .eq('id', activeSession.id)
        .select()
        .single();

    if (error) {
        console.error('Error ending game session:', error);
        return null;
    }

    return data as DatabaseGameSession;
}

export async function getScheduledEventsForTime(minutesElapsed: number) {
    const { data, error } = await supabase
        .from('scheduled_events')
        .select('*')
        .lte('trigger_at_minutes', minutesElapsed)
        .order('trigger_at_minutes', { ascending: true });

    if (error) {
        console.error('Error fetching scheduled events:', error);
        return [];
    }

    return (data || []) as DatabaseScheduledEvent[];
}

// ===== SERVERS =====

export async function getServers(): Promise<Server[]> {
    const { data, error } = await supabase
        .from('servers')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching servers:', error);
        return [];
    }

    return (data || []) as Server[];
}

// ===== EVENTS =====

export async function getEvents(companyId: number, division?: string): Promise<Event[]> {
    const staticQuery = supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

    const { data: staticEvents, error: staticError } = await applyStandardFilters(
        staticQuery,
        companyId,
        division
    );

    if (staticError) {
        console.error('Error fetching events:', staticError);
        return [];
    }

    const session = await getActiveGameSession();
    let scheduledEvents: Event[] = [];

    if (session) {
        const minutesElapsed = Math.floor(
            (Date.now() - new Date(session.started_at).getTime()) / 60000
        );

        const scheduledQuery = supabase
            .from('scheduled_events')
            .select('*')
            .lte('trigger_at_minutes', minutesElapsed);

        const { data: scheduled, error: scheduledError } = await applyStandardFilters(
            scheduledQuery,
            companyId,
            division
        );

        if (!scheduledError && scheduled) {
            const typedScheduled = scheduled as DatabaseScheduledEvent[];
            scheduledEvents = typedScheduled.map((event) => ({
                id: `scheduled-${event.id}`,
                type: event.type,
                title: event.title,
                content: event.content,
                severity: event.severity,
                from: event.from_sender || undefined,
                read: false,
                timestamp: new Date(
                    new Date(session.started_at).getTime() +
                    event.trigger_at_minutes * 60000
                ),
            }));
        }
    }

    const typedStaticEvents = (staticEvents || []) as DatabaseEvent[];
    const mappedStaticEvents: Event[] = typedStaticEvents.map((event) => ({
        id: event.id,
        type: event.type,
        title: event.title,
        content: event.content,
        severity: event.severity,
        from: event.from_sender || undefined,
        read: event.read,
        timestamp: new Date(event.created_at),
    }));

    return [...mappedStaticEvents, ...scheduledEvents].sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
}

// ===== LOGS =====

export async function getLogs(companyId: number, division?: string, source?: string): Promise<LogEntry[]> {
    let query = supabase
        .from('logs')
        .select('*')
        .order('timestamp', { ascending: false });

    query = applyStandardFilters(query, companyId, division);

    if (source) {
        query = query.eq('source', source);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching logs:', error);
        return [];
    }

    const typedLogs = (data || []) as DatabaseLog[];
    return typedLogs.map((log) => ({
        id: log.id,
        timestamp: new Date(log.timestamp),
        level: log.level,
        source: log.source,
        message: log.message,
    }));
}

// ===== EMAIL LOGS =====

export async function getEmailLogs(companyId: number, division?: string) {
    const query = supabase
        .from('email_logs')
        .select('*')
        .order('timestamp', { ascending: false });

    const { data, error } = await applyStandardFilters(query, companyId, division);

    if (error) {
        console.error('Error fetching email logs:', error);
        return [];
    }

    return (data || []) as DatabaseEmailLog[];
}

// ===== USER ACTIVITY =====

export async function getUserActivity(companyId: number, division?: string) {
    const query = supabase
        .from('user_activity')
        .select('*')
        .order('last_login', { ascending: false });

    const { data, error } = await applyStandardFilters(query, companyId, division);

    if (error) {
        console.error('Error fetching user activity:', error);
        return [];
    }

    return (data || []) as DatabaseUserActivity[];
}

// ===== NETWORK CONNECTIONS =====

export async function getNetworkConnections(companyId: number, division?: string) {
    const query = supabase
        .from('network_connections')
        .select('*')
        .order('timestamp', { ascending: false });

    const { data, error } = await applyStandardFilters(query, companyId, division);

    if (error) {
        console.error('Error fetching network connections:', error);
        return [];
    }

    return (data || []) as DatabaseNetworkConnection[];
}

// ===== ADMIN FUNCTIONS =====

export async function updateServer(serverId: string, updates: {
    status?: string;
    load?: number;
    alerts?: number;
}) {
    const { data, error } = await supabase
        .from('servers')
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq('id', serverId)
        .select();

    if (error) {
        console.error('Error updating server:', error);
        return null;
    }

    return data?.[0] as DatabaseServer | undefined;
}

export async function createEvent(event: {
    companyId: number | null;
    division: string | null;
    type: string;
    title: string;
    content: string;
    severity: string;
    from?: string;
}) {
    const { data, error } = await supabase.from('events').insert({
        company_id: event.companyId,
        division: event.division,
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

    return data?.[0] as DatabaseEvent | undefined;
}

export async function createLog(log: {
    companyId: number | null;
    division: string | null;
    level: string;
    source: string;
    message: string;
}) {
    const { data, error } = await supabase.from('logs').insert({
        company_id: log.companyId,
        division: log.division,
        level: log.level,
        source: log.source,
        message: log.message,
    }).select();

    if (error) {
        console.error('Error creating log:', error);
        return null;
    }

    return data?.[0] as DatabaseLog | undefined;
}

export async function createScheduledEvent(event: {
    triggerAtMinutes: number;
    division: string | null;
    type: string;
    title: string;
    content: string;
    severity: string;
    from?: string;
}) {
    const { data, error } = await supabase.from('scheduled_events').insert({
        trigger_at_minutes: event.triggerAtMinutes,
        division: event.division,
        type: event.type,
        title: event.title,
        content: event.content,
        severity: event.severity,
        from_sender: event.from,
    }).select();

    if (error) {
        console.error('Error creating scheduled event:', error);
        return null;
    }

    return data?.[0] as DatabaseScheduledEvent | undefined;
}