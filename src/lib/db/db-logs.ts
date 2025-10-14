// src/lib/db-logs.ts
// System logs management

import { supabase } from '../supabase';
import { LogEntry } from '@/types';
import type { DatabaseLog } from '@/types/database';

// Helper to apply team filter
function applyTeamFilter<T>(query: T, teamId: number): T {
    if (teamId === 0) {
        // Admin sees everything
        return query;
    }
    // Regular team sees their own data + broadcasts (null team_id)
    return (query as unknown as { or: (filter: string) => T }).or(`team_id.eq.${teamId},team_id.is.null`);
}

export async function getLogs(teamId: number, source?: string): Promise<LogEntry[]> {
    let query = supabase
        .from('logs')
        .select('*')
        .order('timestamp', { ascending: false });

    query = applyTeamFilter(query, teamId);

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

export async function getLogsByLevel(
    teamId: number,
    level: 'info' | 'warning' | 'error' | 'critical'
): Promise<LogEntry[]> {
    const query = supabase
        .from('logs')
        .select('*')
        .eq('level', level)
        .order('timestamp', { ascending: false });

    const { data, error } = await applyTeamFilter(query, teamId);

    if (error) {
        console.error('Error fetching logs by level:', error);
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

export async function getLogsBySource(teamId: number, source: string): Promise<LogEntry[]> {
    return getLogs(teamId, source);
}

export async function createLog(log: {
    teamId: number | null;
    level: string;
    source: string;
    message: string;
}) {
    const { data, error } = await supabase.from('logs').insert({
        team_id: log.teamId,
        division: null,
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