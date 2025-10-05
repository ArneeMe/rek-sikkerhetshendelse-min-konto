// src/app/game/inbox/page.tsx
import { InboxItem } from '@/components/game/InboxItem';
import { PageHeader } from '@/components/game/PageHeader';
import { EmptyState } from '@/components/game/EmptyState';
import { getEvents } from '@/lib/db';
import { getSession } from '@/lib/session';
import { Badge } from '@/components/ui/badge';
import { Inbox } from 'lucide-react';

export default async function InboxPage() {
    const session = await getSession();
    const events = await getEvents(session!.companyId, session!.division);
    const unreadCount = events.filter((e) => !e.read).length;

    return (
        <div className="space-y-6">
            <PageHeader
                icon={Inbox}
                title="Inbox"
                description="Security events, alerts, and communications"
                actions={
                    unreadCount > 0 ? (
                        <Badge className="bg-blue-600 text-base px-4 py-2">
                            {unreadCount} unread
                        </Badge>
                    ) : undefined
                }
            />

            {events.length > 0 ? (
                <div className="space-y-3">
                    {events.map((event) => (
                        <InboxItem key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={Inbox}
                    message="No events yet"
                    submessage="New alerts will appear here"
                />
            )}
        </div>
    );
}
