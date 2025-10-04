// src/lib/db.ts
import { supabase } from './supabase';
import { Event, LogEntry, Server } from '@/types';

// ===== GAME SESSION MANAGEMENT =====

// Start a new game session (for all companies)
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

    return data;
}

// Get current active game session
export async function getActiveGameSession() {
    const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('status', 'active')
        .order('started_at', { ascending: false })
        .limit(1)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
        console.error('Error fetching game session:', error);
        return null;
    }

    return data;
}

// End current game session
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

    return data;
}

// Get scheduled events that should be visible based on elapsed time
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

    return data || [];
}

// ===== SERVERS =====

// Fetch servers (basestations)
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

// Fetch events for a specific company and division
// Now combines static events + scheduled events based on game time
export async function getEvents(companyId: number, division?: string): Promise<Event[]> {
    // Get static events
    let staticQuery = supabase
        .from('events')
        .select('*')
        .or(`company_id.eq.${companyId},company_id.is.null`)
        .order('created_at', { ascending: false });

    // Filter by division if provided (not for admins)
    if (division) {
        staticQuery = staticQuery.or(`division.eq.${division},division.is.null`);
    }

    const { data: staticEvents, error: staticError } = await staticQuery;

    if (staticError) {
        console.error('Error fetching events:', staticError);
        return [];
    }

    // Get active game session
    const session = await getActiveGameSession();

    let scheduledEvents: Event[] = [];
    if (session) {
        // Calculate minutes elapsed
        const minutesElapsed = Math.floor(
            (Date.now() - new Date(session.started_at).getTime()) / 60000
        );

        // Get scheduled events that should be visible
        let scheduledQuery = supabase
            .from('scheduled_events')
            .select('*')
            .lte('trigger_at_minutes', minutesElapsed);

        // Filter by division if provided (not for admins)
        if (division) {
            scheduledQuery = scheduledQuery.or(`division.eq.${division},division.is.null`);
        }

        const { data: scheduled, error: scheduledError } = await scheduledQuery;

        if (!scheduledError && scheduled) {
            scheduledEvents = scheduled.map((event) => ({
                id: `scheduled-${event.id}`,
                type: event.type as Event['type'],
                title: event.title,
                content: event.content,
                severity: event.severity as Event['severity'],
                from: event.from_sender || undefined,
                read: false,
                timestamp: new Date(
                    new Date(session.started_at).getTime() +
                    event.trigger_at_minutes * 60000
                ),
            }));
        }
    }

    // Combine and map static events
    const mappedStaticEvents = (staticEvents || []).map((event) => ({
        id: event.id,
        type: event.type as Event['type'],
        title: event.title,
        content: event.content,
        severity: event.severity as Event['severity'],
        from: event.from_sender || undefined,
        read: event.read,
        timestamp: new Date(event.created_at),
    }));

    // Merge and sort by timestamp
    return [...mappedStaticEvents, ...scheduledEvents].sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    ) as Event[];
}

// ===== LOGS =====

// Fetch logs for a specific company and division
export async function getLogs(companyId: number, division?: string, source?: string): Promise<LogEntry[]> {
    let query = supabase
        .from('logs')
        .select('*')
        .or(`company_id.eq.${companyId},company_id.is.null`)
        .order('timestamp', { ascending: false });

    // Filter by division if provided (not for admins)
    if (division) {
        query = query.or(`division.eq.${division},division.is.null`);
    }

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

// ===== ADMIN FUNCTIONS =====

// Admin: Update server status
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

    return data?.[0];
}

// Admin: Create new event
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

    return data?.[0];
}

// Admin: Create new log
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

    return data?.[0];
}

// Admin: Create scheduled event
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

    return data?.[0];
}