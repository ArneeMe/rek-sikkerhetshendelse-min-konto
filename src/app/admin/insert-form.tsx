// src/app/admin/insert-form.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, CheckCircle } from 'lucide-react';
import { TEAM_CODES } from '@/lib/constants';
import { TABLE_SCHEMAS, getAvailableTables, type FieldConfig } from '@/lib/admin/table-schemas';

export function InsertForm() {
    const [table, setTable] = useState<string>('logs');
    const [formData, setFormData] = useState<Record<string, string | number>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<Record<string, unknown> | null>(null);
    const [error, setError] = useState<string>('');
    const [channels, setChannels] = useState<Array<{ id: string; name: string }>>([]);

    // Fetch channels when messages table is selected
    useEffect(() => {
        if (table === 'messages') {
            fetch('/api/admin/channels')
                .then(res => res.json())
                .then(data => setChannels(data.channels || []))
                .catch(() => setChannels([]));
        }
    }, [table]);

    const currentSchema = TABLE_SCHEMAS[table as keyof typeof TABLE_SCHEMAS];
    const availableTables = getAvailableTables();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(null);

        try {
            const schemaFieldNames = currentSchema.fields.map(f => f.name);
            const processedData: Record<string, string | number | null> = {};

            // Only process fields that are defined in the current schema
            for (const fieldName of schemaFieldNames) {
                if (formData[fieldName] !== undefined && formData[fieldName] !== '') {
                    processedData[fieldName] = formData[fieldName];
                }
            }

            // Only convert team_id if it exists in this table's schema
            if (schemaFieldNames.includes('team_id')) {
                if (processedData.team_id === 'broadcast' || processedData.team_id === undefined) {
                    processedData.team_id = null;
                } else if (processedData.team_id) {
                    processedData.team_id = parseInt(processedData.team_id as string);
                }
            }

            // Convert datetime-local to ISO format for timestamp fields (if this table has timestamp)
            if (schemaFieldNames.includes('timestamp') && processedData.timestamp) {
                const dateValue = new Date(processedData.timestamp as string);
                processedData.timestamp = dateValue.toISOString();
            }

            const response = await fetch('/api/admin/insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    table,
                    data: processedData,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Insert failed');
                setLoading(false);
                return;
            }

            setSuccess(result.data);
            setFormData({});
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    const renderField = (field: FieldConfig) => {
        const value = formData[field.name] ?? '';
        const stringValue = typeof value === 'number' ? value.toString() : value;

        // Special handling for channel_id select
        if (field.name === 'channel_id' && table === 'messages') {
            return (
                <Select
                    value={stringValue}
                    onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}
                >
                    <SelectTrigger className="bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                        {channels.map((channel) => (
                            <SelectItem key={channel.id} value={channel.id}>
                                #{channel.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        }

        switch (field.type) {
            case 'team-select':
                return (
                    <Select
                        value={stringValue || 'broadcast'}
                        onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}
                    >
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="broadcast">All Teams (Broadcast)</SelectItem>
                            {Object.entries(TEAM_CODES)
                                .filter(([_, team]) => {
                                    const teamData = team as { id: number; name: string; isAdmin?: boolean };
                                    return !teamData.isAdmin;
                                })
                                .map(([code, team]) => (
                                    <SelectItem key={team.id} value={team.id.toString()}>
                                        {team.name} ({code})
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                );

            case 'select':
                return (
                    <Select
                        value={stringValue}
                        onValueChange={(val) => setFormData({ ...formData, [field.name]: val })}
                    >
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue placeholder={`Select ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                            {field.options?.map((option: string) => (
                                <SelectItem key={option} value={option} className="capitalize">
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case 'textarea':
                return (
                    <Textarea
                        value={stringValue}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        placeholder={field.placeholder}
                        className="bg-slate-800 border-slate-700 min-h-32"
                        required={field.required}
                    />
                );

            case 'number':
                return (
                    <Input
                        type="number"
                        value={stringValue}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        placeholder={field.placeholder}
                        className="bg-slate-800 border-slate-700"
                        required={field.required}
                    />
                );

            case 'datetime-local':
                return (
                    <Input
                        type="datetime-local"
                        value={stringValue}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        placeholder={field.placeholder}
                        className="bg-slate-800 border-slate-700"
                        required={field.required}
                    />
                );

            default: // text
                return (
                    <Input
                        type="text"
                        value={stringValue}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        placeholder={field.placeholder}
                        className="bg-slate-800 border-slate-700"
                        required={field.required}
                    />
                );
        }
    };

    return (
        <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Legg til data
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Table Selection */}
                    <div>
                        <label className="text-sm text-slate-400 mb-2 block">Type</label>
                        <Select value={table} onValueChange={(val) => { setTable(val); setFormData({}); }}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                {availableTables.map(({ key, label }: { key: string; label: string }) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Dynamic Fields */}
                    {currentSchema.fields.map((field: FieldConfig) => (
                        <div key={field.name}>
                            <label className="text-sm text-slate-400 mb-2 block">
                                {field.label}
                                {field.required && <span className="text-red-400 ml-1">*</span>}
                            </label>
                            {renderField(field)}
                        </div>
                    ))}

                    {/* Submit Button */}
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Legger til...' : 'Legg til'}
                    </Button>

                    {/* Success Message */}
                    {success && (
                        <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
                            <div className="flex items-center gap-2 text-green-400 mb-2">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-semibold">Vellykket!</span>
                            </div>
                            <pre className="text-xs text-slate-300 overflow-auto">
                                {JSON.stringify(success, null, 2)}
                            </pre>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}