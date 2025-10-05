// src/components/ui/list-item.tsx
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ListItemProps {
    icon?: LucideIcon;
    iconColor?: string;
    title: string;
    subtitle?: string;
    timestamp?: Date | string;
    badge?: {
        text: string;
        variant?: 'default' | 'destructive' | 'outline';
    };
    onClick?: () => void;
    className?: string;
}

export function ListItem({
                             icon: Icon,
                             iconColor = 'text-slate-400',
                             title,
                             subtitle,
                             timestamp,
                             badge,
                             onClick,
                             className,
                         }: ListItemProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex items-center justify-between p-3 bg-slate-800 rounded-lg',
                onClick && 'cursor-pointer hover:bg-slate-700 transition-colors',
                className
            )}
        >
            <div className="flex items-center gap-3 flex-1">
                {Icon && <Icon className={cn('w-5 h-5', iconColor)} />}
                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">{title}</p>
                    {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {timestamp && (
                    <span className="text-xs text-slate-500 font-mono">
            {typeof timestamp === 'string'
                ? timestamp
                : timestamp.toLocaleTimeString()}
          </span>
                )}
                {badge && (
                    <Badge variant={badge.variant} className="text-xs">
                        {badge.text}
                    </Badge>
                )}
            </div>
        </div>
    );
}