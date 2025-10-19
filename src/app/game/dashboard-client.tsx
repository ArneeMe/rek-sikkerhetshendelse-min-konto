// src/app/game/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    MessageSquare,
    Mail,
    Inbox,
    FileText,
    Clock,
    Activity
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface DashboardClientProps {
    events: Array<{
        id: string;
        title: string;
        timestamp: Date;
        type: string;
    }>;
    emails: Array<{
        id: string;
        subject: string;
        sender: string;
        timestamp: string;
        type: string;
    }>;
    totalMessages: number;
    channelsCount: number;
    totalLogs: number;
    teamName: string;
    companyName: string;
    gameStartTime: string | null;
}

export default function DashboardClient({
                                            events,
                                            emails,
                                            totalMessages,
                                            channelsCount,
                                            totalLogs,
                                            teamName,
                                            companyName,
                                            gameStartTime
                                        }: DashboardClientProps) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStartTime]);

    const recentEvents = events.slice(0, 3);
    const recentEmails = emails.slice(0, 3);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">Sikkerhetssenter - Oversikt</h2>
                    <p className="text-slate-400">Overvåkning og analyse av systemene til {companyName}</p>
                </div>
                {gameStartTime && (
                    <div className="text-right">
                        <div className="text-sm text-slate-400">Systemtid</div>
                        <div className="text-xl font-bold text-blue-400 font-mono">
                            {format(currentTime, 'HH:mm:ss')}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                            Oppstart: {format(new Date(gameStartTime), 'HH:mm')}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <Badge variant="outline" className="text-slate-300">
                    {teamName}
                </Badge>
            </div>

            {/* System Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Link href="/game/inbox">
                    <Card className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer h-full">
                        <CardContent className="p-6 flex items-center h-full">
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Innboks</div>
                                    <div className="text-3xl font-bold text-slate-100">{events.length}</div>
                                    <div className="text-xs text-slate-500 mt-1">varsler</div>
                                </div>
                                <Inbox className="w-8 h-8 text-blue-400" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/game/emails">
                    <Card className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer h-full">
                        <CardContent className="p-6 flex items-center h-full">
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">E-postlogger</div>
                                    <div className="text-3xl font-bold text-slate-100">{emails.length}</div>
                                    <div className="text-xs text-slate-500 mt-1">e-poster</div>
                                </div>
                                <Mail className="w-8 h-8 text-purple-400" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/game/chat">
                    <Card className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer h-full">
                        <CardContent className="p-6 flex items-center h-full">
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Intern Chat</div>
                                    <div className="text-3xl font-bold text-slate-100">{totalMessages}</div>
                                    <div className="text-xs text-slate-500 mt-1">{channelsCount} kanaler</div>
                                </div>
                                <MessageSquare className="w-8 h-8 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/game/logs">
                    <Card className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer h-full">
                        <CardContent className="p-6 flex items-center h-full">
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Systemlogger</div>
                                    <div className="text-3xl font-bold text-slate-100">{totalLogs}</div>
                                    <div className="text-xs text-slate-500 mt-1">logginnførsler</div>
                                </div>
                                <FileText className="w-8 h-8 text-orange-400" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Activity Feed - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Events */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Activity className="w-5 h-5 text-blue-400" />
                            Nylige varsler
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentEvents.length > 0 ? (
                            <div className="space-y-3">
                                {recentEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="p-3 bg-slate-800 rounded-lg border border-slate-700"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-slate-200 text-sm truncate">
                                                    {event.title}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-1">
                                                    {format(event.timestamp, 'dd.MM.yyyy HH:mm')}
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-xs shrink-0">
                                                {event.type}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm text-center py-4">Ingen varsler</p>
                        )}
                        <Link href="/game/inbox">
                            <p className="text-sm text-blue-400 hover:text-blue-300 mt-4 cursor-pointer text-center">
                                Se alle varsler →
                            </p>
                        </Link>
                    </CardContent>
                </Card>

                {/* Recent Emails */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Mail className="w-5 h-5 text-purple-400" />
                            Nylige e-poster
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentEmails.length > 0 ? (
                            <div className="space-y-3">
                                {recentEmails.map((email) => (
                                    <div
                                        key={email.id}
                                        className="p-3 bg-slate-800 rounded-lg border border-slate-700"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-slate-200 text-sm truncate">
                                                    {email.subject}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-1 truncate">
                                                    Fra: {email.sender}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-1">
                                                    {format(new Date(email.timestamp), 'dd.MM.yyyy HH:mm')}
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-xs shrink-0">
                                                {email.type}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm text-center py-4">Ingen e-poster</p>
                        )}
                        <Link href="/game/emails">
                            <p className="text-sm text-purple-400 hover:text-purple-300 mt-4 cursor-pointer text-center">
                                Se alle e-poster →
                            </p>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* System Status */}
            <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="w-5 h-5 text-green-400" />
                        Systemstatus
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-slate-800 rounded-lg">
                            <div className="text-2xl font-bold text-green-400">●</div>
                            <div className="text-sm text-slate-300 mt-2 font-medium">Overvåkning</div>
                            <div className="text-xs text-slate-500 mt-1">Operativ</div>
                        </div>
                        <div className="text-center p-4 bg-slate-800 rounded-lg">
                            <div className="text-2xl font-bold text-green-400">●</div>
                            <div className="text-sm text-slate-300 mt-2 font-medium">Loggsamling</div>
                            <div className="text-xs text-slate-500 mt-1">Operativ</div>
                        </div>
                        <div className="text-center p-4 bg-slate-800 rounded-lg">
                            <div className="text-2xl font-bold text-green-400">●</div>
                            <div className="text-sm text-slate-300 mt-2 font-medium">E-postarkiv</div>
                            <div className="text-xs text-slate-500 mt-1">Operativ</div>
                        </div>
                        <div className="text-center p-4 bg-slate-800 rounded-lg">
                            <div className="text-2xl font-bold text-green-400">●</div>
                            <div className="text-sm text-slate-300 mt-2 font-medium">Chat-system</div>
                            <div className="text-xs text-slate-500 mt-1">Operativ</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}