// src/app/game/logs/page.tsx
import { getLogs } from '@/lib/db';
import { getSession } from '@/lib/session';
import { SERVERS } from '@/lib/mock-data';
import { FileText } from 'lucide-react';
import { LogsClient } from './logs-client';

export default async function LogsPage() {
    const session = await getSession();
    const logs = await getLogs(session!.companyId);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    System Logs
                </h2>
                <p className="text-slate-400">Monitor basestasjon activity and security events</p>
            </div>

            <LogsClient logs={logs} servers={SERVERS} />
        </div>
    );
}