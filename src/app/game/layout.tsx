import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Shield, Inbox, FileText, Server, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AutoRefresh } from '@/components/game/AutoRefresh';

export default async function GameLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <AutoRefresh />

            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link href="/game" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <Shield className="w-6 h-6 text-blue-500" />
                                <div>
                                    <h1 className="text-xl font-bold text-slate-100">SOC Dashboard</h1>
                                    <p className="text-xs text-slate-400">{session.companyName}</p>
                                </div>
                            </Link>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center gap-2">
                                <Link href="/game">
                                    <Button variant="ghost" className="text-slate-300 hover:text-slate-100">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Overview
                                    </Button>
                                </Link>
                                <Link href="/game/inbox">
                                    <Button variant="ghost" className="text-slate-300 hover:text-slate-100">
                                        <Inbox className="w-4 h-4 mr-2" />
                                        Inbox
                                    </Button>
                                </Link>
                                <Link href="/game/logs">
                                    <Button variant="ghost" className="text-slate-300 hover:text-slate-100">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Logs
                                    </Button>
                                </Link>
                                <Link href="/game/servers">
                                    <Button variant="ghost" className="text-slate-300 hover:text-slate-100">
                                        <Server className="w-4 h-4 mr-2" />
                                        Servers
                                    </Button>
                                </Link>
                            </nav>
                        </div>

                        <form action="/api/auth/logout" method="POST">
                            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-slate-100">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
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