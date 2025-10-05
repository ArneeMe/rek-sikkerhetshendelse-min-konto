// src/components/ui/stat-card.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface StatCardProps {
    title: string;
    value: number | string;
    description?: string;
    icon: LucideIcon;
    iconColor?: string;
    badge?: {
        text: string;
        variant?: 'default' | 'destructive' | 'outline';
        className?: string;
    };
    href?: string;
    borderColor?: string;
}

export function StatCard({
                             title,
                             value,
                             description,
                             icon: Icon,
                             iconColor = 'text-blue-400',
                             badge,
                             href,
                             borderColor = 'hover:border-blue-500',
                         }: StatCardProps) {
    const content = (
        <Card className={cn(
            'bg-slate-900 border-slate-700 transition-colors',
            href && 'cursor-pointer',
            borderColor
        )}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-400">{title}</p>
                        <p className={cn('text-3xl font-bold mt-2', iconColor)}>{value}</p>
                        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
                    </div>
                    <Icon className={cn('w-8 h-8', iconColor)} />
                </div>
                {badge && (
                    <Badge variant={badge.variant} className={cn('mt-4', badge.className)}>
                        {badge.text}
                    </Badge>
                )}
            </CardContent>
        </Card>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}