// src/components/game/EmptyState.tsx
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    message: string;
    submessage?: string;
}

export function EmptyState({ icon: Icon, message, submessage }: EmptyStateProps) {
    return (
        <div className="text-center py-12 text-slate-400">
            <Icon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">{message}</p>
            {submessage && <p className="text-sm mt-2 text-slate-500">{submessage}</p>}
        </div>
    );
}