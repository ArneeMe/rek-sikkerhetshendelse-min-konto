// src/app/game/emails/page.tsx
import { PageHeader } from '@/components/game/PageHeader';
import { Mail } from 'lucide-react';
import { getEmails, getEmailSenders, getEmailRecipients } from '@/lib/db-emails';
import { getSession } from '@/lib/session';
import { EmailsClient } from './emails-client';

export default async function EmailsPage() {
    const session = await getSession();
    const emails = await getEmails(session!.companyId);
    const senders = await getEmailSenders(session!.companyId);
    const recipients = await getEmailRecipients(session!.companyId);

    return (
        <div className="space-y-6">
            <PageHeader
                icon={Mail}
                title="E-postoversikt"
                description="Søk og analyser selskapets e-postkommunikasjon"
            />

            <EmailsClient
                emails={emails}
                senders={senders}
                recipients={recipients}
            />
        </div>
    );
}