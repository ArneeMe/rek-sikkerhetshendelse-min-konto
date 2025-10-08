// src/app/game/logs/logs-client.tsx
'use client';

import { useState } from 'react';
import { LogViewer } from '@/components/game/LogViewer';
import { LogEntry } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface LogsClientProps {
    logs: LogEntry[];
    servers: readonly { id: string; name: string }[];
}

export function LogsClient({ logs, servers }: LogsClientProps) {
    const [selectedServer, setSelectedServer] = useState<string>('all');

    const filteredLogs = selectedServer === 'all'
        ? logs
        : logs.filter(log => log.source === selectedServer);

    return (
        <Tabs value={selectedServer} onValueChange={setSelectedServer} className="w-full">
            <TabsList className="bg-slate-800 border border-slate-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
                    Alle logger
                </TabsTrigger>
                {servers.map((server) => (
                    <TabsTrigger
                        key={server.id}
                        value={server.id}
                        className="data-[state=active]:bg-slate-700"
                    >
                        {server.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value={selectedServer} className="mt-4">
                <LogViewer logs={filteredLogs} />
            </TabsContent>
        </Tabs>
    );
}