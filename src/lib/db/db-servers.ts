// src/lib/db-servers.ts
// Server status and monitoring operations

import { supabase } from '../supabase';
import type { Server } from '@/types';
import type { DatabaseServer } from '@/types/database';

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

export async function getServerById(serverId: string): Promise<Server | null> {
    const { data, error } = await supabase
        .from('servers')
        .select('*')
        .eq('id', serverId)
        .single();

    if (error) {
        console.error('Error fetching server:', error);
        return null;
    }

    return data as Server;
}

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