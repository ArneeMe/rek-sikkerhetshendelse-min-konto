// src/app/game/users/page.tsx
import { DivisionGuard } from '@/components/game/DivisionGuard';
import { PageHeader } from '@/components/game/PageHeader';
import { DataTable, Column } from '@/components/game/DataTable';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

// Mock user data - replace with real data later
const userActivity = [
    { id: '1', userId: '47291', name: 'Ola Hansen', role: 'DB Administrator', lastLogin: '2024-10-04 23:00', location: 'Ukjent (VPN)', status: 'suspicious' },
    { id: '2', userId: '52103', name: 'Kari Nordmann', role: 'Utvikler', lastLogin: '2024-10-04 08:15', location: 'Oslo, Norge', status: 'normal' },
    { id: '3', userId: '61847', name: 'Per Jensen', role: 'Systemadministrator', lastLogin: '2024-10-04 09:30', location: 'Bergen, Norge', status: 'normal' },
    { id: '4', userId: '47291', name: 'Ola Hansen', role: 'DB Administrator', lastLogin: '2024-10-03 19:47', location: 'Oslo, Norge', status: 'clicked-phishing' },
];

const columns: Column<typeof userActivity[0]>[] = [
    { key: 'userId', header: 'Bruker-ID' },
    { key: 'name', header: 'Navn' },
    { key: 'role', header: 'Rolle' },
    { key: 'lastLogin', header: 'Siste innlogging' },
    { key: 'location', header: 'Lokasjon' },
    {
        key: 'status',
        header: 'Status',
        render: (item) => (
            <Badge
                className={
                    item.status === 'normal' ? 'bg-green-600' :
                        item.status === 'suspicious' ? 'bg-orange-600' :
                            'bg-red-600'
                }
            >
                {item.status === 'clicked-phishing' ? 'Phishing-lenke' :
                    item.status === 'suspicious' ? 'Mistenkelig' :
                        'Normal'}
            </Badge>
        ),
    },
];

export default function UsersPage() {
    return (
        <DivisionGuard pagePath="/game/users">
            <div className="space-y-6">
                <PageHeader
                    icon={Users}
                    title="Brukeraktivitet"
                    description="Overvåk brukeratferd og tilgangsmønstre"
                />

                <DataTable
                    columns={columns}
                    data={userActivity}
                    emptyMessage="Ingen brukeraktivitet registrert"
                />
            </div>
        </DivisionGuard>
    );
}
