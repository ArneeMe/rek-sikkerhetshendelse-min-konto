// src/app/game/logs/page.tsx
import { PageHeader } from '@/components/game/PageHeader';
import { FileText } from 'lucide-react';
import { LogsClient } from './logs-client';
import {
    getAppServer1Logs,
    getAppServer2Logs,
    getAppServer3Logs,
    getDbServer1Logs,
    getDbServer2Logs,
    getDbServer3Logs,
    getAzureAuditLogs,
    getAzureSigninLogs,
    getOfficeFirewallLogs
} from '@/lib/db/db-logs';

export default async function LogsPage() {
    const appServer1Logs = await getAppServer1Logs();
    const appServer2Logs = await getAppServer2Logs();
    const appServer3Logs = await getAppServer3Logs();
    const dbServer1Logs = await getDbServer1Logs();
    const dbServer2Logs = await getDbServer2Logs();
    const dbServer3Logs = await getDbServer3Logs();
    const azureAuditLogs = await getAzureAuditLogs();
    const azureSigninLogs = await getAzureSigninLogs();
    const officeFirewallLogs = await getOfficeFirewallLogs();

    return (
        <div className="space-y-6">
            <PageHeader
                icon={FileText}
                title="Systemlogger"
                description="Overvåk applikasjoner, databaser, Azure-aktivitet og brannmur"
            />

            <LogsClient
                officeFirewallLogs={officeFirewallLogs}
                azureAuditLogs={azureAuditLogs}
                azureSigninLogs={azureSigninLogs}
                appServer1Logs={appServer1Logs}
                appServer2Logs={appServer2Logs}
                appServer3Logs={appServer3Logs}
                dbServer1Logs={dbServer1Logs}
                dbServer2Logs={dbServer2Logs}
                dbServer3Logs={dbServer3Logs}
            />
        </div>
    );
}