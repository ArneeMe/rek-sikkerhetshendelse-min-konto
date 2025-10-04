// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DIVISIONS } from '@/lib/constants';

export default function LoginPage() {
    const [step, setStep] = useState<'code' | 'division'>('code');
    const [code, setCode] = useState('');
    const [division, setDivision] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code) return;
        setStep('division');
    };

    const handleDivisionSubmit = async (selectedDivision: string) => {
        setError('');
        setLoading(true);
        setDivision(selectedDivision);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, division: selectedDivision }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Invalid credentials');
                setLoading(false);
                return;
            }

            // Redirect to game dashboard
            router.push('/game');
        } catch (err) {
            setError('Something went wrong. Please try again.');
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
                    <CardTitle className="text-2xl text-slate-100">Security Operations Center</CardTitle>
                    <CardDescription className="text-slate-400">
                        {step === 'code' ? 'Enter your company access code' : 'Select your division'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 'code' ? (
                        <form onSubmit={handleCodeSubmit} className="space-y-4">
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Enter company code (e.g., ALPHA)"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                                    disabled={loading}
                                    autoFocus
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={loading || !code}
                            >
                                Continue
                            </Button>

                            <div className="text-xs text-slate-500 text-center mt-4">
                                <p>Available codes: ALPHA, BRAVO, CHARLIE</p>
                                <p className="mt-1">Admin: ADMIN-2024</p>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-3">
                            {DIVISIONS.map((div) => (
                                <Button
                                    key={div.id}
                                    onClick={() => handleDivisionSubmit(div.id)}
                                    variant="outline"
                                    className="w-full h-auto py-4 flex flex-col items-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-blue-500"
                                    disabled={loading}
                                >
                                    <span className="font-semibold text-slate-100">{div.name}</span>
                                    <span className="text-xs text-slate-400 mt-1">{div.description}</span>
                                </Button>
                            ))}

                            {error && (
                                <Alert variant="destructive" className="bg-red-900/20 border-red-800 mt-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                variant="ghost"
                                onClick={() => setStep('code')}
                                className="w-full text-slate-400 hover:text-slate-100"
                                disabled={loading}
                            >
                                ← Back to company code
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}