// src/app/game/emails/emails-client.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { DatabaseEmail } from '@/types/database';
import { format } from 'date-fns';

interface EmailsClientProps {
    emails: DatabaseEmail[];
    senders: string[];
    recipients: string[];
}

export function EmailsClient({ emails, senders, recipients }: EmailsClientProps) {
    const [search, setSearch] = useState('');
    const [senderFilter, setSenderFilter] = useState<string>('all');
    const [recipientFilter, setRecipientFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Filter emails based on search and filters
    const filteredEmails = emails.filter(email => {
        const matchesSearch = search === '' ||
            email.subject.toLowerCase().includes(search.toLowerCase()) ||
            email.body.toLowerCase().includes(search.toLowerCase()) ||
            email.sender.toLowerCase().includes(search.toLowerCase()) ||
            email.recipient.toLowerCase().includes(search.toLowerCase());

        const matchesSender = senderFilter === 'all' || email.sender === senderFilter;
        const matchesRecipient = recipientFilter === 'all' || email.recipient === recipientFilter;
        const matchesType = typeFilter === 'all' || email.type === typeFilter;

        return matchesSearch && matchesSender && matchesRecipient && matchesType;
    });

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'internal':
                return <Badge className="bg-blue-600">Intern</Badge>;
            case 'external':
                return <Badge className="bg-purple-600">Ekstern</Badge>;
            case 'system':
                return <Badge className="bg-slate-600">System</Badge>;
            default:
                return <Badge variant="outline">{type}</Badge>;
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-4">
            {/* Search and Filters */}
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {/* Search */}
                        <div className="relative md:col-span-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Søk i emne, innhold, avsender, mottaker..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
                            />
                        </div>

                        {/* Sender Filter */}
                        <Select value={senderFilter} onValueChange={setSenderFilter}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                                <SelectValue placeholder="Avsender" />
                            </SelectTrigger>
                            <SelectContent className="max-w-md bg-slate-800 border-slate-700">
                                <SelectItem value="all">Alle avsendere</SelectItem>
                                {senders.map(sender => (
                                    <SelectItem key={sender} value={sender} className="break-all">
                                        {sender}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Recipient Filter */}
                        <Select value={recipientFilter} onValueChange={setRecipientFilter}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                                <SelectValue placeholder="Mottaker" />
                            </SelectTrigger>
                            <SelectContent className="max-w-md bg-slate-800 border-slate-700">
                                <SelectItem value="all">Alle mottakere</SelectItem>
                                {recipients.map(recipient => (
                                    <SelectItem key={recipient} value={recipient} className="break-all">
                                        {recipient}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Type Filter */}
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="all">Alle typer</SelectItem>
                                <SelectItem value="internal">Intern</SelectItem>
                                <SelectItem value="external">Ekstern</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Results count */}
                        <div className="flex items-center text-sm text-slate-400">
                            Viser {filteredEmails.length} av {emails.length} e-poster
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Email List */}
            {filteredEmails.length > 0 ? (
                <div className="space-y-2">
                    {filteredEmails.map((email) => (
                        <Card key={email.id} className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors">
                            <CardContent className="p-0">
                                {/* Email Header - Always Visible */}
                                <div
                                    className="p-4 cursor-pointer flex items-center justify-between"
                                    onClick={() => toggleExpand(email.id)}
                                >
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                                        <div className="md:col-span-2 text-xs text-slate-500 font-mono">
                                            {format(new Date(email.timestamp), 'dd.MM.yyyy HH:mm')}
                                        </div>
                                        <div className="md:col-span-2 text-sm text-slate-300 truncate">
                                            {email.sender}
                                        </div>
                                        <div className="md:col-span-2 text-sm text-slate-300 truncate">
                                            → {email.recipient}
                                        </div>
                                        <div className="md:col-span-5 text-sm text-slate-100 font-medium truncate">
                                            {email.subject}
                                        </div>
                                        <div className="md:col-span-1 flex items-center justify-end gap-2">
                                            {getTypeBadge(email.type)}
                                            {expandedId === email.id ? (
                                                <ChevronUp className="w-4 h-4 text-slate-400" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-slate-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Email Body - Expandable */}
                                {expandedId === email.id && (
                                    <div className="px-4 pb-4 border-t border-slate-800">
                                        <div className="mt-4 space-y-2 text-sm text-slate-300">
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className="col-span-2 text-slate-500">Fra:</div>
                                                <div className="col-span-10">{email.sender}</div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className="col-span-2 text-slate-500">Til:</div>
                                                <div className="col-span-10">{email.recipient}</div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className="col-span-2 text-slate-500">Emne:</div>
                                                <div className="col-span-10 font-medium">{email.subject}</div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className="col-span-2 text-slate-500">Dato:</div>
                                                <div className="col-span-10">
                                                    {format(new Date(email.timestamp), 'dd. MMMM yyyy, HH:mm:ss')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-800 text-sm text-slate-300 whitespace-pre-wrap">
                                            {email.body}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="bg-slate-900 border-slate-700">
                    <CardContent className="p-8 text-center text-slate-400">
                        Ingen e-poster funnet
                    </CardContent>
                </Card>
            )}
        </div>
    );
}