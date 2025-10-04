// src/app/admin/admin-auto-refresh.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AdminAutoRefresh() {
    const router = useRouter();

    useEffect(() => {
        // Refresh every 10 seconds for admin to see real-time updates
        const interval = setInterval(() => {
            router.refresh();
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, [router]);

    return null;
}