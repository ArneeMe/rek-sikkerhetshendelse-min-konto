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
    hidden?: boolean; // Add hidden flag
}

// Unified navigation for all users
export const NAVIGATION: NavItem[] = [
    { icon: Home, label: 'Oversikt', href: '/game' },
    { icon: Inbox, label: 'Innboks', href: '/game/inbox' },
    { icon: Server, label: 'Servere', href: '/game/servers', hidden: true },
    { icon: FileText, label: 'Logger', href: '/game/logs' },
    { icon: Network, label: 'Nettverk', href: '/game/network', hidden: true },
    { icon: Users, label: 'Brukeraktivitet', href: '/game/users' },
    { icon: Mail, label: 'E-postlogger', href: '/game/emails' },
    { icon: Phone, label: 'Kommunikasjon', href: '/game/comms', hidden: true },
    { icon: Shield, label: 'Retningslinjer', href: '/game/policies', hidden: true },
];