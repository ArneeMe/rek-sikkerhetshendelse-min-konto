// src/app/game/users/page.tsx
import { DivisionGuard } from '@/components/game/DivisionGuard';
import { PageHeader } from '@/components/game/PageHeader';
import { DataTable, Column } from '@/components/game/DataTable';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

// Mock user data - replace with real data later
const userActivity = [
    { id: '1', userId: '47291', name: 'Ola Hansen', role: 'DB Administrator', lastLogin: '2024-10-04 23:00', location: 'Unknown (VPN)', status: 'suspicious' },
    { id: '2', userId: '52103', name: 'Kari Nordmann', role: 'Developer', lastLogin: '2024-10-04 08:15', location: 'Oslo, Norway', status: 'normal' },
    { id: '3', userId: '61847', name: 'Per Jensen', role: 'System Admin', lastLogin: '2024-10-04 09:30', location: 'Bergen, Norway', status: 'normal' },
    { id: '4', userId: '47291', name: 'Ola Hansen', role: 'DB Administrator', lastLogin: '2024-10-03 19:47', location: 'Oslo, Norway', status: 'clicked-phishing' },
];

const columns: Column<typeof userActivity[0]>[] = [
    { key: 'userId', header: 'User ID' },
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'lastLogin', header: 'Last Login' },
    { key: 'location', header: 'Location' },
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
                {item.status === 'clicked-phishing' ? 'Phishing Link' : item.status}
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
                    title="User Activity"
                    description="Monitor user behavior and access patterns"
                />

                <DataTable
                    columns={columns}
                    data={userActivity}
                    emptyMessage="No user activity recorded"
                />
            </div>
        </DivisionGuard>
    );
}
