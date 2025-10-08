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
        { icon: Home, label: 'Oversikt', href: '/game' },
        { icon: Inbox, label: 'Innboks', href: '/game/inbox' },
        { icon: Server, label: 'Servere', href: '/game/servers' },
        { icon: FileText, label: 'Systemlogger', href: '/game/logs' },
        { icon: Network, label: 'Nettverk', href: '/game/network' },
    ],
    'non-tech': [
        { icon: Home, label: 'Oversikt', href: '/game' },
        { icon: Inbox, label: 'Innboks', href: '/game/inbox' },
        { icon: Users, label: 'Brukeraktivitet', href: '/game/users' },
        { icon: Mail, label: 'E-postlogger', href: '/game/emails' },
    ],
    management: [
        { icon: Home, label: 'Oversikt', href: '/game' },
        { icon: Inbox, label: 'Innboks', href: '/game/inbox' },
        { icon: Phone, label: 'Kommunikasjon', href: '/game/comms' },
        { icon: Shield, label: 'Retningslinjer', href: '/game/policies' },
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