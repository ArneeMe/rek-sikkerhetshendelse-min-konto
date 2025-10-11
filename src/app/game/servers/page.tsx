// src/app/game/servers/page.tsx
import { ServerStatus } from '@/components/game/ServerStatus';
import { PageHeader } from '@/components/game/PageHeader';
import { getServers } from '@/lib/db';
import { Server } from 'lucide-react';

export default async function ServersPage() {
    const servers = await getServers();

    return (
        <div className="space-y-6">
            <PageHeader
                icon={Server}
                title="Serverstatus"
                description="Sanntidsovervåking av infrastrukturen din"
            />

            <ServerStatus servers={servers} />
        </div>
    );
}