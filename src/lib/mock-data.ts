import { Event, Server, LogEntry } from '@/types';

export const SERVERS = [
    { id: 'vest', name: 'Vest Basestasjon' },
    { id: 'ost', name: 'Øst Basestasjon' },
    { id: 'nord', name: 'Nord Basestasjon' },
    { id: 'nodnett', name: 'Nødnett Basestasjon' },
] as const;

export const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        type: 'alert',
        title: 'Unusual Login Activity Detected',
        content: 'Multiple failed login attempts detected from IP 192.168.45.22 on server DB-PROD-01',
        severity: 'high',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
    },
    {
        id: '2',
        type: 'email',
        title: 'RE: Urgent System Maintenance',
        content: 'Hi team, I need you to verify your credentials at this link immediately...',
        severity: 'critical',
        timestamp: new Date(Date.now() - 15 * 60000),
        read: false,
        from: 'admin@techsupport-verify.com',
    },
    {
        id: '3',
        type: 'tweet',
        title: '@YourCompany mention',
        content: '@YourCompany your website is loading really slow today. Are you having issues? #outage',
        severity: 'medium',
        timestamp: new Date(Date.now() - 25 * 60000),
        read: true,
        from: '@concerned_user',
    },
];

export const MOCK_SERVERS: Server[] = [
    {
        id: 'vest',
        name: 'Vest Basestasjon',
        status: 'online',
        load: 45,
        alerts: 0,
    },
    {
        id: 'ost',
        name: 'Øst Basestasjon',
        status: 'critical',
        load: 92,
        alerts: 3,
    },
    {
        id: 'nord',
        name: 'Nord Basestasjon',
        status: 'warning',
        load: 78,
        alerts: 1,
    },
    {
        id: 'nodnett',
        name: 'Nødnett Basestasjon',
        status: 'offline',
        load: 0,
        alerts: 5,
    },
];

export const MOCK_LOGS: LogEntry[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 2 * 60000),
        level: 'critical',
        source: 'ost',
        message: 'Basestasjon Øst - Connection timeout, server not responding',
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 5 * 60000),
        level: 'warning',
        source: 'nord',
        message: 'Basestasjon Nord - High memory usage: 78% of available RAM',
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 8 * 60000),
        level: 'error',
        source: 'nodnett',
        message: 'Nødnett - Multiple failed authentication attempts detected',
    },
];