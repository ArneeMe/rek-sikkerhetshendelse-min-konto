// src/components/game/DivisionGuard.tsx
import { getSession } from '@/lib/session';
import { canAccessPage } from '@/lib/division-utils';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface DivisionGuardProps {
    children: ReactNode;
    pagePath: string;
}

export async function DivisionGuard({ children, pagePath }: DivisionGuardProps) {
    const session = await getSession();

    // If user doesn't have access, redirect to overview
    if (!canAccessPage(session?.division, pagePath)) {
        redirect('/game');
    }

    return <>{children}</>;
}