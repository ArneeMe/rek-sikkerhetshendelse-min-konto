// src/app/game/network/page.tsx
import { PageHeader } from '@/components/game/PageHeader';
import { DataTable, Column } from '@/components/game/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';

// Mock network data - replace with real data later
const networkConnections = [
    { id: '1', source: '192.168.1.100', destination: '10.0.0.50', port: 443, protocol: 'HTTPS', status: 'active', traffic: '2.5 MB/s' },
    { id: '2', source: '192.168.45.22', destination: 'db-prod-01', port: 5432, protocol: 'PostgreSQL', status: 'suspicious', traffic: '15.2 MB/s' },
    { id: '3', source: '10.0.1.15', destination: '10.0.2.30', port: 22, protocol: 'SSH', status: 'active', traffic: '0.1 MB/s' },
    { id: '4', source: '192.168.45.22', destination: 'backup-server-01', port: 3306, protocol: 'MySQL', status: 'blocked', traffic: '0 MB/s' },
];

const columns: Column<typeof networkConnections[0]>[] = [
    { key: 'source', header: 'Kilde-IP' },
    { key: 'destination', header: 'Destinasjon' },
    { key: 'port', header: 'Port' },
    { key: 'protocol', header: 'Protokoll' },
    {
        key: 'status',
        header: 'Status',
        render: (item) => (
            <Badge
                className={
                    item.status === 'active' ? 'bg-green-600' :
                        item.status === 'suspicious' ? 'bg-orange-600' :
                            'bg-red-600'
                }
            >
                {item.status === 'active' ? 'Aktiv' :
                    item.status === 'suspicious' ? 'Mistenkelig' :
                        'Blokkert'}
            </Badge>
        ),
    },
    { key: 'traffic', header: 'Trafikk' },
];

export default function NetworkPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                icon={Network}
                title="Nettverksmonitor"
                description="Sanntidsanalyse av nettverkstilkoblinger"
            />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-slate-900 border-slate-700">
                    <CardContent className="p-4">
                        <div className="text-sm text-slate-400">Aktive tilkoblinger</div>
                        <div className="text-2xl font-bold text-slate-100 mt-1">127</div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-700">
                    <CardContent className="p-4">
                        <div className="text-sm text-slate-400">Mistenkelige</div>
                        <div className="text-2xl font-bold text-orange-400 mt-1">3</div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-700">
                    <CardContent className="p-4">
                        <div className="text-sm text-slate-400">Blokkerte</div>
                        <div className="text-2xl font-bold text-red-400 mt-1">12</div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-700">
                    <CardContent className="p-4">
                        <div className="text-sm text-slate-400">Total trafikk</div>
                        <div className="text-2xl font-bold text-blue-400 mt-1">45.2 GB</div>
                    </CardContent>
                </Card>
            </div>

            {/* Connection Table */}
            <DataTable
                columns={columns}
                data={networkConnections}
                emptyMessage="Ingen nettverkstilkoblinger oppdaget"
            />
        </div>
    );
}