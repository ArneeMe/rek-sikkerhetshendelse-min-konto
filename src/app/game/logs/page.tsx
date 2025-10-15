// src/app/game/logs/page.tsx
import { PageHeader } from '@/components/game/PageHeader';
import { FileText } from 'lucide-react';
import { LogsClient } from './logs-client';
import { getAppLogs, getDbLogs, getAzureAuditLogs, getAzureSigninLogs } from '@/lib/db';

export default async function LogsPage() {
    const appLogs = await getAppLogs();
    const dbLogs = await getDbLogs();
    const azureAuditLogs = await getAzureAuditLogs();
    const azureSigninLogs = await getAzureSigninLogs();

    return (
        <div className="space-y-6">
            <PageHeader
                icon={FileText}
                title="Systemlogger"
                description="Overvåk applikasjoner, databaser og Azure-aktivitet"
            />

            <LogsClient
                appLogs={appLogs}
                dbLogs={dbLogs}
                azureAuditLogs={azureAuditLogs}
                azureSigninLogs={azureSigninLogs}
            />
        </div>
    );
}