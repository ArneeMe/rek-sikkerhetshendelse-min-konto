// src/lib/db/db-logs.ts
import { supabase } from '../supabase';
import type { AppLog, DbLog, AzureAuditLog, AzureSigninLog } from '@/types/logs';

export async function getAppLogs(): Promise<AppLog[]> {
    const { data, error } = await supabase
        .from('app_logs')
        .select('*')
        .order('timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching app logs:', error);
        return [];
    }

    return (data || []) as AppLog[];
}

export async function getDbLogs(): Promise<DbLog[]> {
    const { data, error } = await supabase
        .from('db_logs')
        .select('*')
        .order('timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching db logs:', error);
        return [];
    }

    return (data || []) as DbLog[];
}

export async function getAzureAuditLogs(): Promise<AzureAuditLog[]> {
    const { data, error } = await supabase
        .from('azure_audit_logs')
        .select('*')
        .order('timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching azure audit logs:', error);
        return [];
    }

    return (data || []) as AzureAuditLog[];
}

export async function getAzureSigninLogs(): Promise<AzureSigninLog[]> {
    const { data, error } = await supabase
        .from('azure_signin_logs')
        .select('*')
        .order('timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching azure signin logs:', error);
        return [];
    }

    return (data || []) as AzureSigninLog[];
}

// Helper function to count all error/failed logs across all log types
export async function getCriticalLogsCount(): Promise<number> {
    let count = 0;

    // App logs - count HTTP errors (4xx, 5xx status codes)
    const { data: appLogs } = await supabase
        .from('app_logs')
        .select('result');

    if (appLogs) {
        count += appLogs.filter(log => {
            const result = log.result;
            return result.startsWith('4') || result.startsWith('5');
        }).length;
    }

    // DB logs - count failures
    const { data: dbLogs } = await supabase
        .from('db_logs')
        .select('result');

    if (dbLogs) {
        count += dbLogs.filter(log =>
            log.result.toLowerCase().includes('fail') ||
            log.result.toLowerCase().includes('error')
        ).length;
    }

    // Azure audit logs - count failures
    const { data: azureAuditLogs } = await supabase
        .from('azure_audit_logs')
        .select('result');

    if (azureAuditLogs) {
        count += azureAuditLogs.filter(log =>
            log.result.toLowerCase().includes('fail') ||
            log.result.toLowerCase().includes('error')
        ).length;
    }

    // Azure signin logs - count failures
    const { data: azureSigninLogs } = await supabase
        .from('azure_signin_logs')
        .select('status');

    if (azureSigninLogs) {
        count += azureSigninLogs.filter(log =>
            log.status.toLowerCase().includes('fail') ||
            log.status.toLowerCase().includes('error')
        ).length;
    }

    return count;
}