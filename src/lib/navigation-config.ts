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

// Unified navigation for all users (no division filtering)
export const NAVIGATION: NavItem[] = [
    { icon: Home, label: 'Oversikt', href: '/game' },
    { icon: Inbox, label: 'Innboks', href: '/game/inbox' },
    { icon: Server, label: 'Servere', href: '/game/servers' },
    { icon: FileText, label: 'Systemlogger', href: '/game/logs' },
    { icon: Network, label: 'Nettverk', href: '/game/network' },
    { icon: Users, label: 'Brukeraktivitet', href: '/game/users' },
    { icon: Mail, label: 'E-postlogger', href: '/game/emails' },
    { icon: Phone, label: 'Kommunikasjon', href: '/game/comms' },
    { icon: Shield, label: 'Retningslinjer', href: '/game/policies' },
];