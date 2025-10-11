// src/app/game/page.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { ListItem } from '@/components/ui/list-item';
import { AlertTriangle, Inbox, FileText, Server, Users, Mail, Phone} from 'lucide-react';
import { getEvents, getServers, getLogs } from '@/lib/db';
import { getSession } from '@/lib/session';
import { getSeverityColor } from '@/lib/ui-helpers';
import Link from 'next/link';

export default async function GameDashboard() {
    const session = await getSession();
    const events = await getEvents(session!.companyId);
    const servers = await getServers();
    const logs = await getLogs(session!.companyId);

    const unreadCount = events.filter((e) => !e.read).length;
    const criticalServers = servers.filter((s) => s.status === 'critical' || s.status === 'offline').length;
    const criticalLogs = logs.filter((l) => l.level === 'critical' || l.level === 'error').length;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Sikkerhetsoversikt</h2>
                <p className="text-slate-400">Overvåk systemene dine og håndter hendelser</p>
                <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-slate-300">
                        {session?.companyName}
                    </Badge>
                </div>
            </div>

            {/* Stats Grid - All users see all stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Uleste hendelser"
                    value={unreadCount}
                    description="Klikk for å se innboks"
                    icon={Inbox}
                    iconColor="text-blue-400"
                    badge={unreadCount > 0 ? {
                        text: 'Handling Påkrevd',
                        className: 'bg-blue-600'
                    } : undefined}
                    href="/game/inbox"
                    borderColor="hover:border-blue-500"
                />

                <StatCard
                    title="Kritiske servere"
                    value={criticalServers}
                    description="Klikk for å se servere"
                    icon={Server}
                    iconColor="text-orange-400"
                    badge={criticalServers > 0 ? {
                        text: 'Undersøk Nå',
                        className: 'bg-orange-600'
                    } : undefined}
                    href="/game/servers"
                    borderColor="hover:border-orange-500"
                />

                <StatCard
                    title="Kritiske logger"
                    value={criticalLogs}
                    description="Klikk for å se logger"
                    icon={FileText}
                    iconColor="text-red-400"
                    badge={criticalLogs > 0 ? {
                        text: 'Gjennomgang Påkrevd',
                        className: 'bg-red-600'
                    } : undefined}
                    href="/game/logs"
                    borderColor="hover:border-red-500"
                />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Mistenkelige brukere"
                    value={2}
                    description="Klikk for å se aktivitet"
                    icon={Users}
                    iconColor="text-purple-400"
                    badge={{
                        text: 'Handling Påkrevd',
                        className: 'bg-purple-600'
                    }}
                    href="/game/users"
                    borderColor="hover:border-purple-500"
                />

                <StatCard
                    title="Phishing e-poster"
                    value={1}
                    description="Klikk for å se e-poster"
                    icon={Mail}
                    iconColor="text-red-400"
                    badge={{
                        text: 'Undersøk',
                        className: 'bg-red-600'
                    }}
                    href="/game/emails"
                    borderColor="hover:border-red-500"
                />

                <StatCard
                    title="Ventende kommunikasjon"
                    value={4}
                    description="Klikk for å se"
                    icon={Phone}
                    iconColor="text-orange-400"
                    badge={{
                        text: 'Respons Nødvendig',
                        className: 'bg-orange-600'
                    }}
                    href="/game/comms"
                    borderColor="hover:border-orange-500"
                />
            </div>

            {/* Recent Activity */}
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Nylige hendelser</h3>
                    <div className="space-y-3">
                        {events.slice(0, 3).map((event) => (
                            <ListItem
                                key={event.id}
                                icon={AlertTriangle}
                                iconColor={getSeverityColor(event.severity)}
                                title={event.title}
                                subtitle={event.type}
                                badge={!event.read ? { text: 'Ny', variant: 'outline' } : undefined}
                            />
                        ))}
                    </div>
                    <Link href="/game/inbox">
                        <p className="text-sm text-blue-400 hover:text-blue-300 mt-4 cursor-pointer">
                            Se alle hendelser →
                        </p>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}