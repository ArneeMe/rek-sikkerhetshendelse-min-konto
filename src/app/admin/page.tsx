// src/app/admin/page.tsx
import { getActiveGameSession, getScheduledEventsForTime } from '@/lib/db';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { AdminControls } from './admin-controls';
import { AdminAutoRefresh } from './admin-auto-refresh';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, AlertCircle } from 'lucide-react';

export default async function AdminPage() {
    const session = await getSession();

    // Only admins can access
    if (!session?.isAdmin) {
        redirect('/game');
    }

    const gameSession = await getActiveGameSession();

    let minutesElapsed = 0;
    let upcomingEvents: Array<{
        id: string;
        trigger_at_minutes: number;
        title: string;
        division: string | null;
    }> = [];

    if (gameSession) {
        minutesElapsed = Math.floor(
            (Date.now() - new Date(gameSession.started_at).getTime()) / 60000
        );

        // Get all scheduled events
        const allScheduledEvents = await getScheduledEventsForTime(999);
        upcomingEvents = allScheduledEvents
            .filter(e => e.trigger_at_minutes > minutesElapsed)
            .sort((a, b) => a.trigger_at_minutes - b.trigger_at_minutes)
            .slice(0, 5);
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
            <AdminAutoRefresh />

            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Admin Control Panel</h1>
                    <p className="text-slate-400">Manage game sessions and timed events</p>
                </div>

                {/* Game Status */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            Game Session Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {gameSession ? (
                            <>
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-green-600 text-lg px-4 py-2">
                                        ACTIVE
                                    </Badge>
                                    <div className="text-slate-300">
                                        <div className="text-sm text-slate-400">Started at</div>
                                        <div className="font-mono">
                                            {new Date(gameSession.started_at).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="text-slate-300">
                                        <div className="text-sm text-slate-400">Elapsed time</div>
                                        <div className="font-mono text-xl">
                                            {minutesElapsed} / {gameSession.duration_minutes} minutes
                                        </div>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="w-full bg-slate-800 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all"
                                        style={{
                                            width: `${Math.min(
                                                (minutesElapsed / gameSession.duration_minutes) * 100,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className="text-lg px-4 py-2">
                                    NOT STARTED
                                </Badge>
                                <div className="text-slate-400 flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    <span>Click &quot;Start Game&quot; to begin</span>
                                </div>
                            </div>
                        )}

                        <AdminControls
                            hasActiveGame={!!gameSession}
                        />
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
                {gameSession && upcomingEvents.length > 0 && (
                    <Card className="bg-slate-900 border-slate-700">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                Upcoming Scheduled Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {upcomingEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium text-slate-100">{event.title}</div>
                                            <div className="text-sm text-slate-400">
                                                {event.division ? (
                                                    <Badge variant="outline" className="text-xs mt-1 capitalize">
                                                        {event.division}
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-xs mt-1">
                                                        All Divisions
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-blue-400">
                                                {event.trigger_at_minutes - minutesElapsed} min
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                at {event.trigger_at_minutes} min
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}