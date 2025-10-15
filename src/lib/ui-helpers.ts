// src/lib/ui-helpers.ts
import { Mail, Twitter, AlertCircle, Server } from 'lucide-react';
import type { Event, LogEntry } from '@/types';

// Get icon for event type
export function getEventIcon(type: Event['type']) {
    const icons = {
        email: Mail,
        tweet: Twitter,
        alert: AlertCircle,
        'server-status': Server,
    };
    return icons[type] || AlertCircle;
}

// Get color for severity
export function getSeverityColor(severity: Event['severity'] | LogEntry['level']) {
    const colors = {
        low: 'text-blue-500',
        info: 'text-blue-500',
        medium: 'text-yellow-500',
        warning: 'text-yellow-500',
        high: 'text-orange-500',
        error: 'text-orange-500',
        critical: 'text-red-500',
    };
    return colors[severity] || 'text-slate-500';
}

// Format timestamp consistently
export function formatTimestamp(date: Date, format: 'full' | 'time' | 'date' = 'full') {
    if (format === 'time') {
        return date.toLocaleTimeString('nb-NO', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    if (format === 'date') {
        return date.toLocaleDateString('nb-NO');
    }
    return date.toLocaleString('nb-NO');
}

// Get relative time (e.g., "5 minutes ago")
export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}