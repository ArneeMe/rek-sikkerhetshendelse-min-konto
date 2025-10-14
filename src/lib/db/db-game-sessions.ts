// src/lib/db-game-sessions.ts
// Game session management - controls timed event system

import { supabase } from '../supabase';
import type { DatabaseGameSession, DatabaseScheduledEvent } from '@/types/database';

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