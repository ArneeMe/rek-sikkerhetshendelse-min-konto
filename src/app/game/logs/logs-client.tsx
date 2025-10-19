// src/app/game/logs/logs-client.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import type { AppServerLog, DbServerLog, AzureAuditLog, AzureSigninLog, OfficeFirewallLog } from '@/types/logs';
import { format } from 'date-fns';

interface LogsClientProps {
    appServer1Logs: AppServerLog[];
    appServer2Logs: AppServerLog[];
    appServer3Logs: AppServerLog[];
    dbServer1Logs: DbServerLog[];
    dbServer2Logs: DbServerLog[];
    dbServer3Logs: DbServerLog[];
    azureAuditLogs: AzureAuditLog[];
    azureSigninLogs: AzureSigninLog[];
    officeFirewallLogs: OfficeFirewallLog[];
}

export function LogsClient({
                               officeFirewallLogs,
                               azureAuditLogs,
                               azureSigninLogs,
                               appServer1Logs,
                               appServer2Logs,
                               appServer3Logs,
                               dbServer1Logs,
                               dbServer2Logs,
                               dbServer3Logs,

                           }: LogsClientProps) {
    const [selectedTab, setSelectedTab] = useState<string>('app1');

    return (
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="bg-slate-800 border border-slate-700 flex-wrap h-auto">
                <TabsTrigger value="firewall" className="data-[state=active]:bg-slate-700">
                    Office Firewall
                </TabsTrigger>
                <TabsTrigger value="azure-audit" className="data-[state=active]:bg-slate-700">
                    Azure Audit
                </TabsTrigger>
                <TabsTrigger value="azure-signin" className="data-[state=active]:bg-slate-700">
                    Azure Sign-in
                </TabsTrigger>
                <TabsTrigger value="app1" className="data-[state=active]:bg-slate-700">
                    App Server 1
                </TabsTrigger>
                <TabsTrigger value="app2" className="data-[state=active]:bg-slate-700">
                    App Server 2
                </TabsTrigger>
                <TabsTrigger value="app3" className="data-[state=active]:bg-slate-700">
                    App Server 3
                </TabsTrigger>
                <TabsTrigger value="db1" className="data-[state=active]:bg-slate-700">
                    DB Server 1
                </TabsTrigger>
                <TabsTrigger value="db2" className="data-[state=active]:bg-slate-700">
                    DB Server 2
                </TabsTrigger>
                <TabsTrigger value="db3" className="data-[state=active]:bg-slate-700">
                    DB Server 3
                </TabsTrigger>
            </TabsList>

            <TabsContent value="app1" className="mt-4">
                <AppServerLogsTable logs={appServer1Logs} serverName="App Server 1" />
            </TabsContent>

            <TabsContent value="app2" className="mt-4">
                <AppServerLogsTable logs={appServer2Logs} serverName="App Server 2" />
            </TabsContent>

            <TabsContent value="app3" className="mt-4">
                <AppServerLogsTable logs={appServer3Logs} serverName="App Server 3" />
            </TabsContent>

            <TabsContent value="db1" className="mt-4">
                <DbServerLogsTable logs={dbServer1Logs} serverName="DB Server 1" />
            </TabsContent>

            <TabsContent value="db2" className="mt-4">
                <DbServerLogsTable logs={dbServer2Logs} serverName="DB Server 2" />
            </TabsContent>

            <TabsContent value="db3" className="mt-4">
                <DbServerLogsTable logs={dbServer3Logs} serverName="DB Server 3" />
            </TabsContent>

            <TabsContent value="azure-audit" className="mt-4">
                <AzureAuditLogsTable logs={azureAuditLogs} />
            </TabsContent>

            <TabsContent value="azure-signin" className="mt-4">
                <AzureSigninLogsTable logs={azureSigninLogs} />
            </TabsContent>

            <TabsContent value="firewall" className="mt-4">
                <OfficeFirewallLogsTable logs={officeFirewallLogs} />
            </TabsContent>
        </Tabs>
    );
}

function AppServerLogsTable({ logs, serverName }: { logs: AppServerLog[]; serverName: string }) {
    if (logs.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    No {serverName} logs found
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
                                {format(new Date(log.Timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.EventType}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.User}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.SourceIP}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.TargetResource}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Action}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Details}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Result}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function DbServerLogsTable({ logs, serverName }: { logs: DbServerLog[]; serverName: string }) {
    if (logs.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    No {serverName} logs found
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
                                {format(new Date(log.Timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.EventType}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.User}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.SourceIP}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Database}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono max-w-xs truncate" title={log.Query}>
                                {log.Query}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.RowsAffected}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Details}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Result}</td>
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
                                {format(new Date(log.Timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Actor}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Action}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Target}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.TargetType}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Details}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.SourceIP}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Result}</td>
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
                                {format(new Date(log.Timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.User}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.SourceIP}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Location}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Application}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Status}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.FailureReason || '-'}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.DeviceInfo}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function OfficeFirewallLogsTable({ logs }: { logs: OfficeFirewallLog[] }) {
    if (logs.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    No office firewall logs found
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
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Source IP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Source User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Dest IP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Dest Domain</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Port</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Protocol</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Action</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Bytes</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase">Details</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                                {format(new Date(log.Timestamp), 'yyyy-MM-dd HH:mm:ss')}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.EventType}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.SourceIP}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.SourceUser || '-'}</td>
                            <td className="px-4 py-3 text-sm text-slate-300 font-mono">{log.DestIP || '-'}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.DestDomain || '-'}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.DestPort || '-'}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Protocol}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Action}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">
                                {log.BytesTransferred ? log.BytesTransferred.toLocaleString() : '-'}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-300">{log.Details || '-'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}