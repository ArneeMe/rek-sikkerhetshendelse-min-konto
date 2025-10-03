import { LogEntry } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface LogViewerProps {
    logs: LogEntry[];
}

export function LogViewer({ logs }: LogViewerProps) {
    const getLevelBadge = (level: LogEntry['level']) => {
        switch (level) {
            case 'info':
                return <Badge className="bg-blue-600 text-xs">INFO</Badge>;
            case 'warning':
                return <Badge className="bg-yellow-600 text-xs">WARN</Badge>;
            case 'error':
                return <Badge className="bg-orange-600 text-xs">ERROR</Badge>;
            case 'critical':
                return <Badge className="bg-red-600 text-xs">CRIT</Badge>;
        }
    };

    return (
        <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
                <CardTitle className="text-slate-100">System Logs</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {logs.map((log) => (
                        <div
                            key={log.id}
                            className="font-mono text-xs p-2 bg-slate-800 rounded border border-slate-700 hover:border-slate-600 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-500">
                  {format(log.timestamp, 'HH:mm:ss')}
                </span>
                                {getLevelBadge(log.level)}
                                <span className="text-slate-400">[{log.source}]</span>
                            </div>
                            <div className="text-slate-300">{log.message}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
