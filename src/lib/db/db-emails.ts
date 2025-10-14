// src/lib/db-emails.ts
import {supabase} from "@/lib/supabase";
import type {DatabaseEmail} from "@/types/database";
import {applyTeamFilter} from "@/lib/db-helpers";

export interface EmailFilters {
    search?: string;
    sender?: string;
    recipient?: string;
    type?: 'internal' | 'external' | 'system';
    dateFrom?: string;
    dateTo?: string;
}

export async function getEmails(teamId: number, filters?: EmailFilters) {
    let query = supabase
        .from('emails')
        .select('*')
        .order('timestamp', { ascending: false });

    // Apply team filter
    query = applyTeamFilter(query, teamId);

    // Apply filters
    if (filters?.sender) {
        query = query.eq('sender', filters.sender);
    }

    if (filters?.recipient) {
        query = query.eq('recipient', filters.recipient);
    }

    if (filters?.type) {
        query = query.eq('type', filters.type);
    }

    if (filters?.dateFrom) {
        query = query.gte('timestamp', filters.dateFrom);
    }

    if (filters?.dateTo) {
        query = query.lte('timestamp', filters.dateTo);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching emails:', error);
        return [];
    }

    let emails = (data || []) as DatabaseEmail[];

    // Apply search filter (client-side)
    if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        emails = emails.filter(email =>
            email.subject.toLowerCase().includes(searchLower) ||
            email.body.toLowerCase().includes(searchLower) ||
            email.sender.toLowerCase().includes(searchLower) ||
            email.recipient.toLowerCase().includes(searchLower)
        );
    }

    return emails;
}

// Get unique senders for filter dropdown
export async function getEmailSenders(teamId: number) {
    let query = supabase
        .from('emails')
        .select('sender')
        .order('sender');

    query = applyTeamFilter(query, teamId);

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching email senders:', error);
        return [];
    }

    // Get unique senders
    return [...new Set((data || []).map(d => d.sender))];
}

// Get unique recipients for filter dropdown
export async function getEmailRecipients(teamId: number) {
    let query = supabase
        .from('emails')
        .select('recipient')
        .order('recipient');

    query = applyTeamFilter(query, teamId);

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching email recipients:', error);
        return [];
    }

    // Get unique recipients
    return [...new Set((data || []).map(d => d.recipient))];
}