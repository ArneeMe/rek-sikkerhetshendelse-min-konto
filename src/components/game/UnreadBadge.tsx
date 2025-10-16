// src/components/game/UnreadBadge.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface UnreadBadgeProps {
    initialCount: number;
}

export function UnreadBadge({ initialCount }: UnreadBadgeProps) {
    const [unreadCount, setUnreadCount] = useState(initialCount);
    const pathname = usePathname();

    useEffect(() => {
        // Fetch unread count every 10 seconds
        const fetchUnreadCount = async () => {
            try {
                const response = await fetch('/api/inbox/unread-count');
                if (response.ok) {
                    const data = await response.json();
                    setUnreadCount(data.unreadCount);
                }
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        // Fetch immediately when component mounts
        fetchUnreadCount();

        // Set up polling interval
        const interval = setInterval(fetchUnreadCount, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, []);

    // Also fetch when pathname changes (navigation)
    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const response = await fetch('/api/inbox/unread-count');
                if (response.ok) {
                    const data = await response.json();
                    setUnreadCount(data.unreadCount);
                }
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        fetchUnreadCount();
    }, [pathname]);

    if (unreadCount === 0) {
        return null;
    }

    return (
        <Badge className="absolute -top-1 -right-1 md:relative md:top-0 md:right-0 md:ml-2 bg-blue-600 text-white min-w-5 h-5 flex items-center justify-center p-1 text-xs">
            {unreadCount}
        </Badge>
    );
}