// src/lib/navigation-config.ts
import {
    Home,
    Inbox,
    Server,
    FileText,
    Network,
    Users,
    Mail,
    Phone,
    Shield,
    LucideIcon
} from 'lucide-react';

export interface NavItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

export const DIVISION_NAV: Record<string, NavItem[]> = {
    tech: [
        { icon: Home, label: 'Overview', href: '/game' },
        { icon: Inbox, label: 'Inbox', href: '/game/inbox' },
        { icon: Server, label: 'Servers', href: '/game/servers' },
        { icon: FileText, label: 'System Logs', href: '/game/logs' },
        { icon: Network, label: 'Network', href: '/game/network' },
    ],
    'non-tech': [
        { icon: Home, label: 'Overview', href: '/game' },
        { icon: Inbox, label: 'Inbox', href: '/game/inbox' },
        { icon: Users, label: 'User Activity', href: '/game/users' },
        { icon: Mail, label: 'Email Logs', href: '/game/emails' },
    ],
    management: [
        { icon: Home, label: 'Overview', href: '/game' },
        { icon: Inbox, label: 'Inbox', href: '/game/inbox' },
        { icon: Phone, label: 'Communications', href: '/game/comms' },
        { icon: Shield, label: 'Policies', href: '/game/policies' },
    ],
};

// Define which divisions can access which pages
export const PAGE_ACCESS: Record<string, string[]> = {
    '/game': ['tech', 'non-tech', 'management'],
    '/game/inbox': ['tech', 'non-tech', 'management'],
    '/game/servers': ['tech'],
    '/game/logs': ['tech'],
    '/game/network': ['tech'],
    '/game/users': ['non-tech'],
    '/game/emails': ['non-tech'],
    '/game/comms': ['management'],
    '/game/policies': ['management'],
};