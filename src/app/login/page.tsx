// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Ugyldige innloggingsopplysninger');
                setLoading(false);
                return;
            }

            // Redirect based on admin status
            if (data.company.isAdmin) {
                router.push('/admin');
            } else {
                router.push('/game');
            }
        } catch {
            setError('Noe gikk galt. Vennligst prøv igjen.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-slate-900 border-slate-700">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Shield className="w-16 h-16 text-blue-500" />
                    </div>
                    <CardTitle className="text-2xl text-slate-100">Telesør Sikkerhetssenter</CardTitle>
                    <CardDescription className="text-slate-400">
                        Skriv inn tilgangskode
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="Skriv inn tilgangskode (f.eks. ALPHA)"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                disabled={loading}
                                autoFocus
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive" className="bg-red-900/20 border-red-800">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={loading || !code}
                        >
                            {loading ? 'Autentiserer...' : 'Logg inn'}
                        </Button>

                        <div className="text-xs text-slate-500 text-center mt-4">
                            <p>Tilgjengelige koder: ALPHA, BRAVO, CHARLIE, DELTA, ECHO,</p>
                            <p>FOXTROT, GOLF, HOTEL, INDIA, JULIET</p>
                            <p className="mt-1">Administrator: ADMIN-2024</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}