// src/types/logs.ts
export interface AppLog {
    id: string;
    timestamp: string;
    event_type: string;
    user_name: string;
    source_ip: string;
    target_resource: string;
    action: string;
    details: string;
    result: string;
    created_at: string;
}

export interface DbLog {
    id: string;
    timestamp: string;
    event_type: string;
    user_name: string;
    source_ip: string;
    database_name: string;
    query: string;
    rows_affected: string;
    details: string;
    result: string;
    created_at: string;
}

export interface AzureAuditLog {
    id: string;
    timestamp: string;
    actor: string;
    action: string;
    target: string;
    target_type: string;
    details: string;
    source_ip: string;
    result: string;
    created_at: string;
}

export interface AzureSigninLog {
    id: string;
    timestamp: string;
    user_name: string;
    source_ip: string;
    location: string;
    application: string;
    status: string;
    failure_reason: string | null;
    device_info: string;
    created_at: string;
}