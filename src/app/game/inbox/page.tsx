import { InboxItem } from '@/components/game/InboxItem';
import { getEvents } from '@/lib/db';
import { getSession } from '@/lib/session';
import { Badge } from '@/components/ui/badge';
import { Inbox } from 'lucide-react';

export default async function InboxPage() {
    const session = await getSession();
    const events = await getEvents(session!.companyId);
    const unreadCount = events.filter((e) => !e.read).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                        <Inbox className="w-6 h-6" />
                        Inbox
                    </h2>
                    <p className="text-slate-400">Security events, alerts, and communications</p>
                </div>
                {unreadCount > 0 && (
                    <Badge className="bg-blue-600 text-base px-4 py-2">
                        {unreadCount} unread
                    </Badge>
                )}
            </div>

            <div className="space-y-3">
                {events.map((event) => (
                    <InboxItem key={event.id} event={event} />
                ))}
            </div>

            {events.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No events yet</p>
                </div>
            )}
        </div>
    );
}