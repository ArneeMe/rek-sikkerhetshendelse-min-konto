// src/types/chat.ts
export interface Channel {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
}

export interface Message {
    id: string;
    channel_id: string;
    sender_name: string;
    role: 'user' | 'system' | 'admin';
    content: string;
    timestamp: string;
    created_at: string;
}