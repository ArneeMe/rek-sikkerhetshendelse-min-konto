'use client';

import { LogViewer } from '@/components/game/LogViewer';
import { MOCK_LOGS } from '@/lib/mock-data';
import { FileText } from 'lucide-react';

export default function LogsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    System Logs
                </h2>
                <p className="text-slate-400">Monitor system activity and security events</p>
            </div>

            <LogViewer logs={MOCK_LOGS} />
        </div>
    );
}
