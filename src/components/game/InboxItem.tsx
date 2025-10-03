import { Event } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Mail, X, AlertTriangle, Server } from 'lucide-react';

interface InboxItemProps {
    event: Event;
}

export function InboxItem({ event }: InboxItemProps) {
    const getIcon = () => {
        switch (event.type) {
            case 'email':
                return <Mail className="w-4 h-4" />;
            case 'tweet':
                return <X className="w-4 h-4" />;
            case 'alert':
                return <AlertTriangle className="w-4 h-4" />;
            case 'server-status':
                return <Server className="w-4 h-4" />;
        }
    };

    const getSeverityBadge = () => {
        switch (event.severity) {
            case 'low':
                return <Badge className="bg-blue-600">Low</Badge>;
            case 'medium':
                return <Badge className="bg-yellow-600">Medium</Badge>;
            case 'high':
                return <Badge className="bg-orange-600">High</Badge>;
            case 'critical':
                return <Badge className="bg-red-600">Critical</Badge>;
        }
    };

    return (
        <Card
            className={`bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer ${
                !event.read ? 'border-l-4 border-l-blue-500' : ''
            }`}
        >
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1 text-slate-400">{getIcon()}</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-slate-100">{event.title}</h3>
                                {!event.read && (
                                    <Badge variant="outline" className="text-xs">
                                        New
                                    </Badge>
                                )}
                            </div>
                            {event.from && (
                                <div className="text-xs text-slate-400 mb-2">From: {event.from}</div>
                            )}
                            <p className="text-sm text-slate-300 mb-2">{event.content}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{format(event.timestamp, 'MMM d, HH:mm:ss')}</span>
                                <span>•</span>
                                <span className="capitalize">{event.type}</span>
                            </div>
                        </div>
                    </div>
                    <div>{getSeverityBadge()}</div>
                </div>
            </CardContent>
        </Card>
    );
}
