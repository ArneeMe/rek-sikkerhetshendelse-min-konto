// src/app/game/chat/page.tsx
import { PageHeader } from '@/components/game/PageHeader';
import { MessageSquare } from 'lucide-react';
import { ChatClient } from './chat-client';
import { getChannels, getAllMessages } from '@/lib/db';

export default async function ChatPage() {
    const channels = await getChannels();
    const messagesByChannel = await getAllMessages();

    return (
        <div className="space-y-6">
            <PageHeader
                icon={MessageSquare}
                title="Intern Chat"
                description="Selskapets interne kommunikasjonskanaler"
            />

            <ChatClient
                channels={channels}
                messagesByChannel={messagesByChannel}
            />
        </div>
    );
}