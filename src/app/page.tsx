'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl mb-4">Redirecting...</h1>
                <a href="/login" className="text-blue-400 underline">Click here if not redirected</a>
            </div>
        </div>
    );
}
export const runtime = 'edge';