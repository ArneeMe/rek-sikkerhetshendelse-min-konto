// src/app/game/page.tsx
import { getEvents, getActiveGameSession } from '@/lib/db';
import { getEmails } from '@/lib/db/db-emails';
import { getChannels, getAllMessages } from '@/lib/db';
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
import { getSession } from '@/lib/session';
import { COMPANY_NAME } from '@/lib/constants';
import DashboardClient from './dashboard-client';

export default async function GameDashboard() {
    const session = await getSession();
    const events = await getEvents(session!.teamId);
    const emails = await getEmails(session!.teamId);
    const channels = await getChannels();
    const messagesByChannel = await getAllMessages();
    const gameSession = await getActiveGameSession();

    // Count total messages across all channels
    const totalMessages = Object.values(messagesByChannel).reduce(
        (sum, messages) => sum + messages.length,
        0
    );

    // Count total logs across all log sources
    const appServer1Logs = await getAppServer1Logs();
    const appServer2Logs = await getAppServer2Logs();
    const appServer3Logs = await getAppServer3Logs();
    const dbServer1Logs = await getDbServer1Logs();
    const dbServer2Logs = await getDbServer2Logs();
    const dbServer3Logs = await getDbServer3Logs();
    const azureAuditLogs = await getAzureAuditLogs();
    const azureSigninLogs = await getAzureSigninLogs();
    const officeFirewallLogs = await getOfficeFirewallLogs();

    const totalLogs =
        appServer1Logs.length +
        appServer2Logs.length +
        appServer3Logs.length +
        dbServer1Logs.length +
        dbServer2Logs.length +
        dbServer3Logs.length +
        azureAuditLogs.length +
        azureSigninLogs.length +
        officeFirewallLogs.length;

    return (
        <DashboardClient
            events={events}
            emails={emails}
            totalMessages={totalMessages}
            channelsCount={channels.length}
            totalLogs={totalLogs}
            teamName={session!.teamName}
            companyName={COMPANY_NAME}
            gameStartTime={gameSession?.started_at || null}
        />
    );
}