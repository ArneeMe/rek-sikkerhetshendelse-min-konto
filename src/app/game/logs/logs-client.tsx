// src/app/game/logs/logs-client.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import type { AppLog, DbLog, AzureAuditLog, AzureSigninLog } from '@/types/logs';
import { format } from 'date-fns';

interface LogsClientProps {
    appLogs: AppLog[];
    dbLogs: DbLog[];
    azureAuditLogs: AzureAuditLog[];
    azureSigninLogs: AzureSigninLog[];
}

export function LogsClient({ appLogs, dbLogs, azureAuditLogs, azureSigninLogs }: LogsClientProps) {
    const [selectedTab, setSelectedTab] = useState<string>('app');

    return (
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="bg-slate-800 border border-slate-700">
                <TabsTrigger value="app" className="data-[state=active]:bg-slate-700">
                    App Server
                </TabsTrigger>
                <TabsTrigger value="db" className="data-[state=active]:bg-slate-700">
                    Database
                </TabsTrigger>
                <TabsTrigger value="azure-audit" className="data-[state=active]:bg-slate-700">
                    Azure Audit
                </TabsTrigger>
                <TabsTrigger value="azure-signin" className="data-[state=active]:bg-slate-700">
                    Azure Sign-in
                </TabsTrigger>
            </TabsList>

            <TabsContent value="app" className="mt-4">
                <AppLogsTable logs={appLogs} />
            </TabsContent>

            <TabsContent value="db" className="mt-4">
                <DbLogsTable logs={dbLogs} />
            </TabsContent>

            <TabsContent value="azure-audit" className="mt-4">
                <AzureAuditLogsTable logs={azureAuditLogs} />
            </TabsContent>

            <TabsContent value="azure-signin" className="mt-4">
                <AzureSigninLogsTable logs={azureSigninLogs} />
            </TabsContent>
        </Tabs>
    );
}

function AppLogsTable({ logs }: { logs: AppLog[] }) {
    if (logs.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    No app server logs found
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-slate-900 border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Timestamp</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Event Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Source IP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Target Resource</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Action</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Details</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Result</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                                {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.event_type}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.user_name}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.source_ip}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.target_resource}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.action}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.details}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.result}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function DbLogsTable({ logs }: { logs: DbLog[] }) {
    if (logs.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    No database logs found
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-slate-900 border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Timestamp</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Event Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Source IP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Database</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Query</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Rows Affected</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Details</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Result</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                                {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.event_type}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.user_name}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.source_ip}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.database_name}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.query}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.rows_affected}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.details}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.result}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function AzureAuditLogsTable({ logs }: { logs: AzureAuditLog[] }) {
    if (logs.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    No Azure audit logs found
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-slate-900 border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Timestamp</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Actor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Action</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Target</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Target Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Details</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Source IP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Result</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                                {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.actor}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.action}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.target}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.target_type}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.details}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.source_ip}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.result}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function AzureSigninLogsTable({ logs }: { logs: AzureSigninLog[] }) {
    if (logs.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    No Azure sign-in logs found
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-slate-900 border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Timestamp</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Source IP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Application</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Failure Reason</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Device Info</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                                {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.user_name}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.source_ip}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.location}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.application}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.status}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.failure_reason || '-'}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.device_info}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}