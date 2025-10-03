'use client';

import { InboxItem } from '@/components/game/InboxItem';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Inbox } from 'lucide-react';

export default function InboxPage() {
    const unreadCount = MOCK_EVENTS.filter((e) => !e.read).length;

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
                {MOCK_EVENTS.map((event) => (
                    <InboxItem key={event.id} event={event} />
                ))}
            </div>

            {MOCK_EVENTS.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No events yet</p>
                </div>
            )}
        </div>
    );
}
