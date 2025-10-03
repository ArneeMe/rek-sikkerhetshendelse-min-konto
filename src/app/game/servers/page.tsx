'use client';

import { ServerStatus } from '@/components/game/ServerStatus';
import { MOCK_SERVERS } from '@/lib/mock-data';
import { Server } from 'lucide-react';

export default function ServersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                    <Server className="w-6 h-6" />
                    Server Status
                </h2>
                <p className="text-slate-400">Real-time monitoring of your infrastructure</p>
            </div>

            <ServerStatus servers={MOCK_SERVERS} />
        </div>
    );
}
