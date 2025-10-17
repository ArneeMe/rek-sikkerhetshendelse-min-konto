// src/lib/db-network.ts
// Network connections and traffic monitoring

import { supabase } from '../supabase';
import type { DatabaseNetworkConnection } from '@/types/database';

// Helper to apply team filter
function applyTeamFilter<T>(query: T, teamId: number): T {
    if (teamId === 0) {
        // Admin sees everything
        return query;
    }
    // Regular team sees their own data + broadcasts (null team_id)
    return (query as unknown as { or: (filter: string) => T }).or(`team_id.eq.${teamId},team_id.is.null`);
}

export async function getNetworkConnections(teamId: number) {
    const query = supabase
        .from('network_connections')
        .select('*')
        .order('timestamp', { ascending: false });

    const { data, error } = await applyTeamFilter(query, teamId);

    if (error) {
        console.error('Error fetching network connections:', error);
        return [];
    }

    return (data || []) as DatabaseNetworkConnection[];
}

export async function getNetworkConnectionsByStatus(
    teamId: number,
    status: 'active' | 'suspicious' | 'blocked'
) {
    const query = supabase
        .from('network_connections')
        .select('*')
        .eq('status', status)
        .order('timestamp', { ascending: false });

    const { data, error } = await applyTeamFilter(query, teamId);

    if (error) {
        console.error('Error fetching network connections by status:', error);
        return [];
    }

    return (data || []) as DatabaseNetworkConnection[];
}

export async function getSuspiciousConnections(teamId: number) {
    return getNetworkConnectionsByStatus(teamId, 'suspicious');
}

export async function getBlockedConnections(teamId: number) {
    return getNetworkConnectionsByStatus(teamId, 'blocked');
}

export async function updateConnectionStatus(
    connectionId: string,
    status: 'active' | 'suspicious' | 'blocked'
) {
    const { data, error } = await supabase
        .from('network_connections')
        .update({ status })
        .eq('id', connectionId)
        .select();

    if (error) {
        console.error('Error updating connection status:', error);
        return null;
    }

    return data?.[0] as DatabaseNetworkConnection | undefined;
}