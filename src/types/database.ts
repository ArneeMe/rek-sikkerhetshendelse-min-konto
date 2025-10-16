// src/types/database.ts
export interface DatabaseServer {
    id: string;
    name: string;
    status: 'online' | 'warning' | 'critical' | 'offline';
    load: number;
    alerts: number;
    updated_at: string;
}

export interface DatabaseEmail {
    id: string;
    team_id: number | null;
    sender: string;
    recipient: string;
    subject: string;
    body: string;
    timestamp: string;
    type: 'internal' | 'external' | 'system';
    created_at: string;
}

export interface DatabaseLog {
    id: string;
    team_id: number | null;
    division: 'tech' | 'non-tech' | 'management' | null;
    timestamp: string;
    level: 'info' | 'warning' | 'error' | 'critical';
    source: string;
    message: string;
}

export interface DatabaseUserActivity {
    id: string;
    team_id: number | null;
    division: 'tech' | 'non-tech' | 'management' | null;
    user_id: string;
    name: string;
    role: string;
    last_login: string | null;
    location: string;
    status: 'normal' | 'suspicious' | 'clicked-phishing' | 'compromised';
}

export interface DatabaseNetworkConnection {
    id: string;
    team_id: number | null;
    division: 'tech' | 'non-tech' | 'management' | null;
    timestamp: string;
    source: string;
    destination: string;
    port: number;
    protocol: string;
    status: 'active' | 'suspicious' | 'blocked';
    traffic: string;
}

export interface DatabaseScheduledEvent {
    id: string;
    team_id: number | null;
    trigger_at_minutes: number;
    division: 'tech' | 'non-tech' | 'management' | null;
    type: 'email' | 'tweet' | 'alert' | 'server-status';
    title: string;
    content: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    from_sender: string | null;
    created_at: string;
}

export interface DatabaseEventRead {
    id: string;
    team_id: number;
    scheduled_event_id: string;
    read_at: string;
    created_at: string;
}

export interface DatabaseGameSession {
    id: string;
    started_at: string;
    duration_minutes: number;
    status: 'active' | 'ended';
    created_at: string;
}