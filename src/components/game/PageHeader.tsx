// src/components/game/PageHeader.tsx
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actions?: ReactNode;
}

export function PageHeader({ icon: Icon, title, description, actions }: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                    <Icon className="w-6 h-6" />
                    {title}
                </h2>
                <p className="text-slate-400">{description}</p>
            </div>
            {actions && <div>{actions}</div>}
        </div>
    );
}