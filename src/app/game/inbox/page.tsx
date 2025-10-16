// src/app/game/inbox/page.tsx
import { InboxItem } from '@/components/game/InboxItem';
import { PageHeader } from '@/components/game/PageHeader';
import { EmptyState } from '@/components/game/EmptyState';
import { getEvents, markAllEventsAsRead } from '@/lib/db';
import { getSession } from '@/lib/session';
import { Badge } from '@/components/ui/badge';
import { Inbox } from 'lucide-react';

export default async function InboxPage() {
    const session = await getSession();

    // Mark all events as read when page is visited (except for admin)
    if (session && session.teamId !== 0) {
        await markAllEventsAsRead(session.teamId);
    }

    const events = await getEvents(session!.teamId);
    const unreadCount = events.filter((e) => !e.read).length;

    return (
        <div className="space-y-6">
            <PageHeader
                icon={Inbox}
                title="Innboks"
                description="Sikkerhetshendelser, varsler og kommunikasjon"
                actions={
                    unreadCount > 0 ? (
                        <Badge className="bg-blue-600 text-base px-4 py-2">
                            {unreadCount} ulest
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
                    message="Ingen hendelser ennå"
                    submessage="Nye varsler vil vises her etter hvert som spillet utvikler seg"
                />
            )}
        </div>
    );
}