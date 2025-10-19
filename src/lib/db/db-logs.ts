// src/lib/db/db-logs.ts
import { supabase } from '../supabase';
import type { AppServerLog, DbServerLog, AzureAuditLog, AzureSigninLog, OfficeFirewallLog } from '@/types/logs';

export async function getAppServer1Logs(): Promise<AppServerLog[]> {
    const { data, error } = await supabase
        .from('app_server1_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching app server 1 logs:', error);
        return [];
    }

    return (data || []) as AppServerLog[];
}

export async function getAppServer2Logs(): Promise<AppServerLog[]> {
    const { data, error } = await supabase
        .from('app_server2_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching app server 2 logs:', error);
        return [];
    }

    return (data || []) as AppServerLog[];
}

export async function getAppServer3Logs(): Promise<AppServerLog[]> {
    const { data, error } = await supabase
        .from('app_server3_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching app server 3 logs:', error);
        return [];
    }

    return (data || []) as AppServerLog[];
}

export async function getDbServer1Logs(): Promise<DbServerLog[]> {
    const { data, error } = await supabase
        .from('db_server1_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching db server 1 logs:', error);
        return [];
    }

    return (data || []) as DbServerLog[];
}

export async function getDbServer2Logs(): Promise<DbServerLog[]> {
    const { data, error } = await supabase
        .from('db_server2_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching db server 2 logs:', error);
        return [];
    }

    return (data || []) as DbServerLog[];
}

export async function getDbServer3Logs(): Promise<DbServerLog[]> {
    const { data, error } = await supabase
        .from('db_server3_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching db server 3 logs:', error);
        return [];
    }

    return (data || []) as DbServerLog[];
}

export async function getAzureAuditLogs(): Promise<AzureAuditLog[]> {
    const { data, error } = await supabase
        .from('azure_audit_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching azure audit logs:', error);
        return [];
    }

    return (data || []) as AzureAuditLog[];
}

export async function getAzureSigninLogs(): Promise<AzureSigninLog[]> {
    const { data, error } = await supabase
        .from('azure_signin_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching azure signin logs:', error);
        return [];
    }

    return (data || []) as AzureSigninLog[];
}

export async function getOfficeFirewallLogs(): Promise<OfficeFirewallLog[]> {
    const { data, error } = await supabase
        .from('office_firewall_log')
        .select('*')
        .order('Timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching office firewall logs:', error);
        return [];
    }

    return (data || []) as OfficeFirewallLog[];
}

// Helper function to count all error/failed logs across all log types
export async function getCriticalLogsCount(): Promise<number> {
    let count = 0;

    // App Server logs - count failures
    const appServer1 = await getAppServer1Logs();
    const appServer2 = await getAppServer2Logs();
    const appServer3 = await getAppServer3Logs();

    count += [...appServer1, ...appServer2, ...appServer3].filter(log =>
        log.Result.toLowerCase().includes('fail') ||
        log.Result.toLowerCase().includes('error')
    ).length;

    // DB Server logs - count failures
    const dbServer1 = await getDbServer1Logs();
    const dbServer2 = await getDbServer2Logs();
    const dbServer3 = await getDbServer3Logs();

    count += [...dbServer1, ...dbServer2, ...dbServer3].filter(log =>
        log.Result.toLowerCase().includes('fail') ||
        log.Result.toLowerCase().includes('error')
    ).length;

    // Azure audit logs - count failures
    const azureAuditLogs = await getAzureAuditLogs();
    count += azureAuditLogs.filter(log =>
        log.Result.toLowerCase().includes('fail') ||
        log.Result.toLowerCase().includes('error')
    ).length;

    // Azure signin logs - count failures
    const azureSigninLogs = await getAzureSigninLogs();
    count += azureSigninLogs.filter(log =>
        log.Status.toLowerCase().includes('fail') ||
        log.Status.toLowerCase().includes('error')
    ).length;

    // Office firewall logs - count blocked/denied
    const firewallLogs = await getOfficeFirewallLogs();
    count += firewallLogs.filter(log =>
        log.Action.toLowerCase().includes('block') ||
        log.Action.toLowerCase().includes('deny') ||
        log.Action.toLowerCase().includes('drop')
    ).length;

    return count;
}