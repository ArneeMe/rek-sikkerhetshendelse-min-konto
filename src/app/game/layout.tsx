// src/app/game/layout.tsx
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AutoRefresh } from '@/components/game/AutoRefresh';
import { NAVIGATION } from '@/lib/navigation-config';
import { COMPANY_NAME } from '@/lib/constants';

export default async function GameLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    // Filter out hidden navigation items
    const visibleNavigation = NAVIGATION.filter(item => !item.hidden);

    return (
        <div className="min-h-screen bg-slate-950">
            <AutoRefresh />

            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 lg:gap-8">
                            <Link href="/game" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <Shield className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                <div className="hidden lg:block">
                                    <h1 className="text-xl font-bold text-slate-100">{COMPANY_NAME} - Sikkerhetssenter</h1>
                                    <p className="text-xs text-slate-400">{session.teamName}</p>
                                </div>
                            </Link>

                            {/* Unified Navigation - only visible items */}
                            <nav className="flex items-center gap-1 md:gap-2">
                                {visibleNavigation.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link key={item.href} href={item.href}>
                                            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-slate-100">
                                                <Icon className="w-4 h-4 md:mr-2" />
                                                <span className="hidden md:inline">{item.label}</span>
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <form action="/api/auth/logout" method="POST">
                            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-slate-100">
                                <LogOut className="w-4 h-4 md:mr-2" />
                                <span className="hidden md:inline">Logg ut</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}