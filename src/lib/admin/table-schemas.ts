// src/lib/admin/table-schemas.ts
// Centralized table schema definitions for admin forms
// Based on database types in src/types/database.ts

export type FieldType = 'text' | 'textarea' | 'select' | 'team-select' | 'number' | 'datetime-local';

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    options?: string[];
}

export interface TableSchema {
    label: string;
    fields: FieldConfig[];
}

// Define field configurations based on database types
export const TABLE_SCHEMAS: Record<string, TableSchema> = {
    logs: {
        label: 'System Logs',
        fields: [
            {
                name: 'team_id',
                label: 'Team',
                type: 'team-select',
                required: false
            },
            {
                name: 'timestamp',
                label: 'Timestamp',
                type: 'datetime-local',
                required: false,
                placeholder: 'Leave empty for current time'
            },
            {
                name: 'level',
                label: 'Level',
                type: 'select',
                required: true,
                options: ['info', 'warning', 'error', 'critical']
            },
            {
                name: 'source',
                label: 'Source',
                type: 'text',
                required: true,
                placeholder: 'e.g., vest, ost, auth-system'
            },
            {
                name: 'message',
                label: 'Message',
                type: 'textarea',
                required: true
            },
        ]
    },
    emails: {
        label: 'Emails',
        fields: [
            {
                name: 'team_id',
                label: 'Team',
                type: 'team-select',
                required: false
            },
            {
                name: 'timestamp',
                label: 'Timestamp',
                type: 'datetime-local',
                required: false,
                placeholder: 'Leave empty for current time'
            },
            {
                name: 'sender',
                label: 'Sender',
                type: 'text',
                required: true,
                placeholder: 'email@example.com'
            },
            {
                name: 'recipient',
                label: 'Recipient',
                type: 'text',
                required: true,
                placeholder: 'user@company.no'
            },
            {
                name: 'subject',
                label: 'Subject',
                type: 'text',
                required: true
            },
            {
                name: 'body',
                label: 'Body',
                type: 'textarea',
                required: true
            },
            {
                name: 'type',
                label: 'Type',
                type: 'select',
                required: true,
                options: ['internal', 'external', 'system']
            },
        ]
    },
    scheduled_events: {
        label: 'Events (Inbox)',
        fields: [
            {
                name: 'team_id',
                label: 'Team',
                type: 'team-select',
                required: false
            },
            {
                name: 'trigger_at_minutes',
                label: 'Trigger at (minutes)',
                type: 'number',
                required: true,
                placeholder: 'Minutes after game start (0 = immediate)'
            },
            {
                name: 'type',
                label: 'Type',
                type: 'select',
                required: true,
                options: ['email', 'tweet', 'alert', 'server-status']
            },
            {
                name: 'title',
                label: 'Title',
                type: 'text',
                required: true
            },
            {
                name: 'content',
                label: 'Content',
                type: 'textarea',
                required: true
            },
            {
                name: 'severity',
                label: 'Severity',
                type: 'select',
                required: true,
                options: ['low', 'medium', 'high', 'critical']
            },
            {
                name: 'from_sender',
                label: 'From',
                type: 'text',
                required: false,
                placeholder: 'email or @handle'
            },
        ]
    },
    messages: {
        label: 'Chat Messages',
        fields: [
            {
                name: 'channel_id',
                label: 'Channel',
                type: 'select',
                required: true,
                options: [] // Will be populated dynamically
            },
            {
                name: 'sender_name',
                label: 'Sender Name',
                type: 'text',
                required: true,
                placeholder: 'e.g., kari.nordmann, security@company.no'
            },
            {
                name: 'role',
                label: 'Role',
                type: 'select',
                required: true,
                options: ['user', 'system', 'admin']
            },
            {
                name: 'content',
                label: 'Message Content',
                type: 'textarea',
                required: true,
                placeholder: 'Message text...'
            },
            {
                name: 'timestamp',
                label: 'Timestamp',
                type: 'datetime-local',
                required: false,
                placeholder: 'Leave empty for current time'
            },
        ]
    },
};

// Helper to get schema for a table
export function getTableSchema(table: string): TableSchema | undefined {
    return TABLE_SCHEMAS[table];
}

// Helper to get all available tables
export function getAvailableTables(): Array<{ key: string; label: string }> {
    return Object.entries(TABLE_SCHEMAS).map(([key, schema]) => ({
        key,
        label: schema.label
    }));
}

// Type guard to validate table name
export function isValidTable(table: string): table is keyof typeof TABLE_SCHEMAS {
    return table in TABLE_SCHEMAS;
}