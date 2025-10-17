// src/app/game/chat/chat-client.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Channel, Message } from '@/types/chat';
import { format } from 'date-fns';

interface ChatClientProps {
    channels: Channel[];
    messagesByChannel: Record<string, Message[]>;
}

export function ChatClient({ channels, messagesByChannel }: ChatClientProps) {
    const [selectedChannel, setSelectedChannel] = useState<string>(
        channels[0]?.id || ''
    );

    return (
        <Tabs value={selectedChannel} onValueChange={setSelectedChannel} className="w-full">
            <TabsList className="bg-slate-800 border border-slate-700">
                {channels.map((channel) => (
                    <TabsTrigger
                        key={channel.id}
                        value={channel.id}
                        className="data-[state=active]:bg-slate-700"
                    >
                        # {channel.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {channels.map((channel) => (
                <TabsContent key={channel.id} value={channel.id} className="mt-4">
                    <MessagesView messages={messagesByChannel[channel.id] || []} />
                </TabsContent>
            ))}
        </Tabs>
    );
}

function MessagesView({ messages }: { messages: Message[] }) {
    if (messages.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    Ingen meldinger i denne kanalen
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4">
                <div className="space-y-4">
                    {messages.map((message) => {
                        const roleColors = getRoleColors(message.role);

                        return (
                            <div key={message.id} className="flex gap-3">
                                {/* User Avatar/Icon */}
                                <div
                                    className={`flex-shrink-0 w-10 h-10 rounded-full ${roleColors.avatar} flex items-center justify-center text-white font-semibold`}
                                >
                                    {message.sender_name.charAt(0).toUpperCase()}
                                </div>

                                {/* Message Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                                        <span className={`font-semibold ${roleColors.name}`}>
                                            {message.sender_name}
                                        </span>
                                        {message.role !== 'user' && (
                                            <Badge className={roleColors.badge}>
                                                {message.role === 'system' ? 'SYSTEM' : 'ADMIN'}
                                            </Badge>
                                        )}
                                        <span className="text-xs text-slate-500 font-mono">
                                            {format(new Date(message.timestamp), 'dd.MM.yyyy HH:mm')}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-sm whitespace-pre-wrap break-words">
                                        {message.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

function getRoleColors(role: 'user' | 'system' | 'admin') {
    switch (role) {
        case 'system':
            return {
                avatar: 'bg-orange-600',
                name: 'text-orange-400',
                badge: 'bg-orange-600'
            };
        case 'admin':
            return {
                avatar: 'bg-red-600',
                name: 'text-red-400',
                badge: 'bg-red-600'
            };
        case 'user':
        default:
            return {
                avatar: 'bg-slate-700',
                name: 'text-slate-100',
                badge: 'bg-slate-600'
            };
    }
}