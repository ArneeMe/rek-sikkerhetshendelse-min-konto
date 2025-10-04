// src/app/admin/admin-controls.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Play, Square, Loader2 } from 'lucide-react';

interface AdminControlsProps {
    hasActiveGame: boolean;
}

export function AdminControls({ hasActiveGame }: AdminControlsProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleStartGame = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/game-session/start', {
                method: 'POST',
            });

            if (response.ok) {
                router.refresh();
            } else {
                alert('Failed to start game');
            }
        } catch (error) {
            console.error('Error starting game:', error);
            alert('Error starting game');
        } finally {
            setLoading(false);
        }
    };

    const handleStopGame = async () => {
        if (!confirm('Are you sure you want to end the current game session?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/admin/game-session/end', {
                method: 'POST',
            });

            if (response.ok) {
                router.refresh();
            } else {
                alert('Failed to stop game');
            }
        } catch (error) {
            console.error('Error stopping game:', error);
            alert('Error stopping game');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-3">
            {!hasActiveGame ? (
                <Button
                    onClick={handleStartGame}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Starting...
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Game (All Companies)
                        </>
                    )}
                </Button>
            ) : (
                <Button
                    onClick={handleStopGame}
                    disabled={loading}
                    variant="destructive"
                    size="lg"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Stopping...
                        </>
                    ) : (
                        <>
                            <Square className="w-4 h-4 mr-2" />
                            End Game
                        </>
                    )}
                </Button>
            )}
        </div>
    );
}