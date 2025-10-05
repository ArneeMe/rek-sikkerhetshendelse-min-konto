// src/app/game/page.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { ListItem } from '@/components/ui/list-item';
import { AlertTriangle, Inbox, FileText, Server, Users, Mail, Phone, Shield } from 'lucide-react';
import { getEvents, getServers, getLogs } from '@/lib/db';
import { getSession } from '@/lib/session';
import { getSeverityColor } from '@/lib/ui-helpers';
import Link from 'next/link';

export default async function GameDashboard() {
    const session = await getSession();
    const events = await getEvents(session!.companyId, session!.division);
    const unreadCount = events.filter((e) => !e.read).length;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Security Overview</h2>
                <p className="text-slate-400">Monitor your systems and respond to incidents</p>
                <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-slate-300">
                        {session?.companyName}
                    </Badge>
                    {session?.division && (
                        <Badge variant="outline" className="text-slate-300 capitalize">
                            {session.division} Division
                        </Badge>
                    )}
                </div>
            </div>

            {/* Common: Inbox */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Unread Events"
                    value={unreadCount}
                    description="Click to view inbox"
                    icon={Inbox}
                    iconColor="text-blue-400"
                    badge={unreadCount > 0 ? {
                        text: 'Action Required',
                        className: 'bg-blue-600'
                    } : undefined}
                    href="/game/inbox"
                    borderColor="hover:border-blue-500"
                />

                {/* Tech Division */}
                {session?.division === 'tech' && (
                    <>
                        <TechDashboard />
                    </>
                )}

                {/* Non-Tech Division */}
                {session?.division === 'non-tech' && (
                    <>
                        <NonTechDashboard />
                    </>
                )}

                {/* Management Division */}
                {session?.division === 'management' && (
                    <>
                        <ManagementDashboard />
                    </>
                )}
            </div>

            {/* Recent Activity */}
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Incidents</h3>
                    <div className="space-y-3">
                        {events.slice(0, 3).map((event) => (
                            <ListItem
                                key={event.id}
                                icon={AlertTriangle}
                                iconColor={getSeverityColor(event.severity)}
                                title={event.title}
                                subtitle={event.type}
                                badge={!event.read ? { text: 'New', variant: 'outline' } : undefined}
                            />
                        ))}
                    </div>
                    <Link href="/game/inbox">
                        <p className="text-sm text-blue-400 hover:text-blue-300 mt-4 cursor-pointer">
                            View all incidents →
                        </p>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}

// Tech Division Dashboard
async function TechDashboard() {
    const session = await getSession();
    const servers = await getServers();
    const logs = await getLogs(session!.companyId, session!.division);

    const criticalServers = servers.filter((s) => s.status === 'critical' || s.status === 'offline').length;
    const criticalLogs = logs.filter((l) => l.level === 'critical' || l.level === 'error').length;

    return (
        <>
            <StatCard
                title="Critical Servers"
                value={criticalServers}
                description="Click to view servers"
                icon={Server}
                iconColor="text-orange-400"
                badge={criticalServers > 0 ? {
                    text: 'Investigate Now',
                    className: 'bg-orange-600'
                } : undefined}
                href="/game/servers"
                borderColor="hover:border-orange-500"
            />

            <StatCard
                title="Critical Logs"
                value={criticalLogs}
                description="Click to view logs"
                icon={FileText}
                iconColor="text-red-400"
                badge={criticalLogs > 0 ? {
                    text: 'Review Required',
                    className: 'bg-red-600'
                } : undefined}
                href="/game/logs"
                borderColor="hover:border-red-500"
            />
        </>
    );
}

// Non-Tech Division Dashboard
function NonTechDashboard() {
    return (
        <>
            <StatCard
                title="Suspicious Users"
                value={2}
                description="Click to view activity"
                icon={Users}
                iconColor="text-purple-400"
                badge={{
                    text: 'Action Required',
                    className: 'bg-purple-600'
                }}
                href="/game/users"
                borderColor="hover:border-purple-500"
            />

            <StatCard
                title="Phishing Emails"
                value={1}
                description="Click to view emails"
                icon={Mail}
                iconColor="text-red-400"
                badge={{
                    text: 'Investigate',
                    className: 'bg-red-600'
                }}
                href="/game/emails"
                borderColor="hover:border-red-500"
            />
        </>
    );
}

// Management Division Dashboard
function ManagementDashboard() {
    return (
        <>
            <StatCard
                title="Pending Comms"
                value={4}
                description="Click to view"
                icon={Phone}
                iconColor="text-orange-400"
                badge={{
                    text: 'Response Needed',
                    className: 'bg-orange-600'
                }}
                href="/game/comms"
                borderColor="hover:border-orange-500"
            />

            <StatCard
                title="Policy Violations"
                value={3}
                description="Click to review"
                icon={Shield}
                iconColor="text-red-400"
                badge={{
                    text: 'Critical',
                    className: 'bg-red-600'
                }}
                href="/game/policies"
                borderColor="hover:border-red-500"
            />
        </>
    );
}
