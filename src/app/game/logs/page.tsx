// src/app/game/logs/page.tsx
import { getLogs } from '@/lib/db';
import { getSession } from '@/lib/session';
import { SERVERS } from '@/lib/mock-data';
import { DivisionGuard } from '@/components/game/DivisionGuard';
import { PageHeader } from '@/components/game/PageHeader';
import { FileText } from 'lucide-react';
import { LogsClient } from './logs-client';

export default async function LogsPage() {
    const session = await getSession();
    const logs = await getLogs(session!.companyId, session!.division);

    return (
        <DivisionGuard pagePath="/game/logs">
            <div className="space-y-6">
                <PageHeader
                    icon={FileText}
                    title="Systemlogger"
                    description="Overvåk basestasjonaktivitet og sikkerhetshendelser"
                />

                <LogsClient logs={logs} servers={SERVERS} />
            </div>
        </DivisionGuard>
    );
}
