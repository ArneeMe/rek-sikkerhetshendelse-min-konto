// src/app/game/servers/page.tsx
import { ServerStatus } from '@/components/game/ServerStatus';
import { DivisionGuard } from '@/components/game/DivisionGuard';
import { PageHeader } from '@/components/game/PageHeader';
import { getServers } from '@/lib/db';
import { Server } from 'lucide-react';

export default async function ServersPage() {
    const servers = await getServers();

    return (
        <DivisionGuard pagePath="/game/servers">
            <div className="space-y-6">
                <PageHeader
                    icon={Server}
                    title="Server Status"
                    description="Real-time monitoring of your infrastructure"
                />

                <ServerStatus servers={servers} />
            </div>
        </DivisionGuard>
    );
}
