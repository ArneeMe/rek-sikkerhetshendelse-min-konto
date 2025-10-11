// src/app/game/emails/page.tsx
import { PageHeader } from '@/components/game/PageHeader';
import { DataTable, Column } from '@/components/game/DataTable';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';

// Mock email data - replace with real data later
const emailLogs = [
    { id: '1', timestamp: '2024-10-03 19:00', sender: 'admin@techsupport-verify.com', recipient: '15 brukere', subject: 'Haster: Bekreft kontoen din', status: 'phishing', opened: 3, clicked: 1 },
    { id: '2', timestamp: '2024-10-04 08:00', sender: 'security@company.com', recipient: 'all@company.com', subject: 'Sikkerhetsvarsel: Phishing oppdaget', status: 'legitimate', opened: 45, clicked: 0 },
    { id: '3', timestamp: '2024-10-04 09:15', sender: 'it-support@company.com', recipient: 'developers@company.com', subject: 'Systemvedlikehold i kveld', status: 'legitimate', opened: 12, clicked: 0 },
];

const columns: Column<typeof emailLogs[0]>[] = [
    { key: 'timestamp', header: 'Tid' },
    { key: 'sender', header: 'Fra' },
    { key: 'recipient', header: 'Til' },
    { key: 'subject', header: 'Emne' },
    {
        key: 'status',
        header: 'Status',
        render: (item) => (
            <Badge className={item.status === 'phishing' ? 'bg-red-600' : 'bg-green-600'}>
                {item.status === 'phishing' ? 'Phishing' : 'Legitim'}
            </Badge>
        ),
    },
    { key: 'opened', header: 'Åpnet' },
    {
        key: 'clicked',
        header: 'Lenker klikket',
        render: (item) => (
            <span className={item.clicked > 0 ? 'text-red-400 font-bold' : ''}>
        {item.clicked}
      </span>
        ),
    },
];

export default function EmailsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                icon={Mail}
                title="E-postlogger"
                description="Spor e-postaktivitet og phishing-forsøk"
            />

            <DataTable
                columns={columns}
                data={emailLogs}
                emptyMessage="Ingen e-postlogger tilgjengelige"
            />
        </div>
    );
}