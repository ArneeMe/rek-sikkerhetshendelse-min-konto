import {supabase} from "@/lib/supabase";
import type {DatabaseEmail} from "@/types/database";
import {COMPANY_CODES} from "@/lib/constants";
import {applyCompanyFilter} from "@/lib/db-helpers";

export interface EmailFilters {
    search?: string;
    sender?: string;
    recipient?: string;
    type?: 'internal' | 'external' | 'system';
    dateFrom?: string;
    dateTo?: string;
}

export async function getEmails(companyId: number, filters?: EmailFilters) {
    let query = supabase
        .from('emails')
        .select('*')
        .order('timestamp', { ascending: false });

    // Apply company filter
    query = applyCompanyFilter(query, companyId);

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

    // Get company name for substitution
    const companyEntry = Object.values(COMPANY_CODES).find(company => company.id === companyId);
    const companyName = companyEntry?.name?.toLowerCase() || 'company';

    // Apply dynamic substitution for {COMPANY} placeholder
    emails = emails.map(email => ({
        ...email,
        sender: email.sender.replace(/{COMPANY}/g, companyName),
        recipient: email.recipient.replace(/{COMPANY}/g, companyName),
        body: email.body.replace(/{COMPANY}/g, companyName),
    }));

    // Apply search filter (client-side, after substitution)
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
export async function getEmailSenders(companyId: number) {
    let query = supabase
        .from('emails')
        .select('sender')
        .order('sender');

    query = applyCompanyFilter(query, companyId);

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching email senders:', error);
        return [];
    }

    // Get company name for substitution
    const companyEntry = Object.values(COMPANY_CODES).find(company => company.id === companyId);
    const companyName = companyEntry?.name?.toLowerCase() || 'company';

    // Apply substitution and get unique senders
    return [...new Set(
        (data || []).map(d => d.sender.replace(/{COMPANY}/g, companyName))
    )];
}

// Get unique recipients for filter dropdown
export async function getEmailRecipients(companyId: number) {
    let query = supabase
        .from('emails')
        .select('recipient')
        .order('recipient');

    query = applyCompanyFilter(query, companyId);

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching email recipients:', error);
        return [];
    }

    // Get company name for substitution
    const companyEntry = Object.values(COMPANY_CODES).find(company => company.id === companyId);
    const companyName = companyEntry?.name?.toLowerCase() || 'company';

    // Apply substitution and get unique recipients
    return [...new Set(
        (data || []).map(d => d.recipient.replace(/{COMPANY}/g, companyName))
    )];
}