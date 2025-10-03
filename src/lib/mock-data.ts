import { Event, Server, LogEntry } from '@/types';

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
    {
        id: '4',
        type: 'alert',
        title: 'High CPU Usage - WEB-SERVER-03',
        content: 'CPU usage has exceeded 85% threshold for the past 10 minutes',
        severity: 'medium',
        timestamp: new Date(Date.now() - 35 * 60000),
        read: true,
    },
];

export const MOCK_SERVERS: Server[] = [
    {
        id: 'web-01',
        name: 'WEB-SERVER-01',
        status: 'online',
        load: 45,
        alerts: 0,
    },
    {
        id: 'web-02',
        name: 'WEB-SERVER-02',
        status: 'online',
        load: 52,
        alerts: 0,
    },
    {
        id: 'web-03',
        name: 'WEB-SERVER-03',
        status: 'warning',
        load: 87,
        alerts: 1,
    },
    {
        id: 'db-01',
        name: 'DB-PROD-01',
        status: 'critical',
        load: 92,
        alerts: 3,
    },
    {
        id: 'api-01',
        name: 'API-SERVER-01',
        status: 'online',
        load: 38,
        alerts: 0,
    },
    {
        id: 'cache-01',
        name: 'CACHE-SERVER-01',
        status: 'offline',
        load: 0,
        alerts: 5,
    },
];

export const MOCK_LOGS: LogEntry[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 2 * 60000),
        level: 'error',
        source: 'DB-PROD-01',
        message: 'Authentication failed for user "admin" from 192.168.45.22',
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 4 * 60000),
        level: 'warning',
        source: 'WEB-SERVER-03',
        message: 'High memory usage detected: 87% of available RAM in use',
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 6 * 60000),
        level: 'critical',
        source: 'CACHE-SERVER-01',
        message: 'Connection timeout - server not responding',
    },
    {
        id: '4',
        timestamp: new Date(Date.now() - 8 * 60000),
        level: 'info',
        source: 'API-SERVER-01',
        message: 'Request processed successfully - 200 OK',
    },
    {
        id: '5',
        timestamp: new Date(Date.now() - 10 * 60000),
        level: 'error',
        source: 'DB-PROD-01',
        message: 'Multiple failed login attempts detected',
    },
    {
        id: '6',
        timestamp: new Date(Date.now() - 12 * 60000),
        level: 'warning',
        source: 'WEB-SERVER-02',
        message: 'SSL certificate expires in 7 days',
    },
];
