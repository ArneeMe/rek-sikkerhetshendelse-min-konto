export interface Company {
    id: number;
    code: string;
    name: string;
}

export interface Event {
    id: string;
    type: 'email' | 'tweet' | 'alert' | 'server-status';
    title: string;
    content: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    timestamp: Date;
    read: boolean;
    from?: string;
}

export interface Server {
    id: string;
    name: string;
    status: 'online' | 'warning' | 'critical' | 'offline';
    load: number;
    alerts: number;
}

export interface LogEntry {
    id: string;
    timestamp: Date;
    level: 'info' | 'warning' | 'error' | 'critical';
    source: string;
    message: string;
}
