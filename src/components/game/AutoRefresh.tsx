// src/components/game/AutoRefresh.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AutoRefresh() {
    const router = useRouter();

    useEffect(() => {
        // Refresh every 30 seconds to check for new timed events
        const interval = setInterval(() => {
            router.refresh();
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [router]);

    return null; // This component doesn't render anything
}