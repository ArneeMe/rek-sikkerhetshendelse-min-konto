// src/app/game/emails/page.tsx
import { DivisionGuard } from '@/components/game/DivisionGuard';
import { PageHeader } from '@/components/game/PageHeader';
import { DataTable, Column } from '@/components/game/DataTable';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';

// Mock email data - replace with real data later
const emailLogs = [
    { id: '1', timestamp: '2024-10-03 19:00', sender: 'admin@techsupport-verify.com', recipient: '15 users', subject: 'Urgent: Verify Your Account', status: 'phishing', opened: 3, clicked: 1 },
    { id: '2', timestamp: '2024-10-04 08:00', sender: 'security@company.com', recipient: 'all@company.com', subject: 'Security Alert: Phishing Detected', status: 'legitimate', opened: 45, clicked: 0 },
    { id: '3', timestamp: '2024-10-04 09:15', sender: 'it-support@company.com', recipient: 'developers@company.com', subject: 'System Maintenance Tonight', status: 'legitimate', opened: 12, clicked: 0 },
];

const columns: Column<typeof emailLogs[0]>[] = [
    { key: 'timestamp', header: 'Time' },
    { key: 'sender', header: 'From' },
    { key: 'recipient', header: 'To' },
    { key: 'subject', header: 'Subject' },
    {
        key: 'status',
        header: 'Status',
        render: (item) => (
            <Badge className={item.status === 'phishing' ? 'bg-red-600' : 'bg-green-600'}>
                {item.status}
            </Badge>
        ),
    },
    { key: 'opened', header: 'Opened' },
    {
        key: 'clicked',
        header: 'Links Clicked',
        render: (item) => (
            <span className={item.clicked > 0 ? 'text-red-400 font-bold' : ''}>
        {item.clicked}
      </span>
        ),
    },
];

export default function EmailsPage() {
    return (
        <DivisionGuard pagePath="/game/emails">
            <div className="space-y-6">
                <PageHeader
                    icon={Mail}
                    title="Email Logs"
                    description="Track email activity and phishing attempts"
                />

                <DataTable
                    columns={columns}
                    data={emailLogs}
                    emptyMessage="No email logs available"
                />
            </div>
        </DivisionGuard>
    );
}