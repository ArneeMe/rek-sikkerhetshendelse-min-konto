// src/types/logs.ts
export interface AppServerLog {
    id: number;
    Timestamp: string;
    EventType: string;
    User: string;
    SourceIP: string;
    TargetResource: string;
    Action: string;
    Details: string;
    Result: string;
}

export interface DbServerLog {
    id: number;
    Timestamp: string;
    EventType: string;
    User: string;
    SourceIP: string;
    Database: string;
    Query: string;
    RowsAffected: string;
    Details: string;
    Result: string;
}

export interface AzureAuditLog {
    id: number;
    Timestamp: string;
    Actor: string;
    Action: string;
    Target: string;
    TargetType: string;
    Details: string;
    SourceIP: string;
    Result: string;
}

export interface AzureSigninLog {
    id: number;
    Timestamp: string;
    User: string;
    SourceIP: string;
    Location: string;
    Application: string;
    Status: string;
    FailureReason: string | null;
    DeviceInfo: string;
}

export interface OfficeFirewallLog {
    id: number;
    Timestamp: string;
    EventType: string;
    SourceIP: string;
    SourceUser: string | null;
    DestIP: string | null;
    DestDomain: string | null;
    DestPort: number | null;
    Protocol: string;
    Action: string;
    BytesTransferred: number | null;
    Details: string | null;
}