// src/lib/db/db-events.ts
// Events management - inbox items, alerts, emails, tweets

import { supabase } from '../supabase';
import { Event } from '@/types';
import type { DatabaseScheduledEvent, DatabaseEventRead } from '@/types/database';
import { getActiveGameSession } from './db-game-sessions';

// Helper to apply team filter
function applyTeamFilter<T>(query: T, teamId: number): T {

    // Regular team sees their own data + broadcasts (null team_id)
    return (query as unknown as { or: (filter: string) => T }).or(`team_id.eq.${teamId},team_id.is.null`);
}

export async function getEvents(teamId: number): Promise<Event[]> {
    // Get scheduled events based on game time
    const session = await getActiveGameSession();

    if (!session) {
        return [];
    }

    const minutesElapsed = Math.floor(
        (Date.now() - new Date(session.started_at).getTime()) / 60000
    );

    // Get all scheduled events that should be visible at this time
    const scheduledQuery = supabase
        .from('scheduled_events')
        .select('*')
        .lte('trigger_at_minutes', minutesElapsed);

    const { data: scheduled, error: scheduledError } = await applyTeamFilter(
        scheduledQuery,
        teamId
    );

    if (scheduledError || !scheduled) {
        console.error('Error fetching scheduled events:', scheduledError);
        return [];
    }

    // Get read status for this team (skip for admin)
    let readEventIds = new Set<string>();
    if (teamId !== 0) {
        const { data: reads, error: readsError } = await supabase
            .from('event_reads')
            .select('scheduled_event_id')
            .eq('team_id', teamId);

        if (!readsError && reads) {
            const typedReads = reads as Pick<DatabaseEventRead, 'scheduled_event_id'>[];
            readEventIds = new Set(typedReads.map(r => r.scheduled_event_id));
        }
    }

    // Map scheduled events to Event type
    const typedScheduled = scheduled as DatabaseScheduledEvent[];
    const events: Event[] = typedScheduled.map((event) => ({
        id: event.id,
        type: event.type,
        title: event.title,
        content: event.content,
        severity: event.severity,
        from: event.from_sender || undefined,
        read: readEventIds.has(event.id),
        timestamp: new Date(
            new Date(session.started_at).getTime() +
            event.trigger_at_minutes * 60000
        ),
    }));

    // Sort by timestamp descending
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export async function getEventById(eventId: string, teamId: number): Promise<Event | null> {
    const { data, error } = await supabase
        .from('scheduled_events')
        .select('*')
        .eq('id', eventId)
        .single();

    if (error || !data) {
        console.error('Error fetching event:', error);
        return null;
    }

    const event = data as DatabaseScheduledEvent;

    // Check if this team has read it
    let isRead = false;
    if (teamId !== 0) {
        const { data: readData } = await supabase
            .from('event_reads')
            .select('id')
            .eq('team_id', teamId)
            .eq('scheduled_event_id', eventId)
            .single();

        isRead = !!(readData as Pick<DatabaseEventRead, 'id'> | null);
    }

    // Get game session to calculate timestamp
    const session = await getActiveGameSession();
    const timestamp = session
        ? new Date(
            new Date(session.started_at).getTime() +
            event.trigger_at_minutes * 60000
        )
        : new Date();

    return {
        id: event.id,
        type: event.type,
        title: event.title,
        content: event.content,
        severity: event.severity,
        from: event.from_sender || undefined,
        read: isRead,
        timestamp,
    };
}

export async function markEventAsRead(eventId: string, teamId: number): Promise<boolean> {
    // Admin doesn't mark events as read
    if (teamId === 0) {
        return true;
    }

    try {
        const { error } = await supabase
            .from('event_reads')
            .upsert({
                team_id: teamId,
                scheduled_event_id: eventId,
            }, {
                onConflict: 'team_id,scheduled_event_id'
            });

        if (error) {
            console.error('Error marking event as read:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error in markEventAsRead:', error);
        return false;
    }
}

// src/lib/db/db-events.ts - add logging to markAllEventsAsRead
export async function markAllEventsAsRead(teamId: number): Promise<boolean> {
    try {
        // Get all currently visible events
        const events = await getEvents(teamId);

        console.log(`[markAllEventsAsRead] Team ${teamId} has ${events.length} total events`);
        console.log(`[markAllEventsAsRead] Unread events:`, events.filter(e => !e.read).length);

        // Mark each one as read
        const readPromises = events.map(event =>
            supabase
                .from('event_reads')
                .upsert({
                    team_id: teamId,
                    scheduled_event_id: event.id,
                }, {
                    onConflict: 'team_id,scheduled_event_id'
                })
        );

        const results = await Promise.all(readPromises);

        // Check if any failed
        const anyErrors = results.some(result => result.error);
        if (anyErrors) {
            console.error('Some events failed to mark as read');
            results.forEach((result, idx) => {
                if (result.error) {
                    console.error(`Failed to mark event ${events[idx].id}:`, result.error);
                }
            });
            return false;
        }

        console.log(`[markAllEventsAsRead] Successfully marked ${events.length} events as read`);
        return true;
    } catch (error) {
        console.error('Error in markAllEventsAsRead:', error);
        return false;
    }
}

export async function createScheduledEvent(event: {
    teamId?: number | null;
    triggerAtMinutes: number;
    type: string;
    title: string;
    content: string;
    severity: string;
    from?: string;
}) {
    const { data, error } = await supabase.from('scheduled_events').insert({
        team_id: event.teamId ?? null,
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

// Deprecated - keeping for backwards compatibility but redirects to createScheduledEvent
export async function createEvent(event: {
    teamId: number | null;
    type: string;
    title: string;
    content: string;
    severity: string;
    from?: string;
}) {
    console.warn('createEvent is deprecated. Use createScheduledEvent instead.');
    return createScheduledEvent({
        teamId: event.teamId,
        triggerAtMinutes: 0, // Immediate
        type: event.type,
        title: event.title,
        content: event.content,
        severity: event.severity,
        from: event.from,
    });
}