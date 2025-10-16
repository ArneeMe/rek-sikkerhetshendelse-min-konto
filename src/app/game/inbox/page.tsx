// src/app/game/inbox/page.tsx
import { InboxItem } from '@/components/game/InboxItem';
import { PageHeader } from '@/components/game/PageHeader';
import { EmptyState } from '@/components/game/EmptyState';
import { getEvents } from '@/lib/db';
import { getSession } from '@/lib/session';
import { Inbox } from 'lucide-react';

export default async function InboxPage() {
    const session = await getSession();
    const events = await getEvents(session!.teamId);

    return (
        <div className="space-y-6">
            <PageHeader
                icon={Inbox}
                title="Innboks"
                description="Sikkerhetshendelser, varsler og kommunikasjon"
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