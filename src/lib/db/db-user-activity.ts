// src/lib/db-user-activity.ts
// User activity and behavior tracking

import { supabase } from '../supabase';
import type { DatabaseUserActivity } from '@/types/database';

// Helper to apply team filter
function applyTeamFilter<T>(query: T, teamId: number): T {
    if (teamId === 0) {
        // Admin sees everything
        return query;
    }
    // Regular team sees their own data + broadcasts (null team_id)
    return (query as unknown as { or: (filter: string) => T }).or(`team_id.eq.${teamId},team_id.is.null`);
}

export async function getUserActivity(teamId: number) {
    const query = supabase
        .from('user_activity')
        .select('*')
        .order('last_login', { ascending: false });

    const { data, error } = await applyTeamFilter(query, teamId);

    if (error) {
        console.error('Error fetching user activity:', error);
        return [];
    }

    return (data || []) as DatabaseUserActivity[];
}

export async function getUserActivityById(userId: string, teamId: number) {
    const query = supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', userId);

    const { data, error } = await applyTeamFilter(query, teamId);

    if (error) {
        console.error('Error fetching user activity:', error);
        return null;
    }

    return data?.[0] as DatabaseUserActivity | undefined;
}

export async function getSuspiciousUsers(teamId: number) {
    const query = supabase
        .from('user_activity')
        .select('*')
        .in('status', ['suspicious', 'clicked-phishing', 'compromised'])
        .order('last_login', { ascending: false });

    const { data, error } = await applyTeamFilter(query, teamId);

    if (error) {
        console.error('Error fetching suspicious users:', error);
        return [];
    }

    return (data || []) as DatabaseUserActivity[];
}

export async function updateUserStatus(
    userId: string,
    status: 'normal' | 'suspicious' | 'clicked-phishing' | 'compromised'
) {
    const { data, error } = await supabase
        .from('user_activity')
        .update({ status })
        .eq('user_id', userId)
        .select();

    if (error) {
        console.error('Error updating user status:', error);
        return null;
    }

    return data?.[0] as DatabaseUserActivity | undefined;
}