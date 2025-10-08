import { Server } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServerStatusProps {
    servers: Server[];
}

export function ServerStatus({ servers }: ServerStatusProps) {
    const getStatusColor = (status: Server['status']) => {
        switch (status) {
            case 'online':
                return 'bg-green-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'critical':
                return 'bg-orange-500';
            case 'offline':
                return 'bg-red-500';
        }
    };

    const getStatusBadge = (status: Server['status']) => {
        switch (status) {
            case 'online':
                return <Badge className="bg-green-600">Tilkoblet</Badge>;
            case 'warning':
                return <Badge className="bg-yellow-600">Advarsel</Badge>;
            case 'critical':
                return <Badge className="bg-orange-600">Kritisk</Badge>;
            case 'offline':
                return <Badge className="bg-red-600">Frakoblet</Badge>;
        }
    };

    return (
        <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
                <CardTitle className="text-slate-100">Serverstatus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {servers.map((server) => (
                    <div
                        key={server.id}
                        className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)} animate-pulse`} />
                            <div>
                                <div className="font-mono text-sm text-slate-100">{server.name}</div>
                                <div className="text-xs text-slate-400">Last: {server.load}%</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {server.alerts > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                    {server.alerts} {server.alerts > 1 ? 'varsler' : 'varsel'}
                                </Badge>
                            )}
                            {getStatusBadge(server.status)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}