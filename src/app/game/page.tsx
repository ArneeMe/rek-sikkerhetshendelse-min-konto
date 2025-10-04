import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Inbox, FileText, Server } from 'lucide-react';
import { getEvents, getServers, getLogs } from '@/lib/db';
import { getSession } from '@/lib/session';
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
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Security Overview</h2>
                <p className="text-slate-400">Monitor your systems and respond to incidents</p>
                <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-slate-300">
                        Company ID: {session?.companyId}
                    </Badge>
                    <Badge variant="outline" className="text-slate-300">
                        {session?.companyName}
                    </Badge>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/game/inbox">
                    <Card className="bg-slate-900 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">Unread Events</p>
                                    <p className="text-3xl font-bold text-blue-400 mt-2">{unreadCount}</p>
                                    <p className="text-xs text-slate-500 mt-1">Click to view inbox</p>
                                </div>
                                <Inbox className="w-8 h-8 text-blue-400" />
                            </div>
                            {unreadCount > 0 && (
                                <Badge className="bg-blue-600 mt-4">Action Required</Badge>
                            )}
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/game/servers">
                    <Card className="bg-slate-900 border-slate-700 hover:border-orange-500 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">Critical Servers</p>
                                    <p className="text-3xl font-bold text-orange-400 mt-2">{criticalServers}</p>
                                    <p className="text-xs text-slate-500 mt-1">Click to view servers</p>
                                </div>
                                <Server className="w-8 h-8 text-orange-400" />
                            </div>
                            {criticalServers > 0 && (
                                <Badge className="bg-orange-600 mt-4">Investigate Now</Badge>
                            )}
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/game/logs">
                    <Card className="bg-slate-900 border-slate-700 hover:border-red-500 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">Critical Logs</p>
                                    <p className="text-3xl font-bold text-red-400 mt-2">{criticalLogs}</p>
                                    <p className="text-xs text-slate-500 mt-1">Click to view logs</p>
                                </div>
                                <FileText className="w-8 h-8 text-red-400" />
                            </div>
                            {criticalLogs > 0 && (
                                <Badge className="bg-red-600 mt-4">Review Required</Badge>
                            )}
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Recent Activity */}
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Incidents</h3>
                    <div className="space-y-3">
                        {events.slice(0, 3).map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className={`w-5 h-5 ${
                                        event.severity === 'critical' ? 'text-red-500' :
                                            event.severity === 'high' ? 'text-orange-500' :
                                                event.severity === 'medium' ? 'text-yellow-500' :
                                                    'text-blue-500'
                                    }`} />
                                    <div>
                                        <p className="text-sm font-medium text-slate-200">{event.title}</p>
                                        <p className="text-xs text-slate-400">{event.type}</p>
                                    </div>
                                </div>
                                {!event.read && (
                                    <Badge variant="outline" className="text-xs">New</Badge>
                                )}
                            </div>
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