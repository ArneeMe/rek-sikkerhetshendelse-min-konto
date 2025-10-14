// src/lib/db-events.ts
// Events management - inbox items, alerts, emails, tweets

import { supabase } from '../supabase';
import { Event } from '@/types';
import type { DatabaseEvent, DatabaseScheduledEvent } from '@/types/database';
import { getActiveGameSession } from './db-game-sessions';

// Helper to apply team filter
function applyTeamFilter<T>(query: T, teamId: number): T {
    if (teamId === 0) {
        // Admin sees everything
        return query;
    }
    // Regular team sees their own data + broadcasts (null team_id)
    return (query as unknown as { or: (filter: string) => T }).or(`team_id.eq.${teamId},team_id.is.null`);
}

export async function getEvents(teamId: number): Promise<Event[]> {
    // Get static events
    const staticQuery = supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

    const { data: staticEvents, error: staticError } = await applyTeamFilter(
        staticQuery,
        teamId
    );

    if (staticError) {
        console.error('Error fetching events:', staticError);
        return [];
    }

    // Get scheduled events based on game time
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

        const { data: scheduled, error: scheduledError } = await applyTeamFilter(
            scheduledQuery,
            teamId
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

    // Map static events to Event type
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

    // Merge and sort by timestamp
    return [...mappedStaticEvents, ...scheduledEvents].sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
}

export async function getEventById(eventId: string, teamId: number): Promise<Event | null> {
    const { data, error } = await applyTeamFilter(
        supabase.from('events').select('*').eq('id', eventId),
        teamId
    );

    if (error || !data || data.length === 0) {
        console.error('Error fetching event:', error);
        return null;
    }

    const event = data[0] as DatabaseEvent;
    return {
        id: event.id,
        type: event.type,
        title: event.title,
        content: event.content,
        severity: event.severity,
        from: event.from_sender || undefined,
        read: event.read,
        timestamp: new Date(event.created_at),
    };
}

export async function markEventAsRead(eventId: string): Promise<boolean> {
    const { error } = await supabase
        .from('events')
        .update({ read: true })
        .eq('id', eventId);

    if (error) {
        console.error('Error marking event as read:', error);
        return false;
    }

    return true;
}

export async function createEvent(event: {
    teamId: number | null;
    type: string;
    title: string;
    content: string;
    severity: string;
    from?: string;
}) {
    const { data, error } = await supabase.from('events').insert({
        team_id: event.teamId,
        division: null,
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

export async function createScheduledEvent(event: {
    triggerAtMinutes: number;
    type: string;
    title: string;
    content: string;
    severity: string;
    from?: string;
}) {
    const { data, error } = await supabase.from('scheduled_events').insert({
        trigger_at_minutes: event.triggerAtMinutes,
        division: null,
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