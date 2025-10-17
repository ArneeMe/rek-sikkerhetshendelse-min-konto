// src/lib/db/db-chat.ts
import {supabase} from '../supabase';
import type {Channel, Message} from '@/types/chat';

export async function getChannels(): Promise<Channel[]> {
    const { data, error } = await supabase
        .from('channels')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching channels:', error);
        return [];
    }

    return (data || []) as Channel[];
}

export async function getMessages(channelId: string): Promise<Message[]> {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('timestamp', { ascending: true });

    if (error) {
        console.error('Error fetching messages:', error);
        return [];
    }

    return (data || []) as Message[];
}

export async function getAllMessages(): Promise<Record<string, Message[]>> {
    const channels = await getChannels();
    const messagesByChannel: Record<string, Message[]> = {};

    for (const channel of channels) {
        messagesByChannel[channel.id] = await getMessages(channel.id);
    }

    return messagesByChannel;
}

export async function createMessage(message: {
    channelId: string;
    senderName: string;
    role: 'user' | 'system' | 'admin';
    content: string;
    timestamp?: string;
}) {
    const { data, error } = await supabase.from('messages').insert({
        channel_id: message.channelId,
        sender_name: message.senderName,
        role: message.role,
        content: message.content,
        timestamp: message.timestamp || new Date().toISOString(),
    }).select();

    if (error) {
        console.error('Error creating message:', error);
        return null;
    }

    return data?.[0] as Message | undefined;
}